function()
  {
    if (!this.finished || !this.mime)
    {
      this.type = undefined;
    }
    else if (this.mime.toLowerCase() == "application/octet-stream")
    {
      this.type = cls.ResourceUtil.path_to_type(this.url);
    }
    else
    {
      this.type = cls.ResourceUtil.mime_to_type(this.mime);
    }
  }