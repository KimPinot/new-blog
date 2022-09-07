---
title: fp-ts에서 Promise를 사용하는 방법 (1) - Task / TaskEither
description: 함수형 라이브러리인 fp-ts 에서 Task / TaskEither 모나드를 사용하여 비동기를 처리하는 방법을 알아봅시다.
date: 2022-09-07 22:14:00
tags:
  - fp-ts
  - 함수형 프로그래밍
  - promise
categories:
  - how-to
list: false
---

안녕하세요. 나비입니다.

이번 시간에는 함수형 라이브러리인 fp-ts를 사용하여 비동기를 처리하는 방법을 알아보고자 합니다.

# TL;DR

- 절대 실패하지 않는 비동기는 `Task` 를 사용한다.
- 실패할 수도 있는 비동기는 `TaskEither` 를 사용한다.
- `Either` 의 `Left` tag 는 실패시, `Right` 태그는 성공시 반환된다.

# `Task`

```typescript
interface Task<A> {
  (): Promise<A>;
}
```

> Task represents an asynchronous computation that yields a value of type A and **never fails**.
> If you want to represent an asynchronous computation that may fail, please see TaskEither.

설명에 따르면, `Task` 는 오류가 Throw 되지 않는, 실패하지 않는 비동기 객체를 다룰때 사용됩니다.

## 실패하지 않는 코드들

예를 들어, 아래 코드들은 `Task` 로 사용할 수 있습니다.

```typescript
const asyncHello = () => Promise.resolve("Hello");

const doesFunctionCanRun = () => {
  try {
    await asyncFunction();
    return true;
  } catch (e) {
    return false;
  }
};
```

## 타입 추가하기

여기에 명시적으로 타입을 추가하면 명시적으로 Task 객체임을 나타낼 수 있습니다.

```typescript
import * as T from "fp-ts/lib/Task";

const taskHello: T.Task<string> = () => Promise.resolve("Hello");
```

물론 `await` 을 앞에 추가함으로써 비동기로도 언제나 사용이 가능하다는 것도 장점입니다.

```typescript
const someAsyncFunction = async () => {
  const a = await taskHello();
  console.log(a); // => "hello"
};
```

## 인자를 받는 함수

잠깐. 여기서 고민이 하나 생깁니다.

**인자를 받는 함수는 어떻게 Task로 변환**할 수 있을까요?

```typescript
import * as T from "fp-ts/lib/Task";

// Type '(arg: string) => T.Task<string>' is not assignable to type 'Task<string>'
const taskArgument: T.Task<string> = (arg: string) => Promise.resolve(arg);
```

그럴 때 사용할 수 있는 것이 `T.of` 함수 입니다.

```typescript
export declare const of: <A>(a: A) => Task<A>;
```

이 함수는 주어진 인자를 Task로 바꿔줍니다.
방금과 같은 상황에서는 `Promise.resolve()` 대신 `T.of()` 를 사용함으로써 비동기로 사용할 수 있다는 뜻이기도 합니다.

```typescript
import * as T from "fp-ts/lib/Task";

// (arg: string) => T.Task<string>
const taskArgument = (arg: string) => T.of(arg);
```

## 더 나아가기

여기서 조금 더 나아가자면, 이런것도 가능합니다.

```typescript
import * as T from "fp-ts/lib/Task";
import { VFile } from "@mdx-js/mdx/lib/compile";
import { unified } from "unified";

const process =
  (markdown: string): T.Task<VFile> =>
  () =>
    unified().process(markdown);
```

첫번째 함수가 인자를 받고 Task를 리턴해줌으로써 `process("# hello world")` 를 실행시킬 경우 `Task<VFile>` 을 가져올 수 있게 되었습니다.

생각보다 편하지 않나요?

하지만, API 요청 처럼 실패할수도 있는 비동기는 어떻게 다뤄야 할까요?

# `TaskEither`

```typescript
interface TaskEither<E, A> extends Task<Either<E, A>> {}
```

이런 상황에서 사용할 수 있는 것이 `TaskEither` 입니다.

