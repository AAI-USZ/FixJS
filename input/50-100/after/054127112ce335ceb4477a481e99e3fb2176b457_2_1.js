function (k) {
        // if "what" was a url, then save that instead.
        var t = tree[k]
          , u = url.parse(t.from)
          , w = t.what.split("@")
        if (u && u.protocol) w[1] = t.from
        return w
      }