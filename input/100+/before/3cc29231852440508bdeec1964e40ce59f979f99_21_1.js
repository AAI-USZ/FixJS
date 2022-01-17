function() {
            if(this.collapsed) {
                if(this.panel.element) this.panel.element.classList.add("collapsed");
                else this.panel.classList.add("collapsed");
                this.element.classList.add("collapsed");
                if(this._resizeBar != null) this.resizeBar.classList.add("collapsed");
            } else {
                if(this.panel.element) this.panel.element.classList.remove("collapsed");
                else this.panel.classList.remove("collapsed");
                this.element.classList.remove("collapsed");
                if(this._resizeBar != null) this.resizeBar.classList.remove("collapsed");
            }
        }