# BossRaid_API

BossRaid_PVE Game contents API

`22.09.16 ~ 22.09.21`

## π κ°μ

μ μ  μμ±κ³Ό λ³΄μ€ λ μ΄λ PVE μ»¨νμΈ μ λν RESTful API μλ²

- API κ°μ
  - μ μ  μμ± : μ€λ³΅λμ§ μλ `userId` μλ΅
  - μ μ  μ‘°ν : ν΄λΉ `μ μ μ ν΅ν© μ μ`μ `λ μ΄λμ κΈ°λ‘` μλ΅
  - λ³΄μ€λ μ΄λ μν μ‘°ν : λ λμ€μ μ μ₯ λλ©° `μμ₯κ°λ₯ μ¬λΆ`μ νμ¬ `μμ₯ν μ μ μ μμ΄λ` κΈ°λ‘ λ° μλ΅
  - λ³΄μ€λ μ΄λ μμ : `λ μ΄λ μμ₯ κ°λ₯μ¬λΆ` -> `λ μ΄λ μ λ³΄ νμΈ` -> μ€λ³΅λμ§μλ `λ μ΄λ λ²νΈ` μλ΅
  - λ³΄μ€λ μ΄λ μ’λ£ : μ μ₯λ λ μ΄λ κΈ°λ‘ νμΈ (μ μ₯λ userId μΌμΉμ¬λΆ) -> μ νμκ° λ΄ μ’λ£ μ¬λΆ -> κΈ°λ‘ `(μλ΅ μμ)`
  - λ­νΉ μ‘°ν : `κΈ°λ‘ μ μ²΄ λ­νΉ`κ³Ό `λμ λ­νΉ μ λ³΄` μλ΅

## π ERD

- MySQL <br>
  <img width="70%" alt="1" src="https://user-images.githubusercontent.com/57665888/191619995-9f731135-e062-4cec-8973-eaf99286a08c.png">
- Redis <br>
  <img width="70%" alt="1" src="https://user-images.githubusercontent.com/57665888/191619991-5e20b5ee-2d71-4f37-9b4b-74822446cb1d.png">

## π API DOCS

## π How To Use

```
npm install
npm start
```

## π λλ ν°λ¦¬ κ΅¬μ‘°

```
BossRaid_API
β  .env
β  .prettierrc.json
β  index.js
β  package.json
β  README.md
β
ββapi
β  ββcontroller
β  β      bossRaidController.js
β  β      userController.js
β  β
β  ββdao
β  β      recodeDAO.js
β  β      redisDAO.js
β  β      userDAO.js
β  β
β  ββservices
β         bossRaidService.js
β         userService.js
β
ββconfig
β      index.js
β
ββinterface
β      errorType.js
β      rankingInfoType.js
β
ββloaders
β      errorHandler.js
β      index.js
β
ββmodels
β      index.js
β      recodeModel.js
β      userModel.js
β
ββroutes
        index.js
```

## π νκ²½ μ€μ 

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

## π μ μ© κΈ°μ 

- μ¬μ©μΈμ΄ : `Javascript`
- λ°νμ νκ²½ : `Node.js`
- νλ μμν¬ : `Express`
- λ°μ΄ν°λ² μ΄μ€ : `Mysql` `Redis`
- ORM : `Sequelize`

## π Commit Convention

- `<λμ¬μν>`: `<λ³Έλ¬Έλ΄μ©>` `<μμ±/μμ /μ­μ >`

```
- Init : μ²μ μ»€λ° λ° νκ²½ μ€μ 
- Feat : μλ‘μ΄ APIμ λν κΈ°λ₯ μΆκ°
- Modify : κΈ°μ‘΄ APIμ λν κΈ°λ₯ κ³ λν λ° μ½λ μμ  (λ²κ·Έx)
- Chore : λΉλ μλ¬΄ μμ , ν¨ν€μ§ λ§€λμ  μμ , κ·Έ μΈ μ£Όμμμ  etc.

- Docs : λ¬Έμ μμ 
- Style : μ½λ ν¬λ§·ν, μ½λ λ³κ²½μ΄ μλ κ²½μ°, linting
- Test : νμ€νΈ μ½λ, λ¦¬ν©ν°λ§ νμ€νΈ μ½λ

- Refactor : μ½λ λ¦¬ν©ν°λ§
- Fix : λ²κ·Έ μμ 
```
