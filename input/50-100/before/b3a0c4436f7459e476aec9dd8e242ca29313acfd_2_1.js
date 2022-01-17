function(p){
					var dp = (p||parent);
					if(dp != d_el.parentNode){
						this.hide();
						dp.appendChild(d_el);
					}
					displayed = true;
				}