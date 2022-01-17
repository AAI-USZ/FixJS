function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
    Fkd.GrassToJSTranslator.StateMachine = Fkd.GrassToJSTranslator.StateMachine || {};
    var g = Fkd.GrassToJSTranslator;
    var s = Fkd.GrassToJSTranslator.StateMachine;
    var u = Fkd.Utility;

    var isPrivate = true;
    s.LowerVState = function() {
        if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
    };
    var instance = new s.LowerVState();
    s.LowerVState.getInstance = function() {
        return instance;
    };
    s.LowerVState.prototype.scan = function(context, character) {
        if (arguments.length == 2 && context instanceof s.Context && new Object(character) instanceof String && character.length <= 1) {
            switch (character) {
                case "W": case "\uff37":
                    context.upperCaseWCountInFunctionApplication = 1;
                    context.state = s.FunctionApplicationUpperCaseWState.getInstance();
                    break;
                case "w": case "\uff57":
                    context.header = context.header + context.getFunctionDefinitionHeader(0) + context.getFunctionDefinitionArgumentHeader(1);
                    context.footer = context.getFunctionDefinitionArgumentFooter(1) + context.getFunctionDefinitionFooter(0);
                    context.indentLevel = 3;
                    context.state = s.FunctionDefinitionArgumentState.getInstance();
                    break;
                case "v": case "\uff56":
                    throw new Error("unexpected 'v' on line " + context.line);
                case "":
                    context.state = null;
                    break;
                case "\n":
                    context.line++;
                    break;
            }
        } else {
            throw new Error(u.ErrorMessage.overload);
        }
    };
    isPrivate = false;
}