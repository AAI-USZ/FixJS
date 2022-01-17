function readCheckbox(view) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    var name = view.attr("name");
    if (name) {
      view = $("input[name=" + name + "]", view.closest("form, body"));
    } 
    if (view.length == 1) {
      return { value: view.prop("checked") };
    }
    var values = view.filter(":checked")
                      .map(function () { return $(this).val(); })
                      .get();
    return { value: values };;
  }