function() {
/**		var nextMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	    }]);
		var oneMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]);
		var twoMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]);
		var threeMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]);
		var fourMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]); */
		this.control({
			'#nextbutton' : {
				click : this.nextQuestion
			},
			'#prevbutton' : {
				click : this.prevQuestion
			},
			'#startbutton' : {
				click : this.startQuiz
			},
			'#finishbutton' : {
				click : this.finishQuiz
			},
		})
	}