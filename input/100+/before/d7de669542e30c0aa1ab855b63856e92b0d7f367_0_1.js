function (date) {

			// Total amount of days into month
			var cells = (function () {

				// Amount of days of current month
				var currentMonth = new Date(date.year, date.month, 0).getDate(),

				// Amount of days of previous month
					prevMonth = new Date([date.year, date.month, "01"].join("/")).getDay(),

				// Merge amount of previous and current month
					subtotal = prevMonth + currentMonth,

				// Amount of days into last week of month
					latest = subtotal % 7,

				// Amount of days of next month
					nextMonth = (latest > 0) ? 7 - latest : 0;

				return {
					"previous": prevMonth,
					"subtotal": subtotal,
					"total": subtotal + nextMonth
				};

			}()),

			// Final array with month table structure
				r = [
					"<table class=\"ch-calendar-month\" role=\"grid\" id=\"ch-calendar-grid-" + that.uid + "\">",
					"<caption>" + MONTHS_NAMES[date.month - 1] + " - " + date.year + "</caption>",
					thead,
					"<tbody>",
					"<tr class=\"ch-week\" role=\"row\">"
				];

			// Iteration of weekdays
			for (var i = 0; i < cells.total; i += 1) {

				// Push an empty cell on previous and next month
				if (i < cells.previous || i > cells.subtotal - 1) {
					r.push("<td role=\"gridcell\" class=\"ch-calendar-other\">X</td>");
					continue;
				}

				// Positive number of iteration
				var positive = i + 1,

				// Day number
					day = positive - cells.previous,

				// Define if it's the day selected
					isSelected = isSelectable(date.year, date.month, day);

				// Create cell
				r.push(
					// Open cell structure including WAI-ARIA and classnames space opening
					"<td role=\"gridcell\"" + (isSelected ? " aria-selected=\"true\"" : "") + " class=\"ch-calendar-day",

					// Add Today classname if it's necesary
					(date.year === today.year && date.month === today.month && day === today.day) ? " ch-calendar-today" : null,

					// Add Selected classname if it's necesary
					(isSelected ? " ch-calendar-selected" : null),

					// From/to range. Disabling cells
					(
						// Disable cell if it's out of FROM range
						(from && day < from.day && date.month === from.month && date.year === from.year) ||

						// Disable cell if it's out of TO range
						(to && day > to.day && date.month === to.month && date.year === to.year)

					) ? " ch-calendar-disabled" : null,

					// Close classnames attribute and print content closing cell structure
					"\">" + day + "</td>"
				);

				// Cut week if there are seven days
				if (positive % 7 === 0) {
					r.push("</tr><tr class=\"ch-calendar-week\" role=\"row\">");
				}

			};

			// Return table object
			return r.join("");

		}