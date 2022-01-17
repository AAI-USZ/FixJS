function()
{
	var paste = document.getElementById("paste");
	var previous_text = "";
	var converter = new Showdown.converter();
	var preview   = document.getElementById("markdown");

	window.setInterval(function(){
		if(paste.value != previous_text)
		{
			preview.innerHTML = converter.makeHtml(paste.value).replace( /\&amp;/g, '&');
			previous_text = paste.value;
		}
	},1000);

	preview.innerHTML = converter.makeHtml(paste.value).replace( /\&amp;/g, '&');
	previous_text = paste.value;
}