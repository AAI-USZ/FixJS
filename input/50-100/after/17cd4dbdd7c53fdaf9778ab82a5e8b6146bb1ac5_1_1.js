function () {

        if (!this.layout.rendered) {
            throw "settings not available";
        }

        var fields = ["module","controller","action","template"];
        var form = this.getLayout().getForm();
        var element = null;

        // get values
        var settings = this.getLayout().getForm().getFieldValues();

        return settings;
    }