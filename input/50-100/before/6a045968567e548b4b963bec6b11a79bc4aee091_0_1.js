function toViewModel(gist) {
		return {
			raw_url: getFirstGistFile(gist).raw_url,
		  	id: gist.id,
		  	description: gist.description,
		  	created_at: new Date(gist.created_at),
		  	url: 'https://gist.github.com/' + gist.id,
		  	comments: gist.comments
		};
    }