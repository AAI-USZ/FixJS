function removeButtonCheck() {
    var sets = $('fieldset[id^=sp_set]');
    sets.each(function(index, ele){
        var set = $(ele);
        var temp = set.find('select[name^="sp_criteria_field"]:enabled');
        var ex = temp.siblings('a[id^="criteria_remove"]');
        if (temp.length == 1) {
            ex.attr('disabled', 'disabled');
            ex.hide();
        } else {
            ex.removeAttr('disabled');
            ex.show();
        }
    });
}