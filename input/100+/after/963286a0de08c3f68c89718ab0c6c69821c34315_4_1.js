function export_extension_onload() {
    export_extension_resize();
    $("#loader").hide();
    lists_visible(true);

	$('#export_extension_select_filter').click(function(){
        export_extension_select_filter();
    });

	$('#export_extension_select_location').click(function(){
        export_extension_select_location();
    });

	$('#export_extension_select_timeformat').click(function(){
        export_extension_select_timeformat();
    });

	$('#export_extension_export_pdf').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','PDF',0,0,600,570);
    });

	$('#export_extension_export_xls').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','XLS',0,0,600,570);
    });
	$('#export_extension_export_csv').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','CSV',0,0,600,570);
    });

	$('#export_extension_print').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','print',0,0,600,570);
    });

	$('.helpfloater').click(function(){
        this.blur();
        floaterShow('../extensions/ki_export/floaters.php','help_timeformat',0,0,600,570);
    });

	export_extension_select_filter();
    export_extension_reload();
}