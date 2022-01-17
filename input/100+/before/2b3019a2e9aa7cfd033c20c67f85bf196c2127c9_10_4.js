function(){
        var sel = $('#quota_types input:checked',dialog).val();
        var fields = $('div#'+sel+'_quota input,div#'+sel+'_quota select',dialog);
        var json = {};

        for (var i = 0; i < fields.length; i++){
            var field = $(fields[i]);
            var name = field.attr('name');
            var value = field.val();
            if (name == 'ID' && !value.length){
                notifyError(tr("Please select an element"));
                return false;
            };
            if (!value) value = 0;
            json[name] = value;
        };

        json['TYPE'] = sel.toUpperCase();

        var tr = quotaListItem(json)
        $('.current_quotas table tbody',dialog).append($(tr).hide().fadeIn());
        return false;
    }