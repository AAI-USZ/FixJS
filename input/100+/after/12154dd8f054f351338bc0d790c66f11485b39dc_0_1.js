function getAuthor(liPost) {
  var author = [];
	while(liPost.tagName != "LI" || liPost.getElementsByClassName("post_info").length == 0) {
		liPost = liPost.previousSibling;
	}
	author['name'] = liPost.getElementsByClassName("post_info").item(0).getElementsByTagName("A").item(0).innerHTML;
	var avatar = document.getElementById(liPost.id.replace('_','_avatar_'));
	if (avatar != null) {
    author['avatar'] = avatar.getAttribute("style").replace('background-image:url(\'','').replace('_64.','_40.').replace('\')','');
  }
	return author;
}