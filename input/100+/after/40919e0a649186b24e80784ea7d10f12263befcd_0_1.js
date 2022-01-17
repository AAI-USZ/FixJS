function(item){
          var link = item.link.match(/[0-9]+.html$/);
          link = 'http://m.voanews.com/learningenglish/' + link + '?show=full';
          tableView.appendRow({title: item.title, color: '#000', link: link, hasChild: true});
        }