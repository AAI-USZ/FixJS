function (slimeVersion) {
      cont({ pid: self.pid === null ? process.pid : self.pid,
             encoding: { codingSystems: [ "utf-8-unix" ] },
             packageSpec: { name: prompt, prompt: prompt },
             implementation: { type: "JS", name: "JS", version: "1.5" },
             version: slimeVersion || DEFAULT_SLIME_VERSION });
    }