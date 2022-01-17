function(){
        var me = this,
            dateValue = me.input.value,
            patrn = [/yyyy|yy/, /M{1,2}/, /d{1,2}/],//只支持到年月日的格式化，需要时分秒的请扩展此数组
            len = patrn.length,
            date = [],
            regExp,
            index,
            _return;

        if(!dateValue){return;}
        for(var i = 0; i < len; i++){
            if(regExp = patrn[i].exec(me.format)){
                index = regExp.index;
                date[i] = dateValue.substring(index, index + regExp[0].length);
            }
        }
        
        _return = new Date(date[0], date[1] - 1, date[2]);  //需要时分秒的则扩展参数
        if(baidu.lang.isDate(_return))
            return _return;
        else
            return ;
    }