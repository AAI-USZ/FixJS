function() {

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

		try {

			applet.resetStudentsState();
		} catch (err) {
			myLogger.Log("Check answer " + this.id + ": reset failed " + err);
			return;
		}

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
			try {
				applet.addPoint(bugfixParam("" + points[int].token));
			} catch (err) {
				myLogger.Log("Check answer " + this.id + ": addPoint failed "
						+ err);
				return;
			}
			points[int].MarkNeutral();
		}

		log_data += "Conlusions:\n";

		for ( var int = 0; int < conclusions.length; ++int) {
			log_data += conclusions[int].token + "\n";
			try {
				applet.addConclusion(bugfixParam("" + conclusions[int].token));
			} catch (err) {
				myLogger.Log("Check answer " + this.id
						+ ": addConclusion failed " + err);
				return;
			}
			conclusions[int].MarkNeutral();
		}

		log_data += "Result:\n";

		var result = "";
		try {
			result = applet.checkAnswerAndFeedback();
		} catch (err) {
			myLogger.Log("Check answer " + this.id
					+ ": checkAnswerAndFeedback failed " + err);
			return;
		}
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

		var incorrect = (status[0].trim() != "") || (status[1].trim() != "");

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

		var parts = status[3].trim().substr(6).split("&");

		var incomplete = parts.length < this.requiredCount;

		for ( var int = 0; int < this.requiredParts.length; int++) {
			if (parts.lastIndexOf(this.requiredParts[int]) < 0)
				incomplete = true;
		}

		if (incomplete) {
			this.currentFeedback += this.incompleteSolution;
		}

		if ((!incomplete) && (!unjustified) && (!incorrect)) {
			this.currentFeedback += this.correctSolution;
		}

		this.SetHint(this.currentFeedback);

		myLogger.Log(log_data);

	}