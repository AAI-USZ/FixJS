function() {
    should.exist(require('assert').AssertionError);
    should.exist(require('events').EventEmitter);
    should.exist(require('http').STATUS_CODES);
    should.exist(require('path').dirname);
    should.exist(require('tty').isatty);
    should.exist(require('util').inspect);
  }