function(appType, pageNum, searchObj, callback){
	var self = this;
	/// course, week, , searchQuery, searchType
	if(!searchObj.searchQuery && searchObj.searchType !== 'myQuestions' &&
		searchObj.searchType !== 'viewed' && searchObj.searchType !== 'replied'){
		console.log('searchQuery is undefined');
		callback(undefined);
		return;
	}

	var data = {
		query: {
			bool:{
				must:[
					{
				flt:{
				"fields":["title", "body"]
				, "like_text":searchObj.searchQuery
				}}
				]
			}
		},
		//sort:[{"title.untouched":{"order":"asc"}}],
		from: paging(pageNum),
		size: sizeOfResult
	};

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
		if(data) {
			addUsersToData(data, callback);
		} else {
			callback(undefined);
		}
	});
}