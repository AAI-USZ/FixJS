function() {
  var match, plurals, sCF;
  plurals = ['[0]nothing found', '[1]one found', '{2,3,4,5}2-5 found', '(5,10)6-9 found', '[10,15)10-14 found', '[15,20]15-20 found', '(30,+Inf] more the 30 found', '[-Inf,0)less the 0 found', '{n:(n)}(n) found'].join('|');
  sCF = new sfChoiceFormat();
  for (match = -10; match <= 32; match++) {
    document.writeln(match + ': ' + sCF.format(plurals, match) + '<br />');
  }
}