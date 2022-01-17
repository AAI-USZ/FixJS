function renderPreviewImage(item) {

	var previewImage =  '<div class="innerwrap" style=\'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.62)), color-stop(27%,rgba(0,0,0,0.12)), color-stop(41%,rgba(0,0,0,0.01)), color-stop(53%,rgba(0,0,0,0.06)), color-stop(100%,rgba(0,0,0,0.48))), url("'
		+ (item.thumbnail ? item.thumbnail :'http://www.blog.spoongraphics.co.uk/wp-content/uploads/2011/great-britain/great-britain-sm.jpg')
//		+ 'http://www.smashinglists.com/wp-content/uploads/2010/02/persian.jpg'
		+ '")' +'\'>'
		+ '<h5>'
		+ '<a href="/article/' + item.uuid + '">' + item.title + '</a></h5>'
		+'</div>'




	return  previewImage


//	if (item.thumbnail) {
//
//		return '<img src="' + item.thumbnail + '" alt="' + item.title + '" />';
//	}
//	else {
//		return '<img src="http://www.blog.spoongraphics.co.uk/wp-content/uploads/2011/great-britain/great-britain-sm.jpg" alt="' + item.title + '" />';
//	}


}