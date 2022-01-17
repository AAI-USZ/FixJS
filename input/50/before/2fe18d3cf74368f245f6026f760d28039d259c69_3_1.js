function(callback) {
		Category.find({}, 'division', function (e, divisions){
			var uniqueResults = _.uniq(_.pluck(divisions, 'division')); //todo: super lame but mongoose distinct just didnt work, why?			
			callback(uniqueResults);
		});
	}