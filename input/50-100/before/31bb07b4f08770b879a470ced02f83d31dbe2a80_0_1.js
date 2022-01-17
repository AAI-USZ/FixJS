function(){
        var div = $('dd[id="sp_criteria-element"]').children('div:visible:last').next();

        div.show();
        div.children().removeAttr('disabled');
        div = div.next();
        if(div.length === 0) {
            $(this).hide();
        }
	}