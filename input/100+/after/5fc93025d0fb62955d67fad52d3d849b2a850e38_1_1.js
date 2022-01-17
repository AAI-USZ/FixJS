function(){
	if(!myself.orgBoards) { // Not initiated yet
		var categories=_.groupBy(myself.boards,function(board){ // Categories Boards
			var id=board.idOrganization?board.idOrganization:"";
			return id;
		});
		var orgList=_.groupBy(myself.organizations,function(org){ // Map orgId-orgName
			return org.id;
		});

		myself.orgBoards=_.map(categories,function(value,key){ // Create Array of Organizations containing Array of Boards
			var list={};
			list.boards=value;
			list.name=(key!==""||key===null)?orgList[key][0].displayName:"Personal";
			return list;
		});
	}

	$("#view").empty();
	var intro="<div class='list'><h2>About Trello2HTML</h2><p>This is an web app to export Trello Boards to HTML, our team uses this to record our progress every month. We do not track or record you any way, and Trello access is read-only. You can host this on any static server. Google Chrome is tested and supported, your mileage may vary with other browsers.</p><ul><a href='#4d5ea62fd76aa1136000000c'><li>Demo using Trello Development</li></a><a href='trello.zip'><li>Download zipped source</li></a><a href='https://trello.com/board/trello2html/4fb10d0e312c2b226f1eb4a0'><li>Feature Requests and Bug Reports</li></a><a href='http://tianshuohu.diandian.com/post/2012-06-08/Trello-Export-as-html'><li>Blog Article (Chinese/English)</li></a></ul></div>";
	var template="<h1>{{fullName}} ({{username}})</h1><div id='boardlist'>"+intro+"{{#orgBoards}}<div class='list'><h2>{{name}}</h2><ul>{{#boards}}<a href='#{{id}}' ><li>{{name}}</li></a>{{/boards}}</ul></div>{{/orgBoards}}</div>";
	var str=Mustache.render(template,myself);
	$("#view").html(str);
	$("#boardlist").masonry({
		itemSelector:'.list'
	});

}