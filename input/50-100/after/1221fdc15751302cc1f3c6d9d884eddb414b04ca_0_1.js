function(e, t) {
    if (t.fields[e.id].ajaxValues) {
        Traveler.prototype.showFieldValues(e.value, 
                                           t, 
                                           e.id,
                                           t.fields[e.id].ajaxValues);
    }
}