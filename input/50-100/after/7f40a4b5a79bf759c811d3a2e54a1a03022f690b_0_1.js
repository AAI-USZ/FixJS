function(entry)
{
  var data = cls.ResourceManager["1.2"].UrlLoad.URLType.DATA;
  return (
    ["tbody", 
      this._wrap_col_or_row( // Todo: Alternatively put into a headline, as these otherwise say "Request" here.
        ["p", entry.urltype === data ? ui_strings.S_NETWORK_NOT_REQUESTED
                                   : ui_strings.S_NETWORK_SERVED_FROM_CACHE,
              "class", "network-info"])
    ]);
}