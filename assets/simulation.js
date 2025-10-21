// KPN 생존 시뮬레이션 로직

let currentScenario = null;
let currentStep = 0;
let survivalRate = 100;
let choicesMade = [];
let userType = {
  cautious: 0,
  reckless: 0,
  social: 0,
  prepared: 0,
  defensive: 0,
  aggressive: 0,
  escape: 0,
  leader: 0,
  loner: 0
};

// 페이지 로드 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
  // 시나리오 선택 이벤트
  const scenarioCards = document.querySelectorAll('.scenario-card');
  scenarioCards.forEach(card => {
    card.addEventListener('click', function() {
      const scenarioId = this.dataset.scenario;
      startSimulation(scenarioId);
    });
  });

  // 재시도 버튼
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', function() {
      document.getElementById('sim-result').classList.remove('active');
      document.getElementById('sim-intro').classList.add('active');
      // 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// 시뮬레이션 시작
function startSimulation(scenarioId) {
  if (!SCENARIOS[scenarioId]) {
    console.error('Invalid scenario:', scenarioId);
    return;
  }

  currentScenario = SCENARIOS[scenarioId];
  currentStep = 0;
  survivalRate = 100;
  choicesMade = [];
  
  // 유형 카운터 초기화
  userType = {
    cautious: 0,
    reckless: 0,
    social: 0,
    prepared: 0,
    defensive: 0,
    aggressive: 0,
    escape: 0,
    leader: 0,
    loner: 0
  };
  
  // 화면 전환
  document.getElementById('sim-intro').classList.remove('active');
  document.getElementById('sim-game').classList.add('active');
  
  // 상단으로 스크롤
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // 첫 단계 로드
  loadStep(0);
}

// 단계 로드
function loadStep(stepIndex) {
  if (!currentScenario || !currentScenario.story[stepIndex]) {
    console.error('Invalid step:', stepIndex);
    return;
  }

  const step = currentScenario.story[stepIndex];
  currentStep = stepIndex + 1;
  
  // 진행률 업데이트
  const progress = (currentStep / currentScenario.totalSteps) * 100;
  document.querySelector('.progress-fill').style.width = progress + '%';
  document.getElementById('current-step').textContent = currentStep;
  document.getElementById('total-steps').textContent = currentScenario.totalSteps;
  
  // 생존율 업데이트
  updateSurvivalGauge();
  
  // 스토리 텍스트
  document.getElementById('story-text').textContent = step.text;
  
  // 선택지 생성
  const choicesContainer = document.getElementById('choices');
  choicesContainer.innerHTML = '';
  
  step.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.onclick = () => makeChoice(choice, stepIndex);
    choicesContainer.appendChild(btn);
  });
}

// 생존율 게이지 업데이트
function updateSurvivalGauge() {
  document.getElementById('survival-percent').textContent = survivalRate;
  document.getElementById('survival-fill').style.width = survivalRate + '%';
  
  // 색상 변경 (낮을수록 빨강)
  const fill = document.getElementById('survival-fill');
  if (survivalRate < 30) {
    fill.style.background = '#ff6b6b';
  } else if (survivalRate < 60) {
    fill.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57)';
  } else {
    fill.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)';
  }
}

