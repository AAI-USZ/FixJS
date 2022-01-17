function(do_raw, request_response, index, requests_responses)
{
  var is_last = index == requests_responses.length - 1;
  var template_func = templates._response;
  if (request_response instanceof cls.NetworkLoggerRequest)
    template_func = templates._request;

  return template_func(request_response, is_last, do_raw);
}