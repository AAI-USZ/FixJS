function(id)
  {

    if (!(id in __runtimes))
    {
      opera.postError(ui_strings.S_DRAGONFLY_INFO_MESSAGE +
                      'runtime id does not exist');
      __runtimes[id] = null;
      var tag = tagManager.set_callback(this, this.handleListRuntimes);
      services['ecmascript-debugger'].requestListRuntimes(tag, [id]);
    }
  }