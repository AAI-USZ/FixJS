function (msg) {
	if (msg.indexOf("alsfjlqwjdlas") !== -1) {
		console.log(style_html(msg.replace("alsfjlqwjdlas", "")
			.replace(/<script[^>]*>([\\S\\s]*?)<\/script>/img, '')));
			// .replace(/opacity.+;/img, '')));
		phantom.exit();
	}
}