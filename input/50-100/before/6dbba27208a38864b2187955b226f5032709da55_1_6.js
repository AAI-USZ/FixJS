function()
  {
    // The first guess is made based on file extension. No response is needed for that.
    // The current response is updated though, at the time it will be the correct one.
    // Multiple responses can get different types in this way.
    if (!cls || !cls.ResourceUtil)
      return;

    // For "application/octet-stream" we check by extension even though we have a mime
    if (!this.mime || this.mime.toLowerCase() === "application/octet-stream")
      this.type = cls.ResourceUtil.extension_type_map[this.extension];
    else
      this.type = cls.ResourceUtil.mime_to_type(this.mime);

    if (this._current_response)
      this._current_response._update_mime_and_type(this.mime, this.type);
  }