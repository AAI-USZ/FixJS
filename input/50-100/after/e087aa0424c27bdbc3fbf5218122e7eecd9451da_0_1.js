function makeActionFactory(topLevelScripts,actionStrings){
    var fnBody = (topLevelScripts.length ? "with(datamodel){\n" + topLevelScripts.join(";;\n") + "}\n" : "") +             //return top-level scripts which get executed on startup
                "return [\n" + actionStrings.join(",\n") + "\n];";   //return all functions which get called during execution

    //JScript doesn't return functions from evaled function expression strings, 
    //so we wrap it here in a trivial self-executing function which gets evaled
    var fnStr = "(function(){return (function(datamodel){" + fnBody +  "}) })()";
    return eval(fnStr); 
}