function createPortal()
{
    var settings = {};
    for(i = 0; i < columnDivs.length; i++) {
        tmp = Array();
        for(i2 = 0; i2 < columnDivs[i].length; i2++) {
            tmp.push(columnDivs[i][i2].fullDiv);
        }
        settings["column-" + i] = tmp;
    }
    var options = { portal : 'columns', editorEnabled : true};
    var data = {};
    Event.observe(window, 'load', function() {
            portal = new Portal(settings, options, data);
    });
}