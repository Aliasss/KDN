# Google Sheets 연동 설정 가이드

KPN 웹사이트를 Google Sheets와 연동하여 참여 신청 및 커뮤니티 인사이트를 저장하는 방법을 안내합니다.

---

## 📋 목차

1. [Google Sheets 생성](#1-google-sheets-생성)
2. [Google Apps Script 작성](#2-google-apps-script-작성)
3. [웹 앱으로 배포](#3-웹-앱으로-배포)
4. [웹사이트에 URL 연결](#4-웹사이트에-url-연결)
5. [Sheets JSON 퍼블리시 (선택)](#5-sheets-json-퍼블리시-선택)

---

## 1. Google Sheets 생성

### 1-1. 참여 신청용 시트 만들기

1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성: `KPN_Members`
3. 첫 번째 시트 이름: `참여신청`
4. 첫 행(헤더)에 다음 항목 입력:

```
A1: timestamp
B1: nickname
C1: email
D1: region
E1: interests
```

### 1-2. 커뮤니티 인사이트용 시트 만들기

1. 같은 스프레드시트에 새 시트 추가: `커뮤니티인사이트`
2. 첫 행(헤더)에 다음 항목 입력:

```
A1: timestamp
B1: nickname
C1: insight
```

---

## 2. Google Apps Script 작성

### 2-1. Apps Script 에디터 열기

1. 스프레드시트에서 `확장 프로그램` > `Apps Script` 클릭
2. 새 프로젝트 이름: `KPN_FormHandler`

### 2-2. 스크립트 코드 작성

기존 `Code.gs` 파일의 내용을 삭제하고 아래 코드를 붙여넣기:

```javascript
// KPN - Google Apps Script 폼 핸들러

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const params = e.parameter;
    
    // 참여 신청 폼인지 인사이트 폼인지 구분
    if (params.insight) {
      // 커뮤니티 인사이트
      return handleInsight(sheet, params);
    } else if (params.email) {
      // 참여 신청
      return handleJoin(sheet, params);
    } else {
      throw new Error('잘못된 요청입니다.');
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 참여 신청 처리
function handleJoin(sheet, params) {
  const joinSheet = sheet.getSheetByName('참여신청');
  
  if (!joinSheet) {
    throw new Error('참여신청 시트를 찾을 수 없습니다.');
  }
  
  const timestamp = new Date();
  const nickname = params.nickname || '';
  const email = params.email || '';
  const region = params.region || '';
  const interests = params.interests || '';
  
  // 새 행 추가
  joinSheet.appendRow([timestamp, nickname, email, region, interests]);
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: '참여 신청이 완료되었습니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 커뮤니티 인사이트 처리
function handleInsight(sheet, params) {
  const insightSheet = sheet.getSheetByName('커뮤니티인사이트');
  
  if (!insightSheet) {
    throw new Error('커뮤니티인사이트 시트를 찾을 수 없습니다.');
  }
  
  const timestamp = new Date();
  const nickname = params.nickname || '익명';
  const insight = params.insight || '';
  
  // 새 행 추가
  insightSheet.appendRow([timestamp, nickname, insight]);
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: '인사이트가 공유되었습니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput('KPN Form Handler is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 2-3. 스크립트 저장

1. 디스크 아이콘 클릭 또는 `Ctrl+S` (Mac: `Cmd+S`)
2. 프로젝트 저장 확인

---

## 3. 웹 앱으로 배포

### 3-1. 배포 설정

1. 우측 상단 `배포` > `새 배포` 클릭
2. 톱니바퀴 아이콘 클릭 > `웹 앱` 선택
3. 설정:
   - **설명**: `KPN Form Handler v1`
   - **다음 계정으로 실행**: `나`
   - **액세스 권한**: `모든 사용자` (로그인 불필요)
4. `배포` 클릭

### 3-2. 권한 승인

1. `액세스 승인` 클릭
2. Google 계정 선택
3. `고급` > `[프로젝트 이름](안전하지 않음)으로 이동` 클릭
4. `허용` 클릭

### 3-3. 웹 앱 URL 복사

배포 완료 후 표시되는 **웹 앱 URL**을 복사합니다.

```
예시: https://script.google.com/macros/s/AKfycbz.../exec
```

⚠️ **이 URL을 안전하게 보관하세요!**

---

## 4. 웹사이트에 URL 연결

### 4-1. submit.js 업데이트

`data/submit.js` 파일을 열고 다음 줄을 수정:

```javascript
// 수정 전
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// 수정 후 (복사한 웹 앱 URL 붙여넣기)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
```

### 4-2. 테스트

1. 웹사이트 실행 (로컬 또는 배포 환경)
2. `join.html` 페이지에서 참여 신청 테스트
3. `community.html` 페이지에서 인사이트 공유 테스트
4. Google Sheets에서 데이터가 정상적으로 추가되는지 확인

---

## 5. Sheets JSON 퍼블리시 (선택)

커뮤니티 인사이트를 실시간으로 웹사이트에 표시하려면 Google Sheets를 JSON으로 퍼블리시해야 합니다.

### 방법 1: Google Sheets API 사용 (권장)

#### 5-1. Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성: `KPN_API`
3. `API 및 서비스` > `라이브러리` 이동
4. `Google Sheets API` 검색 및 활성화

#### 5-2. API 키 생성

1. `사용자 인증 정보` 메뉴
2. `사용자 인증 정보 만들기` > `API 키` 선택
3. API 키 복사 (안전하게 보관)

#### 5-3. 스프레드시트 공유

1. KPN_Members 스프레드시트 열기
2. 우측 상단 `공유` 클릭
3. `일반 액세스` > `링크가 있는 모든 사용자` 선택
4. 권한: `뷰어`
5. 스프레드시트 ID 복사 (URL의 `/d/` 뒤에 있는 긴 문자열)

```
예시 URL: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

#### 5-4. fetch_insights.js 업데이트

`data/fetch_insights.js` 파일을 열고:

```javascript
// 수정 전
const SHEETS_JSON_URL = 'YOUR_GOOGLE_SHEETS_JSON_URL_HERE';

// 수정 후
const SHEETS_JSON_URL = 'https://sheets.googleapis.com/v4/spreadsheets/[SPREADSHEET_ID]/values/커뮤니티인사이트?key=[YOUR_API_KEY]';
```

### 방법 2: 웹에 게시 (간단하지만 보안 낮음)

1. 스프레드시트에서 `파일` > `공유` > `웹에 게시`
2. `커뮤니티인사이트` 시트 선택
3. 형식: `웹 페이지` 또는 `CSV`
4. `게시` 클릭
5. 생성된 URL을 `fetch_insights.js`에 입력

---

## 🔒 보안 참고사항

1. **API 키 노출 방지**: 클라이언트 사이드에서 API 키를 사용할 때는 도메인 제한 설정 필요
2. **Apps Script URL**: 웹 앱 URL은 공개되어도 괜찮지만, 스팸 방지를 위해 reCAPTCHA 추가 권장
3. **개인정보**: 이메일 등 민감한 정보는 Sheets 접근 권한 철저히 관리
4. **스팸 방지**: 필요시 Apps Script에 rate limiting 추가

---

## 🛠️ 문제 해결

### 폼 제출이 안 돼요

1. Apps Script URL이 올바른지 확인
2. 브라우저 콘솔(F12)에서 에러 메시지 확인
3. Apps Script 실행 로그 확인 (`실행` > `실행 로그`)
4. CORS 문제일 경우 Apps Script 재배포

### 데이터가 Sheets에 안 들어가요

1. 시트 이름이 정확한지 확인 (`참여신청`, `커뮤니티인사이트`)
2. 헤더 행이 올바른지 확인
3. Apps Script 권한 재승인

### 인사이트가 웹사이트에 안 보여요

1. JSON URL이 올바른지 확인
2. 스프레드시트 공유 설정 확인 (링크가 있는 모든 사용자)
3. 브라우저 콘솔에서 fetch 에러 확인
4. API 키가 활성화되어 있는지 확인

---

## 📞 추가 도움

- [Google Apps Script 공식 문서](https://developers.google.com/apps-script)
- [Google Sheets API 문서](https://developers.google.com/sheets/api)
- KPN 커뮤니티에서 질문하기

---

**작성일**: 2025-10-18  
**버전**: 1.0

