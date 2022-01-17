function(test) {
  var str = "I*[[AB[H***FDE*ed*fG*gh]*baC*c*]]J*ji*";
  var pat = makeTestPattern(str);

  pat.ranges.D.destroy();
  test.equal(pat.currentString(), str.replace(/[Dd]/g, ''));
  pat.ranges.B.destroy();
  test.equal(pat.currentString(), str.replace(/[DdBb]/g, ''));
  pat.ranges.A.destroy();
  test.equal(pat.currentString(), str.replace(/[DdBbAa]/g, ''));

  // recursive destroy
  pat.ranges.F.destroy(true);
  test.equal(pat.currentString(),
             "I*[[[H*****G*gh]*C*c*]]J*ji*");
  pat.ranges.I.destroy(true);
  test.equal(pat.currentString(),
             "*[[[******]***]]**");

  var childrenHaveNoTags = function(node) {
    for(var n = node.firstChild; n; n = n.nextSibling) {
      test.isFalse(node[pat.tag]);
      if (n.firstChild)
        childrenHaveNoTags(n); // recurse
    }
  };

  childrenHaveNoTags(pat.frag);

  // test recursive on single node
  var frag = document.createDocumentFragment();
  var txt = document.createComment("pudding");
  frag.appendChild(txt);
  var rng5 = new Meteor.ui._LiveRange('_pudding', txt);
  var rng4 = new Meteor.ui._LiveRange('_pudding', txt);
  var rng3 = new Meteor.ui._LiveRange('_pudding', txt);
  var rng2 = new Meteor.ui._LiveRange('_pudding', txt);
  var rng1 = new Meteor.ui._LiveRange('_pudding', txt);
  rng1.num = 1;
  rng2.num = 2;
  rng3.num = 3;
  rng4.num = 4;
  rng5.num = 5;
  // kill an inner range
  rng4.destroy(true);
  // check that outer ranges are still there
  var buf = [];
  rng1.visit(function(is_start, r) {
    buf.push([is_start, r.num]);
  });
  test.equal(buf, [[true, 2], [true, 3], [false, 3], [false, 2]]);
}