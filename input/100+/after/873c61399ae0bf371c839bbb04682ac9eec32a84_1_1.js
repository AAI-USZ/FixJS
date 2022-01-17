function getJsonResult(id) {
    $.ajax({
        url: "Home/GetFileById",
        data: { "fileId": id }
    }).done(function (xhr) {
        InitTreeMap(xhr);

        var hiddenField = document.getElementById('hiddenField');
      
        //getPunctuationLiterals(id);
    });
}