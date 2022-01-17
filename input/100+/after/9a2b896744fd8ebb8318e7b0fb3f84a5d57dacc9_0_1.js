function() {

    expect(5);

    var count = 0,
        handle = '.ui-resizable-se';
    el = $("#resizable1").resizable({
        handles: 'all',
        start: function(event, ui) { 
            equal( ui.size.width, 100, "compare width" );
            equal( ui.size.height, 100, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }
    });

    drag(handle, 50, 50);

    equal(count, 1, "start callback should happen exactly once");

}