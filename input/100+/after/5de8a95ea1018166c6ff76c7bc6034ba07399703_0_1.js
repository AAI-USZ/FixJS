function (resp) {
        resDiv.innerHTML = '';
        //console.log(resp);
        for (var i = 0; i < resp.results.length; i++) {
            var res = resp.results[i];
            var r = "<b><a href='" + DEZI_SEARCH_URI + "/" + res.uri + "'>" + res.title + "</a></b><br/>" + res.summary;
            var $d = $('<div class="result">' + r + '</div>');
            $('#results').append($d);
        }  
        if (!resp.results.length) {
            resDiv.innerHTML = 'No results';
        }
        var start  = parseInt(resp.offset)+1;
        var end    = parseInt(resp.offset)+parseInt(+resp.page_size);
        if (end > resp.total) end = resp.total;
        var $stats = $('<div id="stats">'+start+' - '+end+' of '+resp.total+' results ' +
                       '| Search time: '+resp.search_time+' | Build time: '+resp.build_time+'</div>');
        $('#stats').replaceWith($stats);
        dezi_pager(resp);
    }