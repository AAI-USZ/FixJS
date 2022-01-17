function Caption(params){
		if(params.cue instanceof Cue){
			this.text = new Ayamel.Text({
				wrapper:params.wrapper,
				menu:caption_menu(),
				processor:params.processor,
				text:params.cue.text
			});
			this.cue = params.cue;
		}else{
			this.text = new Ayamel.Text(params);
			this.cue = new Cue("",params.startTime,params.endTime,params.text);
		}
	}