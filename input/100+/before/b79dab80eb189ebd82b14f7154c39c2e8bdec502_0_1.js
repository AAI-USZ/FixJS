function(){
// Init sort tables
$(".tablesorter").tablesorter({sortList: [[0, 0]]});

$('.date-pick').datetimepicker({
    dateFormat: 'yy-mm-dd',
    minDate: getFormattedDate(new Date())
});

function getFormattedDate(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().slice(2);
    return day + '-' + month + '-' + year;
}

}