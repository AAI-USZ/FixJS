function($input) {
            var res = $$.fjs.validate.field($input);
            $$.fjs.forms.highlightFieldError($input);
            return res;
        }