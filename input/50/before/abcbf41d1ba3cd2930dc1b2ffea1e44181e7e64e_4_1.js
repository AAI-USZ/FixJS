function handleProfileData(data, textStatus, postData) {
		document.title = "eWolf - " + data.name;
			
		eWolf.data('userID',data.id);
		eWolf.data('userName',data.name);
			
		InitEWolf();			
	}