function(exports, $, _) {
    var Kinetic = exports.Kinetic;
/*global ImageAreaSelection:false, CommandQueue:false, FilterCommand:false, CropCommand:false, PasteCommand:false, PreviewDisplay: false, MainDisplay:false*/

// -----------------------------------------------------------------------------
//                          Ichie
// Ichie is a client side image editor based on canvas and the Kinetic library.
// Besides Kinetic, undescorejs and jquery are also required.
// In most cases you are probally allready using one of those deps and the other excuse is,
// that the usage of underscorejs and jquery is pretty minimal so it might be factored at some point.
// -----------------------------------------------------------------------------

var Ichie = function()
{
    this.options = null;
    this.clipboard = null;
    this.main_display = null;
    this.preview_display = null;
    this.working_canvas = null;
    this.command_queue = null;
};

Ichie.prototype = {

    /**
     * Gets this instance prepared for loading an image and kicking off the editing process.
     */
    init: function(options)
    {
        this.options = $.extend({}, Ichie.DEFAULT_OPTIONS, options || {});
        var that = this;

        this.preview_display = new PreviewDisplay();
        this.preview_display.init({
            container: this.options.preview_container
        });

        this.main_display = new MainDisplay();
        this.main_display.init({
            container: this.options.main_container,
            width: this.options.width,
            height: this.options.height,
            onViewportChanged: this.preview_display.onViewPortChanged.bind(this.preview_display)
        });

        this.working_canvas = document.createElement("canvas");

        this.command_queue = new CommandQueue();
        this.command_queue.init();
    },

    /**
     * --------------------------------------------------------------------------
     * PRIVATE METHODS - CLASS INTERNAL USAGE ONLY!
     * --------------------------------------------------------------------------
     */

    onImageProcessed: function(image)
    {
        var width = image.naturalWidth, 
            height = image.naturalHeight,
            working_ctx = this.working_canvas.getContext("2d"),
            adopt_size = (this.working_canvas.width !== width) || 
            (this.working_canvas.height !== height);

        if (adopt_size)
        {
            this.working_canvas.width = width;
            this.working_canvas.height = height;
        }
        
        working_ctx.drawImage(image, 0, 0);
        // atm, always update the preview-display first, as the main-display throws viewport events,
        // that require the preview-display to allready have the latest image set. :S
        this.preview_display.setImage(image, adopt_size); 
        this.main_display.setImage(image, adopt_size);
    },

    /**
     * --------------------------------------------------------------------------
     * PUBLIC METHODS - USE AS YOU LIKE
     * --------------------------------------------------------------------------
     */

     /**
     * Loads the given image, then displays it and initializes our ImageAreaSelection.
     */
    launch: function(image_source, ready_hook)
    {
        var that = this, image = new Image();

        image.onload = function()
        {
            that.onImageProcessed(image);
            ready_hook();
        };
        image.src = image_source;
    },

    /**
     * Shows the currently image selection.
     */
    showSelection: function()
    {
        this.main_display.showSelection();
    },

    /**
     * Hides the currently image selection.
     */
    hideSelection: function()
    {
        this.main_display.hideSelection();
    },

    /**
     * Set the resize mode to use when resizing our current selection.
     * Atm you may choose between 'default' and 'keep-ratio'.
     */
    setSelectMode: function(name)
    {
        this.main_display.setSelectMode(name);
    },

    /**
     * Copy the currently selected image are to Ichie's clipboard.
     */
    copySelection: function()
    {
        var selection = this.main_display.getCurrentSelection();
        this.clipboard = this.working_canvas.getContext('2d').getImageData(
            selection.left, 
            selection.top, 
            selection.right - selection.left, 
            selection.bottom - selection.top
        );
    },

    /**
     * Send the current state of our image to the browser,
     * so the user may download it.
     */
    downloadAsImage: function()
    {
        var data_url = this.working_canvas.toDataURL('image/png');
        data_url = data_url.replace("image/png", "image/octet-stream");
        document.location.href = data_url;
    },

    /**
     * Returns our Kinetic.Stage instance.
     */
    getStage: function()
    {
        return this.main_display.getStage();
    },

    /**
     * Returns our Kinetic.Layer instance.
     */
    getLayer: function()
    {
        return this.main_display.getLayer();
    },

    /**
     * Returns our Kinetic.Image instance.
     */
    getImage: function()
    {
        return this.main_display.getImage();
    },

    /*
     * These methods actually alter our image's state.
     * Our image's state may only be altered inside of commands,
     * which are required to implement consistent execute and revert methods.
     */

    pasteClipboard: function()
    {
        if (! this.clipboard) 
        {
            return;
        }
        var command = new PasteCommand(),
            selection = this.main_display.getCurrentSelection(),
            that = this;

        command.init(this.working_canvas, {
            data: this.clipboard,
            coords: { x: selection.left, y: selection.top },
            onexecuted: this.onImageProcessed.bind(this)
        });

        this.command_queue.execute(command);
        // @todo backup clipboard data, so we can paste the same stuff multiple times
        this.clipboard = null;
    },

    filter: function(filter_name, options)
    {
        var command = new FilterCommand(), 
            that = this;

        command.init(this.working_canvas, {
            filter: filter_name,
            bounds: this.main_display.getCurrentSelection(),
            onexecuted: this.onImageProcessed.bind(this)
        });

        this.command_queue.execute(command);
    },

    crop: function()
    {
        var command = new CropCommand(),
            that = this;

        command.init(this.working_canvas, {
            bounds: this.main_display.getCurrentSelection(),
            onexecuted: that.onImageProcessed.bind(this)
        });

        this.command_queue.execute(command);
    },

    undo: function()
    {
        this.command_queue.undo();
    },

    redo: function()
    {
        this.command_queue.redo();
    }
};

/**
 * A set of default options that apply when we were not given a specific value,
 * for one of our supported options.
 * Options wihtout default values are also listed here and simple have the value null.
 */
Ichie.DEFAULT_OPTIONS = {
    width: 500,
    height: 300
};

var CommandQueue = function()
{
    this.commands = null;
    this.cursor = null;
};

CommandQueue.prototype = {

    init: function()
    {
        this.commands = [];
        this.cursor = -1;
    },

    execute: function(command)
    {
        command.execute();
        if (this.cursor !== this.commands.length)
        {
            this.commands = [];
        }
        this.commands.push(command);
        this.cursor = this.commands.length;
    },

    redo: function()
    {
        if (this.valid())
        {
            this.commands[this.cursor].execute();
            this.cursor++;
        }
    },

    undo: function()
    {
        if (this.mayUndo())
        {
            this.cursor--;
            this.commands[this.cursor].revert();
        }
    },

    mayUndo: function()
    {
        return !!this.commands[this.cursor-1];
    },

    valid: function()
    {
        return !!this.commands[this.cursor];
    }
};

/*global ImageFilters:false*/

var FilterCommand = function()
{
    this.canvas = null;
    this.ctx = null;
    this.original_data = null;
};

FilterCommand.prototype = {

    init: function(canvas, options)
    {
        this.options = $.extend({}, FilterCommand.DEFAULT_OPTIONS, options || {});
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    },

    execute: function()
    {
        var x = this.options.bounds.left,
            y = this.options.bounds.top,
            width = this.options.bounds.right - this.options.bounds.left,
            height = this.options.bounds.bottom - this.options.bounds.top,
            image_data = this.ctx.getImageData(x, y, width, height);
            
        this.original_data = this.ctx.getImageData(x, y, width, height);

        var filtered = ImageFilters[this.options.filter](image_data);
        this.ctx.putImageData(filtered, x, y);

        this.onExecuted(this.canvas);
    },

    revert: function()
    {
        this.ctx.putImageData(
            this.original_data, 
            this.options.bounds.left, 
            this.options.bounds.top
        );
        
        this.onExecuted(this.canvas);
    },

    onExecuted: function(canvas)
    {
        var image = new Image(),
            that = this;
        image.onload = function()
        {
            that.options.onexecuted(image);
        };
        image.src = canvas.toDataURL();
    }
};

FilterCommand.DEFAULT_OPTIONS = {
    onexecuted: function() {}    
};

var CropCommand = function()
{
    this.canvas = null;
    this.ctx = null;
    this.original_data = null;
};

CropCommand.prototype = {

    init: function(canvas, options)
    {
        this.options = $.extend({}, CropCommand.DEFAULT_OPTIONS, options || {});
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    },

    execute: function()
    {
        this.original_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        var x = this.options.bounds.left,
            y = this.options.bounds.top,
            width = this.options.bounds.right - this.options.bounds.left,
            height = this.options.bounds.bottom - this.options.bounds.top,
            cropped_data = this.ctx.getImageData(x, y, width, height);

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var tmp_ctx = canvas.getContext("2d");
        tmp_ctx.putImageData(cropped_data, 0, 0);

        this.onExecuted(canvas);
    },

    revert: function()
    {
        var canvas = document.createElement("canvas");
        canvas.width = this.original_data.width;
        canvas.height = this.original_data.height;
        var tmp_ctx = canvas.getContext("2d");
        tmp_ctx.putImageData(this.original_data, 0, 0);

        this.onExecuted(canvas);
    },

    onExecuted: function(canvas)
    {
        var image = new Image(),
            that = this;
        image.onload = function()
        {
            that.options.onexecuted(image);
        };
        image.src = canvas.toDataURL();
    }
};

CropCommand.DEFAULT_OPTIONS = {
    onexecuted: function() {}    
};
/*global ImageFilters:false */

var PasteCommand = function()
{
    this.canvas = null;
    this.ctx = null;
    this.original_data = null;
};

PasteCommand.prototype = {

    init: function(canvas, options)
    {
        this.options = $.extend({}, PasteCommand.DEFAULT_OPTIONS, options || {});
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    },

    execute: function()
    {
        var data_copy = this.ctx.createImageData(
            this.options.data.width,
            this.options.data.height
        );
        ImageFilters.Copy(this.options.data, data_copy);

        this.original_data = this.ctx.getImageData(
            this.options.coords.x,
            this.options.coords.y,
            this.options.data.width,
            this.options.data.height
        );

        this.ctx.putImageData(
            this.options.data,
            this.options.coords.x, 
            this.options.coords.y
        );

        this.options.data = data_copy;
        this.onExecuted(this.canvas);
    },

    revert: function()
    {
        this.ctx.putImageData(
            this.original_data,
            this.options.coords.x, 
            this.options.coords.y
        );
        this.onExecuted(this.canvas);
    },

    onExecuted: function(canvas)
    {
        var image = new Image(),
            that = this;
        image.onload = function()
        {
            that.options.onexecuted(image);
        };
        image.src = canvas.toDataURL();
    }
};

PasteCommand.DEFAULT_OPTIONS = {
    onexecuted: function() {}
};
/*global ResizeInteraction:false, SelectionOverlay:false*/

// -----------------------------------------------------------------------------
//                          ImageAreaSelection
// Allows you to define a selection on the currently loaded image
// and together with the ResizeInterAction gives the user the possibilty
// to alter the selection by interacting through the mouse and touch interface,
// thereby providing different select modes such as centered-, symetric- or locked-ratio-selection.
// You can query an ImageAreaSelection instance for the bounds of the current selection,
// hide, show and reset the current selection.
// -----------------------------------------------------------------------------

var ImageAreaSelection = function()
{
    this.display = null;
    this.stage = null;
    this.options = null;
    this.ratio = null;
    this.shapes_group = null;
    this.layer = null;
    this.resize_handles = null;
    this.selection_rect = null;
    this.resizeInteraction = null;
    this.resize_overlay = null;
    this.drag_bounds = null;
};

ImageAreaSelection.prototype = {

    /**
     * Sets up the gui and the ResizeInterAction that will make us resizeable.
     */
    init: function(display, options)
    {
        this.display = display;
        this.stage = options.stage;
        this.options = $.extend({}, ImageAreaSelection.DEFAULT_OPTIONS, options || {});

        this.selection_rect = this.createSelectionRect();
        this.resize_handles = this.createResizeHandles();
        this.shapes_group = this.createShapesGroup();
        this.ratio = this.selection_rect.getWidth() / this.selection_rect.getHeight(); // @todo make dynamic (settable)
        this.setDragBounds({
            top: 0,
            right: this.stage.getWidth(),
            bottom: this.stage.getHeight(),
            left: 0
        });

        this.layer = new Kinetic.Layer({
            id: 'selection-layer',
            visible: this.options.show || false
        });
        this.layer.add(this.shapes_group);
        
        // Hook up with a resize tracker so we can react to the user wanting to alter the current selection state.
        this.resizeInteraction = new ResizeInteraction();
        this.resizeInteraction.init(this);

        this.resize_overlay = new SelectionOverlay();
        this.resize_overlay.init(this);

        this.stage.add(this.layer);
    },

    /**
     * Creates the rect-shape that represents our current selection.
     */
    createSelectionRect: function()
    {
        return new Kinetic.Rect({
            id: 'selection-rect',
            width: this.options.width,
            height: this.options.height,
            fill: "rgba(0, 0, 0, 0)",
            stroke: "white",
            strokeWidth: this.options.stroke,
            x: 0,
            y: 0
        });
    },

    /**
     * Creates our resize handles according to the definitions in ImageAreaSelection.HANDLES.
     */
    createResizeHandles: function()
    {
        var that = this, 
            resize_handles = [], 
            coord_map = this.calculateResizeHandleCoordMap();

        _.each(ImageAreaSelection.HANDLES, function(handle_def)
        {
            resize_handles.push(
                that.createResizeHandle(handle_def, coord_map)
            );
        });

        return resize_handles;
    },

    /**
     * Creates a rect shape that represents the resize handle,
     * as described by the passed handle_def.
     */
    createResizeHandle: function(handle_def, coord_map)
    {
        return new Kinetic.Rect({
            width: this.options.size,
            height: this.options.size,
            fill: this.options.fill,
            stroke: this.options.stroke,
            strokeWidth: this.options.stroke_width - 1, // always create a small contrast between resize handles and rect stroke
            x: coord_map[handle_def.x], 
            y: coord_map[handle_def.y]
        });
    },

    /**
     * Calculates coordinates that are used to position our resize handle shapes
     * along the border of our selection rect.
     * The keys of the returned object map to the 'x' and 'y' values 
     * of a handle definition inside the ImageAreaSelection.HANDLES array.
     */
    calculateResizeHandleCoordMap: function()
    {
        return {
            north: -1 * (this.options.size / 2),
            east: this.selection_rect.getWidth() - (this.options.size / 2),
            south: this.selection_rect.getHeight() - (this.options.size / 2),
            west: -1 * (this.options.size / 2),
            center: (this.selection_rect.getWidth() / 2) - (this.options.size / 2),
            middle: (this.selection_rect.getHeight() / 2) - (this.options.size / 2)
        };
    },

    /**
     * Creates a Kinetic.Group that holds all our shapes (select rect and resize handle rects).
     * The created group is also the handler of our exposed drag behaviour.
     */
    createShapesGroup: function()
    {
        var shapes_group = new Kinetic.Group({
            draggable: true,
            x: (this.stage.getWidth() / 2) - (this.options.width / 2), // center the shapes_group on stage
            y: (this.stage.getHeight() / 2) - (this.options.height / 2)
        });

        shapes_group.add(this.selection_rect);
        _.each(this.resize_handles, function(handle) 
        { 
            shapes_group.add(handle); 
        });

        return shapes_group;
    },

    updateDragBounds: function()
    {
        this.shapes_group.setDragBounds({
            top: this.drag_bounds.top,
            right: this.drag_bounds.right - this.selection_rect.getWidth(),
            bottom: this.drag_bounds.bottom - this.selection_rect.getHeight(),
            left: this.drag_bounds.left
        });

        if (this.resize_overlay)
        {
            this.resize_overlay.update();
        }
    },

    /**
     * Calculates the bounds of the image which is currently loaded
     * by the main display.
     */
    setDragBounds: function(drag_bounds)
    {
        this.drag_bounds = drag_bounds;
        this.updateDragBounds();
    },

    /**
     * After the position or dimensions of the selection rect have changed,
     * we need to get our resize handles back on the track.
     */
    correctResizeHandlePositions: function()
    {
        var that = this, 
            idx = 0,
            coord_map = this.calculateResizeHandleCoordMap();

        _.each(ImageAreaSelection.HANDLES, function(handle_def)
        {
            var handle = that.resize_handles[idx++];
            handle.setX(coord_map[handle_def.x]);
            handle.setY(coord_map[handle_def.y]);
        });
    },

    /**
     * Returns the bounds (top, right, bottom, left) of the image area,
     * that is currently selected.
     * The coords returned are relative to the image's current position.
     */ 
    getSelection: function(relative_to)
    {
        var select_pos = this.selection_rect.getAbsolutePosition(),
            select_x, select_y;

        if (typeof relative_to === 'object')
        {
            select_x = select_pos.x - relative_to.x;
            select_y = select_pos.y - relative_to.y;
        }
        else
        {
            select_x = select_pos.x;
            select_y = select_pos.y;
        }

        return {
            top: select_y,
            right: select_x + this.selection_rect.getWidth(),
            bottom: select_y + this.selection_rect.getHeight(),
            left: select_x
        };
    },

    /**
     * Sets the selection rect's pos and dimenions.
     * This method triggers a redraw with a former repositioning of our handles.
     */
    setSelection: function(selection)
    {
        this.selection_rect.setWidth(selection.dim.width);
        this.selection_rect.setHeight(selection.dim.height);

        this.shapes_group.setX(selection.pos.x);
        this.shapes_group.setY(selection.pos.y);

        this.correctResizeHandlePositions();
        this.resize_overlay.update();

        this.updateDragBounds();
        this.layer.draw();
    },

    setResizeMode: function(mode_name)
    {
        this.resizeInteraction.setMode(mode_name);
    },

    /**
     * Returns an array with our current handles (Kinetic.Rect).
     * This method returns a new array and not the instance actually used by the select rect.
     */
    getHandles: function(idx)
    {
        return $.merge([], this.resize_handles);
    },

    /**
     * Returns our selection rect (Kinetic.Rect) instance.
     */
    getSelectionRect: function()
    {
        return this.selection_rect;
    },

    getImageBoundry: function()
    {
        return this.drag_bounds;
    },

    /**
     * Returns our layer (Kinetic.Layer) instance.
     */
    getLayer: function()
    {
        return this.layer;
    },

    /**
     * Shows the selection stuff to the user.
     */
    show: function()
    {
        this.layer.show();
        this.resize_overlay.show();
        this.layer.draw();
    },

    /**
     * Hides the selection stuff from the user.
     */
    hide: function()
    {
        this.layer.hide();
        this.resize_overlay.hide();
        this.layer.draw();
    }
};

/**
 * An array holding an object defines a resize handle (id and position).
 * The 'x' and 'y' values of a handle definition are expanded to concrete coords 
 * by our calculateResizeHandleCoordMap method.
 *
 * @notice The order is important as we want to be able to calc the opposite side
 * handle of a given handle by adding 4 to the give index.
 */
ImageAreaSelection.HANDLES = [
    { x: 'west', y: 'north' }, // northWest
    { x: 'center', y: 'north' }, // north
    { x: 'east', y: 'north' }, // northEast
    { x: 'east', y: 'middle' }, // east
    { x: 'east', y: 'south' }, // southEast
    { x: 'center', y: 'south' }, // south
    { x: 'west', y: 'south' }, // southWest
    { x: 'west', y: 'middle' } // west
];

/**
 * Holds the default options that we are initialized with,
 * if no specific value is found inside the provided external options 'hash'.
 * Options wihtout default values are also listed here and simple have the value null.
 */
ImageAreaSelection.DEFAULT_OPTIONS = {
    size: 7,
    fill: "rgba(23, 23, 223, 1)",
    show: false,
    stroke: "white",
    stroke_width: 2,
    keep_ratio: false
};

var SelectionOverlay = function()
{
    this.image_selection = null;
    this.layer = null;
    this.shapes = null;
};

SelectionOverlay.prototype = {

    init: function(image_selection)
    {
        this.image_selection = image_selection;
        this.layer = new Kinetic.Layer({
            alpha: 0.5,
            visible: false
        });

        var boundry = this.image_selection.drag_bounds;
        this.shapes = {
            north: new Kinetic.Rect({
                fill: 'grey',
                x: boundry.left,
                y: boundry.top,
                width: boundry.right - boundry.left
            }),
            east: new Kinetic.Rect({
                fill: 'grey'
            }),
            south: new Kinetic.Rect({
                fill: 'grey',
                x: boundry.left,
                width: boundry.right - boundry.left
            }),
            west: new Kinetic.Rect({
                fill: 'grey',
                x: boundry.left
            })
        };
        this.layer.add(this.shapes.north);
        this.layer.add(this.shapes.south);
        this.layer.add(this.shapes.east);
        this.layer.add(this.shapes.west);
        this.image_selection.stage.add(this.layer);
    },

    update: function()
    {
        var boundry = this.image_selection.getImageBoundry();
        var rect = this.image_selection.getSelectionRect();
        var rect_pos = rect.getAbsolutePosition();
        this.shapes.north.setWidth(boundry.right - boundry.left);
        this.shapes.north.setX(boundry.left);
        this.shapes.north.setY(boundry.top);
        this.shapes.north.setHeight(
            Math.ceil(rect_pos.y - boundry.top)
        );

        var south_y = rect_pos.y + rect.getHeight();
        this.shapes.south.setX(boundry.left);
        this.shapes.south.setY(Math.ceil(south_y));
        this.shapes.south.setWidth(boundry.right - boundry.left);
        this.shapes.south.setHeight(
            Math.ceil(boundry.bottom - south_y)
        );

        this.shapes.west.setX(boundry.left);
        this.shapes.west.setY(rect_pos.y);
        this.shapes.west.setWidth(rect_pos.x - boundry.left);
        this.shapes.west.setHeight(
            Math.ceil(rect.getHeight())
        );

        var east_x = rect_pos.x + rect.getWidth();
        this.shapes.east.setX(east_x);
        this.shapes.east.setY(
            Math.ceil(rect_pos.y)
        );
        this.shapes.east.setWidth(boundry.right - east_x);
        this.shapes.east.setHeight(
            Math.ceil(rect.getHeight())
        );

        this.layer.draw();
    },

    show: function()
    {
        this.layer.show();
        this.layer.draw();
    },

    hide: function()
    {
        this.layer.hide();
        this.layer.draw();
    }
};
/*global LockedRatioMode:false, DefaultMode:false*/

// -----------------------------------------------------------------------------
//                          ResizeInterAction
// Provides the ImageAreaSelection with resize behaviour and attaches 
// mousedown, -move and -up listeners to do so.
// The actual calculation is then delegated to the the *Mode objects (fe: DefaultMode). 
// @see the 'Modes Section'
// -----------------------------------------------------------------------------

var ResizeInteraction = function()
{
    this.image_selection = null;
    this.handles = null;
    this.last_mousepos = null;
    this.mode = null;
};

ResizeInteraction.prototype = {

    /**
     * Hooks up with the given ImageAreaSelection, 
     * hence gets to know it's handles and registers the required events.
     */
    init: function(image_selection)
    {
        this.image_selection = image_selection;
        this.handles = this.image_selection.getHandles();
        this.canvas = $(
            this.image_selection.getLayer().getCanvas()
        );
        this.mode = new DefaultMode();
        this.mode.init(this);
        this.last_mousepos = null;
        this.registerHandleEvents();
    },

    /**
     * Registers mousedown, mousemove and mouseup events together with their corresponding touch events.
     * Makes sure that the mousemove handler is only active as long as the resize/drag mode is too.
     */
    registerHandleEvents: function()
    {
        var that = this,
            registerHandle = function(index)
            {
                var handle = that.handles[index];
                var mousemoveEventHandler = function(event){ that.onMouseMove(event, index); };
                var mouseupEventHandler = function(event){ 
                    that.image_selection.shapes_group.setDraggable(true);
                    that.last_mousepos = null;
                    window.document.removeEventListener('mousemove', mousemoveEventHandler);
                    window.document.removeEventListener('mouseup', mouseupEventHandler);
                };

                handle.on('mousedown touchstart', function(event)
                {
                    that.image_selection.shapes_group.setDraggable(false);
                    that.last_mousepos = { x: event.pageX, y: event.pageY };
                    window.document.addEventListener('mousemove', mousemoveEventHandler);
                    window.document.addEventListener('mouseup', mouseupEventHandler);
                });
            };

        for (var idx = 0; idx < this.handles.length; idx++)
        {
            registerHandle(idx);
        }

        var rect = this.image_selection.getSelectionRect();
        this.image_selection.shapes_group.on('dragmove', function()
        {
            that.image_selection.setSelection({
                pos: rect.getAbsolutePosition(),
                dim: {
                    width: rect.getWidth(),
                    height: rect.getHeight()
                }
            });
        });
    },

    /**
     * The event handler for mousemove events that occur while we are in drag/resize mode,
     * after initially receiving a mousedown event for one of our resize handles.
     */
    onMouseMove: function(mousemove_event, handle_index)
    {
        var evt_pos = { x: mousemove_event.pageX, y: mousemove_event.pageY },
            selection_rect = this.image_selection.getSelectionRect(),
            selection_pos = selection_rect.getAbsolutePosition(),
            selection_width = selection_rect.getWidth(),
            selection_height = selection_rect.getHeight(),
            delta = this.calculateEventDelta(handle_index, evt_pos);

        this.image_selection.setSelection(
            this.mode.buildSelectGeometry(handle_index, delta)
        );

        this.last_mousepos = evt_pos;
    },

    /**
     * Calculates the delta-x and -y between the current and previous
     * mousemove events for the current resize/drag session.
     */
    calculateEventDelta: function(handle_index, evt_pos)
    {
        var evt_x = evt_pos.x, evt_y = evt_pos.y;
        var delta_x = evt_x - this.last_mousepos.x, 
            delta_y = evt_y - this.last_mousepos.y;
        
        var reverse_delta_x = [0, 6, 7], // for the handles on the left and the top side of the selection rectangle,
            reverse_delta_y = [0, 1, 2]; // we need to reverse the delta values.
        if (-1 !== reverse_delta_x.indexOf(handle_index))
        {
            delta_x *= -1;
        }
        if (-1 !== reverse_delta_y.indexOf(handle_index))
        {
            delta_y *= -1;
        }

        return { x: delta_x, y: delta_y };
    },

    getBoundry: function()
    {
        return this.image_selection.getImageBoundry();
    },

    setMode: function(name)
    {
        if ('keep-ratio' === name)
        {
            this.mode = new LockedRatioMode();
        }
        else
        {
            this.mode = new DefaultMode();
        }
        this.mode.init(this);
    },

    getImageSelection: function()
    {
        return this.image_selection;
    }
};

/**
 * Holds the possible directions for resizing.
 */
ResizeInteraction.DIRECTION = { 
    HORIZONTAL: 'horizontal', 
    VERTICAL: 'vertical', 
    BOTH: 'both' 
};

/**
 * Holds the different modes we support when resizing.
 * A mode basically referes to the way the mousemovement is interpretated
 * to calculate the resulting dimension and postion of the current selection.
 */
ResizeInteraction.MODE = {
    DEFAULT: 'default',
    RATIO: 'ratio'
};

/*global ResizeInteraction:false*/

// -----------------------------------------------------------------------------
//                       *Modes (DefaultMode and family)
// The different modes, that are available to the ResizeInteraction.
// A mode's task is calculate the new dimensions and position for the ResizeInteraction
// during the processing of mousemove events.
// To do so, a mode is passed the index of the originating resize-handle and the 
// delta between the current and the last mousemove event.
// -----------------------------------------------------------------------------

/**
 * Implements the logic for the 'default' resize mode,
 * allowing the user to resize in all directions without any constraints.
 */
var DefaultMode = function()
{
    this.interaction = null;
};

DefaultMode.prototype = {

    init: function(interaction)
    {
        this.interaction = interaction;
    },

    /**
     * Get the rect resize/reposition calcultions done for 'default' selections.
     */
    buildSelectGeometry: function(handle_index, delta)
    {
        return this.clipSelectionToBoundry({
            pos: this.calculateSelectPostion(handle_index, delta),
            dim: this.calculateSelectDimensions(handle_index, delta)
        });
    },

     /**
     * Calulates the dimensions of our ImageAreaSelection's selection
     * after processing the given the given delta_x and delta_y values.
     */
    calculateSelectDimensions: function(handle_index, delta)
    {
        var image_selection = this.interaction.getImageSelection(),
            selection_rect = image_selection.getSelectionRect();

        var width = selection_rect.getWidth(),
            height = selection_rect.getHeight();

        var dir = ResizeInteraction.DIRECTION,
            direction = this.determineResizeDirection(handle_index, delta);

        width += (direction === dir.HORIZONTAL || direction === dir.BOTH) ? delta.x : 0;
        height += (direction === dir.VERTICAL || direction === dir.BOTH) ? delta.y : 0;

        return { width: width, height: height };
    },

    /**
     * Determines which direction the next resize should take.
     * Returns one of the ResizeInteraction.DIRECTION.* 'constants'.
     */
    determineResizeDirection: function(handle_index, delta)
    {
        var dir = ResizeInteraction.DIRECTION, 
            direction = null;

        var handle_map = {};
            handle_map[dir.HORIZONTAL] = [3, 7];
            handle_map[dir.VERTICAL] = [1, 5];
            handle_map[dir.BOTH] = [0, 2, 4, 6];

        _.each(handle_map, function(handle_indexes, handle_direction)
        {
            if (-1 !== handle_indexes.indexOf(handle_index))
            {
                direction = handle_direction;
            }
        });

        return direction;
    },

    /**
     * Calculates the new position of our ImageAreaSelection after resizing.
     */
    calculateSelectPostion: function(handle_index, delta)
    {
        var image_selection = this.interaction.getImageSelection(),
            selection_rect = image_selection.getSelectionRect(),
            selection_pos = selection_rect.getAbsolutePosition(),
            select_x = selection_pos.x, 
            select_y = selection_pos.y;

        var reposition_x = [0, 6, 7], reposition_y = [0, 1, 2];
        select_x -= (-1 !== reposition_x.indexOf(handle_index)) ? delta.x : 0;
        select_y -= (-1 !== reposition_y.indexOf(handle_index)) ? delta.y : 0;

        return { x: select_x, y: select_y };
    },

    /**
     * Make sure that our selected area never exceeds
     * the currently loaded image's dimensions.
     */
    clipSelectionToBoundry: function(selection)
    {
        var image_selection = this.interaction.getImageSelection(),
            boundry = this.interaction.getBoundry(),
            new_pos = selection.pos,
            new_dim = selection.dim,
            selection_rect = image_selection.getSelectionRect(),
            cur_pos = selection_rect.getAbsolutePosition();

        var new_bounds = {
            top: new_pos.y,
            right: new_pos.x + new_dim.width,
            bottom: new_pos.y + new_dim.height,
            left: new_pos.x
        };
        var cur_dim = {
            width: selection_rect.getWidth(),
            height: selection_rect.getHeight()
        };

        if (new_bounds.left < boundry.left)
        {
            new_pos.x = boundry.left;
            new_dim.width = cur_dim.width + (cur_pos.x - new_pos.x);
        }
        if (new_bounds.right > boundry.right)
        {
            new_dim.width = boundry.right - new_pos.x;
        }
        if (new_bounds.top < boundry.top)
        {
            new_pos.y = boundry.top;
            new_dim.height = cur_dim.height + (cur_pos.y - new_pos.y);
        }
        if (new_bounds.bottom > boundry.bottom)
        {
            new_dim.height = boundry.bottom - new_pos.y;
        }
        return { pos: new_pos, dim: new_dim };
    }
};

/*global ResizeInteraction:false, DefaultMode:false*/

/**
 * Implements the logic for the 'locked-ratio' resize mode,
 * allowing the user to resize in all directions thereby keeping the selection's ratio.
 */
var LockedRatioMode = function()
{
    DefaultMode.prototype.constructor.call(this);
};
LockedRatioMode.prototype = new DefaultMode();
LockedRatioMode.prototype.constructor = LockedRatioMode;

/**
 * Get the rect resize/reposition calcultions done for 'locked-ratio' selections.
 */
LockedRatioMode.prototype.buildSelectGeometry = function(handle_index, delta)
{
    var selection = DefaultMode.prototype.buildSelectGeometry.call(this, handle_index, delta); // luke, I am your father!

    var image_selection = this.interaction.getImageSelection(),
        dir = ResizeInteraction.DIRECTION,
        direction = this.determineResizeDirection(handle_index, delta),
        dimensions = selection.dim,
        position = selection.pos,
        boundry = this.interaction.getBoundry(),
        selection_rect = image_selection.getSelectionRect(),
        selection_pos = selection_rect.getAbsolutePosition();

    var reposition_x = [0, 6], reposition_y = [0, 2]; // handles that require repositioning of the select rect
    if (direction === dir.HORIZONTAL)
    {
        if (position.y + dimensions.height >= boundry.bottom && 
            (3 <= handle_index && 7 >= handle_index) && 
            selection_rect.getWidth() <= dimensions.width)
        {
            dimensions.height = boundry.bottom - position.y;
            dimensions.width = dimensions.height * image_selection.ratio;
            position.x = selection_pos.x;
        }
        else if (position.y <= boundry.top && 
            (0 <= handle_index && 2 >= handle_index) && 
            selection_rect.getWidth() <= dimensions.width)
        {
            var bottom_bound = position.y + dimensions.height;
            position.y = boundry.top;
            dimensions.height = boundry.top - position.y;
            dimensions.width = dimensions.height * image_selection.ratio;
            position.x = selection_pos.x;
        }
        else
        {
            var new_height = dimensions.width / image_selection.ratio;
            if (-1 !== reposition_y.indexOf(handle_index))
            {
                position.y = selection_pos.y - (new_height - selection_rect.getHeight());
            }
            dimensions.height = new_height;
        }
    }
    else
    {
        if (position.x + dimensions.width >= boundry.right && 
            (1 <= handle_index && 5 >= handle_index) && 
            selection_rect.getHeight() <= dimensions.height)
        {
            dimensions.width = boundry.right - position.x;
            dimensions.height = dimensions.width / image_selection.ratio;
            position.y = selection_pos.y;
        }
        else if (position.x <= boundry.left && 
            (-1 !== [0, 6, 7].indexOf(handle_index)) && 
            selection_rect.getHeight() <= dimensions.height)
        {
            var right_bound = position.x + dimensions.width;
            position.x = boundry.left;
            dimensions.width = right_bound - position.x;
            dimensions.height = dimensions.width / image_selection.ratio;
            position.y = selection_pos.y;
        }
        else
        {
            var new_width = dimensions.height * image_selection.ratio;
            if (-1 !== reposition_x.indexOf(handle_index))
            {
                position.x = selection_pos.x - (new_width - selection_rect.getWidth());
            }
            dimensions.width = new_width;
        }
    }

    return { pos: position, dim: dimensions };
};

/**
 * Determines which direction the next resize should take.
 * Returns one of the ResizeInteraction.DIRECTION.* 'constants'.
 */
LockedRatioMode.prototype.determineResizeDirection = function(handle_index, delta)
{
    var dir = ResizeInteraction.DIRECTION, 
        direction = DefaultMode.prototype.determineResizeDirection.call(this, handle_index, delta); // oh hai dad

    // The ratio mode only supports one modification direction at a time.
    if (dir.BOTH === direction)
    {
        direction = (Math.abs(delta.x) < Math.abs(delta.y)) ? dir.VERTICAL : dir.HORIZONTAL;
    }
    return direction;
};

/*global ImageFilters: false, ImageAreaSelection:false*/
var MainDisplay = function()
{
    this.stage = null;
    this.layer = null;
    this.image = null;
    this.scale_x = null;
    this.scale_y = null;
    this.drag_bounds = null;
    this.original_bounds = null;
    this.natural_dim = null;

    this.zoom_handler = null;
    this.image_selection = null;
};

MainDisplay.prototype = {

    init: function(options)
    {
        this.options = $.extend({}, MainDisplay.DEFAULT_OPTIONS, options || {});
        this.options.container = $(this.options.container).first();
        this.natural_dim = { width: 0, height: 0 };

        this.stage = new Kinetic.Stage({
            width: this.options.width,
            height: this.options.height,
            container: this.options.container[0]
        });

        this.layer = new Kinetic.Layer({ id: 'image-layer' });
        this.image = new Kinetic.Image({ id: 'preview-image', draggable: true });
        this.layer.add(this.image);
        this.stage.add(this.layer);

        this.image_selection = new ImageAreaSelection();
        this.image_selection.init(this, {
            stage: this.stage,
            width: options.select_width || this.stage.getWidth(),
            height: options.select_height || this.stage.getHeight()
        });

        this.zoom_handler = this.onImageZoomed.bind(this);
        var that = this;
        this.image.on('dragmove', function()
        {
            that.options.onViewportChanged(
                that.translateDimensions({ 
                    top: -that.image.getY(), 
                    right: (-that.image.getX() + that.stage.getWidth()), 
                    bottom: (-that.image.getY() + that.stage.getHeight()), 
                    left: -that.image.getX()
                })
            );
        });
    },

    /**
     * --------------------------------------------------------------------------
     * PRIVATE METHODS - CLASS INTERNAL USAGE ONLY!
     * --------------------------------------------------------------------------
     */

    fitImageToStage: function(image)
    {
        var width = image.naturalWidth,
            height = image.naturalHeight,
            ratio = width / height,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight(),
            stg_ratio = stg_width / stg_height,
            new_width, new_height;
        // Take care of max size (stage size) limits

        if (stg_ratio <= ratio && stg_width < width)
        {
            new_width = stg_width;
            new_height = new_width / ratio;
        }
        else if (stg_ratio > ratio && stg_height < height)
        {
            new_height = stg_height;
            new_width = new_height * ratio;
        }
        else
        {
            new_width = width;
            new_height = height;
        }
        this.scale_x = width / new_width;
        this.scale_y = height / new_height;

        this.image.setHeight(new_height);
        this.image.setWidth(new_width);

        var x = (stg_width / 2) - (new_width / 2),
            y = (stg_height / 2) - (new_height / 2);
        this.image.setX(x);
        this.image.setY(y);

        return { top: y, right: (x + new_width), bottom: (y + new_height), left: x };
    },

    setImageDragBounds: function(bounds)
    {
        this.drag_bounds = bounds;

        var x = bounds.left < 0 ? 0 : bounds.left,
            y = bounds.top < 0 ? 0 : bounds.top,
            width = bounds.right - bounds.left,
            height = bounds.bottom - bounds.top,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight(),
            new_width = width > stg_width ? stg_width : width,
            new_height = height > stg_height ? stg_height : height;

        this.image_selection.setDragBounds({
            top: y,
            right: x + new_width,
            bottom: y + new_height,
            left: x
        });
    },

    manageZoomHandler: function()
    {
        if (1 < this.scale_x || 1 < this.scale_y)
        {
            $(this.stage.getDOM()).bind('mousewheel', this.zoom_handler);
        }
        else
        {
            $(this.stage.getDOM()).unbind('mousewheel', this.zoom_handler);
        }
    },

    onImageZoomed: function(event, delta, delta_x, delta_y)
    {
        delta_x = Math.ceil(delta_x);
        delta_y = Math.ceil(delta_y);  

        var x, y, 
            ratio = this.natural_dim.width / this.natural_dim.height,
            new_height = this.image.getHeight() + delta_y,
            new_width = new_height * ratio,
            min_height = this.original_bounds.bottom - this.original_bounds.top,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight();

        if (this.image.getHeight() === min_height && 0 >= delta_y)
        {
            return false;
        }
        else if (new_height < min_height)
        {
            x = this.original_bounds.left;
            y = this.original_bounds.top;
            new_height = min_height;
            new_width = new_height * ratio;
        }
        else
        {
            x = (stg_width / 2) - (new_width / 2);
            y = (stg_height / 2) - (new_height / 2);
        }

        this.image.setX(x);
        this.image.setY(y);
        this.image.setHeight(new_height);
        this.image.setWidth(new_width);

        this.scale_x = this.natural_dim.width / new_width;
        this.scale_y = this.natural_dim.height / new_height;

        this.setImageDragBounds({ top: y, right: (x + new_width), bottom: (y + new_height), left: x });
        this.updateViewportDragBounds();
        this.options.onViewportChanged(
            this.translateDimensions({ top: -y, right: (-x + stg_width), bottom: (-y + stg_height), left: -x })
        );

        this.layer.draw();
        return false;
    },

    updateViewportDragBounds: function()
    {
        var drag_bounds = {},
            width = this.image.getWidth(),
            height = this.image.getHeight(),
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight();

        if (width > stg_width)
        {
            drag_bounds.left = stg_width - width;
            drag_bounds.right = 0;
        }
        else
        {
            drag_bounds.left = this.image.getX();
            drag_bounds.right = drag_bounds.left;
        }
        if (height > stg_height)
        {
            drag_bounds.top = stg_height - height;
            drag_bounds.bottom = 0;
        }
        else
        {
            drag_bounds.top = this.image.getY();
            drag_bounds.bottom = drag_bounds.top;
        }
        this.image.setDragBounds(drag_bounds);
    },

    translateDimensions: function(dimensions)
    {
        return {
            top: dimensions.top * this.scale_y,
            right: dimensions.right * this.scale_x,
            bottom: dimensions.bottom * this.scale_y,
            left: dimensions.left * this.scale_x
        };
    },

    /**
     * --------------------------------------------------------------------------
     * PUBLIC METHODS - USE AS YOU LIKE
     * --------------------------------------------------------------------------
     */

    setImage: function(image)
    {
        var prev_width = this.natural_dim.width,
            prev_height = this.natural_dim.height;

        this.natural_dim = {
            width: image.naturalWidth,
            height: image.naturalHeight
        };

        this.image.setImage(image);

        if (prev_width !== this.natural_dim.width ||
            prev_height !== this.natural_dim.height)
        {
            this.original_bounds = this.fitImageToStage(image);

            var x = this.image.getX(),
                y = this.image.getY(),
                width = this.image.getWidth(),
                height = this.image.getHeight(),
                stg_width = this.stage.getWidth(),
                stg_height = this.stage.getHeight();

            this.setImageDragBounds($.extend({}, this.original_bounds));
            this.image_selection.setSelection({
                dim : { width : width, height: height },
                pos: { x: x, y: y }
            });

            this.updateViewportDragBounds();
            this.options.onViewportChanged(
                this.translateDimensions({ top: -y, right: (-x + stg_width), bottom: (-y + stg_height), left: -x })
            );
            this.manageZoomHandler();
        }
        
        this.layer.draw();
    },

    getCurrentSelection: function()
    {
        var relative_to = this.image.getAbsolutePosition();
        return this.translateDimensions(
            this.image_selection.getSelection(relative_to)
        );
    },

    showSelection: function()
    {
        this.image_selection.show();
    },

    hideSelection: function()
    {
        this.image_selection.hide();
    },

    setSelectMode: function(name)
    {
        this.image_selection.setResizeMode(name);
    },

    getImageBoundry: function()
    {
        return this.drag_bounds;
    }
};


MainDisplay.DEFAULT_OPTIONS = {
    width: 400,
    height: 300,
    onzoomed: function() {}
};
/*global ImageFilters: false*/
var PreviewDisplay = function()
{
    this.stage = null;
    this.layer = null;
    this.image = null;
    this.scale_x = null;
    this.scale_y = null;
    this.original_dim = null;

    this.viewport_rect = null;
};

PreviewDisplay.prototype = {

    init: function(options)
    {
        this.options = $.extend({}, PreviewDisplay.DEFAULT_OPTIONS, options || {});
        this.options.container = $(this.options.container).first();
        this.original_dim = { width: 0, height: 0 };

        this.stage = new Kinetic.Stage({
            width: this.options.width,
            height: this.options.height,
            container: this.options.container[0]
        });

        this.layer = new Kinetic.Layer({ id: 'image-layer' });
        this.image = new Kinetic.Image({ id: 'preview-image' });

        this.viewport_rect = new Kinetic.Rect({
            id: 'viewport-rect',
            fill: "rgba(0, 0, 0, 0)",
            stroke: "black",
            strokeWidth: 0.5
        });
       
        this.layer.add(this.image);
        this.layer.add(this.viewport_rect);
        this.stage.add(this.layer);
    },

    /**
     * --------------------------------------------------------------------------
     * PRIVATE METHODS - CLASS INTERNAL USAGE ONLY!
     * --------------------------------------------------------------------------
     */

    fitImageToStage: function(image)
    {
        var width = image.naturalWidth,
            height = image.naturalHeight,
            ratio = width / height,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight(),
            stg_ratio = stg_width / stg_height,
            new_width, new_height;
        // Take care of max size (stage size) limits

        if (stg_ratio <= ratio && stg_width < width)
        {
            new_width = stg_width;
            new_height = new_width / ratio;
        }
        else if (stg_ratio > ratio && stg_height < height)
        {
            new_height = stg_height;
            new_width = new_height * ratio;
        }
        else
        {
            new_width = width;
            new_height = height;
        }
        this.scale_x = width / new_width;
        this.scale_y = height / new_height;

        this.image.setHeight(new_height);
        this.image.setWidth(new_width);

        var x = (stg_width / 2) - (new_width / 2),
            y = (stg_height / 2) - (new_height / 2);

        this.image.setX(x);
        this.image.setY(y);
    },

    /**
     * --------------------------------------------------------------------------
     * PUBLIC METHODS - USE AS YOU LIKE
     * --------------------------------------------------------------------------
     */

    setImage: function(image)
    {
        var prev_width = this.original_dim.width,
            prev_height = this.original_dim.height;

        this.original_dim = {
            width: image.naturalWidth,
            height: image.naturalHeight
        };

        this.image.setImage(image);

        if (prev_width !== this.original_dim.width ||
            prev_height !== this.original_dim.height)
        {
            this.fitImageToStage(image);
        }

        this.layer.draw();
    },

    onViewPortChanged: function(viewport_dims)
    {
        var offset_pos = this.image.getAbsolutePosition();

        var x = (viewport_dims.left / this.scale_x) + offset_pos.x;
        var y = (viewport_dims.top / this.scale_y) + offset_pos.y;
        var width = (viewport_dims.right - viewport_dims.left )/ this.scale_x;
        var height = (viewport_dims.bottom - viewport_dims.top ) / this.scale_y;

        this.viewport_rect.setWidth(width);
        this.viewport_rect.setHeight(height);
        this.viewport_rect.setX(x);
        this.viewport_rect.setY(y);
        this.layer.draw();
    }
};

PreviewDisplay.DEFAULT_OPTIONS = {
    width: 250,
    height: 150
};
/*
    https://github.com/arahaya/ImageFilters.js/blob/master/imagefilters.js
    
    Copyright (c) 2011 ARAKI Hayato

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var ImageFilters = {};
ImageFilters.utils = {
    initSampleCanvas: function () {
        var _canvas = document.createElement('canvas'),
            _context = _canvas.getContext('2d');
        
        _canvas.width = 0;
        _canvas.height = 0;
        
        this.getSampleCanvas = function () {
            return _canvas;
        };
        this.getSampleContext = function () {
            return _context;
        };
        this.createImageData = (_context.createImageData) ? function (w, h) {
                return _context.createImageData(w, h);
            } : function (w, h) {
                return new ImageData(w, h);
            };
    },
    getSampleCanvas: function () {
        this.initSampleCanvas();
        return this.getSampleCanvas();
    },
    getSampleContext: function () {
        this.initSampleCanvas();
        return this.getSampleContext();
    },
    createImageData: function (w, h) {
        this.initSampleCanvas();
        return this.createImageData(w, h);
    },
    clamp: function (value) {
        return value > 255 ? 255 : value < 0 ? 0 : value;
    },
    buildMap: function (f) {
        for (var m = [], k = 0, v; k < 256; k += 1) {
            m[k] = (v = f(k)) > 255 ? 255 : v < 0 ? 0 : v | 0;
        }
        return m;
    },
    applyMap: function (src, dst, map) {
        for (var i = 0, l = src.length; i < l; i += 4) {
            dst[i]     = map[src[i]];
            dst[i + 1] = map[src[i + 1]];
            dst[i + 2] = map[src[i + 2]];
            dst[i + 3] = src[i + 3];
        }
    },
    mapRGB: function (src, dst, func) {
        this.applyMap(src, dst, this.buildMap(func));
    },
    getPixelIndex: function (x, y, width, height, edge) {
        if (x < 0 || x >= width || y < 0 || y >= height) {
            switch (edge) {
            case 1: // clamp
                x = x < 0 ? 0 : x >= width ? width - 1 : x;
                y = y < 0 ? 0 : y >= height ? height - 1 : y;
                break;
            case 2: // wrap
                x = (x %= width) < 0 ? x + width : x;
                y = (y %= height) < 0 ? y + height : y;
                break;
            default: // transparent
                return null;
            }
        }
        return (y * width + x) << 2;
    },
    getPixel: function (src, x, y, width, height, edge) {
        if (x < 0 || x >= width || y < 0 || y >= height) {
            switch (edge) {
            case 1: // clamp
                x = x < 0 ? 0 : x >= width ? width - 1 : x;
                y = y < 0 ? 0 : y >= height ? height - 1 : y;
                break;
            case 2: // wrap
                x = (x %= width) < 0 ? x + width : x;
                y = (y %= height) < 0 ? y + height : y;
                break;
            default: // transparent
                return 0;
            }
        }
        
        var i = (y * width + x) << 2;
        
        // ARGB
        return src[i + 3] << 24 | src[i] << 16 | src[i + 1] << 8 | src[i + 2];
    },
    getPixelByIndex: function (src, i) {
        return src[i + 3] << 24 | src[i] << 16 | src[i + 1] << 8 | src[i + 2];
    },
    /**
     * one of the most important functions in this library.
     * I want to make this as fast as possible.
     */
    copyBilinear: function (src, x, y, width, height, dst, dstIndex, edge) {
        var fx = x < 0 ? x - 1 | 0 : x | 0, // Math.floor(x)
            fy = y < 0 ? y - 1 | 0 : y | 0, // Math.floor(y)
            wx = x - fx,
            wy = y - fy,
            i,
            nw = 0, ne = 0, sw = 0, se = 0,
            cx, cy,
            r, g, b, a;
        
        if (fx >= 0 && fx < (width - 1) && fy >= 0 && fy < (height - 1)) {
            // in bounds, no edge actions required
            i = (fy * width + fx) << 2;
            
            if (wx || wy) {
                nw = src[i + 3] << 24 | src[i] << 16 | src[i + 1] << 8 | src[i + 2];
                
                i += 4;
                ne = src[i + 3] << 24 | src[i] << 16 | src[i + 1] << 8 | src[i + 2];
                
                i = (i - 8) + (width << 2);
                sw = src[i + 3] << 24 | src[i] << 16 | src[i + 1] << 8 | src[i + 2];
                
                i += 4;
                se = src[i + 3] << 24 | src[i] << 16 | src[i + 1] << 8 | src[i + 2];
            }
            else {
                // no interpolation required
                dst[dstIndex]     = src[i];
                dst[dstIndex + 1] = src[i + 1];
                dst[dstIndex + 2] = src[i + 2];
                dst[dstIndex + 3] = src[i + 3];
                return;
            }
        }
        else {
            // edge actions required
            nw = this.getPixel(src, fx, fy, width, height, edge);
            
            if (wx || wy) {
                ne = this.getPixel(src, fx + 1, fy, width, height, edge);
                sw = this.getPixel(src, fx, fy + 1, width, height, edge);
                se = this.getPixel(src, fx + 1, fy + 1, width, height, edge);
            }
            else {
                // no interpolation required
                dst[dstIndex]     = nw >> 16 & 0xFF;
                dst[dstIndex + 1] = nw >> 8  & 0xFF;
                dst[dstIndex + 2] = nw       & 0xFF;
                dst[dstIndex + 3] = nw >> 24 & 0xFF;
                return;
            }
        }
        
        cx = 1 - wx;
        cy = 1 - wy;
        r = ((nw >> 16 & 0xFF) * cx + (ne >> 16 & 0xFF) * wx) * cy + ((sw >> 16 & 0xFF) * cx + (se >> 16 & 0xFF) * wx) * wy;
        g = ((nw >> 8  & 0xFF) * cx + (ne >> 8  & 0xFF) * wx) * cy + ((sw >> 8  & 0xFF) * cx + (se >> 8  & 0xFF) * wx) * wy;
        b = ((nw       & 0xFF) * cx + (ne       & 0xFF) * wx) * cy + ((sw       & 0xFF) * cx + (se       & 0xFF) * wx) * wy;
        a = ((nw >> 24 & 0xFF) * cx + (ne >> 24 & 0xFF) * wx) * cy + ((sw >> 24 & 0xFF) * cx + (se >> 24 & 0xFF) * wx) * wy;
        
        dst[dstIndex]     = r > 255 ? 255 : r < 0 ? 0 : r | 0;
        dst[dstIndex + 1] = g > 255 ? 255 : g < 0 ? 0 : g | 0;
        dst[dstIndex + 2] = b > 255 ? 255 : b < 0 ? 0 : b | 0;
        dst[dstIndex + 3] = a > 255 ? 255 : a < 0 ? 0 : a | 0;
    },
    /**
     * @param r 0 <= n <= 255
     * @param g 0 <= n <= 255
     * @param b 0 <= n <= 255
     * @return Array(h, s, l)
     */
    rgbToHsl: function (r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

//        var max = Math.max(r, g, b),
//            min = Math.min(r, g, b),
        var max = (r > g) ? (r > b) ? r : b : (g > b) ? g : b,
            min = (r < g) ? (r < b) ? r : b : (g < b) ? g : b,
            chroma = max - min,
            h = 0,
            s = 0,
            // Lightness
            l = (min + max) / 2;

        if (chroma !== 0) {
            // Hue
            if (r === max) {
                h = (g - b) / chroma + ((g < b) ? 6 : 0);
            }
            else if (g === max) {
                h = (b - r) / chroma + 2;
            }
            else {
                h = (r - g) / chroma + 4;
            }
            h /= 6;

            // Saturation
            s = (l > 0.5) ? chroma / (2 - max - min) : chroma / (max + min);
        }

        return [h, s, l];
    },
    /**
     * @param h 0.0 <= n <= 1.0
     * @param s 0.0 <= n <= 1.0
     * @param l 0.0 <= n <= 1.0
     * @return Array(r, g, b)
     */
    hslToRgb: function (h, s, l) {
        var m1, m2, hue,
            r, g, b,
            rgb = [];

        if (s === 0) {
            r = g = b = l * 255 + 0.5 | 0;
            rgb = [r, g, b];
        }
        else {
            if (l <= 0.5) {
                m2 = l * (s + 1);
            }
            else {
                m2 = l + s - l * s;
            }

            m1 = l * 2 - m2;
            hue = h + 1 / 3;

            var tmp;
            for (var i = 0; i < 3; i += 1) {
                if (hue < 0) {
                    hue += 1;
                }
                else if (hue > 1) {
                    hue -= 1;
                }

                if (6 * hue < 1) {
                    tmp = m1 + (m2 - m1) * hue * 6;
                }
                else if (2 * hue < 1) {
                    tmp = m2;
                }
                else if (3 * hue < 2) {
                    tmp = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
                }
                else {
                    tmp = m1;
                }

                rgb[i] = tmp * 255 + 0.5 | 0;

                hue -= 1 / 3;
            }
        }

        return rgb;
    }
};


