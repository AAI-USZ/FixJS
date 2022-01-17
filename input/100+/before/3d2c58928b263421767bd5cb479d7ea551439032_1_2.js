function(prop, i){

  if (prop === 'line-height') return;

  var val = this.replaceEM(this.value[i]);
  var property = new Property(prop, val, this.selector);
  //如果attr为空，则value等于val
  var attr = property.attributes || {value: val};

  switch(prop) {
    case 'width': {
      this.width += attr.value;
      this.hasWidth = true;
      break;
    }

    case 'padding-left':
    case 'padding-right': {
      this.width += attr.value;
      break;
    }

    case 'padding': {
      this.width += attr.padding[2] + attr.padding[3];
      this.height += attr.padding[0] + attr.padding[2];
      break;
    }

    case 'padding-bottom':
    case 'padding-top': {
      this.height += attr.value;
      break;
    }

    case 'height': {
      this.hasHeight = true;
      this.height += attr.value > this.EM? attr.value : this.EM;
      break;
    }

    case 'background-image':
    case 'background': {
      this.background = mixin(attr, this.background || {});
      break;
    }

    case 'background-repeat': {
      this.background.repeat = attr.value;
      break;
    }

    case 'background-position': {
      this.background.position = attr.position;
      break;
    }

    default:
      break;
  }
}