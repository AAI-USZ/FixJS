function() {
  var lit = require('../lib/lit');
  var sections = [
    {comments: 'Comment 1', code: 'Code 1'},
    {comments: 'Comment 2', code: 'Code 2'},
    {comments: 'Comment 3', code: 'Code 3'},
  ];
  var html = lit.makeHtml(sections);
  var split = html.split('<section>');
  assert.equal(split.length, 4);
  assert.notEqual(split[1].indexOf('Code 1'), -1);
  assert.notEqual(split[1].indexOf('Comment 1'), -1);
  assert.equal(split[1].indexOf('Code 2'), -1);
  assert.equal(split[1].indexOf('Code 3'), -1);
  assert.notEqual(split[2].indexOf('Code 2'), -1);
  assert.notEqual(split[2].indexOf('Comment 2'), -1);
  assert.equal(split[2].indexOf('Code 1'), -1);
  assert.equal(split[2].indexOf('Code 3'), -1);
  assert.notEqual(split[3].indexOf('Code 3'), -1);
  assert.notEqual(split[3].indexOf('Comment 3'), -1);
  assert.equal(split[3].indexOf('Code 1'), -1);
  assert.equal(split[3].indexOf('Code 2'), -1);
}