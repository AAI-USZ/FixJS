function() {
				this.firstName = hb.observable("tim");
				this.lastName =  hb.observable("schaffer");
				this.fullName =  hb.computed(function() {
					return this.firstName + ' ' + lastName;
				}, this);
			}