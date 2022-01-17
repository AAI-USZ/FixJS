function(div, isEdit) {
	Content.prototype.preview.call(this, div);	
	var mp3         = new air.Sound(new air.URLRequest('file://' + this.path));
	var channel     = null;
	var btn         = $('<input type="button" value="Play" />');
	var self = this; 
	var currentPath = this.path 
	var toggleSound = function() {
		if(channel) {
			channel.stop();
			channel = null;
		} else {
			if (self._tmpObj && self._tmpObj.path != currentPath){
				currentPath = self._tmpObj.path		
				mp3 = new air.Sound(new air.URLRequest('file://' + currentPath));
			}
			channel = mp3.play();
			channel.addEventListener(air.Event.SOUND_COMPLETE,
			function(e) { channel = null; btn.attr('value', 'Play'); }); 
		}
		btn.attr('value', channel ? 'Stop' : 'Play');
	};
	btn.click('click', toggleSound);
	div.append(btn);
	
	/*
    * Replaceable button  
    */ 
       
    var audioBtn = $('<button>Replace Audio</button>');
    audioBtn.click(function() {
		if(channel) {
			toggleSound();
		}
        replaceMediaFile(function(e) {
            Content.prototype.replaceMedia.call(self, e.target.url);
            return false;
        },self.type);		
        return false;
    });    
	
	// unrender in this case will be sure the audio has stopped playing
	this.unrender = function() {
		Content.prototype.unrender.call(this);
		if(channel) {
			channel.stop();
			channel = null;
		}
	};
	if (!isEdit) {
		var p = $('<p/>');
		var descContent = this.descFile.val;
		if (descContent.trim() == "")
			descContent = descContent.trim();
		p.html(descContent);
		div.append(p);
	} else {
		div.append(audioBtn);
	}
	return div;
}