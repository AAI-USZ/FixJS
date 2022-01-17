function(bytes)
{
  var numformatter = String;
  if (window.helpers && window.helpers.pretty_print_number)
  {
    numformatter = window.helpers.pretty_print_number;
  }
  if (bytes >= 1048576) // megabytes
  {
    return "" + numformatter((bytes / 1048576).toFixed(2)) + " MB";
  }
  else if (bytes >= 1024)
  {
    return "" + numformatter(((bytes / 1024)).toFixed(1)) + " kB";
  }
  else
  {
    return "" + numformatter(bytes) + " B";
  }
}