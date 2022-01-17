function Smallimap(obj, cwidth, cheight, renderContext, world, options) {
        this.obj = obj;
        this.renderContext = renderContext;
        this.world = world;
        if (options == null) {
          options = {};
        }
        this.addMapIcon = __bind(this.addMapIcon, this);

        this.enqueueEvent = __bind(this.enqueueEvent, this);

        this.triggerOverlay = __bind(this.triggerOverlay, this);

        this.reset = __bind(this.reset, this);

        this.markDirty = __bind(this.markDirty, this);

        this.render = __bind(this.render, this);

        this.landinessOf = __bind(this.landinessOf, this);

        this.convertToWorldY = __bind(this.convertToWorldY, this);

        this.convertToWorldX = __bind(this.convertToWorldX, this);

        this.colorFor = __bind(this.colorFor, this);

        this.generateGrid = __bind(this.generateGrid, this);

        this.refresh = __bind(this.refresh, this);

        this.run = __bind(this.run, this);

        $.extend(true, this, options);
        this.dotDiameter = this.dotRadius * 2;
        this.width = cwidth / this.dotDiameter;
        this.height = cheight / this.dotDiameter;
        this.lastX = -1;
        this.lastY = -1;
        this.dirtyXs = void 0;
        this.eventQueue = [];
        this.lastRefresh = 0;
        this.mapIcons = [];
        this.grid = this.generateGrid(this.width, this.height);
      }