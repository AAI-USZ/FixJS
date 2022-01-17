function (val) {
					// write out who this is
					var item = Doc.findOne({
							name : val
						}),
						focus = item;

					// get parent ...

					while (focus.parents &&
						( !focus.childDocs || !focus.childDocs.length || /static|prototype/i.test(focus.type) )) {
						focus = Doc.findOne({name : focus.parents[0]})
					}
					var path = [focus], curParent = focus;
					while (curParent.parents && curParent.parents.length) {
						curParent = Doc.findOne({name : curParent.parents[0]});
						path.unshift(curParent);
					}

					// get all children ....
					var list = focus.children().slice(0),
						i = 0,
						args,
						children,
						hasStaticOrPrototype = false;
					// get static children notes
					while (i < list.length) {
						// if we have static or prototype, we need to insert those into the
						// list after the prototype
						if (/static|prototype/.test(list[i].type)) {
							args = [i + 1, 0];
							children = list[i].children()
							args.push.apply(args, children);
							list.splice.apply(list, args);
							i = i + children.length + 1;
							hasStaticOrPrototype = true;
						} else {
							i++;
						}
					}

					// get selected parents ...

					// make list's html:

					this.element.html("//documentjs/jmvcdoc/nav/views/results.ejs", {
						list : list,
						selected : path,
						hide : false,
						hasStaticOrPrototype : hasStaticOrPrototype
					}, DocumentationHelpers);

					// highlight selected guy ...
					steal.html.ready();
				}