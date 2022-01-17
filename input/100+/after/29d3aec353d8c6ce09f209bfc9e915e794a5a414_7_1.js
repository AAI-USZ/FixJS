function Runway(name, tags, token, accept, reject) {

	this.id = runwayIdCounter++;



	/**

	 * Provide automatic name generation: use provided tags

	 */



	if ((name === undefined) || (name === "") || (name === false)) {

		this.name = "";

		for ( var i = 0; i < tags.length; ++i) {

			this.name += tags[i];

		}

	} else {



		this.name = name;

	}



	this.tags = tags;

	this.token = token;

	this.respawn = null;

	this.width = "200px";

	this.height = "20px";

	this.colorEmpty = "#CCCCCC";

	this.colorFilled = "#CCCCFF";

	this.colorGood = "#CCFFCC";

	this.markedgood = false;

	this.accept = accept;

	this.reject = reject;

	this.doRespawn = null;

	this.stayFilled = false;

	this.noTakeOff = false;



	/**

	 * this function sets the bounding parameters

	 * 

	 * @returns this

	 */

	this.Size = function(width, height) {

		this.width = width;

		this.height = height;



		return this;

	};



	/**

	 * this function unsets/sets the flag that prevents take off from the runway

	 * 

	 * @returns this

	 */

	this.SetTakeOff = function(allowed) {

		this.noTakeOff = !allowed;



		return this;

	};



	/**

	 * this function sets the run way to be of respawning type

	 */

	this.Respawn = function(content) {

		this.doRespawn = this.token;

		this.respawn = this;

		return this;

	};



	/**

	 * this function sets the run way to be of refilling type

	 */

	this.Refilling = function(content) {

		this.stayFilled = true;



		return this;

	};



	/**

	 * this function provides the respawning

	 */

	this.DoRespawn = function() {

		if (this.respawn) {

			this.respawn.DoRespawn();

		}

		this.SetToken(this.doRespawn);

		this.respawn = this;

	};



	/**

	 * this function sets the color parameters

	 * 

	 * @returns this

	 */

	this.Color = function(colorEmpty, colorFilled) {

		this.colorEmpty = colorEmpty;

		this.colorFilled = colorFilled;



		return this;

	};



	/**

	 * write the HTML code that will be used for displaying the run way

	 */

	this.WriteHtml = function() {

		document.write("<span id=\"runway" + this.id + "\" ");



		document.write(" style=\" display: inline-block; ");



		if (this.token) {

			document.write("background-color:" + this.colorFilled + "; ");

		} else {

			document.write("background-color:" + this.colorEmpty + "; ");

		}

		if (this.width) {

			document.write("width:" + this.width + "; ");

		}

		if (this.height) {

			document.write("height:" + this.height + "; ");

		}

		document.write("\"");

		document.write("onClick=\"runwayArray[" + this.id + "].OnClick()\">");

		if (this.token) {

			document.write(this.token);

		}

		document.write("</span>");



	};



	/**

	 * this function sets the objects token

	 */

	this.SetToken = function(token) {



		this.token = token;

		var html_object = document.getElementById("runway" + this.id);

		if (token) {

			html_object.innerHTML = token;

			html_object.style.backgroundColor = this.colorFilled;

		} else {

			html_object.innerHTML = "&nbsp;";

			html_object.style.backgroundColor = this.colorEmpty;

		}



	};



	/**

	 * this function marks the current run way green

	 */

	this.MarkAsGood = function() {

		var html_object = document.getElementById("runway" + this.id);

		html_object.style.backgroundColor = this.colorGood;

		this.markedgood = true;

	};



	/**

	 * this function demarks the current run way

	 */

	this.MarkNeutral = function() {

		var html_object = document.getElementById("runway" + this.id);

		if (this.token) {



			html_object.style.backgroundColor = this.colorFilled;

		} else {



			html_object.style.backgroundColor = this.colorEmpty;

		}

		this.markedgood = false;

	};



	/**

	 * this function is called, when the run way object is clicked

	 */

	this.OnClick = function() {

		/**

		 * Allow landing

		 */

		if (myHover.flight) {



			/**

			 * if this run way stays filled, do not allow landing

			 */

			if (this.stayFilled) {

				return;

			}



			var log_data = "";

			if (myHover.source.name) {

				log_data += myHover.source.name;

			}

			log_data += " -> " + this.name + ": " + myHover.token;



			/**

			 * check for acceptance tags

			 */

			if (this.accept) {

				if (myHover.source.tags) {

					for ( var i = 0; i < this.accept.length; i++) {

						if (myHover.source.tags.indexOf(this.accept[i]) < 0) {

							myLogger.Log(log_data + " rejected");

							return;

						}



					}

				} else {

					myLogger.Log(log_data + " rejected");

					return;

				}

			}



			/**

			 * check for rejection tags

			 */

			if (this.reject) {

				if (myHover.source.tags) {

					for ( var i = 0; i < this.reject.length; i++) {

						if (myHover.source.tags.indexOf(this.reject[i]) >= 0) {

							myLogger.Log(log_data + " rejected");

							return;

						}

					}

				}

			}



			/**

			 * the event handlers will be bubbling or capturing, depends on

			 * browser, so handle it twice, this is the capturing part

			 */

			if (myHover.source.TakeAway) {

				myHover.source.TakeAway();

			}

			/**

			 * and the bubbling part

			 */

			myHover.dontGiveBack = true;



			/**

			 * now update the run way

			 */

			this.SetToken(myHover.token);



			/**

			 * respawn the old contents

			 */



			var respawn = this.respawn;



			this.respawn = myHover.respawn;



			if (respawn) {

				respawn.DoRespawn();

			}



			myLogger.Log(log_data);



			return;

		}

		/**

		 * Allow take off

		 */

		if (this.token) {

			if (true != this.noTakeOff) {

				if (myHover.TakeOff(this.token, this, this.respawn)) {

					var log_data = "";

					if (this.name) {

						log_data += this.name;

					}

					log_data += " take off: " + myHover.token;

					myLogger.Log(log_data);



					if (this.stayFilled != true) {

						this.SetToken(null);

					}

				}

			}

		}



	};



	/**

	 * this function is called, when a token is given back after a take off

	 */

	this.GiveBackToken = function(token) {

		this.SetToken(token);



		var log_data = "";

		if (this.name) {

			log_data += this.name;

		}

		log_data += " token returns: " + token;

		myLogger.Log(log_data);

	};



	/**

	 * this function is called, when a token is taken away after a touch down

	 */

	this.TakeAway = function() {

		if (this.stayFilled) {

			return;

		}

		this.SetToken(null);

		this.respawn = null;

	};



	/**

	 * return the current contents of the run way as string

	 */

	this.GetValue = function() {

		var value = "N";

		if (this.markedgood)

			value = "G";

		

		if (myHover.GetSourceIfFlying()===this) {

			return value + myHover.token;

		}



		if (this.token) {

			return value + this.token;

		}

		return value + "";

	};



	/**

	 * restore the run way state from string

	 */



	this.SetValue = function(contents) {

		if (contents) {

			this.SetToken(contents.substr(1));

			if (contents.charAt(0) == "G")

				this.MarkAsGood();

			else

				this.MarkNeutral();

		} else

			this.SetToken(contents);

	};



	runwayArray[this.id] = this;

	myTags.Add(this, this.tags);



	myStorage.RegisterField(this, "runwayArray[" + this.id + "]");

}