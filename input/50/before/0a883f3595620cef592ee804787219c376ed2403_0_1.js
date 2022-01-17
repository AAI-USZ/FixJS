function (e, aconf) {
                                        var kconf;
                                        for (kconf in aconf) { opt[kconf] = aconf[kconf]; }
                                        initStyle();
                                        k.val($this.val());
                                    }