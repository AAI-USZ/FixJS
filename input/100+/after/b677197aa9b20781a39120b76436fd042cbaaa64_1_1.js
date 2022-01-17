function() {
    goog.events.EventTarget.call(this);

    this.children_ = [];

    this.parent_ = null;

    /** type {Object.<number, number>} */
    this.transitionsAdd_ = {};
    this.transitionsActive_ = {};
    this.transitionsActiveSet_ = {};
    /** type {Object.<number, number>} */
    this.transitionsClear_ = {};

    /**
     * Allow translate3d and other css optimizations
     * @type {boolean}
     */
    this.allow3DCSSTransform_ = true;
    
    /**
     * Node has been added to DOM tree
     * @type {boolean}
     */
    this.inTree_ = false;

    this.director_ = null;

    this.scene_ = null;

    /**
     * Hash of active event handlers
     * @type {Object}
     * @private
     */
    this.eventHandlers_ = {};

    this.setScale(1);

    this.setPosition(0, 0);

    this.setSize(0, 0);

    this.quality_ = 1.0;

    this.setAnchorPoint(0.5, 0.5);

    this.setRotation(0);

    this.setAutoResize(lime.AutoResize.NONE);

    this.opacity_ = 1;

    this.setMask(null);

    this.setRenderer(this.supportedRenderers[0].getType());

    this.setDirty(lime.Dirty.LAYOUT);
}