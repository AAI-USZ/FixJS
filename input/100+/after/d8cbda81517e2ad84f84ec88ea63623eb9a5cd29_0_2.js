function (data) {
                var panel_container = selector + ' .OG-gadget-container', new_gadgets, arr;
                if (!loading && !initialized)
                    return container.init(), setTimeout(container.add.partial(data || null), 10), container;
                if (!initialized) return setTimeout(container.add.partial(data || null), 10), container;
                if (!data) return container; // no gadgets for this container
                if (!selector) throw new TypeError('GadgetsContainer has not been initialized');
                var generate_arr = function (data) { // create gadgets object array from url args using default settings
                    var obj, type, gadgets = [], options = {};
                    obj = data.split(';').reduce(function (acc, val) {
                        var data = val.split(':');
                        acc[data[0]] = data[1].split(',');
                        return acc;
                    }, {});
                    // TODO: move default options to gadgets
                    options.timeseries = function (id) {
                        return {
                            gadget: 'og.common.gadgets.timeseries',
                            options: {id: id, datapoints_link: false, child: true},
                            name: 'Timeseries ' + id,
                            margin: true
                        }
                    };
                    options.grid = function (id) {
                        return {gadget: 'og.analytics.Grid', name: 'grid ' + id, options: {}}
                    };
                    for (type in obj) if (obj.hasOwnProperty(type))
                        obj[type].forEach(function (val) {gadgets.push(options[type](val));});
                    return gadgets;
                };
                arr = typeof data === 'string' ? generate_arr(data) : data;
                new_gadgets = arr.map(function (obj) {
                    var id, gadget_class = 'OG-gadget-' + (id = counter++), gadget,
                        gadget_selector = panel_container + ' .' + gadget_class,
                        options = $.extend(true, obj.options || {}, {selector: gadget_selector}),
                        constructor = obj.gadget.split('.').reduce(function (acc, val) {return acc[val];}, window),
                        type = obj.gadget.replace(/^[a-z0-9.-_]+\.([a-z0-9.-_]+?)$/, '$1').toLowerCase();
                    $(panel_container)
                        .append('<div class="' + gadget_class + '" />')
                        .find('.' + gadget_class)
                        .css({height: '100%', margin: obj.margin ? 10 : 0});
                    gadgets.push(gadget = {id: id, config: obj, type: type, gadget: new constructor(options)});
                    return gadget;
                });
                update_tabs(new_gadgets[new_gadgets.length - 1].id);
                return container;
            }