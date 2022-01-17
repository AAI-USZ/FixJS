function(/*Widget*/ w){
			if(w.labels && w.labels[0] && w.labels[0].charAt(0) === '['){
				for(var i = 0; i < w.labels.length; i++){
					w.labels[i] = w.labels[i].replace(/^\[*[\'\"]*/, '');
					w.labels[i] = w.labels[i].replace(/[\'\"]*\]*$/, '');
				}
				console.log('[MIG:fixed] SpinWheelSlot: dojox.mobile.parser no longer accepts array-type attribute like labels="[\'A\',\'B\',\'C\',\'D\',\'E\']". Specify as labels="A,B,C,D,E" instead.' );
			}
		}