# QuickMeet Frontend
test

Vue 3로 개발된 즉흥 약속 앱 QuickMeet의 프론트엔드입니다.

## 🚀 설치 및 실행

```bash
# 프로젝트 클론 후 디렉토리 이동
cd quickmeet-front

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📱 주요 기능

- **로그인/회원가입**: 간단한 프로토타입 인증
- **요일별 여가시간 설정**: 반복되는 일정 패턴 등록
- **친구 관리**: 친구 추가 및 실시간 상태 확인
- **즉흥 약속**: 원클릭으로 친구에게 약속 요청
- **위치 추천**: GPS 기반 만남 장소 자동 추천

## 🛠 기술 스택

- Vue 3 (Composition API)
- Vue Router 4
- Vite
- CSS3 (모바일 최적화)

## 📁 프로젝트 구조

```
src/
├── views/          # 페이지 컴포넌트
│   ├── Login.vue
│   ├── Register.vue
│   └── Home.vue
├── components/     # 재사용 컴포넌트
│   ├── FriendCard.vue
│   ├── BottomNav.vue
│   └── Modal.vue
├── assets/         # 스타일 파일
│   └── style.css
├── App.vue
└── main.js
```

## 🎯 프로토타입 특징

- DB 연결 없이 메모리 기반 데이터 관리
- 로그인/회원가입은 UI만 구현 (실제 인증 로직 없음)
- 친구 상태 및 약속 응답은 랜덤 시뮬레이션
- 모바일 우선 반응형 디자인

## 📱 사용법

1. 로그인 페이지에서 임의의 이메일/비밀번호 입력 후 로그인
2. 시간설정 탭에서 요일별 여가시간 설정
3. 친구목록 탭에서 친구 추가
4. 지금만나기 탭에서 실시간 가능한 친구들 확인
5. 친구 카드의 "놀자!" 버튼으로 즉흥 약속 요청

한국코드페어 출품용 프로토타입입니다. 🎉
