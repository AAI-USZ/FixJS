function interpreter(obj){
    var toReturn = "";
    var i;
    if(obj == undefined){
        toReturn += "**UNDEFINED**"
    }else if(obj instanceof ExprDefineConst){
        toReturn += "(define " + obj.constName + " \n" + interpreter(obj.expr) + ")";
    }else if(obj instanceof ExprDefineFunc){
        toReturn += ";" + obj.contract.funcName + ":";
        for(i = 0; i < obj.contract.argumentTypes.length; i++){
                    toReturn += " " + obj.contract.argumentTypes[i];
        }
        toReturn += " -> " + obj.contract.outputType + "\n";
        toReturn += "(define (" + obj.contract.funcName;
        for(i = 0; i < obj.argumentNames.length; i++){
            toReturn += " " + obj.argumentNames[i];
        }
        toReturn += ")\n" + interpreter(obj.expr) + ")";
    }else if(obj instanceof ExprApp){
        toReturn += "(" + decode(obj.funcName);
        for(i=0; i < obj.args.length; i++){    
            toReturn += " " + interpreter(obj.args[i]);
        }
        toReturn += ")";
    }else if(obj instanceof ExprNumber || obj instanceof ExprBoolean){
        toReturn += obj.value;
    }else if(obj instanceof ExprString){
        toReturn += "\"" + obj.value + "\"";
    }else if(obj instanceof ExprConst){
        toReturn += decode(obj.constName);
    }else if(obj instanceof ExprCond){
        toReturn += "(cond";
        for(i = 0; i < obj.listOfBooleanAnswer.length; i++){
            toReturn += "\n[" + interpreter(obj.listOfBooleanAnswer[i].bool) + " " + interpreter(obj.listOfBooleanAnswer[i].answer) + "]";
        }
        toReturn+= ")";
    }
    return toReturn;
}