function(sheet) {
            if(sheet === this._defaultStyleSheet) { return false; }

            if(sheet === null) {
                this._defaultStyleSheet = null;
                return;
            }

            var sheetComponent, oldDefaultSheet;

            if(this.styleSheetList) {
                sheetComponent = this.styleSheetList.childComponents[this.styleSheets.indexOf(sheet)];
                if(sheetComponent) {
                    sheetComponent['default'] = true;
                    if(this._defaultStyleSheet) {
                        oldDefaultSheet = this.styleSheetList.childComponents[this.styleSheets.indexOf(this._defaultStyleSheet)];
                        oldDefaultSheet['default'] = false;
                    }
                }
            }

            this._defaultStyleSheet = sheet;
            this.needsDraw = true;
        }