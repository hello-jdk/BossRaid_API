# BossRaid_API

BossRaid_PVE Game contents API

`22.09.16 ~ 22.09.21`

## 📌 개요

유저 생성과 보스 레이드 PVE 컨텐츠에 대한 RESTful API 서버

- 캐시 서버로 Redis를 사용하였습니다.

- API 개요
  - 유저 생성 : 중복되지 않는 `userId` 응답
  - 유저 조회 : 해당 `유저의 통합 점수`와 `레이드의 기록` 응답
  - 보스레이드 상태 조회 : 레디스에 저장 되며 `입장가능 여부`와 현재 `입장한 유저의 아이디` 기록 및 응답
  - 보스레이드 시작 : `레이드 입장 가능여부` -> `레이드 정보 확인` -> 중복되지않는 `레이드 번호` 응답
  - 보스레이드 종료 : 저장된 레이드 기록 확인 (저장된 userId 일치여부) -> 제한시간 내 종료 여부 -> 기록 `(응답 없음)`
  - 랭킹 조회 : `기록 전체 랭킹`과 `나의 랭킹 정보` 응답

## 📌 ERD

- MySQL
  <img width="70%" alt="1" src="https://user-images.githubusercontent.com/57665888/191619995-9f731135-e062-4cec-8973-eaf99286a08c.png">
- Redis
  <img width="70%" alt="1" src="https://user-images.githubusercontent.com/57665888/191619991-5e20b5ee-2d71-4f37-9b4b-74822446cb1d.png">

## 📌 API DOCS

## 📌 How To Use

```
npm install
npm start
```

## 📌 디렉터리 구조

```
BossRaid_API
│  .env
│  .prettierrc.json
│  index.js
│  package.json
│  README.md
│
├─api
│  ├─controller
│  │      bossRaidController.js
│  │      userController.js
│  │
│  ├─dao
│  │      recodeDAO.js
│  │      redisDAO.js
│  │      userDAO.js
│  │
│  └─services
│         bossRaidService.js
│         userService.js
│
├─config
│      index.js
│
├─interface
│      errorType.js
│      rankingInfoType.js
│
├─loaders
│      errorHandler.js
│      index.js
│
├─models
│      index.js
│      recodeModel.js
│      userModel.js
│
└─routes
        index.js
```

## 📌 환경 설정

```
PORT =

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=

DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

## 📌 적용 기술

- 사용언어 : `Javascript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `Mysql` `Redis`
- ORM : `Sequelize`

## 📌 Commit Convention

- `<동사원형>`: `<본문내용>` `<작성/수정/삭제>`

```
- Init : 처음 커밋 및 환경 설정
- Feat : 새로운 API에 대한 기능 추가
- Modify : 기존 API에 대한 기능 고도화 및 코드 수정 (버그x)
- Chore : 빌드 업무 수정, 패키지 매니저 수정, 그 외 주석수정 etc.

- Docs : 문서 수정
- Style : 코드 포맷팅, 코드 변경이 없는 경우, linting
- Test : 테스트 코드, 리팩터링 테스트 코드

- Refactor : 코드 리팩터링
- Fix : 버그 수정
```
