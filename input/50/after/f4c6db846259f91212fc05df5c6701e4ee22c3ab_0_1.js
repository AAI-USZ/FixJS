function(response, is_last, do_raw)
{
  return [
    this._response_headers(response, do_raw),
    this._response_body(response, do_raw, is_last)
  ]
}