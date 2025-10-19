# KPN - Korea Preppers Network

> 생존은 지식과 공동체에서 시작된다

재난·위기·사회 붕괴 상황에서 살아남기 위한 지성형 생존 네트워크 플랫폼

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 프로젝트 소개

**Korea Preppers Network (KPN)**는 재난과 위기 상황에서 생존하기 위한 지식을 공유하고, 
함께 준비하는 공동체를 만들어가는 플랫폼입니다.

### 핵심 가치

- 🧠 **지식 중심**: 검증된 생존 지식을 체계적으로 공유
- 🤝 **공동체**: 혼자가 아닌 함께 준비하는 네트워크
- 🎯 **현실적 대비**: 공포가 아닌 냉정한 준비
- 📚 **오픈 소스**: 누구나 접근 가능한 공개 플랫폼

---

## 🌟 주요 기능

### 1. 생존 지식 아카이브
- 식량, 물, 에너지, 의료, 통신 등 카테고리별 생존 지식
- 실전에 바로 적용 가능한 실용적 정보

### 2. 재난별 시나리오
- 지진, 팬데믹, 정전, 홍수, 한파, 경제 위기 등
- 각 상황별 단계적 대응 지침

### 3. 커뮤니티
- 생존 인사이트 공유
- 경험과 노하우 교환

### 4. 참여 시스템
- 간단한 참여 신청
- 이메일 기반 소식 전달

---

## 🚀 빠른 시작

### 로컬 실행

이 프로젝트는 **정적 웹사이트**로, 별도의 서버나 빌드 과정이 필요 없습니다.

#### 방법 1: 브라우저에서 직접 열기

```bash
# 프로젝트 클론
git clone https://github.com/yourusername/KPN.git
cd KPN

# index.html 파일을 브라우저로 열기
open index.html  # Mac
start index.html # Windows
```

#### 방법 2: 로컬 서버 실행 (권장)

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 필요)
npx http-server -p 8000

# 브라우저에서 http://localhost:8000 접속
```

---

## 📁 프로젝트 구조

```
KPN/
├── index.html              # 홈 페이지
├── knowledge.html          # 생존 지식 아카이브
├── scenario.html           # 재난별 시나리오
├── community.html          # 커뮤니티
├── join.html              # 참여 신청
├── about.html             # 비전 및 철학
├── assets/
│   ├── style.css          # 공통 스타일
│   └── script.js          # 공통 스크립트
├── data/
│   ├── submit.js          # 폼 제출 처리
│   └── fetch_insights.js  # 인사이트 불러오기
├── SETUP_GUIDE.md         # Google Sheets 연동 가이드
└── README.md              # 프로젝트 문서
```

---

## 🔧 Google Sheets 연동 (선택)

참여 신청과 커뮤니티 인사이트를 Google Sheets에 저장하려면 추가 설정이 필요합니다.

### 빠른 설정 (5분)

1. **Google Sheets 생성**
   - 새 스프레드시트 생성: `KPN_Members`
   - 시트 2개: `참여신청`, `커뮤니티인사이트`

2. **Apps Script 배포**
   - `SETUP_GUIDE.md`의 코드 복사
   - 웹 앱으로 배포

3. **URL 연결**
   - `data/submit.js`에 웹 앱 URL 입력

자세한 내용은 **[SETUP_GUIDE.md](SETUP_GUIDE.md)**를 참고하세요.

---

## 🌐 배포

### Vercel (권장)

1. [Vercel](https://vercel.com) 가입
2. GitHub 저장소 연결
3. `Import Project` 클릭
4. 자동 배포 완료 (설정 불필요)
5. 커스텀 도메인 연결 가능

### Netlify

1. [Netlify](https://netlify.com) 가입
2. GitHub 저장소 연결
3. 배포 설정:
   - **Build command**: (비워두기)
   - **Publish directory**: `/`
4. `Deploy site` 클릭

### GitHub Pages

1. 저장소 Settings > Pages
2. Source: `main` branch, `/` (root)
3. `Save` 클릭
4. `https://yourusername.github.io/KPN` 접속

