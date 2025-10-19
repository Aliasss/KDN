// Google Apps Script webhook URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXD7MG2MW5fYIBjsCAEkSlGt5F7oBSpEFa7mwU4amREcORwcu16r_CGN-8OOtcCcmtYQ/exec';

// 참여 신청 폼 처리
const joinForm = document.querySelector('#join-form');
const formMessage = document.querySelector('#form-message');

if (joinForm) {
  joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = joinForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // 버튼 비활성화 및 로딩 표시
    submitButton.disabled = true;
    submitButton.textContent = '처리 중...';
    formMessage.textContent = '';
    formMessage.style.color = 'var(--accent)';
    
    try {
      // Google Apps Script로 데이터 전송
      const formData = new FormData(joinForm);
      
      // SCRIPT_URL이 설정되지 않은 경우
      if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL이 설정되지 않았습니다. SETUP_GUIDE.md를 참고하세요.');
        
        // 개발/테스트 모드: localStorage에만 저장
        const nickname = formData.get('nickname');
        setNickname(nickname);
        
        formMessage.style.color = 'var(--accent)';
        formMessage.textContent = `${nickname}님, 환영합니다! 함께 준비해요. (개발 모드: Google Sheets 미연결)`;
        
        // 폼 초기화
        joinForm.reset();
        
        // 3초 후 홈으로 이동
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 3000);
        
        return;
      }
      
      // 실제 Google Apps Script로 전송
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        // 닉네임 localStorage에 저장
        const nickname = formData.get('nickname');
        setNickname(nickname);
        
        // 성공 메시지 업데이트 (다국어 지원)
        const lang = localStorage.getItem('lang') || 'ko';
        formMessage.style.color = 'var(--accent)';
        
        if (lang === 'ko') {
          formMessage.innerHTML = `
            <strong>${nickname}님, 환영합니다!</strong><br><br>
            📧 이메일로 <strong>Slack 초대장</strong>을 발송했습니다.<br>
            메일함을 확인하시고 KPN Slack 커뮤니티에 참여해주세요!<br><br>
            <small style="color: var(--subtle);">
              * 이메일이 보이지 않는다면 스팸함을 확인해주세요.<br>
              * Slack은 KPN의 주요 소통 채널입니다.
            </small>
          `;
        } else {
          formMessage.innerHTML = `
            <strong>Welcome, ${nickname}!</strong><br><br>
            📧 We've sent a <strong>Slack invitation</strong> to your email.<br>
            Please check your inbox and join the KPN Slack community!<br><br>
            <small style="color: var(--subtle);">
              * If you don't see the email, please check your spam folder.<br>
              * Slack is KPN's primary communication channel.
            </small>
          `;
        }
        
        // 폼 초기화
        joinForm.reset();
        
        // 5초 후 홈으로 이동 (이메일 내용을 읽을 시간 제공)
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 5000);
      } else {
        throw new Error(result.message || '전송 실패');
      }
      
    } catch (error) {
      console.error('폼 제출 오류:', error);
      formMessage.style.color = '#ff6b6b';
      formMessage.textContent = '전송 중 오류가 발생했습니다. 다시 시도해주세요.';
    } finally {
      // 버튼 복구
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// 인사이트 공유 폼 처리 (community.html)
const insightForm = document.querySelector('#insight-form');

if (insightForm) {
  const insightFormMessage = document.querySelector('#form-message');
  
  insightForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = insightForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = '처리 중...';
    insightFormMessage.textContent = '';
    insightFormMessage.style.color = 'var(--accent)';
    
    try {
      const formData = new FormData(insightForm);
      
      // SCRIPT_URL이 설정되지 않은 경우
      if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL이 설정되지 않았습니다.');
        
        insightFormMessage.style.color = 'var(--accent)';
        insightFormMessage.textContent = '인사이트가 공유되었습니다! (개발 모드: Google Sheets 미연결)';
        
        insightForm.reset();
        return;
      }
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        insightFormMessage.style.color = 'var(--accent)';
        insightFormMessage.textContent = '인사이트가 공유되었습니다! 감사합니다.';
        insightForm.reset();
        
        // 인사이트 목록 새로고침
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        throw new Error(result.message || '전송 실패');
      }
      
    } catch (error) {
      console.error('인사이트 제출 오류:', error);
      insightFormMessage.style.color = '#ff6b6b';
      insightFormMessage.textContent = '전송 중 오류가 발생했습니다. 다시 시도해주세요.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// localStorage 닉네임 관리 함수 (assets/script.js에도 있지만 독립적으로 사용 가능)
function setNickname(nickname) {
  localStorage.setItem('kpn_nickname', nickname);
}

function getNickname() {
  return localStorage.getItem('kpn_nickname');
}

