function(code){
        console.log(code);
        var tokens;
        var erros=[];
        try {
            tokens = this.lexical(code);
        } catch (e){
            tokens = e.tokens;
            erros = erros.concat(e.erros);
        }
        var ast;
        try {
            ast = this.syntax(tokens);
        } catch (e){
            ast = e.ast;
            erros = erros.concat(e.erros);
        }
        var opcodes;
        try {
            opcodes = this.semantic(ast, true);
        }catch (e){
            erros = erros.concat(e.erros);
        }
        if (erros.length > 0){
            throw erros;
        } else {
            return String.fromCharCode.apply(undefined,opcodes);
        }
    }