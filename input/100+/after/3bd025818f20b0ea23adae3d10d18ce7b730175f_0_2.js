function(script, line_number, char_offset,

                                       box, shift_key)

  {

    var sel = _get_identifier(script, line_number, char_offset, shift_key);

    if (sel && sel.bracket_balance == 0)

    {

      var start = script.line_arr[sel.start_line - 1] + sel.start_offset;

      var end = script.line_arr[sel.end_line - 1] + sel.end_offset;

      var script_text = script.script_data.slice(start, end + 1);



      if (script_text != _last_script_text)

      {

        _last_script_text = script_text;

        var ex_ctx = window.runtimes.get_execution_context();

        var rt_id = ex_ctx.rt_id;

        var thread_id = ex_ctx.thread_id;

        var frame_index = ex_ctx.frame_index;

        var args = [script, line_number, char_offset, box, sel, rt_id, script_text];

        var tag = _tagman.set_callback(null, _handle_script, args);

        var msg = [rt_id, thread_id, frame_index, script_text];

        _esde.requestEval(tag, msg);

      }

    }

  }