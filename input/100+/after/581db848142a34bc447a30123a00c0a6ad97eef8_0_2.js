function () {
                        var c = 0,
                            d = 0,
                            alo = 0,
                            ahi = 0,
                            blo = 0,
                            bhi = 0,
                            qi = [],
                            i = 0,
                            j = 0,
                            k = 0,
                            x = [],
                            i1 = 0,
                            i2 = 0,
                            j1 = 0,
                            j2 = 0,
                            k1 = 0,
                            k2 = 0,
                            la = a.length,
                            lb = b.length,
                            queue = [
                                [0, la, 0, lb]],
                            non_adjacent = [],
                            ntuplecomp = function (x, y) {
                                var i = 0,
                                    mlen = Math.max(x.length, y.length);
                                for (i = 0; i < mlen; i += 1) {
                                    if (x[i] < y[i]) {
                                        return -1;
                                    }
                                    if (x[i] > y[i]) {
                                        return 1;
                                    }
                                }
                                return (x.length === y.length) ? 0 : ((x.length < y.length) ? -1 : 1);
                            },
                            find_longest_match = function (alo, ahi, blo, bhi) {
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
                                        if (bxj[c][1] === a[i] && (a[i] !== b[i] || i === ahi - 1 || a[i + 1] === b[i + 1])) {
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
                            };
                        while (queue.length) {
                            qi = queue.pop();
                            alo = qi[0];
                            ahi = qi[1];
                            blo = qi[2];
                            bhi = qi[3];
                            x = find_longest_match(alo, ahi, blo, bhi);
                            i = x[0];
                            j = x[1];
                            k = x[2];
                            if (k > 0) {
                                matching_blocks.push(x);
                                if (alo < i && blo < j) {
                                    queue.push([alo, i, blo, j]);
                                }
                                if (i + k < ahi && j + k < bhi) {
                                    queue.push([i + k, ahi, j + k, bhi]);
                                }
                            }
                        }
                        matching_blocks.sort(ntuplecomp);
                        d = matching_blocks.length;
                        for (c = 0; c < d; c += 1) {
                            i2 = matching_blocks[c][0];
                            j2 = matching_blocks[c][1];
                            k2 = matching_blocks[c][2];
                            if (i1 + k1 === i2 && j1 + k1 === j2) {
                                k1 += k2;
                            } else {
                                if (k1) {
                                    non_adjacent.push([i1, j1, k1]);
                                }
                                i1 = i2;
                                j1 = j2;
                                k1 = k2;
                            }
                        }
                        if (k1) {
                            non_adjacent.push([i1, j1, k1]);
                        }
                        non_adjacent.push([la, lb, 0]);
                        return non_adjacent;
                    }