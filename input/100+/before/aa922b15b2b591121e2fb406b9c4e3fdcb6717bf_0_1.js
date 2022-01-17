function () {
        var settings = {
            processData : false,
            cache : false,
            type : "GET",
            dataType : "json",
            success : $.proxy(this.list_loaded, this)
        };
        var url = $('body').data('baseProjectUrl') + 'notebooks';
        $.ajax(url, settings);
    }