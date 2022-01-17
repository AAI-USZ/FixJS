function(e) {
		console.log(e);
		console.log("e.stack: ",e.stack);
		console.log("e.message: ",e.message);
		var newReport = cloneObject(report);
		newReport.OccurrenceTimeUtc = + new Date();
		newReport.ExceptionType = e.type;
		newReport.ExceptionMessage = e.message;
		newReport.StackTrace = (e.stack) ? e.stack : "";

		// common
		newReport.UserAgent = navigator.userAgent;
		newReport.Cookies = document.cookie;
		newReport.RelativeUrl = document.location.pathname;
		newReport.ReferrerUrl = document.referrer;

		console.log(newReport);
		tempTestingFunction(newReport);
	}