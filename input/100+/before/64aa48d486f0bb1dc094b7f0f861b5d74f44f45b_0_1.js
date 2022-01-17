function createFunctionBlock(functionIndex, codeObject){
        var func = functions[functionIndex];
        var block = "<table class=\"expr " + func.output  +"\"" + "id=\""+codeObject.id+"\">";
        block += "<tr><th>" + encode(func.name) + "</th>";
        for(var i = 0; i < func.input.length; i++){
                block += "<th class=\"" + encode(func.input[i].type) +" droppable\" id=\""+codeObject.funcIDList[i]+"\">" + func.input[i].name + "</th>";
        }
        return block + "</tr></table>";
 }