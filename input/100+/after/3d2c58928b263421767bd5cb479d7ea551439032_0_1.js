function PropertyValuePart(text){

  /**
   * Indicates the type of value unit.
   * @type String
   * @property type
   */
  this.type = "unknown";

  //figure out what type of data it is

  var temp;

  //it is a measurement?
  if (/^([+\-]?[\d\.]+)([a-z]+)$/i.test(text)){  //dimension
    this.type = "dimension";
    this.value = +RegExp.$1;
    this.units = RegExp.$2;

    //try to narrow down
    switch(this.units.toLowerCase()){

      case "em":
      case "rem":
      case "ex":
      case "px":
      case "cm":
      case "mm":
      case "in":
      case "pt":
      case "pc":
      case "ch":
        this.type = "length";
        break;

      case "deg":
      case "rad":
      case "grad":
        this.type = "angle";
        break;

      case "ms":
      case "s":
        this.type = "time";
        break;

      case "hz":
      case "khz":
        this.type = "frequency";
        break;

      case "dpi":
      case "dpcm":
        this.type = "resolution";
        break;

      default:
      this.type = 'unknown';
      break;

    }

  } else if (/^([+\-]?[\d\.]+)%$/i.test(text)){  //percentage
    this.type = "percentage";
    this.value = +RegExp.$1;
  } else if (/^([+\-]?[\d\.]+)%$/i.test(text)){  //percentage
    this.type = "percentage";
    this.value = +RegExp.$1;
  } else if (/^([+\-]?\d+)$/i.test(text)){  //integer
    this.type = "integer";
    this.value = +RegExp.$1;
  } else if (/^([+\-]?[\d\.]+)$/i.test(text)){  //number
    this.type = "number";
    this.value = +RegExp.$1;

  } else if (/^#([a-f0-9]{3,6})/i.test(text)){  //hexcolor
    this.type = "color";
    temp = RegExp.$1;
    if (temp.length == 3){
      this.red    = parseInt(temp.charAt(0)+temp.charAt(0),16);
      this.green  = parseInt(temp.charAt(1)+temp.charAt(1),16);
      this.blue   = parseInt(temp.charAt(2)+temp.charAt(2),16);            
    } else {
      this.red    = parseInt(temp.substring(0,2),16);
      this.green  = parseInt(temp.substring(2,4),16);
      this.blue   = parseInt(temp.substring(4,6),16);            
    }
    this.value  = text;
  } else if (/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(text)){ //rgb() color with absolute numbers
    this.type   = "color";
    this.red    = +RegExp.$1;
    this.green  = +RegExp.$2;
    this.blue   = +RegExp.$3;
  } else if (/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)){ //rgb() color with percentages
    this.type   = "color";
    this.red    = +RegExp.$1 * 255 / 100;
    this.green  = +RegExp.$2 * 255 / 100;
    this.blue   = +RegExp.$3 * 255 / 100;
  } else if (/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(text)){ //rgba() color with absolute numbers
    this.type   = "color";
    this.red    = +RegExp.$1;
    this.green  = +RegExp.$2;
    this.blue   = +RegExp.$3;
    this.alpha  = +RegExp.$4;
    this.value  = text;
  } else if (/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)){ //rgba() color with percentages
    this.type   = "color";
    this.red    = +RegExp.$1 * 255 / 100;
    this.green  = +RegExp.$2 * 255 / 100;
    this.blue   = +RegExp.$3 * 255 / 100;
    this.alpha  = +RegExp.$4;        
    this.value  = text;
  } else if (/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(text)){ //hsl()
    this.type       = "color";
    this.hue        = +RegExp.$1;
    this.saturation = +RegExp.$2 / 100;
    this.lightness  = +RegExp.$3 / 100;
    this.value      = text;
  } else if (/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i.test(text)){ //hsla() color with percentages
    this.type   = "color";
    this.hue    = +RegExp.$1;
    this.saturation = +RegExp.$2 / 100;
    this.lightness  = +RegExp.$3 / 100;        
    this.alpha  = +RegExp.$4;        
    this.value  = text;
  } else if (/^url\(["']?([^\)"']+)["']?\)/i.test(text)){ //URI
    this.type   = "uri";
    this.uri    = RegExp.$1;
  } else if (/^([^\(]+)\(/i.test(text)){
    this.type   = "function";
    this.name   = RegExp.$1;
    this.value  = text;
  } else if (/^["'][^"']*["']/.test(text)){    //string
    this.type   = "string";
    this.value  = eval(text);
  } else if (Colors[text.toLowerCase()]){  //named color
    this.type   = "color";
    temp        = Colors[text.toLowerCase()].substring(1);
    this.red    = parseInt(temp.substring(0,2),16);
    this.green  = parseInt(temp.substring(2,4),16);
    this.blue   = parseInt(temp.substring(4,6),16);         
    this.value  = text;
  } else if (/^[\,\/]$/.test(text)){
    this.type   = "operator";
    this.value  = text;
  } else if (/^[a-z\-\u0080-\uFFFF][a-z0-9\-\u0080-\uFFFF]*$/i.test(text)){
    this.type   = "identifier";
    this.value  = text;
  }

}