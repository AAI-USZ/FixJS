function(){
        $(this.element).addClass('ui-widget ui-select-slider');
        var _this = this;
        this.values = [];

        // Get or create the select element.
        var match = this.element.children('select');
        if (match.length == 0){
            this.$select = $('<select></select>');
            this.element.append(this.$select);
            this.choices = this.options.choices;
        }
        else{
            this.$select = $(match[0]);
            // Extract choices from the select options.
            var extractedChoices = [];
            this.$select.children('options').each(function(i, $el){
                extractedChoices.push({
                    'value': $el.attr('id'),
                    'label': $el.text()
                });
            });
            this.choices = extractedChoices;
        }

        // Prepare the choices.
        this.choices = this._prepareChoices(this.choices);

        // Listen for changes in the select when not sliding.
        this.$select.on('change', function(e){
            if (! _this._sliding){
                _this.value(_this.$select.val());
            }
        });

        // Create slider.
        this.$slider = $('<div class="slider"></div>').appendTo(this.element);
        this._setUpSliderHandles();

        if (this.options.tooltips){
            this._setUpTooltips();
        }

        this._setUpSliderScale();
        this.$slider.slider({
            step: 1,
            min: 0,
            max: 1,
            change: function(e, ui){
                if (_this.choices.length == 0){
                    return;
                }
                _this.value(_this.choices[ui.value].value);
            },
            start: function(e, ui){
                _this._sliding = true;
            },
            slide: function(e, ui){
                if (_this.choices.length == 0){
                    return;
                }
                // Get the current choice the slider is on.
                var choice = _this.choices[ui.value];

                // Update select.
                _this.$select.val(choice.value);
                
                // Update tooltip.
                if (_this.options.tooltips){
                    _this._refreshTooltip(choice, ui.value);
                }
            },
            stop: function(e, ui){
                _this._sliding = false;
            }
        });

        // Refresh the slider and select.
        this._refreshSlider();
        this._refreshSelect();

        // Set initial value if none set.
        if (! this.value() && this.choices.length > 0){
            this.value(this.choices[0].value);
        }

    }