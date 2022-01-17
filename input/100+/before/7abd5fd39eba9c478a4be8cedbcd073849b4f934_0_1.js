function(projectBase, title, originalPath) {
	var extension = originalPath.match(/\.(\w+)$/);
	if (extension)
		extension = extension[1].toLowerCase();	
	else 
		extension = "";
  	var type      = {
  		'png':'image', 'gif':'image', 'txt':'text', 'html':'text',
		'jpg':'image', 'jpeg':'image',
		'avi':'video', 'mp3':'audio', 'mp4':'video', 'wav':'audio', 'aiff':'audio'
	}[extension] || 'unknown';
	var ctor = Content.TypeConstructor(type);
	return new ctor(projectBase, title, originalPath);
}