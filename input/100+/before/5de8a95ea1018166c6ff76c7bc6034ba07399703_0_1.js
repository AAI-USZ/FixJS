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
        var $stats = $('<div id="stats">'+resp.total+' results | Search time: '+resp.search_time+' | Build time: '+resp.build_time+'</div>');
        $('#stats').replaceWith($stats);
        dezi_pager(resp);
    }