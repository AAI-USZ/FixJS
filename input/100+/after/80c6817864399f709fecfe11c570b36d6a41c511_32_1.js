function WriteToStringStream(string) {
      this.string = string != null ? string : '';
      this.writable = true;
      this.readable = true;
    }