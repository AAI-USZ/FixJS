function(headers, firstline, do_raw)
{
  var map;
  if (do_raw) // todo: when raw, this is currently just for headers of parts in mutipart. should be used for others too, to gain the speclinks.
  {
    map = function(header)
    {
      return templates.wrap_pre([["span", header.name + ":", "data-spec", "http#" + header.name], ["span", " " + header.value]]);
    };
  }
  else
  {
    map = function(header)
    {
      return [["th", header.name + ":", "data-spec", "http#" + header.name], ["td", header.value]];
    };
  }

  var lis = headers.map(map);

  if (firstline)
  {
    lis.unshift(["pre", firstline, "class", "mono"]);
  }
  return lis;
}