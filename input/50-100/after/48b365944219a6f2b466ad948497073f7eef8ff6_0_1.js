function (data) {
    data.forEach(function (d) {
        $('#regionSelect').append(new Option(d.name, d.name, false, false));
    });
    $('.chzn-select').chosen();
}