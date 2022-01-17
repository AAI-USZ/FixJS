function(container)
  {
    container.clearAndRender(templates.network_options_main(this._bypass_cache,
                                                            this._track_bodies,
                                                            this._headers,
                                                            this._overrides));
    this._output = container.querySelector("code");
    this._headerele = container.querySelector(".header-override-input");

  }