function(ctx)
  {
    var ex_ctx = window.runtimes.get_execution_context();
    var rt_id = ex_ctx.rt_id;
    var thread_id = ex_ctx.thread_id;
    var frame_index = ex_ctx.frame_index;
    if (ctx.rt_id != rt_id)
    {
      rt_id = ctx.rt_id;
      thread_id = 0;
      frame_index = 0;
    }
    var tag = tagManager.set_callback(this, this._handle_object, [ctx]);
    var msg = [rt_id, thread_id, frame_index, ctx.type.script, [["object", ctx.obj_id]]];
    services["ecmascript-debugger"].requestEval(tag, msg);
  }