// 선택하기
function makeChoice(choice, stepIndex) {
  // 생존율 조정
  survivalRate = Math.max(0, Math.min(100, survivalRate + choice.survival));
  
  // 유형 카운트
  if (choice.type) {
    userType[choice.type] = (userType[choice.type] || 0) + 1;
  }
  
  // 선택 기록
  choicesMade.push({
    step: stepIndex + 1,
    choice: choice.text,
    survival: choice.survival,
    type: choice.type
  });
  
  // 다음 단계로 이동
  const nextIndex = choice.next;
  
  // 마지막 단계인지 확인
  if (nextIndex >= currentScenario.story.length - 1 && currentStep >= currentScenario.totalSteps - 1) {
    // 최종 결과 표시
    setTimeout(() => showResult(), 800);
  } else {
    // 다음 단계 로드
    setTimeout(() => {
      loadStep(nextIndex);
      // 스토리 박스로 스크롤
      document.querySelector('.story-box').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  }
}

// 결과 화면 표시
function showResult() {
  document.getElementById('sim-game').classList.remove('active');
  document.getElementById('sim-result').classList.add('active');
  
  // 상단으로 스크롤
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // 생존율 표시
  document.getElementById('final-survival').textContent = survivalRate;
  
  // 서클 애니메이션
  setTimeout(() => {
    const circumference = 565;
    const offset = circumference - (survivalRate / 100) * circumference;
    document.getElementById('survival-circle').style.strokeDashoffset = offset;
  }, 300);
  
  // 유형 분석
  const dominantType = getDominantType();
  const typeInfo = getTypeInfo(dominantType);
  
  document.getElementById('type-badge').textContent = typeInfo.name;
  document.getElementById('type-desc').textContent = typeInfo.desc;
  
  // 결과 타이틀
  let title = '';
  if (survivalRate >= 80) {
    title = '🎉 생존 성공!';
  } else if (survivalRate >= 50) {
    title = '⚠️ 위험한 생존';
  } else if (survivalRate >= 20) {
    title = '💀 생존 실패';
  } else {
    title = '☠️ 치명적 실패';
  }
  document.getElementById('result-title').textContent = title;
  
  // 상세 유형 분석 표시
  displayDetailedAnalysis(dominantType, survivalRate);
  
  // 의사결정 패턴 분석
  displayDecisionPatterns();
  
  // 의사결정 분석
  displayAnalysis();
  
  // 결과 저장
  saveResult();
}

// 가장 많이 선택한 유형 찾기
function getDominantType() {
  let maxCount = 0;
  let dominantType = 'cautious';
  
  for (const [type, count] of Object.entries(userType)) {
    if (count > maxCount) {
      maxCount = count;
      dominantType = type;
    }
  }
  
  return dominantType;
}

// 유형 정보 가져오기
function getTypeInfo(type) {
  const lang = localStorage.getItem('lang') || 'ko';
  
  const types = {
    ko: {
      cautious: { name: '신중한 전략가', desc: '위험을 최소화하는 안전한 선택을 선호합니다. 계획적이고 조심스러운 당신은 생존에 유리합니다.' },
      reckless: { name: '대담한 모험가', desc: '위험을 감수하며 빠른 결정을 내립니다. 때로는 위험하지만 기회를 잡는 능력이 있습니다.' },
      social: { name: '커뮤니티 리더', desc: '협력과 연대로 함께 살아남는 길을 선택합니다. 당신의 공동체 의식은 강력한 무기입니다.' },
      prepared: { name: '완벽한 프레퍼', desc: '사전 준비와 계획으로 위기를 극복합니다. 지식과 준비는 당신의 가장 큰 자산입니다.' },
      defensive: { name: '방어의 달인', desc: '안전을 최우선으로 하며 보수적으로 행동합니다. 안정적이지만 때로는 기회를 놓칠 수 있습니다.' },
      aggressive: { name: '적극적 생존자', desc: '필요한 것을 얻기 위해 적극적으로 행동합니다. 추진력이 강하지만 위험도 높습니다.' },
      escape: { name: '탈출 전문가', desc: '위험한 상황을 피하고 새로운 곳을 찾습니다. 유연하지만 뿌리내리기 어려울 수 있습니다.' },
      leader: { name: '타고난 리더', desc: '위기 상황에서 다른 사람들을 이끕니다. 책임감과 희생정신이 뛰어납니다.' },
      loner: { name: '고독한 생존자', desc: '혼자서도 강하게 살아남는 독립적인 성향입니다. 자립적이지만 고립될 위험이 있습니다.' }
    },
    en: {
      cautious: { name: 'Cautious Strategist', desc: 'You prefer safe choices that minimize risks. Your planning and caution give you a survival advantage.' },
      reckless: { name: 'Bold Adventurer', desc: 'You take risks and make quick decisions. Sometimes dangerous, but you can seize opportunities.' },
      social: { name: 'Community Leader', desc: 'You choose cooperation and solidarity for collective survival. Your community spirit is a powerful weapon.' },
      prepared: { name: 'Perfect Prepper', desc: 'You overcome crises through preparation and planning. Knowledge and readiness are your greatest assets.' },
      defensive: { name: 'Master of Defense', desc: 'You prioritize safety and act conservatively. Stable, but may miss opportunities.' },
      aggressive: { name: 'Aggressive Survivor', desc: 'You act proactively to get what you need. Strong drive but high risk.' },
      escape: { name: 'Escape Specialist', desc: 'You avoid danger and seek new places. Flexible but may struggle to settle down.' },
      leader: { name: 'Natural Leader', desc: 'You lead others in crisis situations. Excellent responsibility and self-sacrifice.' },
      loner: { name: 'Lone Survivor', desc: 'You survive strongly alone with independent tendencies. Self-reliant but risk isolation.' }
    }
  };
  
  return types[lang][type] || types[lang].cautious;
}

// 의사결정 분석 표시
function displayAnalysis() {
  const analysisContent = document.getElementById('analysis-content');
  analysisContent.innerHTML = '';
  
  // 중요한 선택들만 표시 (생존율 변화가 큰 것)
  const significantChoices = choicesMade.filter(c => Math.abs(c.survival) >= 10);
  
  if (significantChoices.length === 0) {
    analysisContent.innerHTML = '<p style="color: var(--subtle);">안정적인 선택을 유지했습니다.</p>';
    return;
  }
  
  significantChoices.forEach(choice => {
    const item = document.createElement('div');
    item.className = 'analysis-item';
    
    const impact = choice.survival > 0 ? '긍정적 영향' : '부정적 영향';
    const impactColor = choice.survival > 0 ? '#1dd1a1' : '#ff6b6b';
    
    item.innerHTML = `
      <div class="analysis-step">Step ${choice.step}</div>
      <div class="analysis-choice">${choice.choice}</div>
      <div class="analysis-impact" style="color: ${impactColor};">
        ${impact}: ${choice.survival > 0 ? '+' : ''}${choice.survival}%
      </div>
    `;
    
    analysisContent.appendChild(item);
  });
}

// 결과 저장
async function saveResult() {
  const nickname = localStorage.getItem('nickname') || '익명';
  const dominantType = getDominantType();
  
  const resultData = {
    timestamp: new Date().toISOString(),
    nickname: nickname,
    scenario: currentScenario.id,
    survivalRate: survivalRate,
    type: dominantType,
    choiceCount: choicesMade.length
  };
  
  // localStorage에 개인 기록 저장
  try {
    const history = JSON.parse(localStorage.getItem('sim_history') || '[]');
    history.push(resultData);
    // 최근 10개만 유지
    if (history.length > 10) {
      history.shift();
    }
    localStorage.setItem('sim_history', JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
  
  // Google Sheets 저장 (통계용)
  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXD7MG2MW5fYIBjsCAEkSlGt5F7oBSpEFa7mwU4amREcORwcu16r_CGN-8OOtcCcmtYQ/exec';
    
    const formData = new FormData();
    formData.append('type', 'simulation');
    formData.append('nickname', nickname);
    formData.append('scenario', currentScenario.id);
    formData.append('scenarioName', currentScenario.title);
    formData.append('survivalRate', survivalRate);
    formData.append('userType', dominantType);
    formData.append('choiceCount', choicesMade.length);
    
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData
    });
    
    console.log('✅ 시뮬레이션 결과가 Google Sheets에 저장되었습니다.');
  } catch (e) {
    console.error('Failed to save to Google Sheets:', e);
    // 실패해도 사용자 경험에는 영향 없음 (localStorage에 이미 저장됨)
  }
}

// 상세 유형 분석 표시
function displayDetailedAnalysis(type, rate) {
  const lang = localStorage.getItem('lang') || 'ko';
  
  // 유형별 상세 분석 데이터
  const analyses = {
    ko: {
      cautious: {
        detail: '당신은 위험을 신중하게 평가하고, 안전한 선택을 우선하는 사람입니다. 감정보다는 논리로 판단하며, 예상치 못한 위험을 피하는 데 능숙합니다. 이러한 신중함은 생존 상황에서 매우 유리하며, 불필요한 위험을 피함으로써 장기적인 생존 가능성을 높입니다.',
        strengths: ['위험 회피 능력', '계획적 사고', '안정적 의사결정', '자원 절약'],
        warnings: ['기회 상실 가능성', '과도한 소극성', '결단력 부족 우려'],
        recommendations: ['빠른 의사결정 훈련', '적절한 위험 감수 학습', '리더십 개발']
      },
      social: {
        detail: '당신은 위기 상황에서 공동체의 힘을 믿는 사람입니다. 혼자서 모든 것을 해결하려 하기보다는, 주변 사람들과 협력하여 더 큰 시너지를 만들어냅니다. 이러한 성향은 장기적인 생존에 매우 유리하며, 특히 사회 재건 단계에서 핵심적인 역할을 할 수 있습니다.',
        strengths: ['자원 공유 효율성', '정보 네트워크 확보', '심리적 안정감 제공', '역할 분담 전문성'],
        warnings: ['과도한 의존 경계', '신뢰 검증 필요', '개인 생존 기술 필요'],
        recommendations: ['리더십 훈련', '협상 기술', '공동 자원 관리 전략']
      },
      prepared: {
        detail: '당신은 사전 준비와 계획을 통해 위기에 대응하는 사람입니다. "예방이 최선의 대책"이라는 철학을 실천하며, 다양한 상황을 미리 예측하고 준비합니다. 지식과 기술에 대한 투자를 아끼지 않으며, 이는 생존에 있어 가장 강력한 무기가 됩니다.',
        strengths: ['사전 준비 철저', '다양한 지식과 기술', '체계적 계획 수립', '자원 효율 극대화'],
        warnings: ['과도한 준비로 인한 스트레스', '완벽주의 경향', '현장 적응력 부족 가능'],
        recommendations: ['즉흥 대응 훈련', '유연성 개발', '실전 경험 축적']
      },
      leader: {
        detail: '당신은 위기 상황에서 자연스럽게 리더십을 발휘하는 사람입니다. 다른 사람들의 안전과 복지를 자신의 것만큼 중요하게 여기며, 어려운 결정을 내리는 것을 두려워하지 않습니다. 책임감과 희생정신이 뛰어나 공동체의 중심이 됩니다.',
        strengths: ['의사결정 능력', '책임감과 신뢰성', '갈등 중재 능력', '사람들을 동기부여함'],
        warnings: ['과도한 책임감으로 인한 스트레스', '번아웃 위험', '자기 희생 과다'],
        recommendations: ['스트레스 관리', '권한 위임 학습', '자기 돌봄 중요']
      },
      defensive: {
        detail: '당신은 방어와 안전 확보를 최우선으로 하는 사람입니다. 공격보다는 방어에 능하며, 안정적인 거점을 유지하는 데 집중합니다. 보수적이지만 확실한 전략을 선호하며, 현재 가진 것을 지키는 데 뛰어납니다.',
        strengths: ['강력한 방어 전략', '자원 보호 능력', '안정성 추구', '인내심'],
        warnings: ['기회 놓침', '수동적 대응', '적응력 부족'],
        recommendations: ['능동적 사고 개발', '위험 감수 학습', '공격적 전략 연구']
      },
      aggressive: {
        detail: '당신은 적극적으로 행동하고 필요한 자원을 확보하는 데 주저하지 않는 사람입니다. 빠른 결정과 과감한 실행력이 강점이며, 위기 상황에서 필요한 것을 얻는 데 탁월합니다. 하지만 위험도 함께 높아질 수 있습니다.',
        strengths: ['빠른 행동력', '자원 확보 능력', '추진력', '결단력'],
        warnings: ['과도한 위험 감수', '충동적 판단', '장기 계획 부족'],
        recommendations: ['신중함 개발', '위험 평가 능력', '장기 전략 수립']
      },
      escape: {
        detail: '당신은 위험한 상황을 피하고 새로운 기회를 찾아 이동하는 데 능숙합니다. 유연하고 적응력이 뛰어나며, 한 곳에 얽매이지 않습니다. 변화하는 상황에 빠르게 대응할 수 있지만, 장기적 안정성은 부족할 수 있습니다.',
        strengths: ['높은 적응력', '유연한 사고', '빠른 상황 판단', '이동성'],
        warnings: ['장기 계획 부족', '뿌리 내리기 어려움', '자원 축적 한계'],
        recommendations: ['장기 거점 구축', '안정성 확보', '커뮤니티 구축']
      },
      loner: {
        detail: '당신은 혼자서도 강하게 살아남는 독립적인 사람입니다. 다른 사람에게 의존하지 않고 자립할 수 있는 능력이 뛰어납니다. 자급자족에 능하지만, 장기적으로는 고립의 위험이 있습니다.',
        strengths: ['강한 자립심', '독립적 생존 능력', '의사결정 자유', '자원 독점'],
        warnings: ['고립 위험', '정보 부족', '도움 받기 어려움', '심리적 스트레스'],
        recommendations: ['선택적 협력', '신뢰 관계 구축', '커뮤니티 참여 고려']
      },
      reckless: {
        detail: '당신은 위험을 감수하며 대담한 선택을 하는 사람입니다. 빠른 판단과 과감한 행동으로 기회를 잡을 수 있지만, 그만큼 위험도 높습니다. 모험심이 강하지만, 신중함이 필요한 순간도 있습니다.',
        strengths: ['대담한 결정력', '기회 포착 능력', '빠른 행동', '모험심'],
        warnings: ['과도한 위험 감수', '계획 부족', '생존율 저하'],
        recommendations: ['신중한 판단 훈련', '위험 평가 능력', '계획적 사고 개발']
      }
    },
    en: {
      // 영어 버전도 동일한 구조로 작성
      cautious: {
        detail: 'You carefully evaluate risks and prioritize safe choices. You judge with logic rather than emotion and are skilled at avoiding unexpected dangers. This caution is very advantageous in survival situations and increases long-term survival by avoiding unnecessary risks.',
        strengths: ['Risk avoidance ability', 'Strategic thinking', 'Stable decision-making', 'Resource conservation'],
        warnings: ['Possible missed opportunities', 'Excessive passivity', 'Lack of decisiveness'],
        recommendations: ['Quick decision-making training', 'Appropriate risk-taking learning', 'Leadership development']
      },
      social: {
        detail: 'You believe in the power of community in crisis situations. Rather than trying to solve everything alone, you collaborate with others to create greater synergy. This tendency is very advantageous for long-term survival and can play a key role in social reconstruction.',
        strengths: ['Resource sharing efficiency', 'Information network', 'Psychological stability', 'Role specialization'],
        warnings: ['Excessive dependence', 'Trust verification needed', 'Personal survival skills needed'],
        recommendations: ['Leadership training', 'Negotiation skills', 'Collective resource management']
      },
      prepared: {
        detail: 'You respond to crises through preparation and planning. You practice the philosophy that "prevention is the best measure" and anticipate and prepare for various situations. You invest generously in knowledge and skills, which becomes the most powerful weapon for survival.',
        strengths: ['Thorough preparation', 'Diverse knowledge and skills', 'Systematic planning', 'Resource efficiency maximization'],
        warnings: ['Stress from over-preparation', 'Perfectionism tendency', 'Possible lack of field adaptability'],
        recommendations: ['Improvisation training', 'Flexibility development', 'Practical experience accumulation']
      },
      leader: {
        detail: 'You naturally demonstrate leadership in crisis situations. You value the safety and well-being of others as much as your own and are not afraid to make difficult decisions. With excellent responsibility and self-sacrifice, you become the center of the community.',
        strengths: ['Decision-making ability', 'Responsibility and reliability', 'Conflict mediation', 'People motivation'],
        warnings: ['Stress from excessive responsibility', 'Burnout risk', 'Excessive self-sacrifice'],
        recommendations: ['Stress management', 'Delegation learning', 'Self-care importance']
      },
      defensive: {
        detail: 'You prioritize defense and security. You excel at defense rather than offense and focus on maintaining a stable stronghold. You prefer conservative but sure strategies and excel at protecting what you have.',
        strengths: ['Strong defensive strategy', 'Resource protection', 'Stability pursuit', 'Patience'],
        warnings: ['Missed opportunities', 'Passive response', 'Lack of adaptability'],
        recommendations: ['Active thinking development', 'Risk-taking learning', 'Offensive strategy study']
      },
      aggressive: {
        detail: 'You act proactively and do not hesitate to secure necessary resources. Quick decisions and bold execution are your strengths, and you excel at getting what you need in crisis situations. However, risks can also increase.',
        strengths: ['Quick action', 'Resource acquisition', 'Drive', 'Decisiveness'],
        warnings: ['Excessive risk-taking', 'Impulsive judgment', 'Lack of long-term planning'],
        recommendations: ['Developing caution', 'Risk assessment ability', 'Long-term strategy establishment']
      },
      escape: {
        detail: 'You are skilled at avoiding dangerous situations and finding new opportunities by moving. You are flexible and highly adaptable, not tied to one place. You can respond quickly to changing situations, but long-term stability may be lacking.',
        strengths: ['High adaptability', 'Flexible thinking', 'Quick situation judgment', 'Mobility'],
        warnings: ['Lack of long-term planning', 'Difficulty settling down', 'Resource accumulation limits'],
        recommendations: ['Long-term base building', 'Stability securing', 'Community building']
      },
      loner: {
        detail: 'You are an independent person who survives strongly alone. You have excellent ability to be self-reliant without depending on others. You are good at self-sufficiency, but there is a long-term risk of isolation.',
        strengths: ['Strong self-reliance', 'Independent survival ability', 'Decision freedom', 'Resource monopoly'],
        warnings: ['Isolation risk', 'Information shortage', 'Difficulty getting help', 'Psychological stress'],
        recommendations: ['Selective cooperation', 'Trust relationship building', 'Community participation consideration']
      },
      reckless: {
        detail: 'You take risks and make bold choices. You can seize opportunities with quick judgment and bold actions, but the risks are equally high. You have a strong sense of adventure, but there are moments when caution is needed.',
        strengths: ['Bold decision-making', 'Opportunity capture', 'Quick action', 'Adventurous spirit'],
        warnings: ['Excessive risk-taking', 'Lack of planning', 'Reduced survival rate'],
        recommendations: ['Careful judgment training', 'Risk assessment ability', 'Strategic thinking development']
      }
    }
  };
  
  const analysis = analyses[lang][type] || analyses[lang].cautious;
  
  // HTML 생성
  const typeAnalysisDiv = document.querySelector('.type-desc');
  if (!typeAnalysisDiv) return;
  
  const detailHTML = `
    <div class="type-detail" style="margin-top: 1.5rem;">
      <p style="line-height: 1.8; margin-bottom: 1rem;">${analysis.detail}</p>
      
      <div style="margin-top: 1.5rem;">
        <h4 style="color: var(--accent); margin-bottom: 0.8rem;">💪 ${lang === 'ko' ? '강점' : 'Strengths'}</h4>
        <ul style="margin-left: 1.5rem; line-height: 1.8;">
          ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      
      <div style="margin-top: 1.5rem;">
        <h4 style="color: #feca57; margin-bottom: 0.8rem;">⚠️ ${lang === 'ko' ? '주의할 점' : 'Warnings'}</h4>
        <ul style="margin-left: 1.5rem; line-height: 1.8;">
          ${analysis.warnings.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>
      
      <div style="margin-top: 1.5rem;">
        <h4 style="color: #48dbfb; margin-bottom: 0.8rem;">📚 ${lang === 'ko' ? '추천 학습' : 'Recommendations'}</h4>
        <ul style="margin-left: 1.5rem; line-height: 1.8;">
          ${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  
  typeAnalysisDiv.insertAdjacentHTML('afterend', detailHTML);
}

// 의사결정 패턴 분석
function displayDecisionPatterns() {
  const lang = localStorage.getItem('lang') || 'ko';
  
  // 유형별 카운트 계산
  const totalChoices = choicesMade.length;
  if (totalChoices === 0) return;
  
  const patterns = {
    risk: {
      label: lang === 'ko' ? '위험 감수도' : 'Risk Taking',
      value: Math.round(((userType.reckless || 0) + (userType.aggressive || 0)) / totalChoices * 100)
    },
    social: {
      label: lang === 'ko' ? '사회성' : 'Sociability',
      value: Math.round(((userType.social || 0) + (userType.leader || 0)) / totalChoices * 100)
    },
    preparation: {
      label: lang === 'ko' ? '준비성' : 'Preparedness',
      value: Math.round((userType.prepared || 0) / totalChoices * 100)
    },
    caution: {
      label: lang === 'ko' ? '신중함' : 'Caution',
      value: Math.round(((userType.cautious || 0) + (userType.defensive || 0)) / totalChoices * 100)
    }
  };
  
  // HTML 생성
  const analysisContent = document.getElementById('analysis-content');
  if (!analysisContent) return;
  
  const patternHTML = `
    <div class="pattern-bars" style="margin-top: 2rem; margin-bottom: 2rem;">
      <h3 style="color: var(--accent); margin-bottom: 1.5rem;">${lang === 'ko' ? '의사결정 패턴' : 'Decision Patterns'}</h3>
      ${Object.values(patterns).map(p => `
        <div class="pattern-item" style="margin-bottom: 1rem;">
          <div class="pattern-label" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${p.label}</span>
            <span style="color: var(--accent); font-weight: 600;">${p.value}%</span>
          </div>
          <div class="pattern-bar" style="height: 20px; background: #2a2a2a; border-radius: 10px; overflow: hidden;">
            <div class="pattern-fill" style="height: 100%; background: var(--accent); width: ${p.value}%; transition: width 1s ease;"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  analysisContent.insertAdjacentHTML('beforebegin', patternHTML);
}

