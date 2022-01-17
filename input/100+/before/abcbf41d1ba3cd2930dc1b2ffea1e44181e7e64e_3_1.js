function (id,wolfpackName,applicationFrame) {
	var appContainer = new AppContainer(id,applicationFrame);
	var frame = appContainer.getFrame();
	
	var request = new PostRequestHandler(id,"/json",60)
		.listenToRefresh()
		.register(getWolfpacksMembersData,
				new ResonseHandler("wolfpackMembers",
						["membersList"],handleWolfpacksMembersData));
		
	var topTitle = new TitleArea(new Wolfpack(wolfpackName))
		.appendTo(frame)
		.addFunction("Post", function() {
			// TODO: post on wolfpack
			alert("This will post to this wolfpack");
		})
		.addFunction("Add member...", function() {
			// TODO: add member
			alert("This will add a member to a wolfpack");
		});
	
	var members = new CommaSeperatedList("Members");
	topTitle.appendAtBottomPart(members.getList());
	
	new NewsFeedList(request,{
		newsOf:"wolfpack",
		wolfpackName:wolfpackName
	}).appendTo(frame);	
	
	function getWolfpacksMembersData() {
		return {
			wolfpackMembers: {
				wolfpackName: wolfpackName
			}
		};
	}
	
	function handleWolfpacksMembersData(data, textStatus, postData) {
		list = data.membersList;

		members.removeAll();

		$.each(list, function(i, member) {
			members.addItem(new User(member.id, member.name));
		});
	}
	
	return {
		getID : function() {
			return id;			
		},
		getName : function() {
			return wolfpackName;			
		},
		isSelected : function() {
			return appContainer.isSelected();
		},
		destroy : function() {
			appContainer.destroy();
			delete this;
		}
	};
}