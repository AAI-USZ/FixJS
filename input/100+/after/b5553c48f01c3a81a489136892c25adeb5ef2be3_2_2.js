function tokenize(fileName, data){
  var t = new Tokenizer();

  // Used to determine on which line an error occured.
  var lineNumber = 1;
  var lines = data.split('\n');

  // Lots of tokens commonly known for JavaScript.
  t.addRule(/^('[^']*'|"[^"]*")/, 'string');
  t.addRule(/^\n\s*\}\)/, 'final-brackets');
  t.addRule(/^\}\(\)\);/, 'final-brackets-execution');
  t.addRule(/^\./, 'dot');
  t.addRule(/^\s+/, 'whitespace');
  t.addRule(/^\/{2,}[^\n]*/, 'comment');
  t.addRule(/^\/\*(([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*)\*+\//, 'block-comment');
  t.addRule(/^\/.*\/[gmi]*/, 'regexp');
  t.addRule(/^[\+\&\|\>\<\-\*\/]\=/, 'assignment');
  t.addRule(/^([+-]{2}[\w\d]+|[\w\d]+[+-]{2})/, 'short-math');
  t.addRule(/^[\+\-\*\/]/, 'operator');
  t.addRule(/^\!=+/, 'not-equal');
  t.addRule(/^={1,3}/, 'equals');
  t.addRule(/^if[^\w]/, 'if', 2);
  t.addRule(/^else[^\w]/, 'else', 4);
  t.addRule(/^for[^\w]/, 'for', 3);
  t.addRule(/^while[^\w]/, 'while', 5);
  t.addRule(/^switch[^\w]/, 'switch', 6);
  t.addRule(/^do[^\w]/, 'do', 2);
  t.addRule(/^case[^\w]/, 'case', 4);
  t.addRule(/^throw[^\w]/, 'throw', 5);
  t.addRule(/^\!/, 'not');
  t.addRule(/^\(/, 'left-circle-bracket');
  t.addRule(/^\)/, 'right-circle-bracket');
  t.addRule(/^\[/, 'left-square-bracket');
  t.addRule(/^\]/, 'right-square-bracket');
  t.addRule(/^\</, 'left-angle-bracket');
  t.addRule(/^\>/, 'right-angle-bracket');
  t.addRule(/^\{/, 'left-curly-bracket');
  t.addRule(/^\}/, 'right-curly-bracket');
  t.addRule(/^function/, 'function');
  t.addRule(/^var/, 'var');
  t.addRule(/^\n/, 'newline');
  t.addRule(/^[\w\d]+/, 'word');

  // Output a well-formatted error.
  function reportError(error){
    console.log(fileName + ':' + lineNumber + ':  ' + error + ' \n' + lines[lineNumber-1]);
  }

  // Figure out how many newlines were in a match and advance the counter.
  function collectNewlines(match){
    var newlineMatch = match.match(/\n/g);
    if(newlineMatch){
      lineNumber += newlineMatch.length;
    }
  }

  // Listeners!

  t.on('function', function(){
    if(t.lastToken !== 'whitespace'){
      reportError('no whitespace before "function" keyword. found "' + t.lastCharacter + '" instead.');
    }
  });

  t.on('final-brackets', collectNewlines);
  t.on('block-comment', collectNewlines);
  t.on('whitespace', collectNewlines);

  t.on('left-circle-bracket', function(match){
    if(['if', 'for', 'while', 'switch'].indexOf(match) > -1){
      reportError('no whitespace after "' + t.lastMatch + '" keyword. found "' + match + '" instead.' );
    }
  });

  t.on('left-curly-bracket', function(match){
    if(t.lastToken !== 'whitespace'){
      reportError('no whitespace before "' + match + '". found "' + t.lastMatch + '" instead.' );
    }
  });

  t.on('right-circle-bracket', function(match){
    if(['whitespace', 'left-circle-bracket'].indexOf(t.lastToken) === -1 ){
      reportError('no whitespace after "' + t.lastMatch + '". found "' + match + '" instead.' );
    }
  });

  t.on('equals', function(match){
    if(t.lastToken !== 'whitespace'){
      reportError('no whitespace before "=". found "' + t.lastMatch + '" instead.');
    }
  });

  t.on('word', function(match){
    if(['whitespace', 'dot', 'not'].indexOf(t.lastToken) === -1){
      reportError('no whitespace before "' + match + '". found "' + t.lastMatch + '" instead.' );
    }
  });

  t.on('operator', function(match){
    if(t.lastToken !== 'whitespace'){
      reportError('no whitespace before "' + match + '". found "' + t.lastMatch + '" instead.' );
    }
  });

  t.on('assignment', function(match){
    if(t.lastToken !== 'whitespace'){
      reportError('no whitespace before "' + match + '". found "' + t.lastMatch + '" instead.' );
    }  });

  t.tokenize(data);
}
