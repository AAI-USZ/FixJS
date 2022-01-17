function(_super) {

    __extends(GenericCheckPipe, _super);

    GenericCheckPipe.name = 'GenericCheckPipe';

    function GenericCheckPipe(log) {
      GenericCheckPipe.__super__.constructor.apply(this, arguments);
    }

    GenericCheckPipe.prototype.loadSchemas = function() {
      var schema, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = schemas.length; _i < _len; _i++) {
        schema = schemas[_i];
        _results.push(this.jsvenv.createSchema(schema));
      }
      return _results;
    };

    GenericCheckPipe.prototype.findSchema = function(type) {
      return this.jsvenv.findSchema('urn:sdmxfeeder.infomodel.' + type);
    };

    return GenericCheckPipe;

  }