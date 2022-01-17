function (element, formatters) {

        element = $(element);

        var type = typeOf(element);



        if (type == 'textnode' || type == 'whitespace') {

            return element.nodeValue;

        }



        var tagName = element.get('tag');



        var context = [];

        var contextProperty = element.getProperty('data-context');

        if (contextProperty) {

            context = [this.context(contextProperty)];

        }



        var formatter = formatters ? formatters[element.getProperty('data-formatter')] : null;



        var childTemplates = [];

        var bindProperty = element.getProperty('data-bind');

        if (bindProperty) {

            childTemplates = [this.bind(this._extractProperties(bindProperty), formatter)];

        } else if (element.childNodes) {

            var childElements = Array.from(element.childNodes);

            childTemplates = childElements.map(function (x) { return this.fromElement(x, formatters); }, this);

        }



        var listProperty = element.getProperty('data-list');

        if (listProperty) {

            var listProperties = this._extractProperties(listProperty);

            var t = this.fromElement(element.getChildren()[0], formatters);

            if (typeOf(listProperties) == 'array') {

                childTemplates = [this.list(listProperties[0], t, listProperties[1])];

            }

            else {

                childTemplates = [this.list(listProperty, t)];

            }

        }



        var attributes = Array.from(element.attributes).map(function (attr) { return attr.name; });

        var options = element.getProperties.apply(element, attributes);



        // data-bind-*

        Object.each(options, function (item, key) {

            var match = key.match(/data-bind-(.*)/);

            if (match && match.length == 2) {

                options[match[1]] = this.bind(this._extractProperties(item), formatter);

            }

        }, this);



        // data-style-*

        Object.each(options, function (item, key) {

            var match = key.match(/data-style-(.*)/);

            if (match && match.length == 2) {

                childTemplates.push(this.cssStyle(this._extractProperties(item), match[1], formatter));

            }

        }, this);



        var displayProperty = element.getProperty('data-display');

        if (displayProperty) {

            childTemplates.push(this.display(displayProperty, formatter));

        }



        var templateProperty = element.getProperty('data-template');

        if (templateProperty) {

            childTemplates.push(this.template(templateProperty));

        }



        var id = options.id;

        options = Object.filter(options, function (value, key) { return value && !['data-formatter', 'data-context', 'id', 'data-list', 'data-template'].contains(key) && !key.contains('data-bind') && !key.contains('data-style'); });



        var args = [tagName].append(context).append([options]).append(childTemplates);

        var tmpl = this.tag.apply(this, args);

        if (id) {

            this.templates[id] = tmpl;

        }



        return tmpl;

    }