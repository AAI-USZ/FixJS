function () {
        refresh_overview();
        window.location.hash = $searchform.serialize();
        var query = window.location.hash.slice(1);

        query = addstar(query);
        $all_results.empty();
        append_search('search?' + query);
    }