function() {
            this.attachToParentComponent();
            if (this._element) {
                this.originalContent = Array.prototype.slice.call(this._element.childNodes, 0);
            }
            if (! this.hasOwnProperty("identifier")) {
                this.identifier = Montage.getInfoForObject(this).label;
            }
        }