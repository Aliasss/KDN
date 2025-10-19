/**
 * Google Apps Script - Email Sending Function
 * 
 * 이 파일의 내용을 Google Apps Script 편집기에 복사하여 사용하세요.
 * 
 * 사용 방법:
 * 1. Google Sheets에서 "확장 프로그램" → "Apps Script" 열기
 * 2. 기존 doPost 함수 아래에 이 코드를 추가
 * 3. doPost 함수의 joinSheet.appendRow(...) 다음 줄에 sendWelcomeEmail(email, nickname); 추가
 * 4. 저장 후 권한 승인
 * 5. 웹 앱 재배포
 * 
 * 참고: SETUP_GUIDE.md에서 상세한 설정 방법을 확인하세요.
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

🌐 KPN 웹사이트: https://your-vercel-site.vercel.app
📚 생존 지식: https://your-vercel-site.vercel.app/knowledge.html
📋 시나리오: https://your-vercel-site.vercel.app/scenario.html

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
 * doPost 함수에 추가할 코드:
 * 
 * if (params.formType === 'join') {
 *   const joinSheet = sheet.getSheetByName('참여신청');
 *   const timestamp = new Date();
 *   const nickname = params.nickname || '';
 *   const email = params.email || '';
 *   const region = params.region || '';
 *   const interests = params.interests || '';
 *   
 *   joinSheet.appendRow([timestamp, nickname, email, region, interests]);
 *   
 *   // 이메일 발송 (이 줄을 추가하세요)
 *   sendWelcomeEmail(email, nickname);
 *   
 *   return ContentService.createTextOutput(JSON.stringify({
 *     result: 'success',
 *     message: '참여 신청이 완료되었습니다!'
 *   })).setMimeType(ContentService.MimeType.JSON);
 * }
 */

