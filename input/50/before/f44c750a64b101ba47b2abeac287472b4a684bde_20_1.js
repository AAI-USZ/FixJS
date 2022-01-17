function(active_rt_ids)

  {

    if (this.script_id)

    {

      var rt_id = window.runtimes.getScriptsRuntimeId(this.script_id);

      this._is_active = active_rt_ids.indexOf(rt_id) != -1;

    }

  }