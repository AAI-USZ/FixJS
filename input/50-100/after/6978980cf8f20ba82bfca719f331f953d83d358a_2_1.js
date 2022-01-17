function(item){
        cssHooks[item] = {
            get: function(ele){
                return baidu.dom._getWidthOrHeight(ele, item) + 'px';
            },
            set: function(ele, key, val){
                baidu.type(val) === 'number' && val < 0 && (val = 0);
                style.set(ele, key, val);
            }
        };
    }