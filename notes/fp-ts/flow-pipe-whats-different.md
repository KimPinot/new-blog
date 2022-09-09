---
title: flow와 pipe는 뭐가 다른걸까?
date: 2022-09-10 02:23:45
---

`pipe` 와 `flow` 함수는 **인자로 주어진 함수들을 차례대로 연산한다** 라는 점에서는 같은 기능을 하고 있으나, 조금씩 다른 부분이 있습니다.

이를 쉽게 알아보기 위해 숫자가 주어졌을때, 2를 곱한 수를 문자열로 반환하는 함수를 만들어 보면서 그 차이점을 이해해봅시다.

# `pipe` 함수

```typescript
export declare function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
): D
```

첫번째 인자가 함수가 아니어도 동작합니다.

```text
A -> (A->B) -> (B->C) -> (C->D)
```

```typescript
import * as F from "fp-ts/function"

const mul2 = (number: number)  => number * 2;
const toString = (number: number) => String(number);

const four = F.pipe(2, mul2, toString); // "4"
```

# `flow` 함수

```typescript
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
```

첫번쨰 인자는 반드시 함수여야 합니다.
initial value의 경우 `flow(logic)(argument)` 의 형태로 넣어야 합니다.

```text
(A->B) -> (B->C) -> (C->D) -> (D->E)
```

```typescript
import * as F from "fp-ts/function"

const mul2 = (number: number)  => number * 2;
const toString = (number: number) => String(number);

const four = F.flow(mul2, toString)(2); // "4"
```

# `pipe` 함수와 `flow` 함수, 무엇을 써야할까?

대부분에 경우에 `pipe` 함수는 좋은 선택지 입니다.

하지만 가끔 `flow` 함수가 필요할 때도 있는데요.

바로 함수의 callback을 `pipe` 문으로 처리해야 할 때 입니다.


예를 들어, 어떤 동작을 수행한 다음 callback으로 함수를 사용하는 경우
`pipe` 함수에서는 callback 앞에 익명 함수를 만들어야 합니다.

```typescript
import * as F from "fp-ts/function"

callback((response) => F.pipe(do, some, logic));
```

하지만 flow 함수는 단순히 `F.flow` 를 callback 문에 넣는 것으로 쉽게 사용할 수 있습니다. (야호!)

```typescript
import * as F from "fp-ts/function"

callback(F.flow(do, some, logic));
```