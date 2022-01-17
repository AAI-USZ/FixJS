function(fieldSetId,errors) {
        var fieldset = Ext.getCmp(fieldSetId);
				var errorMessage='';
        fieldset.items.each(function(field) {
            var fieldErrors = errors.getByField(field.getName());

            if (fieldErrors.length > 0) {
                var errorField = Ext.getCmp(field.getName()+'ErrorField');
                field.addCls('invalid-field');
								for(i=0;i<fieldErrors.length;i++)
								{
									errorMessage+=fieldErrors[i]._field+' '+fieldErrors[i]._message+'; ';
									
								}
								errorField.setHtml(errorMessage);
            
                errorField.show();
            } else {
               //errorField.hide();
            }
        }, this);
        fieldset.setInstructions("Please amend the flagged fields");
    }