function(words) {
		var i,
			sent = "",
			tokens = tokenizer.tokenize(query);
		//tokens = query.tokenizeAndStem();

		console.log('tokenizing query function');
		for (i in tokens) {
			var candidates = dict.testing(tokens[i], words);
			//console.log(candidates);
			//console.log(hi_find(candidates));
			sent += " "+hi_find(candidates);
			//console.log(candidates.sort()[candidates.length-1][1]);
		}
		var tmp = sent.tokenizeAndStem();
		console.log('sent: ' + sent);
		callback(tmp.join(' '));
	}