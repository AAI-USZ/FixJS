function(targetIndex) {
            var that = this,
                targets = that.get('target'),
                radios = $(that.get('radio'));
            radio = $(that.get('radio')[targetIndex]), getCls = this.get('cls'), selectedClass = getCls.selected, hoverClass = getCls.hover;
            //触发原生dom节点的点击事件
            $(targets[targetIndex]).fire('click');
            radios.each(function(value, key) {
                value.removeClass(selectedClass).removeClass(hoverClass);
            })
            radio.addClass(selectedClass);
        }