인터페이스 정의에서도 확인할 수 있지만, 단순하게 `Task` 에 [`Either`](https://gcanti.github.io/fp-ts/modules/Either.ts.html) 를 추가한 모양인데요.

## Either, 넌 누구냐

`Either` 는 보통 오류를 처리할 때 많이 사용하는 모나드로 다음과 같이 성공 / 실패 상태를 처리할 때 사용됩니다.

```typescript
import * as E from "fp-ts/Either";

// (name: string) => Either<string, string>
const validateName = E.fromPredicate(
  /[a-zA-z]/.test,
  (name: string) => `"${name}" is not a valid name!`
);
```

`fromPredicate` 함수는 첫번째 인자가 True 일 경우 `Right` 태그로 인자를 반환하고, 실패할 경우 `Left` 태그로 오류를 반환해줍니다.

```typescript
// if valid name
console.log(validateName("johnDo")) // => { _tag: 'Right', right: "johnDo1" }

// if not valid name
console.log(validateName("john Do")) // => { _tag: 'Left', left: '"john Do" is not a valid name!' }
```

이것을 알고 있으면 `TaskEither` 를 쉽게 이해할 수 있습니다.

## 사용해보기

50%의 확률로 오류를 Throw 하는 비동기 함수를 만들어보겠습니다.

```typescript
async function throws50percent() {
  if (Math.abs(Math.random() * 2) >= 1)
    throw new Error(":(")
  
  return ":)"
}
```

이때 `TE.tryCatch` 라는 함수를 이용해 `throws50percent` 함수의 오류를 잡아보도록 하겠습니다.

```typescript
import * as TE from "fp-ts/TaskEither"

const process = TE.tryCatch(
  throws50percent,
  (e) => new Error(String(e))
);

(async () => {
  console.log(await process());
})()
```

만약 이 함수가 오류를 뱉지 않을 경우에는 아래 Json이 반환됩니다.

```json
{ _tag: 'Right', right: ':)' }
```

오류가 발생할 경우, 아래 Json이 반환됩니다.
```json
{
  _tag: 'Left',
  left: Error: Error: :(
      at /Users/.../modules/playground.ts:9:53
      at /Users/.../node_modules/fp-ts/lib/TaskEither.js:242:46
      at step (/Users/.../node_modules/fp-ts/lib/TaskEither.js:52:23)
      at Object.throw (/Users/.../node_modules/fp-ts/lib/TaskEither.js:33:53)
      at rejected (/Users/.../node_modules/fp-ts/lib/TaskEither.js:25:65)
}
```

## `TaskEither` 를 다시 `Task` 로 바꾸기 (`TE.fold`)

Json이 반환되는것도 좋지만, `_tag` 와 같이 지금 당장 사용하지 않는 값이 들어오는것이 조금 불편합니다.

이때 `TE.fold` 라는 함수를 이용하여 Either 값을 일반 값으로 변환해줄 수 있습니다.

```typescript
import * as T from "fp-ts/lib/Task";
import * as F from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

const process = F.pipe(
  TE.tryCatch(
    () => throws50percent(),
    () => F.constVoid() as never,
  ),
  // 반드시 두개의 리턴 타입이 동일해야 합니다
  TE.fold(() => T.of("errored"), T.of),
);
```

## 2개 이상의 비동기 다루기 (`TE.chain`)

위에서 더 나아가서 이번에는 두개 이상의 비동기를 다뤄보도록 하겠습니다.

```typescript
import * as T from "fp-ts/lib/Task";
import * as F from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

const process = F.pipe(
  TE.tryCatch(
    () => throws50percent(),
    (err) => new Error(`First ${err}`),
  ),
  TE.chain(() => 
    TE.tryCatch(
      () => throws50percent(),
      (err) => new Error(`Second ${err}`),
    ),
  ),
  TE.foldW(T.of, T.of),
);
```

## 오류 발생시 핸들링 하기 (`TE.orElse`)

```typescript
import * as T from "fp-ts/lib/Task";
import * as F from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

const process = F.pipe(
  TE.tryCatch(
    () => throws50percent(),
    (err) => new Error(`first ${err}`),
  ),
  TE.chain(() =>
    TE.tryCatch(
      () => throws50percent(),
      (err) => new Error(`second ${err}`),
    ),
  ),
  TE.orElse((origErr) =>
    F.pipe(
      TE.tryCatch(
        () => throws50percent(),
        (err) => new Error(`rollback ${err}`),
      ),
      TE.fold(TE.left, () => TE.left<Error, void>(origErr)),
    ),
  ),
  TE.foldW(T.of, T.of),
```