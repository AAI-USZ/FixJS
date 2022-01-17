function(test) {
  var tag = '_foo';

  var pat = "I*[[AB[H***FDE*ed*fG*gh]*baC*c*]]i*";

  pat = pat.replace(/\*/g, '[]');
  var curNode = document.createDocumentFragment();
  var starts = [];
  var ranges = {};
  for(var i=0; i<pat.length; i++) {
    var c = pat.charAt(i);
    if (/[A-Z]/.test(c)) {
      // open range
      starts.push([curNode, curNode.childNodes.length]);
    } else if (/[a-z]/.test(c)) {
      // close range
      var start = starts.pop();
      var range =
            new Meteor.ui._LiveRange(
              tag, start[0].childNodes[start[1]],
              start[0].lastChild);
      range.letter = c.toUpperCase();
      ranges[range.letter] = range;
    } else if (c === '[') {
      curNode.appendChild(document.createElement("DIV"));
      curNode = curNode.lastChild;
    } else if (c === ']') {
      // close node
      curNode = curNode.parentNode;
    }
  }

  test.equal(ranges.E.findParent().letter, 'D');
  test.equal(ranges.D.findParent().letter, 'F');
  test.equal(ranges.F.findParent().letter, 'H');
  test.equal(ranges.H.findParent().letter, 'B');
  test.equal(ranges.B.findParent().letter, 'A');
  test.equal(ranges.A.findParent().letter, 'I');
  test.equal(ranges.I.findParent(), null);

  test.equal(ranges.E.findParent(true).letter, 'D');
  test.equal(ranges.D.findParent(true).letter, 'F');
  test.equal(ranges.F.findParent(true).letter, 'H');
  test.equal(ranges.H.findParent(true), null);
  test.equal(ranges.B.findParent(true).letter, 'A');
  test.equal(ranges.A.findParent(true), null);
  test.equal(ranges.I.findParent(true), null);

  var path = function(/*args*/) {
    var node = curNode;
    _.each(arguments, function(i) {
      node = node.childNodes[i];
    });
    return node;
  };
  var findRange = function(node) {
    return Meteor.ui._LiveRange.findRange(tag, node);
  };

  test.equal(findRange(path(0)).letter, 'I');
  test.equal(findRange(path(1)).letter, 'I');
  test.equal(findRange(path(2)), null);

  test.equal(findRange(path(1, 0)).letter, 'I');
  test.equal(findRange(path(1, 0, 0)).letter, 'B');
  test.equal(findRange(path(1, 0, 1)).letter, 'B');
  test.equal(findRange(path(1, 0, 2)).letter, 'C');
  test.equal(findRange(path(1, 0, 3)).letter, 'I');

  test.equal(findRange(path(1, 0, 0, 0)).letter, 'H');
  test.equal(findRange(path(1, 0, 0, 1)).letter, 'H');
  test.equal(findRange(path(1, 0, 0, 2)).letter, 'H');
  test.equal(findRange(path(1, 0, 0, 3)).letter, 'E');
  test.equal(findRange(path(1, 0, 0, 4)).letter, 'F');
  test.equal(findRange(path(1, 0, 0, 5)).letter, 'G');

}