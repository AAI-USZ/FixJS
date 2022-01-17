function(evt){
        evt.preventDefault();
        var a = $(evt.currentTarget);
        if (a.hasClass('w3s-stop')) evt.stopPropagation();
        // remember trigger which is not form submit or .w3s-tmp
		if (!a.getAttr('id')) a.attr('id', 'trigger-'+(++W3S.Core.sequence));
        if (!a.hasClass('w3s-tmp')&&a.attr('name')!='submit') W3S.Core.TopVar.trigger = a;
        if (a.hasClass('w3s-disabled')) return false;
        if (!a.getAttr('rel') || confirm(a.attr('rel'))) {
            W3S.Core.Event.Handler.triggerParse(a, evt);
        }
        return a.hasClass('w3s-stop')?false:true;
    }