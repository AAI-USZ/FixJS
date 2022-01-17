function(el, leaveRefresh){

			if(!leaveRefresh) this.refresh = true;

            if (this.refresh && this.refresh == true) {

	                this.coreAddPullToRefresh(el);

					this.el.style.overflow='visible';

            }

		}