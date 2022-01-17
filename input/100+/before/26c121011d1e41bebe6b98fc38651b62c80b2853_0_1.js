function(token, compiledContents,
                            compiledIntermediate, compiler, callback) {

  var parsed = token.tag.match(BLOCK_PARSE_RE);

  if(!parsed) {
    return callback(new Error(  'Compilation error: Unable to parse tag `'
                              + token.tag
                              + '`.')
                              );
  }

  var name = parsed[1];
  var mode = parsed[2];
  
  //console.log(compiledContents);

  var compiled =   '(function(parentAcc) {'
                 +   'var __acc = [];'
                 +   compiledContents
                 +   'var __currentBlock = __acc.join("");'
                 +   'if(!_.isUndefined(__blocks["' + name + '"])) {'
                 +     '__tmp = new String(__blocks["' + name + '"].replace('
                 +       '"{{parent}}", __currentBlock'
                 +     '));'
                 +     'if(__blocks["' + name + '"].mode) {'
                 +       '__tmp.mode = __blocks["' + name + '"].mode;'
                 +     '}'
                 +     '__blocks["' + name + '"] = __tmp;'
                 +   '}'
                 +   'var __acc = [];'
                 +   'if(_.isUndefined(__blocks["' + name + '"]) || __blocks["' + name + '"].mode) {'
                 +     'if(__blocks["' + name + '"] && __blocks["' + name + '"].mode == "append") {'
                 +       '__acc.push(__blocks["' + name + '"]);'
                 +     '}'
                 +     '__acc.push(__currentBlock);'
                 +     'if(__blocks["' + name + '"] && __blocks["' + name + '"].mode == "prepend") {'
                 +       '__acc.push(__blocks["' + name + '"]);'
                 +     '}'
                 +   '} else {'
                 +     '__acc.push(__blocks["' + name + '"]);'
                 +   '}'
                 +   'var __joined = new String(__acc.join(""));'
                 +   (mode ? ('__joined.mode = "' + mode + '";') : '')
                 +   'parentAcc.push(__joined);'
                 +   '__blocks["' + name + '"] = __joined;'
                 + '})(__acc);'

  callback(null, compiled);
}