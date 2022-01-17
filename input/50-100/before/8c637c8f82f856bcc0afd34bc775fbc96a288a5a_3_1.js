function(){

        this.callSuper('createAttributes');

        this.buttonCreateAttributes();

        this.focusableCreateAttributes();

        this.createAttribute('enabled',true,'boolean');

        this.createAttribute('label','Button');

        this.declareSkinPart('label',false,'core.Label');

    }