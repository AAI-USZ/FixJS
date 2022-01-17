function(){
        value && baidu.paramCheck('^(?:number|string)$', 'baidu.dom.scrollTop');
        var ret = baidu.dom._smartScroll('scrollTop');
        return function(value){
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }
    }