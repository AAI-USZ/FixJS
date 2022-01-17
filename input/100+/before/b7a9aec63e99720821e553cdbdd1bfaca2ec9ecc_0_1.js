function () {

		var previousReportsCount = ActiveProfile.Reports.length || 0;

		var currentReportsCount = parseInt($(".reports .bubble-content").text()) || 0;

		var reportsDelta = currentReportsCount - previousReportsCount;



		



		Helpers.DLog("Services: CrawlReports found [" + reportsDelta + "] new reports");

	}