function(timeString, withDate) {
		if (!this.inst) 
			this.inst = $.datepicker._getInst(this.$input[0]);
        
        if (withDate || !this._defaults.timeOnly) 
        {
			var dp_dateFormat = $.datepicker._get(this.inst, 'dateFormat');
            try {
                var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
                if (!parseRes.timeObj) return false;
                $.extend(this, parseRes.timeObj);
            } catch (err)
            {
                return false;
            }
            return true;
        }
        else
        {
            var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
            if(!timeObj) return false;
            $.extend(this, timeObj);
            return true;
        }
	}