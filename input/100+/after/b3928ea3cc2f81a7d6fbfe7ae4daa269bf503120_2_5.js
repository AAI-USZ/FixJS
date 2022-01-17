function getAuthor(liPost) {
  var pPost = liPost;
  var author = [];

	if (liPost.className.indexOf("same_user_as_last") >=0) { // There's no post_info data after the first in sequential posts by the same author, so we need to look for the previous post and it may not be immediately above the post we're looking at.
    while(pPost.previousSibling.id == undefined || pPost.previousSibling.id.indexOf("post_") != 0 || pPost.previousSibling.className.indexOf("same_user_as_last") >= 0) {
      pPost = pPost.previousSibling;
    }
    pPost = pPost.previousSibling;
  }

	author['name'] = pPost.getElementsByClassName("post_info").item(0).getElementsByTagName("A").item(0).innerHTML;
	var avatar = document.getElementById(pPost.id.replace('_','_avatar_'));
	if (avatar != null) {
    author['avatar'] = avatar.getAttribute("style").replace('background-image:url(\'','').replace('_64.','_40.').replace('\')','');
  }
	return author;
}