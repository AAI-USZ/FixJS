function (info) {
        console.log("info = %j", info);
        r.result = toLisp(
          info,
          { "pid": "N:pid",
            "encoding": { name: "encoding",
                          spec: { "coding-systems": "@:codingSystems" } },
            "package": { name: "packageSpec", spec: { name: "s", prompt: "s" } },
            "lisp-implementation": {
              name: "implementation",
              spec: { type: "s", name: "s", version: "s" } },
            "version": "s:version" });
        cont();
      }