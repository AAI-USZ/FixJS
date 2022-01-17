function() {

    it('() : should get all the attributes', function() {
      var attrs = $('ul', fruits).attr();
      expect(attrs.id).to.equal('fruits');
    });

    it('(invalid key) : invalid attr should get undefined', function() {
      var attr = $('.apple', fruits).attr('lol');
      expect(attr).to.be(undefined);
    });

    it('(valid key) : valid attr should get value', function() {
      var cls = $('.apple', fruits).attr('class');
      expect(cls).to.equal('apple');
    });

    it('(key, value) : should set attr', function() {
      var $fruits = $(fruits);
      var $pear = $('.pear', $fruits).attr('id', 'pear');
      expect($('#pear', $fruits)).to.have.length(1);
      expect($pear.cheerio).to.not.be(undefined);
    });

    it('(map) : object map should set multiple attributes', function() {
      var $fruits = $(fruits);
      $('.apple', $fruits).attr({
        id: 'apple',
        style: 'color:red;',
        'data-url': 'http://apple.com'
      });
      var attrs = $('.apple', $fruits).attr();
      expect(attrs.id).to.equal('apple');
      expect(attrs.style).to.equal('color:red;');
      expect(attrs['data-url']).to.equal('http://apple.com');
    });

  }