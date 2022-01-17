function() {

    expect(9);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        resize: function(event, ui) { 
            if (count === 0) {
                equal( ui.size.width, 101, "compare width" );
                equal( ui.size.height, 101, "compare height" );
                equal( ui.originalSize.width, 100, "compare original width" );
                equal( ui.originalSize.height, 100, "compare original height" );
            }
            else {
                equal( ui.size.width, 150, "compare width" );
                equal( ui.size.height, 150, "compare height" );
                equal( ui.originalSize.width, 100, "compare original width" );
                equal( ui.originalSize.height, 100, "compare original height" );
            }
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 2, "resize callback should happen exactly once per size adjustment");

}