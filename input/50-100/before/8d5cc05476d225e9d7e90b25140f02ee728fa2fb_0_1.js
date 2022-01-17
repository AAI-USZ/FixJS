function(){
	data = {
			post_type: 'post',
			post_status : 'draft',
			post_title: 'newPost',
			post_author: 1,
			post_excerpt: '',
			post_content: '通过Wordpress Xmlrpc API 创建文章测试',
			post_format: '',
	};
	object = wp.newPost(1, data);
	equal(true, object > 0, "Post created");
	
	wp.deletePost(1,object);
	
}