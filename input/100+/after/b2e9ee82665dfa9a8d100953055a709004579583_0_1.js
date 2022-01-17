function()
	{
		console.log('preview the sequence')
		var _this = this;
		this.previewMode = true;
		this.exportProject();
		this.unrenderFrame( this.currentFrame );
		this.player = new Player2($('body'));
		this.player.loadProject(this.exportProject(), {sequenceID: parseInt(this.currentSequence.id), frameID : parseInt(this.currentFrame.id) } );
		console.log('update background color')
		$('body').css({'background':'#000'});
	}