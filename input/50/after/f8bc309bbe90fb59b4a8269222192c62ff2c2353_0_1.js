function(e, ui){
                if (_this.choices.length == 0){
                    return;
                }
                _this.value(_this.choices[ui.value].value);
            }