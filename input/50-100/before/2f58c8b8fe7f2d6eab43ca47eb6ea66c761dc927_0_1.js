function deleteItem(id){
    if (confirm("Wollen sie diesen Beitrag wirklich löschen?")){
        $.ajax({
            type: "POST",
            url: rating_url2,
            data: "delete=0&id=" + id,
            success: function(html){
                if (html != ""){
                    $("#" + html).remove();
                }
            }
        });
    }
}