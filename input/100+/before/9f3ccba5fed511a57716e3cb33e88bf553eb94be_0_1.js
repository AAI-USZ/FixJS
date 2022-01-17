function initStatusColors() {		
		
		var colorRed = "#fcbdbd";
		var colorGreen = "#d2f5b0";
		var colorBlue = "#c2dfff";
		var colorYellow = "#fff494";
		var colorGrey = "#cccccc";
		var colorRedBright = "#ff4550";
		var colorBlack = "#000000";
	
		statusColorSettings = {
			statusColors: [
				{ name: "Open",        color: colorRed,   colorText: colorBlack },
				{ name: "In Progress", color: colorBlue,  colorText: colorBlack },			
				{ name: "Resolved",    color: colorGreen, colorText: colorBlack },
				{ name: "Closed",      color: colorGrey,  colorText: colorBlack },
				{ name: "Reopened",    color: colorRed,   colorText: colorBlack }
			],
			assigneeColors: [
				{name: "Unassigned",   color: colorRedBright, colorText: colorBlack}
			],
			colorByAssignee: false
		};
	}