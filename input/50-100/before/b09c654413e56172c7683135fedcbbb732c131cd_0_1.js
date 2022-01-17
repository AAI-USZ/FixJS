function() {
    var acord = new Fx.Accordion($('acord'), '#acord h2', '#acord p'),
        current = $$('.current');

    acord.addEvent('active', function(t, e) {
        current.removeClass('current');
        current = t;
        t.addClass('current');
    });
}