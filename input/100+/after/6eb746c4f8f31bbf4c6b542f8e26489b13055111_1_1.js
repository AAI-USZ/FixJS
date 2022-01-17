function () {
    var FooSchema = new Schema({
      tits : {
        type : String,
        required : true
      }
    })
    FooSchema.plugin(keywords, {
      source: ['moo', 'cow', 'tits']
    , target: 'milk'
    , minLength: 3
    , invalidChar: 'i'
    , override: true
    , naturalize: true
    })
    var BarModel = db.model('keywordBar', FooSchema)
      , bar = new BarModel({ 
          moo: 'fooed bars test one'
        , cow: 'test õne twø lorem'
        , tits: 'three ipsum'
        })
    
    before(function () {
      BarModel.remove(function (err) {
        assert.strictEqual(err, null)
      })
    })

    it('should have custom properties', function (done) {
      assert.strictEqual(typeof FooSchema.paths.moo, 'object')
      assert.strictEqual(typeof FooSchema.paths.cow, 'object')
      assert.strictEqual(typeof FooSchema.paths.milk, 'object')
      assert.strictEqual(typeof FooSchema.methods.extractKeywords, 'function')
      done()
    })

    it('should not override properties', function (done) {
      assert.strictEqual(FooSchema.paths.tits.options.required, true)
      done()
    })

    it('should extract keywords on save', function (done) {
      bar.save(function (err, doc) {
        assert.strictEqual(err, null)
        assert.strictEqual(doc.milk.toString(), [
          'foo', 'bar', 'test', 'on', 'two', 'lorem', 'three', 'ipsum'
        ].toString())
        done()
      })
    })

    it('should manually extract keywords', function (done) {
      var str = 'a two three'
      assert.strictEqual(bar.extractKeywords(str).toString(), ['two', 'three'].toString())
      done()
    })

    it('should manually extract keywords from model', function (done) {
      var words = BarModel.extractKeywords('a two three')
      assert.strictEqual(words.toString(), ['two', 'three'].toString())
      assert.strictEqual(words.toString(), bar.extractKeywords('a two three').toString())
      done()
    })
  }