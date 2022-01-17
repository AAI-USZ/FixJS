function xp_ext_onload() {
    xp_ext_resize();
    $("#loader").hide();
    lists_visible(true);

	$('#xp_ext_select_filter').click(function(){
        xp_ext_select_filter();
    });

	$('#xp_ext_select_location').click(function(){
        xp_ext_select_location();
    });

	$('#xp_ext_select_timeformat').click(function(){
        xp_ext_select_timeformat();
    });

	$('#xp_ext_export_pdf').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','PDF',0,0,600,570);
    });

	$('#xp_ext_export_xls').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','XLS',0,0,600,570);
    });
	$('#xp_ext_export_csv').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','CSV',0,0,600,570);
    });

	$('#xp_ext_print').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','print',0,0,600,570);
    });

	$('.helpfloater').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','help_timeformat',0,0,600,570);
    });

	xp_ext_select_filter();
    xp_ext_reload();
}