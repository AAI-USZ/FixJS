function Hover() {

	this.flight = false;

	this.token = null;

	this.source = null;

	this.denyTakeOff = false;

	this.respawn = null;

	this.dontGiveBack = false;



	this.hover = null;



	/**

	 * @returns true, if token has been taken off

	 */

	this.TakeOff = function(token, source, respawn, planeHtml) {

		if (this.denyTakeOff == true) {

			return false;

		}

		this.token = token;

		this.respawn = respawn;

		this.source = source;

		this.dontGiveBack = false;



		var formatted_token = "";



		if (planeHtml) {

			formatted_token = planeHtml;

		} else {

			formatted_token = '<FONT face="Arial" size="3" color="#FFD6AA"><B>'

					+ token.replace(/\n/g, "<br/>") + '</B></FONT>';

		}



		/**

		 * legacy code

		 */

		this.flight = 2;



		/*{

			var pl = document.getElementById("myhoverplane");

			pl.style.zIndex = 100;

			pl.innerHTML = formatted_token;

		}*/

		

		this.hover = new HoverContainer(mouseX+1, mouseY+1, formatted_token);

		this.hover.AddChild();

				

		document.getElementById("body").style.cursor = "crosshair";

		addMouseMoveHook(this.lMovePlane);

		

		



		return true;

	};



	this.lMovePlane = function() {

		var pl = myHover.hover.GetElement().style;



		pl.left = (mouseX + 1) + "px";

		pl.top = (mouseY + 1) + "px";

	};



	/**

	 * legacy code

	 */



	this.OnFlight = function() {

		if (this.flight == 2)

			this.flight = 1;

		else if (this.flight == 1)

			this.CrashDown();

	};



	/**

	 * function that handles CrashDown by clicking somewhere

	 */

	this.CrashDown = function() {

		if (this.flight > 0) {

			this.LegacyCrashDown();

		}



		if (this.dontGiveBack == false) {

			if (this.source) {

				if (this.source.GiveBackToken) {

					this.source.GiveBackToken(this.token);

				}

			}

		}



	};



	/**

	 * legacy code

	 */

	this.LegacyCrashDown = function() {

		this.flight = 0;



		

		document.getElementById("body").style.cursor = "";

		delMouseMoveHook(this.lMovePlane);

		

		this.hover.Remove();



	};



	/**

	 * denies further take-offs

	 */

	this.DenyTakeOff = function() {

		this.denyTakeOff = true;

	};



	/**

	 * returns the source of the token, if there is a token hovering around.

	 * Otherwise, returns null

	 */

	this.GetSourceIfFlying = function() {

		if (this.flight > 0) {

			return this.source;

		}

		return null;

	};



	/**

	 * writes the HTML code that provides the layers used for flights

	 */

	this.WriteHtml = function() {



		document

				.write("<div id=\"myhoverplane\" style=\"position:absolute; z-index: 100;"

						+ " top: -220px; left:-220; padding:3px;background-color:#DE6B00;\""

						+ " onmousemove=\"if ( document.all ) myHover.MovePlane()\"></div>");



	};



}