function(inst) {
			//call the original function
			this._updateDatepicker_MonthYearPicker(inst);
			
			//TODO: multiMonth
			var numMonths = this._getNumberOfMonths(inst);
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var changeMonth = this._get(inst, 'changeMonth');
			var changeYear = this._get(inst, 'changeYear');
			if(isMultiMonth || changeMonth || changeYear) {
				return ;
			}
			
			//inst.dpuuid
			this._retrieveDPUID_MonthYearPicker(inst);
			var dpuuid = inst.dpuuid;
			//console.log($('<div>').append(this.dpDiv.clone()).html());
			
			var uidptitle = inst.dpDiv.find('.ui-datepicker-title');
			uidptitle.wrapInner('<a href="#" onclick="DP_jQuery_' + dpuuid + 
				'.datepicker._toggleDisplay_MonthYearPicker(\'#' + inst.id + '\', 2);return false;" />');

			inst.dpDiv.children('table.ui-datepicker-calendar').after(this._generateExtraHTML_MonthYearPicker(inst));
		}