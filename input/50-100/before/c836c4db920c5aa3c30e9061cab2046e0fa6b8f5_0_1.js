function () {

        var lastUpdated = _.chain(this.gists)
          .max(function (entry) { return entry.updated_at; })
          .value();

        var response = '<?xml version="1.0" encoding="utf-8"?>\n' +
          '<feed xmlns="http://www.w3.org/2005/Atom"><title>Withouttheloop.com</title>\n' +
          '<id>http://withouttheloop.com/</id>\n' +
          '<link rel="self" href="http://withouttheloop.com/feed" />\n' +
          '<updated>' + new Date().toJSON() + '</updated>'; // TODO: how to fix this?

        _(this.gists).each(function (gist) {
          response += toEntryNode(gist);
          response += '\n';
        });
        return response + '</feed>';
      }