function() {
    var templates;
    if (path.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
    liz.manage([firstFile, secondFile], outputFile);
    assert(path.existsSync(outputFile));
    templates = require(outputFile);
    assert.equal(templates.third.template.render({
      three: '3'
    }), 'template 3');
    assert.equal(templates.second.template.render({
      two: '2'
    }), 'template 2');
    assert.equal(_.keys(templates.second).length, 1);
    if (path.existsSync(outputFile)) {
      return fs.unlinkSync(outputFile);
    }
  }