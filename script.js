// Aegis Banking AI Simulator - Master Application Controller
import { AegisEngine } from './src/aegis-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  // Instantiate Aegis Engine
  const engine = new AegisEngine();

  // DOM Elements - Toggles & Controls
  const toggleModeBtn = document.getElementById('toggle-mode');
  const toggleSecurityBtn = document.getElementById('toggle-security');
  const modeTextLeft = document.getElementById('txt-mode-normal');
  const modeTextRight = document.getElementById('txt-mode-aegis');
  const secTextLeft = document.getElementById('txt-sec-safe');
  const secTextRight = document.getElementById('txt-sec-scam');
  const selectLanguage = document.getElementById('select-language');

  // Accessibility Controls
  const btnFontReset = document.getElementById('btn-font-reset');
  const btnFontInc = document.getElementById('btn-font-inc');
  const btnContrast = document.getElementById('btn-contrast');
  const smartphoneContainer = document.getElementById('smartphone-container');

  // DOM Elements - Screens & Badges
  const appScreen = document.getElementById('app-screen');
  const aegisBadge = document.getElementById('aegis-badge');
  const stateNormal = document.getElementById('state-normal');
  const stateAegis = document.getElementById('state-aegis');
  const stateOverride = document.getElementById('state-override');
  
  // Balance Displays
  const aegisBalanceVal = document.getElementById('aegis-balance-val');
  const normalBalanceVal = document.getElementById('normal-balance-val');
  const btnToggleEye = document.getElementById('btn-toggle-eye');
  let balanceHidden = false;

  // Voice Assistant Elements
  const micTrigger = document.getElementById('mic-trigger');
  const waveform = document.getElementById('waveform');
  const voiceStatusText = document.getElementById('voice-status');

  // Main Action Buttons
  const btnSend = document.getElementById('btn-action-send');
  const btnBalance = document.getElementById('btn-action-balance');
  const btnHelp = document.getElementById('btn-action-help');
  const emergencyCallBtn = document.getElementById('emergency-call');

  // Modals & Forms
  const modalTransfer = document.getElementById('modal-transfer');
  const closeTransferModalBtn = document.getElementById('close-transfer-modal');
  const formTransfer = document.getElementById('form-transfer');
  const beneficiaryOptions = document.getElementById('beneficiary-options');
  const transferAmountInput = document.getElementById('transfer-amount');
  const balanceLimitHint = document.getElementById('balance-limit-hint');
  const transferError = document.getElementById('transfer-error');

  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const receiptAmount = document.getElementById('receipt-amount');
  const receiptBeneficiary = document.getElementById('receipt-beneficiary');
  const receiptTxnId = document.getElementById('receipt-txnid');

  const modalPassbook = document.getElementById('modal-passbook');
  const closePassbookModalBtn = document.getElementById('close-passbook-modal');
  const passbookCurrentBal = document.getElementById('passbook-current-bal');
  const passbookItems = document.getElementById('passbook-items');

  const modalCluttered = document.getElementById('modal-cluttered');
  const closeClutteredModalBtn = document.getElementById('close-cluttered-modal');
  const clutterModalTitle = document.getElementById('clutter-modal-title');
  const btnSwitchAegisNow = document.getElementById('btn-switch-aegis-now');

  // Selected beneficiary state
  let selectedBeneficiary = engine.beneficiaries[0];
  let isListening = false;
  let voiceTimer = null;

  // Speech Recognition & Synthesis Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  // Update Status Bar Time
  function updateTime() {
    const timeDisplay = document.getElementById('status-time');
    if (!timeDisplay) return;
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timeDisplay.textContent = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 60000);

  // Update UI Balance display across state views
  function refreshBalanceDisplays() {
    const formatted = engine.formatCurrency(engine.balance);
    if (balanceHidden) {
      aegisBalanceVal.textContent = "₹ ••••••";
      normalBalanceVal.textContent = "₹ ••••••";
    } else {
      aegisBalanceVal.textContent = `₹${formatted}`;
      normalBalanceVal.textContent = `₹ ${formatted}`;
    }
    balanceLimitHint.textContent = `Available: ₹${formatted}`;
    passbookCurrentBal.textContent = `₹${formatted}`;
  }

  // Speak voice output using SpeechSynthesis
  function speakVernacular(text, lang = engine.language) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any active audio
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95; // slightly slower for elderly clarity
      window.speechSynthesis.speak(utterance);
    }
  }

  // Render App State
  function renderAppState() {
    resetVoiceSimulation();
    closeAllModals();

    if (engine.securityEnv === 'Attack') {
      if (engine.mode === 'Aegis') {
        showStateOverride();
        speakVernacular("Security alert. Remote control threat detected. Transactions frozen for safety.", "en-IN");
      } else {
        showStateNormal(true);
      }
    } else {
      if (engine.mode === 'Aegis') {
        showStateAegis();
      } else {
        showStateNormal(false);
      }
    }
  }

  function showStateNormal(hasVulnerability = false) {
    stateNormal.style.display = 'flex';
    stateAegis.style.display = 'none';
    stateOverride.style.display = 'none';
    
    setTimeout(() => {
      stateNormal.classList.add('active');
      stateAegis.classList.remove('active');
      stateOverride.classList.remove('active');
    }, 50);

    appScreen.style.backgroundColor = '#f4f6f9';

    if (hasVulnerability) {
      aegisBadge.innerHTML = '<span class="pulse-dot" style="background-color: #d32f2f;"></span> VULNERABLE';
      aegisBadge.style.borderColor = 'rgba(211, 47, 47, 0.4)';
      aegisBadge.style.background = 'rgba(211, 47, 47, 0.1)';
      aegisBadge.style.color = '#d32f2f';
    } else {
      aegisBadge.innerHTML = '<span class="pulse-dot" style="background-color: #48bb78;"></span> LEGACY DASHBOARD';
      aegisBadge.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      aegisBadge.style.background = 'rgba(255, 255, 255, 0.1)';
      aegisBadge.style.color = '#ffffff';
    }
  }

  function showStateAegis() {
    stateNormal.style.display = 'none';
    stateAegis.style.display = 'flex';
    stateOverride.style.display = 'none';

    setTimeout(() => {
      stateNormal.classList.remove('active');
      stateAegis.classList.add('active');
      stateOverride.classList.remove('active');
    }, 50);

    appScreen.style.backgroundColor = '#ffffff';

    aegisBadge.innerHTML = '<span class="pulse-dot" style="background-color: #ffd700; animation: pulse-gold 1.5s infinite;"></span> AEGIS ACTIVE';
    aegisBadge.style.borderColor = 'var(--gold-primary)';
    aegisBadge.style.background = 'rgba(212, 175, 55, 0.15)';
    aegisBadge.style.color = '#ffd700';
  }

  function showStateOverride() {
    stateNormal.style.display = 'none';
    stateAegis.style.display = 'none';
    stateOverride.style.display = 'flex';

    setTimeout(() => {
      stateNormal.classList.remove('active');
      stateAegis.classList.remove('active');
      stateOverride.classList.add('active');
    }, 50);

    appScreen.style.backgroundColor = 'var(--navy-bg)';

    aegisBadge.innerHTML = '<span class="pulse-dot" style="background-color: #d32f2f;"></span> SECURE BLOCK';
    aegisBadge.style.borderColor = 'var(--warning-red)';
    aegisBadge.style.background = 'rgba(211, 47, 47, 0.15)';
    aegisBadge.style.color = '#ff8a80';
  }

  // Toggle Handlers
  toggleModeBtn.addEventListener('click', () => {
    toggleModeBtn.classList.toggle('active');
    if (toggleModeBtn.classList.contains('active')) {
      engine.setMode('Aegis');
      modeTextLeft.classList.remove('active');
      modeTextRight.classList.add('active');
    } else {
      engine.setMode('Normal');
      modeTextLeft.classList.add('active');
      modeTextRight.classList.remove('active');
    }
    renderAppState();
  });

  toggleSecurityBtn.addEventListener('click', () => {
    toggleSecurityBtn.classList.toggle('active');
    if (toggleSecurityBtn.classList.contains('active')) {
      engine.setSecurityEnv('Attack');
      secTextLeft.classList.remove('active');
      secTextRight.classList.add('active');
    } else {
      engine.setSecurityEnv('Safe');
      secTextLeft.classList.add('active');
      secTextRight.classList.remove('active');
    }
    renderAppState();
  });

  selectLanguage.addEventListener('change', (e) => {
    engine.setLanguage(e.target.value);
    const langNames = {
      'hi-IN': 'हिंदी (Hindi)',
      'mr-IN': 'मराठी (Marathi)',
      'en-IN': 'English',
      'gu-IN': 'ગુજરાતી (Gujarati)',
      'ta-IN': 'தமிழ் (Tamil)',
      'te-IN': 'తెలుగు (Telugu)'
    };
    speakVernacular(`Selected dialect ${langNames[e.target.value] || 'language'}`);
  });

  // Accessibility Font & Contrast Controls
  let fontScale = 1;
  btnFontInc.addEventListener('click', () => {
    fontScale = fontScale >= 1.2 ? 1 : fontScale + 0.1;
    smartphoneContainer.style.fontSize = `${fontScale}rem`;
  });

  btnFontReset.addEventListener('click', () => {
    fontScale = 1;
    smartphoneContainer.style.fontSize = '1rem';
  });

  btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  btnToggleEye.addEventListener('click', () => {
    balanceHidden = !balanceHidden;
    btnToggleEye.textContent = balanceHidden ? "🙈" : "👁️";
    refreshBalanceDisplays();
  });

  // Voice assistant logic
  function resetVoiceSimulation() {
    isListening = false;
    if (voiceTimer) clearTimeout(voiceTimer);
    waveform.classList.remove('active');
    voiceStatusText.textContent = 'Tap to Speak';
    voiceStatusText.classList.remove('listening');
    micTrigger.style.transform = 'scale(1)';
    if (recognition) {
      try { recognition.stop(); } catch(e) {}
    }
  }

  function handleRecognizedCommand(transcript) {
    const parsed = engine.parseVoiceCommand(transcript);

    if (parsed.action === 'CHECK_BALANCE') {
      voiceStatusText.textContent = `Balance: ₹${engine.formatCurrency(engine.balance)}`;
      speakVernacular(`Savitri Bai, your available balance is ${engine.formatCurrency(engine.balance)} rupees.`);
      openPassbookModal();
    } else if (parsed.action === 'SEND_MONEY') {
      voiceStatusText.textContent = `Sending ₹${parsed.amount} to ${parsed.beneficiary.name}...`;
      openTransferModal(parsed.beneficiary, parsed.amount);
    } else if (parsed.action === 'GET_HELP') {
      voiceStatusText.textContent = 'Connecting to SBI Vernacular Helpline...';
      speakVernacular("Connecting you to SBI Customer Assistance line in your language.");
      alert(`Calling Aegis Vernacular Support:\nConnecting to regional officer in ${selectLanguage.options[selectLanguage.selectedIndex].text}`);
    } else {
      voiceStatusText.textContent = `Recognized: "${transcript}"`;
      speakVernacular(`Recognized command: ${transcript}. Opening assistant options.`);
      openTransferModal(engine.beneficiaries[0], 500);
    }
  }

  micTrigger.addEventListener('click', () => {
    if (engine.securityEnv === 'Attack') {
      speakVernacular("Security alert. Remote control threat active. Mic locked for safety.", "en-IN");
      return;
    }

    if (isListening) {
      resetVoiceSimulation();
      return;
    }

    isListening = true;
    micTrigger.style.transform = 'scale(0.95)';
    waveform.classList.add('active');
    voiceStatusText.classList.add('listening');
    voiceStatusText.textContent = 'Listening (सुन रहे हैं)...';

    if (recognition) {
      recognition.lang = engine.language;
      try {
        recognition.start();
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          voiceStatusText.textContent = `"${transcript}"`;
          resetVoiceSimulation();
          handleRecognizedCommand(transcript);
        };
        recognition.onerror = () => {
          fallbackVoiceSimulation();
        };
      } catch (err) {
        fallbackVoiceSimulation();
      }
    } else {
      fallbackVoiceSimulation();
    }
  });

  function fallbackVoiceSimulation(customCommand = null) {
    const textToSimulate = customCommand || "Send 500 rupees to Ramesh";
    voiceTimer = setTimeout(() => {
      voiceStatusText.textContent = 'Processing vernacular speech NLU...';
      voiceTimer = setTimeout(() => {
        resetVoiceSimulation();
        handleRecognizedCommand(textToSimulate);
      }, 1200);
    }, 1200);
  }

  // Preset voice prompt chips
  const presetChips = document.querySelectorAll('.chip-btn');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (engine.mode !== 'Aegis') {
        engine.setMode('Aegis');
        toggleModeBtn.classList.add('active');
        modeTextLeft.classList.remove('active');
        modeTextRight.classList.add('active');
        renderAppState();
      }
      const commandText = chip.getAttribute('data-command');
      voiceStatusText.textContent = `"${commandText}"`;
      voiceStatusText.classList.add('listening');
      micTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fallbackVoiceSimulation(commandText);
    });
  });

  // Action Button Handlers
  btnSend.addEventListener('click', () => {
    if (engine.securityEnv === 'Attack') return;
    openTransferModal();
  });

  btnBalance.addEventListener('click', () => {
    if (engine.securityEnv === 'Attack') return;
    speakVernacular(`Your balance is ₹${engine.formatCurrency(engine.balance)}`);
    openPassbookModal();
  });

  btnHelp.addEventListener('click', () => {
    alert('Connecting to Aegis Vernacular Help Center...\nConnecting you with verified officer assistance in Hindi/Marathi.');
  });

  emergencyCallBtn.addEventListener('click', () => {
    alert('Connecting to SBI Cyber Security Helpline: Dialing 1930...');
  });

  // Render Beneficiaries in Transfer Modal
  function renderBeneficiaries(selectedId = 'b1') {
    beneficiaryOptions.innerHTML = '';
    engine.beneficiaries.forEach(b => {
      const card = document.createElement('div');
      card.className = `beneficiary-card ${b.id === selectedId ? 'selected' : ''}`;
      card.innerHTML = `
        <span class="ben-avatar">${b.avatar}</span>
        <div class="ben-info">
          <span class="ben-name">${b.name}</span>
          <span class="ben-relation">${b.upi}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.beneficiary-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedBeneficiary = b;
      });
      beneficiaryOptions.appendChild(card);
    });
  }

  function openTransferModal(beneficiary = engine.beneficiaries[0], amount = 500) {
    selectedBeneficiary = beneficiary;
    renderBeneficiaries(beneficiary.id);
    transferAmountInput.value = amount;
    transferError.textContent = '';
    refreshBalanceDisplays();
    modalTransfer.classList.add('active');
  }

  // Handle Transfer Submission
  formTransfer.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = transferAmountInput.value;
    const pin = document.getElementById('transfer-pin').value;

    const result = engine.executeTransfer(selectedBeneficiary.name, amount, pin);

    if (!result.success) {
      transferError.textContent = result.message;
      speakVernacular(result.message, "en-IN");
      return;
    }

    modalTransfer.classList.remove('active');
    refreshBalanceDisplays();

    // Show Receipt Modal
    receiptAmount.textContent = `₹ ${engine.formatCurrency(result.transaction.amount)}`;
    receiptBeneficiary.textContent = selectedBeneficiary.name;
    receiptTxnId.textContent = result.transaction.id;
    successModal.classList.add('active');

    speakVernacular(`Transaction successful! ${engine.formatCurrency(result.transaction.amount)} rupees sent to ${selectedBeneficiary.name}.`);
  });

  // Passbook Modal
  function openPassbookModal() {
    refreshBalanceDisplays();
    passbookItems.innerHTML = '';
    engine.transactions.forEach(t => {
      const item = document.createElement('div');
      item.className = 'passbook-item';
      item.innerHTML = `
        <div class="pb-left">
          <span class="pb-title">${t.title}</span>
          <span class="pb-meta">${t.date} | ${t.time} • ${t.category}</span>
        </div>
        <div class="pb-right">
          <span class="pb-amount ${t.type.toLowerCase()}">${t.type === 'CREDIT' ? '+' : '-'} ₹${engine.formatCurrency(t.amount)}</span>
          <span class="pb-status">${t.status}</span>
        </div>
      `;
      passbookItems.appendChild(item);
    });
    modalPassbook.classList.add('active');
  }

  // Modal Closers
  function closeAllModals() {
    modalTransfer.classList.remove('active');
    successModal.classList.remove('active');
    modalPassbook.classList.remove('active');
    modalCluttered.classList.remove('active');
  }

  closeTransferModalBtn.addEventListener('click', () => modalTransfer.classList.remove('active'));
  closeModalBtn.addEventListener('click', () => successModal.classList.remove('active'));
  closePassbookModalBtn.addEventListener('click', () => modalPassbook.classList.remove('active'));
  closeClutteredModalBtn.addEventListener('click', () => modalCluttered.classList.remove('active'));

  // Cluttered Buttons in Normal Mode
  const clutterBtns = document.querySelectorAll('.clutter-btn');
  clutterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const feature = btn.getAttribute('data-feature');
      clutterModalTitle.textContent = feature;
      modalCluttered.classList.add('active');
    });
  });

  btnSwitchAegisNow.addEventListener('click', () => {
    closeAllModals();
    toggleModeBtn.classList.add('active');
    engine.setMode('Aegis');
    modeTextLeft.classList.remove('active');
    modeTextRight.classList.add('active');
    renderAppState();
  });

  // Initial setup render
  refreshBalanceDisplays();
  renderAppState();
});
