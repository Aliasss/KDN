# 🔄 KPN 버전 관리 및 롤백 가이드

## 📌 버전 관리 시스템

KPN 프로젝트는 Git 태그를 사용하여 주요 버전을 관리합니다.
언제든지 안정적인 이전 버전으로 되돌릴 수 있습니다.

---

## 🏷️ 등록된 버전

### v1.3 (2025-01-19)
**커밋 해시**: `37f3ea5`

**주요 내용**:
- ✅ Slack 자동 초대 이메일 발송 기능 추가
- ✅ join.html 성공 메시지 HTML 업그레이드 (다국어 지원)
- ✅ Slack 커뮤니티 안내 카드 추가
- ✅ SETUP_GUIDE.md 이메일 설정 가이드 추가 (140+ 줄)
- ✅ Google Apps Script 코드 템플릿 제공

**구성**:
- HTML: `join.html` - Slack 안내 카드 추가
- JavaScript: `data/submit.js` - 성공 메시지 다국어 HTML 처리
- i18n: `i18n/ko.js` (+2 keys), `i18n/en.js` (+2 keys)
- 문서: `SETUP_GUIDE.md` 이메일 섹션 추가, `VERSION.md` 업데이트
- 템플릿: `google-apps-script-email.js` (새 파일)

---

### v1.2 (2025-01-19)
**커밋 해시**: `58a6163`

**주요 내용**:
- ✅ 4개 극한 상황 시나리오 추가 (좀비, 핵전쟁, 소행성, 기술붕괴)
- ✅ Scenarios 페이지 2단계 섹션 구조로 재구성 (기본/극한)
- ✅ 약 2,000+ 단어 콘텐츠 추가
- ✅ 한영 번역 완료 (100+ 새 번역 키)

**구성**:
- HTML: `scenario.html` (287줄 → 477줄)
- i18n: `i18n/ko.js` (580줄 → 648줄), `i18n/en.js` (580줄 → 648줄)
- 문서: `VERSION.md` 업데이트

---

### v1.1 (2025-01-XX)
**커밋 해시**: `54b24ae`

**주요 내용**:
- ✅ 다국어 지원 시스템 구축 (한국어/영어)
- ✅ 언어 전환 버튼 추가 (우측 상단 고정)
- ✅ localStorage 기반 언어 설정 저장
- ✅ 7개 HTML 페이지 전체 번역 (300+ 번역 키)

**구성**:
- HTML: 모든 페이지에 `data-i18n` 속성 추가
- JavaScript: `assets/i18n.js` (다국어 처리 로직)
- i18n: `i18n/ko.js` (579줄), `i18n/en.js` (579줄)
- 문서: `VERSION.md`, `ROLLBACK_GUIDE.md` 생성

---

### v1.0 (2025-01-XX)
**커밋 해시**: `825f6f8`

**주요 내용**:
- ✅ Knowledge 페이지 콘텐츠 업그레이드 (8개 카테고리 심층 확장)
- ✅ Scenarios 페이지 콘텐츠 업그레이드 (6개 재난 시나리오 전문화)
- ✅ Google Sheets 연동 (참여 신청 + 커뮤니티 인사이트)
- ✅ Vercel 배포 설정 완료
- ✅ 전국 대피시설 지도 통합

**구성**:
- HTML: `index.html`, `knowledge.html`, `scenario.html`, `community.html`, `join.html`, `about.html`, `404.html`
- CSS: `assets/style.css`
- JavaScript: `assets/script.js`, `data/submit.js`, `data/fetch_insights.js`
- 문서: `README.md`, `SETUP_GUIDE.md`, `QUICKSTART.md`, `PROJECT_SUMMARY.md`

---

## 🔙 롤백 방법

### 방법 1: 특정 태그로 되돌리기 (권장)

```bash
# 1. 현재 상태 확인
git status

# 2. 등록된 태그 확인
git tag

# 3. v1.0으로 되돌리기
git checkout v1.0

# 4. 새 브랜치로 작업하고 싶다면
git checkout -b rollback-v1.0

# 5. main 브랜치를 v1.0 상태로 되돌리기 (주의!)
git checkout main
git reset --hard v1.0
git push --force origin main
```

