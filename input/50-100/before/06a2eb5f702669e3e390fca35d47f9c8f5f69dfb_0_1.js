function (elementName, attributes) {
      var formattedAttributes = [];

      for (attribute in attributes || {}) {
        if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
          formattedAttributes.push(attribute + '="' + this.xmlAttributeEncode(attributes[attribute]) + '"');
        }
      }

      return '<' + elementName + ' ' + formattedAttributes.join(' ') + '>';
    }