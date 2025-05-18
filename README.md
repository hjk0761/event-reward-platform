# event-reward-platform

## 실행 방법
```
git clone https://github.com/hjk0761/event-reward-platform.git
cd event-reward-platform
docker-compose up --build
```

## 기능 명세

### Gateway Server

- [ ] Passport 및 Guard 를 사옹하여 인증/인가
- [ ] API 라우팅
- [ ] JWT 검증

### Auth Server

- [ ] 유저 등록
- [ ] 로그인
    - JWT 토큰 생성
- [ ] 역할 관리(USER, OPERATOR, AUDITOR, ADMIN)
    - 유저 역할 수정(접근: ADMIN)

### Event Server

- [ ] 이벤트 생성(접근: ADMIN, OPERATOR)
- [ ] 이벤트 조회(접근: ADMIN, OPERATOR)
- [ ] 보상 생성(접근: ADMIN, OPERATOR)
- [ ] 보상 조회(접근: ADMIN, OPERATOR)
- [ ] 유저 보상 요청(접근: USER)
- [ ] 보상 요청 내역 확인(접근: ADMIN, OPERATOR, AUDITOR)
- [ ] 보상 요청 내역 확인(접근: USER)

### Game Server

- [ ] 사용자의 행동 로그 생성
    - 레벨 변화
    - 아이템 획득 및 손실
    - 출석
    - 친구 추가 및 삭제
    - 퀘스트 완료
