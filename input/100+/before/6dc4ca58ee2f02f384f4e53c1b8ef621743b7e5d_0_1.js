function replaceLocaleStrings ( ast, mapping ) {
    mapping = mapping || {};
    // Base set of things
    if ( ast && ast.type === "program" && ast.statements ) {
      _(ast.statements).forEach(function(statement, i){
        var newString = "<!-- i18n error -->";
        // If it's a translation node
        if ( statement.type == "mustache" && statement.id && statement.id.original == "$" ) {
          
          if ( statement.params.length && statement.params[0].string ) {
            newString = mapping[ statement.params[0].string ] || newString;
          }
          ast.statements[i] = new Handlebars.AST.ContentNode(newString);
        }
        // If we need to recurse
        else if ( statement.program ) {
          statement.program = replaceLocaleStrings( statement.program, mapping );
        }
      });
    }
    return ast;
  }