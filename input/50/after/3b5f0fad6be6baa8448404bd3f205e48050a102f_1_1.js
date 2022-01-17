function() {
      styleDoc('```html\n<div>Test</div>```', {template: false}).should.equal(
          '<pre><code class="lang-html"><span class="tag">&lt;<span class="title">div</span>&gt;</span>Test<span class="tag">&lt;/<span class="title">div</span>&gt;</span></code></pre>\n'
          + '<div class="style-doc-sample"><div>Test</div></div>');
    }