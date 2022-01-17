function(){
			// Markup for days of the week (referenced from template)
			var d = this.dowTemplateString,
				dayNames = this.dateLocaleModule.getNames('days', this.dayWidth, 'standAlone', this.lang),
				dayOffset = cldrSupplemental.getFirstDayOfWeek(this.lang);
			this.dayCellsHtml = string.substitute([d,d,d,d,d,d,d].join(""), {d: ""}, function(){
				return dayNames[dayOffset++ % 7]
			});

			// Markup for dates of the month (referenced from template), but without numbers filled in
			var r = string.substitute(this.weekTemplateString, {d: this.dateTemplateString});
			this.dateRowsHtml = [r,r,r,r,r,r].join("");

			// Instantiate from template.
			// dateCells and dateLabels arrays filled when _Templated parses my template.
			this.dateCells = [];
			this.dateLabels = [];
			this.inherited(arguments);

			dom.setSelectable(this.domNode, false);

			var dateObj = new this.dateClassObj(this.currentFocus);

			this._supportingWidgets.push(this.monthWidget = this._createMonthWidget());

			this.set('currentFocus', dateObj, false);	// draw the grid to the month specified by currentFocus
		}