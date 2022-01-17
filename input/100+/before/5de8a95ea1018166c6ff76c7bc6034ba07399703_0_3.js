function() {
    // load helper files
    loadjscssfile('http://dezi.org/ui/example/jquery-ui-1.8.13.slider.min.js', 'js');
    loadjscssfile('http://dezi.org/ui/example/jPaginator.js', 'js');
    loadjscssfile('http://dezi.org/ui/example/jPaginator.css', 'css');

    // if we were called with ?q= then initiate query
    var params = $.deparam.querystring();
    //console.log(params);
    var query = "";
    if (params && params.q) {
        query = params.q.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

    // generate page structure
    var $page = $('<div id="tools"><input size="30" type="text" id="q" value="'+query+'"></input>' +
                   '<button onclick="dezi_search()">Search</button></div>' +
                  '<div id="stats"></div>' +
                  '<div id="results"></div><div id="facets"></div>');
    $('body').append($page);

    if (query.length) {
        dezi_search();  // q present, start search
    }

    // enter key listener
    $("#q").keyup( function(e) {
        if(e.keyCode == 13) {
            dezi_search();
        }
    });
}