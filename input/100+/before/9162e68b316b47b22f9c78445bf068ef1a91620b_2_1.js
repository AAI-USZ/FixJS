function Element(draw, onframe) {
    this.id = guid();
    this.name = '';
    this.state = Element.createState(this);
    this.xdata = Element.createXData(this);    
    this.children = [];
    this.parent = null;
    this.sprite = false;
    this.visible = false;
    this.registered = false;
    this.disabled = false;
    this.rendering = false;
    this.scene = null;
    this.__data = null;
    this._modifiers = [];
    this._painters = [];
    if (onframe) this.__modify(Element.USER_MOD, 0, onframe);
    if (draw) this.__paint(Element.USER_PNT, 0, draw);
    this.__lastJump = null;
    this.__jumpLock = false;
    this.__modifying = null; // current modifiers class, if modifying
    this.__painting = null; // current painters class, if modifying
    this.__evtCache = [];
    this.__removeQueue = [];
    this._initHandlers(); // TODO: make automatic
    var _me = this,
        default_on = this.on;
    this.on = function(type, handler) {
        if (type & C.XT_CONTROL) {
            this.m_on.call(_me, type, handler);
        } else default_on.call(_me, type, handler);
    };
    this.__addSysModifiers();
    this.__addSysPainters();
}