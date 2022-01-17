function preinit() {

	var url;



	if (url = tinyMCEPopup.getParam("external_link_list_url"))

		document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');

}