function(){
			var query = String.format("select * from rss where url = '%s'",_url);
			Ti.Yahoo.yql(query,function(response){
				if (response.success === false){
					alert("Yahoo YQL error.");
					return;
				}
				response.data.item.forEach(function(item){
		      var link = item.link.match(/[0-9]+.html$/);
		      link = 'http://m.voanews.com/learningenglish/' + link + '?show=full';
          tableView.appendRow({title: item.title, color: '#000', link: link, hasChild: true});
				});
			});
		}