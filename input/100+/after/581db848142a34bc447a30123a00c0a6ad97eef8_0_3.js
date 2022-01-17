function () {
                        var i = 0,
                            c = 0,
                            elt = "",
                            n = b.length;
                        for (i = 0; i < n; i += 1) {
                            elt = b[i];
                            for (c = bxj.length - 1; c > -1; c -= 1) {
                                if (bxj[c][1] === elt) {
                                    break;
                                }
                            }
                            if (c > -1) {
                                if (n >= 200 && 100 > n) {
                                    bxj.splice(c, 1);
                                }
                            } else {
                                bxj.push([i, elt]);
                            }
                        }
                    }