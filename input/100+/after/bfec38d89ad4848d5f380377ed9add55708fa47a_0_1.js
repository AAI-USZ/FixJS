function makeTypesArray(allFunctions,allConstants){
        var types={};
        for(var i=0;i<allFunctions.length;i++){
                var curOutput=allFunctions[i].output;
                if(types[curOutput]!==undefined){
                        types[curOutput].push(i);
                }
                else{
                        types[curOutput]=[i];
                }


                var curInput=allFunctions[i].input;
                if(unique(curInput) && curInput.length>0){
                        var addition=curInput[0].type;
                        if( types[addition]!==undefined ){
                                if( types[addition][ types[addition].length-1 ]!==i ){
                                        types[addition].push(i);
                                }
                        }
                        else{
                                 types[addition]=[i];
                        }
                }
        }
        types.Constants=[];
        for(i=0;i<allConstants.length;i++){
                types.Constantstypes.Constants.length=i;
        }

        types.Define=["define-constant","define-function","define-struct"];
        types.Expressions=["cond"];
        types.Booleans.unshift("true","false");
        types.Numbers.unshift("Number");
        types.Strings.unshift("Text");

        return types;

        $("")
}