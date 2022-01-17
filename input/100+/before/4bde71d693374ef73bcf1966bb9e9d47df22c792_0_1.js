function() {
		this.view = new TimelineView();

		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 7,
			eventDate: 18,
			eventName: 'Surprise Event',
			eventDescription: 'Surprise event for those who are not surprised!'
		});

		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 7,
			eventDate: 18,
			eventName: 'Surprise Event #2',
			eventDescription: 'Surprise event for those who are not surprised!'
		});

		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 7,
			eventDate: 18,
			eventName: 'Surprise Event #7',
			eventDescription: 'Surprise event for those who are not surprised!'
		});

		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 7,
			eventDate: 19,
			eventName: 'Surprise Event #3',
			eventDescription: 'Surprise event for those who are not surprised!'
		});

		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 8,
			eventDate: 31,
			eventName: 'Surprise Event #4',
			eventDescription: 'Surprise event for those who are not surprised!'
		});
		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 9,
			eventDate: 19,
			eventName: 'Surprise Event #5',
			eventDescription: 'Surprise event for those who are not surprised!'
		});
		this.view.addEvent({
			eventYear: 2012,
			eventMonth: 10,
			eventDate: 1,
			eventName: 'Surprise Event #6',
			eventDescription: 'Surprise event for those who are not surprised!'
		});


		this.collection = new StubHubEventCollection();
		this.hunch = new HunchRecCollection();
		window.CONFIG = new MdlConfig();
		//this.collection.fetch({success: function(){}});

/*		this.HunchRecCollection = new HunchRecCollection();
		this.HunchRecCollection.meta('topic_ids', 'list_musician');
		this.HunchRecCollection.meta('likes', 'hn_3570964');
		this.HunchRecCollection.meta('blocked_result_ids', 'hn_3570964');
		console.log(this.HunchRecCollection.url());
		this.HunchRecCollection.fetch();*/
	}