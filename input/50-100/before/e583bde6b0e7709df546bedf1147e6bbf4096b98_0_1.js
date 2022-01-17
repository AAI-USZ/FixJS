function(event, target, options) {
            event.preventDefault();
            var inputField = Ext.get(target).prev('.destroy-field');
            inputField.set({
                value:true
            });
            Ext.get(target).parent().parent().hide();
        }