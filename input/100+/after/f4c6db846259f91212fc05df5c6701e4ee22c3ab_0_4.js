function(req, do_raw)
{
  if (req.requestbody == null)
    return [];

  var ret = [this._wrap_pre("\n")];
  if (req.requestbody.partList.length) // multipart
  {
    var use_raw_boundary = false;
    if (do_raw && req.boundary)
      use_raw_boundary = true;

    for (var n = 0, part; part = req.requestbody.partList[n]; n++)
    {
      if (use_raw_boundary && n === 0)
        ret.push(this._wrap_pre(req.boundary));

      ret.extend(this.headers_list(part.headerList, null, do_raw));
      ret.push(this._wrap_pre("\n"));
      if (part.content && part.content.stringData)
        ret.push(["pre", part.content.stringData, "class", "mono network-body"]);
      else
        ret.push(["p", ui_strings.S_NETWORK_N_BYTE_BODY.replace("%s", part.contentLength)]);

      if (n < req.requestbody.partList.length - 1)
        ret.push(use_raw_boundary ? this._wrap_pre(req.boundary) : ["hr"]);
      else if (use_raw_boundary)
        ret.push(this._wrap_pre(req.boundary + "--\n"));
    }
  }
  else if (req.requestbody.mimeType.startswith("application/x-www-form-urlencoded"))
  {
    if (do_raw)
    {
      ret.push(["pre", req.requestbody.content.stringData, "class", "mono network-body"]);
    }
    else
    {
      var parts = req.requestbody.content.stringData.split("&");
      ret.push([
                  ["th", ui_strings.S_LABEL_NETWORK_POST_DATA_NAME],
                  ["th", ui_strings.S_LABEL_NETWORK_POST_DATA_VALUE]
                ]); // it's necesary to just push the outer array, because each entry will be wrapped in a row.
      
      ret.extend(parts.map(function(e) {
                    e = e.replace(/\+/g, "%20").split("=");
                    return [
                        ["td", decodeURIComponent(e[0])],
                        ["td", decodeURIComponent(e[1])]
                    ];
                  }));
    }
  }
  else // not multipart or form.
  {
    if (req.requestbody.content)
    {
      var type = cls.ResourceUtil.mime_to_type(req.requestbody.mimeType);
      if (["markup", "script", "css", "text"].contains(type))
      {
        ret.push(["pre", req.requestbody.content.stringData]);
      }
      else
      {
        if (req.requestbody.mimeType)
        {
          ret.push(["p", ui_strings.S_NETWORK_CANT_DISPLAY_TYPE.replace("%s", req.requestbody.mimeType)]);
        }
        else
        {
          ret.push(["p", ui_strings.S_NETWORK_UNKNOWN_MIME_TYPE]);
        }
      }
    }
  }

  if (do_raw)
    return ret;
  else
    return ["tbody", ret.map(this._wrap_col_or_row)];
}