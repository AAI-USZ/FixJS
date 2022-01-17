function (minPriority) {
        var idsWithSelectors = [];

        var i, element;
        // Custom Selectors
        for (i = 0; i < this._hashForSelectors.length; i++) {
            element = this._hashForSelectors[i];
            if (element) {
                element.paused = true;
                idsWithSelectors.push(element.target);
            }
        }

        // Updates selectors
        if (minPriority < 0) {
            for (i = 0; i < this._updatesNegList.length; i++) {
                element = this._updatesNegList[i];
                if (element) {
                    element.paused = true;
                    idsWithSelectors.push(element.target);
                }
            }
        }

        if (minPriority <= 0) {
            for (i = 0; i < this._updates0List.length; i++) {
                element = this._updates0List[i];
                if (element) {
                    element.paused = true;
                    idsWithSelectors.push(element.target);
                }
            }
        }

        for (i = 0; i < this._updatesPosList.length; i++) {
            element = this._updatesPosList[i];
            if (element) {
                element.paused = true;
                idsWithSelectors.push(element.target);
            }
        }

        return idsWithSelectors;
    }