function(post) {
			res.render('post', { title: post.title, post: post, shared: shared.getSharedViewModel() });
		}