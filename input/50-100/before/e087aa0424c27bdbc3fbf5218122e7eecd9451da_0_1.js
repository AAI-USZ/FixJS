function makeActionFactory(topLevelScripts,actionStrings){
    var fnBody = (topLevelScripts.length ? "with(datamodel){\n" + topLevelScripts.join(";;\n") + "}\n" : "") +             //return top-level scripts which get executed on startup
                "return [\n" + actionStrings.join(",\n") + "\n];";   //return all functions which get called during execution

    var fnStr = "(function(datamodel){" + fnBody +  "})";
    return eval(fnStr); 
}