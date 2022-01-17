function(e) {
      try {
        var m = JSON.parse(e.data);
        if (typeof m !== 'object' || m === null) throw "malformed";
      } catch(e) {
        // just ignore any posted messages that do not consist of valid JSON
        return;
      }

      var w = e.source;
      var o = e.origin;
      var s, i, meth;

      if (typeof m.method === 'string') {
        var ar = m.method.split('::');
        if (ar.length == 2) {
          s = ar[0];
          meth = ar[1];
        } else {
          meth = m.method;
        }
      }

      if (typeof m.id !== 'undefined') i = m.id;

      // w is message source window
      // o is message origin
      // m is parsed message
      // s is message scope
      // i is message id (or undefined)
      // meth is unscoped method name
      // ^^ based on these factors we can route the message

      // if it has a method it's either a notification or a request,
      // route using s_boundChans
      if (typeof meth === 'string') {
        var delivered = false;
        if (s_boundChans[o] && s_boundChans[o][s]) {
          for (var j = 0; j < s_boundChans[o][s].length; j++) {
            if (s_boundChans[o][s][j].win === w) {
              s_boundChans[o][s][j].handler(o, meth, m);
              delivered = true;
              break;
            }
          }
        }

        if (!delivered && s_boundChans['*'] && s_boundChans['*'][s]) {
          for (var j = 0; j < s_boundChans['*'][s].length; j++) {
            if (s_boundChans['*'][s][j].win === w) {
              s_boundChans['*'][s][j].handler(o, meth, m);
              break;
            }
          }
        }
      }
      // otherwise it must have an id (or be poorly formed
      else if (typeof i != 'undefined') {
        if (s_transIds[i]) s_transIds[i](o, meth, m);
      }
    }