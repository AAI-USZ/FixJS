function(){
            this.options.highlightCheckboxSelector ?
                $( this.options.highlightCheckboxSelector )
                    .checkbox({checkedEvent:'highlightelements.vde', unCheckedEvent:'unhighlightelements.vde'}) :
                $.noop();
            this.highlightBlocks = {};
            if (Mage.Cookies.get(this.options.cookieHighlightingName) == 'off') {
                this._processMarkers();
            }

        }