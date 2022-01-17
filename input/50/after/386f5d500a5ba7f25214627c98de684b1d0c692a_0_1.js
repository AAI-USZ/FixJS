function(e, args) {
		args.message = args.message.replace(/\>(https?:\/\/w{0,3}\.?youtube.com\/watch\?v=([^\s^&]*)([^\s]*))\<\/a\>/i, '>$1<br /><iframe width="300" height="200" src="http://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe></a><br />');
	}