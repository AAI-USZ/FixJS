function(html, toolbar, id, text, iconName) {

	toolbar.append(html);

	$("#" + id, toolbar).button({ text: false, icons: { primary: iconName }});

}