// TODO
ImageFilters.Translate = function (srcImageData, x, y, interpolation) {

};
ImageFilters.Scale = function (srcImageData, scaleX, scaleY, interpolation) {

};
ImageFilters.Rotate = function (srcImageData, originX, originY, angle, resize, interpolation) {

};
ImageFilters.Affine = function (srcImageData, matrix, resize, interpolation) {

};
ImageFilters.UnsharpMask = function (srcImageData, level) {

};

ImageFilters.ConvolutionFilter = function (srcImageData, matrixX, matrixY, matrix, divisor, bias, preserveAlpha, clamp, color, alpha) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    divisor = divisor || 1;
    bias = bias || 0;

    // default true
    if (preserveAlpha !== false)
    {
        preserveAlpha = true;
    }
    if (clamp !== false)
    {
        clamp = true;
    }

    color = color || 0;
    alpha = alpha || 0;

    var index = 0,
        rows = matrixX >> 1,
        cols = matrixY >> 1,
        clampR = color >> 16 & 0xFF,
        clampG = color >>  8 & 0xFF,
        clampB = color       & 0xFF,
        clampA = alpha * 0xFF;

    for (var y = 0; y < srcHeight; y += 1) {
        for (var x = 0; x < srcWidth; x += 1, index += 4) {
            var r = 0,
                g = 0,
                b = 0,
                a = 0,
                replace = false,
                mIndex = 0,
                v;

            for (var row = -rows; row <= rows; row += 1) {
                var rowIndex = y + row,
                    offset;

                if (0 <= rowIndex && rowIndex < srcHeight) {
                    offset = rowIndex * srcWidth;
                }
                else if (clamp) {
                    offset = y * srcWidth;
                }
                else {
                    replace = true;
                }

                for (var col = -cols; col <= cols; col += 1) {
                    var m = matrix[mIndex++];

                    if (m !== 0) {
                        var colIndex = x + col;

                        if (!(0 <= colIndex && colIndex < srcWidth)) {
                            if (clamp) {
                                colIndex = x;
                            }
                            else {
                                replace = true;
                            }
                        }

                        if (replace) {
                            r += m * clampR;
                            g += m * clampG;
                            b += m * clampB;
                            a += m * clampA;
                        }
                        else {
                            var p = (offset + colIndex) << 2;
                            r += m * srcPixels[p];
                            g += m * srcPixels[p + 1];
                            b += m * srcPixels[p + 2];
                            a += m * srcPixels[p + 3];
                        }
                    }
                }
            }

            dstPixels[index]     = (v = r / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
            dstPixels[index + 1] = (v = g / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
            dstPixels[index + 2] = (v = b / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
            dstPixels[index + 3] = preserveAlpha ? srcPixels[index + 3] : (v = a / divisor + bias) > 255 ? 255 : v < 0 ? 0 : v | 0;
        }
    }

    return dstImageData;
};

/**
 * @param threshold 0.0 <= n <= 1.0
 */
ImageFilters.Binarize = function (srcImageData, threshold) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    if (isNaN(threshold)) {
        threshold = 0.5;
    }

    threshold *= 255;

    for (var i = 0; i < srcLength; i += 4) {
        var avg = srcPixels[i] + srcPixels[i + 1] + srcPixels[i + 2] / 3;

        dstPixels[i] = dstPixels[i + 1] = dstPixels[i + 2] = avg <= threshold ? 0 : 255;
        dstPixels[i + 3] = 255;
    }

    return dstImageData;
};

ImageFilters.BlendAdd = function (srcImageData, blendImageData, dx, dy) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data,
        blendPixels  = blendImageData.data;

    var v;

    for (var i = 0; i < srcLength; i += 4) {
        dstPixels[i]     = ((v = srcPixels[i]     + blendPixels[i])     > 255) ? 255 : v;
        dstPixels[i + 1] = ((v = srcPixels[i + 1] + blendPixels[i + 1]) > 255) ? 255 : v;
        dstPixels[i + 2] = ((v = srcPixels[i + 2] + blendPixels[i + 2]) > 255) ? 255 : v;
        dstPixels[i + 3] = 255;
    }

    return dstImageData;
};

