function(fields, form, options) {
        var cover = form.closest('.w3s-box').length?form.closest('.w3s-box'):form.closest('div');
        if (cover.length<1) cover = form;
        var pos = cover.position();
        cover.before('<div class="w3s-loading" style="position:absolute;'+
                    'left:'+pos.left+'px;top:'+pos.top+'px;'+
                    'height:'+cover.outerHeight()+'px;width:'+cover.outerWidth()+'px;"></div>');
        // 100% height doesn't work in some cases
        var errTag = W3S.Core.Ajax.formValidation(form, {errCls:'w3s-error'});
        if (errTag.length) {
            $('.w3s-loading').remove();
			var errMsg = W3S.Core.Dictionary[errTag]===W3S.Core.Constant.undefined?errTag:W3S.Core.Dictionary[errTag];
            W3S.Core.Util.print(errMsg);
            return false;
        }
        return true;
    }