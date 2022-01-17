function(sheet, eventData) {
            var sheetSearch = this.dirtyStyleSheets.filter(function(sheetObj) {
                return sheetObj.stylesheet === sheet;
            });

            ///// Dispatch modified event
            NJevent('styleSheetModified', eventData);
            this.currentDocument.model.needsSave = true;

            ///// If the sheet doesn't already exist in the list of modified
            ///// sheets, dispatch dirty event and add the sheet to the list
            if(sheetSearch.length === 0) {
                NJevent('styleSheetDirty', eventData);
                this.dirtyStyleSheets.push({
                    document : sheet.ownerNode.ownerDocument,
                    stylesheet : sheet
                });
            }
        }