ImageFilters.BlendSubtract = function (srcImageData, blendImageData, dx, dy) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data,
        blendPixels  = blendImageData.data;

    var v;

    for (var i = 0; i < srcLength; i += 4) {
        dstPixels[i]     = ((v = srcPixels[i]     - blendPixels[i])     < 0) ? 0 : v;
        dstPixels[i + 1] = ((v = srcPixels[i + 1] - blendPixels[i + 1]) < 0) ? 0 : v;
        dstPixels[i + 2] = ((v = srcPixels[i + 2] - blendPixels[i + 2]) < 0) ? 0 : v;
        dstPixels[i + 3] = 255;
    }

    return dstImageData;
};

/**
 * Algorithm based on BoxBlurFilter.java by Huxtable.com
 * @see http://www.jhlabs.com/ip/blurring.html
 * Copyright 2005 Huxtable.com. All rights reserved.
 */
ImageFilters.BoxBlur = (function () {
    var blur = function(src, dst, width, height, radius) {
        var tableSize = radius * 2 + 1;
        var radiusPlus1 = radius + 1;
        var widthMinus1 = width - 1;

        var r, g, b, a;

        var srcIndex = 0;
        var dstIndex;
        var p, next, prev;
        var i, l, x, y,
            nextIndex, prevIndex;

        var sumTable = [];
        for (i = 0, l = 256 * tableSize; i < l; i += 1) {
            sumTable[i] = i / tableSize | 0;
        }

        for (y = 0; y < height; y += 1) {
            r = g = b = a = 0;
            dstIndex = y;

            p = srcIndex << 2;
            r += radiusPlus1 * src[p];
            g += radiusPlus1 * src[p + 1];
            b += radiusPlus1 * src[p + 2];
            a += radiusPlus1 * src[p + 3];

            for (i = 1; i <= radius; i += 1) {
                p = (srcIndex + (i < width ? i : widthMinus1)) << 2;
                r += src[p];
                g += src[p + 1];
                b += src[p + 2];
                a += src[p + 3];
            }

            for (x = 0; x < width; x += 1) {
                p = dstIndex << 2;
                dst[p]     = sumTable[r];
                dst[p + 1] = sumTable[g];
                dst[p + 2] = sumTable[b];
                dst[p + 3] = sumTable[a];

                nextIndex = x + radiusPlus1;
                if (nextIndex > widthMinus1) {
                    nextIndex = widthMinus1;
                }

                prevIndex = x - radius;
                if (prevIndex < 0) {
                    prevIndex = 0;
                }

                next = (srcIndex + nextIndex) << 2;
                prev = (srcIndex + prevIndex) << 2;

                r += src[next]     - src[prev];
                g += src[next + 1] - src[prev + 1];
                b += src[next + 2] - src[prev + 2];
                a += src[next + 3] - src[prev + 3];
                
                dstIndex += height;
            }
            srcIndex += width;
        }
    };
    
    return function (srcImageData, hRadius, vRadius, quality) {
        var srcPixels    = srcImageData.data,
            srcWidth     = srcImageData.width,
            srcHeight    = srcImageData.height,
            srcLength    = srcPixels.length,
            dstImageData = this.utils.createImageData(srcWidth, srcHeight),
            dstPixels    = dstImageData.data,
            tmpImageData = this.utils.createImageData(srcWidth, srcHeight),
            tmpPixels    = tmpImageData.data;

        for (var i = 0; i < quality; i += 1) {
            // only use the srcPixels on the first loop
            blur(i ? dstPixels : srcPixels, tmpPixels, srcWidth, srcHeight, hRadius);
            blur(tmpPixels, dstPixels, srcHeight, srcWidth, vRadius);
        }

        return dstImageData;
    };
}());

