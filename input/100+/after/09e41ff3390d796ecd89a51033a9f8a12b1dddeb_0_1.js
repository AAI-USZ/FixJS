function low_level_error(msg) {
    log(msg);
    $("#page_content").html("<"+"h2>" + msg + "<"+"/h2>");
    alert(msg);
    return false;
}