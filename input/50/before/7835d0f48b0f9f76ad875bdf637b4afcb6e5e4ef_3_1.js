function() {
		if (this.get('eventNickName') != '') {
			this.set('thumbnail', 'http://cache1.stubhubstatic.com/promotions/scratch/genre_136px/' + this.get('eventNickName') + '-136px.gif');	
		} else {
			this.set('thumbnail', '');
		}
	}