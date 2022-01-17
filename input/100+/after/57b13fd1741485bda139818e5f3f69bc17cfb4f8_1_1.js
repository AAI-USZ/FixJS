function(test) {
  var str = "I*[[AB[H***FDE*ed*fG*gh]*baC*c*]]i*";
  var pat = makeTestPattern(str);
  test.equal(pat.currentString(), str);

  var ranges = pat.ranges;

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


  test.equal(pat.findRange(pat.path(0)).letter, 'I');
  test.equal(pat.findRange(pat.path(1)).letter, 'I');
  test.equal(pat.findRange(pat.path(2)), null);

  test.equal(pat.findRange(pat.path(1, 0)).letter, 'I');
  test.equal(pat.findRange(pat.path(1, 0, 0)).letter, 'B');
  test.equal(pat.findRange(pat.path(1, 0, 1)).letter, 'B');
  test.equal(pat.findRange(pat.path(1, 0, 2)).letter, 'C');
  test.equal(pat.findRange(pat.path(1, 0, 3)).letter, 'I');

  test.equal(pat.findRange(pat.path(1, 0, 0, 0)).letter, 'H');
  test.equal(pat.findRange(pat.path(1, 0, 0, 1)).letter, 'H');
  test.equal(pat.findRange(pat.path(1, 0, 0, 2)).letter, 'H');
  test.equal(pat.findRange(pat.path(1, 0, 0, 3)).letter, 'E');
  test.equal(pat.findRange(pat.path(1, 0, 0, 4)).letter, 'F');
  test.equal(pat.findRange(pat.path(1, 0, 0, 5)).letter, 'G');

}