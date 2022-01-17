function() {

    expect(1);

    var count = 0,
        handle = '.ui-resizable-e';
    el = $("#resizable1").resizable({
        handles: 'all',
        resize: function(event, ui) { 
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 2, "resize callback should happen exactly once per size adjustment");

}