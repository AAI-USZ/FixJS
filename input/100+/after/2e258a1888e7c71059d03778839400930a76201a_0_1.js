function(){
        this.$tics.empty();
        this.$labels.empty();

        var _this = this;
        $.each(this.choices, function(i, choice){
            var left = _this._getChoicePosPct(i);

            if (_this.options.showLabels && choice.showLabel){
                var $label = $('<span class="label">' + choice.label + '</span>');
                $label.css('left', left);
                $label.appendTo(_this.$labels);
            }

            if (_this.options.showTics && choice.showTic){
                var $tic = $('<span class="tic"></span>');
                $tic.css('left', left);
                if (_this.options.showLabels && choice.showLabel){
                    $tic.addClass("labeled");
                }
                $tic.appendTo(_this.$tics);
            }
        });
    }