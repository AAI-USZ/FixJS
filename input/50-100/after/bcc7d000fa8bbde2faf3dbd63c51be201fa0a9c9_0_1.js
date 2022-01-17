function fetchData(){

    $('#lastUpdateDT').html("Updating...");
    $.when(callYQLAsync(), callGoogleCalAsync(), callTwitterAsync())
//        .then (function(){
//            var currentDate = new Date();
//            $('#lastUpdateDT').html(getFormattedDate(currentDate)+" @ "+getFormattedTime(currentDate));
//        })
        .fail (function(){
            alert('One or more network requests failed.  '+TRY_AGAIN_MSG );
        })
        .always(function(){
            $.mobile.hidePageLoadingMsg();
            var currentDate = new Date();
            $('#lastUpdateDT').html(getFormattedDate(currentDate)+" @ "+getFormattedTime(currentDate));
        });
}