/**
 * @ param strength 1 <= n <= 4
 */
ImageFilters.GaussianBlur = function (srcImageData, strength) {
    var size, matrix, divisor;

    switch (strength) {
    case 2:
        size = 5;
        matrix = [
            1, 1, 2, 1, 1,
            1, 2, 4, 2, 1,
            2, 4, 8, 4, 2,
            1, 2, 4, 2, 1,
            1, 1, 2, 1, 1
        ];
        divisor = 52;
        break;
    case 3:
        size = 7;
        matrix = [
            1, 1, 2,  2, 2, 1, 1,
            1, 2, 2,  4, 2, 2, 1,
            2, 2, 4,  8, 4, 2, 2,
            2, 4, 8, 16, 8, 4, 2,
            2, 2, 4,  8, 4, 2, 2,
            1, 2, 2,  4, 2, 2, 1,
            1, 1, 2,  2, 2, 1, 1
        ];
        divisor = 140;
        break;
    case 4:
        size = 15;
        matrix = [
            2 ,2 , 3 , 4 , 5 , 5 , 6 , 6 , 6 , 5 , 5 , 4 , 3 ,2 ,2,
            2 ,3 , 4 , 5 , 7 , 7 , 8 , 8 , 8 , 7 , 7 , 5 , 4 ,3 ,2,
            3 ,4 , 6 , 7 , 9 ,10 ,10 ,11 ,10 ,10 , 9 , 7 , 6 ,4 ,3,
            4 ,5 , 7 , 9 ,10 ,12 ,13 ,13 ,13 ,12 ,10 , 9 , 7 ,5 ,4,
            5 ,7 , 9 ,11 ,13 ,14 ,15 ,16 ,15 ,14 ,13 ,11 , 9 ,7 ,5,
            5 ,7 ,10 ,12 ,14 ,16 ,17 ,18 ,17 ,16 ,14 ,12 ,10 ,7 ,5,
            6 ,8 ,10 ,13 ,15 ,17 ,19 ,19 ,19 ,17 ,15 ,13 ,10 ,8 ,6,
            6 ,8 ,11 ,13 ,16 ,18 ,19 ,20 ,19 ,18 ,16 ,13 ,11 ,8 ,6,
            6 ,8 ,10 ,13 ,15 ,17 ,19 ,19 ,19 ,17 ,15 ,13 ,10 ,8 ,6,
            5 ,7 ,10 ,12 ,14 ,16 ,17 ,18 ,17 ,16 ,14 ,12 ,10 ,7 ,5,
            5 ,7 , 9 ,11 ,13 ,14 ,15 ,16 ,15 ,14 ,13 ,11 , 9 ,7 ,5,
            4 ,5 , 7 , 9 ,10 ,12 ,13 ,13 ,13 ,12 ,10 , 9 , 7 ,5 ,4,
            3 ,4 , 6 , 7 , 9 ,10 ,10 ,11 ,10 ,10 , 9 , 7 , 6 ,4 ,3,
            2 ,3 , 4 , 5 , 7 , 7 , 8 , 8 , 8 , 7 , 7 , 5 , 4 ,3 ,2,
            2 ,2 , 3 , 4 , 5 , 5 , 6 , 6 , 6 , 5 , 5 , 4 , 3 ,2 ,2
        ];
        divisor = 2044;
        break;
    default:
        size = 3;
        matrix = [
            1, 2, 1,
            2, 4, 2,
            1, 2, 1
        ];
        divisor = 16;
        break;
    }
    return this.ConvolutionFilter(srcImageData, size, size, matrix, divisor, 0, false);
};

