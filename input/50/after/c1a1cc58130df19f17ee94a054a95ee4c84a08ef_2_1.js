function updateConfig(request,response){
    config_response = response

    //Set wss checkbox to correct value
    if (config_response['user_config']["wss"] == "yes"){
        $('table#config_table input#wss_checkbox').attr('checked','checked');
    };
}