function () {

  var code = 'some code'
    , highlightedCode = '<somecode>'
    , returnedCode
    , language
    , usedOpts
    ;

  before(function () {
    function Brush() { }

    Brush.prototype.init = function (opts) {
      usedOpts = opts;
    }

    Brush.prototype.getHtml = function (c) {
      if (c === code) return highlightedCode; else return undefined;
    }

    language = { Brush: Brush };
  })

  beforeEach(function () {
    usedOpts = undefined;
  })

  describe('when I call highlight with a language, but no options', function () {
    beforeEach(function () {
      returnedCode = nsh.highlight(code, language);
    });

    it('initializes brush with no toolbar option', function () {
      usedOpts.toolbar.should.be.false;
    })     
    it('initializes brush without gutter option', function () {
      should.not.exist(usedOpts.gutter)
    })     
    it('initializes brush without tabsize option', function () {
      should.not.exist(usedOpts['tab-size'])
    })     

    it('returns highlighted code', function () {
      returnedCode.should.eql(highlightedCode);
    })
  })
  
  describe('when I call highlight with a language, and options { toolbar: true, tab-size: 2 } ', function () {
    beforeEach(function () {
      returnedCode = nsh.highlight(code, language, { toolbar: true, 'tab-size': 2 });
    });

    it('initializes brush with toolbar option', function () {
      usedOpts.toolbar.should.be.true;
    })     
    it('initializes brush without gutter option', function () {
      should.not.exist(usedOpts.gutter)
    })     
    it('initializes brush with tab-size 2 option', function () {
      usedOpts['tab-size'].should.eql(2);
    })     

    it('returns highlighted code', function () {
      returnedCode.should.eql(highlightedCode);
    })
  })

  describe('highlight with invalid arguments', function () {
    it('throws an error instructing to pass a language when I don\'t pass one', function () {
      (function () {
        nsh.highlight(code)
      }).should.throw(/pass a language/);
    })

    it('throws an error instructing to pass a language with a Brush when I pass one without a Brush', function () {
      (function () {
        nsh.highlight(code, { })
      }).should.throw(/pass a language with a Brush/);
    })
  })
}