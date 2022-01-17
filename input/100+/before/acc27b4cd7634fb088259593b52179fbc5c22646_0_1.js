function(exists) {
    var body, dir, ext, misc, page, pages, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    if (exists) {
      wrench.rmdirSyncRecursive(gen);
    }
    fs.mkdirSync(gen);
    pages = wrench.readdirSyncRecursive("" + proj + "/pages");
    for (_i = 0, _len = pages.length; _i < _len; _i++) {
      page = pages[_i];
      console.log(page);
      page = page.replace("pages/", '');
      ext = page.split('.')[1];
      if (ext === 'html') {
        body = renderHtml('/' + page.replace('.html', ''));
      } else if (ext === 'md') {
        body = renderMarkdown(proj, '/' + page.replace('.md', ''));
        page = page.replace('.md', '.html');
      } else {
        fs.mkdirSync("" + gen + "/" + page);
      }
      if (ext != null) {
        fs.writeFileSync("" + gen + "/" + page, renderTemplate(proj, body), 'utf8');
      }
    }
    _ref = ['images', 'javascripts', 'stylesheets', 'ico', 'img', 'js', 'css'];
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      dir = _ref[_j];
      try {
        fs.mkdirSync("" + gen + "/" + dir);
        wrench.copyDirSyncRecursive("" + proj + "/" + dir, "" + gen + "/" + dir);
        console.log('copy assets');
      } catch (err) {
        console.log(err.message);
      }
    }
    _ref1 = ['404.html', 'robots.txt'];
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      misc = _ref1[_k];
      console.log('copy misc');
      fs.copyFileSync("" + proj + "/" + misc, "" + gen + "/" + misc);
    }
    console.log('Generated Static Site in the gen folder...');
    if (cb != null) {
      return cb(null, 'success');
    }
  }