function() {
      var $apple = $('.apple', fruits);
      
      $apple.text('blah <script>alert("XSS!")</script> blah');
      expect($apple.get(0).children[0].data).to.equal('blah &lt;script&gt;alert&lpar;&quot;XSS&excl;&quot;&rpar;&lt;&sol;script&gt; blah');
      expect($apple.text()).to.equal('blah <script>alert("XSS!")</script> blah');

      $apple.text('blah <script>alert("XSS!")</script> blah');
      expect($apple.html()).to.not.contain('<script>alert("XSS!")</script>');
    }