function copy_doc(doc_src, doc_dest, opts, callback) {
      if(typeof opts === "function") {
        callback = opts;
        opts     = {};
      }
      var params = { db: db_name, doc: doc_src, method: "COPY"
        , headers: {"Destination": doc_dest} };
      head_doc(doc_dest, function (e,b,h) {
        if (!e && opts.overwrite) {
          params.headers.Destination += "?rev=" + 
            h.etag.substring(1, h.etag.length - 1);
        }
        return relax(params, callback);
      });
    }