function () {

        var me = {},

            removeMap, addMap;



        addMap = function (map_data) {

            return m.map_cache.push(map_data) - 1;

        };

        removeMap = function (map_data) {

            m.map_cache.splice(map_data.index, 1);

            for (var i = m.map_cache.length - 1; i >= this.index; i--) {

                m.map_cache[i].index--;

            }

        };

        /// return current map_data for an image or area



        // merge new area data into existing area options. used for rebinding.

        function merge_areas(map_data, areas) {

            var ar, index,

                map_areas = map_data.options.areas;

            if (areas) {

                $.each(areas, function (i, e) {

                    

                    // Issue #68 - ignore invalid data in areas array

                    

                    if (!e || !e.key) { 

                        return;

                    }



                    index = u.indexOfProp(map_areas, "key", e.key);

                    if (index >= 0) {

                        $.extend(map_areas[index], e);

                    }

                    else {

                        map_areas.push(e);

                    }

                    ar = map_data.getDataForKey(e.key);

                    if (ar) {

                        $.extend(ar.options, e);

                    }

                });

            }

        }

        function merge_options(map_data, options) {

            var temp_opts = u.updateProps({}, options);

            delete temp_opts.areas;



            u.updateProps(map_data.options, temp_opts);



            merge_areas(map_data, options.areas);

            // refresh the area_option template

            u.updateProps(map_data.area_options, map_data.options);

        }

        // Most methods use the "Method" object which handles figuring out whether it's an image or area called and

        // parsing key parameters. The constructor wants:

        // this, the jQuery object

        // a function that is called when an image was passed (with a this context of the MapData)

        // a function that is called when an area was passed (with a this context of the AreaData)

        // options: first = true means only the first member of a jQuery object is handled

        //          key = the key parameters passed

        //          defaultReturn: a value to return other than the jQuery object (if its not chainable)

        //          args: the arguments

        // Returns a comma-separated list of user-selected areas. "staticState" areas are not considered selected for the purposes of this method.

        me.get = function (key) {

            var md = m.getMapData(this);

            if (!(md && md.complete)) {

                throw("Can't access data until binding complete.");

            }



            return (new m.Method(this,

                function () {

                    // map_data return

                    return this.getSelected();

                },

                function () {

                    return this.isSelected();

                },

                { name: 'get',

                    args: arguments,

                    key: key,

                    first: true,

                    allowAsync: true,

                    defaultReturn: ''

                }

            )).go();

        };

        me.data = function (key) {

            return (new m.Method(this,

                null,

                function () {

                    return this;

                },

                { name: 'data',

                    args: arguments,

                    key: key

                }

            )).go();

        };





        // Set or return highlight state.

        //  $(img).mapster('highlight') -- return highlighted area key, or null if none

        //  $(area).mapster('highlight') -- highlight an area

        //  $(img).mapster('highlight','area_key') -- highlight an area

        //  $(img).mapster('highlight',false) -- remove highlight

        me.highlight = function (key) {

            return (new m.Method(this,

                function () {

                    if (key === false) {

                        this.ensureNoHighlight();

                    } else {

                        var id = this.highlightId;

                        return id >= 0 ? this.data[id].key : null;

                    }

                },

                function () {

                    this.highlight();

                },

                { name: 'highlight',

                    args: arguments,

                    key: key,

                    first: true

                }

            )).go();

        };

        // Return the primary keys for an area or group key.

        // $(area).mapster('key')

        // includes all keys (not just primary keys)

        // $(area).mapster('key',true)

        // $(img).mapster('key','group-key')



        // $(img).mapster('key','group-key', true)

        me.keys = function(key,all) {

            var keyList=[], 

                md = m.getMapData(this);



            if (!(md && md.complete)) {

                throw("Can't access data until binding complete.");

            }





            function addUniqueKeys(ad) {

                var areas,keys=[];

                if (!all) {

                    keys.push(ad.key);

                } else {

                    areas=ad.areas();

                    $.each(areas,function(i,e) {

                        keys=keys.concat(e.keys);

                    });

                }

                $.each(keys,function(i,e) {

                    if ($.inArray(e,keyList)<0) {

                        keyList.push(e);                         

                    }

                });

            }



            if (!(md  && md.complete)) {

                return '';

            }

            if (typeof key === 'string') {

                if (all) {

                    addUniqueKeys(md.getDataForKey(key));

                } else {

                    keyList=[md.getKeysForGroup(key)];

                }

            } else {

                all = key;

                this.each(function(i,e) {

                    if (e.nodeName==='AREA') {

                        addUniqueKeys(md.getDataForArea(e));

                    }

                });

            }

            return keyList.join(',');

        



        };

        me.select = function () {

            me.set.call(this, true);

        };

        me.deselect = function () {

            me.set.call(this, false);

        };

        

        /**

         * Select or unselect areas. Areas can be identified by a single string key, a comma-separated list of keys, 

         * or an array of strings.

         * 

         * 

         * @param {boolean} selected Determines whether areas are selected or deselected

         * @param {string|string[]} key A string, comma-separated string, or array of strings indicating 

         *                              the areas to select or deselect

         * @param {object} options Rendering options to apply when selecting an area

         */ 



        me.set = function (selected, key, options) {

            var lastMap, map_data, opts=options,

                key_list, area_list; // array of unique areas passed



            function setSelection(ar) {

                if (ar) {

                    switch (selected) {

                        case true:

                            ar.addSelection(opts); break;

                        case false:

                            ar.removeSelection(true); break;

                        default:

                            ar.toggleSelection(opts); break;

                    }

                }

            }

            function addArea(ar) {

               if (ar && $.inArray(ar, area_list) < 0) {

                    area_list.push(ar);

                    key_list+=(key_list===''?'':',')+ar.key;

                }

            }

            // Clean up after a group that applied to the same map

            function finishSetForMap(map_data) {

                $.each(area_list, function (i, el) {

                    setSelection(el);

                });

                if (!selected) {

                    map_data.removeSelectionFinish();

                }

                if (map_data.options.boundList) {

                    m.setBoundListProperties(map_data.options, m.getBoundList(map_data.options, key_list), selected);

                }            

            }



            this.filter('img,area').each(function (i,e) {

                var keys;

                map_data = m.getMapData(e);



                if (map_data !== lastMap) {

                    if (lastMap) {

                       finishSetForMap(lastMap);

                    }



                    area_list = [];

                    key_list='';

                }

                

               if (map_data) {

                    keys = '';

                    if (e.nodeName.toUpperCase()==='IMG') {

                        if (!m.queueCommand(map_data, $(e), 'set', [selected, key, opts])) {

                            if (key instanceof Array) {

                                if (key.length) {

                                    keys = key.join(",");

                                }

                            }

                            else {

                                keys = key;

                            }



                            if (keys) {

                                $.each(u.split(keys), function (i,key) {

                                    addArea(map_data.getDataForKey(key.toString()));

                                    lastMap = map_data;

                                });

                            }

                        }

                    } else {

                        opts=key;

                        if (!m.queueCommand(map_data, $(e), 'set', [selected, opts])) {

                            addArea(map_data.getDataForArea(e));

                            lastMap = map_data;

                        }

                    

                    }

                }

            });

            

            if (map_data) {

               finishSetForMap(map_data);

            }



           

            return this;

        };

        me.unbind = function (preserveState) {

            return (new m.Method(this,

                function () {

                    this.clearEvents();

                    this.clearMapData(preserveState);

                    removeMap(this);

                },

                null,

                { name: 'unbind',

                    args: arguments

                }

            )).go();

        };





        // refresh options and update selection information.

        me.rebind = function (options) {

            return (new m.Method(this,

                function () {

                    var me=this;



                    me.complete=false;

                    me.configureOptions(options);

                    me.bindImages().then(function() {

                        me.buildDataset(true);

                        me.complete=true;

                    });

                    //this.redrawSelections();

                },

                null,

                {

                    name: 'rebind',

                    args: arguments

                }

            )).go();

        };

        // get options. nothing or false to get, or "true" to get effective options (versus passed options)

        me.get_options = function (key, effective) {

            var eff = u.isBool(key) ? key : effective; // allow 2nd parm as "effective" when no key

            return (new m.Method(this,

                function () {

                    var opts = $.extend({}, this.options);

                    if (eff) {

                        opts.render_select = u.updateProps(

                            {},

                            m.render_defaults,

                            opts,

                            opts.render_select);



                        opts.render_highlight = u.updateProps(

                            {},

                            m.render_defaults,

                            opts,

                            opts.render_highlight);

                    }

                    return opts;

                },

                function () {

                    return eff ? this.effectiveOptions() : this.options;

                },

                {

                    name: 'get_options',

                    args: arguments,

                    first: true,

                    allowAsync: true,

                    key: key

                }

            )).go();

        };



        // set options - pass an object with options to set,

        me.set_options = function (options) {

            return (new m.Method(this,

                function () {

                    merge_options(this, options);

                },

                null,

                {

                    name: 'set_options',

                    args: arguments

                }

            )).go();

        };

        me.unload = function () {

            var i;

            for (i = m.map_cache.length - 1; i >= 0; i--) {

                if (m.map_cache[i]) {

                    me.unbind.call($(m.map_cache[i].image));

                }

            }

            me.graphics = null;

        };



        me.snapshot = function () {

            return (new m.Method(this,

                function () {

                    $.each(this.data, function (i, e) {

                        e.selected = false;

                    });



                    this.base_canvas = this.graphics.createVisibleCanvas(this);

                    $(this.image).before(this.base_canvas);

                },

                null,

                { name: 'snapshot' }

            )).go();

        };

        // do not queue this function

        me.state = function () {

            var md, result = null;

            $(this).each(function (i,e) {

                if (e.nodeName === 'IMG') {

                    md = m.getMapData(e);

                    if (md) {

                        result = md.state();

                    }

                    return false;

                }

            });

            return result;

        };



        me.bind = function (options) {



            return this.each(function (i,e) {

                var img, map, usemap, md;



                // save ref to this image even if we can't access it yet. commands will be queued

                img = $(e);



                // sorry - your image must have border:0, things are too unpredictable otherwise.

                img.css('border', 0);



                md = m.getMapData(e);

                // if already bound completely, do a total rebind

                if (md) {

                    me.unbind.apply(img);

                    if (!md.complete) {

                        // will be queued

                        img.bind();

                        return true;

                    }

                    md = null;

                }



                // ensure it's a valid image

                // jQuery bug with Opera, results in full-url#usemap being returned from jQuery's attr.

                // So use raw getAttribute instead.

                usemap = this.getAttribute('usemap');

                map = usemap && $('map[name="' + usemap.substr(1) + '"]');

                if (!(img.is('img') && usemap && map.size() > 0)) {

                    return true;

                }



                if (!md) {

                    md = new m.MapData(this, options);



                    md.index = addMap(md);

                    md.map = map;

                    md.bindImages().then(function() {

                        md.initialize();

                    });

                }

            });

        };



        me.init = function (useCanvas) {

            var style, shapes;





            // check for excanvas explicitly - don't be fooled

            m.hasCanvas = (document.namespaces && document.namespaces.g_vml_) ? false :

                $('<canvas></canvas>')[0].getContext ? true : false;



            m.isTouch = 'ontouchstart' in document.documentElement;



            if (!(m.hasCanvas || document.namespaces)) {

                $.fn.mapster = function () {

                    return this;

                };

                return;

            }

            if (!u.isBool($.mapster.defaults.highlight)) {

                m.render_defaults.highlight = !m.isTouch;

            }



            $.extend(m.defaults, m.render_defaults,m.shared_defaults);

            $.extend(m.area_defaults, m.render_defaults,m.shared_defaults);



            // for testing/debugging, use of canvas can be forced by initializing manually with "true" or "false"

            if (u.isBool(useCanvas)) {

                m.hasCanvas = useCanvas;

            }

            if ($.browser.msie && !m.hasCanvas && !document.namespaces.v) {

                document.namespaces.add("v", "urn:schemas-microsoft-com:vml");

                style = document.createStyleSheet();

                shapes = ['shape', 'rect', 'oval', 'circ', 'fill', 'stroke', 'imagedata', 'group', 'textbox'];

                $.each(shapes,

                function (i, el) {

                    style.addRule('v\\:' + el, "behavior: url(#default#VML); antialias:true");

                });

            }



            // for safe load option

            // $(window).bind('load', function () {

            //     m.windowLoaded = true;

            //     $(m.map_cache).each(function (i,e) {

            //         if (!e.complete && e.isReadyToBind()) {

            //             e.initialize();

            //         }

            //     });

            // });





        };

        me.test = function (obj) {

            return eval(obj);

        };

        return me;

    }