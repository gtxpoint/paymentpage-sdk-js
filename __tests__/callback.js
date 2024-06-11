const Callback = require('../src/callback');
const CallbackMock = require('./mock/callback');
const {
  secret, data, dataWithProto1, dataWithProto2,
} = require('./data/callback');

const cb = new Callback(secret, data);
const cbMock1 = new CallbackMock(secret, dataWithProto1);
const cbMock2 = new CallbackMock(secret, dataWithProto2);

test('Property setting', () => {
  expect(cb.callback.payment.id).toBe('000049');
});

test('Signature validation', () => {
  expect(cb.isValid()).toBeTruthy();
});

test('Nested signature validation', () => {
  // simple object clone
  const modifiedCb = JSON.parse(JSON.stringify(data));
  // move signature to object inside callback
  modifiedCb.general = { signature: data.signature };
  // remove first level signature
  delete modifiedCb.signature;
  const callback = new Callback(secret, modifiedCb);

  expect(callback.isValid()).toBeTruthy();
});

test('Constructor error', () => {
  // eslint-disable-next-line no-new
  expect(() => { new Callback('wrong', data); }).toThrow('Invalid signature');
});

test('String in constructor', () => {
  expect((new Callback(secret, JSON.stringify(data))).callback.payment.id).toBe('000049');
});

test('Callback.isPaymentSuccess', () => {
  expect(cb.isPaymentSuccess()).toBeTruthy();
});

test('Callback.getPaymentId', () => {
  expect(cb.getPaymentId()).toBe('000049');
});

test('CallbackMock1.isPaymentDecline (request contains __proto__)', () => {
  expect(cbMock1.isPaymentSuccess()).toBe(false);
});

test('CallbackMock2.isPaymentDecline (request contains __proto__)', () => {
  expect(cbMock2.isPaymentSuccess()).toBe(false);
});
