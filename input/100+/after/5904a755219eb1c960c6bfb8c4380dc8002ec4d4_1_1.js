function readerHandler(data, projectCode, testType, pageUrl) {

	
	// from auto close

	if($.trim(data) == 'Test is not available for this project') {

		data = '<b>Test is not available for this project</b>';

		showSuccessComplete = false;

	}
	if($.trim(data) == '[INFO] ... tomcatProcess stopped. ReturnValue:1') { // When CI server starts it wont give EOF, forced it.

		data = 'EOF';

	}



   if ($.trim(data) == 'EOF') {

	   $("#warningmsg").hide();

	   $('#loadingDiv').hide();

	   $('#buildbtn').prop("disabled", false);

	   

	   // from auto close

//	   if(showSuccessComplete) {

//		   $("#build-output").append("Successfully Completed" + '<br>');

//	   }

	   $('#build-output').prop('scrollTop', $('#build-output').prop('scrollHeight'));

	   

	   if(testType == "build") {

		   refreshTable(projectCode);

	   }

	   return;

   }

   $("#build-output").append(data + '<br>');

   $('#build-output').prop('scrollTop', $('#build-output').prop('scrollHeight'));

   asyncHandler(projectCode, testType, pageUrl);

}