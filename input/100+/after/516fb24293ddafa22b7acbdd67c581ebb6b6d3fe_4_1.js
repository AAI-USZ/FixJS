function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        }