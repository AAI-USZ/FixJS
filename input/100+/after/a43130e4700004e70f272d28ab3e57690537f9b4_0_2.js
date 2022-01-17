function(e) {
            this.targetParent[0].removeEventListener('touchmove', this, false);
            this.targetParent[0].removeEventListener('touchend', this, false);
    
            if( !this.moved && this.theTarget ) {
                if(this.options.pressedClass) this.theTarget.removeClass(this.options.pressedClass);
                var theEvent = document.createEvent('MouseEvents');
                theEvent.initEvent('click', true, true);
                this.theTarget.dispatchEvent(theEvent);
            }
            this.theTarget = undefined;
            this.targetParent = undefined;
        }