function(type, data) {
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
    }