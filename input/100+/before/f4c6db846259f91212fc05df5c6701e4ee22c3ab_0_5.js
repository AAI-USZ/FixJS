function(resp, do_raw, is_last)
{
  var ret = [templates._wrap_pre("\n")]; // todo: no, then it's (really) empty there shouldn't be a separator either.

  var classname = "";
  if (resp.body_unavailable ||
      !resp.responsebody && resp.is_unloaded)
  {
    classname = "network_info";
    ret.push(ui_strings.S_NETWORK_REQUEST_DETAIL_NO_RESPONSE_BODY);
  }
  else
  {
    if (!resp.responsebody)
    {
      if (is_last && !resp.logger_entry_is_finished)
      {
        classname = "network_info";
        ret.push(ui_strings.S_NETWORK_REQUEST_DETAIL_BODY_UNFINISHED);
      }
      // else we're in the middle of getting it via GetResource, or there is in fact no responsebody.
    }
    else
    {
      if (["script", "markup", "css", "text"].contains(resp.logger_entry_type))
      {
        ret.push(
          ["pre", resp.responsebody.content.stringData, "class", "network-body mono"]
        );
      }
      else if (resp.logger_entry_type == "image")
      {
        ret.push(
          ["img", "src", resp.responsebody.content.stringData, "class", "network-body"]
        );
      }
      else
      {
        ret.push(
          ["span", ui_strings.S_NETWORK_REQUEST_DETAIL_UNDISPLAYABLE_BODY_LABEL.replace("%s", resp.logger_entry_mime),
           "class", "network-body"]
        );
      }
    }
  }
  if (do_raw)
    return ret;
  else
    return ["tbody", ret.map(templates._wrap_col_or_row), "class", classname];
}