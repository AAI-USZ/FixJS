function getFormatedDate(){
    var today = new Date();
    var month = today.getMonth() + 1;
    if(month < 10) month = "0" + month.toString();
    today = today.getDate()  + '-' + month + '-' + today.getFullYear();
    return today;
}