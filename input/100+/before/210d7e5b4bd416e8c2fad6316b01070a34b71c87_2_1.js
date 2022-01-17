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
}