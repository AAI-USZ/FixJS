function(e) {                
            e.preventDefault();
            this.moved = false;
    
            this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            if(this.theTarget.nodeType == 3) this.theTarget = this.theTarget.parentNode;
            if(typeof this.options.onTapStart == 'function') this.options.onTapStart(this.theTarget);
            if(this.options.pressedClass) this.theTarget.addClass(this.options.pressedClass);
    
            this.targetParent = this.element.has(this.theTarget);
            if (!this.targetParent.length) this.targetParent = this.element.filter(this.theTarget);

            this.targetParent[0].addEventListener('touchmove', this, false);
            this.targetParent[0].addEventListener('touchend', this, false);
        }