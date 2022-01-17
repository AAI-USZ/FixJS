function(isUpdate) {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                
                if(!isUpdate){
                    $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
                }
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var tipOffset = this.options.offset,
                    actualWidth  = $tip[0].offsetWidth, 
                    actualHeight = $tip[0].offsetHeight;
                
                function calcPosition(gravity){
                    var tp;
                    switch (gravity.charAt(0)) {
                        case 'n':
                            tp = {top: pos.top + pos.height + tipOffset, left: pos.left + pos.width / 2 - actualWidth / 2};
                            break;
                        case 's':
                            tp = {top: pos.top - actualHeight - tipOffset, left: pos.left + pos.width / 2 - actualWidth / 2};
                            break;
                        case 'e':
                            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - tipOffset};
                            break;
                        case 'w':
                        case 'c':
                            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + tipOffset};
                            break;
                    }
                    
                    if (gravity.length == 2) {
                        if (gravity.charAt(1) == 'w') {
                            tp.left = pos.left + pos.width / 2 - 15;
                        } else {
                            tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                        }
                    }
                    
                    return tp;
                }
                
                var gravity = (typeof this.options.gravity == 'function')
                                ? this.options.gravity.call(this.$element[0], {width: actualWidth, height: actualHeight}, calcPosition)
                                : this.options.gravity;
                
                var tp = calcPosition(gravity);
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                
                if (this.options.fade && (!isUpdate || !this._prevGravity || (this._prevGravity !== gravity))) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
                
                this._prevGravity = gravity;
            }
        }