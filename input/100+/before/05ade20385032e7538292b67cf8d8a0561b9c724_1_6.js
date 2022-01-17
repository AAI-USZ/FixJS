function (type, dimensions, initializer) {
      if (dimensions.length < 2)
        throw new Error("Must have at least two dimensions: " + String(dimensions));

      var totalSize = dimensions[0];
      for (var i = 1; i < dimensions.length; i++)
        totalSize *= dimensions[i];

      this._type = type;
      this._dimensions = dimensions;
      var items = this._items = new Array(totalSize);

      JSIL.SetValueProperty(this, "length", totalSize);

      if (JSIL.IsArray(initializer)) {
        JSIL.Array.ShallowCopy(items, initializer);
      } else {
        JSIL.Array.Erase(items, type);
      }

      switch (dimensions.length) {
        case 2:
          var height = this.length0 = dimensions[0];
          var width = this.length1 = dimensions[1];

          JSIL.SetValueProperty(this, "Get", 
            function Get (y, x) {
              return items[(y * width) + x];
            }
          );
          JSIL.SetValueProperty(this, "GetReference", 
            function GetReference (y, x) {
              return new JSIL.MemberReference(items, (y * width) + x);
            }
          );
          JSIL.SetValueProperty(this, "Set", 
            function Set (y, x, value) {
              return items[(y * width) + x] = value;
            }
          );
          JSIL.SetValueProperty(this, "GetLength", 
            function GetLength (i) {
              return dimensions[i];
            }
          );
          JSIL.SetValueProperty(this, "GetUpperBound", 
            function GetUpperBound (i) {
              return dimensions[i] - 1;
            }
          );
          break;
        case 3:
          var depth = this.length0 = dimensions[0];
          var height = this.length1 = dimensions[1];
          var width = this.length2 = dimensions[2];
          var heightxwidth = height * width;

          JSIL.SetValueProperty(this, "Get", 
            function Get (z, y, x) {
              return items[(z * heightxwidth) + (y * width) + x];      
            }
          );
          JSIL.SetValueProperty(this, "GetReference", 
            function GetReference (z, y, x) {
              return new JSIL.MemberReference(items, (z * heightxwidth) + (y * width) + x);
            }
          );
          JSIL.SetValueProperty(this, "Set", 
            function Set (z, y, x, value) {
              return items[(z * heightxwidth) + (y * width) + x] = value;
            }
          );
          JSIL.SetValueProperty(this, "GetLength", 
            function GetLength (i) {
              return dimensions[i];
            }
          );
          JSIL.SetValueProperty(this, "GetUpperBound", 
            function GetUpperBound (i) {
              return dimensions[i] - 1;
            }
          );
          break;
      }
    }