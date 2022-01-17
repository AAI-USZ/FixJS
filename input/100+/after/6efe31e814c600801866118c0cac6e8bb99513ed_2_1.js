function(callback){
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
        }