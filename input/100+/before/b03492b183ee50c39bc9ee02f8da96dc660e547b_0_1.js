function(data){
      db.transaction(function(tx){
          $(data).find('item').each(function(i,item){
              var guid = $(item).find('guid').text();
              var title = $(item).find('title').text();
              var date = new Date($(item).find('pubDate').text());
              var description = $(item).find('description').text();
              tx.executeSql('INSERT INTO `items` (`guid`, `title`, `date`, `description`) VALUES (?, ?, ?, ?)', [guid, title, (date/1000), description]);
          });
      });
      loadItems();
  }