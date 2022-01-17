function(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      return content.substring(1);
    } else {
      return content;
    }
  }