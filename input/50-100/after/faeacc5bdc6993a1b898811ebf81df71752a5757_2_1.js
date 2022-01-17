function extractPostContent(contentStr) {
	post = JSON.parse(contentStr);
	post.title = html_encode(post.title);
	post.content = html_encode(post.content);
	//Replace all \n to <br>
	var reg = new RegExp("\n", "g");
	post.content = post.content.replace(reg, '<br>');
	
	//Eliminate all ASCII control characters
	reg = new RegExp("\u001B\\[[0-9;]*[A-Za-z]", "g");
	post.content = post.content.replace(reg, '');
	
	return post;
}