function(id, options, values) {
    var self = this,
		templater,
		init,
		initialItems,
		Item,
		Templater,
		sortButtons,
		events = {
		    'updated': []
		};
    this.listContainer = (typeof(id) == 'string') ? document.getElementById(id) : id;
    // Check if the container exists. If not return instead of breaking the javascript
    if (!this.listContainer)
        return;
    
    this.items = [];
    this.visibleItems = []; // These are the items currently visible
    this.matchingItems = []; // These are the items currently matching filters and search, regadlessof visible count
    this.searched = false;
    this.filtered = false;

    this.list = null;
    this.templateEngines = {};
    
    this.page = options.page || 200;
    this.i = options.i || 1;

    init = {
        start: function(values, options) {
            options.plugins = options.plugins || {};
            this.classes(options);
            templater = new Templater(self, options);
            this.callbacks(options);
            this.items.start(values, options);
            self.update();
            this.plugins(options.plugins);
        },
        classes: function(options) {
            options.listClass = options.listClass || 'list';
            options.searchClass = options.searchClass || 'search';
            options.sortClass = options.sortClass || 'sort';
        },
        callbacks: function(options) {
            self.list = h.getByClass(options.listClass, self.listContainer, true);
            h.addEvent(h.getByClass(options.searchClass, self.listContainer), 'keyup', self.search);
            sortButtons = h.getByClass(options.sortClass, self.listContainer);
            h.addEvent(sortButtons, 'click', self.sort);
        },
        items: {
            start: function(values, options) {
                if (options.valueNames) {
                    var itemsToIndex = this.get(),
                    valueNames = options.valueNames;
                    if (options.indexAsync) {
                        this.indexAsync(itemsToIndex, valueNames);
                    } else {
                        this.index(itemsToIndex, valueNames);
                    }
                }
                if (values !== undefined) {
                    self.add(values);
                }
            },
            get: function() {
                // return h.getByClass('item', self.list);
                var nodes = self.list.childNodes,
                items = [];
                for (var i = 0, il = nodes.length; i < il; i++) {
                    // Only textnodes have a data attribute
                    if (nodes[i].data === undefined) {
                        items.push(nodes[i]);
                    }
                }
                return items;
            },
            index: function(itemElements, valueNames) {
                for (var i = 0, il = itemElements.length; i < il; i++) {
                    self.items.push(new Item(valueNames, itemElements[i]));
                }
            },
            indexAsync: function(itemElements, valueNames) {
                var itemsToIndex = itemElements.splice(0, 100); // TODO: If < 100 items, what happens in IE etc?
                this.index(itemsToIndex, valueNames);
                if (itemElements.length > 0) {
                    setTimeout(function() {
                        init.items.indexAsync(itemElements, valueNames);
                        },
                    10);
                } else {
                    self.update();
                    // TODO: Add indexed callback
                }
            }
        },
        plugins: function(plugins) {
            for (var i = 0; i < plugins.length; i++) {
                var pluginName = plugins[i][1].name || plugins[i][0];
                self[pluginName] = new self.plugins[plugins[i][0]](self, plugins[i][1]);
            }
        }
    };


    /*
    * Add object to list
    */
    this.add = function(values, callback) {
        if (callback) {
            addAsync(values, callback);
        }
        var added = [],
            notCreate = false;
        if (values[0] === undefined){
            values = [values];
        }
        for (var i = 0, il = values.length; i < il; i++) {
            var item = null;
            if (values[i] instanceof Item) {
                item = values[i];
                item.reload();
            } else {
                notCreate = (self.items.length > self.page) ? true : false;
                item = new Item(values[i], undefined, notCreate);
            }
            self.items.push(item);
            added.push(item);
        }
        self.update();
        return added;
    };

    /*
    * Adds items asynchronous to the list, good for adding huge amount of
    * data. Defaults to add 100 items a time
    */
    var addAsync = function(values, callback, items) {
        var valuesToAdd = values.splice(0, 100);
        items = items || [];
        items = items.concat(self.add(valuesToAdd));
        if (values.length > 0) {
            setTimeout(function() {
                addAsync(values, callback, items);
            }, 10);
        } else {
            self.update();
            callback(items);
        }
    };

	this.show = function(i, page) {
		this.i = i;
		this.page = page;
		self.update();
	};

    /* Removes object from list.
    * Loops through the list and removes objects where
    * property "valuename" === value
    */
    this.remove = function(valueName, value, options) {
        var found = 0;
        for (var i = 0, il = self.items.length; i < il; i++) {
            if (self.items[i].values()[valueName] == value) {
                templater.remove(self.items[i], options);
                self.items.splice(i,1);
                il--;
                found++;
            }
        }
        self.update();
        return found;
    };

    /* Gets the objects in the list which
    * property "valueName" === value
    */
    this.get = function(valueName, value) {
        var matchedItems = [];
        for (var i = 0, il = self.items.length; i < il; i++) {
            var item = self.items[i];
            if (item.values()[valueName] == value) {
                matchedItems.push(item);
            }
        }
        if (matchedItems.length == 0) {
            return null;
        } else if (matchedItems.length == 1) {
            return matchedItems[0];
        } else {
            return matchedItems;
        }
    };

    /* Sorts the list.
    * @valueOrEvent Either a JavaScript event object or a valueName
    * @sortFunction (optional) Define if natural sorting does not fullfill your needs
    */
    this.sort = function(valueName, options) {
        var length = self.items.length,
            value = null,
            target = valueName.target || valueName.srcElement, /* IE have srcElement */
            sorting = '',
            isAsc = false,
            asc = 'asc',
            desc = 'desc',
            options = options || {};

        if (target === undefined) {
            value = valueName;
            isAsc = options.asc || false;
        } else {
            value = h.getAttribute(target, 'data-sort');
            isAsc = h.hasClass(target, asc) ? false : true;
        }
        for (var i = 0, il = sortButtons.length; i < il; i++) {
            h.removeClass(sortButtons[i], asc);
            h.removeClass(sortButtons[i], desc);
        }
        if (isAsc) {
            if (target !== undefined) {
                h.addClass(target, asc);
            }
            isAsc = true;
        } else {
            if (target !== undefined) {
                h.addClass(target, desc);
            }
            isAsc = false;
        }

        if (options.sortFunction) {
            options.sortFunction = options.sortFunction;
        } else {
            options.sortFunction = function(a, b) {
                return h.sorter.alphanum(a.values()[value], b.values()[value], isAsc);
            };
        }
        self.items.sort(options.sortFunction);
        self.update();
    };

    /*
    * Searches the list after values with content "searchStringOrEvent".
    * The columns parameter defines if all values should be included in the search,
    * defaults to undefined which means "all".
    */
    this.search = function(searchString, columns) {
        self.i = 1; // Reset paging
        var matching = [],
            found,
            item,
            text,
            values,
            is,
            columns = (columns === undefined) ? self.items[0].values() : columns,
            searchString = (searchString === undefined) ? "" : searchString,
            target = searchString.target || searchString.srcElement; /* IE have srcElement */

        searchString = (target === undefined) ? (""+searchString).toLowerCase() : ""+target.value.toLowerCase();
        is = self.items;
        // Escape regular expression characters
        searchString = searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        templater.clear();
        if (searchString === "" ) {
            reset.search();
            self.searched = false;
            self.update();
        } else {
            self.searched = true;

            for (var k = 0, kl = is.length; k < kl; k++) {
                found = false;
                item = is[k];
                values = item.values();

                for(var j in columns) {
                    if(values.hasOwnProperty(j) && columns[j] !== null) {
                        text = (values[j] != null) ? values[j].toString().toLowerCase() : "";
                        if ((searchString !== "") && (text.search(searchString) > -1)) {
                            found = true;
                        }
                    }
                }
                if (found) {
                    item.found = true;
                    matching.push(item);
                } else {
                    item.found = false;
                }
            }
            self.update();
        }
        return self.visibleItems;
    };

    /*
    * Filters the list. If filterFunction() returns False hides the Item.
    * if filterFunction == false are the filter removed
    */
    this.filter = function(filterFunction) {
        self.i = 1; // Reset paging
        var matching = undefined;
        reset.filter();
        if (filterFunction === undefined) {
            self.filtered = false;
        } else {
            matching = [];
            self.filtered = true;
            var is = self.items;
            for (var i = 0, il = is.length; i < il; i++) {
                var item = is[i];
                if (filterFunction(item)) {
                    item.filtered = true;
                    matching.push(item);
                } else {
                    item.filtered = false;
                }
            }
        }
        self.update();
        return self.visibleItems;
    };

    /*
    * Get size of the list
    */
    this.size = function() {
        return self.items.length;
    };

    /*
    * Removes all items from the list
    */
    this.clear = function() {
        templater.clear();
        self.items = [];
    };

    this.on = function(event, callback) {
        events[event].push(callback);
    };

    var trigger = function(event) {
        var i = events[event].length;
        while(i--) {
            events[event][i]();
        }
    };

    var reset = {
        filter: function() {
            var is = self.items,
                il = is.length;
            while (il--) {
                is[il].filtered = false;
            }
        },
        search: function() {
            var is = self.items,
                il = is.length;
            while (il--) {
                is[il].found = false;
            }
        }
    };


    this.update = function() {
        var is = self.items,
			il = is.length;

        self.visibleItems = [];
        self.matchingItems = [];
        templater.clear();
        for (var i = 0; i < il; i++) {
            if (is[i].matching() && ((i+1) >= self.i && self.visibleItems.length < self.page)) {
                is[i].show();
                self.visibleItems.push(is[i]);
                self.matchingItems.push(is[i]);
			} else if (is[i].matching()) {
                self.matchingItems.push(is[i]);
                is[i].hide();
			} else {
                is[i].hide();
			}
        }
        trigger('updated');
    };

    Item = function(initValues, element, notCreate) {
        var item = this,
            values = {};

        this.found = false; // Show if list.searched == true and this.found == true
        this.filtered = false;// Show if list.filtered == true and this.filtered == true

        var init = function(initValues, element, notCreate) {
            if (element === undefined) {
                if (notCreate) {
                    item.values(initValues, notCreate);
                } else {
                    item.values(initValues);
                }
            } else {
                item.elm = element;
                var values = templater.get(item, initValues);
                item.values(values);
            }
        };
        this.values = function(newValues, notCreate) {
            if (newValues !== undefined) {
                for(var name in newValues) {
                    values[name] = newValues[name];
                }
                if (notCreate !== true) {
                    templater.set(item, item.values());
                }
            } else {
                return values;
            }
        };
        this.show = function() {
            templater.show(item);
        };
        this.hide = function() {
            templater.hide(item);
        };
        this.matching = function() {
            return (
                (self.filtered && self.searched && item.found && item.filtered) ||
               	(self.filtered && !self.searched && item.filtered) ||
                (!self.filtered && self.searched && item.found) ||
                (!self.filtered && !self.searched)
            );
        };
        this.visible = function() {
            return (item.elm.parentNode) ? true : false;
        };
        init(initValues, element, notCreate);
    };

    /* Templater with different kinds of template engines.
    * All engines have these methods
    * - reload(item)
    * - remove(item)
    */
    Templater = function(list, settings) {
        if (settings.engine === undefined) {
            settings.engine = "standard";
        } else {
            settings.engine = settings.engine.toLowerCase();
        }
        return new self.constructor.prototype.templateEngines[settings.engine](list, settings);
    };

    init.start(values, options);
}