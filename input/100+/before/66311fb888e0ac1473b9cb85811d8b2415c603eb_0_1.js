function (event) {
    var target = event.target,
        isEditable = target.contentEditable,
     data = {};


    if (isEditable || e.keyCode == 13) {
        data.value = $(target).html();
        data.name = target.getAttribute('data-type');
        data.id = target.getAttribute('data-id');

        alert(JSON.stringify(data));
        
        $.ajax({
            url: window.location.toString(),
            data: data,
            type: 'post'
        });
    }
}