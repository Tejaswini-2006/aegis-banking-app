// Aegis Banking AI Simulator - Interaction Controller

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Toggles
  const toggleModeBtn = document.getElementById('toggle-mode');
  const toggleSecurityBtn = document.getElementById('toggle-security');
  
  const modeTextLeft = toggleModeBtn.previousElementSibling;
  const modeTextRight = toggleModeBtn.nextElementSibling;
  const secTextLeft = toggleSecurityBtn.previousElementSibling;
  const secTextRight = toggleSecurityBtn.nextElementSibling;

  // DOM Elements - App Screen & States
  const appScreen = document.getElementById('app-screen');
  const aegisBadge = document.getElementById('aegis-badge');
  const stateNormal = document.getElementById('state-normal');
  const stateAegis = document.getElementById('state-aegis');
  const stateOverride = document.getElementById('state-override');
  
  // DOM Elements - Voice Assistant
  const micTrigger = document.getElementById('mic-trigger');
  const waveform = document.getElementById('waveform');
  const voiceStatusText = document.getElementById('voice-status');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');

  // DOM Elements - Voice Buttons & Emergency
  const btnSend = document.getElementById('btn-action-send');
  const btnBalance = document.getElementById('btn-action-balance');
  const btnHelp = document.getElementById('btn-action-help');
  const emergencyCallBtn = document.getElementById('emergency-call');

  // State Variables
  let currentMode = 'Aegis'; // 'Normal' or 'Aegis'
  let currentSecurity = 'Safe'; // 'Safe' or 'Attack'
  let isListening = false;
  let voiceTimer = null;

  // Set default initial UI active toggles
  toggleModeBtn.classList.add('active'); // Right side active = Aegis Mode
  toggleSecurityBtn.classList.remove('active'); // Left side active = Safe Environment

  // Update Status Bar Time Dynamically
  function updateTime() {
    const timeDisplay = document.getElementById('status-time');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timeDisplay.textContent = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 60000);

  // Core State Render Function
  function renderAppState() {
    // Reset listening animations & timers if state changes
    resetVoiceSimulation();
    
    // Clear any modal views
    successModal.classList.remove('active');

    // Scenario Logic Matrix
    if (currentSecurity === 'Attack') {
      if (currentMode === 'Aegis') {
        // Trigger instant security override override
        showStateOverride();
      } else {
        // In Normal Mode with Phone Scam on
        // While the prompt focuses on "Attack in Aegis Mode", we will show a subtle high-danger warning badge
        // but keep the normal screen active. It highlights the vulnerability of the Normal Mode dashboard!
        showStateNormal(true); // normal screen with vulnerability warning badge
      }
    } else {
      // Safe Environment
      if (currentMode === 'Aegis') {
        showStateAegis();
      } else {
        showStateNormal(false);
      }
    }
  }

  // State transitions helpers
  function showStateNormal(hasVulnerability = false) {
    stateNormal.style.display = 'flex';
    stateAegis.style.display = 'none';
    stateOverride.style.display = 'none';
    
    // Smooth transition class handling
    setTimeout(() => {
      stateNormal.classList.add('active');
      stateAegis.classList.remove('active');
      stateOverride.classList.remove('active');
    }, 50);

    // Reset app screen background
    appScreen.style.backgroundColor = '#f4f6f9';

    // Update Security Badge
    if (hasVulnerability) {
      aegisBadge.innerHTML = '<span class="pulse-dot" style="background-color: #d32f2f;"></span> VULNERABLE';
      aegisBadge.style.borderColor = 'rgba(211, 47, 47, 0.4)';
      aegisBadge.style.background = 'rgba(211, 47, 47, 0.1)';
      aegisBadge.style.color = '#d32f2f';
    } else {
      aegisBadge.innerHTML = '<span class="pulse-dot" style="background-color: #48bb78;"></span> SECURE';
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

    // Turn app screen dark navy/red alert
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
      currentMode = 'Aegis';
      modeTextLeft.classList.remove('active');
      modeTextRight.classList.add('active');
    } else {
      currentMode = 'Normal';
      modeTextLeft.classList.add('active');
      modeTextRight.classList.remove('active');
    }
    renderAppState();
  });

  toggleSecurityBtn.addEventListener('click', () => {
    toggleSecurityBtn.classList.toggle('active');
    if (toggleSecurityBtn.classList.contains('active')) {
      currentSecurity = 'Attack';
      secTextLeft.classList.remove('active');
      secTextRight.classList.add('active');
    } else {
      currentSecurity = 'Safe';
      secTextLeft.classList.add('active');
      secTextRight.classList.remove('active');
    }
    renderAppState();
  });

  // Voice command simulation logic
  function resetVoiceSimulation() {
    isListening = false;
    if (voiceTimer) clearTimeout(voiceTimer);
    waveform.classList.remove('active');
    voiceStatusText.textContent = 'Tap to Speak';
    voiceStatusText.classList.remove('listening');
    micTrigger.style.transform = 'scale(1)';
  }

  micTrigger.addEventListener('click', () => {
    if (currentSecurity === 'Attack') {
      // Security intercept prevents voice commands
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

    // Timeline Simulation
    // 1.5 seconds - change status text to "Processing vernacular voice command..."
    voiceTimer = setTimeout(() => {
      voiceStatusText.textContent = 'Processing vernacular voice command...';
      
      // 1.5 more seconds - trigger success modal popup
      voiceTimer = setTimeout(() => {
        successModal.classList.add('active');
        resetVoiceSimulation();
      }, 1500);
      
    }, 1500);
  });

  closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
  });

  // Cluttered Buttons Click Feedback (Normal Mode)
  const clutterBtns = document.querySelectorAll('.clutter-btn');
  clutterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const btnText = btn.querySelector('span:last-child').textContent;
      alert(`Simulator Mode:\nClicked "${btnText}"\nNote: In standard view, this leads to a crowded sub-form with fine print.`);
    });
  });

  // Giant Action Buttons Click (Aegis Mode)
  btnSend.addEventListener('click', () => {
    // Highlight microphone as the preferred accessible interaction
    voiceStatusText.textContent = 'Say "Send 500 Rupees to Ramesh"';
    voiceStatusText.classList.add('listening');
    micTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add glowing border to mic to guide rural/elderly user
    micTrigger.style.outline = '4px solid var(--gold-glow)';
    setTimeout(() => {
      micTrigger.style.outline = 'none';
    }, 1500);
  });

  btnBalance.addEventListener('click', () => {
    alert('Simulated voice assistant response:\n"Savitri Bai, your current balance is ₹1,42,854."\n(खाता शेष: १ लाख ४२ हजार ८५४ रुपये)');
  });

  btnHelp.addEventListener('click', () => {
    alert('Calling Aegis Vernacular Support Center...\nSimulated call to regional help desk launched in Hindi/Marathi.');
  });

  emergencyCallBtn.addEventListener('click', () => {
    alert('Connecting to Safe Line: Dialing SBI Cyber Security Cell Support at 1930...');
  });

  // Set default initial view
  renderAppState();
});
