function(resp, do_raw)
{
  if (!resp.response_headers) // todo: we explicitely mention missing request headers but not missing response headers // ui_strings.S_NETWORK_REQUEST_NO_HEADERS_LABEL
    return [];

  if (do_raw)
  {
    if (!resp.header_tokens)
    {
      var tokens = [];
      var tokenizer = new cls.HTTPHeaderTokenizer();
      tokenizer.tokenize(resp.response_headers_raw, templates._token_receiver.bind(this, tokens));
      resp.header_tokens = tokens;
    }
    if (resp.header_tokens.length)
    {
      var map_func = templates._make_header_template_func(false);
      return [
        ["h2", ui_strings.S_NETWORK_REQUEST_DETAIL_RESPONSE_TITLE],
        ["pre", resp.header_tokens.map(map_func), "class", "mono"]
      ];
    }
    return [];
  }

  var ret = [];

  var firstline;
  var parts = resp.firstline.split(" ", 2);
  if (parts.length == 2)
  {
    firstline = [
      ["span", parts[0] + " "],
      ["span", parts[1], "data-spec", "http#" + parts[1]],
      ["span", resp.firstline.slice(parts[0].length + parts[1].length + 1)]
    ];
  }

  if (resp.logger_entry_touched_network)
    ret.push(["h2", ui_strings.S_NETWORK_REQUEST_DETAIL_RESPONSE_TITLE]);

  ret.extend(templates.headers_list(resp.response_headers, firstline));
  return ["tbody", ret.map(templates._wrap_col_or_row)];
}