/**
 * Aegis Banking AI - Core Engine & Financial Logic
 * Handles state management, financial validation, multi-agent status, 
 * voice command processing, and security checks.
 */

export class AegisEngine {
  constructor(initialBalance = 142854.32) {
    this.balance = initialBalance;
    this.accountNumber = "4092";
    this.accountHolder = "Savitri Bai";
    this.mode = "Aegis"; // 'Normal' | 'Aegis'
    this.securityEnv = "Safe"; // 'Safe' | 'Attack'
    this.language = "hi-IN"; // 'hi-IN' | 'mr-IN' | 'en-IN' | 'gu-IN' | 'ta-IN' | 'te-IN'
    this.highContrast = false;
    this.fontSizeMultiplier = 1;

    this.beneficiaries = [
      { id: "b1", name: "Ramesh Kumar (Son)", relation: "Son", upi: "ramesh@sbi", phone: "+91 98765 43210", avatar: "👨" },
      { id: "b2", name: "Suresh Milkman", relation: "Vendor", upi: "suresh.dairy@upi", phone: "+91 98123 45678", avatar: "🥛" },
      { id: "b3", name: "Priya Sharma (Daughter)", relation: "Daughter", upi: "priya@okicici", phone: "+91 97654 32109", avatar: "👩" },
      { id: "b4", name: "Electricity Board (MSEDCL)", relation: "Utility", upi: "msedcl@bbps", phone: "1800 233 3435", avatar: "⚡" }
    ];

    this.transactions = [
      {
        id: "TXN" + Math.floor(100000 + Math.random() * 900000),
        type: "CREDIT",
        title: "PM-KISAN Samman Nidhi",
        category: "Government Subsidy",
        amount: 2000.00,
        date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
        time: "11:30 AM",
        status: "SUCCESS"
      },
      {
        id: "TXN" + Math.floor(100000 + Math.random() * 900000),
        type: "DEBIT",
        title: "Suresh Milkman",
        category: "Milk & Grocery",
        amount: 650.00,
        date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
        time: "08:15 AM",
        status: "SUCCESS"
      },
      {
        id: "TXN" + Math.floor(100000 + Math.random() * 900000),
        type: "CREDIT",
        title: "Interest Credit (Quarterly)",
        category: "Bank Interest",
        amount: 1240.50,
        date: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0],
        time: "06:00 AM",
        status: "SUCCESS"
      }
    ];

    this.agentStates = {
      uxMorphist: { name: "UX Morphist Agent", status: "Active - Adaptive Voice Layout" },
      guardianShield: { name: "Guardian Shield Agent", status: "Monitoring - Threat Sensor Clear" },
      wealthNavigator: { name: "Wealth Navigator Agent", status: "Ready - Vernacular NLU Engaged" }
    };
  }

  // Set Interface Mode
  setMode(mode) {
    if (mode === "Normal" || mode === "Aegis") {
      this.mode = mode;
      this.agentStates.uxMorphist.status = mode === "Aegis" ? 
        "Active - Adaptive Voice Layout" : "Standby - Cluttered Legacy Dashboard";
    }
    return this.mode;
  }

  // Set Security Environment
  setSecurityEnv(env) {
    if (env === "Safe" || env === "Attack") {
      this.securityEnv = env;
      this.agentStates.guardianShield.status = env === "Attack" ?
        "INTERCEPTING - Threat Blocked (AnyDesk Remote Control Detected)" :
        "Monitoring - Threat Sensor Clear";
    }
    return this.securityEnv;
  }

  // Set Vernacular Language
  setLanguage(langCode) {
    const supported = ["hi-IN", "mr-IN", "en-IN", "gu-IN", "ta-IN", "te-IN"];
    if (supported.includes(langCode)) {
      this.language = langCode;
    }
    return this.language;
  }

  // Financial Transfer Logic with strict validation
  executeTransfer(beneficiaryName, amount, pin = "1234") {
    // Security check
    if (this.securityEnv === "Attack" && this.mode === "Aegis") {
      return {
        success: false,
        error: "THREAT_BLOCKED",
        message: "Security override active. Remote control / scam call threat detected. Transaction locked for safety."
      };
    }

    // Amount validation
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || !isFinite(numAmount)) {
      return { success: false, error: "INVALID_AMOUNT", message: "Please enter a valid numeric transfer amount." };
    }

    if (numAmount <= 0) {
      return { success: false, error: "ZERO_OR_NEGATIVE", message: "Transfer amount must be greater than zero." };
    }

    if (numAmount > this.balance) {
      return { success: false, error: "INSUFFICIENT_FUNDS", message: `Insufficient balance. Available: ₹${this.formatCurrency(this.balance)}` };
    }

    if (numAmount > 100000) {
      return { success: false, error: "LIMIT_EXCEEDED", message: "Per-transaction limit for voice banking is ₹1,00,000." };
    }

    // Perform deduction
    this.balance = Math.round((this.balance - numAmount) * 100) / 100;

    const newTxn = {
      id: "TXN" + Math.floor(100000 + Math.random() * 900000),
      type: "DEBIT",
      title: beneficiaryName,
      category: "Voice Transfer",
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "SUCCESS"
    };

    this.transactions.unshift(newTxn);

    return {
      success: true,
      transaction: newTxn,
      newBalance: this.balance,
      formattedBalance: this.formatCurrency(this.balance)
    };
  }

  // Parse Vernacular Speech Input
  parseVoiceCommand(transcript) {
    if (!transcript || typeof transcript !== "string") {
      return { action: "UNKNOWN", confidence: 0 };
    }

    const text = transcript.toLowerCase().trim();

    // Check Balance Intents
    if (
      text.includes("balance") || 
      text.includes("khata") || 
      text.includes("खाता") || 
      text.includes("शेष") || 
      text.includes("पैसे कितने") ||
      text.includes("शिल्लक") ||
      text.includes("check balance")
    ) {
      return { action: "CHECK_BALANCE", confidence: 0.95 };
    }

    // Help Intents
    if (
      text.includes("help") || 
      text.includes("madad") || 
      text.includes("मदद") || 
      text.includes("सहायता") || 
      text.includes("call officer") || 
      text.includes("मदत")
    ) {
      return { action: "GET_HELP", confidence: 0.92 };
    }

    // Send Money Intents
    if (
      text.includes("send") || 
      text.includes("pay") || 
      text.includes("bhejo") || 
      text.includes("भेज") || 
      text.includes("द्या") || 
      text.includes("transfer")
    ) {
      // Extract numbers for amount
      const amountMatch = text.match(/(\d+)/);
      const amount = amountMatch ? parseInt(amountMatch[1], 10) : 500;

      // Extract target beneficiary match
      let targetBen = this.beneficiaries[0]; // default Son
      if (text.includes("milk") || text.includes("doodh") || text.includes("दूध")) {
        targetBen = this.beneficiaries[1];
      } else if (text.includes("priya") || text.includes("daughter") || text.includes("बेटी")) {
        targetBen = this.beneficiaries[2];
      } else if (text.includes("bill") || text.includes("electricity") || text.includes("बिजली")) {
        targetBen = this.beneficiaries[3];
      }

      return {
        action: "SEND_MONEY",
        amount: amount,
        beneficiary: targetBen,
        confidence: 0.90
      };
    }

    return { action: "GENERAL_QUERY", query: transcript, confidence: 0.70 };
  }

  // Format currency in Indian numbering system
  formatCurrency(val) {
    const num = parseFloat(val);
    if (isNaN(num)) return "0.00";
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
