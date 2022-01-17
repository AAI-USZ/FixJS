function(mime)
{
  var type = cls.ResourceUtil.mime_to_type(mime);
  switch (type) {
    case "image":
    case "pdf":
    case "flash":
    case "font":
      return "datauri";
    case "markup":
    case "css":
    case "xml":
    case "script":
      return "text";
  }
  return "text";
}