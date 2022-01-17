function add_new_developer() {
    var newDevName = $('#add_new_dev_modal .developer_name').find('input[type="text"]')[0].value;
    var devNames = read_cookie(dev_names_cookie_names);
    var newDevNamesList = "";

    $(devNames).each(function(index, value) {
        newDevNamesList += value + ",";
    });

    newDevNamesList += newDevName;
    update_dev_names_cookie(newDevNamesList);

    location.reload();

}