function() {
            this._addEventListeners();
            this.element.classList.add('montage-autocomplete');

            // create the Repetition for the suggestions
            this.resultsController = ArrayController.create();
            Object.defineBinding(this.resultsController, "content", {
                boundObject: this,
                boundObjectPropertyPath: "suggestions",
                oneway: true
            });

            Object.defineBinding(this, "suggestedValue", {
                boundObject: this.resultsController,
                boundObjectPropertyPath: "selectedObjects.0",
                oneway: true
            });

            this.resultsList = ResultsList.create();
            Object.defineBinding(this.resultsList, "contentController", {
                boundObject: this,
                boundObjectPropertyPath: "resultsController",
                oneway: true
            });

            Object.defineBinding(this.resultsList, "activeIndexes", {
                boundObject: this,
                boundObjectPropertyPath: "_activeIndexes",
                oneway: true
            });
            Object.defineBinding(this.resultsList, "textPropertyPath", {
                boundObject: this,
                boundObjectPropertyPath: "textPropertyPath",
                oneway: true
            });

            var popup = this._getPopup();
        }