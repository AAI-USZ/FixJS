function toBlogPost(gist) {
    	return { 
    		id: gist.id,
    		title: gist.description, 
    		date: gist.created_at,
    		comment_count: gist.comments,
    		content_md: '',
    		content_html: '',
    		url: '/post/' + gist.id,
    		gist_url: 'https://gist.github.com/' + gist.id,
    		raw_url: gist.raw_url 
    	};
    }