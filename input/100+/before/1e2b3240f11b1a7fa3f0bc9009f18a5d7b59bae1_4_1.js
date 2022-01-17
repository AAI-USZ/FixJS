function() {

    it('() : gets the text for a single element', function() {
      expect($('.apple', fruits).text()).to.equal('Apple');
    });

    it('() : combines all text from children text nodes', function() {
      expect($('#fruits', fruits).text()).to.equal('AppleOrangePear');
    });

    it('(text) : sets the text for the child node', function() {
      var $fruits = $(fruits);
      $('.apple', $fruits).text('Granny Smith Apple');
      expect($('.apple', $fruits)[0].children[0].data).to.equal('Granny Smith Apple');
    });

    it('should allow functions as arguments', function() {
      var $fruits = $(fruits);
      $('.apple', $fruits).text(function(idx, content) {
        expect(idx).to.equal(0);
        expect(content).to.equal('Apple');
        return 'whatever mate';
      });
      expect($('.apple', $fruits)[0].children[0].data).to.equal('whatever mate');
    });

    it('should decode special chars', function() {
      var text = $('<p>M&amp;M</p>').text();
      expect(text).to.equal('M&M');
    });

    it('should work with special chars added as strings', function() {
      var text = $('<p>M&M</p>').text();
      expect(text).to.equal('M&M');
    });

  }