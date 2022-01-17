function(id, document) {
            var doc = document || this._currentDocument.model.views.design.document,
                sheetElement, sheet;

            sheetElement = nj.make('style', {
                type  : 'text/css',
                rel   : 'stylesheet',
                id    : id || "",
                media : 'screen',
                title : 'Temp',
                'data-ninja-node' : 'true'
            });

            doc.head.appendChild(sheetElement);
            sheet = this.getSheetFromElement(sheetElement, doc);

            this.userStyleSheets.push(sheet);

            this.styleSheetModified(sheet);

            NJevent('newStyleSheet', sheet);

            return sheet;
        }