function Reward_rewardOverview() {
    var today = new Date();
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    date = $.datepicker.formatDate("dd M yy",date);

    $("#date").val(date);
    $( "#date").datepicker({
        minDate: -180,
        maxDate: 5,
        dateFormat: "dd M yy"
    });

    Reward_rewardOverview_showUsage();
}