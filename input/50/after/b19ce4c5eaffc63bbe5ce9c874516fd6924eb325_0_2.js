function (found, currElem) {
                if (currElem) {
                    return found || currElem.id === feature.id;
                }
            }