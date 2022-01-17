function() {
            error = W3S.Core.Ajax.fieldValidation($(this), conf.tags);
            if (error.length) {
                $(this).addClass(conf.errCls);
                return error;
            }
        }