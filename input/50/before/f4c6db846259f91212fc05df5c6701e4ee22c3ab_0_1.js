function(response, is_last, do_raw)
{
  return [
    templates._response_headers(response, do_raw),
    templates._response_body(response, do_raw, is_last)
  ]
}