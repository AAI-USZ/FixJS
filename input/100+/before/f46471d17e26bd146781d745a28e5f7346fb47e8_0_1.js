function() { // this makes sure that the manually entered time is within the allowable range (if we are enforcing that)
			var opts = this.options, self = this, elem = this.element,
				newTime,startTime,endTime;
			if(elem.val()){ //only fix if there is something to fix
				newTime = this.timeStringToDate(elem.val());
				if(newTime && (newTime < opts.startTime || newTime > opts.endTime) && opts.enforceRange){
					// it's outside of the range, so do something about it
					startTime = this.formatTime(opts.startTime);
					endTime = this.formatTime(opts.endTime);
					if(opts.onOutOfRange){ opts.onOutOfRange(elem.val(),startTime,endTime,opts);}
					setTimeout(function(){self.element.val("").focus();},50);
				} else {
					// in normal range, so go about your business
					self.element.val(this.formatTime(newTime));
				}
			}
		}