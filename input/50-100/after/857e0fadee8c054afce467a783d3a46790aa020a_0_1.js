function resultsToDOM(){

  var modOutput = document.createElement('div'),
      ref = document.getElementById('qunit-testresult') || document.getElementById('qunit-tests');

  modOutput.className = 'output';
  modOutput.innerHTML = dumpModernizr();

  ref.parentNode.insertBefore(modOutput, ref);

  // Modernizr object as text
  document.getElementsByTagName('textarea')[0].innerHTML = JSON.stringify(Modernizr);

}