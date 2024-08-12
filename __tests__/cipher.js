const { secret, data, regex } = require('./data/cipher');
const { Payment } = require('../index');

test('Test cipher URL is correct', () => {
  const payment = new Payment(data.project_id, secret, data);
  expect(payment.getCipherUrl()).toMatch(regex);
});