/**
 * Stack Blur Algorithm by Mario Klingemann <mario@quasimondo.com>
 * @see http://incubator.quasimondo.com/processing/fast_blur_deluxe.php
 */
/*
Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
ImageFilters.StackBlur = (function () {
    var mul_table = [
        512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
        454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
        482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
        437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
        497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
        320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
        446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
        329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
        505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
        399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
        324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
        268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
        451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
        385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
        332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
        289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
        
   
    var shg_table = [
         9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 
        17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 
        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 
        23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];
    
    function BlurStack() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.next = null;
    }
    
    return function (srcImageData, radius) {
        var srcPixels    = srcImageData.data,
            srcWidth     = srcImageData.width,
            srcHeight    = srcImageData.height,
            srcLength    = srcPixels.length,
            dstImageData = this.Clone(srcImageData),
            dstPixels    = dstImageData.data;

        var x, y, i, p, yp, yi, yw,
            r_sum, g_sum, b_sum, a_sum, 
            r_out_sum, g_out_sum, b_out_sum, a_out_sum,
            r_in_sum, g_in_sum, b_in_sum, a_in_sum, 
            pr, pg, pb, pa, rbs,
            div = radius + radius + 1,
            w4 = srcWidth << 2,
            widthMinus1  = srcWidth - 1,
            heightMinus1 = srcHeight - 1,
            radiusPlus1  = radius + 1,
            sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2,
            stackStart = new BlurStack(),
            stack = stackStart,
            stackIn, stackOut, stackEnd,
            mul_sum = mul_table[radius],
            shg_sum = shg_table[radius];
        
        for (i = 1; i < div; i += 1) {
            stack = stack.next = new BlurStack();
            if (i === radiusPlus1) {
                stackEnd = stack;
            }
        }
        
        stack.next = stackStart;
        yw = yi = 0;
        
        for (y = 0; y < srcHeight; y += 1) {
            r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
            
            r_out_sum = radiusPlus1 * (pr = dstPixels[yi]);
            g_out_sum = radiusPlus1 * (pg = dstPixels[yi + 1]);
            b_out_sum = radiusPlus1 * (pb = dstPixels[yi + 2]);
            a_out_sum = radiusPlus1 * (pa = dstPixels[yi + 3]);
            
            r_sum += sumFactor * pr;
            g_sum += sumFactor * pg;
            b_sum += sumFactor * pb;
            a_sum += sumFactor * pa;
            
            stack = stackStart;
            
            for (i = 0; i < radiusPlus1; i += 1) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack.a = pa;
                stack = stack.next;
            }
            
            for (i = 1; i < radiusPlus1; i += 1) {
                p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                r_sum += (stack.r = (pr = dstPixels[p])) * (rbs = radiusPlus1 - i);
                g_sum += (stack.g = (pg = dstPixels[p + 1])) * rbs;
                b_sum += (stack.b = (pb = dstPixels[p + 2])) * rbs;
                a_sum += (stack.a = (pa = dstPixels[p + 3])) * rbs;
                
                r_in_sum += pr;
                g_in_sum += pg;
                b_in_sum += pb;
                a_in_sum += pa;
                
                stack = stack.next;
            }
            
            stackIn = stackStart;
            stackOut = stackEnd;
            
            for (x = 0; x < srcWidth; x += 1) {
                dstPixels[yi]     = (r_sum * mul_sum) >> shg_sum;
                dstPixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
                dstPixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
                dstPixels[yi + 3] = (a_sum * mul_sum) >> shg_sum;
                
                r_sum -= r_out_sum;
                g_sum -= g_out_sum;
                b_sum -= b_out_sum;
                a_sum -= a_out_sum;
                
                r_out_sum -= stackIn.r;
                g_out_sum -= stackIn.g;
                b_out_sum -= stackIn.b;
                a_out_sum -= stackIn.a;
                
                p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
                
                r_in_sum += (stackIn.r = dstPixels[p]);
                g_in_sum += (stackIn.g = dstPixels[p + 1]);
                b_in_sum += (stackIn.b = dstPixels[p + 2]);
                a_in_sum += (stackIn.a = dstPixels[p + 3]);
                
                r_sum += r_in_sum;
                g_sum += g_in_sum;
                b_sum += b_in_sum;
                a_sum += a_in_sum;
                
                stackIn = stackIn.next;
                
                r_out_sum += (pr = stackOut.r);
                g_out_sum += (pg = stackOut.g);
                b_out_sum += (pb = stackOut.b);
                a_out_sum += (pa = stackOut.a);
                
                r_in_sum -= pr;
                g_in_sum -= pg;
                b_in_sum -= pb;
                a_in_sum -= pa;
                
                stackOut = stackOut.next;

                yi += 4;
            }
            
            yw += srcWidth;
        }
        
        for (x = 0; x < srcWidth; x += 1) {
            g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
            
            yi = x << 2;
            r_out_sum = radiusPlus1 * (pr = dstPixels[yi]);
            g_out_sum = radiusPlus1 * (pg = dstPixels[yi + 1]);
            b_out_sum = radiusPlus1 * (pb = dstPixels[yi + 2]);
            a_out_sum = radiusPlus1 * (pa = dstPixels[yi + 3]);
            
            r_sum += sumFactor * pr;
            g_sum += sumFactor * pg;
            b_sum += sumFactor * pb;
            a_sum += sumFactor * pa;
            
            stack = stackStart;
            
            for (i = 0; i < radiusPlus1; i += 1) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack.a = pa;
                stack = stack.next;
            }
            
            yp = srcWidth;
            
            for (i = 1; i <= radius; i += 1) {
                yi = (yp + x) << 2;
                
                r_sum += (stack.r = (pr = dstPixels[yi])) * (rbs = radiusPlus1 - i);
                g_sum += (stack.g = (pg = dstPixels[yi + 1])) * rbs;
                b_sum += (stack.b = (pb = dstPixels[yi + 2])) * rbs;
                a_sum += (stack.a = (pa = dstPixels[yi + 3])) * rbs;
               
                r_in_sum += pr;
                g_in_sum += pg;
                b_in_sum += pb;
                a_in_sum += pa;
                
                stack = stack.next;
            
                if (i < heightMinus1) {
                    yp += srcWidth;
                }
            }
            
            yi = x;
            stackIn = stackStart;
            stackOut = stackEnd;
            
            for (y = 0; y < srcHeight; y += 1) {
                p = yi << 2;
                dstPixels[p]     = (r_sum * mul_sum) >> shg_sum;
                dstPixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
                dstPixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
                dstPixels[p + 3] = (a_sum * mul_sum) >> shg_sum;
                
                r_sum -= r_out_sum;
                g_sum -= g_out_sum;
                b_sum -= b_out_sum;
                a_sum -= a_out_sum;
               
                r_out_sum -= stackIn.r;
                g_out_sum -= stackIn.g;
                b_out_sum -= stackIn.b;
                a_out_sum -= stackIn.a;
                
                p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * srcWidth)) << 2;
                
                r_sum += (r_in_sum += (stackIn.r = dstPixels[p]));
                g_sum += (g_in_sum += (stackIn.g = dstPixels[p + 1]));
                b_sum += (b_in_sum += (stackIn.b = dstPixels[p + 2]));
                a_sum += (a_in_sum += (stackIn.a = dstPixels[p + 3]));
               
                stackIn = stackIn.next;
                
                r_out_sum += (pr = stackOut.r);
                g_out_sum += (pg = stackOut.g);
                b_out_sum += (pb = stackOut.b);
                a_out_sum += (pa = stackOut.a);
                
                r_in_sum -= pr;
                g_in_sum -= pg;
                b_in_sum -= pb;
                a_in_sum -= pa;
                
                stackOut = stackOut.next;
                
                yi += srcWidth;
            }
        }
        
        return dstImageData;
    };
}());

/**
 * TV based algorithm
 */
