function () {
                        var domain = ini.get("domain", "user");
                        if (!domain) {
                          log.error(["Unabled to determine domain - please login again.", "Unknown domain"]);
                        }
                        return domain;
                      }