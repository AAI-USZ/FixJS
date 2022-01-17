function(container)
  {
    container.clearAndRender(templates.network_request_crafter_main(this._prev_url,
                                                                    this._is_listening,
                                                                    this._prev_request,
                                                                    this._prev_response));
    this._urlfield = new cls.BufferManager(container.querySelector("input"));
    this._input = new cls.BufferManager(container.querySelector("textarea"));
    this._output = container.querySelector("code");
  }