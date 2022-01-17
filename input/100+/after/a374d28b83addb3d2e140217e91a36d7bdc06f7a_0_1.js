function() {
        var props = {};
        
        _.each(this.model.getAllOptions(), function(optionInfo, optionName) {
            var selector = this.getCharacterSelector(optionName);
            var $fieldObj = $(selector,  this.el);

            if ($fieldObj.is('span') || $fieldObj.is('td')) {
                // --
            } else if ($fieldObj.is('input') && $fieldObj.prop('type') == 'checkbox') {
                props[optionName] = !!$fieldObj.prop('checked');
            } else if ($fieldObj.is('input') && $fieldObj.prop('type') == 'text' && !$fieldObj.prop('readonly')) {
                var val = $fieldObj.val();
                    val = $fieldObj.hasClass('plain') ? val : normalizeFloat(val, optionName);

                props[optionName] = val;
            } else if ($fieldObj.is('select') && !$fieldObj.prop('readonly')) {
                props[optionName] = $fieldObj.val();
            }
        }, this);
                
        this.model.set(props);
        
        this.model.save();
    }