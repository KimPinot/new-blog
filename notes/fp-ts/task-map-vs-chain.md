---
title: Task에는 map이 좋을까 chain이 좋을까?
date: 2022-9-9 12:48:45
---

[원문](https://gist.github.com/chestercharles/75601b61f8228496282fbe839f11fe79)

## TL;DR

- `TE.map` 은 TaskEither 값을 다루는 함수다.
- `TE.tryCatch` 를 쓸때는 TaskEither의 중복 방지를 위해 `TE.chain` 을 쓰자.
- `TE.chain` 메소드는 flatMap 형식의 `TaskEither` 를 반환한다.
- 함수를 사용하기 전에 타입을 먼저 추가하면 기능이 정확하게 동작하는 것을 보장할 수 있다.

```typescript
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

// TaskEither로 감싸진 4로 이 글을 시작해봅시다.
const teFour = TE.right(4);
// TaskEither의 left 값이 지정되어있지 않기 때문에 (이 경우 never로 포장됩니다), teFour의 타입은 TE.TaskEither<never, number> 입니다.

// 우리는 Te.map 을 사용하여 TaskEither의 값을 사용할 수 있는 함수를 만들 수 있습니다.
const addOne = TE.map<number, number>(num => num + 1);
const teFive = addOne(teFour); // TE.TaskEither<never, number>

// 우리는 addOne 함수를 pipe로 묶어 타입스크립트가 자동으로 타입을 추론하도록 도울 수 있습니다.
const alsoTeFive = pipe(
  teFour,
  TE.map(num => num + 1)
); // TE.TaskEither<never, number>

// 그리고 이 함수는 alsoTeFive 함수와 동일하게 동작합니다.
const alsoAlsoTeFive = TE.taskEither.map(teFour, n => n + 1); // TE.TaskEither<never, number>

// 이제 DB 쿼리와 같이 값을 받아 Promise를 반환하는 함수를 만들어보겠습니다.
// 참고: TE.tryCatch 함수는 Promise의 반환값을 TaskEither의 right 값에 넣는 유틸리티 함수입니다.
const checkIfEven = (num: number) => TE.tryCatch(() => Promise.resolve(num % 2 == 0), E.toError);
const isTwoEven = checkIfEven(2); // TE.TaskEither<Error, boolean>

// 우리가 alsoTeFive에서 했던 것처럼 TE.map을 사용하여 함수를 pipe로 묶게 된다면...
const isFiveEven = pipe(
  teFive,
  TE.map(five => checkIfEven(five))
);
// isFiveEven의 타입은 TE.TaskEither<never, TE.TaskEither<Error, boolean>> 이 됩니다. TaskEither이 겹쳐졌네요 :(

// 이런 상황에서, chain을 사용하여 TE.taskEither를 겹쳐지지 않게 가져올 수 있습니다.
const isFiveEvenAgain = pipe(
  teFive,
  TE.chain(five => checkIfEven(five))
); // TE.TaskEither<Error, boolean>

// 아래 함수는 isFiveEvenAgain 와 동일하게 동작합니다.
const isFiveEvenAgainAgain = TE.taskEither.chain(teFive, five => checkIfEven(five));

// chain 을 사용하는 함수를 단독으로 사용할 수도 있지만, 타입을 정의해야 합니다.
const isNumberEven = TE.chain<Error, number, boolean>(num => checkIfEven(num));
const isFiveEvenAgainAgainAgain = pipe(teFive, isNumberEven); // TE.TaskEither<Error, boolean>
// 위 함수와 똑같이 동작합니다.
const isFiveEvenAgainAgainAgainAgain = isNumberEven(teFive); // TE.TaskEither<Error, boolean>

// 때때로, 함수를 사용하기 전에 함수에 대한 인터페이스를 정의하는 것도 좋은 방법인데요.
// 당신이 쓴 코드가 당신의 예상과 일치하는지 확인할 수 있기 때문입니다.
// 그리고, isNumberEvenAgain 함수는 isNumberEven 과 동일한 동작을 합니다.
type IIsNumberEven = (num: TE.TaskEither<Error, number>) => TE.TaskEither<Error, boolean>;
const isNumberEvenAgain: IIsNumberEven = TE.chain(five => checkIfEven(five));
```