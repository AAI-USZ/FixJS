function run(source) {
  var tokens = lexer.lex(source);
  console.log('Lexer finished, tokens: \n');
  console.log(tokens);

  parser.yy = nodes; 
  parser.lexer =  {
    "lex": function() {
      var token = this.tokens[this.pos] ? this.tokens[this.pos++] : ['EOF'];
      this.yytext = token[1];
      this.yylineno = token[2];
      return token[0];
    },
    "setInput": function(tokens) {
      this.tokens = tokens;
      this.pos = 0;
    },
    "upcomingInput": function() {
      return "";
    }
  };

  var ast = parser.parse(tokens);
  console.log('\nParser finished, abstract syntax tree: \n');
  console.log(ast);

  console.log("\nIntepreting code, output: \n");
  context = interpreter.run(ast);
  console.log('\nIntepreter finished, final context:\n');
  console.log(context);
  
  return context;
}