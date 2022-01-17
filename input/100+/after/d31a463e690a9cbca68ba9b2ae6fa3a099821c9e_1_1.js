function (msg, client) {
	if (!check(['string'], msg))
		return false;
	var alloc = msg[0];
	if (!client.post || client.post.image)
		return false;
	client.db.obtain_image_alloc(alloc, function (err, alloc) {
		if (!client.post || client.post.image)
			return;
		client.db.add_image(client.post, alloc, client.ident.ip,
					function (err) {
			if (err)
				client.report(db.Muggle(
					"Image insertion problem.", err));
		});
	});
	return true;
}