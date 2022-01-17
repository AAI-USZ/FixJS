function() {
    var radios  = "input[type='radio']",
        checks  = "input[type='checkbox']",
        others  = "input[type!='radio'][type!='checkbox'],select,textarea",
        i;

    for (i in dAttrs)
      linkedAttrs(dAttrs[i]);

    function radioClick(elem, event) {
      var jself = $(elem),
          nm = jself.attr("data-name") || jself.attr("name");
      $("[data-name='"+$.sq(nm)+"']").not(jself).removeAttr("data-checked");
      jself.attr("data-checked", true);
      $UI.run(0);
    }

    function checkboxClick(elem, event) {
      var jself = $(elem);
      jself.attr("data-checked", !! jself.is(":checked"));
      $UI.run(0);
    }

    function othersChange(elem, event) {
      var jself = $(elem);
      jself.attr("data-value", jself.val());
      $UI.run(0);
    }

    $(document)
      .on("click", function(event) {
        if ($(event.target).is(radios))
          radioClick(event.target, event);
        else if ($(event.target).is(checks))
          checkboxClick(event.target, event);
      })
      .on("change", function(event) {
        if ($(event.target).is(others))
          othersChange(event.target, event);
      });
  }