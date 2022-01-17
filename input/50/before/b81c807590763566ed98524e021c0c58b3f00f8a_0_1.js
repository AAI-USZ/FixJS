function(e){

			//this.log("onResize");

			if( $.trigger(this, "resize", [e]) && !jq.os.ios ){

				window.setTimeout(this.hideAddressBarProxy_, 250);

			}

		}