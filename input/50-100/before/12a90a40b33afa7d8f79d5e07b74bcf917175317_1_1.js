function() {
    var ast;
    ast = LZ.getNthBody((LZ.parseFull('\\pairF . \\l1 . \\l2 . pairF (head l1) (_append pairF (tail l1) l2)'))[0], 4);
    console.log("TEST 34, AST: " + (Parse.print(ast)));
    return assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "_pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_l1)))})})())((function(){var $m; return (function(){return $m || ($m = (__append()(_pairF)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l1)))})})())(_l2)))})})())");
  }