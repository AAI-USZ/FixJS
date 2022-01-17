function sync(objectID){
        var block=searchForIndex(objectID+"",program);
        var DOMBlock=$(document.getElementById(objectID));
        if(block instanceof ExprNumber || block instanceof ExprString){
                block.value=decode(DOMBlock.find(".input").attr('value'));
        }
        else if(block instanceof ExprDefineConst){
                block.constName=decode(DOMBlock.find('.constName').attr('value'));
        }
        else if(block instanceof ExprDefineFunc){
                var prevName=block.contract.funcName;
                if(prevName===DOMBlock.find('.contractName').attr('value') && prevName===DOMBlock.find('.definitionName').attr('value')){
                        return;
                }
                if(DOMBlock.find('.contractName').attr('value')===prevName){
                        block.contract.funcName=decode(DOMBlock.find('.definitionName').attr('value'));
                        DOMBlock.find('.contractName').attr('value',DOMBlock.find('.definitionName').attr('value'));
                }
                else if(DOMBlock.find('.definitionName').attr('value')===prevName){
                        block.contract.funcName=decode(DOMBlock.find('.contractName').attr('value'));
                        DOMBlock.find('.definitionName').attr('value',DOMBlock.find('.contractName').attr('value'));
                }
                var i=0;
                DOMBlock.find('.argName').each(function(){
                          block.argumentNames[i]=$(this).attr('value');
                            i++;
                });
        }
        else{
                throw new Error("block type not found");
        }
}