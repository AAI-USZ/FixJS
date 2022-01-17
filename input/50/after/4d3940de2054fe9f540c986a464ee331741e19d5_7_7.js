function(rx, mods) {
                        if (options.ascii_only) rx = to_ascii(rx);
                        return "/" + rx + "/" + mods;
                }