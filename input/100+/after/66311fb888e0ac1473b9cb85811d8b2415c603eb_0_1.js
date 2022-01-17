function (event) {
    var target = event.target,
        isEditable = target.contentEditable,
     data = {};

    if (target.className == "editPayPeriod") {
        data.value = $(target).html();
        data.name = target.getAttribute('data-type');
        data.id = target.getAttribute('data-id');

        $.ajax({
            url: window.location.toString(),
            data: data,
            type: 'post'
        });
    }
}