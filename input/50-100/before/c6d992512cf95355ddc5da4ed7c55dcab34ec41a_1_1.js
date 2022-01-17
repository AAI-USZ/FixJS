function(passageId, activeSearch) {
            //refresh menu options
            if(activeSearch) {
                //tick the right menu item
                step.menu.tickOneItemInMenuGroup('SEARCH', activeSearch, passageId);
                
                
                //show the correct field set
                this._showRelevantFieldSet(passageId);
            }

            var newValue = this._storeAndRetrieveCookieState(passageId, "activeSearch", activeSearch, true);
            return newValue;
        }