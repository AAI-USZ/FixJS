function(post) {
			res.render('post', { title: post.title, post: post, homeNavClasses: '', aboutNavClasses: '' });
		}