function() {
            var sel = rangy.saveSelection();
            this.divChecker.innerHTML = "";
            this.divChecker.innerHTML = this._textarea.innerHTML;
            this._textarea.innerHTML = this.divChecker.innerHTML;
            if (sel)
                rangy.restoreSelection(sel);
        }