function show_hosts_diff(event){
    var oidlist = $("input[name='oidlist']").val();
    var before = $("input[type='radio']").filter("input[name='before']").filter(":checked").val();
    var after = $("input[type='radio']").filter("input[name='after']").filter(":checked").val();
    if (after == undefined && before == undefined) {
        show_error_dialog("開始点および終了点を選択してください");
        return false;
    }

    if (after == undefined || Number(after) < Number(before)) {
        var tmp = after;
        after = before;
        before = tmp;
    }
    var url = '/ybz/host/diff/' + oidlist + '/' + after;
    if (before != undefined) {
        url = url + '/' + before;
    }
    window.location.href =  url;
    return false;
}