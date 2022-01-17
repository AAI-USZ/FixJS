function(token, source, respawn) {

		if (this.denyTakeOff == true) {

			return false;

		}

		this.token = token;

		this.respawn = respawn;

		this.source = source;

		this.dontGiveBack = false;



		/**

		 * legacy code

		 */

		this.flight = 2;

		var formatted_token = '<FONT face="Arial" size="3" color="#FFD6AA"><B>'

				+ token + '</B></FONT>';

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

	}