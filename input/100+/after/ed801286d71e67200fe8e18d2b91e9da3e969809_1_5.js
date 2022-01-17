function(targetIndex) {
            var that = this,
                targets = that.get('target'),
                kfbtns = $(that.get('kfbtn'));
            kfbtn = $(that.get('kfbtn')[targetIndex]), getCls = this.get('cls'), selectedClass = getCls.selected, hoverClass = getCls.hover;
            //触发原生dom节点的点击事件
            $(targets[targetIndex]).fire('click');
            kfbtns.each(function(value, key) {
                value.removeClass(selectedClass).removeClass(hoverClass);
            })
            kfbtn.addClass(selectedClass);
        }