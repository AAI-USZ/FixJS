function() {
  var string = Parser.string;
  var regex = Parser.regex;
  var letter = Parser.letter;
  var any = Parser.any;

  var variable = letter.then(Variable);
  var symbol = regex(/^[^{}]/).then(VanillaSymbol);

  var supSub = regex(/^[_^]/);

  var controlSequence =
    supSub
    .or(string('\\').then(
      regex(/^[a-z]+/i)
      .or(regex(/^\s+/).then(' '))
      .or(any)
    )).then(function(ctrlSeq) {
      var cmdKlass = LatexCmds[ctrlSeq];

      if (cmdKlass) {
        return cmdKlass(ctrlSeq).parser();
      }
      else {
        var textBlock = TextBlock();
        textBlock.replaces(ctrlSeq);
        return textBlock;
      }
    })
  ;

  var command =
    controlSequence
    .or(variable)
    .or(symbol)
  ;

  // Parser [MathCommand]
  var group =
    string('{')
    .then(function() { return commandSequence; })
    .skip(string('}'))
  ;

  var commandOrInnerGroup =
    group.or(command.then(function(x) { return [x]; }))
  ;

  // Parser MathBlock
  var commandSequence =
    commandOrInnerGroup
    .many().then(function(lists) {
      var block = MathBlock();

      for (var i = 0; i < lists.length; i += 1) {
        for (var j = 0; j < lists[i].length; j += 1) {
          lists[i][j].adopt(block, block.lastChild, 0);
        }
      }

      return block;
    });

  // Parser MathBlock
  var block =
    group.or(command.then(function(cmd) {
      var block = MathBlock();
      cmd.adopt(block, 0, 0);
      return block;
    }))
  ;

  var latex =
    commandSequence.then(function(block) {
      var rootBlock = RootMathBlock();
      block.children().adopt(rootBlock, 0, 0);
      return rootBlock;
    })
  ;

  latex.block = block;
  return latex;

}