---

## 🎨 디자인 철학

### 컬러 시스템

| 역할 | HEX | 설명 |
|------|-----|------|
| 배경 | `#0D0D0D` | 거의 블랙에 가까운 어두움 |
| 텍스트 | `#EAEAEA` | 부드러운 흰색 |
| 포인트 | `#7F5AF0` | 보라빛 (지성, 질서, 에너지) |
| 보조 텍스트 | `#72757E` | 중간톤 회색 |

### 디자인 원칙

- **미니멀리즘**: 불필요한 요소 배제
- **명료함**: 정보 전달 최우선
- **안정감**: 어둡지만 희망이 있는 색감
- **반응형**: 모든 기기에서 최적화

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Font | Pretendard |
| Storage | Google Sheets (via Apps Script) |
| Hosting | Vercel / Netlify / GitHub Pages |

---

## 📝 콘텐츠 기여

KPN은 커뮤니티가 함께 만들어가는 프로젝트입니다.

### 기여 방법

1. **지식 추가**
   - `knowledge.html` 또는 `scenario.html`에 검증된 정보 추가
   - Pull Request 제출

2. **번역**
   - 영어 또는 다른 언어로 번역
   - `i18n` 폴더에 번역 파일 추가

3. **버그 리포트**
   - GitHub Issues에 버그 리포트
   - 재현 방법 상세히 작성

4. **기능 제안**
   - Issues에 새로운 기능 제안
   - 구체적인 사용 사례 포함

---

## 📚 문서

프로젝트와 관련된 모든 문서를 확인하세요:

- **[QUICKSTART.md](QUICKSTART.md)** - 5분 빠른 시작 가이드
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Google Sheets 연동 상세 가이드
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - 프로젝트 완성 요약
- **[VERSION.md](VERSION.md)** - 현재 버전 정보 및 변경 이력
- **[ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md)** - 버전 관리 및 롤백 가이드
- **[README.md](README.md)** - 프로젝트 소개 (이 문서)

---

## 📜 라이선스

이 프로젝트는 **MIT 라이선스**를 따릅니다.
자유롭게 사용, 수정, 배포할 수 있습니다.

```
MIT License

Copyright (c) 2025 Korea Preppers Network

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

전체 라이선스: [LICENSE](LICENSE)

---

## 🤝 기여자

이 프로젝트는 다음 분들의 기여로 만들어졌습니다:

- **Aiden** - 프로젝트 설립 및 초기 개발

[기여자 목록](https://github.com/yourusername/KPN/contributors)

---

## 📞 연락처

- **웹사이트**: [kpn.example.com](https://kpn.example.com)
- **이메일**: contact@kpn.example.com
- **GitHub**: [github.com/yourusername/KPN](https://github.com/yourusername/KPN)

---

## 🙏 감사의 말

KPN은 다음 프로젝트 및 커뮤니티의 영감을 받았습니다:

- **r/preppers** - Reddit 프레퍼 커뮤니티
- **SurvivalBlog** - 생존 지식 아카이브
- **OpenStreetMap** - 오픈 소스 협업 정신

---

## ⚠️ 면책 조항

이 웹사이트의 정보는 교육 및 정보 제공 목적으로만 제공됩니다. 
전문적인 의료, 법률, 재무 조언을 대체하지 않습니다. 
재난 대비 및 생존 전략 실행은 개인의 책임 하에 이루어져야 합니다.

---

## 🌟 함께 준비합시다

**Korea Preppers Network**는 단순한 웹사이트가 아닙니다.
우리는 함께 배우고, 준비하며, 살아남는 **공동체**입니다.

> "준비된 사람은 두렵지 않다."

[지금 참여하기](https://kpn.example.com/join.html)

---

**Version**: v1.0  
**Git Tag**: `v1.0`  
**Last Updated**: 2025-01-XX  
**Made with ❤️ by Korea Preppers Network**

[버전 정보 상세보기](VERSION.md) | [롤백 가이드](ROLLBACK_GUIDE.md)

