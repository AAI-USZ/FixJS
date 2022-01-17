function()
{
	var converter = new Showdown.converter();

	md_pre = document.getElementById("markdown");
	md_div = document.createElement("div");
	parent = md_pre.parentNode;

	md_div.innerHTML = converter.makeHtml(md_pre.innerHTML).replace( /\&amp;/g, '&');
	parent.appendChild(md_div);
	parent.removeChild(md_pre);
	md_div.id = 'markdown';

	var paste = document.getElementById("paste");
	if(paste != null)
	{
		var previous_text = "";
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
}