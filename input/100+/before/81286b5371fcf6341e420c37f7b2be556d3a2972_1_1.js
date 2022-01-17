function(){
  describe("stripped",function(){
    it('should remove leading and trailing whitespace', function(){
      be.stripped(' test_string ').should.equal('test_string')
    })
    it('should not remove whitespace in the middle', function(){
      be.stripped('test is string').should.equal('test is string')
    })
  })
  describe("slugified",function(){
    it('should remove leading and trailing whitespace', function(){
      be.slugified(' tests string ').should.equal('tests_string')
    })
    it('should replace whitespace in the middle with underscore', function(){
      be.slugified('test is string').should.equal('test_is_string')
    })
    it('should only leave underscore and a-z', function(){
      be.slugified('test, is string!!!').should.equal('test_is_string')
    })
    it('should downcase', function(){
      be.slugified('Test is String').should.equal('test_is_string')
    })
  })
  describe("capitalized",function(){
    it('should turn to cap cased from downcased', function(){
      be.capitalized('test string').should.equal('Test String')
    })
    it('should turn to cap cased from upcased', function(){
      be.capitalized('TEST STRING').should.equal('Test String')
    })
    it('should turn to cap cased from mixcased', function(){
      be.capitalized('TeST StrING').should.equal('Test String')
    })
    
  })
  describe("shownAsTime",function(){
    it('should return the number as a short time string', function(){
      be.shownAsTime(14400000).should.equal('04:00:00')
    })
    it('should return 00:00:00 when the argument is not a number', function(){
      be.shownAsTime('string').should.equal('0:00:00')
    })
  })
  describe("sentence",function(){
    it('should return a sentence from a list of string', function(){
      be.sentence('the','test','string').should.equal('the, test and string')
    })
    it('should return a sentence from a array of string', function(){
      be.sentence(['the','test','string']).should.equal('the, test and string')
    })
    
  })
}