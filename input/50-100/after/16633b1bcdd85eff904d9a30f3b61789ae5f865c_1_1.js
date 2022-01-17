function () {
    var developerNames = $('#modal .developer_names_form').find('input[type="text"]');

    var developerNamesList = new Array();

    $(developerNames).each(function () {
        var developerName = this.value.trim();
        if (!(developerName == "")) {
            developerNamesList.push(developerName);
        }
    })

    if (developerNamesList.length > 0) {
        update_dev_names_cookie(developerNamesList);
        hide_modal();
        location.reload()
    }
}