function() {

jQuery(function ($) {
		$('#basic-modal .modal').click(function (e) {
			$('#basic-modal-content').modal();
			return false;
		});
    });
	$("#menu-hide").click(function() {
		$('#sidemenu').hide("slow", function(){
			$('#content').css("margin-left", 0);
			$('#menu-show').css("display", "block");
		});		
	});

	$("#menu-show").click(function() {
		$('#content').css("margin-left", 300);
		$('#sidemenu').show("slow");
		$('#menu-show').css("display", "none");
    
});

$(".loader a").click(function() {
  $('#loading').show();
});


//$('#notice').click(function(){
//$('#notice').slideToggle('slow');
//})

if ($('#notice').text()==''){
$('#notice').hide();
}

if ($('#alert').text()==''){
$('#alert').hide();
}


if ($.trim($('#menu-head').text())==''){
$('#sidemenu').hide();
$('#content').css("margin-left", 0);
$('#menu-show').hide();
$('#content').removeClass('side_visible');
}
//document ready
}