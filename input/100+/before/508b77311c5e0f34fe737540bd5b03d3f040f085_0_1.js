function(){
		$('back').on(
			'click',
			function(event, element){
				this.back();
			}.bind(this)
		);
		$('back').title = "Return to Dreambox Webcontrol";
		$('reload').on(
			'click',
			function(event, element){
				autotimereditorcore.list.reload();
			}.bind(this)
		);
		$('reload').title = "Reload the AutoTimer list";
		$('preview').on(
			'click',
			function(event, element){
				this.preview();
			}.bind(this)
		);
		$('preview').title = "Show events matching your AutoTimers";
		$('parse').on(
			'click',
			function(event, element){
				autotimereditorcore.list.parse();
			}.bind(this)
		);
		$('parse').title = "Run AutoTimer and add timers";
		$('timer').on(
			'click',
			function(event, element){
				autotimereditorcore.timers.load();
			}.bind(this)
		);
		$('timer').title = "Open timer list";
		$('backup').on(
			'click',
			function(event, element){
				this.backup();
			}.bind(this)
		);
		$('backup').title = "Backup the AutoTimer configuration";
		$('restore').on(
			'click',
			function(event, element){
				this.restore();
			}.bind(this)
		);
		$('restore').title = "Restore a previous configuration backup";
		$('about').on(
			'click',
			function(event, element){
				this.about();
			}.bind(this)
		);
		$('about').title = "Some information about author, license, support...";
	}