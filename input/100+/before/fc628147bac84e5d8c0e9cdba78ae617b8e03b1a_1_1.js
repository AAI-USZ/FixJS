function( field ) {
		var sortedData = data;
		sortedData.qSortFieldNum(field);
				
		if( this.data.length % 2 ){
			return sortedData.sessions[this.ses].data[Math.floor(this.data.length/2)][field];
		} else {
			return (sortedData.session[this.ses].data[Math.floor(this.data.length/2)][field]+sortedData.sessions[this.ses][Math.ceil(this.data.length/2)][field])/2;
		}

	}