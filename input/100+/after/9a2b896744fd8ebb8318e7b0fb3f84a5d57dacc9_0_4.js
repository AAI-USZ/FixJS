function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        minWidth: 60,
        minHeight: 60,
        maxWidth: 100,
        maxHeight: 100,
        resize: function(event, ui) {
            equal( ui.size.width, 60, "compare width" );
            equal( ui.size.height, 60, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }
    });

    drag(handle, -50, -50);

    equal(count, 1, "resize callback should happen exactly once per size adjustment");

}