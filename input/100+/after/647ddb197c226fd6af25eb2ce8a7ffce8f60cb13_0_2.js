function(){
	if(myself && !myself.orgBoards) { // Not initiated yet
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
	var template="<h1>{{fullName}} ({{username}})</h1>{{#orgBoards}}<div class='list'><h2>{{name}}</h2><ul>{{#boards}}<li><a href='#{{id}}'>{{name}}</a></li>{{/boards}}</ul></div>{{/orgBoards}}";
	var str=Mustache.render(template,myself);
	$("#view").html(str);
}