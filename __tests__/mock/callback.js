const OriginCallback = require('../../src/callback');

class CallbackMock extends OriginCallback {
  // eslint-disable-next-line class-methods-use-this
  isValid() {
    return true;
  }
}

module.exports = CallbackMock;
