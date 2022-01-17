function() {
  var lit = require('../lib/lit');
  var sections = [
    {comments: 'Comment 1', code: 'Code One'},
    {comments: 'Comment 2', code: 'Code Two'},
    {comments: 'Comment 3', code: 'Code Three'},
  ];
  var html = lit.makeHtml(sections);
  var split = html.split('<section>');
  assert.equal(split.length, 4);
  assert.include(split[1], 'Code One');
  assert.include(split[1], 'Comment 1');
  assert.equal(split[1].indexOf('Code Two'), -1);
  assert.equal(split[1].indexOf('Code Three'), -1);
  assert.include(split[2], 'Code Two');
  assert.include(split[2], 'Comment 2');
  assert.equal(split[2].indexOf('Code One'), -1);
  assert.equal(split[2].indexOf('Code Three'), -1);
  assert.include(split[3], 'Code Three');
  assert.include(split[3], 'Comment 3');
  assert.equal(split[3].indexOf('Code One'), -1);
  assert.equal(split[3].indexOf('Code Two'), -1);
}