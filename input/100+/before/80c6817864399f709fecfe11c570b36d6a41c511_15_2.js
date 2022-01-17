function(_super) {

    __extends(WriteAtomPipe, _super);

    WriteAtomPipe.name = 'WriteAtomPipe';

    function WriteAtomPipe(log) {
      this.log = log;
      this.doc = builder.create();
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
          str.push(this.doc.e('id').text(data.id).toString({
            pretty: true
          }));
          str.push(this.doc.e('title').text(data.id).toString({
            pretty: true
          }));
          str.push(this.doc.e('updated').text(data.prepared.toISOString()).toString({
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

  }