function InferenceButton(atags, rtags, points, conclusions) {

	this.id = myInferenceId++;
	this.errorCount = 0;

	this.acceptTags = atags;
	this.rejectTags = rtags;

	this.name = "";
	for ( var i = 0; i < atags.length; ++i) {
		this.name += atags[i];
	}
	this.name += "_" + this.id;

	this.food = [];

	if (typeof points == "undefined") {
		this.points = "points";
	} else {
		this.points = points;
	}

	if (typeof conclusions == "undefined") {
		this.conclusions = "conclusions";
	} else {
		this.conclusions = conclusions;
	}

	/**
	 * unlike the answer button, the feedback is given by the applet
	 */
	this.currentFeedback = "";
	this.text = "Check your answer";
	
	this.incompleteSolution = "Your solution is not complete! <br/>";
	this.injustifiedSolution = "The yellow sentences need to be further justified! <br/>";
	this.correctSolution = "Correct!";
	this.incorrectSolution = "The red points/conclusions are not correct.<br/>";
	this.lackHints = {};
	this.requiredParts = [];
	this.requiredCount = 0;
	

	this.waitfor = [];

	this.WriteHtml = function() {

		document
				.write("<applet id=\"inferenceApplet"
						+ this.id
						+ "\" "
						+ "name=\"inferenceApplet"
						+ this.id
						+ "\""
						+ " archive=\"inferenceApplet.jar\" "
						+ "code=\"de.tu_dresden.psy.inference.regexp.xml.InferenceMachine\" "
						+ "MAYSCRIPT style=\"width: 1px; height: 1px\"></applet>");

		document.write("<form onsubmit=\"return false;\">");
		document.write("<input type=\"button\" value=\"" + this.text
				+ "\" onclick=\"myInferenceButtons[" + this.id
				+ "].OnClick()\"/>");
		document
				.write("<br /><table border=0 cellpadding=0 cellspacing=0><tr><td id=\"InferenceHint"
						+ this.id
						+ "\" style=\"height: 20px; width: 100%\"></td></tr></table>");
		document.write("</form>");
	};
	
	this.AddHint = function(lack, hint) {
		this.lackHints[lack] = hint;
		
		return this;
	};
	
	this.RequirePart = function(part) {
		this.requiredParts.push(part.toLowerCase());
		
		return this;
	};
	
	this.RequireCount = function(count) {
		
		this.requiredCount = count;
		
		return this;
	};
	
	this.SetCorrect = function(text) {
		this.correctSolution = text;
		
		return this;
	};
	
	this.SetIncorrect = function(text) {
		this.incorrectSolution = text;
		
		return this;
	};
	
	this.SetIncomplete = function(text) {
		this.incompleteSolution = text;
		
		return this;
	};
	
	this.SetInjustified = function(text) {
		this.injustifiedSolution = text;
		
		return this;
	};


	/**
	 * add data that is post-poned to be fed into the applet after the page
	 * loaded.
	 * 
	 * @returns this
	 */

	this.Feed = function(encodedData) {
		for ( var int = 0; int < encodedData.length; ++int) {
			this.food.push(encodedData[int]);
		}
		return this;
	};

	/**
	 * We have to wait for the page to finish loading the applet instance before
	 * we may feed it with the relevant information
	 */
	this.FeedApplet = function() {
		var applet = document.getElementById("inferenceApplet" + this.id);


		if (this.food.length) {
			var ret = applet.feed(bugfixParam(decodeString(this.food)));

			myLogger.Log(this.name + " feed: " + ret);
		};
	};

	/**
	 * this function sets the text of the component
	 * 
	 * @returns this
	 */
	this.Text = function(text) {
		this.text = text;
		return this;
	};

	/**
	 * this function sets the name of the component
	 * 
	 * @returns this
	 */
	this.Name = function(name) {
		this.name = name;
		return this;
	};

	/**
	 * this function adds a waitfor-function of the component, which is called
	 * whenever the answer button is clicked, and which has to return true in
	 * order to check the answer. The given function is responsible to alert the
	 * user that the answer will not be checked.
	 * 
	 * @returns this
	 */

	this.WaitFor = function(waitforfn) {
		this.waitfor[this.waitfor.length] = waitforfn;

		return this;
	};

	/**
	 * this is called whenever the button is clicked
	 */
	this.OnClick = function() {
		
		var unjustified = false;

		/**
		 * check, whether giving a solution is allowed
		 */
		for ( var int = 0; int < this.waitfor.length; int++) {
			if (this.waitfor[int]() != true) {
				myLogger.Log("Check answer " + this.id + ": check refused by "
						+ int + ".");
				return;
			}
		}

		var applet = document.getElementById("inferenceApplet" + this.id);

		/**
		 * reset student's state
		 */

		applet.resetStudentsState();

		/**
		 * fetch all inputs
		 */

		this.acceptTags.push(this.points);

		var points = myTags.AllTagsBut(this.acceptTags, this.rejectTags);

		this.acceptTags.pop();

		this.acceptTags.push(this.conclusions);

		var conclusions = myTags.AllTagsBut(this.acceptTags, this.rejectTags);

		this.acceptTags.pop();

		/**
		 * submit inputs
		 */

		var log_data = this.name + " check answer triggered.\nPoints:\n";

		for ( var int = 0; int < points.length; ++int) {
			log_data += points[int].token + "\n";
			applet.addPoint(bugfixParam("" + points[int].token));
			points[int].MarkNeutral();
		}

		log_data += "Conlusions:\n";

		for ( var int = 0; int < conclusions.length; ++int) {
			log_data += conclusions[int].token + "\n";
			applet.addConclusion(bugfixParam("" + conclusions[int].token));
			conclusions[int].MarkNeutral();
		}

		log_data += "Result:\n";

		var result = applet.checkAnswerAndFeedback();
		log_data += result;

		/**
		 * decode feedback result
		 * 
		 */

		var lines = result.split("\n");

		var status = lines[0].split(",");

		/**
		 * get correct points
		 */

		var int = 2;
		var count = parseInt(lines[1]);

		var correct_points = {};

		while (count > 0) {
			--count;

			correct_points[lines[int]] = 1;
			++int;
		}

		/**
		 * get wrong points
		 */

		count = parseInt(lines[int]);
		int++;

		var wrong_points = {};

		while (count > 0) {
			--count;

			wrong_points[lines[int]] = 1;
			++int;
		}

		/**
		 * get unjustified points
		 */

		count = parseInt(lines[int]);
		int++;

		var unjustified_points = {};

		while (count > 0) {
			--count;

			unjustified_points[lines[int]] = 1;
			++int;
			
			unjustified = true;
		}

		/**
		 * get correct conclusions
		 */

		count = parseInt(lines[int]);
		int++;

		var correct_conclusions = {};

		while (count > 0) {
			--count;

			correct_conclusions[lines[int]] = 1;
			++int;
		}

		/**
		 * get good conclusions
		 */

		count = parseInt(lines[int]);
		int++;

		var good_conclusions = {};

		while (count > 0) {
			--count;

			good_conclusions[lines[int]] = 1;
			++int;
		}

		/**
		 * get wrong conclusions
		 */

		count = parseInt(lines[int]);
		int++;

		var wrong_conclusions = {};

		while (count > 0) {
			--count;

			wrong_conclusions[lines[int]] = 1;
			++int;
		}

		/**
		 * get unjustified conclusions
		 */

		count = parseInt(lines[int]);
		int++;

		var unjustified_conclusions = {};

		while (count > 0) {
			--count;

			unjustified_conclusions[lines[int]] = 1;
			++int;
			
			unjustified = true;
		}

		/**
		 * colorize points
		 */

		for ( var int = 0; int < points.length; ++int) {
			if (("" + points[int].token) in unjustified_points) {
				points[int].MarkAsOkay();
			} else if (("" + points[int].token) in correct_points) {
				points[int].MarkAsGood();
			} else if (("" + points[int].token) in wrong_points) {
				points[int].MarkAsBad();
			}

		}

		/**
		 * colorize conclusions
		 */

		for ( var int = 0; int < conclusions.length; ++int) {
			if (("" + conclusions[int].token) in unjustified_conclusions) {
				conclusions[int].MarkAsOkay();
			} else if (("" + conclusions[int].token) in good_conclusions) {
				conclusions[int].MarkAsGood();
			} else if (("" + conclusions[int].token) in wrong_conclusions) {
				conclusions[int].MarkAsBad();
			}
		}
		
		/**
		 * use status to give additional feedback
		 */
		
		this.currentFeedback = "";
		
		var incorrect = (status[0].trim() != "")|| (status[1].trim() != "");
				
		if (incorrect) {
			this.currentFeedback += this.incorrectSolution;
		}
		
		if (unjustified) {
		    this.currentFeedback += this.injustifiedSolution;
		}
		
		var lacks = status[2].trim().substr(6).split("&");
		
		for ( var int = 0; int < lacks.length; int++) {
			if (lacks[int] in this.lackHints) {
				this.currentFeedback += decodeString(this.lackHints[lacks[int]]);
			}
		}
		
		var parts  = status[3].trim().substr(6).split("&");
		
		var incomplete = parts.length < this.requiredCount;
		
		for ( var int = 0; int < this.requiredParts.length; int++) {
			if (parts.lastIndexOf(this.requiredParts[int]) < 0)
				incomplete = true;
		}
		
		if (incomplete) {
			this.currentFeedback += this.incompleteSolution;
		}
		
		if ((!incomplete)&&(!unjustified)&&(!incorrect)) {
			this.currentFeedback += this.correctSolution;
		}
				
		
		this.SetHint(this.currentFeedback);

		myLogger.Log(log_data);

	};

	/**
	 * this function sets the contents of the hint area
	 */
	this.SetHint = function(contents) {
		var td = document.getElementById("InferenceHint" + this.id);
		td.innerHTML = contents;
	};

	/**
	 * return the current state
	 */
	this.GetValue = function() {
		return "" + this.errorCount + "\n" + escapeBTNR(this.currentFeedback);
	};

	/**
	 * restore the given state
	 */

	this.SetValue = function(contents) {
		var data = ("" + contents).split("\n");
		if (data.length == 2) {
			this.errorCount = parseInt(data[0]);

			this.currentFeedback = unescapeBTNR(data[1]);

			this.SetHint(this.currentFeedback);

		}
	};

	myStorage.RegisterField(this, "myInferenceButton[" + this.id + "]");
	myInferenceButtons[this.id] = this;

	return this;
}