function(){
    $("#featured-webapps").delegate(
        '.remove', 'click', _pd(function() {
            deleteFromAppsList($("#categories"),
                               $(this).data("id"));
                              }));
    var categories = $("#categories");
    var appslist = $("#featured-webapps");
    var p = $.ajax({type: 'GET',
                    url: categories.data("src")});
    p.then(function(data) {
        categories.html(data);
        showAppsList(categories);
    });
    categories.change(function (e) {
        showAppsList(categories);
    });
    $('#featured-add').click(_pd(function() { newAddonSlot(); }));
}