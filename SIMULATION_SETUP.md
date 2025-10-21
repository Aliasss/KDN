# 🎮 시뮬레이션 결과 Google Sheets 저장 설정 가이드

> v1.4에서 추가된 시뮬레이션 기능의 결과를 Google Sheets에 저장하는 방법

---

## 📋 목차

1. [Google Sheets 설정](#1-google-sheets-설정)
2. [Apps Script 업데이트](#2-apps-script-업데이트)
3. [테스트](#3-테스트)
4. [통계 확인](#4-통계-확인)

---

## 1. Google Sheets 설정

### 1.1 새 시트 추가

기존 Google Sheets 파일을 엽니다:
```
https://docs.google.com/spreadsheets/d/1rxa-OcHMLkQVtp8zNJxyR4J0sZ93heeykbJqSFZRHkU/edit
```

**하단의 "+" 버튼**을 클릭하여 새 시트를 추가하고, 이름을 정확히 다음과 같이 변경:
```
시뮬레이션결과
```

### 1.2 헤더 행 추가

첫 번째 행에 다음 헤더를 입력:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| 타임스탬프 | 닉네임 | 시나리오ID | 시나리오명 | 생존율 | 유형 | 선택수 |

**예시:**
```
A1: 타임스탬프
B1: 닉네임
C1: 시나리오ID
D1: 시나리오명
E1: 생존율
F1: 유형
G1: 선택수
```

### 1.3 헤더 스타일 적용 (선택사항)

- 첫 행 선택 → **굵게** + **배경색** 설정
- 권장: 연한 보라색 (#E1D5F7) 또는 연한 회색

---

## 2. Apps Script 업데이트

### 2.1 Apps Script 열기

Google Sheets에서:
1. **확장 프로그램** → **Apps Script** 클릭
2. 기존 코드가 보일 것입니다

### 2.2 코드 완전 교체

**기존 코드 전체를 삭제**하고, 아래 파일의 내용으로 교체:

📄 **`google-apps-script-complete.js`** 파일 내용을 복사

또는 직접 복사:

```javascript
// 프로젝트의 google-apps-script-complete.js 파일 참조
```

### 2.3 저장 및 권한 승인

1. **저장** 버튼 클릭 (💾 아이콘)
2. 프로젝트 이름 확인: `KPN Automation`
3. **실행** → `doGet` 함수 선택 → **실행** 클릭
4. **권한 검토** → 본인 Google 계정 선택
5. **고급** → **"KPN Automation (안전하지 않음)"으로 이동** 클릭
6. **허용** 클릭

### 2.4 재배포

1. 우측 상단 **배포** → **배포 관리** 클릭
2. 기존 배포 옆의 **연필(✏️) 아이콘** 클릭
3. **버전** → **새 버전** 선택
4. **설명**: `v1.4 - 시뮬레이션 결과 저장 추가`
5. **배포** 클릭
6. **완료**

> ⚠️ **중요**: URL은 변경되지 않습니다. 기존 URL 그대로 사용됩니다.

---

## 3. 테스트

### 3.1 웹사이트에서 테스트

1. https://your-site.vercel.app/simulation.html 접속
2. 아무 시나리오 선택 (예: 좀비 아포칼립스)
3. 끝까지 플레이
4. 결과 화면 확인

### 3.2 Google Sheets 확인

1. Google Sheets의 **"시뮬레이션결과"** 탭 열기
2. 새로운 행이 추가되었는지 확인

**예상 결과:**

| 타임스탬프 | 닉네임 | 시나리오ID | 시나리오명 | 생존율 | 유형 | 선택수 |
|---|---|---|---|---|---|---|
| 2025-01-21 10:30:25 | 테스터 | zombie | 좀비 아포칼립스 | 85 | social | 15 |

### 3.3 브라우저 콘솔 확인

F12 (개발자 도구) → **Console** 탭에서 확인:

```
✅ 시뮬레이션 결과가 Google Sheets에 저장되었습니다.
```

또는 에러가 있다면:

```
Failed to save to Google Sheets: [에러 메시지]
```

---

## 4. 통계 확인

### 4.1 기본 통계

Google Sheets에서 다음 통계를 확인할 수 있습니다:

**평균 생존율 (E열):**
```
=AVERAGE(E2:E)
```

**시나리오별 참여 횟수:**
```
=COUNTIF(C2:C, "zombie")
=COUNTIF(C2:C, "nuclear")
=COUNTIF(C2:C, "blackout")
```

**가장 많은 유형:**
```
=MODE(F2:F)
```

### 4.2 차트 만들기 (선택사항)

1. 데이터 범위 선택 (예: D1:E100)
2. **삽입** → **차트**
3. **차트 유형**: 히스토그램 또는 원형 차트
4. **제목**: "시나리오별 평균 생존율"

---

## 🎯 저장되는 데이터 예시

### 시나리오별 데이터

**좀비 아포칼립스:**
```json
{
  "nickname": "프레퍼_001",
  "scenario": "zombie",
  "scenarioName": "좀비 아포칼립스",
  "survivalRate": 75,
  "userType": "social",
  "choiceCount": 15
}
```

**핵전쟁/방사능:**
```json
{
  "nickname": "생존자_K",
  "scenario": "nuclear",
  "scenarioName": "핵전쟁/방사능",
  "survivalRate": 60,
  "userType": "prepared",
  "choiceCount": 12
}
```

**장기 정전:**
```json
{
  "nickname": "대비형",
  "scenario": "blackout",
  "scenarioName": "장기 정전",
  "survivalRate": 90,
  "userType": "cautious",
  "choiceCount": 10
}
```

---

## 🔒 개인정보 보호

- **닉네임만 저장**: 이메일이나 개인 식별 정보는 저장되지 않습니다
- **익명 참여 가능**: 닉네임이 없으면 "익명"으로 저장
- **선택 내용 미저장**: 어떤 선택을 했는지는 저장하지 않고, 결과만 저장
- **localStorage 병행**: 개인 브라우저에는 상세 기록 저장 (최근 10개)

---

## ❓ 문제 해결

### Q1. "시뮬레이션결과 시트를 찾을 수 없습니다" 에러

**해결:** 시트 이름을 정확히 `시뮬레이션결과`로 설정했는지 확인
- 띄어쓰기 없음
- 한글로만 작성
- 대소문자 구분 없음 (한글이므로)

### Q2. 데이터가 저장되지 않음

**확인 사항:**
1. Apps Script 재배포를 완료했는가?
2. 브라우저 콘솔에 에러가 있는가?
3. Google Sheets URL이 정확한가?

**해결:**
```javascript
// assets/simulation.js에서 SCRIPT_URL 확인
const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

### Q3. 일부 데이터만 저장됨

**원인:** `type` 파라미터가 누락되거나 잘못됨

**해결:** `assets/simulation.js`의 328줄 확인:
```javascript
formData.append('type', 'simulation');  // ← 이 줄이 있는지 확인
```

### Q4. localStorage에는 저장되는데 Sheets에는 안됨

**원인:** 네트워크 요청 실패 또는 Apps Script 에러

**해결:**
1. F12 → Network 탭에서 요청 확인
2. Apps Script 로그 확인:
   - Apps Script 편집기 → 좌측 **실행 로그** 클릭
   - 최근 에러 메시지 확인

---

## 📊 활용 예시

### 전체 사용자 평균 생존율
```
시나리오별:
- 좀비: 평균 72%
- 핵전쟁: 평균 58%
- 정전: 평균 81%
```

### 가장 많은 유형
```
1위: social (커뮤니티 리더형) - 35%
2위: prepared (완벽한 프레퍼형) - 28%
3위: cautious (신중한 전략가형) - 20%
```

### 시나리오별 참여율
```
좀비: 45% (가장 인기)
정전: 35%
핵전쟁: 20%
```

---

## ✅ 설정 완료 체크리스트

- [ ] Google Sheets에 "시뮬레이션결과" 시트 추가
- [ ] 헤더 행 7개 열 입력
- [ ] Apps Script 코드 교체
- [ ] 권한 승인 완료
- [ ] 재배포 완료
- [ ] 테스트 1회 실행
- [ ] Google Sheets에 데이터 저장 확인
- [ ] 브라우저 콘솔에서 성공 메시지 확인

---

**축하합니다!** 🎉  
이제 모든 시뮬레이션 결과가 Google Sheets에 자동으로 저장됩니다!

**다음 단계:**
- 정기적으로 통계 확인
- 차트로 시각화
- 사용자 피드백 수집
- 시나리오 난이도 조정

---

**문의사항이 있으시면 Slack에서 문의해주세요!** 💬

