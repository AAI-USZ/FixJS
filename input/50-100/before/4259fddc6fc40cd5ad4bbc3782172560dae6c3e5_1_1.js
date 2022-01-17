function (slimeVersion) {
      cont({ pid: self.pid === null ? process.pid : self.pid,
             encoding: { codingSystem: "utf-8", externalFormat: "UTF-8" },
             packageSpec: { name: prompt, prompt: prompt },
             implementation: { type: "JS", name: "JS", version: "1.5" },
             version: slimeVersion || DEFAULT_SLIME_VERSION });
    }