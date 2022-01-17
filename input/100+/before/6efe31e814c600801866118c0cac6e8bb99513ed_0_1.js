function() {
            KIJ2013.init();
            $('#clear-news').click(function(){
                KIJ2013.db.transaction(function(tx){
                    tx.executeSql('DELETE FROM ' + TABLE_NEWS);
                    alert("News Items Cleared");
                });
            });
            $('#clear-events').click(function(){
                KIJ2013.db.transaction(function(tx){
                    tx.executeSql('DELETE FROM ' + TABLE_EVENTS);
                    alert("Events Cleared");
                });
            });
            // Hides mobile browser's address bar when page is done loading.
            setTimeout(function() {window.scrollTo(0, 1);}, 1);
        }