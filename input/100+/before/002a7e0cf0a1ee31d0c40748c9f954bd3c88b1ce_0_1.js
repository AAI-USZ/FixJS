function restore_from_export(){
    reset_and_close_restore_dialog();
    $('#exp h2').html('Paste Exported Code below');
    $('#exp small').html('Paste Exported Code below');
    $('#exp').bPopup();

    $('#exp .done').click(function(){
    $('#exp .done').unbind('click');
    var script = $('#exp textarea').val();
    console.log(script);
    $('#exp').bPopup().close();
    clear_scripts();

    var ps = JSON.parse(script);
    console.log(ps.scripts);

    load_scripts_from_object(ps.scripts);   
    }); 
}