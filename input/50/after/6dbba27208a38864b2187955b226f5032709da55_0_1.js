function(request, is_last_request, do_raw)
{
  // A request that's followed by another one, without a response in between,
  // is not shown in network-details. It will mostly mean it was retried internally
  // and didn't go on the network.
  // That can't be determined only by looking at RequestRetry events, because a
  // request with for example a 401 Authorization Required response should still 
  // be shown.
  if (!is_last_request && !request.was_responded_to)
    return [];

  return [
    templates._request_headers(request, do_raw),
    templates._request_body(request, do_raw)
  ]
}