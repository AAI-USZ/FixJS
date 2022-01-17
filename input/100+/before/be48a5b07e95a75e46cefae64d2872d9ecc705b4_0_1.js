function(err, opts) {
                //console.log(opts);
                if (err) {
                    console.log(err);
                }
                opts.meta = Y.merge(opts.meta, data);

                opts.meta.title = self.data.project.name;
                opts.meta.moduleName = data.name;
                opts.meta.file = data.file;
                opts.meta.line = data.line;
                opts.meta = self.addFoundAt(opts.meta);
                opts.meta.projectRoot = '../';
                opts.meta.projectAssets = '../assets';

                opts = self.populateClasses(opts);
                opts = self.populateModules(opts);
                opts = self.populateFiles(opts);

                opts.meta.classDescription = self._parseCode(self.markdown(data.description || ' '));

                opts.meta.methods = [];
                opts.meta.properties = [];
                opts.meta.attrs = [];
                opts.meta.events = [];
                opts.meta.extension_for = null;
                if (data.uses) {
                    opts.meta.uses = data.uses;
                }
                if (data.entension_for && data.extension_for.length) {
                    opts.meta.extension_for = data.extension_for;
                }

                if (data.extends) {
                    opts.meta.extends = data.extends;
                }

                var classItems = [];
                self.data.classitems.forEach(function(i) {
                    if (i.class === data.name) {
                        classItems.push(i);
                    }
                });

                classItems = self.mergeExtends(data, classItems);

                if (data.is_constructor) {
                    var i = Y.mix({}, data);
                    i = self.augmentData(i);
                    i.paramsList = [];
                    if (i.params) {
                        i.params.forEach(function(p, v) {
                            var name = p.name;
                            if (p.optional) {
                                name = '[' + name + ((p.optdefault) ? '=' + p.optdefault : '') + ']'
                            }
                            i.paramsList.push(name);
                        });
                    }
                    //i.methodDescription = self._parseCode(markdown(i.description));
                    i.hasAccessType = i.access;
                    i.hasParams = i.paramsList.length;
                    if (i.paramsList.length) {
                        i.paramsList = i.paramsList.join(', ');
                    } else {
                        i.paramsList = ' ';
                    }
                    i.returnType = ' ';
                    if (i.return) {
                        i.hasReturn = true;
                        i.returnType = i.return.type;
                    }
                    //console.error(i);
                    opts.meta.is_constructor = [i];
                    if (i.example && i.example.length) {
                        if (i.example.forEach) {
                            var e = '';
                            i.example.forEach(function(v) {
                                e += self._parseCode(self.markdown(v));
                            });
                            i.example = e;
                        } else {
                            i.example = self._parseCode(self.markdown(i.example));
                        }
                    }
                }

                classItems.forEach(function(i) {
                    switch (i.itemtype) {
                        case 'method':
                            i = self.augmentData(i);
                            i.paramsList = [];
                            if (i.params && i.params.forEach) {
                                i.params.forEach(function(p, v) {
                                    var name = p.name;
                                    if (p.optional) {
                                        name = '[' + name + ((p.optdefault) ? '=' + p.optdefault : '') + ']'
                                    }
                                    i.paramsList.push(name);
                                });
                            }
                            //i.methodDescription = self._parseCode(markdown(i.description || ''));
                            i.methodDescription = self._parseCode(i.description);
                            if (i.example && i.example.length) {
                                if (i.example.forEach) {
                                    var e = '';
                                    i.example.forEach(function(v) {
                                        e += self._parseCode(self.markdown(v));
                                    });
                                    i.example = e;
                                } else {
                                    i.example = self._parseCode(self.markdown(i.example));
                                }
                            }
                            i.hasAccessType = i.access;
                            i.hasParams = i.paramsList.length;
                            if (i.paramsList.length) {
                                i.paramsList = i.paramsList.join(', ');
                            } else {
                                i.paramsList = ' ';
                            }
                            i.returnType = ' ';
                            if (i.return) {
                                i.hasReturn = true;
                                i.returnType = i.return.type;
                            }

                            // If this item is provided by a module other
                            // than the module that provided the original
                            // class, add the original module name to the
                            // item's `providedBy` property so we can
                            // indicate the relationship.
                            if ((i.submodule || i.module) !== (data.submodule || data.module)) {
                                i.providedBy = (i.submodule || i.module);
                            }

                            opts.meta.methods.push(i);
                            break;
                        case 'property':
                            i = self.augmentData(i);
                            //i.propertyDescription = self._parseCode(markdown(i.description || ''));
                            i.propertyDescription = self._parseCode(i.description);
                            if (!i.type) {
                                i.type = 'unknown';
                            }
                            if (i.final === '') {
                                i.final = true;
                            }
                            if (i.example && i.example.length) {
                                if (i.example.forEach) {
                                    var e = '';
                                    i.example.forEach(function(v) {
                                        e += self._parseCode(self.markdown(v));
                                    });
                                    i.example = e;
                                } else {
                                    i.example = self._parseCode(self.markdown(i.example));
                                }
                            }

                            // If this item is provided by a module other
                            // than the module that provided the original
                            // class, add the original module name to the
                            // item's `providedBy` property so we can
                            // indicate the relationship.
                            if ((i.submodule || i.module) !== (data.submodule || data.module)) {
                                i.providedBy = (i.submodule || i.module);
                            }

                            opts.meta.properties.push(i);
                            break;

                        case 'attribute': // fallthru
                        case 'config':
                            i = self.augmentData(i);
                            //i.attrDescription = self._parseCode(markdown(i.description || ''));
                            i.attrDescription = self._parseCode(i.description);

                            if (i.itemtype === 'config') {
                                i.config = true;
                            } else {
                                i.emit = self.options.attributesEmit;
                            }

                            if (i.example && i.example.length) {
                                if (i.example.forEach) {
                                    var e = '';
                                    i.example.forEach(function(v) {
                                        e += self._parseCode(self.markdown(v));
                                    });
                                    i.example = e;
                                } else {
                                    i.example = self._parseCode(self.markdown(i.example));
                                }
                            }

                            // If this item is provided by a module other
                            // than the module that provided the original
                            // class, add the original module name to the
                            // item's `providedBy` property so we can
                            // indicate the relationship.
                            if ((i.submodule || i.module) !== (data.submodule || data.module)) {
                                i.providedBy = (i.submodule || i.module);
                            }

                            opts.meta.attrs.push(i);
                            break;
                        case 'event':
                            i = self.augmentData(i);
                            //i.eventDescription = self._parseCode(markdown(i.description || ''));
                            i.eventDescription = self._parseCode(i.description);

                            if (i.example && i.example.length) {
                                if (i.example.forEach) {
                                    var e = '';
                                    i.example.forEach(function(v) {
                                        e += self._parseCode(self.markdown(v));
                                    });
                                    i.example = e;
                                } else {
                                    i.example = self._parseCode(self.markdown(i.example));
                                }
                            }

                            // If this item is provided by a module other
                            // than the module that provided the original
                            // class, add the original module name to the
                            // item's `providedBy` property so we can
                            // indicate the relationship.
                            if ((i.submodule || i.module) !== (data.submodule || data.module)) {
                                i.providedBy = (i.submodule || i.module);
                            }

                            opts.meta.events.push(i);
                            break;
                    }
                });

                opts.meta.attrs.sort(self.nameSort);
                opts.meta.events.sort(self.nameSort);
                opts.meta.methods.sort(self.nameSort);
                opts.meta.properties.sort(self.nameSort);

                if (!opts.meta.methods.length) {
                    delete opts.meta.methods;
                }
                if (!opts.meta.properties.length) {
                    delete opts.meta.properties;
                }
                if (!opts.meta.attrs.length) {
                    delete opts.meta.attrs;
                }
                if (!opts.meta.events.length) {
                    delete opts.meta.events;
                }

                var view   = new Y.DocView(opts.meta);
                var mainLayout = opts.layouts[layout];
                self.render('{{>classes}}', view, mainLayout, opts.partials, stack.add(function(err, html) {
                    self.files++;
                    stack.html = html;
                    stack.view = view;
                    stack.opts = opts;
                }));
            }