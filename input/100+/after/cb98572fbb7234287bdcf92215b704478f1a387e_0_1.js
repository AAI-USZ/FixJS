function(entry, do_raw)
{
  // Bind a template function for raw / not-raw, on demand.
  var template_func_name = "_requests_responses_" + (do_raw ? "raw" : "not_raw" + "_bound");
  if (!this[template_func_name])
    this[template_func_name] = this.requests_responses.bind(this, do_raw);

  var requests_responses = entry.requests_responses.map(this[template_func_name]);
  if (do_raw)
  {
    return requests_responses;
  }

  var responsecode = entry.last_responsecode;
  if (responsecode && responsecode in cls.ResourceUtil.http_status_codes)
     responsecode = responsecode + " " + cls.ResourceUtil.http_status_codes[responsecode];

  return (
    ["table",
      ["tbody",
        this._wrap_col_or_row(
          [
            "h1",
            [
              [
                "span",
                entry.touched_network && responsecode ? String(responsecode) + " – " : "",
                "data-spec", "http#" + entry.last_responsecode
              ],
              ["span", entry.url]
            ]
          ]
        )
      ],
      entry.touched_network ? [] : this.did_not_touch_network(entry),
      requests_responses
    ]
  );
}