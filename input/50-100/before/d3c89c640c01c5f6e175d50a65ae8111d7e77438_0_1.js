function(){
		switch(this.state){
			case 'released':
				return this.statedata;
				break;
			case 'oncall':
			case 'wrapup':
			case 'ringing':
			case 'outgoing':
			case 'precall':
			case 'warmtransfer':
				return '<img src="/images/' + this.statedata.type + '.png" />' + this.statedata.client
			default:
				//console.log(['dinna parse', this.statedata]);
				return '';
		}
	}