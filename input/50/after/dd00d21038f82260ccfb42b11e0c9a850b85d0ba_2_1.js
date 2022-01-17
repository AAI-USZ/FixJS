function(propertyName)
    {
      return (
        this.__special[propertyName] ||
        qx.bom.Style.STYLENAMES[propertyName] ||
        propertyName in document.documentElement.style
      );
    }