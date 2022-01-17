function makeCodeFromOptions(optionsText){
        var i;
        if(optionsText === "define-function"){
                        return new ExprDefineFunc();
                } else if (optionsText === "define-constant"){
                        return new ExprDefineConst();
                } else if (optionsText === "cond"){
                        return new ExprCond([new ExprBoolAnswer()]);
                } 
                else if(optionsText==="true" || optionsText==="false"){
                        return new ExprBoolean(optionsText);
                }
                else if(optionsText==="Text"){
                        return new ExprString();
                }
                else if(optionsText==="Number"){
                        return new ExprNumber();
                }
                else if(optionsText==="define-struct"){
                        //todo
                        return;
                }
                else{
                        for(i = 0; i < functions.length; i++){
                                if (functions[i].name === optionsText){
                                        return new ExprApp(optionsText, functions[i].input);
                                }
                        }
                        for(i=0;i<constants.length;i++){
                                if (constants[i].name === optionsText){
                                        return new ExprConst(optionsText);
                                }
                        }
                        throw new Error("createBlock: internal error");
                }
        }