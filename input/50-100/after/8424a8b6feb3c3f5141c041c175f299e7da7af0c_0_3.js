function show_operations(event){
    var start = $("input[name='start_date']").val();
    var end = $("input[name='end_date']").val();
    var url = "/ybz/operations";
    if (start != null && end != null) {
        if (start.length != 8 || end.length != 8) {
            alert("日付入力は8桁 yyyymmdd で入力してください");
            return false;
        }
        url = url + '/' + start + '/' + end;
    }
    window.location.href = url;
    return false;
}