function(){

	$(".main-left-col").height($(document).height()).css("background", "#333232");

	eva.multiform();
	eva.highlightmenu();
	eva.ui.init();

	$('.dropdown-toggle').dropdown();

	return false;
}