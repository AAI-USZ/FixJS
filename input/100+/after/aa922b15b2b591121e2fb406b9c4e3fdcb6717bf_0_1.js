function () {
        var that = this;
        var settings = {
            processData : false,
            cache : false,
            type : "GET",
            dataType : "json",
            success : $.proxy(this.list_loaded, this),
            error : $.proxy( function(){
                that.list_loaded([], null, null, {msg:"Error connecting to server."});
                             },this)
        };

        var url = $('body').data('baseProjectUrl') + 'notebooks';
        $.ajax(url, settings);
    }