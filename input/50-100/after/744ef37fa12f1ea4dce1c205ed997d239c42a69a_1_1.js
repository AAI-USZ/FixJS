function() {
  var match, plurals, sCF;
  plurals = ['[0]nothing found', '[1]one found', '{2,3,4,5}2 or ... or 5 found', '(5,10)6-9 found', '[10,15)10-14 found', '[15,20]15-20 found', '(30,+Inf] more the 30 found', '[-10,0)less than 0 found', '{n:(n%6 == 0)} mod(6) found', '{n:(1)} anything found'].join('|');
  sCF = new sfChoiceFormat();
  for (match = -32; match <= 32; match++) {
    document.writeln(match + ': ' + sCF.format(plurals, match) + '<br />');
  }
}