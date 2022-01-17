function finishHandler(originalValue, replacementString)
        {
            // Synthesize property text disregarding any comments, custom whitespace etc.
            this._sidebarPane.applyStyleText(this._sidebarPane.nameElement.textContent + ": " + this._sidebarPane.valueElement.textContent, false, false, false);
        }