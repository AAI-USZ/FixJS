function() {
    var Adapter, adapter, config, env, k, v;
    if (!existsSync("migrations")) {
      console.error("migrations directory not found");
      process.exit(1);
    }
    env = process.env.NODE_ENV || "development";
    config = require(process.cwd() + "/migrations/config")[env];
    for (k in config) {
      v = config[k];
      adapter = k;
      Adapter = require("./" + adapter);
      break;
    }
    return {
      connectionInfo: config[adapter],
      schema: new Adapter(config[adapter])
    };
  }