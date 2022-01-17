function(elem){
		$(elem).find(this.selector).each(function(){
			tinyMCE.execCommand('mceRemoveControl', true, this.id);
		});
	}