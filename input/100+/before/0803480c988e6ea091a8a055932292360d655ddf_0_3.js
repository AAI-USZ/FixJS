function() {
		var nextMap = new Ext.util.KeyMap(Ext.getBody(), {
            key: 174,
            ctrl: false,
            target: this
        });
		var prevMap = new Ext.util.KeyMap(Ext.getBody(), {
            key: 176,
            ctrl: false,
            target: this
        });
		var oneMap = new Ext.util.KeyMap(Ext.getBody(), {
            key: 49,
            ctrl: false,
            target: this
        });
		var twoMap = new Ext.util.KeyMap(Ext.getBody(), {
            key: 50,
            ctrl: false,
            target: this
        });
		var threeMap = new Ext.util.KeyMap(Ext.getBody(), {
            key: 51,
            ctrl: false,
            target: this
        });
		var fourMap = new Ext.util.KeyMap(Ext.getBody(), {
            key: 52,
            ctrl: false,
            target: this
        });
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