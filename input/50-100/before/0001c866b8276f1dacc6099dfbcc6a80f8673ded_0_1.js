function () {

  var validators = hd.validators;

  hd.binders["number"] = function bindNumber(view, options) {
    if (typeof options !== "object")
      options = {value: options};

    if (!options.toModel)
      options.toModel = validators.toNum();
    if (!options.toView)
      options.toView = validators.toString();

    hd.binders["textbox"](view, options);
  }

}