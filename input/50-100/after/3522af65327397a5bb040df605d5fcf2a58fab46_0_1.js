function(){
        var ret = baidu.dom._smartScroll('scrollTop');
        return function(value){
            value && baidu.paramCheck('^(?:number|string)$', 'baidu.dom.scrollTop');
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }
    }