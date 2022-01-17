function() {

    expect(1);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        grid: 50,
        resize: function(event, ui) {
            count++;
        },
    });

    drag(handle, 50, 50);

    equal(count, 1, "resize callback should happen exactly once per grid-aligned size adjustment");

}