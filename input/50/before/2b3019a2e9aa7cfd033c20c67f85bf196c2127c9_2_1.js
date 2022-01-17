function updateConfig(request,response){
    var config = response['user_config'];

    //Set wss checkbox to correct value
    if (config["wss"] == "yes"){
        $('table#config_table input#wss_checkbox').attr('checked','checked');
    };
}