function (Y) {

/**
 * Provides a plugin, which adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */
var getClassName = Y.ClassNameManager.getClassName,
    SCROLLVIEW = 'scrollview',
    CLASS_HIDDEN = getClassName(SCROLLVIEW, 'hidden'),
    CLASS_PAGED = getClassName(SCROLLVIEW, 'paged'),
    UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : "ui",
    INDEX = "index",
    SCROLL_X = "scrollX",
    SCROLL_Y = "scrollY",
    TOTAL = "total",
    HOST = "host",
    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",
    SELECTOR = "selector",
    FLICK = "flick",
    DRAG = "drag",

    DIM_X = "x",
    DIM_Y = "y",
    AXIS = 'axis';

/**
 * Scrollview plugin that adds support for paging
 *
 * @class ScrollViewPaginator
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 */
function PaginatorPlugin() {
    PaginatorPlugin.superclass.constructor.apply(this, arguments);
}

/**
 * The identity of the plugin
 *
 * @property NAME
 * @type String
 * @default 'paginatorPlugin'
 * @static
 */
PaginatorPlugin.NAME = 'pluginScrollViewPaginator';

/**
 * The namespace on which the plugin will reside
 *
 * @property NS
 * @type String
 * @default 'pages'
 * @static
 */
PaginatorPlugin.NS = 'pages';

/**
 * The default attribute configuration for the plugin
 *
 * @property ATTRS
 * @type Object
 * @static
 */
PaginatorPlugin.ATTRS = {

    /**
     * CSS selector for a page inside the scrollview. The scrollview
     * will snap to the closest page.
     *
     * @attribute selector
     * @type {String}
     */
    selector: {
        value: null
    },

    /**
     * The active page number for a paged scrollview
     *
     * @attribute index
     * @type {Number}
     * @default 0
     */
    index: {
        value: 0
    },

    /**
     * The total number of pages
     *
     * @attribute total
     * @type {Number}
     * @default 0
     */
    total: {
        value: 0
    },

    // TODO
    axis: {
        value: 'x'
    }
};

Y.extend(PaginatorPlugin, Y.Plugin.Base, {

    optimizeMemory: true,
    padding: 1,
    _uiEnabled: true,
    _prevent: new Y.Do.Prevent(),
    cards: [],
    _cIndex: 0,

    /**
     * Designated initializer
     *
     * @method initializer
     */
    initializer: function (config) {
        var paginator = this,
            host = paginator.get(HOST),
            bb = host.get(BOUNDING_BOX),
            cb = host.get(CONTENT_BOX),
            hostFlick = host.get(FLICK),
            optimizeMemory = config.optimizeMemory || paginator.optimizeMemory,
            padding = config.padding || paginator.padding;

        paginator.set(AXIS, config.axis);

        // Don't allow flicks on the paginated axis
        if (config.axis === DIM_X) {
            hostFlick.axis = DIM_Y;
            // host.set(FLICK, hostFlick);
        }
        else if (config.axis === DIM_Y) {
            hostFlick.axis = DIM_X;
            // host.set(FLICK, hostFlick);
        }

        paginator._bb = bb;
        paginator._cb = cb;
        paginator._host = host;

        paginator.padding = padding;
        paginator.optimizeMemory = optimizeMemory;

host.on('scrollEnd', function(){console.log('scrollEnded');})

        // Event listeners        
        paginator.after('indexChange', paginator._afterIndexChange);

        // Method listeners
        paginator.beforeHostMethod('scrollTo', paginator._onScrollTo);
        paginator.beforeHostMethod('_mousewheel', paginator._beforeHostMousewheel);

        paginator.afterHostMethod('_onGestureMoveEnd', paginator._gestureMoveEnd);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        
        paginator.afterHostEvent('render', paginator._afterHostRender);
        paginator.afterHostEvent('scrollEnd', paginator._scrollEnded);
    },

    /**
     * After host render handler
     *
     * @method _afterHostRender
     * @param {Event.Facade}
        * @protected
     */
    _afterHostRender: function (e) {
        // console.log('_afterHostRender');
        var paginator = this,
            bb = paginator._bb;
            host = paginator._host,
            index = paginator._cIndex,
            maxScrollY = paginator.cards[index].maxScrollY;

        // Set the max height base can scroll to
        host._maxScrollY = maxScrollY;

        // Add the paginator class
        bb.addClass(CLASS_PAGED);
    },

    /**
     * After host _uiDimensionsChange
     *
     * @method _afterHostUIDimensionsChange
     * @param {Event.Facade}
     * @protected
     */
    _afterHostUIDimensionsChange: function(e) {
        var paginator = this,
            host = paginator._host,
            bb = paginator._bb,
            widgetHeight = bb.get('offsetHeight');
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size();

        paginator.set(TOTAL, size);

        // Inefficient.  Should not reinitialize every card every syncUI
        pageNodes.each(function(node, i){

            var scrollHeight = node.get('scrollHeight'),
                maxScrollY = scrollHeight - widgetHeight;

            if (maxScrollY < 0) {
                maxScrollY = 0;
            } 

            // Don't initialize any cards that already have been.
            if (!paginator.cards[i]) {
                paginator.cards[i] = {
                    maxScrollY: maxScrollY,
                    node: node,
                    scrollX: 0,
                    scrollY: 0
                };
            } else {
                paginator.cards[i].maxScrollY = maxScrollY;
            }

        });
    },

    _onScrollTo: function (x, y, duration, easing, node) {
        // console.log('_onScrollTo: ', x, y);
        var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            axis;

        if (gesture !== undefined) {
            axis = gesture.axis;

            if (axis === DIM_Y) {
                node = paginator.cards[index].node;
                x = null;
            }
            else {
                node = host._cb;
                y = null;
            }
        }

        // Now run scrollTo with the modified values
        host._scrollTo(x, y, duration, easing, node);

        return paginator._prevent;
    },

    /**
     * Executed after host._gestureMoveEnd
     *
     * @method _onGestureMoveEnd
     * @protected
     */
    _gestureMoveEnd: function (e) {
        var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            axis = gesture.axis,
            isForward = (axis === DIM_X ? gesture.deltaX > 0 : gesture.deltaY > 0),
            index = paginator._cIndex;

        paginator._uiDisable();

        // Was the gesture on the paginated axis?
        if (axis === DIM_X) {
            if (isForward) {
                paginator.next();
            }
            else {
                paginator.prev();
            }
        }
    },

    /**
     * Executed to respond to the mousewheel event, by over-riding the default mousewheel method.
     *
     * @method _mousewheel
     * @param {Event.Facade}
     * @protected
     */
    _beforeHostMousewheel: function (e) {
        var paginator = this,
            host = paginator._host,
            bb = host._bb,
            isForward = e.wheelDelta < 0, // down (negative) is forward.  @TODO Should revisit.
            axis = paginator.get(AXIS);

        // Set the axis for this event.
        // @TODO: This is hacky, it's not a gesture.  Find a better way
        host._gesture = {
            axis: DIM_Y
        }

        // Only if the mousewheel event occurred on a DOM node inside the BB
        if (bb.contains(e.target) && axis === DIM_Y){

            if (isForward) {
                paginator.next();
            }
            else {
                paginator.prev();
            }

            // prevent browser default behavior on mousewheel
            e.preventDefault();

            // Block host._mousewheel from running
            return paginator._prevent;
        }
    },

    /**
     * scrollEnd handler to run some cleanup operations
     *
     * @method _scrollEnded
     * @param {Event.Facade}
        * @protected
     */
    _scrollEnded: function (e) {
        // console.log('paginator:_scrollEnded');
        
        var paginator = this,
            host = this._host,
            index = paginator._cIndex,
            scrollY = host.get('scrollY');
        
        // Do some cleanup
        delete paginator._gesture;

        paginator.cards[index].scrollY = scrollY;
// console.log('_scrollEnded: setting ' + index + ' to ' + scrollY);
        // paginator._optimize();
        // paginator._uiEnable();
    },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @param {Event.Facade}
     * @protected
     */
    _afterIndexChange: function (e) {
        // console.log('paginator:_afterIndexChange');
        
        var paginator = this,
            host = this._host,
            index = e.newVal,
            maxScrollY = paginator.cards[index].maxScrollY;

        // Update the scrollY attribute with the current card's scrollY
        host.set('scrollY', paginator.cards[index].scrollY, {src: 'ui'});

        // Set the max height base can scroll to
        host._maxScrollY = maxScrollY;

        // Cache the new index value
        paginator._cIndex = index;

        if(e.src !== UI) {
            paginator.scrollToIndex(index);
        }
    },

    /**
     * Improves performance by hiding page nodes not near the viewport
     *
     * @method _optimize
     * @protected
     */
    _optimize: function() {
        var paginator = this,
            host = paginator._host,
            optimizeMemory = paginator.optimizeMemory,
            currentIndex = paginator._cIndex,
            pageNodes;

        if (!optimizeMemory) {
            return false;
        }

        // Show the pages in/near the viewport & hide the rest
        // pageNodes = paginator._getStage(currentIndex);
        // paginator._showNodes(pageNodes.visible);
        // paginator._hideNodes(pageNodes.hidden);
        // host.scrollTo(currentIndex, 0);
    },

    /**
     * Determines which nodes should be visible, and which should be hidden.
     *
     * @method _getStage
     * @param index {Number} The page index # intended to be in focus.
     * @returns {object}
     * @protected
     */
    _getStage : function (index) {
        var paginator = this,
            host = paginator._host,
            padding = paginator.padding,
            visibleCount = padding + 1 + padding, // Before viewport | viewport | after viewport
            pageNodes = paginator._getPageNodes(),
            pageCount = paginator.get(TOTAL),
            start, visible, hidden;

        // Somehow this works.  @TODO cleanup
        start = Math.max(index-padding, 0);
        if (start+visibleCount > pageCount) {
            start = start-(start+visibleCount-pageCount);
        }

        visible = pageNodes.splice(start, visibleCount);
        hidden = pageNodes; // everything leftover

        return {
            visible: visible,
            hidden: hidden
        };
    },

    /**
     * A utility method to show node(s)
     *
     * @method _showNodes
     * @param nodeList {nodeList}
     * @protected
     */
    _showNodes : function (nodeList) {
        var host = this._host,
            cb = host.get(CONTENT_BOX);

        if (nodeList) {
            nodeList.removeClass(CLASS_HIDDEN).setStyle('display', '');
        }
    },

    /**
     * A utility method to hide node(s)
     *
     * @method _hideNodes
     * @param nodeList {nodeList}
     * @protected
     */
    _hideNodes : function (nodeList) {
        var host = this._host;

        if (nodeList) {
            nodeList.addClass(CLASS_HIDDEN).setStyle('display', 'none');
        }
    },

    /**
     * Enable UI interaction with the widget
     *
     * @method _uiEnable
     * @protected
     */
    _uiEnable: function () {
        var paginator = this;
// console.log('_uiEnable');
        paginator._uiEnabled = true;
    },

    /**
     * Disable UI interaction with the widget
     *
     * @method _uiDisable
     * @protected
     */
    _uiDisable: function () {
        var paginator = this;

// console.log('_uiDisable');
        paginator._uiEnabled = false;
    },

    /**
     * Gets a nodeList for the "pages"
     *
     * @method _getPageNodes
     * @protected
     * @returns {nodeList}
     */
    _getPageNodes: function() {
        var paginator = this,
            host = paginator._host,
            cb = host.get(CONTENT_BOX),
            pageSelector = paginator.get(SELECTOR),
            pageNodes = pageSelector ? cb.all(pageSelector) : cb.get("children");

        return pageNodes;
    },

    /**
     * Scroll to the next page in the scrollview, with animation
     *
     * @method next
     */
    next: function () {
        var paginator = this,
            index = paginator._cIndex,
            target = index + 1;

        paginator.set(INDEX, target);
    },

    /**
     * Scroll to the previous page in the scrollview, with animation
     *
     * @method prev
     */
    prev: function () {
        var paginator = this,
            index = paginator._cIndex,
            target = index - 1;

        if (target < 0) {
            target = 0;
        }
        
        paginator.set(INDEX, target);
    },

    // For backwards compatibility
    scrollTo: function () {
        return this.scrollToIndex.apply(this, arguments);
    },

    /**
     * Scroll to a given page in the scrollview
     *
     * @method scrollToIndex
     * @param index {Number} The index of the page to scroll to
     * @param duration {Number} The number of ms the animation should last
     * @param easing {String} The timing function to use in the animation
     */
    scrollToIndex: function (index, duration, easing) {

        var paginator = this,
            host = paginator._host,
            axis = paginator.get(AXIS),
            pageNodes = paginator._getPageNodes(),
            scrollAxis, scrollVal;

        duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration;
        easing = (easing !== undefined) ? duration : PaginatorPlugin.TRANSITION.easing;

        // Make sure the target node is visible
        // paginator._showNodes(pageNodes.item(index));

        // Determine where to scroll to
        if (axis === DIM_Y) {
            scrollAxis = SCROLL_Y;
            scrollVal = pageNodes.item(index).get("offsetTop");
        } else {
            scrollAxis = SCROLL_X;
            scrollVal = pageNodes.item(index).get("offsetLeft");
        }
        
        host.set(scrollAxis, scrollVal, {
            duration: duration,
            easing: easing
        });
    }
});

/**
 * The default snap to current duration and easing values used on scroll end.
 *
 * @property SNAP_TO_CURRENT
 * @static
 */
PaginatorPlugin.TRANSITION = {
    duration : 300,
    easing : 'ease-out'
};

Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;

}