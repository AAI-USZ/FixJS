function(appType, pageNum, searchObj, callback){
	/// course, week, , searchQuery, searchType
	var data = {
		query: {
			bool:{
				must:[]
			}
		},
		from: paging(pageNum),
		size: sizeOfResult
	};

	if(searchObj.searchQuery){
		data.query.bool.must.push({
			flt:{
				"fields":["title", "body"]
				, "like_text":searchObj.searchQuery
			}});
	}else{
		data.query.bool.must.push({match_all:{}});
	}

	switch(searchObj.searchType){
		case 'latest':{
			data = latestQuestion(data);
			break;
		}
		case 'instructor':{
			data = instructorQuestion(data);
			break;
		}
		case 'unanswered':{
			data = unansweredQuestion(data);
			break;
		}
		case 'myQuestions':{
			//TODO: change to use session user
			data = myQuestion(data, searchObj);
			break;
		}
		case 'viewed':{
			data = viewed(data, searchObj);
			break;
		}
		case 'replied':{
			data = replied(data, searchObj);
			break;
		}
	}


	switchIndex(appType);
	switchMapping(0);

	mapping.search(data, function(err, data){
		if(err)
			return callback(err);

		addUsersToData(data, callback);
	});
}