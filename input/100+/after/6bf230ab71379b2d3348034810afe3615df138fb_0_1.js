function(d) {
			
			trace('init');
			
			VMM.bindEvent(global, onDataReady, "DATAREADY");
			
			/* GET DATA
			================================================== */
			if (ie7) {
				$feedback = VMM.appendAndGetElement($timeline, "<div>", "feedback", "");
				$messege = VMM.appendAndGetElement($feedback, "<div>", "messege", "Internet Explorer 7 is not supported by Timeline.");
			} else {
				if (type.of(d) == "string") {
					VMM.Timeline.DataObj.getData(d);
				} else {
					VMM.Timeline.DataObj.getData(html_string);
					//VMM.attachElement(element, content);
				}

				//VMM.attachElement($timeline, "");

				$feedback = VMM.appendAndGetElement($timeline, "<div>", "feedback", "");
				$messege = VMM.appendAndGetElement($feedback, "<div>", "messege", "Loading Timeline");
			}
			
			
		}