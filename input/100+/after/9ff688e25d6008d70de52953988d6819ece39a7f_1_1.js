function(){
			var object = create();
			object.addEvent('event', $empty).addEvent('event2', $empty);

			object = create();
			object[fire]('event')[fire]('event');
		}