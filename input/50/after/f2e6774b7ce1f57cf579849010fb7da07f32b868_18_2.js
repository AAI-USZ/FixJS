function doneTag() {
    if (!selectedTag && customTag.value.length > 0 && contactTag) {
      contactTag.textContent = customTag.value;
    }
    contactTag = null;
    this.goBack();
  }