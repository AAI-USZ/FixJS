function() {

    expect(1);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        start: function(event, ui) { 
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 1, "start callback should happen exactly once");

}