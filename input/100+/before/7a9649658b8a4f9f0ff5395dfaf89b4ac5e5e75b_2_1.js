function(data){
			d.clearCookie();
			d.add(0,-1,"");
			$.each(data.Nodes,function(commentIndex,comment){
				d.add(comment['id'], comment['pid'], comment['name'], comment['url'], comment['name'], 
						comment['target'], comment['icon'], comment['iconOpen'], comment['open']);
			});
			document.getElementById("tree").innerHTML=d.toString();
			controlLength('tree');
		}