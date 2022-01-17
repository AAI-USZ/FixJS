function parseTokens(all, lftPrn0, lftPrn, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, prn2, space) {
			// rParams = /(?:([([])\s*)?(?:([#~]?[\w$.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g,
			//            lftPrn                  path    operator err                                                eq         path2       prn    comma   lftPrn3   apos quot        rtPrn   prn2   space
			// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
			operator = operator || "";
			lftPrn = lftPrn || lftPrn0 || lftPrn2;
			path = path || path2;
			prn = prn || prn2 || "";
			operator = operator || "";
			var bindParam = bind && prn !== "(";

			function parsePath(all, object, helper, view, viewProperty, pathTokens, leafToken) {
				// rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.]*?)(?:[.[]([\w$]+)\]?)?|(['"]).*\8)$/g,
				//                                        object   helper    view  viewProperty pathTokens   leafToken     string
				if (object) {
					var leaf,
						ret = (helper
							? 'view._hlp("' + helper + '")'
							: view
								? "view"
								: "data")
						+ (leafToken
							? (viewProperty
								? "." + viewProperty
								: helper
									? ""
									: (view ? "" : "." + object)
								) + (pathTokens || "")
							: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

					leaf = (leafToken ? "." + leafToken : "")
					if (!bindParam) {
						ret = ret + leaf;
					}
					ret = ret.slice(0, 9) === "view.data"
					? ret.slice(5) // convert #view.data... to data...
					: ret;
					if (bindParam) {
						ret = "b(" + ret + ',"' + leafToken + '")' + leaf;
					}
					return ret;
				}
				return all;
			}

			if (err) {
				syntaxError();
			} else {
				return (aposed
				// within single-quoted string
				? (aposed = !apos, (aposed ? all : '"'))
				: quoted
				// within double-quoted string
					? (quoted = !quot, (quoted ? all : '"'))
					:
				(
					(lftPrn
							? (parenDepth++, lftPrn)
							: "")
					+ (space
						? (parenDepth
							? ""
							: named
								? (named = FALSE, "\b")
								: ","
						)
						: eq
				// named param
							? (parenDepth && syntaxError(), named = TRUE, '\b' + path + ':')
							: path
				// path
								? (path.replace(rPath, parsePath)
									+ (prn
										? (fnCall[++parenDepth] = TRUE, prn)
										: operator)
								)
								: operator
									? operator
									: rtPrn
				// function
										? ((fnCall[parenDepth--] = FALSE, rtPrn)
											+ (prn
												? (fnCall[++parenDepth] = TRUE, prn)
												: "")
										)
										: comma
											? (fnCall[parenDepth] || syntaxError(), ",") // We don't allow top-level literal arrays or objects
											: lftPrn0
												? ""
												: (aposed = apos, quoted = quot, '"')
				))
			);
			}
		}