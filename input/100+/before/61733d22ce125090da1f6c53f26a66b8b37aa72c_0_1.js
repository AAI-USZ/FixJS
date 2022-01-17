function(msg, url, num) {
		var newReport = cloneObject(report);
		newReport.OccurrenceTimeUtc = (msg.timeStamp) ? msg.timeStamp : + new Date();
		newReport.ExceptionMessage = (msg.message) ? msg.message : "";

		// common
		newReport.UserAgent = navigator.userAgent;
		newReport.Cookies = document.cookie;
		newReport.RelativeUrl = document.location.pathname;
		newReport.ReferrerUrl = document.referrer;

		console.log(newReport);
		tempTestingFunction(newReport);
	}