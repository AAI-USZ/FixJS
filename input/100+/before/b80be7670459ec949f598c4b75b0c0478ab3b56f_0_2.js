function(){
    //var rssURL = "http://www.kij13.org.uk/category/latest-news/feed/";
    var rssURL = "news.rss";
    var TABLE_NAME = 'news';

    var createDatabase = function() {
        KIJ2013.db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS `' + TABLE_NAME + '` (`guid` varchar(255) PRIMARY KEY, `title` varchar(255), `date` int, `description` text)');
        });
    }

    /**
    * Fetch new items from web
    */
    var fetchItems = function()
    {
        $.get(rssURL, function(data){
            KIJ2013.db.transaction(function(tx){
                $(data).find('item').each(function(i,item){
                    var guid = $(item).find('guid').text();
                    var title = $(item).find('title').text();
                    var date = new Date($(item).find('pubDate').text());
                    var description = $(item).find('encoded').text();
                    description = description || $(item).find('description').text();
                    tx.executeSql('INSERT INTO `' + TABLE_NAME + '` (`guid`, `title`, `date`, `description`) VALUES (?, ?, ?, ?)', [guid, title, (date/1000), description]);
                });
            });
            displayNewsList();
        },"xml").error(function(jqXHR,status,error){
            showError('Error Fetching Items: '+status);
        });
    }

    var onClickNewsItem = function(event)
    {
        var sender = $(event.target);
        displayNewsItem(sender.data('guid'));
    }

    var displayNewsList = function()
    {
        KIJ2013.setActionBarUp('index.html');
        KIJ2013.setActionBarTitle('News');
        KIJ2013.db.readTransaction(function(tx){
            tx.executeSql('SELECT guid,title FROM `' + TABLE_NAME + '` ORDER BY `date` DESC LIMIT 30', [], function(tx, result){
                var len = result.rows.length;
                if(len)
                {
                    var list = $('<ul/>').attr('id',"news-list").addClass("listview");
                    for(var i=0;i<len;i++)
                    {
                        var row = result.rows.item(i);
                        var li = $('<li/>');
                        var item = $('<a/>').attr('id', row.guid).text(row.title);
                        item.data('guid', row.guid);
                        item.click(onClickNewsItem);
                        li.append(item);
                        list.append(li);
                    }
                    $('#body').empty().append(list);
                }
                else
                    $('#body').append('<div>Loading News</div>');
            });
        });
    }

    var displayNewsItem = function(guid){
        KIJ2013.setActionBarUp(displayNewsList);
        KIJ2013.db.readTransaction(function(tx){
            tx.executeSql('SELECT title,date,description FROM `' + TABLE_NAME + '` WHERE guid = ? LIMIT 30', [guid], function(tx, result){
                if(result.rows.length == 1)
                {
                    var item = result.rows.item(0);
                    KIJ2013.setActionBarTitle(item.title)
                    $('#body').empty();
                    var content = $('<div style="padding: 10px;"></div>');
                    content.append('<h1>'+item.title+'</h1>');
                    content.append(item.description);
                    $('#body').append(content);
                    window.scrollTo(0, 1);
                }
            });
        });
    }

    return {
        init: function(){
            KIJ2013.init();
            createDatabase();
            displayNewsList();
            fetchItems();
            // Hides mobile browser's address bar when page is done loading.
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 1);
        }
    }
}