ImageFilters.Brightness = function (srcImageData, brightness) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        value += brightness;
        return (value > 255) ? 255 : value;
    });

    return dstImageData;
};

/**
 * GIMP algorithm modified. pretty close to fireworks
 * @param brightness -100 <= n <= 100
 * @param contrast -100 <= n <= 100
 */
ImageFilters.BrightnessContrastGimp = function (srcImageData, brightness, contrast) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data,
        p4           = Math.PI / 4;

    // fix to -1 <= n <= 1
    brightness /= 100;
    
    // fix to -99 <= n <= 99
    contrast *= 0.99;
    // fix to -1 < n < 1
    contrast /= 100;
    // apply GIMP formula
    contrast = Math.tan((contrast + 1) * p4);

    // get the average color
    for (var avg = 0, i = 0; i < srcLength; i += 4) {
        avg += (srcPixels[i] * 19595 + srcPixels[i + 1] * 38470 + srcPixels[i + 2] * 7471) >> 16;
    }
    avg = avg / (srcLength / 4);

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        if (brightness < 0) {
            value = value * (1 + brightness);
        }
        else if (brightness > 0) {
            value = value + ((255 - value) * brightness);
        }
        //value += brightness;

        if (contrast !== 0) {
            value = (value - avg) * contrast + avg;
        }
        return value + 0.5 | 0;
    });
    return dstImageData;
};

/**
 * more like the new photoshop algorithm
 * @param brightness -100 <= n <= 100
 * @param contrast -100 <= n <= 100
 */
ImageFilters.BrightnessContrastPhotoshop = function (srcImageData, brightness, contrast) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    // fix to 0 <= n <= 2;
    brightness = (brightness + 100) / 100;
    contrast = (contrast + 100) / 100;

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        value *= brightness;
        value = (value - 127.5) * contrast + 127.5;
        return value + 0.5 | 0;
    });
    return dstImageData;
};

ImageFilters.Channels = function (srcImageData, channel) {
    var matrix;

    switch (channel) {
        case 2: // green
            matrix = [
                0, 1, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            break;
        case 3: // blue
            matrix = [
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            break;
        default: // red
            matrix = [
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            break;

    }

    return this.ColorMatrixFilter(srcImageData, matrix);
};

ImageFilters.Clone = function (srcImageData) {
    return this.Copy(srcImageData, this.utils.createImageData(srcImageData.width, srcImageData.height));
};

/**
 * slower
 */
ImageFilters.CloneBuiltin = function (srcImageData) {
    var srcWidth  = srcImageData.width,
        srcHeight = srcImageData.height,
        canvas    = this.utils.getSampleCanvas(),
        context   = this.utils.getSampleContext(),
        dstImageData;

    canvas.width  = srcWidth;
    canvas.height = srcHeight;

    context.putImageData(srcImageData, 0, 0);
    dstImageData = context.getImageData(0, 0, srcWidth, srcHeight);

    canvas.width = 0;
    canvas.height = 0;

    return dstImageData;
};

ImageFilters.ColorMatrixFilter = function (srcImageData, matrix) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    var m0  = matrix[0],
        m1  = matrix[1],
        m2  = matrix[2],
        m3  = matrix[3],
        m4  = matrix[4],
        m5  = matrix[5],
        m6  = matrix[6],
        m7  = matrix[7],
        m8  = matrix[8],
        m9  = matrix[9],
        m10 = matrix[10],
        m11 = matrix[11],
        m12 = matrix[12],
        m13 = matrix[13],
        m14 = matrix[14],
        m15 = matrix[15],
        m16 = matrix[16],
        m17 = matrix[17],
        m18 = matrix[18],
        m19 = matrix[19];

    var value, i, r, g, b, a;
    for (i = 0; i < srcLength; i += 4) {
        r = srcPixels[i];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];

        dstPixels[i]     = (value = r *  m0 + g *  m1 + b *  m2 + a *  m3 +  m4) > 255 ? 255 : value < 0 ? 0 : value | 0;
        dstPixels[i + 1] = (value = r *  m5 + g *  m6 + b *  m7 + a *  m8 +  m9) > 255 ? 255 : value < 0 ? 0 : value | 0;
        dstPixels[i + 2] = (value = r * m10 + g * m11 + b * m12 + a * m13 + m14) > 255 ? 255 : value < 0 ? 0 : value | 0;
        dstPixels[i + 3] = (value = r * m15 + g * m16 + b * m17 + a * m18 + m19) > 255 ? 255 : value < 0 ? 0 : value | 0;
    }

    return dstImageData;
};

ImageFilters.ColorTransformFilter = function (
        srcImageData, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier,
        redOffset, greenOffset, blueOffset, alphaOffset) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    var i, v;
    for (i = 0; i < srcLength; i += 4) {
        dstPixels[i]     = (v = srcPixels[i]     * redMultiplier   + redOffset)   > 255 ? 255 : v < 0 ? 0 : v;
        dstPixels[i + 1] = (v = srcPixels[i + 1] * greenMultiplier + greenOffset) > 255 ? 255 : v < 0 ? 0 : v;
        dstPixels[i + 2] = (v = srcPixels[i + 2] * blueMultiplier  + blueOffset)  > 255 ? 255 : v < 0 ? 0 : v;
        dstPixels[i + 3] = (v = srcPixels[i + 3] * alphaMultiplier + alphaOffset) > 255 ? 255 : v < 0 ? 0 : v;
    }

    return dstImageData;
};

