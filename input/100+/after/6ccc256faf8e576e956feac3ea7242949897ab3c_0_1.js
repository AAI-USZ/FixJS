function multisort(table, sortList) {
				var dynamicExp, sortWrapper, col, mx = 0, dir = 0, tc = table.config,
				l = sortList.length, bl = table.tBodies.length,
				sortTime, i, j, k, c, cache, lc, s, e, order, orgOrderCol;
				if (tc.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					dynamicExp = "sortWrapper = function(a,b) {";
					cache = tc.cache[k];
					lc = cache.normalized.length;
					for (i = 0; i < l; i++) {
						c = sortList[i][0];
						order = sortList[i][1];
						// fallback to natural sort since it is more robust
						s = /n/i.test(getCachedSortType(tc.parsers, c)) ? "Numeric" : "Text";
						s += order === 0 ? "" : "Desc";
						e = "e" + i;
						// get max column value (ignore sign)
						if (/Numeric/.test(s) && tc.strings[c]) {
							for (j = 0; j < lc; j++) {
								col = Math.abs(parseFloat(cache.normalized[j][c]));
								mx = Math.max( mx, isNaN(col) ? 0 : col );
							}
							// sort strings in numerical columns
							if (typeof(tc.string[tc.strings[c]]) === 'boolean') {
								dir = (order === 0 ? 1 : -1) * (tc.string[tc.strings[c]] ? -1 : 1);
							} else {
								dir = (tc.strings[c]) ? tc.string[tc.strings[c]] || 0 : 0;
							}
						}
						dynamicExp += "var " + e + " = $.tablesorter.sort" + s + "(table,a[" + c + "],b[" + c + "]," + c + "," + mx +  "," + dir + "); ";
						dynamicExp += "if (" + e + ") { return " + e + "; } ";
						dynamicExp += "else { ";
					}
					// if value is the same keep orignal order
					orgOrderCol = (cache.normalized && cache.normalized[0]) ? cache.normalized[0].length - 1 : 0;
					dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
					for (i=0; i < l; i++) {
						dynamicExp += "}; ";
					}
					dynamicExp += "return 0; ";
					dynamicExp += "}; ";
					cache.normalized.sort(eval(dynamicExp)); // sort using eval expression
				}
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time", sortTime); }
			}