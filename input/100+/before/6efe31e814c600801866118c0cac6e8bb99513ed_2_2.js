function(){
    
    return {
        db: null,
        init: function(){
            if(!window.openDatabase)
            {
                $('#body').html('<p>Sorry Support for your device is not ready yet. Please try again in the future.</p>');
                return;
            }
            this.db = window.openDatabase("KIJ2013", "1.0", "KIJ2013 Database", 256*1024);
        },
        sql: function(sql, vars, callback){
            if(typeof callback == "function")
                this.db.readTransaction(function(tx){
                    tx.executeSql(sql,vars,callback);
                });
            else
                this.db.transaction(function(tx){
                    tx.executeSql(sql,vars);
                });
        },
        setActionBarUp: function(fn)
        {
            if(typeof fn == "function")
            {
                $('#up-button').removeAttr('href').unbind().click(function(){
                    fn();
                    return false;
                });
            }
            else if(typeof fn == "string")
            {
                $('#up-button').unbind().attr('href', fn);
            }
        },
        setActionBarTitle: function(title)
        {
            $('#action_bar h1').text(title);
        },
        showLoading: function()
        {
            $('<div/>').attr('id', "loading")
            .text("Loading").append(
                $('<img/>').attr('src',"ajax-loader.gif")
            ).appendTo('#body');
        },
        showError: function(message)
        {
            var popup = $('#popup');
            popup.text(message).show();
            setTimeout(function(){
                popup.slideUp('normal')
            },5000);
        }
    }
}