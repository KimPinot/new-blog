---
title: git reflog로 커밋 복구하기
description: 실수로 커밋을 날려먹었을 때 복구할 수 있는 커맨드
date: 2022-9-9 02:01:53
---

실수로 커밋을 날려먹었을 때 `git reflog` 를 치면 지금까지 내가 git 에서 했던 모든 이력들을 확인할 수 있다

# 커밋 복구하기

```bash
# 커밋 제목을 기억하지 못하는 경우
git reflog

# 복구하기!
git reset <커밋해시> --hard
```

# 브랜치 복구하기

```bash
# 브앤치명 가져오기
git reflog | grep <브랜치명>

# 복구하기!
git reset <커밋해시> --hard
```