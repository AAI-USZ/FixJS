function Feedback() {

	/**************************************************************************

	 *

	 * Registers Feedback plugin

	 *

	 *************************************************************************/

	this.Register = function () {

		Helpers.Log("Feedback: Registering Feedback plugin...");



		// Insert feedback image

		Helpers.DLog("Feedback: Injecting link image...");

		$("#logo").after("<div style='margin:24px 31px 0 0;width:44px;height:33px;float:left;'><img id='PAFeedback' src='" + Helpers.GetExtensionRootURL("Plugins/Support/Feedback/Image.png") + "' width='43px' height='43px' style='-webkit-filter:grayscale(1);' /></div>");



		// Remove spacer

		// TODO check if this  spacer means anything cause it has its own id maybe only for styling

		$("#myGameLinkHeaderWrapper").remove();



		// On mouse over/leave grayscale effect

		$("#PAFeedback").mouseenter(function () { $("#PAFeedback").attr("style", ""); }).mouseleave(function () { $("#PAFeedback").attr("style", "-webkit-filter:grayscale(1);"); });



		// Show popup on feedback image click

		$("#PAFeedback").click(function () {

			$.get(Helpers.GetExtensionRootURL("Plugins/Support/Feedback/FeedbackForm.html"), function (response) {

				(new App()).ShowModalView(response);

			});

		});

	};

}