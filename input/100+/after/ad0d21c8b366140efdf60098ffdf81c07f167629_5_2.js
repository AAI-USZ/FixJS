function(field, newValue, oldValue, options) {
        if (!newValue){
            field.up().down('#portalip').allowBlank = true;
            field.up().down('#portalmask').allowBlank = true;
            field.up().down('#portalip').setValue('');
            field.up().down('#portalmask').setValue('');
        }else{
            field.up().down('#portalip').allowBlank = false;
            field.up().down('#portalmask').allowBlank = false;
        }
        field.up('form').getForm().isValid();
    }