# KPN 빠른 시작 가이드 ⚡

이 가이드는 KPN 프로젝트를 5분 안에 로컬에서 실행하고 확인하는 방법을 안내합니다.

---

## 📦 1단계: 프로젝트 확인

현재 디렉토리에 다음 파일들이 있는지 확인하세요:

```
✓ index.html
✓ knowledge.html
✓ scenario.html
✓ community.html
✓ join.html
✓ about.html
✓ 404.html
✓ assets/style.css
✓ assets/script.js
✓ data/submit.js
✓ data/fetch_insights.js
✓ favicon.svg
✓ README.md
✓ SETUP_GUIDE.md
```

---

## 🚀 2단계: 로컬 서버 실행

### 방법 A: Python (추천)

```bash
# Python 3 사용
python3 -m http.server 8000

# 브라우저에서 열기
open http://localhost:8000
```

### 방법 B: Node.js

```bash
# http-server 설치 (최초 1회)
npm install -g http-server

# 서버 실행
http-server -p 8000

# 브라우저에서 열기
open http://localhost:8000
```

### 방법 C: VS Code Live Server

1. VS Code에서 프로젝트 열기
2. `index.html` 우클릭
3. "Open with Live Server" 선택

---

## ✅ 3단계: 기능 테스트

### 홈 페이지 (/)
- ✓ 히어로 섹션 표시
- ✓ 주요 섹션 카드 표시
- ✓ 네비게이션 작동

### 생존 지식 (/knowledge.html)
- ✓ 카테고리별 지식 카드 표시
- ✓ 이모지 및 내용 표시

### 재난 시나리오 (/scenario.html)
- ✓ 재난별 대응 시나리오 표시
- ✓ 단계별 행동 지침 확인

### 커뮤니티 (/community.html)
- ✓ 인사이트 공유 폼 표시
- ✓ 예시 인사이트 카드 표시
- ✓ 폼 제출 테스트 (개발 모드)

### 참여하기 (/join.html)
- ✓ 참여 신청 폼 표시
- ✓ 폼 제출 테스트 (개발 모드)
- ✓ 닉네임 localStorage 저장 확인

### 비전과 철학 (/about.html)
- ✓ 철학 섹션 표시
- ✓ 핵심 가치 카드 표시

---

## 🧪 4단계: 브라우저 콘솔 확인

1. 브라우저에서 `F12` (개발자 도구 열기)
2. Console 탭 선택
3. 에러 메시지가 없는지 확인
4. 다음 메시지가 표시되어야 함:

```
Google Apps Script URL이 설정되지 않았습니다. SETUP_GUIDE.md를 참고하세요.
```

이는 **정상**입니다! Google Sheets 연동 전까지는 개발 모드로 작동합니다.

---

## 🎨 5단계: 스타일 확인

### 컬러 시스템
- 배경: 거의 검정 (#0D0D0D) ✓
- 텍스트: 밝은 회색 (#EAEAEA) ✓
- 포인트: 보라색 (#7F5AF0) ✓
- KPN 로고 보라색 표시 ✓

### 반응형
- 브라우저 창 크기 조절
- 모바일 뷰 (< 768px) 확인
- 네비게이션 레이아웃 변경 확인

---

## 📝 6단계: localStorage 테스트

1. `/join.html` 페이지 접속
2. 닉네임과 이메일 입력
3. "참여하기" 클릭
4. 홈 페이지로 돌아가기
5. 상단에 **환영 메시지** 표시 확인:
   ```
   [닉네임]님, 다시 오셨군요.
   ```

### localStorage 확인 (개발자 도구)

```javascript
// Console에서 실행
localStorage.getItem('kpn_nickname')
// 출력: "입력한 닉네임"
```

---

## 🔗 다음 단계

### Google Sheets 연동 (선택)

실제 데이터 저장을 원하신다면:

1. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** 참고
2. Google Sheets 생성
3. Apps Script 배포
4. `data/submit.js` URL 업데이트

### 배포

로컬 테스트가 완료되면:

1. **Vercel** (권장): 저장소 연결 후 자동 배포
2. **Netlify**: GitHub에 push 후 자동 배포
3. **GitHub Pages**: Settings > Pages 설정

자세한 내용은 **[README.md](README.md)** 참고

---

## 🐛 문제 해결

### 스타일이 안 보여요
```bash
# assets/style.css 파일 존재 확인
ls -la assets/style.css

# 브라우저 콘솔에서 404 에러 확인
```

### 스크립트가 작동 안 해요
```bash
# assets/script.js 파일 존재 확인
ls -la assets/script.js

# 브라우저 콘솔에서 JavaScript 에러 확인
```

### 폼 제출이 안 돼요
- 개발 모드에서는 **정상**입니다
- 콘솔에 경고 메시지 표시됨
- Google Sheets 연동 후 해결됨

---

## 📞 도움이 필요하신가요?

- **문서**: [README.md](README.md)
- **Google Sheets 설정**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **GitHub Issues**: 버그 리포트 및 기능 제안

---

**축하합니다! 🎉**

KPN 프로젝트가 정상적으로 실행되고 있습니다.
이제 콘텐츠를 추가하거나 Google Sheets를 연동하여 프로젝트를 확장하세요!

---

**작성일**: 2025-10-18  
**소요 시간**: 5분  
**난이도**: ⭐ (매우 쉬움)

