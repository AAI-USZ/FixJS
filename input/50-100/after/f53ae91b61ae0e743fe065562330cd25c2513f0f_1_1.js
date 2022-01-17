function (beforeAppend) {
  if (this.elem.modify === false && this.document.useStream === true) {
    throw new Error('container can only be modified while online');
  }

  if (beforeAppend === true && this.isChunked) {
    throw new Error('can not set attribute after .append or .done');
  }
}