function(req, do_raw)
{
  if (do_raw)
  {
    if (req.request_headers_raw) // todo: we explicitely mention missing request headers in parsed. this check here is a bit ugly.
    {
      if (!req.header_tokens)
      {
        var tokens = [];
        var tokenizer = new cls.HTTPHeaderTokenizer();
        tokenizer.tokenize(req.request_headers_raw, templates._token_receiver.bind(this, tokens));
        req.header_tokens = tokens;
      }
      if (req.header_tokens.length)
      {
        var map_func = templates._make_header_template_func(true);
        return [
          ["h2", ui_strings.S_NETWORK_REQUEST_DETAIL_REQUEST_TITLE],
          ["pre", req.header_tokens.map(map_func), "class", "mono"]
        ];
      }
    }
    return [];
  }

  var ret = [];

  if (req.requestbody && req.requestbody.partList && req.requestbody.partList.length)
    ret.push(["h2", ui_strings.S_NETWORK_MULTIPART_REQUEST_TITLE]);
  else
    ret.push(["h2", ui_strings.S_NETWORK_REQUEST_DETAIL_REQUEST_TITLE]);

  if (!req.request_headers)
  {
    ret.push(ui_strings.S_NETWORK_REQUEST_NO_HEADERS_LABEL);
  }
  else
  {
    if (req.firstline)
    {
      var parts = req.firstline.split(" ");
      var firstline;
      if (parts.length == 3)
      {
        firstline = [
          ["span", parts[0] + " ", "data-spec", "http#" + parts[0]],
          ["span", parts[1] + " "],
          ["span", parts[2] + " "]
        ];
      }
      ret.extend(templates.headers_list(req.request_headers, firstline));
    }
  }
  return ["tbody", ret.map(templates._wrap_col_or_row)];
}