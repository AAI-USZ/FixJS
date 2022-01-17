function(retry, maxTries){

			//this.log("testAndFixUI");

			//for ios or if the heights are incompatible (and not close)

			var refH = this.getReferenceHeight();

			var curH = this.getCurrentHeight();

			if((refH!=curH && !(curH*addressBarError<refH && refH*addressBarError<curH)) ){

				//panic! page is out of place!

				this.hideAddressBar(retry, maxTries);

				return true;

			}

			if (jq.os.android) this.resetFixUI();

			return false;

		}