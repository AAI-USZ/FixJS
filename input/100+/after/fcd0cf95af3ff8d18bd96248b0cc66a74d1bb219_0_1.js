function(){
    $("#featured-webapps").delegate(
        '.remove', 'click', _pd(function() {
            deleteFromAppsList($("#categories"),
                               $(this).data("id"));
                              }));
    $("#featured-webapps").delegate(
      "select.localepicker", "change", _pd(function (e) {
            var region = $(e.target);
            $.ajax({type: 'POST',
                   url: region.data("url"),
                   data: {"region": region.val(),
                          "app": region.data("id")}});
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