ImageFilters.Copy = function (srcImageData, dstImageData) {
    var srcPixels = srcImageData.data,
        srcLength = srcPixels.length,
        dstPixels = dstImageData.data;

    while (srcLength--) {
        dstPixels[srcLength] = srcPixels[srcLength];
    }

    return dstImageData;
};

ImageFilters.Crop = function (srcImageData, x, y, width, height) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(width, height),
        dstPixels    = dstImageData.data;

    var srcLeft   = Math.max(x, 0),
        srcTop    = Math.max(y, 0),
        srcRight  = Math.min(x + width, srcWidth),
        srcBottom = Math.min(y + height, srcHeight),
        dstLeft   = srcLeft - x,
        dstTop    = srcTop - y,
        srcRow, srcCol, srcIndex, dstRow, dstCol, dstIndex;

    for (srcRow = srcTop, dstRow = dstTop; srcRow < srcBottom; srcRow += 1, dstRow += 1) {
        for (srcCol = srcLeft, dstCol = dstLeft; srcCol < srcRight; srcCol += 1, dstCol += 1) {
            srcIndex = (srcRow * srcWidth + srcCol) << 2;
            dstIndex = (dstRow * width    + dstCol) << 2;
            dstPixels[dstIndex]     = srcPixels[srcIndex];
            dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
            dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
            dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
        }
    }

    return dstImageData;
};

ImageFilters.CropBuiltin = function (srcImageData, x, y, width, height) {
    var srcWidth  = srcImageData.width,
        srcHeight = srcImageData.height,
        canvas    = this.utils.getSampleCanvas(),
        context   = this.utils.getSampleContext();

    canvas.width = srcWidth;
    canvas.height = srcHeight;
    context.putImageData(srcImageData, 0, 0);
    var result = context.getImageData(x, y, width, height);

    canvas.width = 0;
    canvas.height = 0;

    return result;
};

/**
 * sets to the average of the highest and lowest contrast
 */
ImageFilters.Desaturate = function (srcImageData) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    for (var i = 0; i < srcLength; i += 4) {
        var r = srcPixels[i],
            g = srcPixels[i + 1],
            b = srcPixels[i + 2],
            max = (r > g) ? (r > b) ? r : b : (g > b) ? g : b,
            min = (r < g) ? (r < b) ? r : b : (g < b) ? g : b,
            avg = ((max + min) / 2) + 0.5 | 0;

        dstPixels[i] = dstPixels[i + 1] = dstPixels[i + 2] = avg;
        dstPixels[i + 3] = srcPixels[i + 3];
    }

    return dstImageData;
};

/**
 * TODO: use bilinear
 */
ImageFilters.DisplacementMapFilter = function (srcImageData, mapImageData, mapX, mapY, componentX, componentY, scaleX, scaleY, mode) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
//        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstImageData = ImageFilters.Clone(srcImageData),
        dstPixels    = dstImageData.data;

    mapX = mapX || 0;
    mapY = mapY || 0;
    componentX = componentX || 0; // red?
    componentY = componentY || 0;
    scaleX = scaleX || 0;
    scaleY = scaleY || 0;
    mode = mode || 2; // wrap

    var mapWidth  = mapImageData.width,
        mapHeight = mapImageData.height,
        mapPixels = mapImageData.data,
        mapRight  = mapWidth + mapX,
        mapBottom = mapHeight + mapY,
        dstIndex, srcIndex, mapIndex,
        cx, cy, tx, ty, x, y;

    for (x = 0; x < srcWidth; x += 1) {
        for (y = 0; y < srcHeight; y += 1) {

            dstIndex = (y * srcWidth + x) << 2;

            if (x < mapX || y < mapY || x >= mapRight || y >= mapBottom) {
                // out of the map bounds
                // copy src to dst
                srcIndex = dstIndex;
            } else {
                // apply map
                mapIndex = ((y - mapY) * mapWidth + (x - mapX)) << 2;

                // tx = x + ((componentX(x, y) - 128) * scaleX) / 256
                cx = mapPixels[mapIndex + componentX];
                tx = x + (((cx - 128) * scaleX) >> 8);

                // tx = y + ((componentY(x, y) - 128) * scaleY) / 256
                cy = mapPixels[mapIndex + componentY];
                ty = y + (((cy - 128) * scaleY) >> 8);

                srcIndex = ImageFilters.utils.getPixelIndex(tx + 0.5 | 0, ty + 0.5 | 0, srcWidth, srcHeight, mode);
                if (srcIndex === null) {
                    // if mode == ignore and (tx,ty) is out of src bounds
                    // then copy (x,y) to dst
                    srcIndex = dstIndex;
                }
            }

            dstPixels[dstIndex]     = srcPixels[srcIndex];
            dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
            dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
            dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
        }
    }

    return dstImageData;
};

/**
 * Floyd-Steinberg algorithm
 * @param levels 2 <= n <= 255
 */
ImageFilters.Dither = function (srcImageData, levels) {
    var srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        dstImageData = this.Clone(srcImageData),
        dstPixels    = dstImageData.data;

    levels = levels < 2 ? 2 : levels > 255 ? 255 : levels;

    // Build a color map using the same algorithm as the posterize filter.
    var posterize,
        levelMap = [],
        levelsMinus1 = levels - 1,
        j = 0,
        k = 0,
        i;

    for (i = 0; i < levels; i += 1) {
        levelMap[i] = (255 * i) / levelsMinus1;
    }

    posterize = this.utils.buildMap(function (value) {
        var ret = levelMap[j];

        k += levels;

        if (k > 255) {
            k -= 255;
            j += 1;
        }

        return ret;
    });
    
    // Apply the dithering algorithm to each pixel
    var x, y,
        index,
        old_r, old_g, old_b,
        new_r, new_g, new_b,
        err_r, err_g, err_b,
        nbr_r, nbr_g, nbr_b,
        srcWidthMinus1 = srcWidth - 1,
        srcHeightMinus1 = srcHeight - 1,
        A = 7 / 16,
        B = 3 / 16,
        C = 5 / 16,
        D = 1 / 16;
    
    for (y = 0; y < srcHeight; y += 1) {
        for (x = 0; x < srcWidth; x += 1) {
            // Get the current pixel.
            index = (y * srcWidth + x) << 2;
            
            old_r = dstPixels[index];
            old_g = dstPixels[index + 1];
            old_b = dstPixels[index + 2];
            
            // Quantize using the color map
            new_r = posterize[old_r];
            new_g = posterize[old_g];
            new_b = posterize[old_b];
            
            // Set the current pixel.
            dstPixels[index]     = new_r;
            dstPixels[index + 1] = new_g;
            dstPixels[index + 2] = new_b;
            
            // Quantization errors
            err_r = old_r - new_r;
            err_g = old_g - new_g;
            err_b = old_b - new_b;
            
            // Apply the matrix.
            // x + 1, y
            index += 1 << 2;
            if (x < srcWidthMinus1) {
                nbr_r = dstPixels[index]     + A * err_r;
                nbr_g = dstPixels[index + 1] + A * err_g;
                nbr_b = dstPixels[index + 2] + A * err_b;
                
                dstPixels[index]     = nbr_r > 255 ? 255 : nbr_r < 0 ? 0 : nbr_r | 0;
                dstPixels[index + 1] = nbr_g > 255 ? 255 : nbr_g < 0 ? 0 : nbr_g | 0;
                dstPixels[index + 2] = nbr_b > 255 ? 255 : nbr_b < 0 ? 0 : nbr_b | 0;
            }
            
            // x - 1, y + 1
            index += (srcWidth - 2) << 2;
            if (x > 0 && y < srcHeightMinus1) {
                nbr_r = dstPixels[index]     + B * err_r;
                nbr_g = dstPixels[index + 1] + B * err_g;
                nbr_b = dstPixels[index + 2] + B * err_b;
                
                dstPixels[index]     = nbr_r > 255 ? 255 : nbr_r < 0 ? 0 : nbr_r | 0;
                dstPixels[index + 1] = nbr_g > 255 ? 255 : nbr_g < 0 ? 0 : nbr_g | 0;
                dstPixels[index + 2] = nbr_b > 255 ? 255 : nbr_b < 0 ? 0 : nbr_b | 0;
            }
            
            // x, y + 1
            index += 1 << 2;
            if (y < srcHeightMinus1) {
                nbr_r = dstPixels[index]     + C * err_r;
                nbr_g = dstPixels[index + 1] + C * err_g;
                nbr_b = dstPixels[index + 2] + C * err_b;
                
                dstPixels[index]     = nbr_r > 255 ? 255 : nbr_r < 0 ? 0 : nbr_r | 0;
                dstPixels[index + 1] = nbr_g > 255 ? 255 : nbr_g < 0 ? 0 : nbr_g | 0;
                dstPixels[index + 2] = nbr_b > 255 ? 255 : nbr_b < 0 ? 0 : nbr_b | 0;
            }
            
            // x + 1, y + 1
            index += 1 << 2;
            if (x < srcWidthMinus1 && y < srcHeightMinus1) {
                nbr_r = dstPixels[index]     + D * err_r;
                nbr_g = dstPixels[index + 1] + D * err_g;
                nbr_b = dstPixels[index + 2] + D * err_b;
                
                dstPixels[index]     = nbr_r > 255 ? 255 : nbr_r < 0 ? 0 : nbr_r | 0;
                dstPixels[index + 1] = nbr_g > 255 ? 255 : nbr_g < 0 ? 0 : nbr_g | 0;
                dstPixels[index + 2] = nbr_b > 255 ? 255 : nbr_b < 0 ? 0 : nbr_b | 0;
            }
        }
    }

    return dstImageData;
};

ImageFilters.Edge = function (srcImageData) {
    //pretty close to Fireworks 'Find Edges' effect
    return this.ConvolutionFilter(srcImageData, 3, 3, [
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    ]);
};

ImageFilters.Emboss = function (srcImageData) {
    return this.ConvolutionFilter(srcImageData, 3, 3, [
        -2, -1, 0,
        -1,  1, 1,
         0,  1, 2
    ]);
};

ImageFilters.Enrich = function (srcImageData) {
    return this.ConvolutionFilter(srcImageData, 3, 3, [
         0, -2,  0,
        -2, 20, -2,
         0, -2,  0
    ], 10, -40);
};

ImageFilters.Flip = function (srcImageData, vertical) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    var x, y, srcIndex, dstIndex, i;

    for (y = 0; y < srcHeight; y += 1) {
        for (x = 0; x < srcWidth; x += 1) {
            srcIndex = (y * srcWidth + x) << 2;
            if (vertical) {
                dstIndex = ((srcHeight - y - 1) * srcWidth + x) << 2;
            }
            else {
                dstIndex = (y * srcWidth + (srcWidth - x - 1)) << 2;
            }

            dstPixels[dstIndex]     = srcPixels[srcIndex];
            dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
            dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
            dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
        }
    }

    return dstImageData;
};

ImageFilters.Gamma = function (srcImageData, gamma) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        value = (255 * Math.pow(value / 255, 1 / gamma) + 0.5);
        return value > 255 ? 255 : value + 0.5 | 0;
    });

    return dstImageData;
};

ImageFilters.GrayScale = function (srcImageData) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    for (var i = 0; i < srcLength; i += 4) {
        var intensity = (srcPixels[i] * 19595 + srcPixels[i + 1] * 38470 + srcPixels[i + 2] * 7471) >> 16;
        //var intensity = (srcPixels[i] * 0.3086 + srcPixels[i + 1] * 0.6094 + srcPixels[i + 2] * 0.0820) | 0;
        dstPixels[i] = dstPixels[i + 1] = dstPixels[i + 2] = intensity;
        dstPixels[i + 3] = srcPixels[i + 3];
    }

    return dstImageData;
};

/**
 * @param hueDelta  -180 <= n <= 180
 * @param satDelta  -100 <= n <= 100
 * @param lightness -100 <= n <= 100
 */
ImageFilters.HSLAdjustment = function (srcImageData, hueDelta, satDelta, lightness) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    hueDelta /= 360;
    satDelta /= 100;
    lightness /= 100;

    var rgbToHsl = this.utils.rgbToHsl;
    var hslToRgb = this.utils.hslToRgb;
    var h, s, l, hsl, rgb, i;

    for (i = 0; i < srcLength; i += 4) {
        // convert to HSL
        hsl = rgbToHsl(srcPixels[i], srcPixels[i + 1], srcPixels[i + 2]);

        // hue
        h = hsl[0] + hueDelta;
        while (h < 0) {
            h += 1;
        }
        while (h > 1) {
            h -= 1;
        }

        // saturation
        s = hsl[1] + hsl[1] * satDelta;
        if (s < 0) {
            s = 0;
        }
        else if (s > 1) {
            s = 1;
        }

        // lightness
        l = hsl[2];
        if (lightness > 0) {
            l += (1 - l) * lightness;
        }
        else if (lightness < 0) {
            l += l * lightness;
        }

        // convert back to rgb
        rgb = hslToRgb(h, s, l);

        dstPixels[i]     = rgb[0];
        dstPixels[i + 1] = rgb[1];
        dstPixels[i + 2] = rgb[2];
        dstPixels[i + 3] = srcPixels[i + 3];
    }

    return dstImageData;
};

