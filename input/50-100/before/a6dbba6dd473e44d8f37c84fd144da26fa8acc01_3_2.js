function(id, name, container_class)

  {

    View.prototype.init.call(this, id, name, container_class);

    this.required_services = ["ecmascript-debugger"];

    this._container = null;

    this._models = [];

    this._search_term = "";

  }