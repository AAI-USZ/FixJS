function() {
  var WriteAtomPipe, sdmx, stringifiers, xmlbuilder,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sdmx = require('../pipe/sdmxPipe');

  xmlbuilder = require('xmlbuilder');

  stringifiers = {
    toString: function(doc) {
      return doc.toString({
        pretty: true
      });
    },
    series: function(doc, series) {
      var i, obs, t, _i, _len, _ref;
      obs = [];
      _ref = series.obs.obsValue;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        t = _ref[i];
        obs.push(stringifiers.obs(doc, series, i));
      }
      return obs.join('');
    },
    obs: function(doc, series, i) {
      var addProperty, content, entry, key, properties, value, _ref, _ref1, _ref2;
      addProperty = function(parent, key, value) {
        return parent.ele("d:" + key).text(value);
      };
      entry = doc.begin('entry');
      entry.ele('id').text('id');
      entry.ele('title');
      entry.ele('updated').text('1900');
      content = entry.ele('content').att('type', 'application/xml');
      properties = content.ele('m:properties');
      _ref = series.seriesKey;
      for (key in _ref) {
        value = _ref[key];
        addProperty(properties, key, value);
      }
      _ref1 = series.attributes;
      for (key in _ref1) {
        value = _ref1[key];
        addProperty(properties, key, value);
      }
      _ref2 = series.obs.attributes;
      for (key in _ref2) {
        value = _ref2[key];
        addProperty(properties, key, value[i]);
      }
      addProperty(properties, 'obsDimension', series.obs.obsDimension[i]);
      if (isNaN(series.obs.obsValue[i])) {
        properties.ele("d:obsValue").att('m:null', 'true');
      } else {
        properties.ele("d:obsValue").att('m:type', 'Edm.Double').text(series.obs.obsValue[i]);
      }
      return stringifiers.toString(doc);
    }
  };

  WriteAtomPipe = (function(_super) {

    __extends(WriteAtomPipe, _super);

    function WriteAtomPipe(log) {
      this.log = log;
      this.doc = xmlbuilder.create();
      WriteAtomPipe.__super__.constructor.call(this, this.log);
    }

    WriteAtomPipe.prototype.beforeFirst = function(type, data) {
      var str;
      str = [];
      switch (type) {
        case sdmx.HEADER:
          str.push('<feed xmlns="http://www.w3.org/2005/Atom"');
          str.push(' xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"');
          str.push(' xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\n');
          str.push(this.doc.begin('id').text(data.id).toString({
            pretty: true
          }));
          str.push(this.doc.begin('title').text(data.id).toString({
            pretty: true
          }));
          str.push(this.doc.begin('updated').text(data.prepared.toISOString()).toString({
            pretty: true
          }));
          this.structures = data.structure;
          break;
        case 'end':
          str.push('</feed>');
      }
      return str.join('');
    };

    WriteAtomPipe.prototype.stringify = function(type, data) {
      if (type === sdmx.SERIES) {
        return stringifiers.series(this.doc, data);
      } else {
        return '';
      }
    };

    return WriteAtomPipe;

  })(sdmx.WriteSdmxPipe);

  exports.WriteAtomPipe = WriteAtomPipe;

}