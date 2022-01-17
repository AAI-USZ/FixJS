function (alo, ahi, blo, bhi) {
                                var c = 0,
                                    d = bxj.length,
                                    i = 0,
                                    j = 0,
                                    k = 0,
                                    l = [0, 0],
                                    besti = alo,
                                    bestj = blo,
                                    bestsize = 0;
                                for (i = alo; i < ahi; i += 1) {
                                    for (c = 0; c < d; c += 1) {
                                        if (bxj[c][1] === a[i] && (a[i] !== b[i] || (a[i] === b[i] && a[i + 1] !== b[i + 1]))) {
                                            j = bxj[c][0];
                                            break;
                                        }
                                    }
                                    if (c !== d) {
                                        if (j >= blo) {
                                            if (j >= bhi) {
                                                break;
                                            }
                                            if (l[0] === j - 1) {
                                                k = l[1] + 1;
                                            } else {
                                                k = 1;
                                            }
                                            if (k > bestsize) {
                                                besti = i - k + 1;
                                                bestj = j - k + 1;
                                                bestsize = k;
                                            }
                                        }
                                        l = [j, k];
                                    }
                                }
                                while (besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
                                    besti -= 1;
                                    bestj -= 1;
                                    bestsize += 1;
                                }
                                while (besti + bestsize < ahi && bestj + bestsize < bhi && !isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
                                    bestsize += 1;
                                }
                                while (besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] === b[bestj - 1]) {
                                    besti -= 1;
                                    bestj -= 1;
                                    bestsize += 1;
                                }
                                while (besti + bestsize < ahi && bestj + bestsize < bhi && isbjunk(b[bestj + bestsize]) && a[besti + bestsize] === b[bestj + bestsize]) {
                                    bestsize += 1;
                                }
                                return [besti, bestj, bestsize];
                            }