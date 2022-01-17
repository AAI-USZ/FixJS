function (url, args, callback, context) {
  args = format_args(args);
  if (args.user && args.user.proxy) {
    if (args.type === 'GET' && args.data) {
      url = utils.urljoin(url, args.data);
      delete args.data;
    }
    url = args.user.proxy + '?url=' + encodeURIComponent(url);
  }
  // console.log(url, args)
  request(url, args, function (err, data, res) {
    if (err) {
      return format_result(args, err, res, callback, context);
    }
    if (data && typeof data !== 'string') {
      data = data.toString();
    }
    format_result(args, data, res, callback, context);
  });
}