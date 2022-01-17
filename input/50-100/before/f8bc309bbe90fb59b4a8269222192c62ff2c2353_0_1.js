function(e, ui){
                // Get the current choice the slider is on.
                var choice = _this.choices[ui.value];

                // Update select.
                _this.$select.val(choice.value);
                
                // Update tooltip.
                if (_this.options.tooltips){
                    _this._refreshTooltip(choice, ui.value);
                }
            }