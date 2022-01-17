function setupUI()
{
	console.log("Setup UI "+screen.width+"  "+screen.height);
	$("#contextbar").css("visibility","hidden");
	$("#subnav2").css("z-index", -10000);
	$("#subnav").css("z-index", 10000);
	$("#subnav").css("visibility", "visible");
	$("#subnav2").css("visibility", "hidden");
	$("#editorBox").bind("keyup", onKeyUp);
	$("#urlinput").bind("blur", onURLEntered);
	$("#urlinput").bind("keyup", onURLEntered);
	$("#editorBox").bind("focusout", onFocusOut);
	bindTextInputEvents();
	
}