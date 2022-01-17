function() {
        var textFields = ['title', 'type', 'platform', 'category', 'website', 'founders', 'address', 'mantra', 'summary'],
//        var textFields = ['title', 'type', 'platform', 'category', 'mantra', 'summary', 'website', 'founders', 'contact_email', 'address'],
            validators = {
                title: ValidatorClass.prototype.isNotEmpty,
                type: ValidatorClass.prototype.isSelected,
                platform: ValidatorClass.prototype.isSelected,
                category: ValidatorClass.prototype.isSelected,
                mantra: ValidatorClass.prototype.makeLengthChecker(5, 140),
                summary: ValidatorClass.prototype.makeLengthChecker(15, 2000),
                website: ValidatorClass.prototype.isURL,
                founders: ValidatorClass.prototype.makeLengthChecker(5, 256),
//                contact_email: ValidatorClass.prototype.isEmail,
                address: ValidatorClass.prototype.isNotEmpty
            },
            classes = {
                title: TextFieldClass,
                type: SelectFieldClass,
                platform: SelectFieldClass,
                category: SelectFieldClass,
                mantra: TextFieldClass,
                summary: TextFieldClass,
                website: TextFieldClass,
                founders: TextFieldClass,
//                contact_email: TextFieldClass,
                address: TextFieldClass
            },
            typeOptions = [ ['application', 'Application'], ['company', 'Company'] ],
            platformOptions = [
                ['ios', 'iPhone / iPad'],
                ['android', 'Android Phone / Tablet'],
                ['windows_phone', 'Windows Phone / Tablet'],
                ['desktop', 'Desktop'],
                ['website', 'Website'],
                ['other', 'Other']
            ],
            i,
            id,
            field,
            addr,
            updater;
        this.base.fields = [];
        this.base.fieldMap = {};
        for (i = 0; i < textFields.length; i++) {
            id = textFields[i];
            updater = this.base.getUpdater(id);
            field = new (classes[id])(id, this.base.listing[id], updater, 'newlistingbasicsmsg');
            if (this.base.displayNameOverrides[id]) {
                field.fieldBase.setDisplayName(this.base.displayNameOverrides[id]);
            }
            field.fieldBase.addValidator(validators[id]);
            field.fieldBase.validator.postValidator = this.base.genDisplayCalculatedIfValid(field);
            if (id !== 'address') {
                field.bindEvents();
            }
            this.base.fields.push(field);
            this.base.fieldMap[id] = field;
        } 
        console.log(this.base.fieldMap);
        this.base.fieldMap['type'].setOptionsWithValues(typeOptions);
        this.base.fieldMap['platform'].setOptionsWithValues(platformOptions);
        this.displayCategories();
        this.addMap(this.genPlaceUpdater());
        this.bindAddressEnterSubmit();
        this.bindSubmitButton();
        this.base.bindTitleInfo();
        this.base.bindInfoButtons();
        pl('#newlistingbasicswrapper').show();
    }