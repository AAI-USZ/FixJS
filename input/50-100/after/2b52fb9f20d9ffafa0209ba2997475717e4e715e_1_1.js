function(e){       
        e.preventDefault();
        var query = $("#query").val().replace(/\"/g,"");
        if(query == '') { return; }
        searchControl.startSearch(query);
        history.pushState({"query":query}, "Searching for - "+query, "/search?q="+encodeURIComponent(query));
    }