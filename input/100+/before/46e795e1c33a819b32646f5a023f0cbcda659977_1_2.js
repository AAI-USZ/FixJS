function(message) {

      message = Group.prototype.composeRenderMessage.call(this, message);
      var bitmap = this._children[this.currentBitmapIndex];

      this._children.forEach(function(child) {
        child.type = 'bitmap_hidden';
      });

      message.attributes = this.attr();
      message.attributes.source = bitmap.attr('source');
      message.attributes.height = bitmap.attr('height');
      message.attributes.width = bitmap.attr('width');
      message.type = 'Bitmap';
      message.id = bitmap.id;

      return message;
  }