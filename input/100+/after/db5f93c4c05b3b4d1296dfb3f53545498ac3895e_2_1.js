function () {
        $(this).autocomplete({
            source: function (request, response) {
                // look for search type radio buttons and use their value,
                // otherwise its not a search form but a tag add autocomplete
                var elem = $('#searchtype input[name="type"]:checked');
                var type = (elem.length > 0) ? elem.val() : 'tags';
                $.ajax({
                    url: '/search', // via GET (default)
                    type: 'GET',
                    data: {q: request.term, type: type},
                    dataType: 'json',
                    success: function (data) {
                        var prop;
                        if (data.type == 'source') {
                            data = data.items;
                            prop = 'source';
                        }
                        else if (data.type == 'title') {
                            data = data.items;
                            prop = 'title';
                        }
                        else {
                            data = data.tags;
                            prop = 'tagname';
                        }
                        response($.map(data, function(item) {
                            return {
                                label: item[prop],
                                value: item[prop]
                            }
                        }));
                    }
                });
            },
            minLength: 2,
            select: function (event, ui) {
                $(this).parent().submit();
            }
        });
    }