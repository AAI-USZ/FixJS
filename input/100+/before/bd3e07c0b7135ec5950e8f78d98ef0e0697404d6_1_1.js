function(html, args) {

			var parser, rootNode, node, nodes, i, l, fi, fl, list, name, validate,

				blockElements, startWhiteSpaceRegExp, invalidChildren = [], isInWhiteSpacePreservedElement,

				endWhiteSpaceRegExp, allWhiteSpaceRegExp, isAllWhiteSpaceRegExp, whiteSpaceElements, children, nonEmptyElements, rootBlockName;



			args = args || {};

			matchedNodes = {};

			matchedAttributes = {};

			blockElements = tinymce.extend(tinymce.makeMap('script,style,head,html,body,title,meta,param'), schema.getBlockElements());

			nonEmptyElements = schema.getNonEmptyElements();

			children = schema.children;

			validate = settings.validate;

			rootBlockName = "forced_root_block" in args ? args.forced_root_block : settings.forced_root_block;



			whiteSpaceElements = schema.getWhiteSpaceElements();

			startWhiteSpaceRegExp = /^[ \t\r\n]+/;

			endWhiteSpaceRegExp = /[ \t\r\n]+$/;

			allWhiteSpaceRegExp = /[ \t\r\n]+/g;

			isAllWhiteSpaceRegExp = /^[ \t\r\n]+$/;



			function addRootBlocks() {

				var node = rootNode.firstChild, next, rootBlockNode;



				while (node) {

					next = node.next;



					if (node.type == 3 || (node.type == 1 && node.name !== 'p' && !blockElements[node.name] && !node.attr('data-mce-type'))) {

						if (!rootBlockNode) {

							// Create a new root block element

							rootBlockNode = createNode(rootBlockName, 1);

							rootNode.insert(rootBlockNode, node);

							rootBlockNode.append(node);

						} else

							rootBlockNode.append(node);

					} else {

						rootBlockNode = null;

					}



					node = next;

				};

			};



			function createNode(name, type) {

				var node = new Node(name, type), list;



				if (name in nodeFilters) {

					list = matchedNodes[name];



					if (list)

						list.push(node);

					else

						matchedNodes[name] = [node];

				}



				return node;

			};



			function removeWhitespaceBefore(node) {

				var textNode, textVal, sibling;



				for (textNode = node.prev; textNode && textNode.type === 3; ) {

					textVal = textNode.value.replace(endWhiteSpaceRegExp, '');



					if (textVal.length > 0) {

						textNode.value = textVal;

						textNode = textNode.prev;

					} else {

						sibling = textNode.prev;

						textNode.remove();

						textNode = sibling;

					}

				}

			};



			parser = new tinymce.html.SaxParser({

				validate : validate,

				fix_self_closing : !validate, // Let the DOM parser handle <li> in <li> or <p> in <p> for better results



				cdata: function(text) {

					node.append(createNode('#cdata', 4)).value = text;

				},



				text: function(text, raw) {

					var textNode;



					// Trim all redundant whitespace on non white space elements

					if (!isInWhiteSpacePreservedElement) {

						text = text.replace(allWhiteSpaceRegExp, ' ');



						if (node.lastChild && blockElements[node.lastChild.name])

							text = text.replace(startWhiteSpaceRegExp, '');

					}



					// Do we need to create the node

					if (text.length !== 0) {

						textNode = createNode('#text', 3);

						textNode.raw = !!raw;

						node.append(textNode).value = text;

					}

				},



				comment: function(text) {

					node.append(createNode('#comment', 8)).value = text;

				},



				pi: function(name, text) {

					node.append(createNode(name, 7)).value = text;

					removeWhitespaceBefore(node);

				},



				doctype: function(text) {

					var newNode;

		

					newNode = node.append(createNode('#doctype', 10));

					newNode.value = text;

					removeWhitespaceBefore(node);

				},



				start: function(name, attrs, empty) {

					var newNode, attrFiltersLen, elementRule, textNode, attrName, text, sibling, parent;



					elementRule = validate ? schema.getElementRule(name) : {};

					if (elementRule) {

						newNode = createNode(elementRule.outputName || name, 1);

						newNode.attributes = attrs;

						newNode.shortEnded = empty;



						node.append(newNode);



						// Check if node is valid child of the parent node is the child is

						// unknown we don't collect it since it's probably a custom element

						parent = children[node.name];

						if (parent && children[newNode.name] && !parent[newNode.name])

							invalidChildren.push(newNode);



						attrFiltersLen = attributeFilters.length;

						while (attrFiltersLen--) {

							attrName = attributeFilters[attrFiltersLen].name;



							if (attrName in attrs.map) {

								list = matchedAttributes[attrName];



								if (list)

									list.push(newNode);

								else

									matchedAttributes[attrName] = [newNode];

							}

						}



						// Trim whitespace before block

						if (blockElements[name])

							removeWhitespaceBefore(newNode);



						// Change current node if the element wasn't empty i.e not <br /> or <img />

						if (!empty)

							node = newNode;



						// Check if we are inside a whitespace preserved element

						if (!isInWhiteSpacePreservedElement && whiteSpaceElements[name]) {

							isInWhiteSpacePreservedElement = true;

						}

					}

				},



				end: function(name) {

					var textNode, elementRule, text, sibling, tempNode;



					elementRule = validate ? schema.getElementRule(name) : {};

					if (elementRule) {

						if (blockElements[name]) {

							if (!isInWhiteSpacePreservedElement) {

								// Trim whitespace of the first node in a block

								textNode = node.firstChild;

								if (textNode && textNode.type === 3) {

									text = textNode.value.replace(startWhiteSpaceRegExp, '');



									// Any characters left after trim or should we remove it

									if (text.length > 0) {

										textNode.value = text;

										textNode = textNode.next;

									} else {

										sibling = textNode.next;

										textNode.remove();

										textNode = sibling;

									}



									// Remove any pure whitespace siblings

									while (textNode && textNode.type === 3) {

										text = textNode.value;

										sibling = textNode.next;



										if (text.length === 0 || isAllWhiteSpaceRegExp.test(text)) {

											textNode.remove();

											textNode = sibling;

										}



										textNode = sibling;

									}

								}



								// Trim whitespace of the last node in a block

								textNode = node.lastChild;

								if (textNode && textNode.type === 3) {

									text = textNode.value.replace(endWhiteSpaceRegExp, '');



									// Any characters left after trim or should we remove it

									if (text.length > 0) {

										textNode.value = text;

										textNode = textNode.prev;

									} else {

										sibling = textNode.prev;

										textNode.remove();

										textNode = sibling;

									}



									// Remove any pure whitespace siblings

									while (textNode && textNode.type === 3) {

										text = textNode.value;

										sibling = textNode.prev;



										if (text.length === 0 || isAllWhiteSpaceRegExp.test(text)) {

											textNode.remove();

											textNode = sibling;

										}



										textNode = sibling;

									}

								}

							}



							// Trim start white space

							textNode = node.prev;

							if (textNode && textNode.type === 3) {

								text = textNode.value.replace(startWhiteSpaceRegExp, '');



								if (text.length > 0)

									textNode.value = text;

								else

									textNode.remove();

							}

						}



						// Check if we exited a whitespace preserved element

						if (isInWhiteSpacePreservedElement && whiteSpaceElements[name]) {

							isInWhiteSpacePreservedElement = false;

						}



						// Handle empty nodes

						if (elementRule.removeEmpty || elementRule.paddEmpty) {

							if (node.isEmpty(nonEmptyElements)) {

								if (elementRule.paddEmpty)

									node.empty().append(new Node('#text', '3')).value = '\u00a0';

								else {

									// Leave nodes that have a name like <a name="name">

									if (!node.attributes.map.name) {

										tempNode = node.parent;

										node.empty().remove();

										node = tempNode;

										return;

									}

								}

							}

						}



						node = node.parent;

					}

				}

			}, schema);



			rootNode = node = new Node(args.context || settings.root_name, 11);



			parser.parse(html);



			// Fix invalid children or report invalid children in a contextual parsing

			if (validate && invalidChildren.length) {

				if (!args.context)

					fixInvalidChildren(invalidChildren);

				else

					args.invalid = true;

			}



			// Wrap nodes in the root into block elements if the root is body

			if (rootBlockName && rootNode.name == 'body')

				addRootBlocks();



			// Run filters only when the contents is valid

			if (!args.invalid) {

				// Run node filters

				for (name in matchedNodes) {

					list = nodeFilters[name];

					nodes = matchedNodes[name];



					// Remove already removed children

					fi = nodes.length;

					while (fi--) {

						if (!nodes[fi].parent)

							nodes.splice(fi, 1);

					}



					for (i = 0, l = list.length; i < l; i++)

						list[i](nodes, name, args);

				}



				// Run attribute filters

				for (i = 0, l = attributeFilters.length; i < l; i++) {

					list = attributeFilters[i];



					if (list.name in matchedAttributes) {

						nodes = matchedAttributes[list.name];



						// Remove already removed children

						fi = nodes.length;

						while (fi--) {

							if (!nodes[fi].parent)

								nodes.splice(fi, 1);

						}



						for (fi = 0, fl = list.callbacks.length; fi < fl; fi++)

							list.callbacks[fi](nodes, list.name, args);

					}

				}

			}



			return rootNode;

		}