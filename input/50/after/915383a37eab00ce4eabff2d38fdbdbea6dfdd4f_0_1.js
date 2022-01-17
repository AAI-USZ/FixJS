function(res) {
          var json = MochiKit.Base.evalJSON(res.responseText);
          if (json && json.status && (json.status === 'fail')) {
            throw new Error(json.message);
          }
        }