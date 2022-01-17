function(attrs) {
      if (attributeCur.AttachmentMeasure == null) {
        attributeCur.AttachmentMeasure = [];
      }
      return attributeCur.AttachmentMeasure.push(this.stringBuffer);
    }