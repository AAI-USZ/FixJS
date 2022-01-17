function() {
      var $apple = $('.apple', fruits);
      $apple.attr('href', 'http://github.com/"><script>alert("XSS!")</script><br');
      expect($apple.get(0).attribs.href).to.equal('http&colon;&sol;&sol;github&period;com&sol;&quot;&gt;&lt;script&gt;alert&lpar;&quot;XSS&excl;&quot;&rpar;&lt;&sol;script&gt;&lt;br');
      expect($apple.attr('href')).to.equal('http://github.com/"><script>alert("XSS!")</script><br');

      $apple.attr('href', 'http://github.com/"><script>alert("XSS!")</script><br');
      expect($apple.html()).to.not.contain('<script>alert("XSS!")</script>');
    }