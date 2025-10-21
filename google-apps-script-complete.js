/**
 * Google Apps Script - KPN 완전판 (v1.4)
 * 
 * 사용 방법:
 * 1. Google Sheets에서 "확장 프로그램" → "Apps Script" 열기
 * 2. 기존 코드를 이 파일의 내용으로 완전히 교체
 * 3. 저장 후 권한 승인
 * 4. "배포" → "새 배포" → "웹 앱"으로 재배포
 * 5. "액세스 권한: 모든 사용자"로 설정
 * 
 * 필요한 시트:
 * - "참여신청" (타임스탬프, 닉네임, 이메일, 지역, 관심분야)
 * - "커뮤니티인사이트" (타임스탬프, 닉네임, 인사이트)
 * - "시뮬레이션결과" (타임스탬프, 닉네임, 시나리오ID, 시나리오명, 생존율, 유형, 선택수)
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const params = e.parameter;
    const type = params.type || '';
    
    Logger.log('Request type: ' + type);
    Logger.log('Parameters: ' + JSON.stringify(params));
    
    // 1. 참여 신청 처리
    if (type === 'join' || params.email) {
      const joinSheet = sheet.getSheetByName('참여신청');
      if (!joinSheet) {
        throw new Error('참여신청 시트를 찾을 수 없습니다.');
      }
      
      const timestamp = new Date();
      const nickname = params.nickname || '';
      const email = params.email || '';
      const region = params.region || '';
      const interests = params.interests || '';
      
      joinSheet.appendRow([timestamp, nickname, email, region, interests]);
      Logger.log('참여 신청 저장 완료: ' + nickname);
      
      // 환영 이메일 발송
      sendWelcomeEmail(email, nickname);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: '참여 신청이 완료되었습니다!'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. 커뮤니티 인사이트 처리
    else if (type === 'insight' || params.insight) {
      const insightSheet = sheet.getSheetByName('커뮤니티인사이트');
      if (!insightSheet) {
        throw new Error('커뮤니티인사이트 시트를 찾을 수 없습니다.');
      }
      
      const timestamp = new Date();
      const nickname = params.nickname || '익명';
      const insight = params.insight || '';
      
      insightSheet.appendRow([timestamp, nickname, insight]);
      Logger.log('인사이트 저장 완료: ' + nickname);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: '인사이트가 공유되었습니다!'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. 시뮬레이션 결과 처리 (NEW in v1.4)
    else if (type === 'simulation') {
      const simSheet = sheet.getSheetByName('시뮬레이션결과');
      if (!simSheet) {
        throw new Error('시뮬레이션결과 시트를 찾을 수 없습니다. 시트를 먼저 생성해주세요.');
      }
      
      const timestamp = new Date();
      const nickname = params.nickname || '익명';
      const scenario = params.scenario || '';
      const scenarioName = params.scenarioName || '';
      const survivalRate = params.survivalRate || '0';
      const userType = params.userType || '';
      const choiceCount = params.choiceCount || '0';
      
      simSheet.appendRow([
        timestamp,
        nickname,
        scenario,
        scenarioName,
        survivalRate,
        userType,
        choiceCount
      ]);
      
      Logger.log('시뮬레이션 결과 저장 완료: ' + nickname + ' - ' + scenarioName + ' - ' + survivalRate + '%');
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: '시뮬레이션 결과가 저장되었습니다!'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 알 수 없는 요청
    else {
      Logger.log('Unknown request type');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: '알 수 없는 요청 타입입니다.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('Error: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 환영 이메일 발송 함수
 */
function sendWelcomeEmail(email, nickname) {
  const subject = 'Korea Preppers Network에 오신 것을 환영합니다';
  
  const body = `안녕하세요, ${nickname}님!

Korea Preppers Network (KPN)에 참여해주셔서 진심으로 감사드립니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 KPN의 주요 소통 채널은 Slack입니다

저희는 아직 초창기 단계로, 함께 커뮤니티를 만들어가고 있습니다.
생존 지식을 나누고, 실질적인 대비 전략을 함께 고민하는 공간을 
한 걸음씩 구축해 나가고자 합니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📨 Slack 채널 초대장이 발송되었습니다

아래 링크를 클릭하여 KPN Slack 워크스페이스에 참여하세요:

👉 https://join.slack.com/t/koreapreppersnetwork/shared_invite/zt-3ggvvn07k-R_8iVfj6fDD0~1dNdj6HGQ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Slack에서 할 수 있는 것들:

• 다른 준비자들과 실시간 소통
• 생존 지식 및 경험 공유
• 재난 대비 질문 및 토론
• 지역별 커뮤니티 연결
• 최신 정보 및 업데이트 수신

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 KPN 웹사이트에서 더 많은 정보를 확인하세요: https://kdn-seven.vercel.app/
📚 생존 지식 아카이브: https://kdn-seven.vercel.app/knowledge.html
📋 재난별 시나리오: https://kdn-seven.vercel.app/scenario.html
🎮 생존 시뮬레이션 (NEW!): https://kdn-seven.vercel.app/simulation.html
💬 커뮤니티 인사이트: https://kdn-seven.vercel.app/community.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

함께 준비하고, 함께 살아남읍시다.

- Korea Preppers Network 팀 드림

P.S. 이 이메일에 회신하시면 저희가 직접 답변드립니다.`;

  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
    Logger.log('Welcome email sent to: ' + email);
  } catch (error) {
    Logger.log('Email sending failed: ' + error);
  }
}

/**
 * GET 요청 처리 (테스트용)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'KPN Apps Script is running! Use POST method to submit data.',
    version: 'v1.4',
    endpoints: {
      join: 'type=join',
      insight: 'type=insight',
      simulation: 'type=simulation (NEW!)'
    }
  })).setMimeType(ContentService.MimeType.JSON);
}

