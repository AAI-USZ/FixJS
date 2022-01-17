function(msg)

  {

    if (msg.id == "return-values")

    {

      this._text_search.setContainer(msg.container);

      this._text_search.setFormInput(window.views[this.id].getToolbarControl(msg.container,

                                                                             "return-values-text-search"));

    }

  }