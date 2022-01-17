function(sheet) {
            var sheetEl = sheet.ownerNode, sheetCount;

            if(sheetEl) {
                sheetEl.disabled = true;
                this.userStyleSheets.splice(this.userStyleSheets.indexOf(sheet), 1);

                ///// Make sure cached rules from this stylesheet are not used
                this._clearCache();

                ///// Check to see if we're removing the default style sheet
                if(sheet === this._defaultStylesheet) {
                    sheetCount = this.userStyleSheets.length;
                    this.defaultStylesheet = (sheetCount) ? this.userStyleSheets[sheetCount-1] : null;
                }

                ///// Mark for removal for i/o
                sheetEl.setAttribute('data-ninja-remove', 'true');

                NJevent('removeStyleSheet', sheet);
            }


        }