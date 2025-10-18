// Google Apps Script webhook URL (배포 후 여기에 URL 입력)
// SETUP_GUIDE.md를 참고하여 Google Apps Script를 설정하고 아래 URL을 업데이트하세요
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

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
        
        formMessage.style.color = 'var(--accent)';
        formMessage.textContent = `${nickname}님, 환영합니다! 함께 준비해요.`;
        
        // 폼 초기화
        joinForm.reset();
        
        // 3초 후 홈으로 이동
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 3000);
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

