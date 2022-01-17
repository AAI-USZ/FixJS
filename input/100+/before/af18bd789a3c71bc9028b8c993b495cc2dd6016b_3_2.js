function(e) {
            this.element.off('touchmove', this);
            this.element.off('touchend', this);
    
            if( !this.moved && this.theTarget ) {
                if(this.options.pressedClass) this.theTarget.removeClass(this.options.pressedClass);
                var theEvent = document.createEvent('MouseEvents');
                theEvent.initEvent('click', true, true);
                this.theTarget.dispatchEvent(theEvent);
            }
            this.theTarget = undefined;
        }