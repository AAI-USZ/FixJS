function(e) {
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

		messageQueue.push(newReport);

		tempTestingFunction(newReport);

	}