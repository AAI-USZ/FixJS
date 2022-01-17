function(){
    var preferences = {},
        TABLE_PREFERENCES = "preferences";
    
    return {
        db: null,
        /**
         * Initialise KIJ2013 objects, databases and preferences
         * @param callback Allows a callack to be attached which fires when
         *   preferences have finished loading.
         */
        init: function(callback){
            if(!window.openDatabase)
            {
                $('#body').html('<p>Sorry Support for your device is not ready yet. ' +
                  'Please try again in the future.</p>');
                return;
            }
            this.db = window.openDatabase("KIJ2013", "1.0", "KIJ2013 Database",
              256*1024);
            this.sql('CREATE TABLE IF NOT EXISTS `' + TABLE_PREFERENCES +
              '` (`key` varchar(255) PRIMARY KEY,`value` varchar(255))');
            this.sql("SELECT key,value FROM " + TABLE_PREFERENCES, [],
              function(tx,results){
                for(var i=0;i<results.rows.length;i++)
                {
                    var item = results.rows.item(i);
                    preferences[item.key] = item.value;
                }
                if(typeof callback == "function"){
                    callback();
                }
            });
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
        getPreference: function(name){
            return preferences[name];
        },
        setPreference: function(name, value)
        {
            preferences[name] = value;
            this.sql("INSERT OR REPLACE INTO " + TABLE_PREFERENCES +
                "(key,value) VALUES (?,?)",[name,value]);
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