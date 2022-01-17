function() {
        var textFields = ['summary'],
            m = 10,
            n = 26,
            i,
            id,
            field;
        this.base.fields = [];
        for (i = m; i <= n; i++) {
            id = 'answer' + i;
            textFields.push(id);
        }
        for (i = 0; i < textFields.length; i++) {
            id = textFields[i];
            field = new TextFieldClass(id, this.base.listing[id], this.base.getUpdater(id, null, this.ip.getUpdater(id)), 'ip-editable-msg');
    
            if (this.base.displayNameOverrides[id]) {
                field.fieldBase.setDisplayName(this.base.displayNameOverrides[id]);
            }
            field.fieldBase.addValidator(ValidatorClass.prototype.makeLengthChecker(16, 1000));
            field.fieldBase.validator.postValidator = this.ip.genDisplay(field, this.base.genDisplayCalculatedIfValid(field));
            field.bindEvents({noEnterKeySubmit: true, iconid: 'ipfieldicon'});
            this.base.fields.push(field);
        } 
        this.ip.bindButtons();
        this.base.bindNavButtons();
        this.base.bindTitleInfo();
        this.bindEditButton();
        this.bindPreviewButton();
        this.bindInfoButtons();
    }