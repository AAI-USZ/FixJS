function(ev) {
            var e = ev.originalEvent;
                
            e.preventDefault();
            this.moved = false;
    
            this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            if(this.theTarget.nodeType == 3) this.theTarget = this.theTarget.parentNode;
            if(typeof this.options.onTapStart == 'function') this.options.onTapStart(this.theTarget);
            if(this.options.pressedClass) this.theTarget.addClass(this.options.pressedClass);
    
            this.element.on('touchmove', this);
            this.element.on('touchend', this);
        }