function(headers, firstline)
{
  var lis = headers.map(function(header) {
      return [["th", header.name + ":", "data-spec", "http#" + header.name], ["td", header.value]];
  });

  if (firstline)
  {
    lis.unshift(["pre", firstline, "class", "mono"]);
  }
  return lis;
}