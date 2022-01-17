function(obj) {
            obj.availableTransitions = {};
            obj.availableTransitions.up = that.slideUpTransition;
            obj.availableTransitions.down = that.slideDownTransition
            obj.availableTransitions.fade = that.fadeTransition
            obj.availableTransitions.flip = that.flipTransition
            obj.availableTransitions.pop = that.popTransition
            obj.availableTransitions['default'] = that.slideTransition;
            obj.availableTransitions['none'] = that.noTransition;
        }