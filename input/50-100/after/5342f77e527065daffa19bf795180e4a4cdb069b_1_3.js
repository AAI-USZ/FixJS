function() {

    var elements;

    if (arguments[0] == undefined) {

      return null;

    } else {

      if (arguments[0][0] == undefined) {

        elements = arguments;

      } else {

        elements = arguments[0];

      }

      if (elements.length < 1) {

        return null;

      } else {

        var V = new Vector.Abstract();

        V.setElements(elements);

        return V;

      }

    }

  }