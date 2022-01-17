function(to, from, clobber, __internal) {
            var k,
                tv,
                fv,
                internal = __internal;

            for (k in from) {
                if (from.hasOwnProperty(k)) {
                    if (internal || !isExcluded(k)) {
                        fv = from[k];
                        tv = to[k];
                        if (!tv) {
                            // Y.log('adding ' + k);
                            to[k] = fv;
                        } else if (Y.Lang.isArray(fv)) {
                            // Y.log('from array ' + k);
                            if (!Y.Lang.isArray(tv)) {
                                throw new Error('Meta merge error.' +
                                    ' Type mismatch between mojit metas.');
                            }
                            // Largely used for content-type, but could be other
                            // key values in the future.
                            if (shouldAutoClobber(k)) {
                                if (isAtomic(k)) {
                                    // Note the choice to use the last item of
                                    // the inbound array, not the first.
                                    // Y.log('atomizing ' + k);
                                    to[k] = [fv[fv.length - 1]];
                                } else {
                                    // Not "atomic" but clobbering means we'll
                                    // completely replace any existing array
                                    // value in the slot.
                                    // Y.log('clobbering ' + k);
                                    to[k] = fv;
                                }
                            } else {
                                // A simple push() here would work, but it
                                // doesn't unique the values so it may cause an
                                // array to grow without bounds over time even
                                // when no truly new content is added.
                                Y.mojito.util.mergeRecursive(tv, fv);
                            }
                        } else if (Y.Lang.isObject(fv)) {
                            // Y.log('from object ' + k);
                            if (Y.Lang.isObject(tv)) {
                                // Y.log('merging ' + k);
                                to[k] = Y.mojito.util.metaMerge(tv, fv, clobber,
                                    true);
                            } else if (Y.Lang.isNull(tv) ||
                                    Y.Lang.isUndefined(tv)) {
                                to[k] = fv;
                            } else {
                                throw new Error('Meta merge error.' +
                                    ' Type mismatch between mojit metas.');
                            }
                        } else if (clobber) {
                            // Y.log('clobbering ' + k);
                            to[k] = fv;
                        }
                    }
                }
            }
            return to;
        }