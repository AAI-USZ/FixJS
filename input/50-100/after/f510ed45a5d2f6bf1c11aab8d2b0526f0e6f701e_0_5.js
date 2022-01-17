function(){

			//set top/left

			var size = this.getViewportSize();

			//console.log('adjust '+this.loggedPcentY+':'+(this.el.clientHeight-size.h));

			this.scrollerMoveCSS({

				x:Math.round(this.loggedPcentX*(this.el.clientWidth-size.w)),

				y:Math.round(this.loggedPcentY*(this.el.clientHeight-size.h))

			}, 0);

		}