function Hover() {

	this.flight = false;

	this.token = null;

	this.source = null;

	this.denyTakeOff = false;

	this.respawn = null;

	this.dontGiveBack = false;



	this.isFive = (navigator.appVersion.indexOf("MSIE 4") == -1) ? 1 : 0;



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

				+ token.replace(/\n/g,"<br/>") + '</B></FONT>';

		}



		/**

		 * legacy code

		 */

		this.flight = 2;

		

		if (document.layers) {

			var doc = document.myhoverlplane.document;

			doc.open();

			doc.clear();

			doc.write('<TABLE border=0 cellpadding=3><TR><TD>'

					+ formatted_token + '</TD></TR></TABLE>');

			doc.close();

			document.myhoverlplane.visibility = "show";

			window.captureEvents(Event.MOUSEMOVE);

			window.onmousemove = this.lMovePlane;

			window.captureEvents(Event.MOUSEDOWN);

			window.onmousedown = this.OnFlight;

		} else if (document.all) {

			document.all.myhoverplane1.style.zIndex = 3;

			document.all.myhoverplane2.innerHTML = formatted_token;



			if (source.style) {

				this.sourceColor = source.style.backgroundColor;

				source.style.backgroundColor = "#FFD600";

			}



			document.all.myhoverframe.style.cursor = "crosshair";

		} else // DOM

		{

			var pl = document.getElementById("myhoverplane");

			pl.style.zIndex = 3;

			pl.innerHTML = formatted_token;



			if (source.style) {

				this.sourceColor = source.style.backgroundColor;

				source.style.backgroundColor = "#FFD600";

			}



			document.getElementById("body").style.cursor = "crosshair";

			window.onmousemove = this.lMovePlane;

		}



		return true;

	};



	/**

	 * legacy code

	 */

	this.MovePlane = function() {

		var pl = document.all.myhoverplane1.style;

		if (!document.all) {

			pl.left = window.event.clientX;

			pl.top = window.event.clientY;

		} else if (this.isFive == 1) {

			pl.left = window.event.x + document.body.scrollLeft + 1;

			pl.top = window.event.y + document.body.scrollTop + 1;

		} else {

			pl.left = window.event.x + 1;

			pl.top = window.event.y + 1;

		}

	};



	/**

	 * legacy code

	 */

	this.lMovePlane = function(ev) {



		var pl = document.layers ? document.myhoverlplane : document

				.getElementById("myhoverplane").style;



		pl.left = (ev.pageX + 1) + "px";

		pl.top = (ev.pageY + 1) + "px";

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

		if (document.layers) {

			document.myhoverlplane.visibility = "hide";

			window.onmousemove = 0;

			window.releaseEvents(Event.MOUSEMOVE);

			window.onmousedown = 0;

			window.releaseEvents(Event.MOUSEDOWN);

		} else {

			var pl = document.all ? document.all.myhoverplane1 : document

					.getElementById("myhoverplane");

			pl.style.left = -220 + "px";

			pl.style.top = -220 + "px";

			if (this.source.style)

				this.source.style.backgroundColor = this.sourceColor;

			if (document.all)

				document.all.myhoverframe.style.cursor = "";

			else {

				document.getElementById("body").style.cursor = "";

				window.onmousemove = 0;

			}

		}



	};



	/**

	 * denies further take-offs

	 */

	this.DenyTakeOff = function() {

		this.denyTakeOff = true;

	};



	/**

	 * writes the HTML code that provides the layers used for flights

	 */

	this.WriteHtml = function() {



		document

				.write("<layer name=\"myhoverlplane\" top=\"4\" left=\"4\" "

						+ "visibility=\"hide\" bgcolor=\"#DE6B00\"></layer>"

						+ "<div id=\"myhoverplane\" style=\"position:absolute;"

						+ " top: -220px; left:-220; padding:3px;background-color:#DE6B00;\""

						+ " onmousemove=\"if ( document.all ) myHover.MovePlane()\"></div>"

						+ "<div id=\"myhoverplane1\" style=\"position:absolute; top: -220px;"

						+ " left:-220; padding:0;\" onmousemove=\"if ( document.all ) myHover.MovePlane()\">"

						+ "<table style=\"padding:3px;background-color:#DE6B00;\"><tr>"

						+ "<td id=\"myhoverplane2\">"

						+ "</td></tr></table></div>");

	};



	/**

	 * code for interoperability with ef editor output files

	 */

	this.EfInterOp = function() {

		if (typeof MovePlane == "function") {

			ancientMovePlane = MovePlane;

			MovePlane = function() {

				myHover.MovePlane();

				ancientMovePlane();

			};

		}

		if (typeof OnFlight == "function") {

			ancientOnFlight = OnFlight;

			OnFlight = function() {

				myHover.OnFlight();

				ancientOnFlight();

			};

		}

	};



}