function() {
        _.bindAll(this, 'onFormSubmit', 'onSubmitSuccess');
        this.form = new Kaleidos.Form({el:this.$("form")});
    }