function () {
    var developerNames = $('#modal .developer_names_form').find('input[type="text"]');

    var developerNamesList = [];

    $(developerNames).each(function () {
        var developerName = this.value.trim();
        if (!(developerName == "")) {
            developerNamesList.push(developerName);
        }
    })

    if (developerNamesList.length > 0) {
        create_cookies_initial_data_and_write_to_cookies(developerNamesList);
        hide_modal();
        window.location.reload()
    }
}