ImageFilters.Invert = function (srcImageData) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        return 255 - value;
    });

    return dstImageData;
};

ImageFilters.Mosaic = function (srcImageData, blockSize) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;
    
    var cols = Math.ceil(srcWidth / blockSize),
        rows = Math.ceil(srcHeight / blockSize),
        row, col,
        x_start, x_end, y_start, y_end,
        x, y, yIndex, index, size,
        r, g, b, a;

    for (row = 0; row < rows; row += 1) {
        y_start = row * blockSize;
        y_end   = y_start + blockSize;
        
        if (y_end > srcHeight) {
            y_end = srcHeight;
        }
        
        for (col = 0; col < cols; col += 1) {
            x_start = col * blockSize;
            x_end   = x_start + blockSize;
            
            if (x_end > srcWidth) {
                x_end = srcWidth;
            }

            // get the average color from the src
            r = g = b = a = 0;
            size = (x_end - x_start) * (y_end - y_start);

            for (y = y_start; y < y_end; y += 1) {
                yIndex = y * srcWidth;
                
                for (x = x_start; x < x_end; x += 1) {
                    index = (yIndex + x) << 2;
                    r += srcPixels[index];
                    g += srcPixels[index + 1];
                    b += srcPixels[index + 2];
                    a += srcPixels[index + 3];
                }
            }

            r = (r / size) + 0.5 | 0;
            g = (g / size) + 0.5 | 0;
            b = (b / size) + 0.5 | 0;
            a = (a / size) + 0.5 | 0;

            // fill the dst with that color
            for (y = y_start; y < y_end; y += 1) {
                yIndex = y * srcWidth;
                
                for (x = x_start; x < x_end; x += 1) {
                    index = (yIndex + x) << 2;
                    dstPixels[index]     = r;
                    dstPixels[index + 1] = g;
                    dstPixels[index + 2] = b;
                    dstPixels[index + 3] = a;
                }
            }
        }
    }

    return dstImageData;
};

/**
 * @param range  1 <= n <= 5
 * @param levels 1 <= n <= 256
 */
ImageFilters.Oil = function (srcImageData, range, levels) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;
    
    var index = 0,
        rh = [],
        gh = [],
        bh = [],
        rt = [],
        gt = [],
        bt = [],
        x, y, i, row, col,
        rowIndex, colIndex, offset, srcIndex,
        sr, sg, sb, ri, gi, bi,
        r, g, b;
    
    for (y = 0; y < srcHeight; y += 1) {
        for (x = 0; x < srcWidth; x += 1) {
            for (i = 0; i < levels; i += 1) {
                rh[i] = gh[i] = bh[i] = rt[i] = gt[i] = bt[i] = 0;
            }
            
            for (row = -range; row <= range; row += 1) {
                rowIndex = y + row;
                
                if (rowIndex < 0 || rowIndex >= srcHeight) {
                    continue;
                }
                
                offset = rowIndex * srcWidth;
                
                for (col = -range; col <= range; col += 1) {
                    colIndex = x + col;
                    if (colIndex < 0 || colIndex >= srcWidth) {
                        continue;
                    }
                    
                    srcIndex = (offset + colIndex) << 2;
                    sr = srcPixels[srcIndex];
                    sg = srcPixels[srcIndex + 1];
                    sb = srcPixels[srcIndex + 2];
                    ri = (sr * levels) >> 8;
                    gi = (sg * levels) >> 8;
                    bi = (sb * levels) >> 8;
                    rt[ri] += sr;
                    gt[gi] += sg;
                    bt[bi] += sb;
                    rh[ri] += 1;
                    gh[gi] += 1;
                    bh[bi] += 1;
                }
            }

            r = g = b = 0;
            for (i = 1; i < levels; i += 1) {
                if(rh[i] > rh[r]) {
                    r = i;
                }
                if(gh[i] > gh[g]) {
                    g = i;
                }
                if(bh[i] > bh[b]) {
                    b = i;
                }
            }

            dstPixels[index]     = rt[r] / rh[r] | 0;
            dstPixels[index + 1] = gt[g] / gh[g] | 0;
            dstPixels[index + 2] = bt[b] / bh[b] | 0;
            dstPixels[index + 3] = srcPixels[index + 3];
            index += 4;
        }
    }

    return dstImageData;
};

ImageFilters.OpacityFilter = function (srcImageData, opacity) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    for (var i = 0; i < srcLength; i += 4) {
        dstPixels[i]     = srcPixels[i];
        dstPixels[i + 1] = srcPixels[i + 1];
        dstPixels[i + 2] = srcPixels[i + 2];
        dstPixels[i + 3] = opacity;
    }

    return dstImageData;
};

/**
 * @param levels 2 <= n <= 255
 */
ImageFilters.Posterize = function (srcImageData, levels) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    levels = levels < 2 ? 2 : levels > 255 ? 255 : levels;

    var levelMap = [],
        levelsMinus1 = levels - 1,
        j = 0,
        k = 0,
        i;

    for (i = 0; i < levels; i += 1) {
        levelMap[i] = (255 * i) / levelsMinus1;
    }

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        var ret = levelMap[j];

        k += levels;

        if (k > 255) {
            k -= 255;
            j += 1;
        }

        return ret;
    });

    return dstImageData;
};

/**
 * @param scale 0.0 <= n <= 5.0
 */
ImageFilters.Rescale = function (srcImageData, scale) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        value *= scale;
        return (value > 255) ? 255 : value + 0.5 | 0;
    });

    return dstImageData;
};

/**
 * Nearest neighbor
 */
ImageFilters.ResizeNearestNeighbor = function (srcImageData, width, height) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(width, height),
        dstPixels    = dstImageData.data;

    var xFactor = srcWidth / width,
        yFactor = srcHeight / height,
        dstIndex = 0, srcIndex,
        x, y, offset;

    for (y = 0; y < height; y += 1) {
        offset = ((y * yFactor) | 0) * srcWidth;

        for (x = 0; x < width; x += 1) {
            srcIndex = (offset + x * xFactor) << 2;

            dstPixels[dstIndex]     = srcPixels[srcIndex];
            dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
            dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
            dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
            dstIndex += 4;
        }
    }

    return dstImageData;
};

/**
 * Bilinear
 */
ImageFilters.Resize = function (srcImageData, width, height) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(width, height),
        dstPixels    = dstImageData.data;

    var xFactor = srcWidth / width,
        yFactor = srcHeight / height,
        dstIndex = 0,
        x, y;

    for (y = 0; y < height; y += 1) {
        for (x = 0; x < width; x += 1) {
            this.utils.copyBilinear(srcPixels, x * xFactor, y * yFactor, srcWidth, srcHeight, dstPixels, dstIndex, 0);
            dstIndex += 4;
        }
    }

    return dstImageData;
};


/**
 * faster resizing using the builtin context.scale()
 * the resizing algorithm may be different between browsers
 * this might not work if the image is transparent.
 * to fix that we probably need two contexts
 */
ImageFilters.ResizeBuiltin = function (srcImageData, width, height) {
    var srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        canvas    = this.utils.getSampleCanvas(),
        context   = this.utils.getSampleContext(),
        dstImageData;

    canvas.width  = Math.max(srcWidth, width);
    canvas.height = Math.max(srcHeight, height);
    context.save();

    context.putImageData(srcImageData, 0, 0);
    context.scale(width / srcWidth, height / srcHeight);
    context.drawImage(canvas, 0, 0);

    dstImageData = context.getImageData(0, 0, width, height);

    context.restore();
    canvas.width = 0;
    canvas.height = 0;

    return dstImageData;
};

ImageFilters.Sepia = function (srcImageData) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    var r, g, b, i, value;

    for (i = 0; i < srcLength; i += 4) {
        r = srcPixels[i];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];

        dstPixels[i]     = (value = r * 0.393 + g * 0.769 + b * 0.189) > 255 ? 255 : value < 0 ? 0 : value + 0.5 | 0;
        dstPixels[i + 1] = (value = r * 0.349 + g * 0.686 + b * 0.168) > 255 ? 255 : value < 0 ? 0 : value + 0.5 | 0;
        dstPixels[i + 2] = (value = r * 0.272 + g * 0.534 + b * 0.131) > 255 ? 255 : value < 0 ? 0 : value + 0.5 | 0;
        dstPixels[i + 3] = srcPixels[i + 3];
    }

    return dstImageData;
};

/**
 * @param factor 1 <= n
 */
ImageFilters.Sharpen = function (srcImageData, factor) {
    //Convolution formula from VIGRA
    return this.ConvolutionFilter(srcImageData, 3, 3, [
        -factor/16,     -factor/8,      -factor/16,
        -factor/8,       factor*0.75+1, -factor/8,
        -factor/16,     -factor/8,      -factor/16
    ]);
};

ImageFilters.Solarize = function (srcImageData) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    this.utils.mapRGB(srcPixels, dstPixels, function (value) {
        return value > 127 ? (value - 127.5) * 2 : (127.5 - value) * 2;
    });

    return dstImageData;
};

ImageFilters.Transpose = function (srcImageData) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcHeight, srcWidth),
        dstPixels    = dstImageData.data;
    
    var srcIndex, dstIndex;
    
    for (var y = 0; y < srcHeight; y += 1) {
        for (var x = 0; x < srcWidth; x += 1) {
            srcIndex = (y * srcWidth + x) << 2;
            dstIndex = (x * srcHeight + y) << 2;

            dstPixels[dstIndex]     = srcPixels[srcIndex];
            dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
            dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
            dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
        }
    }
    
    return dstImageData;
};

/**
 * @param centerX 0.0 <= n <= 1.0
 * @param centerY 0.0 <= n <= 1.0
 * @param radius
 * @param angle(degree)
 * @param smooth
 */
ImageFilters.Twril = function (srcImageData, centerX, centerY, radius, angle, edge, smooth) {
    var srcPixels    = srcImageData.data,
        srcWidth     = srcImageData.width,
        srcHeight    = srcImageData.height,
        srcLength    = srcPixels.length,
        dstImageData = this.utils.createImageData(srcWidth, srcHeight),
        dstPixels    = dstImageData.data;

    //convert position to px
    centerX = srcWidth  * centerX;
    centerY = srcHeight * centerY;

    // degree to radian
    angle *= (Math.PI / 180);

    var radius2 = radius * radius,
        max_y = srcHeight - 1,
        max_x = srcWidth - 1,
        dstIndex = 0,
        x, y, dx, dy, distance, a, tx, ty, srcIndex, pixel, i;

    for (y = 0; y < srcHeight; y += 1) {
        for (x = 0; x < srcWidth; x += 1) {
            dx = x - centerX;
            dy = y - centerY;
            distance = dx * dx + dy * dy;

            if (distance > radius2) {
                // out of the effected area. just copy the pixel
                dstPixels[dstIndex]     = srcPixels[dstIndex];
                dstPixels[dstIndex + 1] = srcPixels[dstIndex + 1];
                dstPixels[dstIndex + 2] = srcPixels[dstIndex + 2];
                dstPixels[dstIndex + 3] = srcPixels[dstIndex + 3];
            }
            else {
                // main formula
                distance = Math.sqrt(distance);
                a  = Math.atan2(dy, dx) + (angle * (radius - distance)) / radius;
                tx = centerX + distance * Math.cos(a);
                ty = centerY + distance * Math.sin(a);

                // copy target pixel
                if (smooth) {
                    // bilinear
                    this.utils.copyBilinear(srcPixels, tx, ty, srcWidth, srcHeight, dstPixels, dstIndex, edge);
                }
                else {
                    // nearest neighbor
                    // round tx, ty
                    // TODO edge actions!!
                    srcIndex = ((ty + 0.5 | 0) * srcWidth + (tx + 0.5 | 0)) << 2;
                    dstPixels[dstIndex]     = srcPixels[srcIndex];
                    dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
                    dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
                    dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
                }
            }
            
            dstIndex += 4;
        }
    }

    return dstImageData;
};

/*global Ichie:false, exports:false*/

// -----------------------------------------------------------------------------
//                          EXPORTS SECTION
// In this section you'll find all the methods/properties, that we expose.
// -----------------------------------------------------------------------------

exports.IchieJs = {
    /**
     * @see IchieJs for supported options.
     */
    create: function(options) 
    {
        var exposed_methods = [ 
            'launch' , 'showSelection', 'hideSelection', 'setSelectMode', 'copySelection',
            'pasteClipboard', 'filter', 'crop', 'undo', 'redo', 'downloadAsImage'
        ];

        var ichie = new Ichie();
        ichie.init(options);

        var api = {};
        for (var i = 0; i < exposed_methods.length; i++)
        {
            var method_name = exposed_methods[i];
            api[method_name] = ichie[method_name].bind(ichie);
        }
        return api;
    }
};
}