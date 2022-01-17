function() {

			var opts = this.options,

				elem = this.element;

		

			if(opts.autoUpdate){

				$(window).bind("resize.fillHeight",function(){

					setTimeout(function(){

						elem.fillHeight("setHeight");

					},10);	

				});

			}

			this.setHeight();

		}