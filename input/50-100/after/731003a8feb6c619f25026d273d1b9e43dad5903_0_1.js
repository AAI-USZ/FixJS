function validateAccessToken() {
	var codeObj = document.getElementById('dashboardForm:code');

	var accessTokenObj = document.getElementById('dashboardForm:accessToken');

	if (codeObj == null || accessTokenObj == null || codeObj.value == ""
			|| accessTokenObj.value == "") {
		// alert('codeObj.value:'+codeObj.value);
		// alert('accessTokenObj.value:'+accessTokenObj.value);
		alert("Invalid Access to Facebook Reader.\n\nPlease login with your Facebook Credentials.");
		window.location.href = HOST_PREFIX + docBase + "/home.jsf";
	}

}