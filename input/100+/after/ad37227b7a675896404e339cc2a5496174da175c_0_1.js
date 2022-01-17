function renderArticlePreviewBox(item) {
	var article =
		'<div class="three columns articlebox">'
			+ '<div class="innercontents '+ stylePicker.getStyle(item.course.subject) +'" data-id="' + item.uuid + '" id="' + item.uuid + '">'
			+ '<img src="'+'https://secure.gravatar.com/avatar/aa50677b765abddd31f3fd1c279f75e0?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png'+'<" class="avatar"/>'


			+ '<div class="post_details"> '
			+ '<span>' + item.user.firstName + " " + item.user.lastName + '</span>'
			+ isProf(item.user.type) //return nothing if not

			+ '<p>Posted '
			+ '<span class="post_time"> ' + formartDate(item.createdAt) + '</span>'
			+ ' in '
			+ '<span class="coursename">' + '<a href="/course/'+  item.course.subject+item.course.number+'/week/'+weekConverter(item.createdAt,'2012-05-09')+'">' + item.course.subject + " " + item.course.number
			+ '-WK' + weekConverter(item.createdAt,'2012-05-09') + '</a>'
			+ '</span>'

			+ '</p>'
			+ '</div>'
			//end of post_details

			+ renderPreviewImage(item)
			//end of innerwrap

			+ '<div class="articlepreview">' + '<p>' + renderExcerpt(item.excerpt) + '</p>'
			+ '</div>'
			+ '<div class="likescomments">'
			+ renderStar(item.starred)

			+ '<span> Like (' + item.likes + ') </span>'
			+ '<span> Comments (' + item.totalComments + ') </span>'
			+ '</div>'
			+ '</div>'
			+ '</div>';
	return article;

}