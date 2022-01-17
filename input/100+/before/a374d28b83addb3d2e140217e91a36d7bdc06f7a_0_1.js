function(optionInfo, optionName) {
            var selector = this.getCharacterSelector(optionName);
            var $fieldObj = $(selector,  this.el);

            if ($fieldObj.is('span') || $fieldObj.is('td')) {
                // --
            } else if ($fieldObj.is('input') && $fieldObj.prop('type') == 'checkbox') {
                this.model.set(optionName, !!$fieldObj.prop('checked'));
            } else if ($fieldObj.is('input') && $fieldObj.prop('type') == 'text' && !$fieldObj.prop('readonly')) {
                var val = $fieldObj.val();
                    val = $fieldObj.hasClass('plain') ? val : normalizeFloat(val, optionName);
                
                this.model.set(optionName, val);
            } else if ($fieldObj.is('select') && !$fieldObj.prop('readonly')) {
                this.model.set(optionName, $fieldObj.val());
            }
        }