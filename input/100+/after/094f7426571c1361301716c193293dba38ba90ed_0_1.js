function checkFiles() {
  // Should see 1.jpg, 2.jpg, ..., 100.jpg in tmpDir
  var files = fs.readdirSync(common.tmpDir);
  assert(total <= files.length);

  for (var i = 0; i < total; i++) {
    var fn = i + '.jpg';
    assert.ok(files.indexOf(fn) >= 0, "couldn't find '" + fn + "'");
    var stat = fs.statSync(common.tmpDir + '/' + fn);
    assert.equal(image.length, stat.size,
                 "size doesn't match on '" + fn +
                 "'. Got " + stat.size + ' bytes');
  }

  checkedFiles = true;
}