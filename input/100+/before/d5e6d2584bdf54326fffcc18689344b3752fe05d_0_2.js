function (root, name) {

  var
    TYPE_ARRAY        = '[object Array]',
    TYPE_CANVAS       = '[object HTMLCanvasElement]',
    TYPE_CONTEXT      = '[object CanvasRenderingContext2D]',
    TYPE_IMAGE        = '[object HTMLImageElement]',
    TYPE_IMAGE_DATA   = '[object ImageData]',

    canvas            = getCanvas(),
    context           = canvas.getContext('2d'),
    previous          = root[name],
    imagediff, jasmine;

  // Creation
  function getCanvas (width, height) {
    var
      canvas = document.createElement('canvas');
    if (width) canvas.width = width;
    if (height) canvas.height = height;
    return canvas;
  }
  function getImageData (width, height) {
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    return context.createImageData(width, height);
  }


  // Type Checking
  function isImage (object) {
    return isType(object, TYPE_IMAGE);
  }
  function isCanvas (object) {
    return isType(object, TYPE_CANVAS);
  }
  function isContext (object) {
    return isType(object, TYPE_CONTEXT);
  }
  function isImageData (object) {
    return isType(object, TYPE_IMAGE_DATA);
  }
  function isImageType (object) {
    return (
      isImage(object) ||
      isCanvas(object) ||
      isContext(object) ||
      isImageData(object)
    );
  }
  function isType (object, type) {
    return typeof (object) === 'object' && Object.prototype.toString.apply(object) === type;
  }


  // Type Conversion
  function copyImageData (imageData) {
    var
      height = imageData.height,
      width = imageData.width;
    canvas.width = width;
    canvas.height = height;
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, width, height);
  }
  function toImageData (object) {
    if (isImage(object)) { return toImageDataFromImage(object); }
    if (isCanvas(object)) { return toImageDataFromCanvas(object); }
    if (isContext(object)) { return toImageDataFromContext(object); }
    if (isImageData(object)) { return object; }
  }
  function toImageDataFromImage (image) {
    var
      height = image.height,
      width = image.width;
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, width, height);
  }
  function toImageDataFromCanvas (canvas) {
    var
      height = canvas.height,
      width = canvas.width,
      context = canvas.getContext('2d');
    return context.getImageData(0, 0, width, height);
  }
  function toImageDataFromContext (context) {
    var
      canvas = context.canvas,
      height = canvas.height,
      width = canvas.width;
    return context.getImageData(0, 0, width, height);
  }


  // ImageData Equality Operators
  function equalWidth (a, b) {
    return a.width === b.width;
  }
  function equalHeight (a, b) {
    return a.height === b.height;
  }
  function equalDimensions (a, b) {
    return equalHeight(a, b) && equalWidth(a, b);
  }
  function equal (a, b) {

    var
      aData   = a.data,
      bData   = b.data,
      length  = aData.length,
      i;

    if (!equalDimensions(a, b)) return false;
    for (i = length; i--;) if (aData[i] !== bData[i]) return false;

    return true;
  }


  // Diff
  function diff (a, b) {
    return (equalDimensions(a, b) ? diffEqual : diffUnequal)(a, b);
  }
  function diffEqual (a, b) {

    var
      height  = a.height,
      width   = a.width,
      c       = getImageData(width, height), // c = a - b
      aData   = a.data,
      bData   = b.data,
      cData   = c.data,
      length  = cData.length,
      row, column,
      i, j, k, v;

    for (i = 0; i < length; i += 4) {
      cData[i] = Math.abs(aData[i] - bData[i]);
      cData[i+1] = Math.abs(aData[i+1] - bData[i+1]);
      cData[i+2] = Math.abs(aData[i+2] - bData[i+2]);
      cData[i+3] = Math.abs(255 - aData[i+3] - bData[i+3]);
    }

    return c;
  }
  function diffUnequal (a, b) {

    var
      height  = Math.max(a.height, b.height),
      width   = Math.max(a.width, b.width),
      c       = getImageData(width, height), // c = a - b
      aData   = a.data,
      bData   = b.data,
      cData   = c.data,
      rowOffset,
      columnOffset,
      row, column,
      i, j, k, v;


    for (i = cData.length - 1; i > 0; i = i - 4) {
      cData[i] = 255;
    }

    // Add First Image
    offsets(a);
    for (row = a.height; row--;){
      for (column = a.width; column--;) {
        i = 4 * ((row + rowOffset) * width + (column + columnOffset));
        j = 4 * (row * a.width + column);
        cData[i+0] = aData[j+0]; // r
        cData[i+1] = aData[j+1]; // g
        cData[i+2] = aData[j+2]; // b
        // cData[i+3] = aData[j+3]; // a
      }
    }

    // Subtract Second Image
    offsets(b);
    for (row = b.height; row--;){
      for (column = b.width; column--;) {
        i = 4 * ((row + rowOffset) * width + (column + columnOffset));
        j = 4 * (row * b.width + column);
        cData[i+0] = Math.abs(cData[i+0] - bData[j+0]); // r
        cData[i+1] = Math.abs(cData[i+1] - bData[j+1]); // g
        cData[i+2] = Math.abs(cData[i+2] - bData[j+2]); // b
      }
    }

    // Helpers
    function offsets (imageData) {
      rowOffset = Math.floor((height - imageData.height) / 2);
      columnOffset = Math.floor((width - imageData.width) / 2);
    }

    return c;
  }


  // Validation
  function checkType () {
    var i;
    for (i = 0; i < arguments.length; i++) {
      if (!isImageType(arguments[i])) {
        throw {
          name : 'ImageTypeError',
          message : 'Submitted object was not an image.'
        };
      }
    }
  }


  // Jasmine Matchers
  function get (element, content) {
    element = document.createElement(element);
    if (element && content) {
      element.innerHTML = content;
    }
    return element;
  }
  jasmine = {

    toBeImageData : function () {
      return imagediff.isImageData(this.actual);
    },

    toImageDiffEqual : function (expected) {

      this.message = function() {

        var
          div     = get('div'),
          a       = get('div', '<div>Actual:</div>'),
          b       = get('div', '<div>Expected:</div>'),
          c       = get('div', '<div>Diff:</div>'),
          diff    = imagediff.diff(this.actual, expected),
          canvas  = getCanvas(),
          context;

        canvas.height = diff.height;
        canvas.width  = diff.width;

        context = canvas.getContext('2d');
        context.putImageData(diff, 0, 0);

        a.appendChild(this.actual);
        b.appendChild(expected);
        c.appendChild(canvas);

        div.appendChild(a);
        div.appendChild(b);
        div.appendChild(c);

        return [
          div,
          "Expected not to be equal."
        ];
      };

      return imagediff.equal(this.actual, expected);
    }
  };

  // Definition
  imagediff = {

    createCanvas : getCanvas,
    createImageData : getImageData,

    isImage : isImage,
    isCanvas : isCanvas,
    isContext : isContext,
    isImageData : isImageData,
    isImageType : isImageType,

    toImageData : function (object) {
      checkType(object);
      if (isImageData(object)) { return copyImageData(object); }
      return toImageData(object);
    },

    equal : function (a, b) {
      checkType(a, b);
      a = toImageData(a);
      b = toImageData(b);
      return equal(a, b);
    },
    diff : function (a, b) {
      checkType(a, b);
      a = toImageData(a);
      b = toImageData(b);
      return diff(a, b);
    },

    jasmine : jasmine,

    // Compatibility
    noConflict : function () {
      root[name] = previous;
      return imagediff;
    }
  };

  return imagediff;
}