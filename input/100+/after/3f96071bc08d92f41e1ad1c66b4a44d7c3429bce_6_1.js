function() {
        var self = this,
            textFields = ['summary'],
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
            field.bindEvents({noEnterKeySubmit: true, iconid: 'ipfieldicon', customTabKey: function(e) { // tab has problems with auto-scroll
                /*
                var id = e && e.target && e.target.id || '',
                    num = id === 'summary' ? 2 : 1 * (id.replace(/answer/,'') || 10) - 7;
                console.log('here');
                console.log(id);
                console.log(num);
                setTimeout(function() {
                    self.ip.setPage(num);
                }, 500);
                */
                return false;
            }});
            this.base.fields.push(field);
        } 
        this.ip.bindButtons();
        this.base.bindNavButtons();
        this.base.bindTitleInfo();
        this.bindEditButton();
        this.bindPreviewButton();
        this.bindInfoButtons();
    }