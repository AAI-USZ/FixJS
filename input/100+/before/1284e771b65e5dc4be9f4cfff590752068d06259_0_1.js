function(){
        var me = this,
            patrn = [/yyyy|yy/, /M{1,2}/, /d{1,2}/],//只支持到年月日的格式化，需要时分秒的请扩展此数组
            key = [],
            val = {},
            count = patrn.length,
            i = 0,
            regExp;
            
        for(; i < count; i++){
            regExp = patrn[i].exec(me.format);
            key[i] = regExp ? regExp.index : null;
        }
        me.input.value.replace(/\d{1,4}/g, function(mc, index){
            val[index] = mc;
        });
        for(i = 0; i < key.length; i++){
            key[i] = val[key[i]];
            if(!key[i]){return;}
        }
        return new Date(key[0], key[1] - 1, key[2]);//需要时分秒的则扩展参数
    }