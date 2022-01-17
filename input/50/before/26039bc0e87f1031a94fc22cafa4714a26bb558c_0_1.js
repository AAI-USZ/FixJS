function(){
            error = W3S.Core.Ajax.fieldValidation($(this), conf.tags);
            if (error) {
                $(this).addClass(conf.errCls);
                return error;
            }
        }