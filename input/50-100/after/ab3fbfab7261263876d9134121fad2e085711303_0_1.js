function () {
        refresh_overview();
        var query = $searchform.serialize()
        window.location.hash = query;
        query = query.slice(1);

        query = addstar(query);
        $all_results.empty();
        append_search('search?' + query);
    }