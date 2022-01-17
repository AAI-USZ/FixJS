function(msg)
  {
    var data = new cls.DocumentManager["1.0"].AboutToLoadDocument(msg);

    if (!this._current_context)
      this._current_context = new cls.RequestContext();

    if (!data.parentDocumentID)
    {
      // This basically means "unload" for that windowID, potentially
      // existing data for that windowID needs to be cleared now.
      this._current_context.remove_window_context(data.windowID);
    }

    var window_context = this._current_context.get_window_context(data.windowID);
    if (!window_context)
    {
      var window_context = new cls.NetworkLoggerService.WindowContext(data.windowID);
      this._current_context.window_contexts.push(window_context);
      if (!data.parentDocumentID)
      {
        window_context.saw_main_document_abouttoloaddocument = true;
      }
    }
  }