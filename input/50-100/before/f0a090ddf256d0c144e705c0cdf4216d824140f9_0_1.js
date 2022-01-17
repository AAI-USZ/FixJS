function() {
    var map = new SiteMap([new Doc({section: 'foo', id: 'a.b.c<>\'"&'})]);
    expect(map.render()).toContain([
      ' <url>',
      '<loc>http://docs.angularjs.org/#!/foo/a.b.c&lt;&gt;&apos;&quot;&amp;</loc>',
      '<changefreq>weekly</changefreq>',
      '</url>'].join(''));

  }