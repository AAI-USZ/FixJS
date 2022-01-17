function doInstall() {
	$("#prevPageButton, #nextPageButton").slideUp(250);
	$("#progress").slideUp(250);
	$("#page4").html('<div class="center" style="padding-top: 100px; font-style: italic;"><div class="pollbarContainer" style="width: 50%; margin: 12pt auto;">Installing. Please wait.</div></div>');
	$.post("install/doinstall.php", {
		action: "Install",
		dbserv: $('#sqlServerAddress').val(),
		dbuser: $('#sqlUserName').val(),
		dbpass: $('#sqlPassword').val(),
		dbname: $('#sqlDbName').val(),
		dbpref: $('#sqlTablePrefix').val(),
		boardname: $("#boardName").val(),
		logoalt: $("boardLogoAlt").val(),
		logotitle: $("boardLogoTitle").val(),
		defaultgroups: $("setUpDefaultUserGroups").val(),
		addbase: $("createDefaultForums").val(),
		htmltidy: $("useHTMLTidy").val()
	}, function(data) {
		$("#page4").html(data);
	});
}