import { strict as assert } from 'node:assert';
import { test, describe } from 'node:test';
import { AegisEngine } from '../src/aegis-engine.js';

describe('Aegis Engine Financial & Multi-Agent Tests', () => {

  test('Initial state setup', () => {
    const engine = new AegisEngine(142854.32);
    assert.equal(engine.balance, 142854.32);
    assert.equal(engine.mode, 'Aegis');
    assert.equal(engine.securityEnv, 'Safe');
  });

  test('Financial deduction with valid transfer', () => {
    const engine = new AegisEngine(1000);
    const result = engine.executeTransfer('Ramesh Kumar (Son)', 500);

    assert.equal(result.success, true);
    assert.equal(engine.balance, 500);
    assert.equal(result.newBalance, 500);
    assert.equal(engine.transactions.length, 4);
    assert.equal(engine.transactions[0].amount, 500);
  });

  test('Rejects zero amount transfer', () => {
    const engine = new AegisEngine(1000);
    const result = engine.executeTransfer('Ramesh Kumar', 0);

    assert.equal(result.success, false);
    assert.equal(result.error, 'ZERO_OR_NEGATIVE');
    assert.equal(engine.balance, 1000);
  });

  test('Rejects negative amount transfer', () => {
    const engine = new AegisEngine(1000);
    const result = engine.executeTransfer('Ramesh Kumar', -150);

    assert.equal(result.success, false);
    assert.equal(result.error, 'ZERO_OR_NEGATIVE');
    assert.equal(engine.balance, 1000);
  });

  test('Rejects overdraft transfer exceeding balance', () => {
    const engine = new AegisEngine(500);
    const result = engine.executeTransfer('Ramesh Kumar', 1000);

    assert.equal(result.success, false);
    assert.equal(result.error, 'INSUFFICIENT_FUNDS');
    assert.equal(engine.balance, 500);
  });

  test('Security Intercept blocks transfer during AnyDesk phone scam attack', () => {
    const engine = new AegisEngine(50000);
    engine.setSecurityEnv('Attack');
    
    const result = engine.executeTransfer('Scammer Account', 5000);

    assert.equal(result.success, false);
    assert.equal(result.error, 'THREAT_BLOCKED');
    assert.equal(engine.balance, 50000);
  });

  test('Vernacular Voice Command Parsing - Hindi & English', () => {
    const engine = new AegisEngine();

    const checkBalResult = engine.parseVoiceCommand('मेरा खाता देखें, कितना पैसा है?');
    assert.equal(checkBalResult.action, 'CHECK_BALANCE');

    const sendMoneyResult = engine.parseVoiceCommand('Send 500 rupees to Ramesh');
    assert.equal(sendMoneyResult.action, 'SEND_MONEY');
    assert.equal(sendMoneyResult.amount, 500);
    assert.equal(sendMoneyResult.beneficiary.name, 'Ramesh Kumar (Son)');

    const helpResult = engine.parseVoiceCommand('मुझे मदद चाहिए, अधिकारी को फोन लगाओ');
    assert.equal(helpResult.action, 'GET_HELP');
  });

  test('Currency Formatting in Indian System', () => {
    const engine = new AegisEngine();
    assert.equal(engine.formatCurrency(142854.32), '1,42,854.32');
  });
});