⚠️ **주의**: `git reset --hard`와 `--force push`는 이후 커밋들을 삭제합니다. 신중하게 사용하세요.

---

### 방법 2: 특정 커밋으로 되돌리기

```bash
# 1. 커밋 히스토리 확인
git log --oneline

# 2. 특정 커밋으로 되돌리기
git reset --hard <커밋_해시>

# 3. 원격 저장소에 반영 (주의!)
git push --force origin main
```

---

### 방법 3: 임시로 과거 버전 확인하기 (안전)

```bash
# v1.0 상태를 임시로 확인 (읽기 전용)
git checkout v1.0

# 다시 최신 상태로 돌아오기
git checkout main
```

이 방법은 파일을 변경하지 않고 과거 버전을 확인만 합니다.

---

## 📋 롤백 전 체크리스트

- [ ] 현재 작업 중인 변경사항이 있다면 커밋 또는 stash
- [ ] 롤백할 버전이 올바른지 확인
- [ ] 중요한 데이터는 백업 (Google Sheets 데이터는 영향 없음)
- [ ] Vercel은 자동으로 재배포됨 (1-2분 소요)

---

## 🔖 새 버전 태그 만들기

```bash
# 1. 변경사항 커밋
git add .
git commit -m "설명"

# 2. 태그 생성
git tag -a v1.1 -m "버전 1.1 설명"

# 3. 태그 푸시
git push origin v1.1

# 4. 모든 태그 한번에 푸시
git push --tags
```

---

## 🆘 긴급 복구 시나리오

### 상황 1: 방금 푸시한 내용이 문제가 있어요

```bash
# 바로 이전 커밋으로 되돌리기
git reset --hard HEAD~1
git push --force origin main
```

### 상황 2: v1.0이 마지막으로 안정적이었어요

```bash
# v1.0으로 완전히 되돌리기
git reset --hard v1.0
git push --force origin main
```

### 상황 3: 로컬만 엉망이에요

```bash
# 원격 저장소 상태로 로컬 덮어쓰기
git fetch origin
git reset --hard origin/main
```

---

## 📊 버전 히스토리 확인

```bash
# 태그 목록 보기
git tag

# 태그 상세 정보
git show v1.0

# 커밋 히스토리 (그래프)
git log --oneline --graph --decorate

# 특정 파일의 변경 이력
git log --follow -- knowledge.html
```

---

## 💡 베스트 프랙티스

1. **주요 기능 완성 시 태그 생성**
   - 예: v1.0 (MVP 완성), v1.1 (새 기능 추가), v2.0 (대규모 개편)

2. **실험적인 변경은 브랜치에서**
   ```bash
   git checkout -b feature/new-design
   # 작업 후
   git checkout main
   git merge feature/new-design
   ```

3. **중요 변경 전 백업 태그**
   ```bash
   git tag backup-$(date +%Y%m%d)
   git push origin --tags
   ```

4. **롤백 후 원인 분석**
   - 무엇이 문제였는지 문서화
   - 다음에는 실수하지 않도록 규칙 추가

---

## 🔗 관련 문서

- [README.md](README.md) - 프로젝트 전체 소개
- [QUICKSTART.md](QUICKSTART.md) - 빠른 시작 가이드
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Google Sheets 연동 설정
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - 프로젝트 요약

---

## ❓ 자주 묻는 질문

**Q: 태그를 삭제하고 싶어요**
```bash
# 로컬 태그 삭제
git tag -d v1.0

# 원격 태그 삭제
git push origin --delete v1.0
```

**Q: 롤백해도 Google Sheets 데이터는 안전한가요?**
A: 네! Git은 코드만 관리하므로 Google Sheets의 데이터는 영향받지 않습니다.

**Q: Vercel은 자동으로 롤백되나요?**
A: 네, main 브랜치를 롤백하고 푸시하면 Vercel이 자동으로 해당 버전으로 재배포합니다.

**Q: 실수로 강제 푸시했어요. 되돌릴 수 있나요?**
A: GitHub의 경우 `Settings > Options > Danger Zone`에서 최근 푸시 기록을 찾을 수 있습니다. 
   또는 `git reflog`로 로컬 히스토리를 확인하세요.

---

**마지막 업데이트**: 2025-01-XX  
**관리자**: Korea Preppers Network Team

