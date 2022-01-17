function() {
            if (!onlyErrors)
                this.value = this.defaultValue;
            $$.fjs.forms.highlightFieldError($(this));
        }