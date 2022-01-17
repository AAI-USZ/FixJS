function() {
    "use strict";
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.GrassToJSTranslator = Fkd.GrassToJSTranslator || {};
    Fkd.GrassToJSTranslator.StateMachine = Fkd.GrassToJSTranslator.StateMachine || {};
    var g = Fkd.GrassToJSTranslator;
    var s = Fkd.GrassToJSTranslator.StateMachine;
    var u = Fkd.Utility;

    var isPrivate = true;
    s.InitialState = function() {
        if (!isPrivate) throw new Error(u.ErrorMessage.accessPrivate);
    };
    var instance = new s.InitialState();
    s.InitialState.getInstance = function() {
        return instance;
    };
    s.InitialState.prototype.scan = function(context, character) {
        if (arguments.length == 2 && context instanceof s.Context && new Object(character) instanceof String && character.length <= 1) {
            switch (character) {
                case "w": case "\uff57":
                    context.header = context.getFunctionDefinitionHeader(0) + context.getFunctionDefinitionArgumentHeader(1);
                    context.footer = context.getFunctionDefinitionArgumentFooter(1) + context.getFunctionDefinitionFooter(0);
                    context.indentLevel = 3;
                    context.state = s.FunctionDefinitionArgumentState.getInstance();
                    break;
                case "":
                    throw new Error("unexpected EOF on line " + context.line);
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