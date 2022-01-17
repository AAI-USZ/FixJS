function(def, pv){

/*global pvc:true */
var pvc = def.globalSpace('pvc', {
    // 0 - off
    // 1 - errors 
    // 2 - errors, warnings
    // 3 - errors, warnings, info
    // 4 - verbose
    // 5 - trash
    // ...
    debug: 0
});

// Begin private scope
(function(){

// goldenRatio proportion
// ~61.8% ~ 38.2%
pvc.goldenRatio = (1 + Math.sqrt(5)) / 2;

pvc.invisibleFill = 'rgba(127,127,127,0.00001)';

var arraySlice = pvc.arraySlice = Array.prototype.slice;

/**
 *  Utility function for logging messages to the console
 */
pvc.log = function(m){

    if (pvc.debug && typeof console != "undefined"){
        console.log("[pvChart]: " + 
          (typeof m === 'string' ? m : JSON.stringify(m)));
    }
};

pvc.logError = function(m){
    if (typeof console != "undefined"){
        console.log("[pvChart ERROR]: " + m);
    } else {
        throw new Error("[pvChart ERROR]: " + m);
    }
};

/**
 * Evaluates x if it's a function or returns the value otherwise
 */
pvc.ev = function(x){
    return typeof x == "function" ? x(): x;
};

/**
 * Sums two numbers.
 * 
 * If v1 is null or undefined, v2 is returned.
 * If v2 is null or undefined, v1 is returned.
 * Else the sum of the two is returned.
 */
pvc.sum = function(v1, v2){
    return v1 == null ? 
            v2 :
            (v1 == null ? v1 : (v1 + v2));
};

pvc.cloneMatrix = function(m){
    return m.map(function(d){
        return d.slice();
    });
};

pvc.mergeDefaults = function(to, defaults, from){
    def.eachOwn(defaults, function(dv, p){
        var v, dvo;
        
        if(from){ 
            v = from[p];
        }
        
        if(v !== undefined){
            var vo = def.object.asNative(v);
            if(vo){
                dvo = def.object.asNative(dv);
                if(dvo){
                    v = def.create(dvo, vo);
                } // else, ignore dv
            } // else, simple value (null included) ignores dv
        }
        
        if(v === undefined){
            // Inherit default native objects
            dvo = def.object.asNative(dv);
            if(dvo){
                dv = Object.create(dvo);
            }
            v = dv;
        }
        
        to[p] = v;
    });
    
    return to;
};

// Adapted from pv.range
pvc.Range = function(start, stop, step){
    if (arguments.length == 1) {
        stop  = start;
        start = 0;
    }
  
    if (step == null) {
        step = 1;
    }
    
    if ((stop - start) / step == Infinity) {
        throw new Error("range must be finite");
    }
  
    this.stop  = stop;//-= (stop - start) * 1e-10; // floating point precision!
    this.start = start;
    this.step  = step;
};

pvc.Range.prototype.forEach = function(fun, ctx){
    var i = 0, j;
    if (this.step < 0) {
        while((j = this.start + this.step * i++) > this.stop) {
            fun.call(ctx, j);
        }
    } else {
        while((j = this.start + this.step * i++) < this.stop) {
            fun.call(ctx, j);
        }
    }
};

pvc.Range.prototype.map = function(fun, ctx){
    var result = [];
    
    this.forEach(function(j){
        result.push(fun.call(ctx, j));
    });
    
    return result;
};

/**
 * Equals for two arrays
 * func - needed if not flat array of comparables
 **/
pvc.arrayEquals = function(array1, array2, func){
  if(array1 == null){return array2 == null;}
  
  var useFunc = typeof(func) == 'function';
  
  for(var i=0;i<array1.length;i++)
  {
    if(useFunc){
        if(!func(array1[i],array2[i])){
            return false;
        }
    }
    else if(array1[i]!=array2[i]){
        return false;   
    }
  }
  return true;
};

/**
 * Creates a color scheme based on the specified colors.
 * The default color scheme is "pv.Colors.category10", 
 * and is returned when null or an empty array is specified.
 */
pvc.createColorScheme = function(colors){
    if (colors == null || !colors.length){
        return pv.Colors.category10;
    }
	
    colors = def.array.as(colors);
	
    return function() {
        var scale = pv.colors(colors); // creates a color scale with a defined range
        scale.domain.apply(scale, arguments); // defines the domain of the color scale
        return scale;
    };
};

// Convert to Grayscale using YCbCr luminance conv.
pvc.toGrayScale = function(color, alpha, maxGrayLevel, minGrayLevel){
    color = pv.color(color);
    
    var avg = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    // Don't let the color get near white, or it becomes unperceptible in most monitors
    if(maxGrayLevel === undefined) {
        maxGrayLevel = 200;
    } else if(maxGrayLevel == null){
        maxGrayLevel = 255; // no effect
    }
    
    if(minGrayLevel === undefined){
        minGrayLevel = 30;
    } else if(minGrayLevel == null){
        minGrayLevel = 0; // no effect
    }
    
    var delta = (maxGrayLevel - minGrayLevel);
    if(delta <= 0){
        avg = maxGrayLevel;
    } else {
        // Compress
        avg = minGrayLevel + (avg / 255) * delta;
    }
    
    if(alpha == null){
        alpha = color.opacity;
    }
    
    avg = Math.round(avg);
    
    return pv.rgb(avg, avg, avg, alpha);
};

pvc.removeTipsyLegends = function(){
    try {
        $('.tipsy').remove();
    } catch(e) {
        // Do nothing
    }
};

pvc.createDateComparer = function(parser, key){
    if(!key){
        key = pv.identity;
    }
    
    return function(a, b){
        return parser.parse(key(a)) - parser.parse(key(b));
    };
};

pv.Format.createParser = function(pvFormat) {
    
    function parse(value) {
        return pvFormat.parse(value);
    }
    
    return parse;
};

pv.Format.createFormatter = function(pvFormat) {
    
    function format(value) {
        return value != null ? pvFormat.format(value) : "";
    }
    
    return format;
};

pvc.parseAlign = function(side, align){
    if(side === 'left' || side === 'right'){
        switch(align){
            case 'top':
            case 'bottom':
            case 'middle':
                break;
            
            default:
                if(align && pvc.debug >= 2){
                    pvc.log(def.format("Invalid alignment value '{0}'.", [align]));
                }
                align = 'top';
        }
    } else {
        switch(align){
            case 'left':
            case 'right':
            case 'center':
                break;
            
            default:
                if(align && pvc.debug >= 2){
                    pvc.log(def.format("Invalid alignment value '{0}'.", [align]));
                }
                align = 'left';
        }
    }
    
    return align;
};

/**
 * Creates a margins/sides object.
 * @constructor
 * @param {string|number|object} sides May be a css-like shorthand margin string.
 * 
 * <ol>
 *   <li> "1" - {all: '1'}</li>
 *   <li> "1 2" - {top: '1', left: '2', right: '2', bottom: '1'}</li>
 *   <li> "1 2 3" - {top: '1', left: '2', right: '2', bottom: '3'}</li>
 *   <li> "1 2 3 4" - {top: '1', right: '2', bottom: '3', left: '4'}</li>
 * </ol>
 */
pvc.Sides = function(sides){
    if(sides != null){
        this.setSides(sides);
    }
};

pvc.Sides.names = 'left right top bottom'.split(' ');
pvc.Sides.namesSet = pv.dict(pvc.Sides.names, def.retTrue);

pvc.Sides.prototype.setSides = function(sides){
    if(typeof sides === 'string'){
        var comps = sides.split(/\s+/).map(function(comp){
            return pvc.PercentValue.parse(comp);
        });
        
        switch(comps.length){
            case 1:
                this.set('all', comps[0]);
                return this;
                
            case 2:
                this.set('top',    comps[0]);
                this.set('left',   comps[1]);
                this.set('right',  comps[1]);
                this.set('bottom', comps[0]);
                return this;
                
            case 3:
                this.set('top',    comps[0]);
                this.set('left',   comps[1]);
                this.set('right',  comps[1]);
                this.set('bottom', comps[2]);
                return this;
                
            case 4:
                this.set('top',    comps[0]);
                this.set('right',  comps[1]);
                this.set('bottom', comps[2]);
                this.set('left',   comps[3]);
                return this;
                
            case 0:
                return this;
        }
    } else if(typeof sides === 'number') {
        this.set('all', sides);
        return this;
    } else if (typeof sides === 'object') {
        this.set('all', sides.all);
        for(var p in sides){
            if(p !== 'all'){
                this.set(p, sides[p]);
            }
        }
        return this;
    }
    
    if(pvc.debug) {
        pvc.log("Invalid 'sides' value: " + JSON.stringify(sides));
    }
    
    return this;
};

pvc.Sides.prototype.set = function(prop, value){
    value = pvc.PercentValue.parse(value);
    if(value != null){
        if(prop === 'all'){
            // expand
            pvc.Sides.names.forEach(function(p){
                this[p] = value;
            }, this);
            
        } else if(def.hasOwn(pvc.Sides.namesSet, prop)){
            this[prop] = value;
        }
    }
};

pvc.Sides.prototype.resolve = function(width, height){
    if(typeof width === 'object'){
        height = width.height;
        width  = width.width;
    }
    
    var sides = {};
    
    pvc.Sides.names.forEach(function(side){
        var value  = 0;
        var sideValue = this[side];
        if(sideValue != null){
            if(typeof(sideValue) === 'number'){
                value = sideValue;
            } else {
                value = sideValue.resolve((side === 'left' || side === 'right') ? width : height);
            }
        }
        
        sides[side] = value;
    }, this);
    
    sides.width  = sides.left   + sides.right;
    sides.height = sides.bottom + sides.top;
    
    return sides;
};

pvc.PercentValue = function(pct){
    this.percent = pct;
};

pvc.PercentValue.prototype.resolve = function(total){
    return this.percent * total;
};

pvc.PercentValue.parse = function(value){
    if(value != null && value !== ''){
        switch(typeof value){
            case 'number': return value;
            case 'string':
                var match = value.match(/^(.+?)\s*(%)?$/);
                if(match){
                    var n = +match[1];
                    if(!isNaN(n)){
                        if(match[2]){
                            if(n >= 0){
                                return new pvc.PercentValue(n / 100);
                            }
                        } else {
                            return n;
                        }
                    }
                }
                break;
                
            case 'object':
                if(value instanceof pvc.PercentValue){
                    return value;
                }
                break;
        }
        
        if(pvc.debug){
            pvc.log(def.format("Invalid margins component '{0}'", [''+value]));
        }
    }
};

/* Protovis Z-Order support between sibling marks */

// Default values
pv.Mark.prototype._zOrder = 0;

pv.Panel.prototype._hasZOrderChild = false;
pv.Panel.prototype._needChildSort  = false;

pv.Mark.prototype.zOrder = function(zOrder) {
    var borderPanel = this.borderPanel;
    if(borderPanel && borderPanel !== this){
        return borderPanel.zOrder.apply(borderPanel, arguments);
    }
    
    if(!arguments.length){
        return this._zOrder;
    }
    
    if(this._zOrder !== zOrder){
        this._zOrder = zOrder;
        
        if(this.parent){
            this.parent._hasZOrderChild = 
            this.parent._needChildSort  = true;
        }
    }
    
    return this;
};

// Copy original methods
var markRender = pv.Mark.prototype.render,
    panelAdd   = pv.Panel.prototype.add;

// @replace
pv.Panel.prototype.add = function(){
    var mark = panelAdd.apply(this, arraySlice.call(arguments));

    // Detect new child with non-zero ZOrder
    if(!this._hasZOrderChild && mark._zOrder !== 0){
        this._hasZOrderChild = this._needChildSort  = true;
    }

    return mark;
};

// @replace
pv.Mark.prototype.render = function(){
    /* For the first render, take it from the top. */
    if (this.parent && !this.root.scene) {
        this.root.render();
        return;
    }
    
    /* Ensure zOrder is up to date */
    sortChildren.call(this);
    
    /* Assign a new render id to the root mark */
    var rootId = this.root._rootId;
    if(rootId == null){
        rootId = this.root._rootId = def.nextId('rootMarks');
    }
    
    this.root._renderId = def.nextId("render" + rootId);
    
    if(pvc.debug >= 4){
        pvc.log("BEGIN RENDER " + this.root._renderId);
    }
    
    /* Render */
    markRender.apply(this, arguments);
    
    if(pvc.debug >= 4){
        pvc.log("END RENDER " + this.root._renderId);
    }
};

pv.Mark.prototype.renderId = function(){
    return this.root._renderId;
};

function sortChildren(){
    // Sort children by their Z-Order
    var children = this.children, L;
    if(children && (L = children.length)){
        var needChildSort = this._needChildSort;
        if(needChildSort){
            children.sort(function(m1, m2){
                return def.compare(m1._zOrder, m2._zOrder);
            });
            
            this._needChildSort = false;
        }
        
        // Fix childIndex and apply recursively
        for(var i = 0 ; i < L ; i++){
            var child = children[i]; 
            if(needChildSort) { 
                child.childIndex = i; 
            }
            
            if(child instanceof pv.Panel){
                sortChildren.call(child);
            }
        }
    }
}

/* DOM */
/**
 * Inserts the specified child <i>n</i> at the given index. 
 * Any child from the given index onwards will be moved one position to the end. 
 * If <i>index</i> is null, this method is equivalent to
 * {@link #appendChild}. 
 * If <i>n</i> is already part of the DOM, it is first
 * removed before being inserted.
 *
 * @throws Error if <i>index</i> is non-null and greater than the current number of children.
 * @returns {pv.Dom.Node} the inserted child.
 */
pv.Dom.Node.prototype.insertAt = function(n, index) {
    var L;
    if (index == null || index === (L = this.childNodes.length)){     
        return this.appendChild(n);
    }
    
    if(index > L){
        throw new Error("Index out of range.");
    }
    
    if (n.parentNode) {
        n.parentNode.removeChild(n);
    }
    
    var r = this.childNodes[index];
    n.parentNode = this;
    n.nextSibling = r;
    n.previousSibling = r.previousSibling;
    if (r.previousSibling) {
        r.previousSibling.nextSibling = n;
    } else {
        if (r == this.lastChild) {
            this.lastChild = n;
        }
        this.firstChild = n;
    }
    this.childNodes.splice(index, 0, n);
    return n;
};

/**
 * Removes the child node at the specified index from this node.
 */
pv.Dom.Node.prototype.removeAt = function(i) {
  var n = this.childNodes[i];
  if(n){
      this.childNodes.splice(i, 1);
      if (n.previousSibling) { 
          n.previousSibling.nextSibling = n.nextSibling; 
      } else { 
          this.firstChild = n.nextSibling; 
      }
      
      if (n.nextSibling) {
          n.nextSibling.previousSibling = n.previousSibling;
      } else {
          this.lastChild = n.previousSibling;
      }
      
      delete n.nextSibling;
      delete n.previousSibling;
      delete n.parentNode;
  }
  return n;
};


/* Local Properties */
/**
 * Adapted from pv.Layout#property.
 * Defines a local property with the specified name and cast.
 * Note that although the property method is only defined locally,
 * the cast function is global,
 * which is necessary since properties are inherited!
 *
 * @param {string} name the property name.
 * @param {function} [cast] the cast function for this property.
 */
pv.Mark.prototype.localProperty = function(name, cast) {
  if (!this.hasOwnProperty("properties")) {
    this.properties = pv.extend(this.properties);
  }
  this.properties[name] = true;
  this.propertyMethod(name, false, pv.Mark.cast[name] = cast);
  return this;
};

/* PROPERTIES */
/**
 * Returns the value of a property as specified upon definition,
 * and, thus, without evaluation.
 */
pv.Mark.prototype.getStaticPropertyValue = function(name) {
    var properties = this.$properties;
    for (var i = 0, L = properties.length; i < L; i++) {
        var property = properties[i];
        if (property.name == name) {
            return property.value;
        }
    }
    //return undefined;
};

pv.Mark.prototype.intercept = function(prop, interceptor, extValue){
    if(extValue !== undefined){
        this[prop](extValue);
        
        extValue = this.getStaticPropertyValue(prop);
    } else if(!this._intercepted || !this._intercepted[prop]) { // Don't intercept any previous interceptor...
        extValue = this.getStaticPropertyValue(prop);
    }
        
    // Let undefined pass through as a sign of not-intercepted
    // A 'null' value is considered as an existing property value.
    if(extValue !== undefined){
        extValue = pv.functor(extValue);
    }
    
    function interceptProp(){
        var args  = arraySlice.call(arguments);
        return interceptor.call(this, extValue, args);
    }

    this[prop](interceptProp);

    (this._intercepted || (this._intercepted = {}))[prop] = true;

    return this;
};

pv.Mark.prototype.lock = function(prop, value){
    if(value !== undefined){
        this[prop](value);
    }

    (this._locked || (this._locked = {}))[prop] = true;
    
    return this;
};


pv.Mark.prototype.isIntercepted = function(prop){
    return this._intercepted && this._intercepted[prop];
};

pv.Mark.prototype.isLocked = function(prop){
    return this._locked && this._locked[prop];
};

/**
 * Function used to propagate a datum received, as a singleton list.
 * Used to prevent re-evaluation of inherited data property functions.
 */
pv.dataIdentity = function(datum){
    return [datum];
};

/* ANCHORS */
/**
 * name = left | right | top | bottom
 */
pv.Mark.prototype.addMargin = function(name, margin) {
    if(margin !== 0){
        var staticValue = def.nullyTo(this.getStaticPropertyValue(name), 0),
            fMeasure    = pv.functor(staticValue);
        
        this[name](function(){
            return margin + fMeasure.apply(this, arraySlice.call(arguments));
        });
    }
    
    return this;
};

/**
 * margins = {
 *      all:
 *      left:
 *      right:
 *      top:
 *      bottom:
 * }
 */
pv.Mark.prototype.addMargins = function(margins) {
    var all = def.get(margins, 'all', 0);
    
    this.addMargin('left',   def.get(margins, 'left',   all));
    this.addMargin('right',  def.get(margins, 'right',  all));
    this.addMargin('top',    def.get(margins, 'top',    all));
    this.addMargin('bottom', def.get(margins, 'bottom', all));
    
    return this;
};

/* SCENE */
/**
 * Iterates through all instances that
 * this mark has rendered.
 */
pv.Mark.prototype.forEachInstance = function(fun, ctx){
    var mark = this,
        indexes = [],
        breakInstance = {
            isBreak: true,
            visible: false,
            datum: {}
        };

    /* Go up to the root and register our way back.
     * The root mark never "looses" its scene.
     */
    while(mark.parent){
        indexes.unshift(mark.childIndex);
        mark = mark.parent;
    }

    // mark != null

    // root scene exists if rendered at least once
    var rootScene = mark.scene;
    if(!rootScene){
        return;
    }
    
    var L = indexes.length;

    function collectRecursive(scene, level, toScreen){
        var isLastLevel = level === L, 
            childIndex;
        
        if(!isLastLevel) {
            childIndex = indexes[level];
        }
        
        for(var index = 0, D = scene.length; index < D ; index++){
            var instance = scene[index];
            if(level === L){
                fun.call(ctx, scene[index], toScreen);
            } else if(instance.visible) {
                var childScene = instance.children[childIndex];
                
                // Some nodes might have not been rendered?
                if(childScene){
                    var childToScreen = toScreen
                                            .times(instance.transform)
                                            .translate(instance.left, instance.top);
                    
                    collectRecursive(childScene, level + 1, childToScreen);
                }
            }
        }
        
        if(D > 0) {
            fun.call(ctx, breakInstance, null);
        }
    }

    collectRecursive(rootScene, 0, pv.Transform.identity);
};

pv.Mark.prototype.forEachSignumInstance = function(fun, ctx){
    this.forEachInstance(function(instance, t){
        if(instance.datum || instance.group){
            fun.call(ctx, instance, t);
        }
    });
};

/* BOUNDS */
pv.Mark.prototype.toScreenTransform = function(){
    var t = pv.Transform.identity;
    
    if(this instanceof pv.Panel) {
        t = t.translate(this.left(), this.top())
             .times(this.transform());
    }

    var parent = this.parent; // TODO : this.properties.transform ? this : this.parent
    if(parent){
        do {
            t = t.translate(parent.left(), parent.top())
                 .times(parent.transform());
        } while ((parent = parent.parent));
    }
    
    return t;
};

pv.Transform.prototype.transformHPosition = function(left){
    return this.x + (this.k * left);
};

pv.Transform.prototype.transformVPosition = function(top){
    return this.y + (this.k * top);
};

// width / height
pv.Transform.prototype.transformLength = function(length){
    return this.k * length;
};

// -----------

pv.Mark.prototype.getInstanceShape = function(instance){
    return new Rect(
            instance.left,
            instance.top,
            instance.width,
            instance.height);
};

pv.Mark.prototype.getInstanceCenterPoint = function(instance){
    return new Point(
                instance.left + (instance.width  || 0) / 2,
                instance.top +  (instance.height || 0) / 2);
};

pv.Label.prototype.getInstanceShape = function(instance){
    // TODO
    return new Rect(
            instance.left,
            instance.top,
            10,
            10);
};

pv.Wedge.prototype.getInstanceCenterPoint = function(instance){
    var midAngle  = instance.startAngle + (instance.angle / 2);
    var midRadius = (instance.outerRadius + instance.innerRadius) / 2;
    var dotLeft   = instance.left + midRadius * Math.cos(midAngle);
    var dotTop    = instance.top  + midRadius * Math.sin(midAngle);
    
    return new Point(dotLeft, dotTop);
};

pv.Wedge.prototype.getInstanceShape = function(instance){
    var center = this.getInstanceCenterPoint(instance);

    // TODO: at a minimum, improve calculation of circle radius
    // to match the biggest circle within the wedge at that point
    
    return new Circle(center.x, center.y, 10);
};

pv.Dot.prototype.getInstanceShape = function(instance){
    var radius = instance.shapeRadius,
        cx = instance.left,
        cy = instance.top;

    // TODO: square and diamond break when angle is used
    switch(instance.shape){
        case 'diamond':
            radius *= Math.SQRT2;
            // NOTE fall through
        case 'square':
        case 'cross':
            return new Rect(
                cx - radius,
                cy - radius,
                2*radius,
                2*radius);
    }

    // 'circle' included
    
    // Select dots only when the center is included
    return new Circle(cx, cy, radius);
};

pv.Dot.prototype.getInstanceCenterPoint = function(instance){
    return new Point(instance.left, instance.top);
};

pv.Area.prototype.getInstanceShape =
pv.Line.prototype.getInstanceShape = function(instance, nextInstance){
    return new Line(instance.left, instance.top, nextInstance.left, nextInstance.top);
};

pv.Area.prototype.getInstanceCenterPoint =
pv.Line.prototype.getInstanceCenterPoint = function(instance, nextInstance){
    return new Point(
            (instance.left + nextInstance.left) / 2, 
            (instance.top  + nextInstance.top ) / 2);
};


// --------------------

var Size = def.type('pvc.Size')
.init(function(width, height){
    if(arguments.length === 1){
        if(width != null){
            this.setSize(width);
        }
    } else {
        if(width != null){
            this.width  = width;
        }
        
        if(height != null){
            this.height = height;
        }
    }
})
.add({
    setSize: function(size, keyArgs){
        if(typeof size === 'string'){
            var comps = size.split(/\s+/).map(function(comp){
                return pvc.PercentValue.parse(comp);
            });
            
            switch(comps.length){
                case 1: 
                    this.set(def.get(keyArgs, 'singleProp', 'all'), comps[0]);
                    return this;
                    
                case 2:
                    this.set('width',  comps[0]);
                    this.set('height', comps[1]);
                    return this;
                    
                case 0:
                    return this;
            }
        } else if(typeof size === 'number') {
            this.set(def.get(keyArgs, 'singleProp', 'all'), size);
            return this;
        } else if (typeof size === 'object') {
            this.set('all', size.all);
            for(var p in size){
                if(p !== 'all'){
                    this.set(p, size[p]);
                }
            }
            return this;
        }
        
        if(pvc.debug) {
            pvc.log("Invalid 'size' value: " + JSON.stringify(size));
        }
        return this;
    },
    
    set: function(prop, value){
        if(value != null && def.hasOwn(pvc.Size.namesSet, prop)){
            value = pvc.PercentValue.parse(value);
            if(value != null){
                if(prop === 'all'){
                    // expand
                    pvc.Size.names.forEach(function(p){
                        this[p] = value;
                    }, this);
                    
                } else {
                    this[prop] = value;
                }
            }
        }
    },
    
    clone: function(){
        return new Size(this.width, this.height);
    },
    
    intersect: function(size){
        return new Size(
               Math.min(this.width,  size.width), 
               Math.min(this.height, size.height));
    },
    
    resolve: function(refSize){
        var size = {};
        
        pvc.Size.names.forEach(function(length){
            var lengthValue = this[length];
            if(lengthValue != null){
                if(typeof(lengthValue) === 'number'){
                    size[length] = lengthValue;
                } else if(refSize){
                    var refLength = refSize[length];
                    if(refLength != null){
                        size[length] = lengthValue.resolve(refLength);
                    }
                }
            }
        }, this);
        
        return size;
    }
});

pvc.Size.names = ['width', 'height'];
pvc.Size.namesSet = pv.dict(pvc.Size.names, def.retTrue);

// --------------------

var Shape = def.type('pvc.Shape')
.add({
    transform: function(t){
        return this.clone().apply(t);
    }

    // clone
    // intersectsRect
});

// --------------------

var Point = def.type('pvc.Point', Shape)
.init(function(x, y){
    this.set(x, y);
})
.add({
    set: function(x, y){
        this.x  = x  || 0;
        this.y  = y  || 0;
    },

    clone: function(){
        return new Point(this.x, this.y);
    },

    apply: function(t){
        this.x  = t.transformHPosition(this.x);
        this.y  = t.transformVPosition(this.y);
        return this;
    },

    intersectsRect: function(rect){
        // Does rect contain the point
        var minX = Math.min(rect.x, rect.x2),
            maxX = Math.max(rect.x, rect.x2),
            minY = Math.min(rect.y, rect.y2),
            maxY = Math.max(rect.y, rect.y2);

        return (this.x >= minX) && (this.x <= maxX) &&
               (this.y >= minY) && (this.y <= maxY);
    }
});

// --------------------

var Rect = def.type('pvc.Rect', Shape)
.init(function(x, y, dx, dy){
    this.set(x, y, dx, dy);
})
.add({
    set: function(x, y, dx, dy){
        this.x  = x  || 0;
        this.y  = y  || 0;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this.calc();
    },

    calc: function(){
        this.x2  = this.x + this.dx;
        this.y2  = this.y + this.dy;
    },

    clone: function(){
        return new Rect(this.x, this.y, this.dx, this.dy);
    },

    apply: function(t){
        this.x  = t.transformHPosition(this.x);
        this.y  = t.transformVPosition(this.y);
        this.dx = t.transformLength(this.dx);
        this.dy = t.transformLength(this.dy);
        this.calc();
        return this;
    },
    
    containsPoint: function(x, y){
        return this.x < x && x < this.x2 && 
               this.y < y && y < this.y2;
    },
    
    intersectsRect: function(rect){
//        pvc.log("[" + [this.x, this.x2, this.y, this.y2] + "]~" +
//                "[" + [rect.x, rect.x2, rect.y, rect.y2] + "]");

        // rect is not trusted to be normalized...(line...)
        var minX = Math.min(rect.x, rect.x2),
            maxX = Math.max(rect.x, rect.x2),
            minY = Math.min(rect.y, rect.y2),
            maxY = Math.max(rect.y, rect.y2);

        return (this.x2 > minX ) &&  // Some intersection on X
               (this.x  < maxX ) &&
               (this.y2 > minY ) &&  // Some intersection on Y
               (this.y  < maxY);
    },

    getSides: function(){
        var x  = Math.min(this.x, this.x2),
            y  = Math.min(this.y, this.y2),
            x2 = Math.max(this.x, this.x2),
            y2 = Math.max(this.y, this.y2);

        /*
         *    x,y    A
         *     * ------- *
         *  D  |         |  B
         *     |         |
         *     * --------*
         *              x2,y2
         *          C
         */
        if(!this._sides){
            this._sides = [
                //x, y, x2, y2
                new Line(x,  y,  x2, y),
                new Line(x2, y,  x2, y2),
                new Line(x,  y2, x2, y2),
                new Line(x,  y,  x,  y2)
            ];
        }

        return this._sides;
    }
});

// ------

var Circle = def.type('pvc.Circle', Shape)
.init(function(x, y, radius){
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
})
.add({
    clone: function(){
        return new Circle(this.x, this.y, this.radius);
    },

    apply: function(t){
        this.x = t.transformHPosition(this.x);
        this.y = t.transformVPosition(this.y);
        this.radius = t.transformLength(this.radius);
        return this;
    },

    intersectsRect: function(rect){
        // Taken from http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
        var dx2 = rect.dx / 2,
            dy2 = rect.dy / 2;

        var circleDistX = Math.abs(this.x - rect.x - dx2),
            circleDistY = Math.abs(this.y - rect.y - dy2);

        if ((circleDistX > dx2 + this.radius) ||
            (circleDistY > dy2 + this.radius)) {
            return false;
        }

        if (circleDistX <= dx2 || circleDistY <= dy2) {
            return true;
        }

        var sqCornerDistance = Math.pow(circleDistX - dx2, 2) +
                            Math.pow(circleDistY - dy2, 2);

        return sqCornerDistance <= (this.radius * this.radius);
    }
});

// -----

var Line = def.type('pvc.Line', Shape)
.init(function(x, y, x2, y2){
    this.x  = x  || 0;
    this.y  = y  || 0;
    this.x2 = x2 || 0;
    this.y2 = y2 || 0;
})
.add({
    clone: function(){
        return new pvc.Line(this.x, this.y, this.x2, this.x2);
    },

    apply: function(t){
        this.x  = t.transformHPosition(this.x );
        this.y  = t.transformVPosition(this.y );
        this.x2 = t.transformHPosition(this.x2);
        this.y2 = t.transformVPosition(this.y2);
        return this;
    },

    intersectsRect: function(rect){
        if(!rect) {
            return false;
        }
        var sides = rect.getSides();
        for(var i = 0 ; i < 4 ; i++){
            if(this.intersectsLine(sides[i])){
                return true;
            }
        }

        return false;
    },

    intersectsLine: function(b){
        // See: http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/
        var a = this,

            x21 = a.x2 - a.x,
            y21 = a.y2 - a.y,

            x43 = b.x2 - b.x,
            y43 = b.y2 - b.y,

            denom = y43 * x21 - x43 * y21;

        if(denom === 0){
            // Parallel lines: no intersection
            return false;
        }

        var y13 = a.y - b.y,
            x13 = a.x - b.x,
            numa = (x43 * y13 - y43 * x13),
            numb = (x21 * y13 - y21 * x13);

        if(denom === 0){
            // Both 0  => coincident
            // Only denom 0 => parallel, but not coincident
            return (numa === 0) && (numb === 0);
        }

        var ua = numa / denom;
        if(ua < 0 || ua > 1){
            // Intersection not within segment a
            return false;
        }

        var ub = numb / denom;
        if(ub < 0 || ub > 1){
            // Intersection not within segment b
            return false;
        }

        return true;
    }
});

}()); // End private scope


/**
 * Equal to pv.Behavior.select but doesn't necessarily
 * force redraw of component it's in on mousemove, and sends event info
 * (default behavior matches pv.Behavior.select())
 * @param {boolean} autoRefresh refresh parent mark automatically
 * @param {pv.Mark} mark
 * @return {function} mousedown
 **/
pv.Behavior.selector = function(autoRefresh, mark) {
  var scene, // scene context
      index, // scene context
      m1, // initial mouse position
      redrawThis = (arguments.length > 0)?
                    autoRefresh : true; //redraw mark - default: same as pv.Behavior.select
    
  /** @private */
  function mousedown(d, e) {
    if(mark == null){
        index = this.index;
        scene = this.scene;
    } else {
        index = mark.index;
        scene = mark.scene;
    }
    
    m1 = this.mouse();

    scene.mark.selectionRect = new pvc.Rect(m1.x, m1.y);
    
    pv.Mark.dispatch("selectstart", scene, index, e);
  }

  /** @private */
  function mousemove(e) {
    if (!scene) {
        return;
    }
    
    scene.mark.context(scene, index, function() {
        // this === scene.mark
        var m2 = this.mouse(),
            x = Math.max(0, Math.min(m1.x, m2.x)),
            y = Math.max(0, Math.min(m1.y, m2.y));
            
        scene.mark.selectionRect.set(
            x,
            y,
            Math.min(this.width(),  Math.max(m2.x, m1.x)) - x,
            Math.min(this.height(), Math.max(m2.y, m1.y)) - y);

        if(redrawThis){
            this.render();
        }
      });

    pv.Mark.dispatch("select", scene, index, e);
  }

  /** @private */
  function mouseup(e) {
    var lscene = scene;
    if(lscene){
        var lmark = lscene.mark;
        if(lmark){
            pv.Mark.dispatch("selectend", lscene, index, e);
        
            lmark.selectionRect = null;
        }
        
        scene = null;
    }
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);

  return mousedown;
};

/**
 * Implements support for svg detection
 */
(function($){
    $.support.svg = $.support.svg || 
        document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
}(jQuery));
// Text measurement utility
def.scope(function(){
    
    // --------------------------
    // exported
    function getTextLength(text, font){
        switch(pv.renderer()){
            case 'vml':
                return getTextLenVML(text, font);

            case 'batik':
                font = splitFontCGG(font);

                // NOTE: the global function 'getTextLenCGG' must be
                // defined by the CGG loading environment
                /*global getTextLenCGG:true */
                return getTextLenCGG(text, font.fontFamily, font.fontSize, font.fontStyle, font.fontWeight);

            //case 'svg':
        }

        return getTextLenSVG(text, font);
    }

    function getTextHeight(text, font){
        switch(pv.renderer()){
            case 'vml':
                return getTextHeightVML(text, font);

            case 'batik':
                font = splitFontCGG(font);

                // NOTE: the global function 'getTextHeightCGG' must be
                // defined by the CGG loading environment
                /*global getTextHeightCGG:true */
                return getTextHeightCGG(text, font.fontFamily, font.fontSize, font.fontStyle, font.fontWeight);

            //case 'svg':
        }

        return getTextHeightSVG(text, font);
    }

    //TODO: if not in px?..
    function getFontSize(font){
        if(pv.renderer() == 'batik'){
            var sty = document.createElementNS('http://www.w3.org/2000/svg','text').style;
            sty.setProperty('font',font);
            return parseInt(sty.getProperty('font-size'), 10);
        }

        var holder = getTextSizePlaceholder();
        holder.css('font', font);
        return parseInt(holder.css('font-size'), 10);
    }

    function getFitInfo(w, h, text, font, diagMargin){
        if(text === '') {
            return {h: true, v: true, d: true};
        }
        
        var len = getTextLength(text, font);
        return {
            h: len <= w,
            v: len <= h,
            d: len <= Math.sqrt(w*w + h*h) - diagMargin
        };
    }

    function trimToWidthB(len, text, font, trimTerminator, before){
        len += getTextLength(trimTerminator, font);
        
        return trimToWidth(len, text, font, trimTerminator, before);
    }
    
    function trimToWidth(len, text, font, trimTerminator, before){
      if(text === '') {
          return text;
      }
      
      var textLen = getTextLength(text, font);
      if(textLen <= len){
        return text;
      }

      if(textLen > len * 1.5){ //cutoff for using other algorithm
        return trimToWidthBin(len,text,font,trimTerminator, before);
      }

      while(textLen > len){
        text = before ? text.slice(1) : text.slice(0,text.length -1);
        textLen = getTextLength(text, font);
      }

      return before ? (trimTerminator + text) : (text + trimTerminator);
    }
    
    function justifyText(text, lineWidth, font){
        var lines = [];
        
        if(lineWidth < getTextLength('a', font)){
            // Not even one letter fits...
            return lines;
        } 
        
        var words = (text || '').split(/\s+/);
        
        var line = "";
        while(words.length){
            var word = words.shift();
            if(word){
                var nextLine = line ? (line + " " + word) : word;
                if(pvc.text.getTextLength(nextLine, font) > lineWidth){
                    // The word by itself may overflow the line width
                    
                    // Start new line
                    if(line){
                        lines.push(line);
                    }
                    
                    line = word;
                } else {
                    line = nextLine; 
                }
            }
        }
        
        if(line){
            lines.push(line);
        }
        
        return lines;
    }
    
    function getLabelSize(textWidth, textHeight, align, baseline, angle, margin){
        var width  = margin + Math.abs(textWidth * Math.cos(-angle));
        var height = margin + Math.abs(textWidth * Math.sin(-angle));
        return {
            width:  width,
            height: height
        };
    }
    
    /* Returns a label's BBox relative to its anchor point */
    function getLabelBBox(textWidth, textHeight, align, baseline, angle, margin){
        /* text-baseline, text-align */
        
        // From protovis' SvgLabel.js
        
        // In text line coordinates. y points downwards
        var x, y;
        
        switch (baseline) {
            case "middle":
                y = textHeight / 2; // estimate middle (textHeight is not em, the height of capital M)
                break;
              
            case "top":
                y = margin + textHeight;
                break;
          
            case "bottom":
                y = -margin; 
                break;
        }
        
        switch (align) {
            case "right": 
                x = -margin -textWidth; 
                break;
          
            case "center": 
                x = -textWidth / 2;
                break;
          
            case "left": 
                x = margin;
                break;
        }
        
        var bottomLeft  = pv.vector(x, y);
        var bottomRight = bottomLeft.plus(textWidth, 0);
        var topRight    = bottomRight.plus(0, -textHeight);
        var topLeft     = bottomLeft .plus(0, -textHeight);
        
        var min, max;
        
        var corners = [bottomLeft, bottomRight, topLeft, topRight];
        
        if(angle === 0){
            min = topLeft;
            max = bottomRight;
        } else {
            // Bounding box:
            
            corners.forEach(function(corner, index){
                corner = corners[index] = corner.rotate(angle);
                if(min == null){
                    min = pv.vector(corner.x, corner.y);
                } else {
                    if(corner.x < min.x){
                        min.x = corner.x;
                    }
                    
                    if(corner.y < min.y){
                        min.y = corner.y;
                    }
                }
                
                if(max == null){
                    max = pv.vector(corner.x, corner.y);
                } else {
                    if(corner.x > max.x){
                        max.x = corner.x;
                    }
                    
                    if(corner.y > max.y){
                        max.y = corner.y;
                    }
                }
            });
        }
        
        var bbox = new pvc.Rect(min.x, min.y, max.x - min.x, max.y - min.y);
        
        bbox.sourceCorners   = corners;
        bbox.sourceAngle     = angle;
        bbox.sourceAlign     = align;
        bbox.sourceTextWidth = textWidth;
        
        return bbox;
    }
    
    // --------------------------
    // private
    var $textSizePlaceholder = null,
        $textSizePvLabel = null,
        textSizePvLabelFont = null,
        textSizePlaceholderId = 'cccTextSizeTest_' + new Date().getTime();

    function getTextSizePlaceholder(){
        if(!$textSizePlaceholder || !$textSizePlaceholder.parent().length){
            
            $textSizePlaceholder = $(textSizePlaceholderId);

            if(!$textSizePlaceholder.length){
                $textSizePlaceholder = $('<div>')
                    .attr('id', textSizePlaceholderId)
                    .css('position', 'absolute')
                    .css('visibility', 'hidden')
                    .css('width', 'auto')
                    .css('height', 'auto');

                $('body').append($textSizePlaceholder);
            }
        }

        return $textSizePlaceholder;
    }

    // TODO: the following method fails on empty text...
    function getTextSizePvLabel(text, font){
        if(text === ""){
            text = "m";
        }

        if(!$textSizePvLabel || textSizePvLabelFont != font){
            var holder   = getTextSizePlaceholder();
            var holderId = holder.attr('id');

            var panel = new pv.Panel();
            panel.canvas(holderId);
            var lbl = panel.add(pv.Label).text(text);
            if(font){
                lbl.font(font);
            }
            panel.render();

            $textSizePvLabel   = $('#' + holderId + ' text');
            textSizePvLabelFont = font;
        } else {
            $textSizePvLabel.text(text);
        }

        return $textSizePvLabel[0];
    }

    function splitFontCGG(font){
        var el = document.createElementNS('http://www.w3.org/2000/svg','text');
        var sty = el.style;
        sty.setProperty('font',font);

        var result = {};
        
        // Below, the use of: 
        //   '' + sty.getProperty(...)
        //  converts the results to real strings
        //  and not String objects (this later caused bugs in Java code)
        
        var fontFamily = result.fontFamily = '' + sty.getProperty('font-family');
        if(!fontFamily){
            result.fontFamily = 'sans-serif';
        } else if(fontFamily.length > 2){
            // Did not work at the server
            //var reQuoted = /^(["']?)(.*?)(\1)$/;
            //fontFamily = fontFamily.replace(reQuoted, "$2");
            var quote = fontFamily.charAt(0);
            if(quote === '"' || quote === "'"){
                fontFamily = fontFamily.substr(1, fontFamily.length - 2);
            }
            
            result.fontFamily = fontFamily;
        }
        
        result.fontSize   = '' + sty.getProperty('font-size');
        result.fontStyle  = '' + sty.getProperty('font-style');
        result.fontWeight = '' + sty.getProperty('font-weight');
        
        return result;
    }

    function getTextLenSVG(text, font){
        var lbl = getTextSizePvLabel(text, font);
        var box = lbl.getBBox();
        return box.width;
    }

    function getTextHeightSVG(text, font){
        var lbl = getTextSizePvLabel(text, font);
        var box = lbl.getBBox();
        return box.height;
    }

    function getTextLenVML(text, font){
        return pv.Vml.text_dims(text, font).width;
    }

    function getTextHeightVML(text, font){
        return pv.Vml.text_dims(text, font).height;
    }

    function trimToWidthBin(len, text, font, trimTerminator, before){

        var ilen = text.length,
            high = ilen - 2,
            low = 0,
            mid,
            textLen;

        while(low <= high && high > 0){

            mid = Math.ceil((low + high)/2);
            
            var textMid = before ? text.slice(ilen - mid) : text.slice(0, mid);
            textLen = getTextLength(textMid, font);
            if(textLen > len){
                high = mid - 1;
            } else if( getTextLength(before ? text.slice(ilen - mid - 1) : text.slice(0, mid + 1), font) < len ){
                low = mid + 1;
            } else {
                return before ? (trimTerminator + textMid) : (textMid + trimTerminator);
            }
        }

        return before ? (trimTerminator + text.slice(ilen - high)) : (text.slice(0, high) + trimTerminator);
    }
    
    pvc.text = {
        getTextLength: getTextLength,
        getFontSize:   getFontSize,
        getTextHeight: getTextHeight,
        getFitInfo:    getFitInfo,
        trimToWidth:   trimToWidth,
        trimToWidthB:  trimToWidthB,
        justify:       justifyText,
        getLabelSize:  getLabelSize,
        getLabelBBox:  getLabelBBox
        
    };
});
// Colors utility
def.scope(function(){
    
    pvc.color = {
        scale:  colorScale,
        scales: colorScales
    };
    
    // --------------------------
    // exported
    
    /**
     * Creates color scales of a specified type for datums grouped by a category.
     * 
     * @name pvc.color.scales
     * @function
     * @param {object} keyArgs Keyword arguments.
     * See {@link pvc.color.scale} for available arguments.
     * 
     * @param {def.Query} keyArgs.data
     * A {@link pvc.data.Data} that is the result of grouping datums along what are here called "category" dimensions.
     * <p>
     * One (possibly equal) color scale is returned per leaf data, indexed by the leaf's absolute key (see {@link pvc.data.Data#absKey}).  
     * </p>
     * @param {boolean} [keyArgs.normPerBaseCategory=false] Indicates that a different color scale should be computed per distinct data category.
     * 
     * @type function 
     */
    function colorScales(keyArgs){
        /*jshint expr:true */
        keyArgs || def.fail.argumentRequired('keyArgs');
        
        var type = keyArgs.type || def.fail.argumentRequired('keyArgs.type');
        
        switch (type) {
            case 'linear':   return new pvc.color.LinearScalesBuild(keyArgs).buildMap();
            case 'discrete': return new pvc.color.DiscreteScalesBuild(keyArgs).buildMap();
            case 'normal':   return new pvc.color.NormalScalesBuild(keyArgs).buildMap(); // TODO
        }
        
        throw def.error.argumentInvalid('scaleType', "Unexistent scale type '{0}'.", [type]);
    }
    
    /**
     * Creates a color scale of a specified type.
     * 
     * @name pvc.color.scale
     * @function
     * @param {object} keyArgs Keyword arguments.
     * See {@link pvc.color.scales} for available arguments.
     * 
     * @param {def.Query} keyArgs.data A {@link pvc.data.Data} instance that 
     * may be used to obtain the domain of the color scale.
     * 
     * @param {string} keyArgs.type The type of color scale.
     * <p>
     * Valid values are 'linear', 'discrete' and 'normal' (normal probability distribution).
     * </p>
     * @param {string|pv.color} [keyArgs.minColor] The minimum color.
     * @param {string|pv.color} [keyArgs.maxColor] The maximum color.
     * @param {string|pv.color} [keyArgs.nullColor] The color shown for null values.
     * @param {(string|pv.color)[]} [keyArgs.colorRange] Array of colors.
     * <p>
     * This argument is ignored if both minimum and maximum colors are specified.
     * Otherwise, if only one of minimum or maximum is specified, it is prepended or appended to
     * the color range array, respectively.
     * </p>
     * <p>
     * When unspecified, the color range is assumed to be 'red', 'yellow' and 'green'. 
     * </p>
     * @param {string} keyArgs.colorDimension The name of the data dimension that is the <b>domain</b> of the color scale.
     * @param {object[]} [keyArgs.colorRangeInterval] An array of domain values to match colors in the color range.
     * 
     * @type function 
     */
    function colorScale(keyArgs){
        /*jshint expr:true */
        keyArgs || def.fail.argumentRequired('keyArgs');
        
        var type = keyArgs.type || def.fail.argumentRequired('keyArgs.type');
        
        switch (type) {
            case 'linear':   return new pvc.color.LinearScalesBuild(keyArgs).build();
            case 'discrete': return new pvc.color.DiscreteScalesBuild(keyArgs).build();
            case 'normal':   return new pvc.color.NormalScalesBuild(keyArgs).build();
        }
        
        throw def.error.argumentInvalid('scaleType', "Unexistent scale type '{0}'.", [type]);
    }
    
    // --------------------------
    // private
    
    /**
     * @class Represents one creation/build of a set of scale functions.
     * @abstract
     */
    def.type('pvc.color.ScalesBuild')
       .init(function(keyArgs){
           this.keyArgs        = keyArgs;
           this.data           = keyArgs.data || def.fail.argumentRequired('keyArgs.data');
           this.domainDimName  = keyArgs.colorDimension || def.fail.argumentRequired('keyArgs.colorDimension');
           this.domainDim      = this.data.dimensions(this.domainDimName);
           
           var dimType = this.domainDim.type;
           if(!dimType.isComparable) {
               this.domainComparer = null;
               pvc.log("Color value dimension should be comparable. Generated color scale may be invalid.");
           } else {
               this.domainComparer = function(a, b){ return dimType.compare(a, b); };
           }
           
           this.nullRangeValue = keyArgs.nullColor ? pv.color(keyArgs.nullColor) : pv.Color.transparent;
           
           this.domainRangeCountDif = 0;
       }).add(/** @lends pvc.color.ScalesBuild# */{
           /**
            * Builds one scale function.
            * 
            * @type pv.Scale
            */
           build: function(){
               this.range = this._getRange();
               this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
               
               var domain = this._getDomain();
               return this._createScale(domain);
           },
           
           /**
            * Builds a map from category keys to scale functions.
            * 
            * @type object
            */
           buildMap: function(){
               this.range = this._getRange();
               this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
               
               var createCategoryScale;
               
               /* Compute a scale-function per data category? */
               if(this.keyArgs.normPerBaseCategory){
                   /* Ignore args' domain and calculate from data of each category */
                   createCategoryScale = function(leafData){
                       // Create a domain from leafData
                       var domain = this._ensureDomain(null, false, leafData);
                       return this._createScale(domain);
                   };
                   
               } else {
                   var domain = this._getDomain(),
                       scale  = this._createScale(domain);
                   
                   createCategoryScale = def.fun.constant(scale);
               }
               
               return this._createCategoryScalesMap(createCategoryScale); 
           },
           
           _createScale: def.method({isAbstract: true}),
           
           _createCategoryScalesMap: function(createCategoryScale){
               return this.data.leafs()
                   .object({
                       name:    function(leafData){ return leafData.absKey; },
                       value:   createCategoryScale,
                       context: this
                   });
           },
           
           _getRange: function(){
               var keyArgs = this.keyArgs,
                   range = keyArgs.colorRange || ['red', 'yellow','green'];
           
               if(keyArgs.minColor != null && keyArgs.maxColor != null){
                   
                   range = [keyArgs.minColor, keyArgs.maxColor];
                   
               } else if (keyArgs.minColor != null){
                   
                   range.unshift(keyArgs.minColor);
                   
               } else if (keyArgs.maxColor != null){
                   
                   range.push(keyArgs.maxColor);
               }
           
               return range.map(function(c) { return pv.color(c); });
           },
           
           _getDataExtent: function(data){
               
               var extent = data.dimensions(this.domainDimName).extent({visible: true});
               if(!extent) { // No atoms...
                   return null;
               }
               
               var min = extent.min.value,
                   max = extent.max.value;
                
               if(max == min){
                   if(max >= 1){
                       min = max - 1;
                   } else {
                       max = min + 1;
                   }
               }
               
               return {min: min, max: max};
           },
           
           _getDomain: function() {
               var domain = this.keyArgs.colorRangeInterval;
               if(domain != null){
                   if(this.domainComparer) {
                       domain.sort(this.domainComparer);
                   }
                   
                   if(domain.length > this.desiredDomainCount){ 
                       // More domain points than needed for supplied range
                       domain = domain.slice(0, this.desiredDomainCount);
                   }
               } else {
                   // This ends up being padded...in ensureDomain
                   domain = [];
               }
               
               return this._ensureDomain(domain, true, this.data);
           },
           
           _ensureDomain: function(domain, doDomainPadding, data) {
               var extent;
               
               if(domain && doDomainPadding){
                   /* 
                    * If domain does not have as many values as there are colors (taking domainRangeCountDif into account),
                    * it is *completed* with the extent calculated from data.
                    * (NOTE: getArgsDomain already truncates the domain to number of colors)
                    */
                   var domainPointsMissing = this.desiredDomainCount - domain.length;
                   if(domainPointsMissing > 0){ 
                       extent = this._getDataExtent(data);
                       if(extent){
                            // Assume domain is sorted
                            switch(domainPointsMissing){  // + 1 in discrete ?????
                                case 1:
                                    if(this.domainComparer) {
                                        def.array.insert(domain, extent.max, this.domainComparer);
                                    } else {
                                        domain.push(extent.max);
                                    }
                                    break;

                                case 2:
                                    if(this.domainComparer) {
                                        def.array.insert(domain, extent.min, this.domainComparer);
                                        def.array.insert(domain, extent.max, this.domainComparer);
                                    } else {
                                        domain.unshift(extent.min);
                                        domain.push(extent.max);
                                    }
                                    break;

                                default:
                                    /* Ignore args domain altogether */
                                    if(pvc.debug >= 2){
                                            pvc.log("Ignoring option 'colorRangeInterval' due to unsupported length." +
                                                    def.format(" Should have '{0}', but instead has '{1}'.", [this.desiredDomainCount, domain.length]));
                                    }
                                    domain = null;
                            }
                        }
                   }
               }
               
               if(!domain) {
                   /*jshint expr:true */
                   extent || (extent = this._getDataExtent(data));
                   if(extent){
                       var min = extent.min,
                           max = extent.max;
                       var step = (max - min) / (this.desiredDomainCount - 1);
                       domain = pv.range(min, max + step, step);
                   }
               }
               
               return domain;
           }
       });
        
    
    def.type('pvc.color.LinearScalesBuild', pvc.color.ScalesBuild)
    .add(/** @lends pvc.color.LinearScalesBuild# */{
        
        _createScale: function(domain){
            var scale = pv.Scale.linear();

            if(domain){
                scale.domain.apply(scale, domain);
            }
            
            scale.range.apply(scale, this.range);
            
            return scale;
        }
    });
    
    def.type('pvc.color.DiscreteScalesBuild', pvc.color.ScalesBuild)
    .init(function(keyArgs){
        this.base(keyArgs);
        
        this.domainRangeCountDif = 1;
    })
    .add(/** @lends pvc.color.DiscreteScalesBuild# */{
        
        /*
         * Dmin   DMax    C
         * --------------------
         * -      <=d0    c0
         * >d0    <=d1    c1
         * >d1    <=d2    c2
         * ..
         * >dN-3  <=dN-2  cN-2
         * 
         * >dN-2  -       cN-1
         */
        //d0--cR0--d1--cR1--d2
        _createScale: function(domain){
            var Dl = domain.length - 1,
                range = this.range,
                nullRangeValue = this.nullRangeValue,
                Rl = range.length - 1;
            
            function scale(val){
                if(val == null) {
                    return nullRangeValue;
                }
                
                for(var i = 0 ; i < Dl ; i++){  // i <= D - 2  => domain[D-1]
                    if(val <= domain[i + 1]){
                        return range[i];
                    }
                }
                
                // > domain[Dl]
                return range[Rl];
            }
            
            return scale;
        }
    });
    
    /* TODO */ 
      
    /***********
     * compute an array of fill-functions. Each column out of "colAbsValues" 
     * gets it's own scale function assigned to compute the color
     * for a value. Currently supported scales are:
     *    -  linear (from min to max
     *    -  normal distributed from   -numSD*sd to  numSD*sd 
     *         (where sd is the standard deviation)
     ********/
    /*
     getNormalColorScale: function (data, colAbsValues, origData){
    var fillColorScaleByColKey;
    var options = this.chart.options;
    if (options.normPerBaseCategory) {
      // compute the mean and standard-deviation for each column
      var myself = this;
      
      var mean = pv.dict(colAbsValues, function(f){
        return pv.mean(data, function(d){
          return myself.getValue(d[f]);
        })
      });
      
      var sd = pv.dict(colAbsValues, function(f){
        return pv.deviation(data, function(d){
          myself.getValue(d[f]);
        })
      });
      
      //  compute a scale-function for each column (each key)
      fillColorScaleByColKey = pv.dict(colAbsValues, function(f){
        return pv.Scale.linear()
          .domain(-options.numSD * sd[f] + mean[f],
                  options.numSD * sd[f] + mean[f])
          .range(options.minColor, options.maxColor);
      });
      
    } else {   // normalize over the whole array
      
      var mean = 0.0, sd = 0.0, count = 0;
      for (var i=0; i<origData.length; i++)
        for(var j=0; j<origData[i].length; j++)
          if (origData[i][j] != null){
            mean += origData[i][j];
            count++;
          }
      mean /= count;
      for (var i=0; i<origData.length; i++){
        for(var j=0; j<origData[i].length; j++){
          if (origData[i][j] != null){
            var variance = origData[i][j] - mean;
            sd += variance*variance;
          }
        }
      }
      
      sd /= count;
      sd = Math.sqrt(sd);
      
      var scale = pv.Scale.linear()
        .domain(-options.numSD * sd + mean,
                options.numSD * sd + mean)
        .range(options.minColor, options.maxColor);
      
      fillColorScaleByColKey = pv.dict(colAbsValues, function(f){
        return scale;
      });
    }

    return fillColorScaleByColKey;  // run an array of values to compute the colors per column
}      
     */
    
    /* 
     *          r0   ]   r1 ]    r2   ]           rD-2  ] (rD-1)
     * ... --+-------+------+---------+-- ... -+--------+------->
     *       d0      d1     d2        d3       dD-2    dD-1   (linear)
     * 
     * 
     * Mode 1 - Domain divider points
     * 
     * User specifies:
     * # D domain divider points
     * # R = D+1 range points
     * 
     * ////////////////////////////
     * D=0, R=1
     *
     *   r0
     *   ...
     *
     *
     * ////////////////////////////
     * D=1, R=2
     *
     *   r0  ]  r1
     * ... --+-- ...
     *       d0
     *
     *
     * ////////////////////////////
     * D=2, R=3
     *
     *   r0  ]  r1  ]  r2
     * ... --+------+-- ...
     *       d0     d1
     *
     *
     * ////////////////////////////
     * D=3, R=4
     * 
     *   r0  ]  r1  ]  r2  ]  r3
     * ... --+------+------+-- ...
     *       d0     d1     d2
     * 
     * ...
     * 
     * Mode 2 - Domain dividers determination from data extent
     * 
     * //////////////////////////// (inf. = sup.)
     * Special case
     * Only one color is used (the first one, for example)
     * 
     *   r0
     *   
     * //////////////////////////// (inf. < sup.)
     * C=1  => constant color
     * 
     *       r0
     *   +--------+
     *   I        S
     * 
     * ////////////////////////////
     * C=2  =>  N=1 (1 divider point)
     * 
     * B = (S-I)/2
     * 
     *       C0   ]   C1
     *   +--------+--------+
     *   I        d0        S
     *       B         B
     * 
     * ////////////////////////////
     * C=3  =>  N=2 (2 divider points)
     * 
     * B = (S-I)/3
     * 
     *      C0    ]   C1   ]   C2
     *   +--------+--------+--------+
     *   I        d0       d1       S
     *       B        B        B
     *
     * ...
     * 
     */
});/**
 * Namespace with data related classes.
 * @name pvc.data
 * @namespace
 */

/**
 * @name NoDataException
 * @class An error thrown when a chart has no data.
 */
def.global.NoDataException = function(){};


/**
 * Disposes a list of child objects.
 * 
 * @name pvc.data._disposeChildList
 * 
 * @param {Array} list The list with children to dispose.
 * @param {string} [parentProp] The child's parent property to reset.
 * 
 * @static
 * @private
 */
function data_disposeChildList(list, parentProp) {
    if(list){
        list.forEach(function(child){
            if(parentProp) {
                child[parentProp] = null; // HACK: to avoid child removing itself from its parent (this)
            }
            
            child.dispose(); 
        });
        
        list.length = 0;
    }
}

/**
 * Adds a child object.
 * 
 * @name pvc.data._addColChild
 * 
 * @param {object} parent The parent.
 * @param {string} childrenProp A parent's children array property.
 * @param {object} child The child to add.
 * @param {string} parentProp The child's parent property to set.
 * 
 * @static
 * @private
 */
function data_addColChild(parent, childrenProp, child, parentProp) {
    // <Debug>
    /*jshint expr:true */
    (child && !child[parentProp]) || def.assert("Must not have a '" + parentProp + "'.");
    // </Debug>
    
    child[parentProp] = parent;
    
    (parent[childrenProp] || (parent[childrenProp] = [])).push(child);
}

/**
 * Removes a child object.
 * 
 * @name pvc.data._removeColChild
 * 
 * @param {object} parent The parent.
 * @param {string} childrenProp A parent's children array property.
 * @param {object} child The child to remove.
 * @param {string} parentProp The child's parent property to reset.
 * 
 * @static
 * @private
 */
function data_removeColChild(parent, childrenProp, child, parentProp) {
    // <Debug>
    /*jshint expr:true */
    (child && (!child[parentProp] || child[parentProp] === parent)) || def.assert("Not a child");
    // </Debug>
    
    var children = parent[childrenProp];
    if(children) {
        var index = children.indexOf(child);
        if(index >= 0){
            def.array.removeAt(children, index);
        }
    }
    
    child[parentProp] = null;
}
/**
 * Initializes a dimension type
 * 
 * @name pvc.data.DimensionType
 * 
 * @class A dimension type describes a dimension of a complex type.
 * <p>
 * Most of the held information is of 
 * intrinsic characteristics of the dimensions values.
 * Yet, it also holds information 
 * related to a specific data translation usage.
 * </p>
 *
 * @property {pvc.data.ComplexType} complexType
 * The complex type that this dimension type belongs to.
 * 
 * @property {string} name
 * The name of this dimension type.
 * The name of a dimension type is unique on its complex type.
 * 
 * @property {string} label
 * The label of this dimension type.
 * The label <i>should</i> be unique on its complex type.
 * 
 * @property {string} group The group that the dimension type belongs to.
 * <p>
 * The group name is taken to be the name of the dimension
 * without any suffix numbers. 
 * So, if the name of a dimension type is 'series2',
 * then its default group is 'series'.
 * </p>
 *
 * @property {number} groupLevel The index within the group that the dimension type belongs to.
 *
 * @property {Function} valueType
 * The type of the value of atoms belonging to dimensions of this type.
 * It is a function that casts values to the represented type.
 * 
 * The values null and undefined are never converted by this function.
 * 
 * The function must be idempotent.
 *
 * @property {string} valueTypeName A description of the value type.
 * 
 * @property {boolean} isDiscrete
 * Indicates if the values of this dimension are discrete,
 * as opposed to continuous.
 *
 * @property {boolean} isComparable
 * Indicates if the values of this dimension can be compared.
 * 
 * @property {boolean} isHidden Indicates if the dimension is
 * hidden from the user, in places like a tooltip, for example, or in the legend.
 * 
 * @property {def.Map} playedVisualRoles
 * A map of {@link pvc.visual.Role} indexed by visual role name, of the visual roles currently being played by this dimension type.
 * 
 * @constructor
 *
 * @param {pvc.data.ComplexType} complexType The complex type that this dimension belongs to.
 * @param {string} name The name of the dimension type.
 *
 * @param {object} [keyArgs] Keyword arguments.
 * @param {string} [keyArgs.label] The label of this dimension type.
 * Defaults to the name of the dimension type.
 * @param {function} [keyArgs.valueType=null] The type of the values of this dimension type.
 * <p>
 * The supported value types are: <i>null</i> (which really means <i>any</i>), {@link Boolean}, {@link Number}, {@link String}, {@link Date} and {@link Object}.
 * </p>
 * @param {boolean} [keyArgs.isHidden=false] Indicates if the dimension should
 * be hidden from the user, in places like a tooltip, for example, or in the legend.
 * @param {boolean} [keyArgs.isDiscrete]
 * Indicates if the dimension
 * is considered discrete.
 * The default value depends on the value of {@link valueType};
 * it is true unless the {@link valueType} is Number or Date.
 * 
 * @param {function} [keyArgs.converter] A function used in the translation phase
 * to convert raw values into values of the dimension's value type.
 * Its signature is:
 * <pre>
 * function(rawValue : any) : valueType
 * </pre>
 * 
 * @param {string} [keyArgs.rawFormat] A protovis format mask adequate to the specified value type.
 * When specified and a converter is not specified, it is used to create a converter
 * for the Date and Number value types.
 * 
 * @param {function} [keyArgs.key] A function used in the translation phase
 * to obtain the string key of each value.
 * Its signature is:
 * <pre>
 * function(value : valueType) : string
 * </pre>
 * <p>
 * Nully values have a fixed key of '', 
 * so to the function never receives a "nully" value argument.
 * A consequence is that no other values can have an empty key.
 * </p>
 * <p>
 * The default key is obtained by calling the value's {@link Object#toString} method.
 * </p>
 * 
 * @param {function} [keyArgs.formatter] A function used in the translation phase
 * to format the values of this dimension type.
 * Its signature is:
 * <pre>
 * function(value : valueType, rawValue : any) : string
 * </pre>
 * <p>
 * Only a "nully" value <i>should</i> have an empty label.
 * </p>
 * <p>
 * The label is not necessarily unique.
 * </p>
 * <p>
 * The default format is the empty string for null values, 
 * or the result of calling the <i>value</i>'s {@link Object#toString} method.
 * </p>
 * 
 * @param {string} [keyArgs.format] A protovis format mask adequate to the specified value type.
 * When specified and a formatter is not specified, it is used to create a formatter
 * for the Date and Number value types.
 *
 * @param {function} [keyArgs.comparer]
 * Specifies a comparator function for the values of this dimension type.
 * Its signature is:
 * <pre>
 * function(valueA : valueType, valueB : valueType) : number
 * </pre>
 * 
 * The default value depends on the value of {@link valueType};
 * it is {@link def.compare} when the {@link valueType} is Date,
 * and null otherwise.
 */

/**
 * Cache of reverse order context-free value comparer function.
 * 
 * @name pvc.data.DimensionType#_reverseComparer
 * @field
 * @type function
 * @private
 */

/**
 * Cache of reverse order context-free atom comparer function.
 * 
 * @name pvc.data.DimensionType#_reverseAtomComparer
 * @field
 * @type function
 * @private
 */

/**
 * Cache of normal order context-free value comparer function.
 * 
 * @name pvc.data.DimensionType#_directComparer
 * @field
 * @type function
 * @private
 */

/**
 * Cache of normal order context-free atom comparer function.
 * 
 * @name pvc.data.DimensionType#_directAtomComparer
 * @field
 * @type function
 * @private
 */
def.type('pvc.data.DimensionType')
.init(
function(complexType, name, keyArgs){
    this.complexType = complexType;
    this.name  = name;
    this.label = def.get(keyArgs, 'label') || def.firstUpperCase(name);

    var groupAndLevel = pvc.data.DimensionType.splitDimensionGroupName(name);
    this.group = groupAndLevel[0];
    this.groupLevel = def.nullyTo(groupAndLevel[1], 0);

    if(this.label.indexOf('{') >= 0){
        this.label = def.format(this.label, [this.groupLevel+1]);
    }

    this.playedVisualRoles = new def.Map();
    this.isHidden = !!def.get(keyArgs, 'isHidden');
    
    var valueType = def.get(keyArgs, 'valueType') || null;
    var valueTypeName = pvc.data.DimensionType.valueTypeName(valueType);
    var cast = def.getOwn(pvc.data.DimensionType.cast, valueTypeName, null);
    
    this.valueType = valueType;
    this.valueTypeName = valueTypeName;
    this.cast = cast;
    
    this.isDiscrete = def.get(keyArgs, 'isDiscrete');
    if(this.isDiscrete == null){
        this.isDiscrete = (this.valueType !== Number && 
                           this.valueType !== Date);
    } else {
        // Normalize the value
        this.isDiscrete = !!this.isDiscrete;
        if(!this.isDiscrete && (this.valueType !== Number && this.valueType !== Date)) {
            throw def.error.argumentInvalid('isDiscrete', "The only supported continuous value types are Number and Date.");
        }
    }
    
    /** 
     * @private
     * @internal
     * @see pvc.data.Dimension#convert
     */
    this._converter = def.get(keyArgs, 'converter') || null;
    if(!this._converter) {
        var rawFormat = def.get(keyArgs, 'rawFormat');
        if(rawFormat) {
            switch(this.valueType) {
                case Number:
                    // TODO: receive extra format configuration arguments
                    this._converter = pv.Format.createParser(pv.Format.number().fractionDigits(0, 2));
                    break;
                    
                case Date:
                    this._converter = pv.Format.createParser(pv.Format.date(rawFormat));
                    break;
            }
        }
    }
    
    /** 
     * @private
     * @internal
     * @see pvc.data.Dimension#key
     */
    this._key = def.get(keyArgs, 'key') || null;
    
    /** @private */
    this._comparer = def.get(keyArgs, 'comparer');
    if(this._comparer === undefined){
        switch(this.valueType){
            case Number:
                if(!this.isDiscrete) {
                    this._comparer = def.compare;    
                }
                break;
                
            case Date:
                this._comparer = def.compare;
                break;
                
             default:
                 this._comparer = null;
        }
    }

    this.isComparable = this._comparer != null;
    
    /** 
     * @private
     * @internal
     * @see pvc.data.Dimension#format
     */
    this._formatter = def.get(keyArgs, 'formatter') || null;
    if(!this._formatter) {
        switch(this.valueType) {
            case Number:
                // TODO: receive extra format configuration arguments
                this._formatter = pv.Format.createFormatter(pv.Format.number().fractionDigits(0, 2));
                break;
                
            case Date:
                var format = def.get(keyArgs, 'format') || "%Y/%m/%d";
                this._formatter = pv.Format.createFormatter(pv.Format.date(format));
                break;
        }
    }
})
.add(/** @lends pvc.data.DimensionType# */{
    
    /**
     * Compares two values of the dimension's {@link #valueType}, in ascending order.
     * <p>
     * To compare two values in descending order multiply the result by -1.
     * </p>
     * <p>
     * Values can be nully.
     * </p>
     * @param {any} a A value of the dimension's {@link #valueType}.
     * @param {any} b A value of the dimension's {@link #valueType}.
     *  
     * @returns {Number}
     * A negative number if {@link a} is before {@link b},
     * a positive number if {@link a} is after {@link b},
     * and 0 if they are considered to have the same order.
     */
    compare: function(a, b){
        if(a == null) {
            if(b == null) {
                return 0;
            }
            return -1;
        } else if(b == null) {
            return 1;
        }
        
        return this._comparer.call(null, a, b);
    },
    
    /**
     * Gets a context-free comparer function 
     * for values of the dimension's {@link #valueType}
     * and for a specified order.
     * 
     * <p>When the dimension type is not comparable, <tt>null</tt> is returned.</p>
     * 
     * @param {boolean} [reverse=false] Indicates if the comparison order should be reversed.
     * 
     * @type function
     */
    comparer: function(reverse){
        if(!this.isComparable) {
            return null;
        }
        
        var me = this;
        if(reverse){
            return this._reverseComparer || 
                   (this._reverseComparer = function(a, b){ return me.compare(b, a); }); 
        }
        
        return this._directComparer || (this._directComparer = function(a, b){ return me.compare(a, b); }); 
    },
    
    /**
     * Gets a context-free atom comparer function, 
     * for a specified order.
     * 
     * @param {boolean} [reverse=false] Indicates if the comparison order should be reversed.
     * 
     * @type function
     */
    atomComparer: function(reverse){
        var me = this;
        if(this.isComparable) {
            if(reverse){
                return this._reverseAtomComparer || 
                       (this._reverseAtomComparer = function(a, b){
                           if(a === b) { return 0; } // Same atom
                           return me.compare(b.value, a.value); 
                       }); 
            }
            
            return this._directAtomComparer || 
                    (this._directAtomComparer = function(a, b){
                        if(a === b) { return 0; } // Same atom
                        return me.compare(a.value, b.value); 
                     }); 
        }
        
        /*global atom_idComparer:true, atom_idComparerReverse:true */
        return reverse ? atom_idComparerReverse : atom_idComparer;
    },
    
    /**
     * Gets the dimension type's context-free formatter function, if one is defined, or <tt>null</tt> otherwise.
     * @type function
     */
    formatter: function(){
        return this._formatter;
    },
    
    /**
     * Gets the dimension type's context-free converter function, if one is defined, or <tt>null</tt> otherwise.
     * @type function
     */
    converter: function(){
        return this._converter;
    },
    
    /**
     * Obtains a value indicating if this dimension type plays any visual role 
     * such that {@link pvc.visual.Role#isPercent} is <tt>true</tt>.
     * @type boolean
     */
    playingPercentVisualRole: function(){
        return def.query(this.playedVisualRoles.values())
                  .any(function(visualRole){ 
                      return visualRole.isPercent; 
                  }); 
    }
});

pvc.data.DimensionType.cast = {
    'Date': function(value) {
        return value instanceof Date ? value : new Date(value);
    },

    'Number': function(value) {
        value = Number(value);
        return isNaN(value) ? null : value;
    },

    'String':  String,
    'Boolean': Boolean,
    'Object':  Object,
    'Any':     null
};

/**
 * Obtains the default group name for a given dimension name.
 * 
 * @param {string} dimName The dimension name.
 * 
 *  @type string
 */
pvc.data.DimensionType.dimensionGroupName = function(dimName){
    return dimName.replace(/^(.*?)(\d*)$/, "$1");
};

/**
 * Splits a dimension name to its default group name and a group index.
 * 
 * @param {string} dimName The dimension name.
 * 
 * @type Array
 */
pvc.data.DimensionType.splitDimensionGroupName = function(dimName){
    var match = /^(.*?)(\d*)$/.exec(dimName);
    var index = null;
    
    if(match[2]) {
        index = Number(match[2]);
        if(index <= 1) {
            index = 1;
        } else {
            index--;
        }
    }
    
    return [match[1], index];
};

// TODO: Docs
pvc.data.DimensionType.valueTypeName = function(valueType){
    if(valueType == null){
        return "Any";
    }
    
    switch(valueType){
        case Boolean: return 'Boolean';
        case Number:  return 'Number';
        case String:  return 'String';
        case Object:  return 'Object';
        case Date:    return 'Date';
        default: throw def.error.argumentInvalid('valueType', "Invalid valueType function: '{0}'.", [valueType]);
    }
};

/**
 * Computes the name of the nth level dimension 
 * of a dimension group (protected).
 * <p>
 * Generated dimension names follow the naming pattern:
 * 'value', 'value2', 'value3', 'value4', etc.,
 * where the dimension group name is 'value'.
 * </p>
 * 
 * @param {string} dimGroupName The name of the dimension group.
 * @param {number} level The 0-based level of the dimension.
 * 
 * @type string
 */
pvc.data.DimensionType.dimensionGroupLevelName = function(baseDimName, level){
    return baseDimName + (level >= 1 ? (level + 1) : '');
};

/**
 * Extends a dimension type specification with defaults based on
 * group name and specified options.
 *  
 * @param {object} [keyArgs] Keyword arguments.
 * @param {function} [keyArgs.isCategoryTimeSeries=false] Indicates if category dimensions are to be considered time series.
 * @param {string} [keyArgs.timeSeriesFormat] The parsing format to use to parse a Date dimension when the converter and rawFormat options are not specified.
 * @param {function} [keyArgs.valueNumberFormatter] The formatter to use to parse a numeric dimension of the 'value' dimension group, when the formatter and format options are not specified.
 * @param {object} [keyArgs.dimensionGroups] A map of dimension group names to dimension type specifications to be used as prototypes of corresponding dimensions.
 * 
 *  @returns {object} The extended dimension type specification.
 */
pvc.data.DimensionType.extendSpec = function(dimName, dimSpec, keyArgs){
    
    var dimGroup = pvc.data.DimensionType.dimensionGroupName(dimName),
        userDimGroupsSpec = def.get(keyArgs, 'dimensionGroups');
    
    if(userDimGroupsSpec) {
        var groupDimSpec = userDimGroupsSpec[dimGroup];
        if(groupDimSpec) {
            dimSpec = def.create(groupDimSpec, dimSpec /* Can be null */); 
        }
    }
    
    if(!dimSpec) { 
        dimSpec = {};
    }
    
    switch(dimGroup) {
        case 'category':
            var isCategoryTimeSeries = def.get(keyArgs, 'isCategoryTimeSeries', false);
            if(isCategoryTimeSeries) {
                if(dimSpec.valueType === undefined) {
                    dimSpec.valueType = Date; 
                }
            }
            break;
        
        case 'value':
            if(dimSpec.valueType === undefined) {
                dimSpec.valueType = Number;
            }

            if(dimSpec.valueType === Number) {
                if(dimSpec.formatter === undefined && 
                   !dimSpec.format){
                    dimSpec.formatter = def.get(keyArgs, 'valueNumberFormatter');
                }
            }
            break;

        default:
            if(dimName === 'dataPart'){
                if(dimSpec.isDiscrete === undefined){
                    dimSpec.isDiscrete = true;
                }
                if(dimSpec.isHidden === undefined){
                    dimSpec.isHidden = true;
                }
                if(dimSpec.comparer === undefined){
                    dimSpec.comparer = def.compare;
                }
            }
            break;
    }
    
    if(dimSpec.converter === undefined && 
       dimSpec.valueType === Date && 
       !dimSpec.rawFormat) {
        dimSpec.rawFormat = def.get(keyArgs, 'timeSeriesFormat');
    }
    
    return dimSpec;
};

/**
 * Adds a visual role to the dimension type.
 * 
 * @name pvc.data.DimensionType#_addVisualRole
 * @function
 * @param {pvc.visual.Role} visualRole The visual role.
 * @type undefined
 * @private
 * @internal
 */
function dimType_addVisualRole(visualRole) {
    this.playedVisualRoles.set(visualRole.name, visualRole);
    /*global compType_dimensionRolesChanged:true */
    compType_dimensionRolesChanged.call(this.type, this);
}

/**
 * Removes a visual role from the dimension type.
 * 
 * @name pvc.data.DimensionType#_removeVisualRole
 * @function
 * @param {pvc.visual.Role} visualRole The visual role.
 * @type undefined
 * @private
 * @internal
 */
function dimType_removeVisualRole(visualRole) {
    this.playedVisualRoles.rem(visualRole.name);
    compType_dimensionRolesChanged.call(this.type, this);
}/**
 * Initializes a complex type instance.
 * 
 * @name pvc.data.ComplexType
 * 
 * @class A complex type is, essentially, a named set of dimension types.
 *
 * @constructor
 * 
 * @param {object} [dimTypeSpecs]
 * A map of dimension names to dimension type constructor's keyword arguments.
 *
 * @see pvc.data.DimensionType
 */
def.type('pvc.data.ComplexType')
.init(
function(dimTypeSpecs){
    /**
     * A map of the dimension types by name.
     * 
     * @type object
     * @private
     */
    this._dims = {};
    
    /**
     * A list of the dimension types.
     * 
     * @type pvc.data.DimensionType[]
     * @private
     */
    this._dimsList = [];
    
    /**
     * A list of the dimension type names.
     * 
     * @type string[]
     * @private
     */
    this._dimsNames = [];
    
    /**
     * An index of the dimension types by group name.
     * 
     * @type object
     * @private
     */
    this._dimsByGroup = {};
    
    /**
     * An index of the dimension type names by group name.
     * 
     * @type object
     * @private
     */
    this._dimsNamesByGroup = {};
    
    if(dimTypeSpecs) {
        for(var name in dimTypeSpecs){
            this.addDimension(name, dimTypeSpecs[name]);
        }
    }
})
.add(/** @lends pvc.data.ComplexType# */{
    describe: function(){

        var out = ["\n------------------------------------------"];
        out.push("Complex Type Information");
        
        this._dimsList.forEach(function(type){
            var features = [];
            
            features.push(type.valueTypeName);
            if(type.isComparable) { features.push("comparable"); }
            if(!type.isDiscrete)  { features.push("continuous"); }
            if(type.isHidden)     { features.push("hidden"); }

            out.push("  " + type.name + " (" + features.join(', ') + ")");
        });
        
        out.push("------------------------------------------");

        return out.join("\n");
    },
    
    /**
     * Obtains a dimension type given its name.
     * 
     * <p>
     * If no name is specified,
     * a map with all dimension types indexed by name is returned.
     * Do <b>NOT</b> modify this map.
     * </p>
     * 
     * @param {string} [name] The dimension type name.
     * 
     * @param {object} [keyArgs] Keyword arguments
     * @param {boolean} [keyArgs.assertExists=true] Indicates that an error is signaled 
     * if a dimension type with the specified name does not exist.
     * 
     * @type pvc.data.DimensionType | pvc.data.DimensionType[] | null
     */
    dimensions: function(name, keyArgs){
        if(name == null) {
            return this._dims;
        }
        
        var dimType = def.getOwn(this._dims, name, null);
        if(!dimType && def.get(keyArgs, 'assertExists', true)) {
            throw def.error.argumentInvalid('name', "Undefined dimension '{0}'", [name]); 
        }
        
        return dimType;
    },
    
    /**
     * Obtains an array with all the dimension types.
     * 
     * <p>
     * Do <b>NOT</b> modify the returned array. 
     * </p>
     * @type pvc.data.DimensionType[]
     */
    dimensionsList: function(){
        return this._dimsList;
    },
    
    /**
     * Obtains an array with all the dimension type names.
     * 
     * <p>
     * Do <b>NOT</b> modify the returned array. 
     * </p>
     * @type string[]
     */
    dimensionsNames: function(){
        return this._dimsNames;
    },
    
    /**
     * Obtains an array of the dimension types of a given group.
     * 
     * <p>
     * Do <b>NOT</b> modify the returned array. 
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * @param {boolean} [keyArgs.assertExists=true] Indicates if an error is signaled when the specified group name is undefined.
     * 
     * @type pvc.data.DimensionType[]
     */
    groupDimensions: function(group, keyArgs){
        var dims = def.getOwn(this._dimsByGroup, group);
        if(!dims && def.get(keyArgs, 'assertExists', true)) {
            throw def.error.operationInvalid("There is no dimension type group with name '{0}'.", [group]);
        }
        
        return dims;
    },
    
    /**
     * Obtains an array of the dimension type names of a given group.
     * 
     * <p>
     * Do <b>NOT</b> modify the returned array. 
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * @param {boolean} [keyArgs.assertExists=true] Indicates if an error is signaled when the specified group name is undefined.
     *  
     * @type string[]
     */
    groupDimensionsNames: function(group, keyArgs){
        var dimNames = def.getOwn(this._dimsNamesByGroup, group);
        if(!dimNames && def.get(keyArgs, 'assertExists', true)) {
            throw def.error.operationInvalid("There is no dimension type group with name '{0}'.", [group]);
        }
        
        return dimNames;
    },
    
    /**
     * Creates and adds to the complex type a new dimension type, 
     * given its name and specification.
     * 
     * @param {string} name The name of the dimension type.
     * @param {object} [dimTypeSpec] The dimension type specification.
     * Essentially its a <i>keyArgs</i> object.
     * See {@link pvc.data.DimensionType}'s <i>keyArgs</i> constructor
     * to know about available arguments.
     *  
     * @type {pvc.data.DimensionType}
     */
    addDimension: function(name, dimTypeSpec){
        // <Debug>
        /*jshint expr:true */
        name || def.fail.argumentRequired('name');
        !def.hasOwn(this._dims, name) || def.fail.operationInvalid("A dimension type with name '{0}' is already defined.", [name]);
        // </Debug>
        
        var dimension = new pvc.data.DimensionType(this, name, dimTypeSpec);
        this._dims[name] = dimension;
        this._dimsList.push(dimension);
        this._dimsNames.push(name);
        
        // group
        
        var group = dimension.group;
        if(group) {
            var groupDims = def.getOwn(this._dimsByGroup, group),
                groupDimsNames;
            
            if(!groupDims) {
                groupDims = this._dimsByGroup[group] = [];
                groupDimsNames = this._dimsNamesByGroup[group] = [];
            } else {
                groupDimsNames = this._dimsNamesByGroup[group];
            }
            
            var level = def.array.insert(groupDimsNames, name, def.compare);
            def.array.insertAt(groupDims, ~level, dimension);
        }
        
        this._isPctRoleDimTypeMap = null;
        
        return dimension;
    },
    
    /**
     * Obtains a map of the dimension types, indexed by their name,
     * that are playing a role such that {@link pvc.visual.Role#isPercent} is <tt>true</tt>.
     * 
     * @type def.Map
     */
    getPlayingPercentVisualRoleDimensionMap: function(){
        var map = this._isPctRoleDimTypeMap;
        if(!map) {
            map = this._isPctRoleDimTypeMap = new def.Map(
                        def.query(def.own(this._dims))
                            .where(function(dimType){ return dimType.playingPercentVisualRole(); })
                            .object({
                                name:  function(dimType){ return dimType.name; } 
                            })
                    );
        }
        
        return map;
    }
});

/**
 * Called by a dimension type to indicate that its assigned roles have changed.
 * 
 * @name pvc.data.ComplexType#_dimensionRolesChanged
 * @function
 * @param {pvc.data.DimensionType} dimType The affected dimension type.
 * @type undefined
 * @private
 * @internal
 */
function compType_dimensionRolesChanged(dimType) {
    this._isPctRoleDimTypeMap = null;
}
/**
 * Initializes a translation operation.
 * 
 * @name pvc.data.TranslationOper
 * @class Represents one translation operation 
 * from some data source format to the list of atoms format.
 * 
 * @property {pvc.data.ComplexType} complexType The complex type that represents the translated data.
 * @property {pvc.data.Data} data The data object which will be loaded with the translation result.
 * @property {object} source The source object, of some format, being translated.
 * @property {object} metadata A metadata object describing the source.
 * @property {object} options  An object with translation options.
 * 
 * @constructor
 * @param {pvc.data.ComplexType} complexType The complex type that will represent the translated data.
 * @param {object} source The source object, of some format, to be translated.
 * The source is not modified.
 * @param {object} [metadata] A metadata object describing the source.
 * @param {object} [options] An object with translation options.
 * Options are translator specific.
 * TODO: missing common options here
 */
def.type('pvc.data.TranslationOper')
.init(function(complexType, source, metadata, options){
    this.complexType = complexType;
    this.source   = source;
    this.metadata = metadata || {};
    this.options  = options  || {};
    
    if(pvc.debug >= 3){
        this._logSource();
    }

    this._initType();
})
.add(/** @lends pvc.data.TranslationOper# */{
    
    /**
     * Logs the contents of the source and metadata properties.
     */
    _logSource: def.method({isAbstract: true}),

    /**
     * Obtains the number of fields of the virtual item.
     * <p>
     * The default implementation returns the length of the metadata.
     * </p>
     * 
     * @type number
     * @virtual
     */
    virtualItemSize: function(){
        return this.metadata.length;
    },

    freeVirtualItemSize: function(){
        return this.virtualItemSize() - this._userUsedIndexesCount;
    },

    /**
     * Defines a dimension reader.
     *
     * @param {object} dimReaderSpec A dimensions reader specification.
     *
     * @type undefined
     */
    defReader: function(dimReaderSpec){
        /*jshint expr:true */
        dimReaderSpec || def.fail.argumentRequired('readerSpec');

        var dimNames =  dimReaderSpec.names;
        if(typeof dimNames === 'string'){
            dimNames = dimNames.split(/\s*\,\s*/);
        } else {
            dimNames =  def.array.as(dimNames);
        }
        
        var hasDims = !!(dimNames && dimNames.length);
        
        if(hasDims){
            dimNames.forEach(function(name){
                name || def.fail.argumentRequired('readers[i].names');
    
                name = name.replace(/^\s*(.+?)\s*$/, "$1"); // trim
    
                !def.hasOwn(this._userUsedDims, name) || def.fail.argumentInvalid('readers[i].names', "Dimension name '{0}' is already being read.", [name]);
                this._userUsedDims[name] = true;
                this.ensureDimensionType(name);
            }, this);
        }
        
        // Consumed/Reserved virtual item indexes
        var indexes = def.array.as(dimReaderSpec.indexes);
        if(indexes) {
            indexes.forEach(this._userUseIndex, this);
        }

        var reader = dimReaderSpec.reader;
        if(!reader) {
            if(hasDims){
                this._userCreateReaders(dimNames, indexes);
            } // else a reader that only serves to exlude indexes
        } else {
            hasDims || def.fail.argumentRequired('reader.names', "Required argument when a reader function is specified.");
            
            this._userRead(this._wrapReader(reader, dimNames), dimNames);
        }
    },

    /**
     * Called once, before {@link #execute},
     * for the translation to configure the complex type (abstract).
     *
     * <p>
     *    If this method is called more than once,
     *    the consequences are undefined.
     * </p>
     *
     * @name pvc.data.TranslationOper#configureType
     * @function
     * @type undefined
     * @virtual
     */
    configureType: def.method({isAbstract: true}),
    
    _initType: function(){
        this._userDimsReaders = [];
        this._userDimsReadersByDim = {};
        this._userItem = [];
        this._userDefDims = {};
        this._userUsedDims = {};
        this._userUsedIndexes = {};
        this._userUsedIndexesCount = 0;
        
        // -------------
        
        var userDimsSpec = this.options.dimensions;
        for(var dimName in userDimsSpec) { // userDimsSpec can be null
            this._userDefDimension(dimName, userDimsSpec[dimName]);
        }
        
        // -------------
        
        var userDimReaders = this.options.readers;
        if(userDimReaders) {
            userDimReaders.forEach(this.defReader, this);
        }

        var multiChartColIndexes = this.options.multiChartColumnIndexes;
        if(multiChartColIndexes != null) {
            this.defReader({names: 'multiChartColumn', indexes: multiChartColIndexes });
        }

        var multiChartRowIndexes = this.options.multiChartRowIndexes;
        if(multiChartRowIndexes != null) {
            this.defReader({names: 'multiChartRow', indexes: multiChartRowIndexes });
        }
    },

    _userDefDimension: function(name, userDimSpec){
        /*jshint expr:true */
        name || def.fail.argumentInvalid('dimensions[i]', "Invalid dimension name.");
        !def.hasOwn(this._userDefDims, name) ||
            def.fail.argumentInvalid('dimensions[i]', "A dimension with name '{0}' is already defined.", [name]);

        this._userDefDims[name] = true;
        this.ensureDimensionType(name, userDimSpec);
    },

    _userUseIndex: function(index){
        index = +index; // to number

        /*jshint expr:true */
        (index >= 0) || def.fail.argumentInvalid('index', "Invalid reader index: '{0}'.", [index]);

        !def.hasOwn(this._userUsedIndexes, index) ||
            def.fail.argumentInvalid('index', "Virtual item index '{0}' is already assigned.", [index]);

        this._userUsedIndexes[index] = true;
        this._userUsedIndexesCount++;
        this._userItem[index] = true;
    },

    _userCreateReaders: function(dimNames, indexes){
        if(!indexes){
            indexes = [];
        }

        // Distribute indexes to names, from left to right
        // Excess indexes go to the last *group* name
        // Missing indexes are padded from available indexes starting from the last provided index
        var I = indexes.length,
            N = dimNames.length,
            dimName;

        if(N > I) {
            // Pad indexes
            var nextIndex = I > 0 ? (indexes[I - 1] + 1) : 0;
            do{
                nextIndex = this._nextAvailableItemIndex(nextIndex);
                indexes[I] = nextIndex;
                this._userUseIndex(nextIndex);

                I++;
            }while(N > I);
        }

        // If they match, it's one-one name <-- index
        var L = (I === N) ? N : (N - 1);

        // The first N-1 names get the first N-1 indexes
        for(var n = 0 ; n < L ; n++) {
            dimName = dimNames[n];
            this._userRead(this._propGet(dimName, indexes[n]), dimName);
        }

        // The last name is the dimension group name that gets all remaining indexes
        if(L < N) {
            // TODO: make a single reader that reads all atoms??
            // Last is a *group* START name
            var splitGroupName = pvc.data.DimensionType.splitDimensionGroupName(dimNames[N - 1]),
                groupName = splitGroupName[0],
                level     = def.nullyTo(splitGroupName[1], 0);

            for(var i = L ; i < I ; i++, level++) {
                dimName = pvc.data.DimensionType.dimensionGroupLevelName(groupName, level);
                if(i > L){ // first name was already registered
                    /*jshint expr:true */
                    !def.hasOwn(this._userUsedDims, dimName) ||
                        def.fail.argumentInvalid('readers[i].names', "Dimension name '{0}' of last dimension group name is already being read.", [dimName]);
                    
                    this._userUsedDims[dimName] = true;
                    // propGet ensures dim exists
                }

                this._userRead(this._propGet(dimName, indexes[i]), dimName);
            }
        }
    },

    _userRead: function(reader, dimNames){
        /*jshint expr:true */
        def.fun.is(reader) || def.fail.argumentInvalid('reader', "Reader must be a function.");
        
        if(def.array.is(dimNames)){
            dimNames.forEach(function(name){
                this._userDimsReadersByDim[name] = reader;
            }, this);
        } else {
            this._userDimsReadersByDim[dimNames] = reader;
        }

        this._userDimsReaders.push(reader);
    },

    //  TODO: docs
    _wrapReader: function(reader, dimNames){
        var me = this,
            dimensions;
        
        function createDimensions() {
            dimensions = dimNames.map(function(dimName){ return me.data.dimensions(dimName); });
            dimensions.unshift(null); // item argument
            return dimensions;
        }
        
        function read(item) {
            (dimensions || createDimensions())[0] = item;
            
            return reader.apply(null, dimensions);
        }
        
        return read;
    },
    
    /**
     * Builds a dimensions reader that 
     * filters the atoms returned by a given dimensions reader
     * and returns the first one that is of a specified dimension.
     * 
     * <p>
     * If the given reader returns no atoms of the desired dimension,
     * then the built reader returns <tt>undefined</tt>.
     * </p>
     * 
     * @param {function} reader A dimensions reader to filter.
     * @param {function} dimName The name of the filtered dimension.
     * 
     * @type function
     */
    _filterDimensionReader: function(reader, dimName){
        
        function extractDimensionReader(item) {
            var atoms = reader(item);
            if(atoms instanceof Array) {
                return def.query(atoms)
                    .first(function(atom){ 
                        return atom.dimension.name === dimName; 
                    });
            }
            
            if(atoms.dimension.name === dimName) {
                return atoms;
            }
            
            //return undefined;
        }
        
        return extractDimensionReader;
    },
    
    /**
     * Performs the translation operation for a data instance.
     * 
     * <p>
     *    The returned atoms are interned in 
     *    the dimensions of the specified data instance.
     * </p>
     * 
     * <p>
     *    If this method is called more than once,
     *    the consequences are undefined.
     * </p>
     * 
     * @param {pvc.data.Data} data The data object in whose dimensions returned atoms are interned.
     * 
     * @returns {def.Query} An enumerable of {@link pvc.data.Atom[]}
     */
    execute: function(data){
        this.data = data;
        
        return this._executeCore();
    },
    
    /**
     * Obtains an enumerable of translated atoms (virtual).
     * 
     * <p>
     *    The default implementation applies 
     *    every dimensions reader returned by {@link #_getDimensionsReaders} 
     *    to every item returned by  {@link #_getItems}.
     *   
     *    Depending on the underlying data source format 
     *    this may or may not be a good translation strategy.
     *    Override to apply a different one.
     * </p>
     * 
     * @returns {def.Query} An enumerable of {@link pvc.data.Atom[]}
     * @virtual
     */
    _executeCore: function(){
        var dimsReaders = this._getDimensionsReaders();
        
        return def.query(this._getItems())
                  .select(function(item){
                      return this._readItem(null, item, dimsReaders);
                  }, this);
    },
    
    /**
     * Obtains an enumerable of items to translate (virtual).
     * 
     * <p>
     * The default implementation assumes that {@link #source}
     * is directly the desired enumerable of items. 
     * </p>
     * 
     * @type def.Query
     */
    _getItems: function(){
        return this.source;
    },
    
    /**
     * Obtains the dimensions readers array (virtual).
     * 
     * <p>
     * Each dimensions reader function reads one or more dimensions
     * from a source item.
     * It has the following signature:
     * </p>
     * <pre>
     * function(item : any) : pvc.data.Atom[] | pvc.data.Atom
     * </pre>
     * 
     * <p>
     * The default implementation simply returns the {@link #_userDimsReaders} field. 
     * </p>
     * 
     * @name _getDimensionsReaders
     * @type function[]
     * @virtual
     */
    _getDimensionsReaders: function(){
        return this._userDimsReaders;
    },
    
    /**
     * Applies all the specified dimensions reader functions to an item 
     * and sets the resulting atoms in a specified array (virtual).
     * 
     * @param {Array} [atoms] An array where to add resulting atoms.
     * @param {any} item The item to read.
     * @param {function[]} dimsReaders An array of dimensions reader functions.
     * @returns {pvc.data.Atom[]} The specified atoms array or a new one if one was not specified.
     * @virtual
     */
    _readItem: function(atoms, item, dimsReaders) {
        atoms = atoms || [];
        
        // This function is performance critical and so does not use forEach
        // or array helpers, avoiding function calls, closures, etc.
        
        if(pvc.debug >= 4) {
            pvc.log('readItem: ' + JSON.stringify(item));
        }
        
        var r = 0, 
            R = dimsReaders.length, 
            a = 0;
        
        while(r < R) {
            
            var result = dimsReaders[r++](item);
            if(result != null){
                if(result instanceof Array) {
                    var j = 0, J = result.length;
                    while(j < J) {
                        if(result.value != null) { // no null atoms
                            atoms[a++] = result[j];
                        }

                        j++;
                    }

                } else if(result.value != null){
                    atoms[a++] = result;
                }
            }
        }
        
        atoms.length = a;
        
        if(pvc.debug >= 4) {
            var atomsMap = def.query(atoms).object({
                name:  function(atom){ return atom.dimension.name; },
                value: function(atom){ 
                    return { id: atom.id, v: atom.value, f: atom.label };
                }
            });
            
            pvc.log('\t-> atoms: ' + JSON.stringify(atomsMap));
        }
        
        return atoms;
    },
    
    /**
     * Given a dimension name and a property name,
     * creates a dimensions reader that obtains that property from a given source item 
     * and returns the corresponding atom (protected).
     * 
     * @param {string} dimName The name of the dimension on which to intern read values.
     * @param {string} prop The property name to read from each item.
     * @param {object} [keyArgs] Keyword arguments. 
     * @param {boolean} [keyArgs.ensureDim=true] Creates a dimension with the specified name, with default options, if one does not yet exist. 
     * 
     * @type function
     */
    _propGet: function(dimName, prop, keyArgs) {
        var me = this,
            dimension;
        
        if(def.get(keyArgs, 'ensureDim', true)) {
            this.ensureDimensionType(dimName);
        }
        
        function propGet(item) {
            return (dimension || (dimension = me.data.dimensions(dimName)))
                   .intern(item[prop]);
        }
        
        return propGet;
    },
    
    /**
     * Given a dimension name and a raw value of that dimension,
     * creates a dimensions reader that returns the corresponding atom,
     * regardless of the source item supplied to it (protected).
     * 
     * @param {string} dimName The name of the dimension on which to intern <i>constRawValue</i>.
     * @param {string} constRawValue The raw value.
     * 
     * @param {object} [keyArgs] Keyword arguments. 
     * @param {boolean} [keyArgs.ensureDim=true] Creates a dimension with the specified name, with default options, if one does not yet exist.
     * 
     * @type function
     */
    _constGet: function(dimName, constRawValue, keyArgs) {
        var me = this,
            constAtom;
        
        if(def.get(keyArgs, 'ensureDim', true)) {
            this.ensureDimensionType(dimName);
        }
        
        function constGet(/* item */) {
            return constAtom || 
                   (constAtom = me.data.dimensions(dimName).intern(constRawValue));
        }

        return constGet;
    },
    
    // TODO: docs
    _nextAvailableItemIndex: function(index, L){
        if(index == null) {
            index = 0;
        }
        if(L == null){
            L = Infinity;
        }

        while(index < L && def.hasOwn(this._userItem, index)) {
            index++;
        }
        
        return index < L ? index : -1;
    },
    
    // TODO: docs
    ensureDimensionType: function(dimName, dimSpec){
        var dimType = this.complexType.dimensions(dimName, {assertExists: false});
        if(!dimType) {
            this.defDimensionType(dimName, dimSpec);
        }
    },

    defDimensionType: function(dimName, dimSpec){
        /** Passing options: isCategoryTimeSeries, timeSeriesFormat and dimensionGroups */
        dimSpec = pvc.data.DimensionType.extendSpec(dimName, dimSpec, this.options);
        return this.complexType.addDimension(dimName, dimSpec);
    }
});
/**
 * @name pvc.data.MatrixTranslationOper
 * @class Represents one translation operation, 
 * from a source matrix in some format to 
 * an enumerable of atom arrays.
 * 
 * @extends pvc.data.TranslationOper
 * @abstract
 * 
 * @constructor
 * @param {pvc.data.ComplexType} complexType The complex type that will represent the translated data.
 * @param {pvc.data.Data} data The data object which will be loaded with the translation result.
 * @param {object} source The source matrix, in some format, to be translated.
 * The source is not modified.
 * @param {object} [metadata] A metadata object describing the source.
 * @param {object} [options] An object with translation options.
 * 
 * @param {boolean} [options.seriesInRows=false]
 * Indicates that series are to be switched with categories.
 *
 * @param {Number[]} [options.secondAxisSeriesIndexes] (former secondAxisIdx)
 * Array of series indexes in {@link #source} that are second axis' series.
 * Any non-null value is converted to an array.
 * Each value of the array is also converted to a number.
 * A negative value is counted from the end
 * of the series values (-1 is the series last value, ...).
 * <p>
 * Note that the option 'seriesInRows'
 * affects what are considered to be series values.
 *
 * Having determined where series are stored,
 * the order of occurrence of a series value in {@link #source}
 * determines its index.
 * </p>
 */
def.type('pvc.data.MatrixTranslationOper', pvc.data.TranslationOper)
.add(/** @lends pvc.data.MatrixTranslationOper# */{
    
    _logSource: function(){
        pvc.log("ROWS (" + this.source.length + ")");
        if(this.source){
            def.query(this.source).take(10).each(function(row, index){
                pvc.log("row " + index + ": " + JSON.stringify(row));
            });
        }

        pvc.log("COLS (" + this.metadata.length + ")");
        if(this.metadata){
            this.metadata.forEach(function(col){
                pvc.log("column {" +
                    "index: " + col.colIndex +
                    ", name: "  + col.colName +
                    ", label: "  + col.colLabel +
                    ", type: "  + col.colType + "}"
                );
            });
        }
    },

    /**
     * Creates the set of second axis series keys
     * corresponding to the specified
     * secondAxisSeriesIndexes and seriesAtoms arrays (protected).
     *
     * Validates that the specified series indexes are valid
     * indexes of seriesAtoms array.
     *
     * @param {Array} secondAxisSeriesIndexes Array of indexes of the second axis series values.
     * @param {Array} seriesKeys Array of the data source's series atom keys.
     *
     * @returns {Object} A set of second axis series values or null if none.
     *
     * @private
     * @protected
     */
    _createSecondAxisSeriesKeySet: function(secondAxisSeriesIndexes, seriesKeys){
        var secondAxisSeriesKeySet = null,
            seriesCount = seriesKeys.length;
        def.query(secondAxisSeriesIndexes).each(function(indexText){
            // Validate
            var seriesIndex = +indexText; // + -> convert to number
            if(isNaN(seriesIndex)){
                throw def.error.argumentInvalid('secondAxisSeriesIndexes', "Element is not a number '{0}'.", [indexText]);
            }

            if(seriesIndex < 0){
                if(seriesIndex <= -seriesCount){
                    throw def.error.argumentInvalid('secondAxisSeriesIndexes', "Index is out of range '{0}'.", [seriesIndex]);
                }

                seriesIndex = seriesCount + seriesIndex;
            } else if(seriesIndex >= seriesCount){
                throw def.error.argumentInvalid('secondAxisSeriesIndexes', "Index is out of range '{0}'.", [seriesIndex]);
            }

            // Set
            if(!secondAxisSeriesKeySet){
                secondAxisSeriesKeySet = {};
            }
            
            secondAxisSeriesKeySet[seriesKeys[seriesIndex]] = true;
        });

        return secondAxisSeriesKeySet;
    },

    // TODO: docs
    _dataPartGet: function(calcAxis2SeriesKeySet, seriesReader) {

        var me = this;

        this.ensureDimensionType('dataPart');

        var dataPartDimension,
            axis2SeriesKeySet,
            part1Atom,
            part2Atom;

        function dataPartGet(item) {
            /*
             * First time initialization.
             * Done here because *data* isn't available before.
             */
            if(!dataPartDimension) {
                axis2SeriesKeySet = calcAxis2SeriesKeySet();
                dataPartDimension = me.data.dimensions('dataPart');

                if(pvc.debug >=3 && axis2SeriesKeySet){
                    pvc.log("Second axis series values: " +
                        JSON.stringify(def.keys(axis2SeriesKeySet)));
                }
            }

            var seriesAtom = seriesReader(item);
            if(def.hasOwn(axis2SeriesKeySet, seriesAtom.key)){
                return part2Atom || (part2Atom = dataPartDimension.intern("1"));
            }
            
            return part1Atom || (part1Atom = dataPartDimension.intern("0"));
        }

        return dataPartGet;
    }
});
/**
 * @name pvc.data.CrosstabTranslationOper
 * @class A translation from a matrix in crosstab format.
 * <p>
 *    The default <i>matrix-crosstab</i> format is:
 * </p>
 * <pre>
 * +----------+----------+----------+
 * | -        | S1       | S2       | ... (taken from metadataItem.colName)
 * +==========+==========+==========+
 * | C1       | 12       | 45       |
 * | C2       | 11       | 99       |
 * | C3       | null     |  3       |
 * +----------+----------+----------+
 * </pre>
 * <p>Legend:</p>
 * <ul>
 *   <li>C<sub>i</sub> &mdash; Category value <i>i</i></li>
 *   <li>S<sub>j</sub> &mdash; Series value <i>j</i></li>
 * </ul>
 * 
 * TODO: document crosstab options
 * 
 * @extends pvc.data.MatrixTranslationOper
 */
def.type('pvc.data.CrosstabTranslationOper', pvc.data.MatrixTranslationOper)
.init(function(complexType, source, metadata, options){
    
    this.base(complexType, source, metadata, options);

    this._separator = this.options.separator || '~';

    this._measureData();
})
.add(/** @lends pvc.data.CrosstabTranslationOper# */{
    /* LEGEND
     * ======
     * 
     * Matrix Algebra
     * --------------
     * 
     *      j
     *    +---+
     * i  | v |
     *    +---+
     * 
     * i - index of matrix line
     * j - index of matrix column
     * 
     * v - value at indexes i,j
     * 
     * ----
     * 
     * line  = matrix[i]
     * value = line[j]
     * 
     * 
     * Crosstab Algebra
     * ----------------
     * 
     *      CC
     *    +----+
     * RR | MM |
     *    +----+
     * 
     * RR = row     space
     * CC = column  space
     * MM = measure space
     * 
     * ----
     * As a function
     * 
     * cross-table: RR X CC -> MM
     * 
     * ----
     * Dimension of spaces (called "depth" in the code to not confuse with Dimension)
     * 
     * R  = number of row     components
     * C  = number of column  components
     * M  = number of measure components
     * 
     * ----
     * Instances / groups / members
     * 
     * <RG> = <r1, ..., rR> = R-tuple of row     values 
     * <CG> = <c1, ..., cC> = C-tuple of column  values 
     * <MG> = <m1, ..., mM> = M-tuple of measure values
     * 
     * r = index of row group component
     * c = index of column group component
     * m = index of measure component
     * 
     * ----
     * Extent of spaces
     * 
     * RG = number of (distinct) row groups
     * CG = number of (distinct) column groups
     * MG = RG * CG
     * 
     * rg = index of row group
     * cg = index of column group
     * 
     * 
     * Crosstab in a Matrix
     * --------------------
     * 
     * Expand components into own columns:
     * | <...RG...> | <=> | r1 | r2 | r3 | ... | rR |
     * 
     * All component values joined with a separator character, ~,
     * occupying only one column:
     * | <~CG~>     | <=> | "c1~c2~c3~...~cC" |
     * 
     * ----
     * 
     * Format: "Measures in columns" (uniform)
     * 
     *             0            R           R+M    R+M*(CG-1)   R+M*CG
     *             o------------+------------+ ... +------------o (j - matrix column)
     *         
     *                          0            1     CG-1         CG
     *                          o------------+ ... +------------o (cg - column group index)
     *        
     *                          +------------+ ... +------------+    <-- this._colGroups
     *                          | <~CG~>     |     | <~CG~>     | 
     *                          +------------+     +------------+
     *        
     *      0 o    +------------+------------+ ... +------------+    <-- this._lines
     *        |    | <...RG...> | <...MG...> |     | <...MG...> |
     *        |    |            | <...MG...> |     | <...MG...> |
     *      1 +    +------------+------------+     +------------+
     *                          ^
     *        .                 |
     *        .               m = cg % M
     *        .
     *        
     *        |
     *     RG o
     *       (i - matrix line)
     *       (rg - row group)
     *       
     * i = rg
     * j = R + M*cg
     *
     * Unfortunately, not all measures have to be specified in all column groups.
     * When a measure in column group would have all rows with a null value, it can be omitted.
     * 
     * Virtual Item Structure
     * ----------------------
     * A relational view of the cross groups
     *  
     *    [<...CG...>, <...RG...>, <...MG...>]
     * 
     * This order is chosen to match that of the relational translation.
     *
     * Virtual Item to Dimensions mapping
     * ----------------------------------
     * 
     * A mapping from a virtual item to a list of atoms (of distinct dimensions)
     * 
     * virtual-item --> atom[]
     * 
     * A set of dimensions readers are called and 
     * each returns one or more atoms of distinct dimensions.
     * 
     *  * Each dimension has exactly one dimensions reader that reads its atoms.
     *  * One dimensions reader may read more than one dimension.
     *  * A dimensions reader always reads the same set of dimensions.
     *  
     *  * A dimension consumes data from zero or more virtual item components.
     *  * A virtual item component is consumed by zero or more dimensions.
     *  * A dimension may vary in which virtual item components it consumes, from atom to atom.
     *   
     *  virtual-item-component * <-> * dimension + <-> 1 dimensions reader
     */

    /**
     * Obtains the number of fields of the virtual item.
     * @type number
     * @override
     */
    virtualItemSize: function(){
        return this.R + this.C + this.M;
    },
    
    /**
     * Performs the translation operation (override).
     * @returns {def.Query} An enumerable of {@link pvc.data.Atom[]}
     * @override
     */
    _executeCore: function(){
        if(!this.metadata.length){
            return def.query(); 
        }
        
        var dimsReaders = this._getDimensionsReaders();
        
        // ----------------
        // Virtual item
        
        var item  = new Array(this.virtualItemSize()),
            itemCrossGroupIndex = this._itemCrossGroupIndex,
            me = this
            ;
        
        function updateVItemCrossGroup(crossGroupId, source) {
            // Start index of cross group in item
            var itemIndex   = itemCrossGroupIndex[crossGroupId],
                sourceIndex = 0,
                depth       = me[crossGroupId];
            
            while((depth--) > 0) {
                item[itemIndex++] = source[sourceIndex++];
            }
        }
        
        function updateVItemMeasure(line, cg) {
            // Start index of cross group in item
            var itemIndex = itemCrossGroupIndex.M,
                cgIndexes = me._colGroupsIndexes[cg],
                depth = me.M;
            
            for(var i = 0 ; i < depth ; i++){
                var lineIndex = cgIndexes[i];
                item[itemIndex++] = lineIndex != null ? line[lineIndex] : null;
            }
        }
        
        // ----------------

        function expandLine(line/*, i*/){
            updateVItemCrossGroup('R', line);
            
            return def.query(this._colGroups).select(function(colGroup, cg){
                  
                  // Update ITEM
                  updateVItemCrossGroup('C', colGroup);
                  updateVItemMeasure(line, cg);
                  
                  // Naive approach...
                  // Call all readers every time
                  // Dimensions that consume rows and/or columns may be evaluated many times.
                  // So, it's very important that pvc.data.Dimension#intern is as fast as possible
                  //  detecting already interned values.
                  return this._readItem(null, item, dimsReaders);
               }, this);
        }
        
        return def.query(this._lines)
                  .selectMany(expandLine, this);
    },
    
    _measureData: function(){
        /* Don't change source */
        var lines = pvc.cloneMatrix(this.source);

        this._lines = lines;

        /* Initialize Space and Formatting Options */

        // Space depth / number of components
        // Default values
        this.R = 1;
        this.C = 1;

        // Single measure
        this.M = 1;
        this.measuresDirection = null;

        var colNames;
        if(this.options.seriesInRows){
            colNames = this.metadata.map(function(d){ return d.colName; });

            lines.unshift(colNames);
            pv.transpose(lines); // Transposes, in-place
            colNames = lines.shift();
            colNames.forEach(function(value, i){
                colNames[i] = {v: value}; // may be null ....
            });
            
        } else if(this.options.compatVersion <= 1){
            colNames = this.metadata.map(function(d){ return {v: d.colName}; });
        } else {
            colNames = this.metadata.map(function(d){ return {v: d.colName, f: d.colLabel }; });
        }

        // --------------
        // * crosstabMode = true;
        // * isMultiValued (Some space is multi...)
        // * measuresInColumns
        // * measuresIndex, [measuresCount=1]
        // * [categoriesCount = 1]
        var categoriesCount;
        if(!this.options.isMultiValued) {
            categoriesCount = def.get(this.options, 'categoriesCount', 1);

            // TODO: >= 0 check
            this.R = categoriesCount;

            this._colGroups = colNames.slice(this.R);
            this._colGroupsIndexes = new Array(this._colGroups.length);
            
            // To Array
            this._colGroups.forEach(function(colGroup, cg){
                this._colGroups[cg] = [colGroup];
                this._colGroupsIndexes[cg] = [this.R + cg]; // all the same
            }, this);

        } else {
            var measuresInColumns = def.get(this.options, 'measuresInColumns', true);
            if(measuresInColumns || this.options.measuresIndex == null) {

                categoriesCount = def.get(this.options, 'categoriesCount', 1);

                // TODO: >= 0 check
                // TODO: Multiples consume row space?
                this.R = categoriesCount;

                // First R columns are from row space
                var encodedColGroups = colNames.slice(this.R),
                    L = encodedColGroups.length;

                // Any results in column direction...
                if(L > 0) {
                    if(measuresInColumns) {
                        this.measuresDirection = 'columns';

                        this._processEncodedColGroups(encodedColGroups);
                        // Updates:
                        // this._colGroups
                        // this._colGroupsIndexes
                        // this.M

                    } else {
                        // M = 1
                        this._colGroups = encodedColGroups;
                        this._colGroupsIndexes = [];

                        // Split encoded column groups
                        this._colGroups.forEach(function(colGroup, cg){
                            this._colGroups[cg] = this._splitEncodedColGroupCell(colGroup);
                            this._colGroupsIndexes[cg] = [this.R + cg]; // all the same
                        }, this);
                    }

                    this.C = this._colGroups[0].length; // may be 0!
                }

            } else {
                this.measuresDirection = 'rows';

                // C = 1 (could also be more if an option to make ~ on existed)
                // R = 1 (could be more...)
                // M >= 1

                // The column index at which measure values (of each series) start
                // is the number of row components
                this.R = +this.options.measuresIndex;

                var measuresCount = this.options.measuresCount;
                if (measuresCount == null) {
                    measuresCount = 1;
                }

                // TODO: >= 1 check
                this.M = measuresCount;

                // First R columns are from row space
                // Next follows a non-relevant Measure title column
                this._colGroups = colNames.slice(this.R + 1);

                // To Array of Cells
                this._colGroups.forEach(function(colGroup, cg){
                    this._colGroups[cg] = [colGroup];
                }, this);
            }

            /* secondAxisSeriesIndexes only implemented for single-series */
            if(this.C === 1) {
                // The null test is required because secondAxisSeriesIndexes can be a number, a string...
                var axis2SeriesIndexes = this.options.secondAxisSeriesIndexes;
                if(axis2SeriesIndexes != null){
                    var seriesKeys = this._colGroups.map(function(colGroup){
                        return '' + colGroup[0].v;
                    });
                    this._axis2SeriesKeySet = this._createSecondAxisSeriesKeySet(axis2SeriesIndexes, seriesKeys);
                }
            }
        }

        // ----------------
        // The index at which the first component of
        // each cross group starts in virtual item
        this._itemCrossGroupIndex = {
                'C': 0,
                'R': this.C,
                'M': this.C + this.R
            };

        // ----------------

        if(pvc.debug >= 3){
            pvc.log("Crosstab translator " + JSON.stringify({
                R: this.R,
                C: this.C,
                M: this.M
            }));
        }
    },

    _splitEncodedColGroupCell: function(colGroup){
        var values = colGroup.v,
            labels = colGroup.f;

        if(values == null){
            values = [];
            labels = undefined;
        } else {
            values = values.split(this._separator);
            labels = labels && labels.split(this._separator);
        }

        return values.map(function(value, index){
            return {
                v: value,
                f: labels && labels[index]
            };
        });
    },

    /**
     * Analyzes the array of encoded column groups.
     * <p>
     * Creates and array of column groups
     * where each element is an array of column group values.
     * </p>
     * <p>
     * In the process the number of encoded measures is determined, {@link #M}.
     * In this respect, note that not all measures need to be supplied
     * in every column group.
     * When a measure is not present, that means that the value of the measure
     * in every row is null.
     * </p>
     * <p>
     * It is assumed that the order of measures in column groups is stable.
     * So, if in one column group "measure 1" is before "measure 2",
     * then it must be also the case in every other column group.
     * This order is then used to place values in the virtual item.
     * </p>
     */
    _processEncodedColGroups: function(encodedColGroups){
        var L = encodedColGroups.length || def.assert("Must have columns"),
            colGroups = [],
            colGroup,
            /*
             * measureName -> {
             *     groupIndex: 0, // Global order of measures within a column group
             *     index: 0       // Index (i, below) of measure's first appearance
             * }
             *
             */
            measuresInfo  = {},
            measuresInfoList = []
            ;

        for(var i = 0 ; i < L ; i++){
            var colGroupCell = encodedColGroups[i],
                encColGroupValues = colGroupCell.v,
                sepIndex = colGroupCell.v.lastIndexOf(this._separator),
                meaName,
                colGroupValues;
            
            // MeasureName has precedence,
            // so we may end up with no column group value (and C = 0).
            if(sepIndex < 0){
                // C = 0
                meaName = encColGroupValues;
                encColGroupValues = '';
                colGroupValues = [];
            } else {
                meaName = encColGroupValues.substring(sepIndex + 1);
                encColGroupValues = encColGroupValues.substring(0, sepIndex);
                colGroupValues = encColGroupValues.split(this._separator);

                var colGroupLabels;
                if(colGroupCell.f != null){
                    colGroupLabels = colGroupCell.f.split(this._separator);
                    colGroupLabels.pop(); // measure label
                }
                
                /*jshint loopfunc:true */
                colGroupValues.forEach(function(value, index){
                    var label = colGroupLabels && colGroupLabels[index];
                    colGroupValues[index] = {v: value, f: label};
                });
            }

            // New column group?
            if(!colGroup || colGroup.encValues !== encColGroupValues){
                colGroup = {
                    index:        i,
                    encValues:    encColGroupValues,
                    values:       colGroupValues,
                    measureNames: [meaName]
                };

                colGroups.push(colGroup);
            } else {
                colGroup.measureNames.push(meaName);
            }

            // Check the measure
            var currMeaIndex = (i - colGroup.index),
                meaInfo = def.getOwn(measuresInfo, meaName);
            if(!meaInfo){
                measuresInfo[meaName] = meaInfo = {
                    name: meaName,
                    groupIndex: currMeaIndex,
                    index: i
                };
                measuresInfoList.push(meaInfo);
            } else if(currMeaIndex > meaInfo.groupIndex) {
                meaInfo.groupIndex = currMeaIndex;
            }
        }

        // Sort measures
        measuresInfoList.sort(function(infoa, infob){
            return def.compare(infoa.groupIndex, infob.groupIndex) ||
                   def.compare(infoa.index, infob.index)
                   ;
        });

        // Reassign measure group indexes
        measuresInfoList.forEach(function(meaInfo2, index){
            meaInfo2.groupIndex = index;
        });

        // Publish colgroups and colgroupIndexes, keeping only relevant information
        var CG = colGroups.length,
            colGroupsValues  = new Array(CG),
            colGroupsIndexes = new Array(CG),
            M = measuresInfoList.length,
            R = this.R
            ;
        
        colGroups.map(function(colGroup2, cg){
            colGroupsValues[cg] = colGroup2.values;

            // The index in source *line* where each of the M measures can be read
            var meaIndexes = colGroupsIndexes[cg] = new Array(M);
            colGroup2.measureNames.forEach(function(meaName2, index){
                meaIndexes[measuresInfo[meaName2].groupIndex] = R + colGroup2.index + index;
            });
        });

        this._colGroups        = colGroupsValues;
        this._colGroupsIndexes = colGroupsIndexes;
        this.M = M;
    },
    
    /**
     * Called once, before {@link #execute},
     * for the translation to configure the complex type.
     *
     * @type undefined
     * @override
     */
    configureType: function(){
        // Map: Dimension Group -> Item cross-groups indexes
        if(this.measuresDirection === 'rows') {
            throw def.error.notImplemented();
        }

        var me = this,
            index = 0;
        
        function add(dimGroupName, crossGroup, level, count) {
            var crossEndIndex = me._itemCrossGroupIndex[crossGroup] + count; // exclusive
            
            while(count > 0) {
                var dimName = pvc.data.DimensionType.dimensionGroupLevelName(dimGroupName, level);
                if(!me._userUsedDims[dimName]) { // Skip name if occupied and continue with next name
                    
                    // use first available slot for auto dims readers as long as within crossIndex and crossIndex + count
                    index = me._nextAvailableItemIndex(index);
                    if(index >= crossEndIndex) {
                        // this group has no more slots available
                        return;
                    }
                    
                    // Consume the index
                    me._userItem[index] = true;
                    
                    var reader = me._propGet(dimName, index);
                    
                    me._userDimsReaders.push(reader);
                    
                    // <Debug>
                    /*jshint expr:true */
                    !def.hasOwn(me._userDimsReadersByDim, dimName) || def.assert("Dimension already being read.");
                    // </Debug>
                    
                    me._userDimsReadersByDim[dimName] = reader;
                    
                    count--;
                }
                
                level++;
            }
        }
        
        if(this.C > 0){
            add('series', 'C', 0, this.C);
        }
        
        if(this.R > 0){
            add('category', 'R', 0, this.R);
        }
        
        if(!this._userUsedDims.value) {
            add('value', 'M', 0, this.M);
        }

        if(this._axis2SeriesKeySet){
            var seriesReader = this._userDimsReadersByDim.series;
            if(seriesReader) {
                var calcAxis2SeriesKeySet = def.fun.constant(this._axis2SeriesKeySet);

                /* Create a reader that surely only returns 'series' atoms */
                seriesReader = this._filterDimensionReader(seriesReader, 'series');

                this._dataPartGet(calcAxis2SeriesKeySet, seriesReader);
                
                this._userDimsReaders.push(
                    this._value1AndValue2Get(calcAxis2SeriesKeySet, seriesReader, index));
            }
        }
    }
});
/**
 * @name pvc.data.RelationalTranslationOper
 * 
 * @class Represents one translation operation, 
 * from a source matrix in relational format to 
 * an enumerable of atom arrays.
 * 
 * <p>
 * The default matrix-relational format is:
 * </p>
 * <pre>
 * ---------------------------
 *    0   |    1     |   2
 * ---------------------------
 * series | category | value
 * ---------------------------
 *    T   |     A    |   12
 *    T   |     B    |   45
 *    Q   |     A    |   11
 *    Q   |     B    |   99
 *    Z   |     B    |    3
 * </pre>
 * <p>
 * If the option <i>seriesInRows</i> is true
 * the indexes of series and categories are switched.
 * </p>
 * <p>
 * If the option <i>measuresIndexes</i> is specified,
 * additional value dimensions are created to receive the specified columns.
 * Note that these indexes may consume series and/or category indexes as well. 
 * </p>
 * <p>
 * If only two metadata columns are provided, 
 * then a dummy 'series' column with the constant null value is added automatically. 
 * </p>
 * 
 * @extends pvc.data.MatrixTranslationOper
 *  
 * @constructor
 * @param {pvc.data.ComplexType} complexType The complex type that will represent the translated data.
 * @param {object} source The matrix-relational array to be translated.
 * The source is not modified.
 * @param {object} [metadata] A metadata object describing the source.
 * 
 * @param {object} [options] An object with translation options.
 * See additional available options in {@link pvc.data.MatrixTranslationOper}.
 * 
 * @param {(number|string)[]|number|string} [options.measuresIndexes] 
 * An array of indexes of columns of the source matrix
 * that contain value dimensions.
 * <p>
 * Multiple 'value' dimensions ('value', 'value2', 'value3', ...) 
 * are bound in order to the specified indexes.
 * </p>
 * <p>
 * The option 'secondAxisSeriesIndexes' 
 * is incompatible with and 
 * takes precedence over 
 * this one.
 * </p>
 * <p>
 * The indexes can be numbers or strings that represent numbers.
 * It is also possible to specify a single index instead of an array.
 * </p>
 */
def.type('pvc.data.RelationalTranslationOper', pvc.data.MatrixTranslationOper)
.add(/** @lends pvc.data.RelationalTranslationOper# */{
    
    /**
     * Called once, before {@link #execute}, 
     * for the translation to configure the complex type.
     * 
     * @type undefined
     * @override
     */
    configureType: function(){
        var me = this;
        
        function add(dimGet, dim) {
            me._userDimsReaders.push(dimGet);
            if(dim){
                // <Debug>
                /*jshint expr:true */
                !def.hasOwn(me._userDimsReadersByDim, dim) || def.assert("Dimension already being read.");
                // </Debug>
                
                me._userDimsReadersByDim[dim] = dimGet;
            }
        }

        var L = this.metadata.length,
            unmappedColCount = L - this._userUsedIndexesCount;
         
        if(unmappedColCount > 0){

            /* Value dimension(s) (fixed multiple indexes) */
            var valuesColIndexes;
            if(!this._userUsedDims.value &&
               this.options.isMultiValued &&
               // The null test is required because measuresIndexes can be a number, a string...
               (valuesColIndexes = this.options.measuresIndexes) != null) {

                this.defReader({names: 'value', indexes: valuesColIndexes });
                
                unmappedColCount = L - this._userUsedIndexesCount;
            }

            if(unmappedColCount > 0){
                /* Build the dimensions that can be read automatically */
                var dimName,
                    autoColDims = !this.options.seriesInRows ?
                                  ['value', 'category', 'series'  ] :
                                  ['value', 'series',   'category']
                                  ;

                /*
                 * Leave only those not already mapped by the user,
                 * giving priority to those on the left.
                 */
                autoColDims = autoColDims.filter(function(dimName2){
                                return !this._userUsedDims[dimName2];
                              }, this)
                              .slice(0, unmappedColCount);

                unmappedColCount -= autoColDims.length;
                if(unmappedColCount > 0){
                    var desiredCatCount = def.get(this.options, 'categoriesCount', 1);
                    if(desiredCatCount > 1){
                        var catIndex = autoColDims.indexOf('category');
                        if(catIndex < 0){
                            if(this.options.seriesInRows){
                                catIndex = autoColDims.length;
                            } else {
                                catIndex = autoColDims.indexOf('value') + 1;
                            }
                        } else {
                            // Insert after the 1st category
                            catIndex++;
                        }

                        var catLevel = 1;
                        while(catLevel < desiredCatCount){
                            dimName = pvc.data.DimensionType.dimensionGroupLevelName('category', catLevel++);
                            if(!this._userUsedDims[dimName]){
                                def.array.insertAt(
                                    autoColDims,
                                    catIndex++,
                                    dimName);
                            }
                        }
                    }
                }

                /* Assign virtual item indexes to remaining auto dims */
                var index = 0;
                while(autoColDims.length && (dimName = autoColDims.pop())) {
                    index = this._nextAvailableItemIndex(index);

                    // mark the index as mapped
                    this._userItem[index] = true;

                    add(this._propGet(dimName, index), dimName);

                    index++;
                }
            }
        }
        
        // ----
        // The null test is required because secondAxisSeriesIndexes can be a number, a string...
        var axis2SeriesIndexes = this.options.secondAxisSeriesIndexes;
        if(axis2SeriesIndexes != null){
            var seriesReader = this._userDimsReadersByDim.series;
            if(seriesReader) {
                add(relTransl_dataPartGet.call(this, axis2SeriesIndexes, seriesReader));
            }
        }
    }
});

/**
 * Obtains the dimension reader for dimension 'dataPart'.
 * 
 * @name pvc.data.RelationalTranslationOper#_dataPartGet
 * @function
 * @param {Array} secondAxisSeriesIndexes The indexes of series that are to be shown on the second axis. 
 * @param {function} seriesReader Dimension series atom getter.
 * @type function
 */
function relTransl_dataPartGet(secondAxisSeriesIndexes, seriesReader) {
    var me = this;
    
    /* Create a reader that surely only returns 'series' atoms */
    seriesReader = this._filterDimensionReader(seriesReader, 'series');
    
    /* Defer calculation of axis2SeriesKeySet because *data* isn't yet available. */
    function calcAxis2SeriesKeySet() {
        var seriesKeys = def.query(me.source)
                                .select(function(item){
                                    var atom = seriesReader(item);
                                    return (atom && atom.key) || null;
                                })
                                /* distinct excludes null keys */
                                .distinct()
                                .array();

        return me._createSecondAxisSeriesKeySet(secondAxisSeriesIndexes, seriesKeys);
    }
    
    return this._dataPartGet(calcAxis2SeriesKeySet, seriesReader);
}/**
 * Initializes an atom instance.
 * 
 * @name pvc.data.Atom
 * 
 * @class An atom represents a unit of information.
 * 
 * <p>
 * To create an atom, 
 * call the corresponding dimension's
 * {@link pvc.data.Dimension#intern} method.
 * 
 * Usually this is done by a {@link pvc.data.TranslationOper}.
 * </p>
 * 
 * @property {pvc.data.Dimension} dimension The owner dimension.
 * 
 * @property {number} id
 *           A unique object identifier.
 *           
 * @property {any} rawValue The raw value from which {@link #value} is derived.
 *           <p>
 *           It is not always defined. 
 *           Values may be the result of
 *           combining multiple source values.
 *            
 *           Values may even be constant
 *           and, as such, 
 *           not be derived from 
 *           any of the source values.
 *           </p>
 * 
 * @property {any} value The typed value of the atom.
 *           It must be consistent with the corresponding {@link pvc.data.DimensionType#valueType}.
 * 
 * @property {string} label The formatted value.
 *           <p>
 *           Only the null atom can have a empty label.
 *           </p>
 *           
 * @property {string} key The value of the atom expressed as a
 *           string in a way that is unique amongst all atoms of its dimension.
 *           <p>
 *           Only the null atom has a key equal to "".
 *           </p>
 * 
 * @constructor
 * @private
 * @param {pvc.data.Dimension} dimension The dimension that the atom belongs to.
 * @param {any} value The typed value.
 * @param {string} label The formatted value.
 * @param {any} rawValue The source value.
 * @param {string} key The key.
 */
def.type('pvc.data.Atom')
.init(
function(dimension, value, label, rawValue, key) {
    this.dimension = dimension;
    this.id = value == null ? 0 : def.nextId(); // Ensure null sorts first, when sorted by id
    this.value = value;
    this.label = label;
    this.rawValue = rawValue;
    this.key = key;
})
.add( /** @lends pvc.data.Atom */{
    /**
     * Obtains the label of the atom.
     */
    toString: function(){
        return this.label;
    },

    /**
     * A semantic key that is unique across atoms of every dimensions.
     */
    globalKey: function(){
        return this.dimension.name + ":" + this.key;
    }
});


/**
 * Comparer for atom according to their id.
 */
function atom_idComparer(a, b) {
    return a.id - b.id; // works for numbers...
}

/**
 * Reverse comparer for atom according to their id.
 */
function atom_idComparerReverse(a, b) {
    return b.id - a.id; // works for numbers...
}/**
 * The separator used between labels of dimensions of a complex.
 */
var complex_labelSep = " ~ ";

/**
 * Initializes a complex instance.
 * 
 * @name pvc.data.Complex
 * 
 * @class A complex is a set of atoms, 
 *        of distinct dimensions,
 *        all owned by the same data.
 * 
 * @property {number} id
 *           A unique object identifier.
 * 
 * @property {number} key
 *           A semantic identifier.
 *           <p>
 *           Only contains information related to locally set atoms.
 *           Atoms that are present in a base atoms object are not included.
 *           </p>
 *           
 * @property {pvc.data.Data} owner
 *           The owner data instance.
 * 
 * @property {object} atoms
 *           A index of {@link pvc.data.Atom} by the name of their dimension type.
 * 
 * @constructor
 * @param {pvc.data.Data} owner
 *        An owner data instance.
 * 
 * @param {pvc.data.Atom[]} [atoms]
 *        An array of atoms of distinct dimensions.
 *        
 * @param {object} [atomsBase] 
 *        An object to serve as prototype to the {@link #atoms} object.
 *        <p>
 *        Atoms already present in this object are not set locally.
 *        The key of the complex is thus affected.
 *        </p>  
 */
def
.type('pvc.data.Complex')
.init(function(owner, atoms, atomsBase) {
    // <Debug>
    /*jshint expr:true */
    (owner && owner.isOwner()) || def.fail.argumentInvalid('owner', "Must be an owner data.");
    // </Debug>
    
    this.id    = def.nextId();
    this.owner = owner;
    
    this.atoms = atomsBase ? Object.create(atomsBase) : {};
	
    if (!atoms) {
        this.value = null;
        this.key   = '';
    } else {
        var atomsMap = this.atoms,
            count    = 0,
            singleValue;
        
        atoms.forEach(function(atom) {
            atom || def.fail.argumentRequired('atom');
            
            var value = atom.value; 
            if(value != null){ // already in proto object
                var atomDim  = atom.dimension, 
                    name     = atomDim.name,
                    atomBase = atomsBase && atomsBase[name];

                if(!atomBase || atom !== atomBase) { 
                    // <Debug>
                    if(atomDim !== owner.dimensions(name)){
                        throw def.error.operationInvalid("Invalid atom dimension '{0}'.", [name]);
                    }

                    if(def.hasOwn(atomsMap, name)) {
                        throw def.error.operationInvalid("An atom of the same dimension has already been added '{0}'.", [name]);
                    }
                    // </Debug>
                    
                    count++;
                    atomsMap[name] = atom;
                    if(count === 1){
                        singleValue = atom.value;
                    }
                }
            }
        }, this);
		
        var keys = [];
        owner.type
            .dimensionsNames()
            .forEach(function(dimName){
                if(def.hasOwn(atomsMap, dimName)) {
                    keys.push(atomsMap[dimName].globalKey());
                }
            });

        this.key   = keys.join(',');
        this.value = count === 1 ? singleValue : this.key;
	}
})
.add(/** @lends pvc.data.Complex# */{

    buildLabel: function(atoms){
    
        if (atoms) 
            return  atoms
                    .map(function(atom){ return atom.label; })
                    .filter(def.notEmpty)
                    .join(complex_labelSep);
        else
            return "";
    },

    view: function(dimNames){
        return new pvc.data.ComplexView(this, dimNames);
    },

    toString : function() {
       var s = [ '' + this.constructor.typeName ];
       
       if (this.index != null) {
           s.push("#" + this.index);
       }

       this.owner.type.dimensionsNames().forEach(function(name) {
           s.push(name + ": " + JSON.stringify(this.atoms[name].value));
       }, this);

       return s.join(" ");
   }
});
/**
 * Initializes a complex view instance.
 * 
 * @name pvc.data.ComplexView
 * 
 * @class Represents a view of certain dimensions over a given source complex instance.
 * @extends pvc.data.Complex
 * 
 * @property {pvc.data.Complex} source The source complex instance.
 * @property {string} label The composite label of the own atoms in the view.
 * @constructor
 * @param {pvc.data.Complex} source The source complex instance.
 * @param {string[]} ownDimNames The dimensions that should be revealed by the view.
 */
def.type('pvc.data.ComplexView', pvc.data.Complex)
.init(function(source, ownDimNames){

    this.source = source;
    var viewDimNames = this.viewDimNames = [];
    
    var sourceAtoms = source.atoms,
        atoms = [];

    ownDimNames.forEach(function(dimName){
        var atom = def.getOwn(sourceAtoms, dimName);
        if(atom){
            atoms.push(atom);
            viewDimNames.push(dimName);
        }
    });

    // Call base constructor
    var owner = source.owner;
    this.base(owner, atoms, owner.atoms);
    
    // Build label based on (really) own atoms
    this.label = this.buildLabel(atoms);
})
.add({
    values: function(){
        return this.viewDimNames.map(function(dimName){
            return this.atoms[dimName].value;
        }, this);
    }
});
/**
 * Initializes a datum instance.
 * 
 * @name pvc.data.Datum
 * 
 * @class A datum is a complex that contains atoms for all the
 * dimensions of the associated {@link #data}.
 *
 * @extends pvc.data.Complex
 * 
 * @property {boolean} isNull Indicates if the datum is a null datum.
 * <p>
 * A null datum is a datum that doesn't exist in the data source,
 * but is created for auxiliary reasons (null pattern).
 * </p>
 *
 * @property {boolean} isSelected The datum's selected state (read-only).
 * @property {boolean} isVisible The datum's visible state (read-only).
 * 
 * @constructor
 * @param {pvc.data.Data} data The data instance to which the datum belongs.
 * Note that the datum will belong instead to the owner of this data. 
 * However the datums atoms will inherit from the atoms of the specified data.
 * This is essentially to facilitate the creation of null datums.
 * @param {pvc.data.Atom[]} [atoms] An array of atoms of <i>distinct</i> dimensions.
 * @param {boolean} [isNull=false] Indicates if the datum is a null datum.
 */
def.type('pvc.data.Datum', pvc.data.Complex)
.init(
function(data, atoms, isNull){
    
    this.base(data.owner, atoms, data.atoms);
    
    if(isNull) {
        this.isNull = true;
    } // otherwise inherit prototype default value
})
.add(/** @lends pvc.data.Datum# */{
    
    isSelected: false,
    isVisible:  true,
    isNull: false,
    
    /**
     * Sets the selected state of the datum to a specified value.
     * 
     * @param {boolean} [select=true] The desired selected state.
     * 
     * @returns {boolean} true if the selected state changed, false otherwise.
     */
    setSelected: function(select){
        // Null datums are always not selected
        if(this.isNull){ return false; }
        
        // Normalize 'select'
        select = (select == null) || !!select;

        var changed = this.isSelected !== select;
        if(changed){
            if(!select){
                delete this.isSelected;
            } else {
                this.isSelected = true;
            }
            
            
            /*global data_onDatumSelectedChanged:true */
            data_onDatumSelectedChanged.call(this.owner, this, select);
        }

        return changed;
    },
    
    /**
     * Toggles the selected state of the datum.
     * 
     * @type {undefined}
     */
    toggleSelected: function(){
        return this.setSelected(!this.isSelected);
    },
    
    /**
     * Sets the visible state of the datum to a specified value.
     * 
     * @param {boolean} [visible=true] The desired visible state.
     * 
     * @returns {boolean} true if the visible state changed, false otherwise.
     */
    setVisible: function(visible){
        // Null datums are always visible
        if(this.isNull){ return false; }
        
        // Normalize 'visible'
        visible = (visible == null) || !!visible;

        var changed = this.isVisible !== visible;
        if(changed){
            this.isVisible = visible;
            //if(!this.isNull){
                /*global data_onDatumVisibleChanged:true */
                data_onDatumVisibleChanged.call(this.owner, this, visible);
            //}
        }

        return changed;
    },
    
    /**
     * Toggles the visible state of the datum.
     * 
     * @type {undefined}
     */
    toggleVisible: function(){
        return this.setVisible(!this.isVisible);
    }
});

/**
 * Called by the owner data to clear the datum's selected state (internal).
 * @name pvc.data.Datum#_deselect
 * @function
 * @type undefined
 * @private
 * 
 * @see pvc.data.Data#clearSelected
 */
function datum_deselect(){
    this.isSelected = false;
}
/**
 * Initializes a dimension instance.
 * 
 * @name pvc.data.Dimension
 * 
 * @class A dimension holds unique atoms,
 * of a given dimension type,
 * and for a given data instance.
 *
 * @property {pvc.data.Data} data The data that owns this dimension.
 * @property {pvc.data.DimensionType} type The dimension type of this dimension.
 * @property {string} name Much convenient property with the name of {@link #type}.
 * 
 * @property {pvc.data.Dimension} parent The parent dimension.
 * A root dimension has a null parent.
 * 
 * @property {pvc.data.Dimension} linkParent The link parent dimension.
 * 
 * @property {pvc.data.Dimension} root The root dimension.
 * A root dimension has itself as the value of {@link #root}.
 * 
 * @property {pvc.data.Dimension} owner The owner dimension.
 * An owner dimension is the topmost root dimension (accessible from this one).
 * An owner dimension owns its atoms, while others simply contain them.
 * The value of {@link pvc.data.Atom#dimension} is an atom's <i>owner</i> dimension.
 * 
 * @constructor
 * 
 * @param {pvc.data.Data} data The data that owns this dimension.
 * @param {pvc.data.DimensionType} type The type of this dimension.
 */

def.type('pvc.data.Dimension')
.init(function(data, type){
    this.data  = data;
    this.type  = type;
    this.root  = this;
    this.owner = this;
    this.name  = type.name;
    
    // Cache
    // -------
    // The atom id comparer ensures we keep atoms in the order they were added, 
    //  even when no semantic comparer is provided.
    // This is important, at least, to keep the visible atoms cache in the correct order.
    this._atomComparer = type.atomComparer();
    this._atomsByKey = {};
    
    if(data.isOwner()){
        // Owner
        // Atoms are interned by #intern
        this._atoms = [];
        
        dim_createVirtualNullAtom.call(this);
        
    } else {
        // Not an owner
        
        var source; // Effective parent / atoms source
        if(data.parent){
            // Not a root
            source = data.parent.dimensions(this.name);
            dim_addChild.call(source, this);
            
            this.root = data.parent.root;
        } else {
            // A root that is not topmost
            /*jshint expr:true */
            data.linkParent || def.assert("Data must have a linkParent");
            
            source = data.linkParent.dimensions(this.name);
            dim_addLinkChild.call(source, this);
        }
        
        // Not in _atomsKey
        this._nullAtom = this.owner._nullAtom; // may be null
        
        this._lazyInit = function(){ /* captures 'source' variable */
            this._lazyInit = null;
            
            // Collect distinct atoms in data._datums
            this.data._datums.forEach(function(datum){
                // NOTE: Not checking if atom is already added,
                // but it has no adverse side-effect.
                var atom = datum.atoms[this.name];
                this._atomsByKey[atom.key] = atom;
            }, this);
            
            // Filter parentEf dimension's atoms; keeps order.
            this._atoms = source.atoms().filter(function(atom){
                return def.hasOwn(this._atomsByKey, atom.key);
            }, this);
        };
    }
})
.add(/** @lends pvc.data.Dimension# */{
    
    parent: null,
    
    linkParent: null,
    
    /**
     * The array of child dimensions.
     * @type pvc.data.Dimension[] 
     */
    _children: null,
    
    /**
     * The array of link child dimensions.
     * @type pvc.data.Dimension[] 
     */
    _linkChildren: null,
    
    /**
     * A map of the contained atoms by their {@link pvc.data.Atom#key} property.
     * 
     * Supports the intern(...), atom(.), and the control of the visible atoms cache.
     *
     * @type object
     */
    _atomsByKey: null,
    
    /**
     * A map of the count of visible datums per atom {@link pvc.data.Atom#key} property.
     *
     * @type object
     */
    _atomVisibleDatumsCount: null, 
    
    /** 
     * Indicates if the object has been disposed.
     * 
     * @type boolean
     * @private 
     */
    _disposed: false,

    /**
     * The atom with a null value.
     *
     * @type pvc.data.Atom
     * @private
     */
    _nullAtom: null,
    
    /**
     * The virtual null atom.
     *
     * <p>
     * This atom exists to resolve situations 
     * where a null atom does not exist in the loaded data.
     * When a null <i>datum</i> is built, it may not specify
     * all dimensions. When such an unspecified dimension
     * is accessed the virtual null atom is returned by 
     * lookup of the atoms prototype chain (see {@link pvc.data.Data#_atomsBase}.
     * </p>
     * 
     * @type pvc.data.Atom
     * @private
     */
    _virtualNullAtom: null,
    
    /**
     * Cache of sorted visible and invisible atoms.
     * A map from visible state to {@link pvc.data.Atom[]}.
     * <p>
     * Cleared whenever any atom's "visible state" changes.
     * </p>
     * 
     * @type object
     * @private
     */
    _visibleAtoms: null, 
    
    /**
     * Cache of sorted visible and invisible indexes.
     * A map from visible state to {@link number[]}.
     * <p>
     * Cleared whenever any atom's "visible state" changes.
     * </p>
     * 
     * @type object
     * @private
     */
    _visibleIndexes: null,
    
    /**
     * Cache of the dimension type's normal order atom comparer.
     * 
     * @type function
     * @private
     */
    _atomComparer: null,
    
    /**
     * The ordered array of contained atoms.
     * <p>
     * The special null atom, if existent, is the first item in the array.
     *</p>
     *<p>
     * On a child dimension it is a filtered version 
     * of the parent's array, 
     * and thus has the same atom relative order.
     * 
     * In a link child dimension it is copy
     * of the link parent's array.
     * </p>
     * 
     * @type pvc.data.Atom[]
     * @see #_nullAtom
     */
    _atoms: null,

    /**
     * An object with cached results of the {@link #sum} method.
     *
     * @type object
     */
    _sumCache: null,

    /**
     * Obtains the number of atoms contained in this dimension.
     * 
     * <p>
     * Consider calling this method on the root or owner dimension.
     * </p>
     *
     * @returns {Number} The number of contained atoms.
     *
     * @see pvc.data.Dimension#root
     * @see pvc.data.Dimension#owner
     */
    count: function(){
        if(this._lazyInit) { this._lazyInit(); }
        return this._atoms.length;
    },
    
    /**
     * Indicates if an atom belonging to this dimension 
     * is considered visible in it.
     * 
     * <p>
     * An atom is considered visible in a dimension
     * if there is at least one datum of the dimension's data
     * that has the atom and is visible.
     * </p>
     *
     * @param {pvc.data.Atom} atom The atom of this dimension whose visible state is desired.
     * 
     * @type boolean
     */
    isVisible: function(atom){
        if(this._lazyInit) { this._lazyInit(); }
        
        // <Debug>
        /*jshint expr:true */
        def.hasOwn(this._atomsByKey, atom.key) || def.assert("Atom must exist in this dimension.");
        // </Debug>
        
        return dim_getVisibleDatumsCountMap.call(this)[atom.key] > 0;
    },
    
    /**
     * Obtains the atoms contained in this dimension,
     * possibly filtered.
     * 
     * <p>
     * Consider calling this method on the root or owner dimension.
     * </p>
     * 
     * @param {Object} [keyArgs] Keyword arguments.
     * @param {boolean} [keyArgs.visible=null] 
     *      Only considers atoms that  
     *      have the specified visible state.
     * 
     * @returns {pvc.data.Atom[]} An array with the requested atoms.
     * Do <b>NOT</b> modify the returned array.
     * 
     * @see pvc.data.Dimension#root
     * @see pvc.data.Dimension#owner
     */
    atoms: function(keyArgs){
        if(this._lazyInit) { this._lazyInit(); }
        
        var visible = def.get(keyArgs, 'visible');
        if(visible == null){
            return this._atoms;
        }
        
        visible = !!visible;
        
        /*jshint expr:true */
        this._visibleAtoms || (this._visibleAtoms = {});
        
        return this._visibleAtoms[visible] || 
               (this._visibleAtoms[visible] = dim_calcVisibleAtoms.call(this, visible));
    },
    
    /**
     * Obtains the local indexes of all, visible or invisible atoms.
     * 
     * @param {Object} [keyArgs] Keyword arguments.
     * @param {boolean} [keyArgs.visible=null] 
     *      Only considers atoms that 
     *      have the specified visible state.
     * 
     * @type number[]
     */
    indexes: function(keyArgs){
        if(this._lazyInit) { this._lazyInit(); }
        
        var visible = def.get(keyArgs, 'visible');
        if(visible == null) {
            // Not used much so generate each time
            return pv.range(0, this._atoms.length);
        }
        
        visible = !!visible;
        
        /*jshint expr:true */
        this._visibleIndexes || (this._visibleIndexes = {});
        return this._visibleIndexes[visible] || 
               (this._visibleIndexes[visible] = dim_calcVisibleIndexes.call(this, visible));
    },
    
    /**
     * Obtains an atom that represents the specified value, if one exists.
     * 
     * @param {any} value A value of the dimension type's {@link pvc.data.DimensionType#valueType}.
     * 
     * @returns {pvc.data.Atom} The existing atom with the specified value, or null if there isn't one.
     */
    atom: function(value){
        if(value == null || value === '') {
            return this._nullAtom; // may be null
        }
        
        if(value instanceof pvc.data.Atom) {
            return value;
        }
        
        if(this._lazyInit) { this._lazyInit(); }

        var key = this.type._key ? this.type._key.call(null, value) : value;
        return this._atomsByKey[key] || null; // undefined -> null
    },
    
    /**
     * Obtains the minimum and maximum atoms of the dimension,
     * possibly filtered.
     * 
     * <p>
     * Assumes that the dimension type is comparable.
     * If not the result will coincide with "first" and "last".
     * </p>
     * 
     * <p>
     * Does not consider the null atom.
     * </p>
     * 
     * <p>
     * Consider calling this method on the root or owner dimension.
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * See {@link #atoms} for a list of available filtering keyword arguments. 
     *
     * @returns {object} 
     * An extent object with 'min' and 'max' properties, 
     * holding the minimum and the maximum atom, respectively,
     * if at least one atom satisfies the selection;
     * undefined otherwise.
     * 
     * @see #root
     * @see #owner
     * @see #atoms
     * @see pvc.data.DimensionType.isComparable
     */
    extent: function(keyArgs){
        // Assumes atoms are sorted (null, if existent is the first).
        var atoms  = this.atoms(keyArgs);
        var L = atoms.length;
        if(!L){ return undefined; }
        
        var offset = this._nullAtom && atoms[0].value == null ? 1 : 0;
        return (L > offset) ?
               {min: atoms[offset], max: atoms[L - 1]} :
               undefined;
    },
    
    /**
     * Obtains the minimum atom of the dimension,
     * possibly after filtering.
     * 
     * <p>
     * Assumes that the dimension type is comparable.
     * If not the result will coincide with "first".
     * </p>
     * 
     * <p>
     * Does not consider the null atom.
     * </p>
     * 
     * <p>
     * Consider calling this method on the root or owner dimension.
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * See {@link #atoms} for a list of available filtering keyword arguments. 
     *
     * @returns {pvc.data.Atom} The minimum atom satisfying the selection;
     * undefined if none.
     * 
     * @see #root
     * @see #owner
     * @see #atoms
     * @see pvc.data.DimensionType.isComparable
     */
    min: function(keyArgs){
        // Assumes atoms are sorted.
        var atoms = this.atoms(keyArgs);
        var L = atoms.length;
        if(!L){ return undefined; }
        
        var offset = this._nullAtom && atoms[0].value == null ? 1 : 0;
        return (L > offset) ? atoms[offset] : undefined;
    },
    
    /**
     * Obtains the maximum atom of the dimension,
     * possibly after filtering.
     * 
     * <p>
     * Assumes that the dimension type is comparable.
     * If not the result will coincide with "last".
     * </p>
     * 
     * <p>
     * Does not consider the null atom.
     * </p>
     * 
     * <p>
     * Consider calling this method on the root or owner dimension.
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * See {@link #atoms} for a list of available filtering keyword arguments. 
     *
     * @returns {pvc.data.Atom} The maximum atom satisfying the selection;
     * undefined if none.
     * 
     * @see #root
     * @see #owner
     * @see #atoms
     * 
     * @see pvc.data.DimensionType.isComparable
     */
    max: function(keyArgs){
        // Assumes atoms are sorted.
        var atoms = this.atoms(keyArgs);
        var L = atoms.length;
        
        return L && atoms[L - 1].value != null ? atoms[L - 1] : undefined;
    },
    
    /**
     * Obtains the sum of this dimension's values over all datums of the data,
     * possibly after filtering.
     * 
     * <p>
     * Assumes that the dimension type {@link pvc.data.DimensionType#valueType} is "Number".
     * </p>
     * 
     * <p>
     * Does not consider the null atom.
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * See {@link pvc.data.Data#datums} for a list of available filtering keyword arguments. 
     *
     * @param {boolean} [keyArgs.abs=false] Indicates if it is the sum of the absolute value that is desired.
     * @param {boolean} [keyArgs.zeroIfNone=true] Indicates that zero should be returned when there are no datums
     * or no datums with non-null values.
     * When <tt>false</tt>, <tt>null</tt> is returned, in that situation.
     *
     * @returns {number} The sum of considered datums or <tt>0</tt> or <tt>null</tt>, if none.
     * 
     * @see #root
     * @see #owner
     * @see #atoms
     */
    sum: function(keyArgs){
        var isAbs = !!def.get(keyArgs, 'abs', false),
            zeroIfNone = def.get(keyArgs, 'zeroIfNone', true),
            key   = dim_buildDatumsFilterKey(keyArgs) + ':' + isAbs;
              
        var sum = def.getOwn(this._sumCache, key);
        if(sum === undefined) {
            var dimName = this.name;
            sum = this.data.datums(null, keyArgs).reduce(function(sum2, datum){
                var value = datum.atoms[dimName].value;
                if(isAbs && value < 0){ // null < 0 is false
                    value = -value;
                }

                return sum2 != null ? (sum2 + value) : value; // null preservation
            },
            null);
            
            (this._sumCache || (this._sumCache = {}))[key] = sum;
        }
        
        return zeroIfNone ? (sum || 0) : sum;
    },
    
    /**
     * Obtains the percentage of a specified atom or value,
     * over the <i>sum</i> of the absolute values of a specified datum set.
     * 
     * <p>
     * Assumes that the dimension type {@link pvc.data.DimensionType#valueType} is "Number".
     * </p>
     * 
     * <p>
     * Does not consider the null atom.
     * </p>
     * 
     * @param {pvc.data.Atom|any} [atomOrValue] The atom or value on which to calculate the percent.
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * See {@link pvc.data.Dimension#sum} for a list of available filtering keyword arguments. 
     *
     * @returns {number} The calculated percentage.
     * 
     * @see #root
     * @see #owner
     */
    percent: function(atomOrValue, keyArgs){
        var value = (atomOrValue instanceof pvc.data.Atom) ? atomOrValue.value : atomOrValue;
        if(!value) { // nully or zero
            return 0;
        }
        // if value != 0 => sum != 0, but JIC, we test for not 0...
        var sum = this.sum(def.create(keyArgs, {abs: true}));
        return sum ? (Math.abs(value) / sum) : 0;
    },
    
    /**
     * Obtains the percentage of the local <i>sum</i> of a specified selection,
     * over the <i>sum</i> of the absolute values of an analogous selection in the parent data.
     * 
     * <p>
     * Assumes that the dimension type {@link pvc.data.DimensionType#valueType} is "Number".
     * </p>
     * 
     * <p>
     * Does not consider the null atom.
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * See {@link pvc.data.Dimension#sum} for a list of available filtering keyword arguments. 
     *
     * @returns {number} The calculated percentage.
     * 
     * @see #root
     * @see #owner
     */
    percentOverParent: function(keyArgs){
        var value = this.sum(keyArgs); // normal sum
        if(!value) { // nully or zero
            return 0;
        }
        
        // if value != 0 => sum != 0, but JIC, we test for not 0...
        var parentData = this.data.parent;
        if(!parentData) {
            return 0;
        }

        // The following would not work because, in each group,
        //  abs would not be used...
        //var sum = parentData.dimensions(this.name).sum();

        var sum = parentData.dimensionsSumAbs(this.name, keyArgs);

        return sum ? (Math.abs(value) / sum) : 0;
    },
    
    
    format: function(value, sourceValue){
        return "" + (this.type._formatter ? this.type._formatter.call(null, value, sourceValue) : "");
    },
    
    /**
     * Obtains an atom that represents the specified sourceValue,
     * creating one if one does not yet exist.
     * 
     * <p>
     * Used by a translation to 
     * obtain atoms of a dimension for raw values of source items.
     * </p>
     * <p>
     * This method can only be called on an owner dimension.
     * </p>
     * <p>
     * An empty string value is considered equal to a null value. 
     * </P>
     * @param {any} sourceValue The source value.
     *
     * @type pvc.data.Atom
     */
    intern: function(sourceValue){
        // <Debug>
        /*jshint expr:true */
        (this.owner === this) || def.assert("Can only internalize on an owner dimension.");
        // </Debug>
        
        // NOTE:
        // This function is performance critical!
      
        // The null path and the existing atom path 
        // are as fast and direct as possible
        
        // - NULL -
        if(sourceValue == null || sourceValue === '') {
            return this._nullAtom || dim_createNullAtom.call(this, sourceValue);
        }
        
        var type = this.type;
        
        // - CONVERT - 
        var value, label;
        if(type._converter){
            value = type._converter.call(null, sourceValue);
        } else if(typeof sourceValue === 'object' && ('v' in sourceValue)){
            // Assume google table style cell {v: , f: }
            value = sourceValue.v;
            label = sourceValue.f;
        } else {
            value = sourceValue;
        }
        
        if(value == null || value === '') {
            // Null after all
            return this._nullAtom || dim_createNullAtom.call(this, sourceValue);
        }
        
        // - CAST -
        // Any cast function?
        if(type.cast) {
            value = type.cast.call(null, value);
            if(value == null || value === ''){
                // Null after all (normally a cast failure)
                return this._nullAtom || dim_createNullAtom.call(this);
            }
        }
        
        // - KEY -
        var key = '' + (type._key ? type._key.call(null, value) : value);
        // <Debug>
        key || def.fail.operationInvalid("Only a null value can have an empty key.");
        // </Debug>
        
        // - ATOM -
        var atom = this._atomsByKey[key];
        if(atom) {
            return atom;
        }
        
        // - LABEL -
        if(label == null){
            if(type._formatter){
                label = type._formatter.call(null, value, sourceValue);
            } else {
                label = value;
            }
        }

        label = "" + label; // J.I.C.
        
        if(!label && pvc.debug >= 2){
            pvc.log("Only the null value should have an empty label.");
        }
        
        // - ATOM! -
        atom = new pvc.data.Atom(this, value, label, sourceValue, key);
        
        // Insert atom in order (or at the end when !_atomComparer)
        def.array.insert(this._atoms, atom, this._atomComparer);
        
        dim_clearVisiblesCache.call(this);
        
        this._atomsByKey[key] = atom;
        
        return atom;
    },
    
    /**
     * Disposes the dimension and all its children.
     */
    dispose: function(){
        if(!this._disposed){
            /*global data_disposeChildList:true */
            data_disposeChildList(this._children,     'parent');
            data_disposeChildList(this._linkChildren, 'linkParent');
            
            // myself
            
            if(this.parent)     { dim_removeChild.call(this.parent, this); }
            if(this.linkParent) { dim_removeLinkChild.call(this.linkParent, this); }
            
            dim_clearVisiblesCache.call(this);
            
            this._lazyInit  = null;
            
            this._atoms = 
            this._nullAtom = 
            this._virtualNullAtom = null;
            
            this._disposed = true;
        }
    }
});

/**
 * Builds a key string suitable for identifying a call to {@link pvc.data.Data#datums}
 * with no where specification.
 *
 * @name pvc.data.Dimension#_buildDatumsFilterKey
 * @function
 * @param {object} [keyArgs] The keyword arguments used in the call to {@link pvc.data.Data#datums}.
 * @type string
 */
function dim_buildDatumsFilterKey(keyArgs){
    var visible  = def.get(keyArgs, 'visible'),
        selected = def.get(keyArgs, 'selected');
    return (visible == null ? null : !!visible) + ':' + (selected == null ? null : !!selected);
}

/**
 * Creates the null atom if it isn't created yet.
 * 
 * @name pvc.data.Dimension#_createNullAtom
 * @function
 * @param {any} [sourceValue] The source value of null. Can be used to obtain the null format.
 * @type undefined
 * @private
 */
function dim_createNullAtom(sourceValue){
    // <Debug>
    /*jshint expr:true */
    (this.owner === this) || def.assert("Can only create atoms on an owner dimension.");
    // </Debug>
    
    if(!this._nullAtom){
        var label = "" + (this.type._formatter ? this.type._formatter.call(null, null, sourceValue) : "");
        
        this._nullAtom = new pvc.data.Atom(this, null, label, null, '');
        
        this._atomsByKey[''] = this._nullAtom;
        
        this._atoms.unshift(this._nullAtom);
        
        this.data._atomsBase[this.name] = this._nullAtom; 
    }
    
    return this._nullAtom;
}

/**
 * Creates the virtual null atom if it isn't created yet.
 * 
 * @name pvc.data.Dimension#_createNullAtom
 * @function
 * @type undefined
 * @private
 */
function dim_createVirtualNullAtom(){
    // <Debug>
    /*jshint expr:true */
    (this.owner === this) || def.assert("Can only create atoms on an owner dimension.");
    // </Debug>
    
    if(!this._virtualNullAtom){
        var label = "" + (this.type._formatter ? this.type._formatter.call(null, null, null) : "");
        
        this._virtualNullAtom = new pvc.data.Atom(this, null, label, null, '');

        this.data._atomsBase[this.name] = this._virtualNullAtom; 
    }
    
    return this._virtualNullAtom;
}

/**
 * Uninternalizes the specified atom from the dimension (internal).
 * 
 * @name pvc.data.Dimension#_unintern
 * @function
 * @param {pvc.data.Atom} The atom to uninternalize.
 * @type undefined
 * @private
 * @internal
 */
function dim_unintern(atom){
    // <Debug>
    /*jshint expr:true */
    (this.owner === this) || def.assert("Can only unintern atoms on an owner dimension.");
    (atom && atom.dimension === this) || def.assert("Not an interned atom");
    // </Debug>
    
    if(atom === this._virtualNullAtom){
        return;
    }
    
    // Remove the atom
    var key = atom.key;
    if(this._atomsByKey[key] === atom){
        def.array.remove(this._atoms, atom, this._atomComparer);
        delete this._atomsByKey[key];
        
        if(!key){
            delete this._nullAtom;
            this.data._atomsBase[this.name] = this._virtualNullAtom;
        }
    }
    
    dim_clearVisiblesCache.call(this);
}

/**
 * Clears all caches affected by datum/atom visibility.
 * 
 * @name pvc.data.Dimension#_clearVisiblesCache
 * @function
 * @type undefined
 * @private
 * @internal
 */
function dim_clearVisiblesCache(){
    this._atomVisibleDatumsCount =
    this._sumCache =
    this._visibleAtoms = 
    this._visibleIndexes = null;
}

/**
 * Called by a dimension's data when its datums have changed.
 * 
 * @name pvc.data.Dimension#_onDatumsChanged
 * @function
 * @type undefined
 * @private
 * @internal
 */
function dim_onDatumsChanged(){
    dim_clearVisiblesCache.call(this);
}

/**
 * Adds a child dimension.
 * 
 * @name pvc.data.Dimension#_addChild
 * @function
 * @param {pvc.data.Dimension} child The child to add.
 * @type undefined
 * @private
 */
function dim_addChild(child){
    /*global data_addColChild:true */
    data_addColChild(this, '_children', child, 'parent');
    
    child.owner = this.owner;
}

/**
 * Removes a child dimension.
 *
 * @name pvc.data.Dimension#_removeChild
 * @function
 * @param {pvc.data.Dimension} child The child to remove.
 * @type undefined
 * @private
 */
function dim_removeChild(child){
    /*global data_removeColChild:true */
    data_removeColChild(this, '_children', child, 'parent');
}

/**
 * Adds a link child dimension.
 * 
 * @name pvc.data.Dimension#_addLinkChild
 * @function
 * @param {pvc.data.Dimension} child The link child to add.
 * @type undefined
 * @private
 */
function dim_addLinkChild(linkChild){
    data_addColChild(this, '_linkChildren', linkChild, 'linkParent');
    
    linkChild.owner = this.owner;
}

/**
 * Removes a link child dimension.
 *
 * @name pvc.data.Dimension#_removeLinkChild
 * @function
 * @param {pvc.data.Dimension} linkChild The child to remove.
 * @type undefined
 * @private
 */
function dim_removeLinkChild(linkChild){
    data_removeColChild(this, '_linkChildren', linkChild, 'linkParent');
}

/**
 * Called by the data of this dimension when 
 * the visible state of a datum has changed. 
 * 
 * @name pvc.data.Dimension#_onDatumVisibleChanged
 * @function
 * @type undefined
 * @private
 * @internal
 */
function dim_onDatumVisibleChanged(datum, visible) {
    var map;
    if(!this._disposed && (map = this._atomVisibleDatumsCount)) {
        var atom = datum.atoms[this.name],
            key = atom.key;
        
        // <Debug>
        /*jshint expr:true */
        def.hasOwn(this._atomsByKey, key) || def.assert("Atom must exist in this dimension.");
        // </Debug>
        
        var count = map[key];
        
        // <Debug>
        (visible || (count > 0)) || def.assert("Must have had accounted for at least one visible datum."); 
        // </Debug>
        
        map[key] = (count || 0) + (visible ? 1 : -1);
        
        // clear dependent caches
        this._visibleAtoms =
        this._sumCache = 
        this._visibleIndexes = null;
    }
}

/**
 * Obtains the map of visible datums count per atom, 
 * creating the map if necessary.
 * 
 * @name pvc.data.Dimension#_getVisibleDatumsCountMap
 * @function
 * @type undefined
 * @private
 */
function dim_getVisibleDatumsCountMap() {
    var map = this._atomVisibleDatumsCount;
    if(!map) {
        map = {};
        
        this.data.datums(null, {visible: true}).each(function(datum){
            var atom = datum.atoms[this.name],
                key  = atom.key;
            map[key] = (map[key] || 0) + 1;
        }, this);
        
        this._atomVisibleDatumsCount = map;
    }
    
    return map;
}

/**
 * Calculates the list of indexes of visible or invisible atoms.
 * <p>
 * Does not include the null atom.
 * </p>
 * 
 * @name pvc.data.Dimension#_calcVisibleIndexes
 * @function
 * @param {boolean} visible The desired atom visible state.
 * @type number[]
 * @private
 */
function dim_calcVisibleIndexes(visible){
    var indexes = [];
    
    this._atoms.forEach(function(atom, index){
        if(this.isVisible(atom) === visible) {
            indexes.push(index);
        }
    }, this);
    
    return indexes;
}

/**
 * Calculates the list of visible or invisible atoms.
 * <p>
 * Does not include the null atom.
 * </p>
 * 
 * @name pvc.data.Dimension#_calcVisibleAtoms
 * @function
 * @param {boolean} visible The desired atom visible state.
 * @type number[]
 * @private
 */
function dim_calcVisibleAtoms(visible){
    return def.query(this._atoms)
            .where(function(atom){ return this.isVisible(atom) === visible; }, this)
            .array();
}
/**
 * Initializes a data instance.
 * 
 * @name pvc.data.Data
 * 
 * @class A data represents a set of datums of the same complex type {@link #type}.
 * <p>
 * A data <i>may</i> have a set of atoms that are shared by all of its datums. 
 * In that case, the {@link #atoms} property holds those atoms.
 * </p>
 * <p>
 * A data has one dimension per dimension type of the complex type {@link #type}.
 * Each holds information about the atoms of it's type in this data.
 * Dimensions are obtained by calling {@link #dimensions}.
 * </p>
 * <p>
 * A data may have child data instances.
 * </p>
 * 
 * @extends pvc.data.Complex
 * 
 * @borrows pv.Dom.Node#visitBefore as #visitBefore
 * @borrows pv.Dom.Node#visitAfter as #visitAfter
 * 
 * @borrows pv.Dom.Node#nodes as #nodes
 * @borrows pv.Dom.Node#firstChild as #firstChild
 * @borrows pv.Dom.Node#lastChild as #lastChild
 * @borrows pv.Dom.Node#previousSibling as #previousSibling
 * @borrows pv.Dom.Node#nextSibling as #nextSibling
 * 
 * @property {pvc.data.ComplexType} type The type of the datums of this data.
 * 
 * @property {pvc.data.Data} root The root data. 
 * The {@link #root} of a root data is itself.
 * 
 * @property {pvc.data.Data} parent The parent data. 
 * A root data has a no parent.
 * 
 * @property {pvc.data.Data} linkParent The link parent data.
 * 
 * @property {Number} depth The depth of the data relative to its root data.
 * @property {string} label The composite label of the (common) atoms in the data.
 * 
 * @property {string} absLabel The absolute label of the data; 
 * a composition of all labels up to the root data.
 * 
 * @property {number} absKey
 *           The absolute semantic identifier;
 *           a composition of all keys up to the root data.
 * 
 * @constructor
 * @param {object} [keyArgs] Keyword arguments
 * 
 * @param {pvc.data.Data}    [keyArgs.parent]     The parent data.
 * @param {pvc.data.Data}    [keyArgs.linkParent] The link parent data.
 * @param {pvc.data.Atom[]}  [keyArgs.atoms]      The atoms shared by contained datums.
 * @param {pvc.data.Datum[]} [keyArgs.datums]     The contained datums.
 * @param {pvc.data.Data}    [keyArgs.owner]      The owner data.
 * The topmost root data is its own owner.
 * An intermediate root data must specify its owner data.
 * 
 * @param {pvc.data.ComplexType} [keyArgs.type] The complex type.
 * Required when no parent or owner are specified.
 */
def.type('pvc.data.Data', pvc.data.Complex)
.init(function(keyArgs){
    this._dimensions = {};
    this._visibleDatums = new def.Map();
    
    var owner,
        atoms,
        atomsBase,
        parent = this.parent = def.get(keyArgs, 'parent') || null;
    if(parent){
        // Not a root
        this.root    = parent.root;
        this.depth   = parent.depth + 1;
        this.type    = parent.type;
        this._datums = def.get(keyArgs, 'datums') || def.fail.argumentRequired('datums');
        
        owner = parent.owner;
        atoms = def.get(keyArgs, 'atoms') || def.fail.argumentRequired('atoms');
        atomsBase = parent.atoms;
    } else {
        // Root (topmost or not)
        this.root = this;
        // depth = 0
        
        var linkParent = def.get(keyArgs, 'linkParent') || null;
        if(linkParent){
            // A root that is not topmost - owned, linked
            owner = linkParent.owner;
            //atoms = pv.values(linkParent.atoms); // is atomsBase, below
            
            this.type    = owner.type;
            this._datums = def.get(keyArgs, 'datums') || linkParent._datums.slice();
            this._leafs  = [];
            
            /* 
             * Inherit link parent atoms.
             */
            atomsBase = linkParent.atoms;
            //atoms = null
            
            /*global data_addLinkChild:true */
            data_addLinkChild.call(linkParent, this);
        } else {
            // Topmost root - an owner
            owner = this;
            //atoms = null
            atomsBase = {};

            this.type = def.get(keyArgs, 'type') || def.fail.argumentRequired('type');
            
            // Only owner datas cache selected datums
            this._selectedDatums = new def.Map();
        }
    }
    
    /*global data_syncDatumsState:true */
    data_syncDatumsState.call(this);
    
    // Must anticipate setting this (and not wait for the base constructor)
    // because otherwise new Dimension( ... ) fails.
    this.owner = owner;
    
    /* Need this because of null interning/uninterning and atoms chaining */
    this._atomsBase = atomsBase;
    
    this.type.dimensionsList().forEach(function(dimType){
        var name = dimType.name,
            dimension = new pvc.data.Dimension(this, dimType);
        
        this._dimensions[name] = dimension;
    }, this);
    
    // Call base constructors
    this.base(owner, atoms, atomsBase);
    
    pv.Dom.Node.call(this, /* nodeValue */null); // TODO: remove this when possible
    
    delete this.nodeValue;
    
    this._children = this.childNodes; // pv.Dom.Node#childNodes
    
    // Build label and child key
    this.absLabel = this.label = this.buildLabel(atoms);

    // The absolute key is relative to the root data (not the owner)
    this.absKey = this.key;
    if(parent){
        /*global data_addChild:true */
        data_addChild.call(parent, this);
        
        if(parent.absLabel){
            /*global complex_labelSep:true */
            this.absLabel = def.string.join(complex_labelSep, parent.absLabel, this.label);
        }
        
        if(parent.absKey){
            this.absKey = def.string.join(",", parent.absKey, this.key);
        }
    }
})

// Mix pv.Dom.Node.prototype
.add(pv.Dom.Node)

.add(/** @lends pvc.data.Data# */{
    parent:       null,
    linkParent:   null,
    
    /**
     * The dimension instances of this data.
     * @type pvc.data.Dimension[]
     */
    _dimensions: null, 
    
    /**
     * The names of unbound dimensions.
     * @type string[]
     */
    _freeDimensionNames: null,
    
    /**
     * The child data instances of this data.
     * @type pvc.data.Data[]
     * @internal
     */
    _children: null,
    
    /**
     * The link child data instances of this data.
     * @type pvc.data.Data[]
     * @internal
     */
    _linkChildren: null,
    
    /**
     * The leaf data instances of this data.
     * 
     * @type pvc.data.Data[] 
     * @internal
     */
    _leafs: null,
    
    /** 
     * The map of child datas by their key.
     * 
     * @type string
     * @internal
     */
    _childrenByKey: null,
    
    /** 
     * The name of the dimension that children have as child key.
     * 
     * @type string
     * @internal
     */
    _childrenKeyDimName: null,
    
    /**
     * A map of visible datums indexed by id.
     * @type def.Map
     */
    _visibleDatums: null,
    
    /**
     * A map of selected datums indexed by id.
     * @type def.Map
     */
    _selectedDatums: null, 
    
    /**
     * Cache of link child data by grouping operation key.
     * @type object
     * @internal
     */
    _groupByCache: null,

    /**
     * An object with cached results of the {@link #dimensionsSumAbs} method.
     *
     * @type object
     */
    _sumAbsCache: null,

    /**
     * The height of the tree of datas headed by a root data.
     * Only defined in root datas. 
     */
    treeHeight: null,
    
    /** 
     * The datums of this data.
     * @type pvc.data.Datum[]
     * @internal
     */
    _datums: null,
    
    /** 
     * A map of the datums of this data indexed by id.
     * @type object
     * @internal
     */
    _datumsById: null, 
    
    depth:    0,
    label:    "",
    absLabel: "",
    
    /** 
     * Indicates if the object has been disposed.
     * 
     * @type boolean 
     */
    _disposed: false,
    
    /**
     * Indicates the data was a parent group in the flattening group operation.
     * 
     * @type boolean
     */
    _isFlattenGroup: false,

    /**
     * Obtains a dimension given its name.
     * 
     * <p>
     * If no name is specified,
     * a map with all dimensions indexed by name is returned.
     * Do <b>NOT</b> modify this map.
     * </p>
     * 
     * <p>
     * There is one dimension instance per 
     * dimension type of the data's complex type.
     * </p>
     * <p>
     * If this is not a root data,
     * the dimensions will be child dimensions of
     * the corresponding parent data's dimensions.
     * </p>
     * <p>
     * If this is a root data,
     * the dimensions will 
     * have no parent dimension, but instead, an owner dimension.
     * </p>
     * 
     * @param {string} [name] The dimension name.
     * @param {object} [keyArgs] Keyword arguments.
     * @param {string} [keyArgs.assertExists=true} Indicates that a missing child should be signaled as an error.
     * 
     * @type pvc.data.Dimension
     */
    dimensions: function(name, keyArgs){
        if(name == null) {
            return this._dimensions;
        }
        
        var dim = def.getOwn(this._dimensions, name);
        if(!dim && def.get(keyArgs, 'assertExists', true)) {
            throw def.error.argumentInvalid('name', "Undefined dimension '{0}'.", [name]); 
         }
         
         return dim;
    },
    
    /**
     * Obtains an array of the names of dimensions that are not bound in {@link #atoms}.
     * @type string[]
     */
    freeDimensionNames: function(){
        if(!this._freeDimensionNames) {
            var free = this._freeDimensionNames = [];
            def.eachOwn(this._dimensions, function(dim, dimName){
                var atom = this.atoms[dimName];
                if(!(atom instanceof pvc.data.Atom) || atom.value == null){
                    free.push(dimName);
                }
            }, this);
        }
        return this._freeDimensionNames;
    },
    
    /**
     * Indicates if the data is an owner.
     * 
     * @type boolean
     */
    isOwner: function(){
        return this.owner === this;
    },
    
    /**
     * Obtains an enumerable of the child data instances of this data.
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * @param {string} [keyArgs.key=null} The key of the desired child.
     * @param {string} [keyArgs.assertExists=true} Indicates that a missing child should be signaled as an error.
     * 
     * @type pvc.data.Data | def.Query
     */
    children: function(keyArgs){
        if(!this._children) {
            return def.query();
        }
        
        var key = def.get(keyArgs, 'key');
        if(key != null) {
            var child = def.getOwn(this._childrenByKey, key);
            if(!child && def.get(keyArgs, 'assertExists', true)) {
               throw def.error.argumentInvalid("Undefined child data with key '{0}'.", [key]); 
            }
            
            return child;
        }
        
        return def.query(this._children);
    },

    /**
     * Obtains the number of children.
     *
     * @type number
     */
    childCount: function(){
        return this._children ? this._children.length : 0;
    },

    /**
     * Obtains an enumerable of the leaf data instances of this data.
     * 
     * @type def.Query 
     */
    leafs: function(){
        return def.query(this._leafs);
    },

    /**
     * Disposes the child datas, the link child datas and the dimensions.
     */
    dispose: function(){
        if(!this._disposed){
            data_disposeChildLists.call(this);
            
            def.eachOwn(this._dimensions, function(dimension){ dimension.dispose(); });
            
            //  myself
            
            if(this.parent){
                this.parent.removeChild(this);
                this.parent = null;
            }
            
            if(this.linkParent) {
                /*global data_removeLinkChild:true */
                data_removeLinkChild.call(this.linkParent, this);
            }
            
            this._disposed = true;
        }
    }
});



/**
 * Disposes the child datas and the link child datas.
 * 
 * @name pvc.data.Data#_disposeChildLists
 * @function
 * @type undefined
 * @private
 */
function data_disposeChildLists() {
    /*global data_disposeChildList:true */
    data_disposeChildList(this._children,     'parent');
    data_disposeChildList(this._linkChildren, 'linkParent');
    
    this._childrenByKey = null;
    this._groupByCache  = null;
    
    if(this._selectedDatums) {
        this._selectedDatums.clear();
    }
}

/**
 * Called to assert that this is an owner data.
 *  
 * @private
 */
function data_assertIsOwner(){
    /*jshint expr:true */
    this.isOwner() || def.fail("Can only be called on the owner data.");
}
pvc.data.Data.add(/** @lends pvc.data.Data# */{
    /**
     * Loads or reloads the data with the specified enumerable of atoms.
     * 
     * <p>
     * Can only be called on an owner data. 
     * Child datas are instead "loaded" on construction, 
     * with a subset of its parent's datums.
     * </p>
     * 
     * <p>
     * This method was designed to be fed with the output
     * of {@link pvc.data.TranslationOper#execute}.
     * </p>
     * 
     * @param {def.Query} atomz An enumerable of {@link pvc.data.Atom[]}.
     * @param {object} [keyArgs] Keyword arguments.
     * @param {function} [keyArgs.isNull] Predicate that indicates if a datum is considered null.
     * @param {function} [keyArgs.where] Filter function that approves or excludes each newly read new datum.
     */
    load: function(atomz, keyArgs){
        /*global data_assertIsOwner:true */
        data_assertIsOwner.call(this);
        
        // TODO: Not guarding against re-entry during load
        var whereFun = def.get(keyArgs, 'where');
        var isNullFun = def.get(keyArgs, 'isNull');
        var isReload = !!this._datums;
        if(isReload) {
            // Dispose child and link child datas, and their dimensions...
            /*global data_disposeChildLists:true */
            data_disposeChildLists.call(this);
            
            this._datums = data_reloadDatums.call(this, atomz, whereFun, isNullFun);
            
        } else {
            this._datums = data_loadDatums.call(this, atomz, whereFun, isNullFun);
        }
        
        /*global data_syncDatumsState:true */
        data_syncDatumsState.call(this);
        
        // Allow dimensions to clear their caches
        if(isReload) {
            def.eachOwn(this._dimensions, function(dimension){
                /*global dim_onDatumsChanged:true */
                dim_onDatumsChanged.call(dimension);
            });
        }
        
        this._leafs = this._datums; // Share (only on owner)
    }
});

/**
 * Loads the specified enumerable of atoms.
 * 
 * @name pvc.data.Data#_loadDatums
 * @function
 * @param {def.Query} atomz An enumerable of {@link pvc.data.Atom[]}.
 * @param {function} [whereFun] Filter function that approves or excludes each newly read datum.
 * @param {function} [isNull] Predicate that indicates if a datum is considered null.
 * @returns {pvc.data.Datum[]} The loaded datums.
 * @private
 */
function data_loadDatums(atomz, whereFun, isNullFun) {
    
    // Atom garbage collection
    var dimNames = this.type.dimensionsNames(),
        visitedAtomsKeySetByDimension = pv.dict(dimNames, function(){ return {}; }),
        needGC = false;
    
    function createDatum(atoms){
        var datum = new pvc.data.Datum(this, atoms);
        if(isNullFun && isNullFun(datum)){
            datum.isNull = true;
        }
        
        if(whereFun && !whereFun(datum)){
            needGC = true;
            return null;
        }
        
        // Mark Really Used Atoms (includes null atoms)
        def.each(datum.atoms, function(atom){
            if(atom){
                var dim = atom.dimension;
                if(dim._virtualNullAtom === atom){
                    /* This is a signal of a dimension for which there was 
                     * no configured reader, so nulls weren't read.
                     * We will register the real null, 
                     * and the virtual null atom will not show up again,
                     * because it appears through the prototype chain
                     * as a default value.
                     */
                    dim.intern(null);
                }
                
                visitedAtomsKeySetByDimension[atom.dimension.name][atom.key] = true;
            }
        });
        
        return datum;
    }
    
    var datums = def.query(atomz)
          .select(createDatum, this)
          .where(def.notNully)
          .distinct(function(datum){ return datum.key; })
          .array();
    
    if(needGC){
        // Unintern unused atoms
        def.eachOwn(this._dimensions, function(dimension){
            var visitedAtomsKeySet = visitedAtomsKeySetByDimension[dimension.name];
            
            var uninternAtoms = dimension.atoms().filter(function(atom){
                    return !def.hasOwn(visitedAtomsKeySet, atom.key);
                });
            
            uninternAtoms.forEach(function(atom){
                /*global dim_unintern:true */
                dim_unintern.call(dimension, atom);
            });
        });
    }
    
    return datums;
}

/**
 * Loads the specified enumerable of atoms
 * joining them with existing loaded datums.
 * 
 * Datums that already exist are preserved
 * while those that are not added again are removed. 
 * 
 * @name pvc.data.Data#_reloadDatums
 * @function
 * @param {def.Query} atomz An enumerable of {@link pvc.data.Atom[]}.
 * @param {function} [whereFun] Filter function that approves or excludes each newly read new datum.
 * @param {function} [isNull] Predicate that indicates if a datum is considered null.
 * @returns {pvc.data.Datum[]} The loaded datums.
 * @private
 */
function data_reloadDatums(atomz, whereFun, isNullFun) {
    
    // Index existing datums by (semantic) key
    var datumsByKey = def.query(this._datums)
                         .uniqueIndex(function(datum){ return datum.key; });
        
    // Atom garbage collection
    var dimNames = this.type.dimensionsNames();
    
    // [atom.dimension.name][atom.key] -> true
    var visitedAtomsKeySetByDimension = pv.dict(dimNames, function(){ return {}; });
    
    function internDatum(atoms){
        var newDatum = new pvc.data.Datum(this, atoms);
        if(isNullFun && isNullFun(datum)){
            datum.isNull = true;
        }
        
        if(whereFun && !whereFun(newDatum)) {
            return null;
        }
        
        // Mark Really Used Atoms (includes null atoms)
        def.each(newDatum.atoms, function(atom){
            if(atom){
                var dim = atom.dimension;
                if(dim._virtualNullAtom === atom){
                    /* This is a signal of a dimension for which there was 
                     * no configured reader, so nulls weren't read.
                     * We will register the real null, 
                     * and the virtual null atom will not show up again,
                     * because it appears through the prototype chain
                     * as a default value.
                     */
                    dim.intern(null);
                }
                
                visitedAtomsKeySetByDimension[atom.dimension.name][atom.key] = true;
            }
        });
        
        
        /* Use already existing same-key datum, if any */
        var datum = datumsByKey[newDatum.key];
        if(!datum) {
            datumsByKey[newDatum.key] = datum = newDatum;
        }
        
        return datum;
    }
    
    var datums = def.query(atomz)
                    .select(internDatum, this)
                    .where(def.notNully)
                    .array();
    
    // Unintern unused atoms
    def.eachOwn(this._dimensions, function(dimension){
        var visitedAtomsKeySet = visitedAtomsKeySetByDimension[dimension.name];
        
        var uninternAtoms = dimension.atoms().filter(function(atom){
                return !def.hasOwn(visitedAtomsKeySet, atom.key);
            });
        
        uninternAtoms.forEach(function(atom){
            dim_unintern.call(dimension, atom);
        });
    });
    
    return datums;
}

/**
 * Adds a child data.
 * 
 * @name pvc.data.Data#_addChild
 * @function
 * @param {pvc.data.Data} child The child data to add.
 * @type undefined
 * @private
 */
function data_addChild(child){
    // this   -> ((pv.Dom.Node#)child).parentNode
    // child  -> ((pv.Dom.Node#)this).childNodes
    // ...
    this.appendChild(child);
    
    (this._childrenByKey || (this._childrenByKey = {}))[child.key] = child;
}

/**
 * Adds a link child data.
 * 
 * @name pvc.data.Data#_addLinkChild
 * @function
 * @param {pvc.data.Data} child The link child data to add.
 * @type undefined
 * @private
 */
function data_addLinkChild(linkChild){
    /*global data_addColChild:true */
    data_addColChild(this, '_linkChildren', linkChild, 'linkParent');
}

/**
 * Removes a link child data.
 *
 * @name pvc.data.Data#_removeLinkChild
 * @function
 * @param {pvc.data.Data} child The link child data to remove.
 * @type undefined
 * @private
 */
function data_removeLinkChild(linkChild){
    /*global data_removeColChild:true */
    data_removeColChild(this, '_linkChildren', linkChild, 'linkParent');
}
pvc.data.Data.add(/** @lends pvc.data.Data# */{
    /**
     * Obtains the number of selected datums.
     * <p>
     * This method is only optimized when called on an owner data.
     * </p>
     * 
     * @type Number
     */
    selectedCount: function(){
        if(!this.isOwner()){
            return this.datums(null, {selected: true}).count();
        }
        
        return this._selectedDatums.count;
    },
    
    /**
     * Obtains the selected datums, in an unspecified order.
     * <p>
     * If the datums should be sorted, 
     * they can be sorted by their {@link pvc.data.Datum#id}.
     * 
     * Alternatively, {@link #datums} can be called,
     * with the <tt>selected</tt> keyword argument.
     * </p>
     * @type pvc.data.Datum[]
     */
    selectedDatums: function(){
        if(!this.isOwner()){
            return this.datums(null, {selected: true}).array();
        }
        
        return this._selectedDatums.values();
    },
    
    /**
     * Obtains the number of visible datums.
     * 
     * @type Number
     */
    visibleCount: function(){
        return this._visibleDatums.count;
    },

    /**
     * Clears the selected state of any selected datum.
     * <p>
     * Can only be called on an owner data.
     * </p>
     * 
     * @returns {boolean} Returns <tt>true</tt> if any datum was selected and <tt>false</tt> otherwise. 
     */
    clearSelected: function(){
        /*global data_assertIsOwner:true */
        data_assertIsOwner.call(this);
        if(!this._selectedDatums.count) {
            return false;
        }
        
        this._selectedDatums.values().forEach(function(datum){
            /*global datum_deselect:true */
            datum_deselect.call(datum);
        });

        this._selectedDatums.clear();
        return true;
    }
});

/**
 * Called by a datum on its owner data 
 * when its selected state changes.
 * 
 * @name pvc.data.Data#_onDatumSelectedChanged
 * @function
 * @param {pvc.data.Datum} datum The datum whose selected state changed.
 * @param {boolean} selected The new datum selected state.
 * @type undefined
 * @internal
 */
function data_onDatumSelectedChanged(datum, selected){
    // <Debug>
    /*jshint expr:true */
    !datum.isNull || def.assert("Null datums do not notify selected changes");
    // </Debug>
    
    if(selected){
        this._selectedDatums.set(datum.id, datum);
    } else {
        this._selectedDatums.rem(datum.id);
    }

    this._sumAbsCache = null;
}

/**
 * Called by a datum on its owner data 
 * when its visible state changes.
 * 
 * @name pvc.data.Data#_onDatumVisibleChanged
 * @function
 * @param {pvc.data.Datum} datum The datum whose visible state changed.
 * @param {boolean} selected The new datum visible state.
 * @type undefined
 * @internal
 */
function data_onDatumVisibleChanged(datum, visible){
    if(def.hasOwn(this._datumsById, datum.id)) {
        
        // <Debug>
        /*jshint expr:true */
        !datum.isNull || def.assert("Null datums do not notify visible changes");
        // </Debug>
        
        if(visible){
            this._visibleDatums.set(datum.id, datum);
        } else {
            this._visibleDatums.rem(datum.id);
        }
        
        this._sumAbsCache = null;

        // Notify dimensions
        def.eachOwn(this._dimensions, function(dimension){
            /*global dim_onDatumVisibleChanged:true */
            dim_onDatumVisibleChanged.call(dimension, datum, visible);
        });
        
        // Notify child and link child datas
        this._children.forEach(function(data){
            data_onDatumVisibleChanged.call(data, datum, visible);
        });
        
        if(this._linkChildren) {
            this._linkChildren.forEach(function(data){
                data_onDatumVisibleChanged.call(data, datum, visible);
            });
        }
    }
}

/**
 * Called after loading or reloading datums to 
 * calculate selected, visible datums and index them by id.
 * 
 * @name pvc.data.Data#_syncDatumsState
 * @function
 * @type undefined
 * @private
 * @internal
 */
function data_syncDatumsState(){
    if(this._selectedDatums) { this._selectedDatums.clear(); }
    this._visibleDatums.clear();
    this._datumsById = {};
    this._sumAbsCache = null;
    
    if(this._datums) {
        this._datums.forEach(data_onReceiveDatum, this);
    }
}

/**
 * Called to add a datum to the data.
 * The datum is only added if it is not present yet.
 * 
 * Used when synchonizing datum state, after a load,
 * or by the group operation.
 *
 * @name pvc.data.Data#_addDatum
 * @function
 * @param {pvc.data.Datum} datum The datum to add.
 * @type undefined
 * @private
 * @internal
 */
function data_addDatum(datum){
    if(!def.hasOwn(this._datumsById, datum.id)){
        this._datums.push(datum);
        data_onReceiveDatum.call(this, datum);
    }
}

/**
 * Accounts for an datum that has been added to the datums list.
 * Used when synchonizing datum state, after a load,
 * and by the group operation.
 *
 * @name pvc.data.Data#_onReceiveDatum
 * @function
 * @param {pvc.data.Datum} datum The datum to add.
 * @type undefined
 * @private
 * @internal
 */
function data_onReceiveDatum(datum){
    var id = datum.id;
    this._datumsById[id] = datum;
    
    if(!datum.isNull){
        if(this._selectedDatums && datum.isSelected) {
            this._selectedDatums.set(id, datum);
        }
    
        if(datum.isVisible) {
            this._visibleDatums.set(id, datum);
        }
    }
}

/**
 * Sets the selected state of the given datums
 * to the state 'select'.
 * 
 * @param {def.Query} datums An enumerable of {@link pvc.data.Datum} to set.
 * @param {boolean} selected The desired selected state.
 * 
 * @returns {boolean} true if at least one datum changed its selected state.
 * @static
 */
pvc.data.Data.setSelected = function(datums, selected){
    var anyChanged = false;

    if(datums){
        def.query(datums).each(function(datum){
            if(datum.setSelected(selected)){
                // data_onDatumSelectedChanged has already been called
                anyChanged = true;
            }
        });
    }

    return anyChanged;
};

/**
 * Pseudo-toggles the selected state of the given datums.
 * If all are selected, clears their selected state.
 * Otherwise, selects all.
 * 
 * @param {def.Query} datums An enumerable of {@link pvc.data.Datum} to toggle.
 * 
 * @returns {boolean} true if at least one datum changed its selected state.
 * @static
 */
pvc.data.Data.toggleSelected = function(datums){
    if(!def.array.isLike(datums)){
        datums = def.query(datums).array();
    }
    
    // Ensure null datums don't affect the result
    var allSelected = def.query(datums).all(function(datum){ return datum.isNull || datum.isSelected; });
    return this.setSelected(datums, !allSelected);
};

/**
 * Sets the visible state of the given datums
 * to the state 'visible'.
 * 
 * @param {def.Query} datums An enumerable of {@link pvc.data.Datum} to set.
 * @param {boolean} visible The desired visible state.
 * 
 * @returns {boolean} true if at least one datum changed its visible state.
 * @static
 */
pvc.data.Data.setVisible = function(datums, visible){
    var anyChanged = false;

    if(datums){
        def.query(datums).each(function(datum){
            if(datum.setVisible(visible)){
                // data_onDatumVisibleChanged has already been called
                anyChanged = true;
            }
        });
    }

    return anyChanged;
};

/**
 * Pseudo-toggles the visible state of the given datums.
 * If all are visible, hides them.
 * Otherwise, shows them all.
 * 
 * @param {def.Query} datums An enumerable of {@link pvc.data.Datum} to toggle.
 * 
 * @returns {boolean} true if at least one datum changed its visible state.
 * @static
 */
pvc.data.Data.toggleVisible = function(datums){
    if(!def.array.isLike(datums)){
        datums = def.query(datums).array();
    }
    
    // Ensure null datums don't affect the result (null datums are always visible)
    var allVisible = def.query(datums).all(function(datum){ return datum.isVisible; });
    return pvc.data.Data.setVisible(datums, !allVisible);
};

/**
 * Initializes a grouping specification.
 * 
 * <p>
 * A grouping specification contains information similar to that of an SQL 'order by' clause.
 * </p>
 * 
 * <p>
 * A grouping specification supports the grouping operation.
 * </p>
 * 
 * @see pvc.data.GroupingOper
 * 
 * @name pvc.data.GroupingSpec
 * 
 * @class Contains information about a grouping operation.
 * 
 * @property {string} id A <i>semantic</i> identifier of this grouping specification.
 * @property {boolean} isSingleDimension Indicates that there is only one level and dimension.
 * @property {boolean} isSingleLevel Indicates that there is only one level.
 * @property {boolean} hasCompositeLevels Indicates that there is at least one level with more than one dimension.
 * @property {pvc.data.ComplexType} type The complex type against which dimension names were resolved.
 * @property {pvc.data.GroupingLevelSpec} levels An array of level specifications.
 * @property {pvc.data.DimensionType} firstDimension The first dimension type, if any.
 * @property {string} flatteningMode Indicates if the grouping is
 * flattened using pre or post order depth-first search.
 * Possible values are <tt>null</tt>, <tt>'tree-pre'</tt> and <tt>'tree-post'</tt>.
 * @property {string} flattenRootLabel The label of the root node of a flattening operation.
 *
 * @constructor
 * @param {def.Query} levelSpecs An enumerable of {@link pvc.data.GroupingLevelSpec}.
 * @param {pvc.data.ComplexType} [type] A complex type.
 * @param {object} [keyArgs] Keyword arguments.
 * @param {string} [keyArgs.flatteningMode=null] The flattening mode.
 * @param {string} [keyArgs.flattenRootLabel=''] The label of the root node of a flattening operation.
 */
def.type('pvc.data.GroupingSpec')
.init(function(levelSpecs, type, keyArgs){
    this.type = type || null;
    
    var ids = [];
    
    this.hasCompositeLevels = false;
    
    this.levels = def.query(levelSpecs || undefined) // -> null query
        .where(function(levelSpec){ return levelSpec.dimensions.length > 0; })
        .select(function(levelSpec){
            ids.push(levelSpec.id);
            
            if(!this.hasCompositeLevels && levelSpec.dimensions.length > 1) {
                this.hasCompositeLevels = true;
            }
            
            return levelSpec;
        }, this)
        .array();

    // The null grouping has zero levels
    this.depth             = this.levels.length;
    this.isSingleLevel     = this.depth === 1;
    this.isSingleDimension = this.isSingleLevel && !this.hasCompositeLevels;
    this.firstDimension    = this.depth > 0 ? this.levels[0].dimensions[0] : null;
    
    this.flatteningMode   = def.get(keyArgs, 'flatteningMode'  ) || null;
    this.flattenRootLabel = def.get(keyArgs, 'flattenRootLabel') || '';
    
    this.id = (this.flatteningMode || '') + "##" +
              this.flattenRootLabel + "##" +
              ids.join('||');
})
.add(/** @lends pvc.data.GroupingSpec# */{
    /**
     * Late binds a grouping specification to a complex type.
     * @param {pvc.data.ComplexType} type A complex type.
     */
    bind: function(type){
        this.type = type || def.fail.argumentRequired('type');
        this.dimensions().each(function(dimSpec){
            dimSpec.bind(type);
        });
    },

    /**
     * Obtains an enumerable of the contained dimension specifications.
     * @type def.Query
     */
    dimensions: function(){
        return def.query(this.levels)
                  .selectMany(function(level){ return level.dimensions; });
    },

    dimensionNames: function(){
        if(!this._dimNames){
            this._dimNames = this.dimensions()
                                 .select(function(dimSpec){ return dimSpec.name; })
                                 .array();
        }
        
        return this._dimNames;
    },
    
    view: function(complex){
        return complex.view(this.dimensionNames());
    },

    /**
     * Indicates if the data resulting from the grouping is discrete or continuous.
     * @type boolean
     */
    isDiscrete: function(){
        return !this.isSingleDimension || this.firstDimension.type.isDiscrete;
    },

    /**
     * Indicates if the grouping has no levels.
     * @type boolean
     */
    isNull: function(){
        return !this.levels.length;
    },

    /**
     * Obtains a version of this grouping specification
     * that conforms to the specified arguments.
     *
     * @param {string} [keyArgs.flatteningMode] The desired flatening mode.
     * Supports the value 'singleLevel' as a way to signify the same as
     * what the method {@link #singleLevelGrouping} does.
     *
     * @param {boolean} [keyArgs.reverse=false] Indicates that each dimension's order should be reversed.
     * @type pvc.data.GroupingSpec
     */
    ensure: function(keyArgs){
        var grouping = this,
            flatteningMode = def.get(keyArgs, 'flatteningMode');

        if(flatteningMode){
            if(flatteningMode === 'singleLevel'){
                // Supports reverse
                return grouping.singleLevelGrouping(keyArgs);
            }

            var flattenRootLabel = def.get(keyArgs, 'flattenRootLabel') || '';
            if(this.flatteningMode !== flatteningMode || (this.flattenRootLabel !== flattenRootLabel)){
                grouping = new pvc.data.GroupingSpec(grouping.levels, grouping.type, {
                    flatteningMode:   flatteningMode,
                    flattenRootLabel: flattenRootLabel
                });
            }
        }

        if (def.get(keyArgs, 'reverse', false)){
            grouping = grouping.reversed();
        }

        return grouping;
    },

    /**
     * Obtains a single-level version of this grouping specification.
     * 
     * <p>
     * If this grouping specification is itself single-level, 
     * then it is returned.
     * </p> 
     * 
     * @param {object} [keyArgs] Keyword arguments
     * @param {boolean} [keyArgs.reverse=false] Indicates that each dimension's order should be reversed.
     * @type pvc.data.GroupingSpec 
     */
    singleLevelGrouping: function(keyArgs){
        var reverse = !!def.get(keyArgs, 'reverse', false);
        if(this.isSingleLevel && !reverse) {
            return this;
        }
        
        /*jshint expr:true */
        this._singleLevelGrouping || (this._singleLevelGrouping = {});
        
        var singleLevel = this._singleLevelGrouping[reverse];
        if(!singleLevel) {
            var dimSpecs = this.dimensions()
                            .select(function(dimSpec){
                                return reverse ? 
                                    new pvc.data.GroupingDimensionSpec(dimSpec.name, !dimSpec.reverse, dimSpec.type.complexType) :
                                    dimSpec;
                            });
                            
            var levelSpec = new pvc.data.GroupingLevelSpec(dimSpecs);
            
            singleLevel = new pvc.data.GroupingSpec([levelSpec], this.type, {flatteningMode: this.flatteningMode});
            
            this._singleLevelGrouping[reverse] = singleLevel;
        }
        
        return singleLevel;
    },
    
    /**
     * Obtains a reversed version of this grouping specification.
     * 
     * @type pvc.data.GroupingSpec 
     */
    reversed: function(){
        var reverseGrouping = this._reverseGrouping;
        if(!reverseGrouping) {
            
            var levelSpecs = def.query(this.levels)
                    .select(function(levelSpec){
                        var dimSpecs = def.query(levelSpec.dimensions)
                                .select(function(dimSpec){
                                    return new pvc.data.GroupingDimensionSpec(dimSpec.name, !dimSpec.reverse, dimSpec.type.complexType);
                                });
                        
                        return new pvc.data.GroupingLevelSpec(dimSpecs);
                    });

            reverseGrouping = new pvc.data.GroupingSpec(levelSpecs, this.type, {flatteningMode: this.flatteningMode});
            
            this._reverseGrouping = reverseGrouping;
        }
        
        return reverseGrouping;
    },

    toString: function(){
        return def.query(this.levels)
                .select(function(level){ return '' + level; })
                .array()
                .join(', ');
    }
});

def.type('pvc.data.GroupingLevelSpec')
.init(function(dimSpecs){
    var ids = [];
    
    this.dimensions = def.query(dimSpecs)
       .select(function(dimSpec){
           ids.push(dimSpec.id);
           return dimSpec;
       })
       .array();
    
    this.id = ids.join(',');
    this.depth = this.dimensions.length;
    
    var me = this;
    this.comparer = function(a, b){ return me.compare(a, b); };
})
.add( /** @lends pvc.data.GroupingLevelSpec */{
    compare: function(a, b){
        for(var i = 0, D = this.depth ; i < D ; i++) {  
            var result = this.dimensions[i].compareDatums(a, b);
            if(result !== 0) {
                return result;
            }
        }
        
        return 0;
    },
    
    key: function(datum){
        var keys  = [],
            atoms = [];
        
        for(var i = 0, D = this.depth  ; i < D ; i++) {
            var dimName = this.dimensions[i].name,
                atom = datum.atoms[dimName];
            atoms.push(atom);
            keys.push(atom.globalKey());
        }
        
        return {
            key:   keys.join(','),
            atoms: atoms
        };
    },

    toString: function(){
        return def.query(this.dimensions)
                .select(function(dimSpec){ return '' + dimSpec; })
                .array()
                .join('|');
    }
});

def.type('pvc.data.GroupingDimensionSpec')
.init(function(name, reverse, type){
    this.name     = name;
    this.reverse  = !!reverse;
    this.id = this.name + ":" + (this.reverse ? '0' : '1');
    if(type){
        this.bind(type);
    }
})
.add( /** @lends pvc.data.GroupingDimensionSpec */ {
    type: null,
    comparer: null,

    /**
     * Late binds a dimension specification to a complex type.
     * @param {pvc.data.ComplexType} type A complex type.
     */
    bind: function(type){
        /*jshint expr:true */
        type || def.fail.argumentRequired('type');
        
        this.type     = type.dimensions(this.name);
        this.comparer = this.type.atomComparer(this.reverse);
    },

    compareDatums: function(a, b){
        //if(this.type.isComparable) {
            var result  = this.comparer(a.atoms[this.name], b.atoms[this.name]);
            if(result !== 0) {
                return result;
            }
            return 0;
        //}
        
        // Use datum source order
        //return this.reverse ? (b.id - a.id) : (a.id - b.id);
    },

    toString: function(){
        return this.name + (this.reverse ? ' desc' : '');
    }
});

/**
 * Parses a grouping specification string.
 * 
 * @param {string|string[]} [specText] The grouping specification text,
 * or array of grouping specification level text.
 * When unspecified, a null grouping is returned.
 * 
 * <p>
 * An example:
 * </p>
 * <pre>
 * "series1 asc, series2 desc, category"
 * </pre>
 * <p>
 * The following will group all the 'series' in one level and the 'category' in another: 
 * </p>
 * <pre>
 * "series1 asc|series2 desc, category"
 * </pre>
 * 
 * @param {pvc.data.ComplexType} [type] A complex type against which to resolve dimension names.
 * 
 * @type pvc.data.GroupingSpec
 */
pvc.data.GroupingSpec.parse = function(specText, type){
    if(!specText){
        return new pvc.data.GroupingSpec(null, type);
    }
    
    var levels;
    if(def.array.is(specText)) {
        levels = specText;
    } else if(def.string.is(specText)) {
        levels = specText.split(/\s*,\s*/); 
    }

    var levelSpecs = def.query(levels)
               .select(function(levelText){
                   var dimSpecs = groupSpec_parseGroupingLevel(levelText, type);
                   return new pvc.data.GroupingLevelSpec(dimSpecs);
               });
    
    return new pvc.data.GroupingSpec(levelSpecs, type);
};

/**
 * Creates a combined grouping specification.
 *
 * <p>
 * TODO:
 * If all the specified grouping specifications have the same flattening mode
 * then each of the specified is destructured into a single grouping level.
 *
 * Otherwise, a composite grouping specification is returned.
 * </p>
 * 
 * @param {pvc.data.GroupingSpec[]} groupings An enumerable of grouping specifications.
 * @param {object} [keyArgs] Keyword arguments
 * @param {boolean} [keyArgs.reverse=false] Indicates that each dimension's order should be reversed.
 * 
 * @type pvc.data.GroupingSpec
 
pvc.data.GroupingSpec.multiple = function(groupings, keyArgs){
    var reverse = !!def.get(keyArgs, 'reverse', false);
    var type = null;
    
    // One level per specified grouping
    var levelSpecs = def.query(groupings)
           .select(function(grouping){
               var dimSpecs = grouping.dimensions().select(function(dimSpec){
                       var asc = (dimSpec.reverse === reverse);
                       if(!type) {
                           type = dimSpec.type.complexType;
                       } else if(type !== dimSpec.type.complexType) {
                           throw def.error.operationInvalid("Multiple groupings must have the same complex type.");
                       }
                       
                       return new pvc.data.GroupingDimensionSpec(dimSpec.name, !asc, dimSpec.type.complexType);
                   });
               
               return new pvc.data.GroupingLevelSpec(dimSpecs);
           })
           .array();
    
    return type ? new pvc.data.GroupingSpec(levelSpecs, type) : null;
};
*/

var groupSpec_matchDimSpec = /^\s*(.+?)(?:\s+(asc|desc))?\s*$/i;

/**
 * @private
 * @static
 */
function groupSpec_parseGroupingLevel(groupLevelText, type) {
    /*jshint expr:true */
    def.string.is(groupLevelText) || def.fail.argumentInvalid('groupLevelText', "Invalid grouping specification.");
    
    return def.query(groupLevelText.split(/\s*\|\s*/))
       .where(def.truthy)
       .select(function(dimSpecText){
            var match   = groupSpec_matchDimSpec.exec(dimSpecText) ||
                            def.fail.argumentInvalid('groupLevelText', "Invalid grouping level syntax '{0}'.", [dimSpecText]),
                name    = match[1],
                order   = (match[2] || '').toLowerCase(),
                reverse = order === 'desc';
               
            var dimSpec = new pvc.data.GroupingDimensionSpec(name, reverse, type);
            return dimSpec;
        });
}
/**
 * Initializes a data operation.
 * 
 * @name pvc.data.DataOper
 * 
 * @class The base abstract class for a data operation.
 * Performs an initial query on the datums of the opertion's link parent
 * and hands the final implementation to a derived class.
 * 
 * @property {string} key Set on construction with a value that identifies the operation.
 * 
 * @constructor
 *
 * @param {pvc.data.Data} linkParent The link parent data.
 * @param {object} [keyArgs] Keyword arguments.
 */
def.type('pvc.data.DataOper')
.init(function(linkParent, keyArgs){
    this._linkParent = linkParent;
}).
add(/** @lends pvc.data.DataOper */{
    
    key: null,

    /**
     * Performs the data operation.
     * 
     * @returns {pvc.data.Data} The resulting root data.
     */
    execute: def.method({isAbstract: true})
});

/**
 * Initializes a grouping operation.
 * 
 * @name pvc.data.GroupingOper
 * 
 * @class Performs one grouping operation according to a grouping specification.
 * @extends pvc.data.DataOper
 * 
 * @constructor
 *
 * @param {pvc.data.Data} linkParent The link parent data.
 * 
 * @param {string|string[]|pvc.data.GroupingSpec|pvc.data.GroupingSpec[]} groupingSpecs A grouping specification as a string, an object or array of either.
 * 
 * @param {object} [keyArgs] Keyword arguments.
 * See {@link pvc.data.DataOper} for any additional arguments.
 * @param {boolean} [keyArgs.visible=null]
 *      Only considers datums that have the specified visible state.
 * @param {boolean} [keyArgs.selected=null]
 *      Only considers datums that have the specified selected state.
 * @param {function} [keyArgs.where] A datum predicate.
 * @param {string} [keyArgs.whereKey] A key for the specified datum predicate,
 * previously returned by this function.
 * <p>
 * If this argument is specified it can be used to cache results.
 * If it is not specified, and <tt>keyArgs</tt> is specified,
 * one is returned.
 * If it is not specified and <tt>keyArgs</tt> is not specified,
 * then the instance will have a null {@link #key} property value.
 * </p>
 * <p>
 * If it a key not returned by this operation is specified,
 * then it should be prefixed by a "_" character,
 * in order to not colide with keys generated internally.
 * </p>
 */
def.type('pvc.data.GroupingOper', pvc.data.DataOper)
.init(function(linkParent, groupingSpecs, keyArgs){
    /* Grouping spec may be specified as text or object */
    /*jshint expr:true */
    groupingSpecs || def.fail.argumentRequired('groupingSpecs');

    this.base(linkParent, keyArgs);

    this._where      = def.get(keyArgs, 'where');
    this._visible    = def.get(keyArgs, 'visible',  null);
    this._selected   = def.get(keyArgs, 'selected', null);

    /* 'Where' predicate and its key */
    var hasKey = this._selected == null, // Selected state changes does not yet invalidate cache...
        whereKey = '';
    if(this._where){
        whereKey = def.get(keyArgs, 'whereKey');
        if(!whereKey){
            if(!keyArgs){
                // Force no key
                hasKey = false;
            } else {
                whereKey = '' + def.nextId('dataOperWhereKey');
                keyArgs.whereKey = whereKey;
            }
        }
    }

    // grouping spec ids is semantic keys, although the name is not 'key'
    var ids = [];
    this._groupSpecs = def.array.as(groupingSpecs).map(function(groupSpec){
        if(groupSpec instanceof pvc.data.GroupingSpec) {
            if(groupSpec.type !== linkParent.type) {
                throw def.error.argumentInvalid('groupingSpecText', "Invalid associated complex type.");
            }
        } else {
            // Must be a non-empty string, or throws
            groupSpec = pvc.data.GroupingSpec.parse(groupSpec, linkParent.type);
        }
        
        ids.push(groupSpec.id);

        return groupSpec;
    });

    /* Operation key */
    if(hasKey){
        this.key = ids.join('!!') +
                   "||visible:"  + this._visible +
                   //"||selected:" + this._selected +
                   "||where:"    + whereKey;
    }
}).
add(/** @lends pvc.data.GroupingOper */{

    /**
     * Performs the grouping operation.
     *
     * @returns {pvc.data.Data} The resulting root data.
     */
    execute: function(){
        /* Setup a priori datum filters */
        
        /*global data_whereState: true */
        var datumsQuery = data_whereState(def.query(this._linkParent._datums), {
            visible:  this._visible,
            selected: this._selected,
            where:    this._where
        });
        
                /* Group datums */
        var rootNode = this._group(datumsQuery);

        /* Render node into a data */
        return this._generateData(rootNode, this._linkParent);
    },

    _group: function(datumsQuery){

        // Create the root node
        var root = {
            isRoot:     true,
            treeHeight: def.query(this._groupSpecs)
                           .select(function(spec){
                               var levelCount = spec.levels.length;
                               if(!levelCount) { return 0; }
                               return !!spec.flatteningMode ? 1 : levelCount;
                           })
                           .reduce(def.add, 0),
            datums:   []
            // children
            // atoms       // not on root
            // childrenKeyDimName // not on leafs
            // isFlattenGroup // on parents of a flattened group spec
        };

        if(root.treeHeight > 0){
            this._groupSpecRecursive(root, datumsQuery, 0);
        }
        
        return root;
    },

    _groupSpecRecursive: function(specParent, specDatums, specIndex){
        var groupSpec  = this._groupSpecs[specIndex],
            levelSpecs = groupSpec.levels,
            D = levelSpecs.length,
            nextSpecIndex = specIndex + 1,
            isLastSpec  = !(nextSpecIndex < this._groupSpecs.length),
            doFlatten   = !!groupSpec.flatteningMode,
            isPostOrder = doFlatten && (groupSpec.flatteningMode === 'tree-post'),
            specGroupParent;

        // <Debug>
        /*jshint expr:true */
        D || def.fail.operationInvalid("Must have levels");
        // </Debug>
        
        if(doFlatten){
            specParent.children = [];
            specParent.childrenByKey = {}; // Don't create children with equal keys
            
            // Must create a root for the grouping operation
            // Cannot be specParent
            specGroupParent = {
                key:    '',
                atoms:  [],
                datums: [],
                label:  groupSpec.flattenRootLabel
            };

            if(!isPostOrder){
                specParent.children.push(specGroupParent);
                specParent.childrenByKey[''] = specGroupParent;
            }
        } else {
            specGroupParent = specParent;
        }

        /* Group datums */
        groupLevelRecursive.call(this, specGroupParent, specDatums, 0);

        if(doFlatten){

            if(isPostOrder){
                specParent.children.push(specGroupParent);
            }

            // Add datums of specGroupParent to specParent.
            specParent.datums = specGroupParent.datums;
        }
            
        function groupLevelRecursive(groupParent, datums, specDepth){
            var levelSpec = levelSpecs[specDepth],

                groupChildren = [],
                
                // The first datum of each group is inserted here in order,
                // according to level's comparer
                firstDatums = [],

                // The first group info is inserted here at the same index
                // as the first datum.
                // At the end, one child data is created per groupInfo,
                // in the same order.
                groupInfos  = [],

                // group key -> datums, in given datums argument order
                datumsByKey = {};

            if(!doFlatten){
                groupParent.children = [];

                // TODO: Really ugly....
                // This is to support single-dimension grouping specifications used
                // internally by the "where" operation. See #data_whereDatumFilter
                groupParent.childrenKeyDimName = levelSpec.dimensions[0].name;
            }
            
            // Group, and possibly filter, received datums on level's key
            def.query(datums).each(function(datum){
                var groupInfo = levelSpec.key(datum);
                if(groupInfo != null){ // null means skip the datum
                    /* Datum passes to children, but may still be filtered downstream */
                    var key = groupInfo.key,
                        keyDatums = datumsByKey[key];

                    if(keyDatums){
                        keyDatums.push(datum);
                    } else {
                        // First datum with key -> new group
                        keyDatums = datumsByKey[key] = [datum];

                        groupInfo.datums = keyDatums;

                        var datumIndex = def.array.insert(firstDatums, datum, levelSpec.comparer);
                        def.array.insertAt(groupInfos, ~datumIndex, groupInfo);
                    }
                }
            }, this);

            // Create 1 child node per created groupInfo, in same order as these.
            // Further group each child node, on next grouping level, recursively.
            var isLastSpecLevel = specDepth === D - 1;
                
            groupInfos.forEach(function(groupInfo){
                var child = Object.create(groupInfo);
                /*
                 * On all but the last level,
                 * datums are only added to *child* at the end of the
                 * following recursive call,
                 * to the "union" of the datums of its own children.
                 */
                child.datums = isLastSpec && isLastSpecLevel ? groupInfo.datums : [];

                var key;
                if(!doFlatten){
                    groupParent.children.push(child);
                } else {
                    // Atoms must contain those of the groupParent
                    child.atoms = groupParent.atoms.concat(child.atoms);

                    /* A key that does not include null atoms */
                    key = def.query(child.atoms)
                             .where (function(atom){ return atom.value != null; })
                             .select(function(atom){ return atom.globalKey();   })
                             .array()
                             .join(',')
                             ;

                    if(def.hasOwn(specParent.childrenByKey, key)){
                        // Duplicate key
                        // We need datums added to parent anyway
                        groupChildren.push({datums: groupInfo.datums});
                        return;
                    }

                    if(!isPostOrder){
                        specParent.children.push(child);
                        specParent.childrenByKey[key] = child;

                        groupParent.isFlattenGroup = true;
                    }
                }
                
                if(!isLastSpecLevel){
                    groupLevelRecursive.call(this, child, groupInfo.datums, specDepth + 1);
                } else if(!isLastSpec) {
                    this._groupSpecRecursive(child, groupInfo.datums, nextSpecIndex);
                }

                // Datums already added to 'child'.

                groupChildren.push(child);

                if(doFlatten && isPostOrder){
                    specParent.children.push(child);
                    specParent.childrenByKey[key] = child;

                    groupParent.isFlattenGroup = true;
                }
            }, this);

            var willRecurseParent = doFlatten && !isLastSpec;

            datums = willRecurseParent ? [] : groupParent.datums;

            // Add datums of chidren to groupParent.
            // This accounts for possibly excluded datums,
            // in any of the below levels (due to null atoms).
            // TODO: This method changes the order of preserved datums to
            //       follow the grouping "pattern". Is this OK?
            groupChildren.forEach(function(child){
                def.array.append(datums, child.datums);
            });
            
            if(willRecurseParent) {
                /* datums can no longer change */
                this._groupSpecRecursive(groupParent, datums, nextSpecIndex);
            }
            
            return groupChildren;
        }
    },

    _generateData: function(node, parentData){
        var data;
        if(node.isRoot){
            // Root node
            // Create a *linked* root data
            data = new pvc.data.Data({
                linkParent: parentData,
                datums:     node.datums
            });
            
            data.treeHeight = node.treeHeight;
        } else {
            data = new pvc.data.Data({
                parent: parentData,
                atoms:  node.atoms,
                datums: node.datums
            });
        }

        if(node.isFlattenGroup){
            data._isFlattenGroup = true;
            var label = node.label;
            if(label){
                data.label    += label;
                data.absLabel += label;
            }
        }

        var childNodes = node.children;
        if(childNodes && childNodes.length){
            // TODO: ...
            data._childrenKeyDimName = node.childrenKeyDimName;
            
            childNodes.forEach(function(childNode){
                this._generateData(childNode, data);
            }, this);

        } else if(!node.isRoot){
            // A leaf node
            var leafs = data.root._leafs;
            data.leafIndex = leafs.length;
            leafs.push(data);
        }
        
        return data;
    }
});
pvc.data.Data.add(/** @lends pvc.data.Data# */{
    /**
     * Obtains the number of contained datums.
     * @type number
     */
    count: function(){
        return this._datums.length;
    },
    
    /**
     * Groups the datums of this data, possibly filtered,
     * according to a grouping specification.
     * 
     * <p>
     * The result of the grouping operation over a set of datums
     * is a new <i>linked child</i> data.
     * 
     * It is a root data, 
     * but shares the same {@link #owner} and {@link #atoms} with this,
     * and has the considered datums in {@link #datums}.
     * 
     * The data will contain one child data per distinct atom,
     * of the first grouping level dimension, 
     * found in the datums.
     * Each child data will contain the datums sharing that atom.
     * 
     * This logic extends to all following grouping levels.
     * </p>
     * 
     * <p>
     * Datums with null atoms on a grouping level dimension are excluded.
     * </p>
     * 
     * @param {string|string[]|pvc.data.GroupingOperSpec} groupingSpecText A grouping specification string or object.
     * <pre>
     * "series1 asc, series2 desc, category"
     * </pre>
     * 
     * @param {Object} [keyArgs] Keyword arguments object.
     * See additional keyword arguments in {@link pvc.data.GroupingOper}
     * 
     * @param {boolean} [keyArgs.visible=null]
     *      Only considers datums whose atoms of the grouping dimensions 
     *      have the specified visible state.
     *
     * @see #where
     * @see pvc.data.GroupingLevelSpec
     *
     * @returns {pvc.data.Data} The resulting root data.
     */
    groupBy: function(groupingSpecText, keyArgs){
        var groupOper = new pvc.data.GroupingOper(this, groupingSpecText, keyArgs),
            cacheKey  = groupOper.key,
            groupByCache,
            data;

        if(cacheKey){
            groupByCache = this._groupByCache;

            // Check cache for a linked data with that key
            data = groupByCache && groupByCache[cacheKey];
        }

        if(!data) {
            data = groupOper.execute();

            if(cacheKey){
                (groupByCache || (this._groupByCache = {}))[cacheKey] = data;
            }
        }
        
        return data;
    },

    /**
     * Creates a linked data with the result of filtering
     * the datums of this data.
     *
     * <p>
     * This operation differs from {@link #datums} only in the type of output,
     * which is a new linked data, instead of an enumerable of the filtered datums.
     * See {@link #datums} for more information on the filtering operation.
     * </p>
     *
     * @param {object} [whereSpec] A "where" specification.
     * @param {object} [keyArgs] Keyword arguments object.
     * See {@link #datums} for information on available keyword arguments.
     *
     * @returns {pvc.data.Data} A linked data containing the filtered datums.
     */
    where: function(whereSpec, keyArgs){
        var datums = this.datums(whereSpec, keyArgs).array();
        return new pvc.data.Data({linkParent: this, datums: datums});
    },

    /**
     * Obtains the datums of this data, 
     * possibly filtered according 
     * to a specified "where" specification,
     * datum selected state and 
     * filtered atom visible state.
     *
     * @param {object} [whereSpec] A "where" specification.
     * A structure with the following form:
     * <pre>
     * // OR of datum filters
     * whereSpec = [datumFilter1, datumFilter2, ...] | datumFilter;
     * 
     * // AND of dimension filters
     * datumFilter = {
     *      // OR of dimension values
     *      dimName1: [value1, value2, ...],
     *      dimName2: value1,
     *      ...
     * }
     * </pre>
     * <p>Values of a datum filter can also directly be atoms.</p>
     * <p>
     *    An example of a "where" specification:
     * </p>
     * <pre>
     * whereSpec = [
     *     // Datums whose series is 'Europe' or 'Australia', 
     *     // and whose category is 2001 or 2002 
     *     {series: ['Europe', 'Australia'], category: [2001, 2002]},
     *     
     *     // Union'ed with
     *     
     *     // Datums whose series is 'America' 
     *     {series: 'America'},
     * ];
     * </pre>
     *  
     * @param {object} [keyArgs] Keyword arguments object.
     * 
     * @param {boolean} [keyArgs.visible=null]
     *      Only considers datums that have the specified visible state.
     * 
     * @param {boolean} [keyArgs.selected=null]
     *      Only considers datums that have the specified selected state.
     *
     * @param {function} [keyArgs.where] A arbitrary datum predicate.
     *
     * @param {string[]} [keyArgs.orderBySpec] An array of "order by" strings to be applied to each 
     * datum filter of <i>whereSpec</i>.
     * <p>
     * An "order by" string is the same as a grouping specification string, 
     * although it is used here with a slightly different meaning.
     * Here's an example of an "order by" string:
     * <pre>
     * "series1 asc, series2 desc, category"
     * </pre
     * </p>
     * 
     * <p>
     * When not specified, altogether or individually, 
     * these are determined to match the corresponding datum filter of <i>whereSpec</i>.
     * </p>
     * 
     * <p>
     * If a string is specified it is treated as the "order by" string corresponding 
     * to the first datum filter.
     * </p>
     * 
     * @returns {def.Query} A query object that enumerates the desired {@link pvc.data.Datum}.
     */
    datums: function(whereSpec, keyArgs){
        if(!whereSpec){
            return data_whereState(def.query(this._datums), keyArgs);
        }
        
        whereSpec = data_processWhereSpec.call(this, whereSpec, keyArgs);
        
        return data_where.call(this, whereSpec, keyArgs);
    },
    
    /**
     * Obtains the first datum that 
     * satisfies a specified "where" specification.
     * <p>
     * If no datum satisfies the filter, null is returned.
     * </p>
     * 
     * @param {object} whereSpec A "where" specification.
     * See {@link #datums} to know about this structure.
     * 
     * @param {object} [keyArgs] Keyword arguments object.
     * See {@link #datums} for additional available keyword arguments.
     * 
     * @param {boolean} [keyArgs.createNull=false] Indicates if a 
     * null datum should be returned when no datum is satisfied the specified filter.
     * <p>
     * The assumption is that the "where" specification
     * contains one datum filter, and in turn,
     * that it specifies <b>all</b> the dimensions of this data's complex type.  
     * </p>
     * <p>
     * The first specified datum filter is used as a source to the datums' atoms.
     * Also, it is the first atom of each dimension filter that is used.
     * </p>
     * 
     * @returns {pvc.data.Datum} 
     * The first datum that satisfies the specified filter, 
     * a null datum, if <i>keyArgs.createNull</i> is truthy, 
     * or <i>null</i>.
     * 
     * @see pvc.data.Data#datums 
     */
    datum: function(whereSpec, keyArgs){
        /*jshint expr:true */
        whereSpec || def.fail.argumentRequired('whereSpec');
        
        whereSpec = data_processWhereSpec.call(this, whereSpec, keyArgs);
        
        var datum = data_where.call(this, whereSpec, keyArgs).first() || null;
        if(!datum && def.get(keyArgs, 'createNull') && whereSpec.length) {
            
            /* Create Null Datum */
            var sourceDatumFilter = whereSpec[0],
                atoms = [];
            
            for(var dimName in this._dimensions){
                var dimAtoms = sourceDatumFilter[dimName];
                if(dimAtoms) {
                    atoms.push(dimAtoms[0]);
                }
            }
            
            // true => null datum
            datum = new pvc.data.Datum(this, atoms, true);
        }
        
        return datum;
    },
    
    /**
     * Obtains the first datum of this data, if any.
     * @type {pvc.data.Datum} The first datum or <i>null</i>. 
     */
    firstDatum: function(){
        return this._datums.length ? this._datums[0] : null;
    },
    
    /**
     * Sums the absolute value 
     * of the sum of a specified dimension on each child.
     *
     * @param {string} dimName The name of the dimension to sum on each child data.
     * @param {object} [keyArgs] Optional keyword arguments that are
     * passed to each dimension's {@link pvc.data.Dimension#sum} method.
     * 
     * @type number
     */
    dimensionsSumAbs: function(dimName, keyArgs){
        /*global dim_buildDatumsFilterKey:true */
        var key = dimName + ":" + dim_buildDatumsFilterKey(keyArgs),
            sum = def.getOwn(this._sumAbsCache, key);

        if(sum == null) {
            sum = this.children()
                    /* flattened parent groups would account for the same values more than once */
                    .where(function(childData){ return !childData._isFlattenGroup; })
                    .select(function(childData){
                        return Math.abs(childData.dimensions(dimName).sum(keyArgs));
                    }, this)
                    .reduce(def.add, 0);

            (this._sumAbsCache || (this._sumAbsCache = {}))[key] = sum;
        }

        return sum;
    }
});

/**
 * Processes a given "where" specification.
 * <p>
 * Normalizes and validates the specification syntax, 
 * validates dimension names,
 * readily excludes uninterned (unexistent) and duplicate values and
 * atoms based on their "visible state".
 * </p>
 * 
 * <p>
 * The returned specification contains dimensions instead of their names
 * and atoms, instead of their values. 
 * </p>
 * 
 * @name pvc.data.Data#_processWhereSpec
 * @function
 * 
 * @param {object} whereSpec A "where" specification to be normalized.
 * A structure with the following form:
 *
 * @return Array A <i>processed</i> "where" of the specification.
 * A structure with the following form:
 * <pre>
 * // OR of processed datum filters
 * whereProcSpec = [datumProcFilter1, datumProcFilter2, ...] | datumFilter;
 * 
 * // AND of processed dimension filters
 * datumProcFilter = {
 *      // OR of dimension atoms
 *      dimName1: [atom1, atom2, ...],
 *      dimName2: atom1,
 *      ...
 * }
 * </pre>
 * 
 * @private
 */
function data_processWhereSpec(whereSpec){
    var whereProcSpec = [];
    
    whereSpec = def.array.as(whereSpec);
    if(whereSpec){
        whereSpec.forEach(processDatumFilter, this);
    }
    
    return whereProcSpec;
    
    function processDatumFilter(datumFilter){
        if(datumFilter != null) {
            /*jshint expr:true */
            (typeof datumFilter === 'object') || def.fail.invalidArgument('datumFilter');
            
            /* Map: {dimName1: atoms1, dimName2: atoms2, ...} */
            var datumProcFilter = {},
                any = false;
            for(var dimName in datumFilter) {
                var atoms = processDimensionFilter.call(this, dimName, datumFilter[dimName]);
                if(atoms) {
                    any = true;
                    datumProcFilter[dimName] = atoms;
                }
            }
            
            if(any) {
                whereProcSpec.push(datumProcFilter);
            }
        }
    }
    
    function processDimensionFilter(dimName, values){
        // throws if it doesn't exist
        var dimension = this.dimensions(dimName),
            atoms = def.query(values)
                       .select(function(value){ return dimension.atom(value); }) // null if it doesn't exist
                       .where(def.notNully)
                       .distinct(function(atom){ return atom.key; })
                       .array();
        
        return atoms.length ? atoms : null;
    }
}

/**
 * Filters a datum query according to a specified predicate, 
 * datum selected and visible state.
 * 
 * @name pvc.data.Data#_whereState
 * @function
 * 
 * @param {def.query} q A datum query.
 * @param {object} [keyArgs] Keyword arguments object.
 * See {@link #groupBy} for additional available keyword arguments.
 * 
 * @returns {def.Query} A query object that enumerates the desired {@link pvc.data.Datum}.
 * @private
 * @static
 */
function data_whereState(q, keyArgs){
    var selected = def.get(keyArgs, 'selected'),
        visible  = def.get(keyArgs, 'visible'),
        where    = def.get(keyArgs, 'where')
        ;

    if(visible != null){
        q = q.where(function(datum){ return datum.isVisible === visible; });
    }
    
    if(selected != null){
        q = q.where(function(datum){ return datum.isSelected === selected; });
    }
    
    if(where){
        q = q.where(where);
    }
    
    return q;
}

// All the "Filter" and "Spec" words below should be read as if they were prepended by "Proc"
/**
 * Obtains the datums of this data filtered according to 
 * a specified "where" specification,
 * and optionally, 
 * datum selected state and filtered atom visible state.
 * 
 * @name pvc.data.Data#_where
 * @function
 * 
 * @param {object} [whereSpec] A <i>processed</i> "where" specification.
 * @param {object} [keyArgs] Keyword arguments object.
 * See {@link #groupBy} for additional available keyword arguments.
 * 
 * @param {string[]} [keyArgs.orderBySpec] An array of "order by" strings to be applied to each 
 * datum filter of <i>whereSpec</i>.
 * 
 * @returns {def.Query} A query object that enumerates the desired {@link pvc.data.Datum}.
 * @private
 */
function data_where(whereSpec, keyArgs) {
    
    var orderBys = def.array.as(def.get(keyArgs, 'orderBy')),
        datumKeyArgs = def.create(keyArgs || {}, {
            orderBy: null
        });
    
    var query = def.query(whereSpec)
                   .selectMany(function(datumFilter, index){
                      if(orderBys) {
                          datumKeyArgs.orderBy = orderBys[index];
                      }
                      
                      return data_whereDatumFilter.call(this, datumFilter, datumKeyArgs);
                   }, this);
    
    return query.distinct(function(datum){ return datum.id; });
    
    /*
    // NOTE: this is the brute force / unguided algorithm - no indexes are used
    function whereDatumFilter(datumFilter, index){
        // datumFilter = {dimName1: [atom1, OR atom2, OR ...], AND ...}
        
        return def.query(this._datums).where(datumPredicate, this);
        
        function datumPredicate(datum){
            if((selected === null || datum.isSelected === selected) && 
               (visible  === null || datum.isVisible  === visible)) {
                var atoms = datum.atoms;
                for(var dimName in datumFilter) {
                    if(datumFilter[dimName].indexOf(atoms[dimName]) >= 0) {
                        return true;
                    }
                }   
            }
        }
    }
    */    
}

/**
 * Obtains an enumerable of the datums satisfying <i>datumFilter</i>,
 * by constructing and traversing indexes.
 * 
 * @name pvc.data.Data#_whereDatumFilter
 * @function
 * 
 * @param {string} datumFilter A <i>processed</i> datum filter.
 * 
 * @param {Object} keyArgs Keyword arguments object.
 * See {@link #groupBy} for additional available keyword arguments.
 * 
 * @param {string} [keyArgs.orderBy] An "order by" string.
 * When not specified, one is determined to match the specified datum filter.
 * The "order by" string cannot contain multi-dimension levels (dimension names separated with "|").
 * 
 * @returns {def.Query} A query object that enumerates the desired {@link pvc.data.Datum}.
 * 
 * @private
 */
function data_whereDatumFilter(datumFilter, keyArgs) {
     var groupingSpecText = keyArgs.orderBy; // keyArgs is required
     if(!groupingSpecText) {
         // Choose the most convenient one.
         // A sort on dimension names can yield good cache reuse.
         groupingSpecText = Object.keys(datumFilter).sort().join(',');
     } else {
         if(groupingSpecText.indexOf("|") >= 0) {
             throw def.error.argumentInvalid('keyArgs.orderBy', "Multi-dimension order by is not supported.");
         }
         
         // TODO: not validating that groupingSpecText actually contains the same dimensions referred in datumFilter...
     }
     
     /*
        // NOTE:
        // All the code below is just a stack/state-based translation of 
        // the following recursive code (so that it can be used lazily with a def.query):
        
        recursive(rootData, 0);
        
        function recursive(parentData, h) {
            if(h >= H) {
                // Leaf
                parentData._datums.forEach(fun, ctx);
                return;
            }
            
            var dimName = parentData._childrenKeyDimName;
            datumFilter[dimName].forEach(function(atom){
                var childData = parentData._childrenByKey[atom.key];
                if(childData) {
                    recursive(childData, h + 1);
                }
            }, this);
        }
     */
     
     var rootData = this.groupBy(groupingSpecText, keyArgs),
     H = rootData.treeHeight;
     
     var stateStack = [];
     
     // Ad-hoq query
     return def.query(function(/* nextIndex */){
         // Advance to next datum
         var state;

         // No current data means starting
         if(!this._data) {
             this._data = rootData;
             this._dimAtomsOrQuery = def.query(datumFilter[rootData._childrenKeyDimName]);
             
         // Are there still any datums of the current data to enumerate?
         } else if(this._datumsQuery) { 
             
             // <Debug>
             /*jshint expr:true */
             this._data || def.assert("Must have a current data");
             stateStack.length || def.assert("Must have a parent data"); // cause the root node is "dummy"
             !this._dimAtomsOrQuery || def.assert();
             // </Debug>
             
             if(this._datumsQuery.next()){
                 this.item = this._datumsQuery.item; 
                 return 1; // has next
             }
             
             // No more datums here
             // Advance to next leaf data node
             this._datumsQuery = null;
             
             // Pop parent data
             state = stateStack.pop();
             this._data = state.data;
             this._dimAtomsOrQuery = state.dimAtomsOrQuery;
         } 
         
         // <Debug>
         this._dimAtomsOrQuery || def.assert("Invalid programmer");
         this._data || def.assert("Must have a current data");
         // </Debug>
         
         // Are there still any OrAtom paths of the current data to traverse? 
         var depth = stateStack.length;
             
         // Any more atom paths to traverse, from the current data?
         do{
             while(this._dimAtomsOrQuery.next()) {
                 
                 var dimAtomOr = this._dimAtomsOrQuery.item,
                     childData = this._data._childrenByKey[dimAtomOr.globalKey()];
                 
                 // Also, advance the test of a leaf child data with no datums, to avoid backtracking
                 if(childData && (depth < H - 1 || childData._datums.length)) {
                     
                     stateStack.push({data: this._data, dimAtomsOrQuery: this._dimAtomsOrQuery});
                     
                     this._data = childData;
                     
                     if(depth < H - 1) {
                         // Keep going up, until a leaf datum is found. Then we stop.
                         this._dimAtomsOrQuery = def.query(datumFilter[childData._childrenKeyDimName]);
                         depth++;
                     } else {
                         // Leaf data!
                         // Set first datum and leave
                         this._dimAtomsOrQuery = null;
                         this._datumsQuery = def.query(childData._datums);
                         this._datumsQuery.next();
                         this.item = this._datumsQuery.item;
                         return 1; // has next
                     }
                 }
             } // while(atomsOrQuery)
             
             // No more OR atoms in this _data
             if(!depth){
                 return 0; // finished
             }
             
             // Pop parent data
             state = stateStack.pop();
             this._data = state.data;
             this._dimAtomsOrQuery = state.dimAtomsOrQuery;
             depth--;
         } while(true);
         
         // Never executes
         return 0; // finished
     });
}pvc.data.Data
.add(/** @lends pvc.data.Data# */{
    /**
     * Returns some information on the data points
     */
    getInfo: function(){

        var out = ["\n------------------------------------------"];
        out.push("Dataset Information");
        
        def.eachOwn(this.dimensions(), function(dimension, name){
            var count = dimension.count(),
                type = dimension.type,
                features = [];
            
            features.push(type.valueTypeName);
            if(type.isComparable){ features.push("comparable"); }
            if(!type.isDiscrete){ features.push("continuous"); }
            if(type.isHidden){ features.push("hidden"); }
            
            out.push(
                "  " + 
                name +
                " (" + features.join(', ') + ")" +
                " (" + count + ")\n\t" + 
                dimension.atoms().slice(0, 10).map(function(atom){ return atom.label; }).join(", ") + 
                (count > 10 ? "..." : ""));
        });
        
        out.push("------------------------------------------");

        return out.join("\n");
    },
    
    /**
     * Returns the values for the dataset
     * BoxPlot, DataTree, ParallelCoordinates
     * 
     * @deprecated
     */
    getValues: function(){
        /**
         * Values is the inner Vs matrix
         *  X | S1  | ... | S2  |
         * ----------------------
         * C1 | V11 | ... | VN1 |
         *  . |   .           .
         * CJ | V1J | ... | VNJ |
         */
         return pv.range(0, this.getCategoriesSize())
                  .map(function(categIndex){
                      return this._getValuesForCategoryIndex(categIndex);
                  }, this);
    },
    
    /**
     * Returns the unique values of a given dimension.
     * 
     * @deprecated
     */
    _getDimensionValues: function(name){
        return this.dimensions(name).atoms().map(function(atom){ return atom.value; });
    },

    /**
     * Returns the unique visible values of a given dimension.
     * 
     * @deprecated
     */
    _getDimensionVisibleValues: function(name){
        return this.dimensions(name).atoms({visible: true}).map(function(atom){ return atom.value; });
    },
    
    /**
     * Returns the unique series values.
     * @deprecated
     */
    getSeries: function(){
        return this._getDimensionValues('series');
    },

    /**
     * Returns an array with the indexes of the visible series values.
     * @deprecated
     */
    getVisibleSeriesIndexes: function(){
        return this.dimensions('series').indexes({visible: true});
    },
    
    /**
     * Returns an array with the indexes of the visible category values.
     * @deprecated
     */
    getVisibleCategoriesIndexes: function(){
        return this.dimensions('category').indexes({visible: true});
    },

    /**
     * Returns an array with the visible categories.
     * @deprecated
     */
    getVisibleSeries: function(){
        return this._getDimensionVisibleValues('series');
    },

    /**
     * Returns the categories on the underlying data
     * @deprecated
     */
    getCategories: function(){
        return this._getDimensionValues('category');
    },

    /**
     * Returns an array with the visible categories.
     * 
     * @deprecated
     */
    getVisibleCategories: function(){
        return this._getDimensionVisibleValues('category');
    },
    
    /**
     * Returns the values for a given category index
     * @deprecated
     */
    _getValuesForCategoryIndex: function(categIdx){
        var categAtom = this.dimensions('category').atoms()[categIdx];
        var datumsBySeriesKey = this.datums({category: categAtom})
                                    .uniqueIndex(function(datum){ return datum.atoms.series.key; });
        
        // Sorted series atoms
        return this.dimensions('series')
                   .atoms()
                   .map(function(atom){
                        var datum = def.getOwn(datumsBySeriesKey, atom.key);
                        return datum ? datum.atoms.value.value : null;
                    });
    },
    
    /**
     * Returns how many series we have
     * @deprecated
     */
    getSeriesSize: function(){
        var dim = this.dimensions('series', {assertExists: false});
        return dim ? dim.count() : 0;
    },

    /**
     * Returns how many categories, or data points, we have
     * @deprecated
     */
    getCategoriesSize: function(){
        var dim = this.dimensions('category', {assertExists: false});
        return dim ? dim.count() : 0;
    }
});
/**
 * Initializes a visual role.
 * 
 * @name pvc.visual.Role
 * 
 * @class Represents a role that is somehow played by a visualization.
 * 
 * @property {string} name The name of the role.
 *
 * @property {string} label
 * The label of this role.
 * The label <i>should</i> be unique on a visualization.
 *
 * @property {pvc.data.GroupingSpec} grouping The grouping specification currently bound to the visual role.
 * 
 * @property {boolean} isRequired Indicates that the role is required and must be satisfied.
 * 
 * @property {boolean} requireSingleDimension Indicates that the role can only be satisfied by a single dimension.
 * A {@link pvc.visual.Role} of this type must have an associated {@link pvc.data.GroupingSpec}
 * that has {@link pvc.data.GroupingSpec#isSingleDimension} equal to <tt>true</tt>.
 * 
 * @property {boolean} valueType When not nully, 
 * restricts the allowed value type of the single dimension of the 
 * associated {@link pvc.data.GroupingSpec} to this type.
 * 
 * @property {boolean|null} requireIsDiscrete
 * Indicates if 
 * only discrete, when <tt>true</tt>, 
 * continuous, when <tt>false</tt>, 
 * or any, when <tt>null</tt>,
 * groupings are accepted.
 * 
 * @property {string} defaultDimensionName The default dimension name.
 *
 * @property {boolean} autoCreateDimension Indicates if a dimension with the default name (the first level of, when a group name),
 * should be created when the role has not been read by a translator (required or not).
 *
 * @constructor
 * @param {string} name The name of the role.
 * @param {object} [keyArgs] Keyword arguments.
 * @param {string} [keyArgs.label] The label of this role.
 *
 * @param {boolean} [keyArgs.isRequired=false] Indicates a required role.
 * 
 * @param {boolean} [keyArgs.requireSingleDimension=false] Indicates that the role 
 * can only be satisfied by a single dimension. 
 * 
 * @param {boolean} [keyArgs.isMeasure=false] Indicates that <b>datums</b> that do not 
 * contain a non-null atom in any of the dimensions bound to measure roles should be readily excluded.
 * 
 * @param {boolean} [keyArgs.valueType] Restricts the allowed value type of dimensions.
 * 
 * @param {boolean|null} [keyArgs.requireIsDiscrete=null] Indicates if the grouping should be discrete, continuous or any.
 * 
 * @param {string} [keyArgs.defaultDimensionName] The default dimension name.
 * @param {boolean} [keyArgs.autoCreateDimension=false]
 * Indicates if a dimension with the default name (the first level of, when a group name),
 * should be created when the role is required and it has not been read by a translator.
 *
 * @param {string} [keyArgs.flatteningMode='singleLevel'] Indicates if the role presents
 * the leaf data nodes or all the nodes in the tree, in pre or post order.
 * Possible values are <tt>'singleLevel'</tt>, <tt>'tree-pre'</tt> and <tt>'tree-post'</tt>.
 */
def.type('pvc.visual.Role')
.init(function(name, keyArgs){
    this.name = name;
    this.label = def.get(keyArgs, 'label') || name;

    if(def.get(keyArgs, 'isRequired', false)) {
        this.isRequired = true;
    }
    
    if(def.get(keyArgs, 'autoCreateDimension', false)) {
        this.autoCreateDimension = true;
    }
    
    var defaultDimensionName = def.get(keyArgs, 'defaultDimensionName');
    if(defaultDimensionName) {
        this.defaultDimensionName = defaultDimensionName;
    }

    if(!defaultDimensionName && this.autoCreateDimension){
        throw def.error.argumentRequired('defaultDimensionName');
    }
    
    var requireSingleDimension;
    var requireIsDiscrete = def.get(keyArgs, 'requireIsDiscrete'); // isSingleDiscrete
    if(requireIsDiscrete != null) {
        if(!requireIsDiscrete) {
            requireSingleDimension = true;
        }
    }
    
    if(requireSingleDimension != null) {
        requireSingleDimension = def.get(keyArgs, 'requireSingleDimension', false);
        if(requireSingleDimension) {
            if(def.get(keyArgs, 'isMeasure', false)) {
                this.isMeasure = true;
                
                if(def.get(keyArgs, 'isPercent', false)) {
                    this.isPercent = true;
                }
            }
            
            var valueType = def.get(keyArgs, 'valueType', null);
            if(valueType !== this.valueType) {
                this.valueType = valueType;
            }
        }
    }
    
    if(requireSingleDimension !== this.requireSingleDimension) {
        this.requireSingleDimension = requireSingleDimension;
    }
    
    if(requireIsDiscrete != this.requireIsDiscrete) {
        this.requireIsDiscrete = !!requireIsDiscrete;
    }

    var flatteningMode = def.get(keyArgs, 'flatteningMode');
    if(flatteningMode && flatteningMode != this.flatteningMode) {
        this.flatteningMode = flatteningMode;
    }
})
.add(/** @lends pvc.visual.Role# */{
    isRequired: false,
    requireSingleDimension: false,
    valueType: null,
    requireIsDiscrete: null,
    isMeasure: false,
    isPercent: false,
    defaultDimensionName: null,
    grouping: null,
    flatteningMode: 'singleLevel',
    flattenRootLabel: '',
    autoCreateDimension: false,
    isReversed: false,
    label: null,

    /** 
     * Obtains the name of the first dimension type that is bound to the role.
     * @type string 
     */
    firstDimensionName: function(){
        return this.grouping && this.grouping.firstDimension.name;
    },
    
    /** 
     * Obtains the first dimension that is bound to the role.
     * @type pvc.data.Dimension
     */
    firstDimension: function(){
        return this.grouping && this.grouping.firstDimension.type;
    },
    
    setIsReversed: function(isReversed){
        if(!isReversed){ // default value
            delete this.isReversed;
        } else {
            this.isReversed = true;
        }
    },
    
    setFlatteningMode: function(flatteningMode){
        if(!flatteningMode || flatteningMode === 'singleLevel'){ // default value
            delete this.flatteningMode;
        } else {
            this.flatteningMode = flatteningMode;
        }
    },

    setFlattenRootLabel: function(flattenRootLabel){
        if(!flattenRootLabel){ // default value
            delete this.flattenRootLabel;
        } else {
            this.flattenRootLabel = flattenRootLabel;
        }
    },

    /**
     * Applies this role's grouping to the specified data
     * after ensuring the grouping is of a certain type.
     *
     * @param {pvc.data.Data} data The data on which to apply the operation.
     * @param {object} [keyArgs] Keyword arguments.
     * ...
     * 
     * @type pvc.data.Data
     */
    flatten: function(data, keyArgs){
        var grouping = this.flattenedGrouping(keyArgs);
        if(grouping){
            return data.groupBy(grouping, keyArgs);
        }
    },

    flattenedGrouping: function(keyArgs){
        var grouping = this.grouping;
        if(grouping){
            keyArgs = def.setDefaults(keyArgs,
                'flatteningMode', this.flatteningMode,
                'flattenRootLabel', this.flattenRootLabel);

            return grouping.ensure(keyArgs);
        }
    },

    select: function(data, keyArgs){
        var grouping = this.grouping;
        if(grouping){
            return data.groupBy(grouping.ensure(keyArgs), keyArgs);
        }
    },

    view: function(complex){
        var grouping = this.grouping;
        if(grouping){
            return grouping.view(complex);
        }
    },

    /**
     * Pre-binds a grouping specification to playing this role.
     * 
     * @param {pvc.data.GroupingSpec} groupingSpec The grouping specification of the visual role.
     */
    preBind: function(groupingSpec){
        this.__grouping = groupingSpec;

        return this;
    },

    isPreBound: function(){
        return !!this.__grouping;
    },

    /**
     * Finalizes a binding initiated with {@link #preBind}.
     *
     * @param {pvc.data.ComplexType} type The complex type with which
     * to bind the pre-bound grouping and then validate the
     * grouping and role binding.
     */
    postBind: function(type){
        var grouping = this.__grouping;
        if(grouping){
            delete this.__grouping;

            grouping.bind(type);

            this.bind(grouping);
        }
        
        return this;
    },

    /**
     * Binds a grouping specification to playing this role.
     * 
     * @param {pvc.data.GroupingSpec} groupingSpec The grouping specification of the visual role.
     */
    bind: function(groupingSpec){
        if(groupingSpec) {
            if(groupingSpec.isNull()){
                groupingSpec = null;
           } else {
                /* Validate grouping spec according to role */

                if(this.requireSingleDimension && !groupingSpec.isSingleDimension) {
                    throw def.error.operationInvalid(
                            "Role '{0}' only accepts a single dimension.",
                            [this.name]);
                }

                var valueType = this.valueType;
                var requireIsDiscrete = this.requireIsDiscrete;
                groupingSpec.dimensions().each(function(dimSpec){
                    var dimType = dimSpec.type;
                    if(valueType && dimType.valueType !== valueType) {
                        throw def.error.operationInvalid(
                                "Role '{0}' cannot be bound to dimension '{1}'. \nIt only accepts dimensions of type '{2}' and not of type '{3}'.",
                                [this.name, dimType.name, pvc.data.DimensionType.valueTypeName(valueType), dimType.valueTypeName]);
                    }

                    if(requireIsDiscrete != null &&
                    dimType.isDiscrete !== requireIsDiscrete) {
                        throw def.error.operationInvalid(
                                "Role '{0}' cannot be bound to dimension '{1}'. \nIt only accepts {2} dimensions.",
                                [this.name, dimType.name, requireIsDiscrete ? 'discrete' : 'continuous']);
                    }
                }, this);
            }
        }
        
        // ----------
        
        if(this.grouping) {
            // unregister from current dimension types
            this.grouping.dimensions().each(function(dimSpec){
                if(dimSpec.type){
                    /*global dimType_removeVisualRole:true */
                    dimType_removeVisualRole.call(dimSpec.type, this);
                }
            }, this);
        }
        
        this.grouping = groupingSpec;
        
        if(this.grouping) {
            
            if(this.isReversed){
                this.grouping = this.grouping.reversed();
            }
            
            // register in current dimension types
            this.grouping.dimensions().each(function(dimSpec){
                /*global dimType_addVisualRole:true */
                dimType_addVisualRole.call(dimSpec.type, this);  
            }, this);
        }

        return this;
    }
});

/**
 * Initializes a scene.
 * 
 * @name pvc.visual.Scene
 * @class Scenes guide the rendering of protovis marks;
 * they are supplied to {@link pv.Mark} <tt>data</tt> property.
 * <p>
 * A scene may feed several marks and so is not specific to a given mark 
 * (contrast with protovis' instances/scenes).
 * </p>
 * <p>
 * Scenes provide a well defined interface to pvc's 
 * extension point functions.
 * </p>
 * <p>
 * Scenes hold precomputed data, that does not change with interaction,
 * and that is thus not recalculated in every protovis render caused by interaction.
 * </p>
 * <p>
 * Scenes bridge the gap between data and visual roles. 
 * Data can be accessed by one or the other view.
 * </p>
 * 
 * @borrows pv.Dom.Node#visitBefore as #visitBefore
 * @borrows pv.Dom.Node#visitAfter as #visitAfter
 * 
 * @borrows pv.Dom.Node#nodes as #nodes
 * @borrows pv.Dom.Node#firstChild as #firstChild
 * @borrows pv.Dom.Node#lastChild as #lastChild
 * @borrows pv.Dom.Node#previousSibling as #previousSibling
 * @borrows pv.Dom.Node#nextSibling as #nextSibling
 * 
 * 
 * @property {pvc.data.Data}  group The data group that's present in the scene, or <tt>null</tt>, if none.
 * @property {pvc.data.Datum} datum The datum that's present in the scene, or <tt>null</tt>, if none.
 * @property {object} atoms The map of atoms, by dimension name, that's present in the scene, or <tt>null</tt>, if none.
 * <p>
 * When there is a group, these are its atoms, 
 * otherwise, 
 * if there is a datum, 
 * these are its atoms.
 * </p>
 * <p>
 * Do <b>NOT</b> modify this object.
 * </p>
 * 
 * @constructor
 * @param {pvc.visual.Scene} [parent=null] The parent scene.
 * @param {object} [keyArgs] Keyword arguments.
 * @property {pvc.data.Data}  [keyArgs.group=null] The data group that's present in the scene.
 * Specify only one of the arguments <tt>group</tt> or <tt>datum</tt>.
 * @property {pvc.data.Datum} [keyArgs.datum=null] The single datum that's present in the scene.
 * Specify only one of the arguments <tt>group</tt> or <tt>datum</tt>.
 */
def.type('pvc.visual.Scene')
.init(function(parent, keyArgs){
    if(pvc.debug >= 4){
        this.id = def.nextId('scene');
    }
    
    this._renderId   = 0;
    this.renderState = {};
    
    pv.Dom.Node.call(this, /* nodeValue */null);
    
    this.parent = parent || null;
    this.root   = this;
    if(parent){
        // parent -> ((pv.Dom.Node#)this).parentNode
        // this   -> ((pv.Dom.Node#)parent).childNodes
        // ...
        var index = def.get(keyArgs, 'index', null);
        parent.insertAt(this, index);
        this.root = parent.root;
    } else {
        /* root scene */
        this._active = null;
        this._panel = def.get(keyArgs, 'panel') || 
            def.fail.argumentRequired('panel', "Argument is required on root scene.");
    }
    
    /* DATA */
    var group = def.get(keyArgs, 'group', null),
        datum;
    if(group){
        datum = group._datums[0]; // null on empty datas (just try hiding all series with the legend)
    } else {
        datum = def.get(keyArgs, 'datum');
    }
    
    this.datum = datum || null;
    this.group = group;

    var source = (datum || group);
    this.atoms = source ? source.atoms : null;
    
    /* ACTS */
    this.acts = parent ? Object.create(parent.acts) : {};
})
.add(pv.Dom.Node)

.add(/** @lends pvc.visual.Scene# */{
    /**
     * Obtains an enumerable of the datums present in the scene.
     *
     * @type def.Query
     */
    datums: function(){
        return this.group ?
                    this.group.datums() :
                    (this.datum ? def.query(this.datum) : def.query());
    },

    isRoot: function(){
        return this.root === this;   
    },
    
    panel: function(){
        return this.root._panel;
    },
    
//    chart: function(){
//        return this.root._panel.chart;
//    },
//  
    /**
     * Obtains an enumerable of the child scenes.
     * 
     * @type def.Query
     */
    children: function(){
        if(!this.childNodes) {
            return def.query();
        }
        
        return def.query(this.childNodes);
    },
    
    /* INTERACTION */
    anyInteraction: function(){
        return (!!this.root._active || this.anySelected());
    },

    /* ACTIVITY */
    isActive: false,
    
    setActive: function(isActive){
        if(this.isActive !== (!!isActive)){
            rootScene_setActive.call(this.root, this.isActive ? null : this);
        }
    },
    
    clearActive: function(){
        return rootScene_setActive.call(this.root, null);
    },
    
    anyActive: function(){
        return !!this.root._active;
    },
    
    active: function(){
        return this.root._active;
    },
    
    activeSeries: function(){
        var active = this.active();
        return active && active.acts.series.value;
    },
    
    isActiveSeries: function(){
        if(this.isActive){
            return true;
        }
        
        var activeSeries;
        return (activeSeries = this.activeSeries()) != null &&
               (activeSeries === this.acts.series.value);
    },
    
    /* SELECTION */
    isSelected: function(){
        return this._selectedData().is;
    },
    
    anySelected: function(){
        return this._selectedData().any;
    },
    
    _selectedData: function(){
        return this.renderState._selectedData || 
               (this.renderState._selectedData = this._createSelectedData());
    },
    
    _createSelectedData: function(){
        var any = this.panel().chart.data.owner.selectedCount() > 0,
            isSelected = any && 
                         this.datums()
                             .any(function(datum){ return datum.isSelected; });
        
        return {
            any: any,
            is:  isSelected
        };
    }
});

/** 
 * Called on each sign's pvc.visual.Sign#buildInstance 
 * to ensure cached data per-render is cleared.
 * 
 *  @param {number} renderId The current render id.
 */
function scene_renderId(renderId){
    if(this._renderId !== renderId){
        if(pvc.debug >= 5){
            pvc.log({sceneId: this.id, oldRenderId: this._renderId, newRenderId: renderId});
        }
        
        this._renderId   = renderId;
        this.renderState = {};
    }
}

function rootScene_setActive(scene){
    if(this._active !== scene){
        if(this._active){
            scene_setActive.call(this._active, false);
        }
        
        this._active = scene || null;
        
        if(this._active){
            scene_setActive.call(this._active, true);
        }
        return true;
    }
    return false;
}

function scene_setActive(isActive){
    if(this.isActive !== (!!isActive)){
        if(!isActive){
            delete this.isActive;
        } else {
            this.isActive = true;
        }
    }
}
def.type('pvc.visual.Sign')
.init(function(panel, pvMark, keyArgs){
    this.chart  = panel.chart;
    this.panel  = panel;
    this.pvMark = pvMark;
    
    this.extensionId = def.get(keyArgs, 'extensionId');
    this.isActiveSeriesAware = !!this.chart.visualRoles('series', {assertExists: false}) &&
                               def.get(keyArgs, 'activeSeriesAware', true);
            
    /* Extend the pv mark */
    pvMark
        .localProperty('_scene', Object)
        .localProperty('group',  Object);
    
    this.lock('_scene', function(){ 
            return this.scene; 
        })
        /* TODO: remove these when possible and favor access through scene */
        .lock('group', function(){ 
            return this.scene.group; 
        })
        .lock('datum', function(){ 
            return this.scene.datum; 
        });
        
    pvMark.sign = def.fun.constant(this);
    
    /* Intercept the protovis mark's buildInstance */
    pvMark.buildInstance = this._buildInstance.bind(this, pvMark.buildInstance);
})
.postInit(function(panel, pvMark, keyArgs){
    this._addInteractive(keyArgs);
})
.add({
    _addInteractive: function(keyArgs){
        var panel   = this.panel,
            pvMark  = this.pvMark,
            options = this.chart.options;

        if(!def.get(keyArgs, 'noTooltips', false) && options.showTooltips){
            this.panel._addPropTooltip(pvMark);
        }

        if(!def.get(keyArgs, 'noHoverable', false) && options.hoverable) {
            // Add hover-active behavior
            // May still require the point behavior on some ascendant panel
            var onEvent,
                offEvent;

//            switch(pvMark.type) {
//                default:
//                case 'dot':
//                case 'line':
//                case 'area':
//                case 'rule':
//                    onEvent  = 'point';
//                    offEvent = 'unpoint';
//                   panel._requirePointEvent();
//                    break;

//                default:
                    onEvent = 'mouseover';
                    offEvent = 'mouseout';
//                    break;
//            }

            pvMark
                .event(onEvent, function(scene){
                    scene.setActive(true);

                    if(!panel.topRoot.rubberBand || panel.isAnimating()) {
                        panel._renderInteractive();
                    }
                })
                .event(offEvent, function(scene){
                    if(scene.clearActive()) {
                        /* Something was active */
                        if(!panel.topRoot.rubberBand || panel.isAnimating()) {
                            panel._renderInteractive();
                        }
                    }
                });
        }

        if(!def.get(keyArgs, 'noClick', false) && panel._shouldHandleClick()){
            panel._addPropClick(pvMark);
        }

        if(!def.get(keyArgs, 'noDoubleClick', false) && options.doubleClickAction) {
            panel._addPropDoubleClick(pvMark);
        }
    },
    
    /* SCENE MAINTENANCE */
    _buildInstance: function(baseBuildInstance, instance){
        /* Reset scene/instance state */
        this.pvInstance = instance; // pv Scene
        this.scene = instance.data;
        
        /* 
         * Update the scene's render id, 
         * which possibly invalidates per-render
         * cached data.
         */
        /*global scene_renderId:true */
        scene_renderId.call(this.scene, this.pvMark.renderId());

        /* state per: sign & scene & render */
        this.state = {};

        this._initScene();
        
        baseBuildInstance.call(this.pvMark, instance);
    },
    
    _initScene: function(){
        /* NOOP */
    },
    
    /* Extensibility */
    intercept: function(name, method){
        if(typeof method !== 'function'){
            // Assume string with name of method
            // This allows instance-overriding methods,
            //  because the method's value is lazily captured.
            method = def.methodCaller('' + method);
        }
        
        var me = this;
        this.pvMark.intercept(
                name,
                function(fun, args){
                    var prevExtFun = me._extFun, prevExtArgs = me._extArgs;
                    me._extFun = fun;
                    me._extArgs = args;
                    try {
                        return method.apply(me, args);
                    } finally{
                        me._extFun = prevExtFun;
                        me._extArgs = prevExtArgs;
                    }
                },
                this._getExtension(name));
        
        return this;
    },
    
    delegate: function(dv){
        // TODO wrapping context
        var result;
        if(this._extFun) {
            result = this._extFun.apply(this, this._extArgs);
            if(result === undefined) {
                result = dv;
            }
        } else {
            result = dv;
        }
        
        return result;
    },
    
    hasDelegate: function(){
        return !!this._extFun;
    },

    lockDimensions: function(){
        this.pvMark
            .lock('left')
            .lock('right')
            .lock('top')
            .lock('bottom')
            .lock('width')
            .lock('height');
        
        return this;
    },

    lock: function(name, method){
        if(typeof method !== 'function'){
            method = def.methodCaller('' + method, this);
        } else {
            method = method.bind(this);
        }
        
        return this.lockValue(name, method);
    },
    
    lockValue: function(name, value){
        this.pvMark.lock(name, value);
        return this;
    },
    
    optional: function(name, method){
        if(typeof method !== 'function'){
            method = def.methodCaller('' + method, this);
        } else {
            method = method.bind(this);
        }
        
        return this.optionalValue(name, method);
    },
    
    optionalValue: function(name, value){
        this.pvMark[name](value);
        return this;
    },
    
    _getExtension: function(name){
        return this.panel._getExtension(this.extensionId, name);
    },
    
    _versionedExtFun: function(prop, extPointFun, version){
        return extPointFun;
    },
    
    /* COLOR */
    color: function(type){
        var color = this.baseColor(type);
        if(color === null){
            return null;
        }

        if(this.scene.anyInteraction()) {
            color = this.interactiveColor(type, color);
        } else {
            color = this.normalColor(type, color);
        }

        return color;
    },
    
    legendColorScale: function(){
        return this._legendColorScale ||
                (this._legendColorScale = this.chart._legendColorScale(this.panel.dataPartValue));
    },
    
    baseColor: function(type){
        var color = this.delegate();
        if(color === undefined){
            color = this.defaultColor(type);
        }
        
        return color;
    },

    defaultColor: function(type){
        var colorAct = this.scene.acts[this.chart.legendSource];
        /* Legend color is a function of the chart's legendSource */
        return this.legendColorScale()(colorAct && colorAct.value);
    },

    normalColor: function(type, color){
        return color;
    },

    interactiveColor: function(type, color){
        return color;
    },

    dimColor: function(type, color){
        return pvc.toGrayScale(color);
    }
});

def.type('pvc.visual.Dot', pvc.visual.Sign)
.init(function(panel, protoMark, keyArgs){
    
    var pvMark = protoMark.add(pv.Dot);
    
    this.base(panel, pvMark, keyArgs);
    
    if(!def.get(keyArgs, 'freePosition', false)){
        var basePosProp  = panel.isOrientationVertical() ? "left" : "bottom",
            orthoPosProp = panel.anchorOrtho(basePosProp);
        
        this/* Positions */
            .lock(orthoPosProp, 'y')
            .lock(basePosProp,  'x');
    }
       
    this/* Shape & Size */
        .intercept('shape',       'shape' )
        .intercept('shapeRadius', 'radius')
        .intercept('shapeSize',   'size'  )
        
        /* Colors & Line */
        .optionalValue('strokeDasharray', null) // Break inheritance
        .optionalValue('lineWidth',       1.5)  // idem
        
        .intercept('fillStyle',   'fillColor'  )
        .intercept('strokeStyle', 'strokeColor')
        ;
})
.add({
    /* Sign Spatial Coordinate System
     *  -> Cartesian coordinates
     *  -> Grows Up, vertically, and Right, horizontally
     *  -> Independent of the chart's orientation
     *  -> X - horizontal axis
     *  -> Y - vertical axis
     *  
     *  y
     *  ^
     *  |
     *  |
     *  o-----> x
     */
    y: function(){ return 0; },
    x: function(){ return 0; },
    
    shape: function(){ 
        return this.delegate(); 
    },
    
    radius: function(){
        // Store extended value, if any
        // See #sizeCore
        this.state.radius = this.delegate();
    },
    
    /* SIZE */
    size: function(){
        var size = this.baseSize();
        if(this.scene.anyInteraction()) {
            size = this.interactiveSize(size);
        } else {
            size = this.normalSize(size);
        }
        
        return size;
    },
    
    baseSize: function(){
        /* Radius was specified? */
        var radius = this.state.radius;
        if(radius != null) {
            return radius * radius;
        }
        
        /* Delegate to possible Size extension or default to 12 */
        return this.delegate(12);
    },

    normalSize: function(size){
        return size;
    },

    interactiveSize: function(size){
        if(this.scene.isActive){
            return Math.max(size, 5) * 2.5;
        }
        
        return size;
    },
    
    /* COLOR */
    
    fillColor: function(){ 
        return this.color('fill');
    },
    
    strokeColor: function(){ 
        return this.color('stroke');
    },
    
    /**
     * @override
     */
    interactiveColor: function(type, color){
        var scene = this.scene;
        if(scene.isActive) {
            if(type === 'stroke') {
                return color.brighter(1);
            }
        } else if(scene.anySelected() && !scene.isSelected()) {
            
            if(this.isActiveSeriesAware && scene.isActiveSeries()) {
                //return color.darker(1.5);
                return pv.Color.names.darkgray.darker().darker();
            }
            
            switch(type) {
                case 'fill':
                case 'stroke':
                    return this.dimColor(type, color);
            }
        }

        return this.base(type, color);
    }
});

def.type('pvc.visual.Line', pvc.visual.Sign)
.init(function(panel, protoMark, keyArgs){
    
    var pvMark = protoMark.add(pv.Line);
    
    this.base(panel, pvMark, keyArgs);
    
    this.lockValue('segmented', true) // fixed
        .lockValue('antialias', true)
        ;

    if(!def.get(keyArgs, 'freePosition', false)){
        var basePosProp  = panel.isOrientationVertical() ? "left" : "bottom",
            orthoPosProp = panel.anchorOrtho(basePosProp);

        this/* Positions */
            .lock(orthoPosProp, 'y')
            .lock(basePosProp,  'x');
    }

    this/* Colors & Line */
        .intercept('strokeStyle', 'strokeColor')
        .intercept('lineWidth',   'strokeWidth')
        ;

    // Segmented lines use fill color instead of stroke...so this doesn't work.
    //this.pvMark.svg({ 'stroke-linecap': 'square' });
})
.add({
    _addInteractive: function(keyArgs){
        keyArgs = def.setDefaults(keyArgs, 
                        'noHoverable', true,
                        'noTooltips',  true);
        
        this.base(keyArgs);
    },

    /* Sign Spatial Coordinate System
     *  -> Cartesian coordinates
     *  -> Grows Up, vertically, and Right, horizontally
     *  -> Independent of the chart's orientation
     *  -> X - horizontal axis
     *  -> Y - vertical axis
     *
     *  y
     *  ^
     *  |
     *  |
     *  o-----> x
     */
    y: function(){ return 0; },
    x: function(){ return 0; },

    /* STROKE WIDTH */
    strokeWidth: function(){
        var strokeWidth = this.baseStrokeWidth();
        if(this.scene.anyInteraction()) {
            strokeWidth = this.interactiveStrokeWidth(strokeWidth);
        } else {
            strokeWidth = this.normalStrokeWidth(strokeWidth);
        }
        
        return strokeWidth;
    },
    
    baseStrokeWidth: function(){
        /* Delegate to possible lineWidth extension or default to 1.5 */
        return this.delegate(1.5);
    },

    normalStrokeWidth: function(strokeWidth){
        return strokeWidth;
    },

    interactiveStrokeWidth: function(strokeWidth){
        if(this.isActiveSeriesAware && this.scene.isActiveSeries()){
            /* - Ensure a normal width of at least 1,
             * - Double and a half that
             */
            return Math.max(1, strokeWidth) * 2.5;
        }

        return strokeWidth;
    },
    
    /* STROKE COLOR */
    strokeColor: function(){ 
        return this.color('stroke');
    },
    
    /**
     * @override
     */
    interactiveColor: function(type, color){
        var scene = this.scene;
        if(scene.anySelected() && !scene.isSelected()) {
            
            if(this.isActiveSeriesAware && scene.isActiveSeries()) {
                //return color.darker(1.5);
                return pv.Color.names.darkgray.darker().darker();
            }
            
            if(type === 'stroke'){
                return this.dimColor(type, color);
            }
        }

        return this.base(type, color);
    }
});

def.type('pvc.visual.Area', pvc.visual.Sign)
.init(function(panel, protoMark, keyArgs){
    
    var pvMark = protoMark.add(pv.Area);
    
    this.base(panel, pvMark, keyArgs);
    
    var antialias = def.get(keyArgs, 'antialias', true),
        segmented = def.get(keyArgs, 'segmented', true);
    
    this
        .lockValue('segmented', segmented) // fixed, not inherited
        .lockValue('antialias', antialias)
        ;

    if(!def.get(keyArgs, 'freePosition', false)){
        var basePosProp  = panel.isOrientationVertical() ? "left" : "bottom",
            orthoPosProp = panel.anchorOrtho(basePosProp),
            orthoLenProp = panel.anchorOrthoLength(orthoPosProp);
        
        /* Positions */
        this
            .lock(basePosProp,  'x')  // ex: left
            .lock(orthoPosProp, 'y')  // ex: bottom
            .lock(orthoLenProp, 'dy') // ex: height
            ;
    }
    
    /* Colors */
    // NOTE: must be registered before fixAntialiasStrokeColor
    this.intercept('fillStyle', 'fillColor');
    
    /* Using antialias causes the vertical separation
     * of *segmented* areas to be noticed.
     * When lines are also shown, not using antialias
     * is ok because the ladder border that it causes is hidden by the line.
     * 
     * So, we only use antialias if there isn't a line 
     * to cover the side effect of not using it.
     */
    if(segmented && antialias) {
        // Try to hide the vertical lines noticeable between areas,
        // due to antialias
        this
            .lock('strokeStyle', 'fixAntialiasStrokeColor')
            // NOTE: must be registered after fixAntialiasStrokeColor
            .lock('lineWidth', 'fixAntialiasStrokeWidth')
            ;
    } else {
        // These really have no real meaning in the area and should not be used.
        // If lines are desired, they should be created with showLines of LineChart
        this.lockValue('strokeStyle', null)
            .lockValue('lineWidth',   0)
            ;
    }
})
.add({
    _addInteractive: function(keyArgs){
        keyArgs = def.setDefaults(keyArgs, 
                        'noHoverable', true,
                        'noTooltips',  true);

        this.base(keyArgs);
    },

    /* Sign Spatial Coordinate System
     *  -> Cartesian coordinates
     *  -> Grows Up, vertically, and Right, horizontally
     *  -> Independent of the chart's orientation
     *  -> X - horizontal axis
     *  -> Y - vertical axis
     *  
     *  y       ^
     *  ^    dY |
     *  |       - y
     *  |
     *  o-----> x
     */
    x:  function(){ return 0; },
    y:  function(){ return 0; },
    dy: function(){ return 0; },
    
    /* COLOR */
    fixAntialiasStrokeColor: function(){ 
        /* Copy fill color */
        return this.pvMark.fillStyle();
    },
    
    fillColor: function(){ 
        return this.color('fill');
    },
    
    /**
     * @override
     */
    interactiveColor: function(type, color){
        if(type === 'fill'){
            if(this.scene.anySelected() && !this.scene.isSelected()) {
                return this.dimColor(type, color);
            }
        }

        return this.base(type, color);
    },
    
    /* STROKE */
    fixAntialiasStrokeWidth: function(){
        // Hide the line when using alpha
        // Otherwise, show it to bridge the gaps of segmented areas.
        // If the line is too thick, 
        // the junctions become horrible on very small angles.
        var color = this.pvMark.strokeStyle();
        return (!color || color.a < 1) ? 0.00001 : 1;
    }
});

def.type('pvc.visual.Bar', pvc.visual.Sign)
.init(function(panel, protoMark, keyArgs){

    var pvMark = protoMark.add(pv.Bar);
    
    this.base(panel, pvMark, keyArgs);

    this.normalStroke = def.get(keyArgs, 'normalStroke', false);

    this/* Colors */
        .intercept('fillStyle',   'fillColor'  )
        .intercept('strokeStyle', 'strokeColor')
        .intercept('lineWidth',   'strokeWidth')
        ;
})
.add({
    /* COLOR */
    fillColor: function(){ 
        return this.color('fill');
    },
    
    strokeColor: function(){
        return this.color('stroke');
    },

    /**
     * @override
     */
    normalColor: function(type, color){
        if(type === 'stroke' && !this.normalStroke){
            return null;
        }

        return color;
    },

    /**
     * @override
     */
    interactiveColor: function(type, color){
        var scene = this.scene;
        
        if(type === 'stroke'){
            if(scene.isActive){
               return color.brighter(1.3).alpha(0.7);
            }
            if(!this.normalStroke){
                return null;
            }

            if(scene.anySelected() && !scene.isSelected()) {
                if(this.isActiveSeriesAware && scene.isActiveSeries()) {
                    return pv.Color.names.darkgray.darker().darker();
                }

                return this.dimColor(type, color);
            }

        } else if(type === 'fill'){
            if(scene.isActive) {
                return color.brighter(0.2).alpha(0.8);
            } 

            if(scene.anySelected() && !scene.isSelected()) {
                if(this.isActiveSeriesAware && scene.isActiveSeries()) {
                    return pv.Color.names.darkgray.darker(2).alpha(0.8);
                }

                return this.dimColor(type, color);
            }
        }

        return this.base(type, color);
    },

    dimColor: function(type, color){
        return pvc.toGrayScale(color, 0.6);
    },

    /* STROKE WIDTH */
    strokeWidth: function(){
        var strokeWidth = this.baseStrokeWidth();
        if(this.scene.anyInteraction()) {
            strokeWidth = this.interactiveStrokeWidth(strokeWidth);
        } else {
            strokeWidth = this.normalStrokeWidth(strokeWidth);
        }

        return strokeWidth;
    },

    baseStrokeWidth: function(){
        var value = this.delegate();
        if(value === undefined){
            value = this.defaultStrokeWidth();
        }

        return value;
    },

    defaultStrokeWidth: function(){
        return 0.5;
    },

    normalStrokeWidth: function(strokeWidth){
        return strokeWidth;
    },

    interactiveStrokeWidth: function(strokeWidth){
        if(this.scene.isActive){
            return Math.max(1, strokeWidth) * 1.3;
        }

        return strokeWidth;
    }
});

def.type('pvc.visual.Rule', pvc.visual.Sign)
.init(function(panel, protoMark, keyArgs){

    var pvMark = protoMark.add(pv.Rule);

    this.base(panel, pvMark, keyArgs);

    this/* Colors & Line */
        .intercept('strokeStyle', 'strokeColor')
        .intercept('lineWidth',   'strokeWidth')
        ;
})
.add({
    _addInteractive: function(keyArgs){
        keyArgs = def.setDefaults(keyArgs,
                        'noHoverable', true,
                        'noTooltips',  true);

        this.base(keyArgs);
    },

    /* STROKE WIDTH */
    strokeWidth: function(){
        var strokeWidth = this.baseStrokeWidth();
        if(this.scene.anyInteraction()) {
            strokeWidth = this.interactiveStrokeWidth(strokeWidth);
        } else {
            strokeWidth = this.normalStrokeWidth(strokeWidth);
        }

        return strokeWidth;
    },

    baseStrokeWidth: function(){
        var value = this.delegate();
        if(value === undefined){
            value = this.defaultStrokeWidth();
        }

        return value;
    },

    defaultStrokeWidth: function(){
        return 1;
    },
    
    normalStrokeWidth: function(strokeWidth){
        return strokeWidth;
    },

    interactiveStrokeWidth: function(strokeWidth){
        if(this.scene.isActive){
            return Math.max(1, strokeWidth) * 2.2;
        }

        return strokeWidth;
    },

    /* STROKE COLOR */
    strokeColor: function(){
        return this.color('stroke');
    },

    /**
     * @override
     */
    interactiveColor: function(type, color){
        var scene = this.scene;
        
        if(!scene.isActive && scene.anySelected() && !scene.isSelected()) {
            return this.dimColor(type, color);
        }
        
        return this.base(type, color);
    }
});
/**
 * Initializes a visual context.
 * 
 * @name pvc.visual.Context
 * 
 * @class Represents a visualization context.  
 * The visualization context gives access to all relevant information
 * for rendering or interacting with a visualization.
 * <p>
 * A visualization context object <i>may</i> be reused
 * across extension points invocations and actions.
 * </p>
 * 
 * @property {pvc.BaseChart} chart The chart instance.
 * @property {pvc.BasePanel} panel The panel instance.
 * @property {number} index The render index.
 * @property {pvc.visual.Scene} scene The render scene.
 * @property {object} event An event object, present when a click or double-click action is being processed.
 * @property {pv.Mark} pvMark The protovis mark.
 * 
 * @constructor
 * @param {pvc.BasePanel} panel The panel instance.
 * @param {pv.Mark} mark The protovis mark.
 * @param {object} [event] An event object.
 */
def.type('pvc.visual.Context')
.init(function(panel, mark, event){
    this.chart = panel.chart;
    this.panel = panel;
    
    visualContext_update.call(this, mark, event);
})
.add(/** @lends pvc.visual.Context */{
    
    /* V1 DIMENSION ACCESSORS */
    getV1Series: function(){
        var s;
        return this.scene.atoms && (s = this.scene.atoms[this.panel._getV1DimName('series')]) && s.rawValue;
    },
    
    getV1Category: function(){
        var c;
        return this.scene.atoms && (c = this.scene.atoms[this.panel._getV1DimName('category')]) && c.rawValue;
    },
               
    getV1Value: function(){
        var v;
        return this.scene.atoms && (v = this.scene.atoms[this.panel._getV1DimName('value')]) && v.value;
    }
});

/**
 * Used internally to update a visual context.
 * 
 * @name pvc.visual.Context#_update
 * @function
 * @param {pv.Mark} mark The protovis mark being rendered or targeted by an event.
 * @param {object} [event] An event object.
 * @type undefined
 * @private
 * @virtual
 * @internal
 */
function visualContext_update(mark, event){

    this.sign   = mark.sign ? mark.sign() : null;
    this.event  = event || null;
    this.index  = mark.index; // !scene => index = null
    this.pvMark = mark;

    var instance = mark.instance(),
        scene = instance.scene;
    
    if(!scene){
        var group = instance.group,
            datum = group ? null : instance.datum;
        
        scene = new pvc.visual.Scene(null, {
            panel: this.panel,
            group: group,
            datum: datum
        });
    }

    this.scene = scene;
}def.scope(function(){

/**
 * Initializes a cartesian axis.
 * 
 * @name pvc.visual.CartesianAxis
 * 
 * @class Represents an axis for a role in a cartesian chart.
 * <p>
 * The main properties of an axis: {@link #type}, {@link #orientation} and relevant chart's properties 
 * are related as follows:
 * </p>
 * <pre>
 * axisType={base, ortho} = f(axisOrientation={x,y})
 * 
 *          Vertical   Horizontal   (chart orientation)
 *         +---------+-----------+
 *       x | base    |   ortho   |
 *         +---------+-----------+
 *       y | ortho   |   base    |
 *         +---------+-----------+
 * (axis orientation)
 * </pre>
 * 
 * @property {pvc.CartesianAbstract} chart The associated cartesian chart.
 * @property {string} type The type of the axis. One of the values: 'base' or 'ortho'.
 * @property {number} index The index of the axis within its type (0, 1, 2...).
 * @property {string} orientation The orientation of the axis. 
 * One of the values: 'x' or 'y', for horizontal and vertical axis orientations, respectively.
 * @property {string} orientatedId The id of the axis with respect to the orientation and the index of the axis ("").
 * @property {pvc.visual.Role} role The associated visual role.
 * @property {pv.Scale} scale The associated scale.
 *  
 * @constructor
 * @param {pvc.CartesianAbstract} chart The associated cartesian chart.
 * @param {string} type The type of the axis. One of the values: 'base' or 'ortho'.
 * @param {number} [index=0] The index of the axis within its type.
 * @param {pvc.visual.Role || pvc.visual.Role[]} roles The associated visual role or roles.
 * 
 * @param {object} [keyArgs] Keyword arguments.
 * @param {pv.Scale} scale The associated scale.
 */
def.type('pvc.visual.CartesianAxis')
.init(function(chart, type, index, roles, keyArgs){
    /*jshint expr:true */
    roles || def.fail.argumentRequired('roles');
    
    this.chart = chart;
    this.type  = type;
    this.index = index == null ? 0 : index;

    this.roles = def.array.as(roles);
    this.role  = this.roles[0];
    this.scaleType = groupingScaleType(this.role.grouping);

    // Role compatibility checks
    var L = this.roles.length;
    if(L > 1){
        var grouping = this.role.grouping, 
            i;
        if(this.scaleType === 'Discrete'){
            for(i = 1; i < L ; i++){
                if(grouping.id !== this.roles[i].grouping.id){
                    throw def.error.operationInvalid("Discrete roles on the same axis must have equal groupings.");
                }
            }
        } else {
            if(!grouping.firstDimension.type.isComparable){
                throw def.error.operationInvalid("Continuous roles on the same axis must have 'comparable' groupings.");
            }

            for(i = 1; i < L ; i++){
                if(this.scaleType !== groupingScaleType(this.roles[i].grouping)){
                    throw def.error.operationInvalid("Continuous roles on the same axis must have scales of the same type.");
                }
            }
        }
    }

    this.scale = def.get(keyArgs, 'scale');
    
    // ------------
    
    var options = chart.options;
    
    this.id = $VCA.getId(this.type, this.index);
    
    this.orientation = $VCA.getOrientation(this.type, options.orientation);
    this.orientedId  = $VCA.getOrientedId(this.orientation, this.index);
    this.optionsId   = $VCA.getOptionsId(this.orientation, this.index);
    
    this.upperOrientedId = def.firstUpperCase(this.orientedId);
    
    if(this.index !== 1) {
        this.isVisible = options['show' + this.upperOrientedId + 'Scale'];
    } else {
        this.isVisible = !!options.secondAxisIndependentScale; // options.secondAxis is already true or wouldn't be here
    }
})
.add(/** @lends pvc.visual.CartesianAxis# */{
    
    setScale: function(scale){
        this.scale = scale;
    },
    
    /**
     * Determines the type of scale required by the cartesian axis.
     * The scale types are 'Discrete', 'Timeseries' and 'Continuous'.
     * 
     * @type string
     */
    scaleType: function(){
        return groupingScaleType(this.role.grouping);
    },
    
    /**
     * Obtains a scene-scale function to compute values of this axis' main role.
     * 
     * @param {object} [keyArgs] Keyword arguments object.
     * @param {boolean} [keyArgs.nullToZero=true] Indicates that null values should be converted to zero before applying the scale.
     * @type function
     */
    sceneScale: function(keyArgs){
        var roleName = this.role.name,
            grouping = this.role.grouping;

        if(grouping.isSingleDimension && grouping.firstDimension.type.valueType === Number){
            var scale = this.scale,
                nullToZero = def.get(keyArgs, 'nullToZero', true);
            
            var by = function(scene){
                var value = scene.acts[roleName].value;
                if(value == null){
                    if(!nullToZero){
                        return value;
                    }
                    value = 0;
                }
                return scale(value);
            };
            def.copy(by, scale);
            
            return by;
        }

        return this.scale.by(function(scene){
            return scene.acts[roleName].value;
        });
    },
    
    /**
     * Obtains the value of an axis option, given its name.
     * <p>
     * Always tries to obtain the option value using the "Bare Id" option name format.
     * If it is not specified using such a name, 
     * then logic that depends on each option is applied to obtain the option's value.
     * </p>
     * 
     * @param {string} name The option name.
     * @type string
     */
    option: function(name){
        /* Custom option handler */
        var handler = axisOptionHandlers[name];
        
        var value = coreOptions.call(this, handler, name);
        if(value != null && handler && handler.cast) {
            value = handler.cast.call(this, value);
        }
        
        return value;
    }
});

var $VCA = pvc.visual.CartesianAxis;

function coreOptions(handler, name) {
    var value;
    
    /* Custom option handler */
    if(handler && handler.resolve) {
        value = handler.resolve.call(this, name);
        if(value !== undefined) {
            return value;
        }
    }
 
    /* By Id  (baseAxis, orthoAxis, base2Axis, ortho2Axis, ...) */
    value = idOptions.call(this, name);
    if(value !== undefined) {
        return value;
    }
    
    /* By Options Id (xAxis, yAxis, secondAxis) */
    value = v1OptionIdOptions.call(this, name);
    if(value !== undefined) {
        return value;
    }
    
    /* Custom option post handler */
    if(handler && handler.resolvePost) {
        value = handler.resolvePost.call(this, name);
        if(value !== undefined) {
            return value;
        }
    }

    /* Common (axis) */
    value = commonOptions.call(this, name);

    return value;
}

/**
 * Obtains the type of the axis given an axis orientation and a chart orientation.
 * 
 * @param {string} axisOrientation The orientation of the axis. One of the values: 'x' or 'y'.
 * @param {string} chartOrientation The orientation of the chart. One of the values: 'horizontal' or 'vertical'.
 * 
 * @type string
$VCA.getTypeFromOrientation = function(axisOrientation, chartOrientation){
    return ((axisOrientation === 'x') === (chartOrientation === 'vertical')) ? 'base' : 'ortho';  // NXOR
};
 */

/**
 * Obtains the orientation of the axis given an axis type and a chart orientation.
 * 
 * @param {string} type The type of the axis. One of the values: 'base' or 'ortho'.
 * @param {string} chartOrientation The orientation of the chart. One of the values: 'horizontal' or 'vertical'.
 * 
 * @type string
 */
$VCA.getOrientation = function(type, chartOrientation){
    return ((type === 'base') === (chartOrientation === 'vertical')) ? 'x' : 'y';  // NXOR
};

/**
 * Calculates the oriented id of an axis given its orientation and index.
 * @param {string} orientation The orientation of the axis.
 * @param {number} index The index of the axis within its type. 
 * @type string
 */
$VCA.getOrientedId = function(orientation, index){
    switch(index) {
        case 0: return orientation; // x, y
        case 1: return "second" + orientation.toUpperCase(); // secondX, secondY
    }
    
    return orientation + "" + (index + 1); // y3, x4,...
};

/**
 * Calculates the oriented id of an axis given its orientation and index.
 * @param {string} type The type of the axis. One of the values: 'base' or 'ortho'.
 * @param {number} index The index of the axis within its type. 
 * @type string
 */
$VCA.getId = function(type, index){
    if(index === 0) {
        return type; // base, ortho
    }
    
    return type + "" + (index + 1); // base2, ortho3,...
};

/**
 * Calculates the options id of an axis given its orientation and index.
 * 
 * @param {string} orientation The orientation of the axis.
 * @param {number} index The index of the axis within its type. 
 * @type string
 */
$VCA.getOptionsId = function(orientation, index){
    switch(index) {
        case 0: return orientation; // x, y
        case 1: return "second"; // second
    }
    
    return orientation + "" + (index + 1); // y3, x4,...
};

$VCA.createAllDefaultOptions = function(options){
    var types   = ['base', 'ortho'],
        indexes = [0, 1],
        orientations = ['x', 'y'],
        optionNames = [
            'Position',
            'Size',
            'SizeMax',
            'FullGrid',
            'FullGridCrossesMargin',
            'RuleCrossesMargin',
            'EndLine',
            'DomainRoundMode',
            'DesiredTickCount',
            'TickExponentMin',
            'TickExponentMax',
            'MinorTicks',
            'ClickAction',
            'DoubleClickAction',
            'Title',
            'TitleSize',
            'TitleSizeMax',
            'TitleFont',
            'TitleMargins',
            'TitlePaddings',
            'TitleAlign',
            'LabelFont',
            'OriginIsZero',
            'Offset',
            'FixedMin',
            'FixedMax',
            'OverlappedLabelsHide',
            'OverlappedLabelsMaxPct',
            'Composite',
            'ZeroLine',
            'LabelSpacingMin'
       ],
       globalDefaults = {
           'OriginIsZero':      true,
           'Offset':            0,
           'Composite':         false,
           'OverlappedLabelsHide': false,
           'OverlappedLabelsMaxPct': 0.2,
           'LabelFont':         '9px sans-serif',
           'TitleFont':         '12px sans-serif', // 'bold '
           'MinorTicks':        true,
           'FullGrid':          false,
           'FullGridCrossesMargin': true,
           'RuleCrossesMargin': true,
           'EndLine':           false,
           'DomainRoundMode':   'none',
           'ZeroLine':          true,
           'LabelSpacingMin':      1
       };

    function addOption(optionId, value){
        if(!(optionId in options)){
            options[optionId] = value;
        }
    }
    
    optionNames.forEach(function(name){
        indexes.forEach(function(index){
            /* id options */
            types.forEach(function(type){
                addOption($VCA.getId(type, index) + "Axis" + name);
            });

            /* by optionsId */
            orientations.forEach(function(orientation){
                addOption($VCA.getOptionsId(orientation, index) + 'Axis' + name);
            });
        });

        /* common options */
        addOption('axis' + name, globalDefaults[name]);
    });

    return options;
};

/* PRIVATE STUFF */
var axisOptionHandlers = {
    /*
     * 1     <- useCompositeAxis
     * >= 2  <- false
     */
    Composite: {
        resolve: function(){
            /* Only first axis can be composite? */
            if(this.index > 0) {
                return false;
            }
            
            return finalOptions.call(this, 'useCompositeAxis');
        },
        cast: Boolean
    },
    
    /* xAxisSize,
     * secondAxisSize || xAxisSize 
     */
    Size: {
        resolve:  function(name){
            var value = v1OptionIdOptions.call(this, name);
            if(!value && this.index > 0) {
                // Default to the size of the first axis of same orientation
                value = firstOptions.call(this, name);
            }
            
            return value;
        },
        cast: Number2
    },
    
    /* xAxisPosition,
     * secondAxisPosition <- opposite(xAxisPosition) 
     */
    Position: {
        resolve: function(name){
            if(this.index > 0) {
                // Use the position opposite to that of the first axis of same orientation
                var firstPosition = firstOptions.call(this, name);
                return pvc.BasePanel.oppositeAnchor[firstPosition || 'left'];
            }
            
            return v1OptionIdOptions.call(this, name);
        }
    },
    
    /* orthoFixedMin, orthoFixedMax */
    FixedMin: {
        resolvePost: function(name){
            if(!this.index && this.type === 'ortho') {
                return bareIdOptions.call(this, name);
            }
        },
        cast: Number2
    },
    FixedMax: {
        resolvePost: function(name){
            if(!this.index && this.type === 'ortho') {
                return bareIdOptions.call(this, name);
            }
        },
        cast: Number2
    },
    
    /* 1 <- originIsZero
     * 2 <- secondAxisOriginIsZero
     */
    OriginIsZero:  {
        resolvePost: function(name){
            switch(this.index) {
                case 0: return finalOptions.call(this, 'originIsZero');
                case 1: return finalOptions.call(this, 'secondAxisOriginIsZero');
            }
        },
        cast: Boolean
    }, 
    
    /* 1 <- axisOffset, 
     * 2 <- secondAxisOffset, 
     */
    Offset:  {
        resolvePost: function(name){
            switch(this.index) {
                case 0: return finalOptions.call(this, 'axisOffset');
                case 1: return finalOptions.call(this, 'secondAxisOffset');
            }
        },
        
        cast: Number2
    },
    
    OverlappedLabelsHide: {cast: Boolean },
    OverlappedLabelsMaxPct: {cast: Number2 },
    FullGrid: {
        resolve: function(name){
            // TODO: is this too restrictive?
            if(this.index !== 0){
                return false;
            }
        },
        cast: Boolean
    },
    EndLine:  {cast: Boolean },
    DesiredTickCount: {cast: Number2 },
    MinorTicks: {cast: Number2 },
    TitleSize: {cast: Number2 },
    FullGridCrossesMargin: {cast: Boolean },
    RuleCrossesMargin: {cast: Boolean },
    ZeroLine: {cast: Boolean },
    LabelSpacingMin: {cast: Number2 },
    TickExponentMin: {cast: Number2 },
    TickExponentMax: {cast: Number2 }
};

/**
 * Obtains the value of an option using a specified final name.
 * 
 * @name pvc.visual.CartesianAxis#_finalOptions
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function finalOptions(name) {
    return this.chart.options[name];
}

/**
 * Obtains the value of an option using the V1 options id. format.
 * using {@link #_buildOptionsIdName}.
 * 
 * @name pvc.visual.CartesianAxis#_v1OptionIdOptions
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function v1OptionIdOptions(name){
    return finalOptions.call(this, buildOptionsIdName.call(this, name)); 
}

function Number2(value) {
    if(value != null) {
        value = +value; // to number
        if(isNaN(value)) {
            value = null;
        }
    }
    return value;
}

/**
 * Obtains the value of an option that uses the axis id followed by "Axis" as a prefix
 * (ex. <tt>orthoAxisFixedMax</tt>, <tt>baseAxisFixedMin</tt>, <tt>ortho2AxisFixedMin</tt>).
 * 
 * @name pvc.visual.CartesianAxis#_idOptions
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function idOptions(name){
    return finalOptions.call(this, this.id + "Axis" + name);
}

/**
 * Obtains the value of an option that uses only the axis id as a prefix
 * (ex. <tt>orthoFixedMax</tt>, <tt>orthoFixedMin</tt>).
 *
 * @name pvc.visual.CartesianAxis#_bareIdOptions
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function bareIdOptions(name){
    return finalOptions.call(this, this.id + name);
}

/**
 * Obtains the value of an option that is common 
 * to all axis types, orientations and indexes
 * (ex. <tt>axisLabelFont</tt>).
 * 
 * @name pvc.visual.CartesianAxis#_commonOptions
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function commonOptions(name){
    return finalOptions.call(this, 'axis' + name);
}

/**
 * Obtains the value of an option of the first axis, of the same orientation.
 * @name pvc.visual.CartesianAxis#_firstOptions
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function firstOptions(name) {
    var firstOptionId = $VCA.getOptionsId(this.orientation, 0);
    
    name = buildOptionsIdName.call({optionsId: firstOptionId}, name);
    
    return finalOptions.call(this, name);
}

/** 
 * Builds the name of an option that uses the options id as a prefix 
 * (ex: <tt>xAxisEndLine</tt>, <tt>secondAxisEndLine</tt>).
 * 
 * @name pvc.visual.CartesianAxis#_buildOptionsIdName
 * @function
 * @param {string} name The option name.
 * @private
 * @type string
 */
function buildOptionsIdName(name) {
    return this.optionsId + 'Axis' + name;
}


function groupingScaleType(grouping){
    return grouping.isDiscrete() ?
                'Discrete' :
                (grouping.firstDimension.type.valueType === Date ?
                'Timeseries' :
                'Continuous');
}

});
pvc.Abstract = Base.extend({
    invisibleLineWidth: 0.001,
    defaultLineWidth:   1.5
});

/**
 * The main chart component
 */
pvc.BaseChart = pvc.Abstract.extend({
    /**
     * Indicates if the chart has been disposed.
     */
    _disposed: false,
    
    _updateSelectionSuspendCount: 0,
    _selectionNeedsUpdate:   false,
    
    /**
     * The chart's parent chart.
     * 
     * <p>
     * The root chart has null as the value of its parent property.
     * </p>
     * 
     * @type pvc.BaseChart
     */
    parent: null,
    
    /**
     * The chart's root chart.
     * 
     * <p>
     * The root chart has itself as the value of the root property.
     * </p>
     * 
     * @type pvc.BaseChart
     */
    root: null,
    
    /**
     * A map of {@link pvc.visual.Role} by name.
     * 
     * @type object
     */
    _visualRoles: null,

    _serRole: null,
    _dataPartRole: null,
    
    /**
     * An array of the {@link pvc.visual.Role} that are measures.
     * 
     * @type pvc.visual.Role[]
     */
    _measureVisualRoles: null,
    
    /**
     * Indicates if the chart has been pre-rendered.
     * <p>
     * This field is set to <tt>false</tt>
     * at the beginning of the {@link #_preRender} method
     * and set to <tt>true</tt> at the end.
     * </p>
     * <p>
     * When a chart is re-rendered it can, 
     * optionally, also repeat the pre-render phase. 
     * </p>
     * 
     * @type boolean
     */
    isPreRendered: false,

    /**
     * The version value of the current/last pre-render phase.
     * 
     * <p>
     * This value is changed on each pre-render of the chart.
     * It can be useful to invalidate cached information that 
     * is only valid for each pre-render.
     * </p>
     * <p>
     * Version values can be compared using the identity operator <tt>===</tt>.
     * </p>
     * 
     * @type any
     */
    _preRenderVersion: 0,
    
    /**
     * A callback function that is called 
     * when the protovis' panel render is about to start.
     * 
     * <p>
     * Note that this is <i>after</i> the pre-render phase.
     * </p>
     * 
     * <p>
     * The callback is called with no arguments, 
     * but having the chart instance as its context (<tt>this</tt> value). 
     * </p>
     * 
     * @function
     */
    renderCallback: undefined,

    /**
     * The data that the chart is to show.
     * @type pvc.data.Data
     */
    dataEngine: null,
    data: null,
    
    __partData: null,

    /**
     * The data source of the chart.
     * <p>
     * The {@link #data} of a root chart 
     * is loaded with the data in this array.
     * </p>
     * @type any[]
     */
    resultset: [],
    
    /**
     * The meta-data that describes each 
     * of the data components of {@link #resultset}.
     * @type any[]
     */
    metadata: [],

    /**
     * The base panel is the root container of a chart.
     * <p>
     * The base panel of a <i>root chart</i> is the top-most root container.
     * It has {@link pvc.BasePanel#isTopRoot} equal to <tt>true</tt>.
     * </p>
     * <p>
     * The base panel of a <i>non-root chart</i> is the root of the chart's panels,
     * but is not the top-most root panel, over the charts hierarchy.
     * </p>
     * 
     * @type pvc.BasePanel
     */
    basePanel:   null,
    
    /**
     * The panel that shows the chart's title.
     * <p>
     * This panel is the first child of {@link #basePanel} to be created.
     * It is only created when the chart has a non-empty title.
     * </p>
     * <p>
     * Being the first child causes it to occupy the 
     * whole length of the side of {@link #basePanel} 
     * to which it is <i>docked</i>.
     * </p>
     * 
     * @type pvc.TitlePanel
     */
    titlePanel:  null,
    
    /**
     * The panel that shows the chart's main legend.
     * <p>
     * This panel is the second child of {@link #basePanel} to be created.
     * There is an option to not show the chart's legend,
     * in which case this panel is not created.
     * </p>
     * 
     * <p>
     * The current implementation of the legend panel
     * presents a <i>discrete</i> association of colors and labels.
     * </p>
     * 
     * @type pvc.LegendPanel
     */
    legendPanel: null,
    
    /**
     * The panel that hosts child chart's base panels.
     * 
     * @type pvc.MultiChartPanel
     */
    _multiChartPanel: null,
    
    /**
     * List of legend groups.
     */
    legendGroupsList: null,

    /**
     * Map of legend groups by id.
     */
    legendGroups: null,

    /**
     * The name of the visual role that
     * the legend panel will be associated to.
     * 
     * <p>
     * The legend panel displays each distinct role value
     * with a marker and a label.
     * 
     * The marker's color is obtained from the parts color scales,
     * given the role's value.
     * </p>
     * <p>
     * The default dimension is the 'series' dimension.
     * </p>
     * 
     * @type string
     */
    legendSource: "series",
    
    /**
     * An array of colors, represented as names, codes or {@link pv.Color} objects
     * that is associated to each distinct value of the {@link #legendSource} dimension.
     * 
     * <p>
     * The legend panel associates each distinct dimension value to a color of {@link #colors},
     * following the dimension's natural order.
     * </p>
     * <p>
     * The default dimension is the 'series' dimension.
     * </p>
     * 
     * @type (string|pv.Color)[]
     */
    colors: null,
    secondAxisColor: null,

    constructor: function(options) {
        var parent = this.parent = def.get(options, 'parent') || null;
        if(parent) {
            // options != null
            this.root = parent.root;
            this.dataEngine =
            this.data = options.data ||
                        def.fail.argumentRequired('options.data');
            
            this.left = options.left;
            this.top  = options.top;
            this._visualRoles = parent._visualRoles;
            this._measureVisualRoles = parent._measureVisualRoles;

            if(parent._serRole) {
                this._serRole = parent._serRole;
            }

            if(parent._dataPartRole) {
                this._dataPartRole = parent._dataPartRole;
            }
            
        } else {
            this.root = this;
            
            this._visualRoles = {};
            this._measureVisualRoles = [];
        }
        
        this.options = pvc.mergeDefaults({}, pvc.BaseChart.defaultOptions, options);
    },
    
    /**
     * Processes options after user options and defaults have been merged.
     * Applies restrictions,
     * performs validations and
     * options values implications.
     */
    _processOptions: function(){

        var options = this.options;

        this._processOptionsCore(options);
        
        /* DEBUG options */
        if(pvc.debug >= 3 && options){
            try {
                pvc.log("OPTIONS:\n" + JSON.stringify(options));
            }catch(ex) {
                /* SWALLOW usually a circular JSON structure */
            }
        }

        return options;
    },

    /**
     * Processes options after user options and default options have been merged.
     * Override to apply restrictions, perform validation or
     * options values implications.
     * When overriden, the base implementation should be called.
     * The implementation must be idempotent -
     * its successive application should yield the same results.
     * @virtual
     */
    _processOptionsCore: function(options){
        // Disable animation if environment doesn't support it
        if (!$.support.svg || pv.renderer() === 'batik') {
            options.animate = false;
        }
        
        // Sanitize some options
        if(options.showTooltips){
            var ts = options.tipsySettings;
            if(ts){
                this.extend(ts, "tooltip_");
            }
        }
    },
    
    /**
     * Building the visualization is made in 2 stages:
     * First, the {@link #_preRender} method prepares and builds 
     * every object that will be used.
     * 
     * Later the {@link #render} method effectively renders.
     */
    _preRender: function(keyArgs) {
        var options = this.options;
        
        /* Increment pre-render version to allow for cache invalidation  */
        this._preRenderVersion++;
        
        this.isPreRendered = false;

        if(pvc.debug >= 3){
            pvc.log("Prerendering in pvc");
        }
        
        if (!this.parent) {
            // If we don't have data, we just need to set a "no data" message
            // and go on with life.
            // Child charts are created to consume *existing* data
            if(!this.allowNoData && this.resultset.length === 0) {
                /*global NoDataException:true */
                throw new NoDataException();
            }
            
            // Now's as good a time as any to completely clear out all
            //  tipsy tooltips
            pvc.removeTipsyLegends();
        }

        /* Options may be changed between renders */
        this._processOptions();
        
        /* Initialize root chart roles */
        if(!this.parent && this._preRenderVersion === 1) {
            this._initVisualRoles();
            this._bindVisualRolesPre();
        }

        /* Initialize the data engine */
        this._initData(keyArgs);

        /* Create color schemes */
        this.colors = pvc.createColorScheme(options.colors);

        if(options.secondAxis){
            var ownColors = options.secondAxisOwnColors;
            if(ownColors == null){
                ownColors = options.compatVersion <= 1;
            }
            
            if(ownColors){
                /* if secondAxisColor is unspecified, assumes default color scheme. */
                this.secondAxisColor = pvc.createColorScheme(options.secondAxisColor);
            }
        }
        
        /* Initialize chart panels */
        this._initBasePanel();
        this._initTitlePanel();
        this._initLegend();
        
        if(!this.parent && this._isRoleAssigned('multiChartColumn')) {
            this._initMultiChartPanel();
        } else {
            this._preRenderCore();
        }

        this.isPreRendered = true;
    },

    /**
     * Override to create chart specific content panels here.
     * No need to call base.
     * @virtual
     */
    _preRenderCore: function(){
        /* NOOP */
    },
    
    /**
     * Initializes the data engine and roles
     */
    _initData: function(keyArgs) {
        if(!this.parent) {
            var data = this.data;
            if(!data || def.get(keyArgs, 'reloadData', true)) {
               this._onLoadData();
            } else {
                // TODO: Do this in a cleaner way. Give control to Data
                // We must at least dispose children and cache...
                /*global data_disposeChildLists:true, data_syncDatumsState:true */
                data_disposeChildLists.call(data);
                data_syncDatumsState.call(data);
            }
        }

        if(this._legendColorScales){
            delete this._legendColorScales;
        }
        
        if(this.__partData){
            delete this.__partData;
        }
        
        if(pvc.debug >= 3){
            pvc.log(this.data.getInfo());
        }
    },

    _onLoadData: function(){
        var data = this.data,
            complexType   = data ? data.type : new pvc.data.ComplexType(),
            translOptions = this._createTranslationOptions(),
            translation   = this._createTranslation(complexType, translOptions);

        translation.configureType();

        if(pvc.debug >= 3){
            pvc.log(complexType.describe());
        }

        // ----------
        // Roles are bound before actually loading data,
        // in order to be able to filter datums
        // whose "every dimension in a measure role is null".
        this._bindVisualRoles(complexType);

        if(pvc.debug >= 3){
            this._logVisualRoles();
        }

        // ----------

        if(!data) {
            data =
                this.dataEngine =
                this.data = new pvc.data.Data({type: complexType});
        } // else TODO: assert complexType has not changed...
        
        // ----------

        var loadKeyArgs = {
            where:  this._getLoadFilter(),
            isNull: this._getIsNullDatum()
         };
        
        data.load(translation.execute(data), loadKeyArgs);
    },

    _getLoadFilter: function(){
        if(this.options.ignoreNulls) {
            return function(datum){
                var isNull = !datum.isNull;
                
                if(isNull && pvc.debug >= 4){
                    pvc.log("Datum excluded.");
                }
                
                return isNull;
            };
        }
    },
    
    _getIsNullDatum: function(){
        var measureDimNames = this.measureDimensionsNames(),
            M = measureDimNames.length;
        if(M) {
            // Must have at least one measure role dimension not-null
            return function(datum){
                var atoms = datum.atoms;
                for(var i = 0 ; i < M ; i++){
                    if(atoms[measureDimNames[i]].value != null){
                        return false;
                    }
                }

                return true;
            };
        }
    },

    _createTranslation: function(complexType, translOptions){
        
        var TranslationClass = translOptions.crosstabMode ? 
                    pvc.data.CrosstabTranslationOper : 
                    pvc.data.RelationalTranslationOper;

        return new TranslationClass(complexType, this.resultset, this.metadata, translOptions);
    },

    _createTranslationOptions: function(){
        var options = this.options,
            dataOptions = options.dataOptions || {};

        var secondAxisSeriesIndexes;
        if(options.secondAxis){
            secondAxisSeriesIndexes = options.secondAxisSeriesIndexes;
            if(secondAxisSeriesIndexes === undefined){
                secondAxisSeriesIndexes = options.secondAxisIdx;
            }

            if(secondAxisSeriesIndexes == null){
                options.secondAxis = false;
            }
        }

        var valueFormat = options.valueFormat,
            valueFormatter;
        if(valueFormat && valueFormat !== pvc.BaseChart.defaultOptions.valueFormat){
            valueFormatter = function(v) {
                return v != null ? valueFormat(v) : "";
            };
        }

        return {
            compatVersion:     options.compatVersion,
            secondAxisSeriesIndexes: secondAxisSeriesIndexes,
            seriesInRows:      options.seriesInRows,
            crosstabMode:      options.crosstabMode,
            isMultiValued:     options.isMultiValued,

            dimensionGroups:   options.dimensionGroups,
            dimensions:        options.dimensions,
            readers:           options.readers,

            measuresIndexes:   options.measuresIndexes, // relational multi-valued

            multiChartColumnIndexes: options.multiChartColumnIndexes,
            multiChartRowIndexes: options.multiChartRowIndexes,

            // crosstab
            separator:         dataOptions.separator,
            measuresInColumns: dataOptions.measuresInColumns,
            measuresIndex:     dataOptions.measuresIndex || dataOptions.measuresIdx, // measuresInRows
            measuresCount:     dataOptions.measuresCount || dataOptions.numMeasures, // measuresInRows
            categoriesCount:   dataOptions.categoriesCount,

            // Timeseries *parse* format
            isCategoryTimeSeries: options.timeSeries,

            timeSeriesFormat:     options.timeSeriesFormat,
            valueNumberFormatter: valueFormatter
        };
    },

    /**
     * Initializes each chart's specific roles.
     * @virtual
     */
    _initVisualRoles: function(){
        this._addVisualRoles({
            multiChartColumn: {defaultDimensionName: 'multiChartColumn*'},
            multiChartRow:    {defaultDimensionName: 'multiChartRow*'}
        });

        if(this._hasDataPartRole()){
            this._addVisualRoles({
                dataPart: {
                    defaultDimensionName: 'dataPart',
                    requireSingleDimension: true,
                    requireIsDiscrete: true
                }
            });

            // Cached
            this._dataPartRole = this.visualRoles('dataPart');
        }

        var serRoleSpec = this._getSeriesRoleSpec();
        if(serRoleSpec){
            this._addVisualRoles({series: serRoleSpec});

            // Cached
            this._serRole = this.visualRoles('series');
        }
    },

    /**
     * Binds visual roles to grouping specifications
     * that have not yet been bound to and validated against a complex type.
     *
     * This allows infering proper defaults to
     * dimensions bound to roles, by taking them from the roles requirements.
     */
    _bindVisualRolesPre: function(){
        
        def.eachOwn(this._visualRoles, function(visualRole){
            visualRole.setIsReversed(false);
        });
        
        /* Process user specified bindings */
        var boundDimNames = {};
        def.each(this.options.visualRoles, function(roleSpec, name){
            var visualRole = this._visualRoles[name] ||
                def.fail.operationInvalid("Role '{0}' is not supported by the chart type.", [name]);
            
            var groupingSpec;
            if(roleSpec && typeof roleSpec === 'object'){
                if(def.get(roleSpec, 'isReversed', false)){
                    visualRole.setIsReversed(true);
                }
                
                groupingSpec = roleSpec.dimensions;
            } else {
                groupingSpec = roleSpec;
            }
            
            // !groupingSpec results in a null grouping being preBound
            // A pre bound null grouping is later discarded in the post bind
            if(groupingSpec !== undefined){
                var grouping = pvc.data.GroupingSpec.parse(groupingSpec);

                visualRole.preBind(grouping);

                /* Collect dimension names bound to a *single* role */
                grouping.dimensions().each(function(dimSpec){
                    if(def.hasOwn(boundDimNames, dimSpec.name)){
                        // two roles => no defaults at all
                        delete boundDimNames[dimSpec.name];
                    } else {
                        boundDimNames[dimSpec.name] = visualRole;
                    }
                });
            }
        }, this);

        /* Provide defaults to dimensions bound to a single role */
        var dimsSpec = (this.options.dimensions || (this.options.dimensions = {}));
        def.eachOwn(boundDimNames, function(role, name){
            var dimSpec = dimsSpec[name] || (dimsSpec[name] = {});
            if(role.valueType && dimSpec.valueType === undefined){
                dimSpec.valueType = role.valueType;

                if(role.requireIsDiscrete != null && dimSpec.isDiscrete === undefined){
                    dimSpec.isDiscrete = role.requireIsDiscrete;
                }
            }

            if(dimSpec.label === undefined){
                dimSpec.label = role.label;
            }
        }, this);
    },

    _hasDataPartRole: function(){
        return false;
    },

    _getSeriesRoleSpec: function(){
        return null;
    },

    _addVisualRoles: function(roles){
        def.eachOwn(roles, function(keyArgs, name){
            var visualRole = new pvc.visual.Role(name, keyArgs);
            this._visualRoles[name] = visualRole;
            if(visualRole.isMeasure){
                this._measureVisualRoles.push(visualRole);
            }
        }, this);
    },
    
    _bindVisualRoles: function(type){
        
        var boundDimTypes = {};

        function bind(role, dimNames){
            role.bind(pvc.data.GroupingSpec.parse(dimNames, type));
            def.array.as(dimNames).forEach(function(dimName){
                boundDimTypes[dimName] = true;
            });
        }
        
        /* Process role pre binding */
        def.eachOwn(this._visualRoles, function(visualRole, name){
            if(visualRole.isPreBound()){
                visualRole.postBind(type);
                // Null groupings are discarded
                if(visualRole.grouping){
                    visualRole
                        .grouping
                        .dimensions().each(function(dimSpec){
                            boundDimTypes[dimSpec.name] = true;
                        });
                }
            }
        }, this);
        
        /*
         * (Try to) Automatically bind unbound roles.
         * Validate role required'ness.
         */
        def.eachOwn(this._visualRoles, function(role, name){
            if(!role.grouping){

                /* Try to bind automatically, to defaultDimensionName */
                var dimName = role.defaultDimensionName;
                if(dimName) {
                    /* An asterisk at the end of the name indicates
                     * that any dimension of that group is allowed.
                     * If the role allows multiple dimensions,
                     * then the meaning is greedy - use them all.
                     * Otherwise, use only one.
                     */
                    var match = dimName.match(/^(.*?)(\*)?$/) ||
                            def.fail.argumentInvalid('defaultDimensionName');
                    
                    var anyLevel = !!match[2];
                    if(anyLevel) {
                        // TODO: does not respect any index explicitly specified
                        // before the *. Could mean >=...
                        var groupDimNames = type.groupDimensionsNames(match[1], {assertExists: false});
                        if(groupDimNames){
                            var freeGroupDimNames = 
                                    def.query(groupDimNames)
                                        .where(function(dimName2){ return !def.hasOwn(boundDimTypes, dimName2); });

                            if(role.requireSingleDimension){
                                var freeDimName = freeGroupDimNames.first();
                                if(freeDimName){
                                    bind(role, freeDimName);
                                    return;
                                }
                            } else {
                                freeGroupDimNames = freeGroupDimNames.array();
                                if(freeGroupDimNames.length){
                                    bind(role, freeGroupDimNames);
                                    return;
                                }
                            }
                        }
                    } else if(!def.hasOwn(boundDimTypes, dimName) &&
                              type.dimensions(dimName, {assertExists: false})){
                        bind(role, dimName);
                        return;
                    }

                    if(role.autoCreateDimension){
                        /* Create a hidden dimension and bind the role and the dimension */
                        var defaultName = match[1];
                        type.addDimension(defaultName,
                            pvc.data.DimensionType.extendSpec(defaultName, {isHidden: true}));
                        bind(role, defaultName);
                        return;
                    }
                }

                if(role.isRequired) {
                    throw def.error.operationInvalid("Chart type requires unassigned role '{0}'.", [name]);
                }
                
                // Unbind role from any previous binding
                role.bind(null);
            }
        }, this);
    },

    _logVisualRoles: function(){
        var out = ["\n------------------------------------------"];
        out.push("Visual Roles Information");

        def.eachOwn(this._visualRoles, function(role, name){
            out.push("  " + name + def.array.create(18 - name.length, " ").join("") +
                    (role.grouping ? (" <-- " + role.grouping) : ''));
        });
        
        out.push("------------------------------------------");

        pvc.log(out.join("\n"));
    },

    /**
     * Obtains a roles array or a specific role, given its name.
     * 
     * @param {string} roleName The role name.
     * @param {object} keyArgs Keyword arguments.
     * @param {boolean} assertExists Indicates if an error should be thrown if the specified role name is undefined.
     * 
     * @type pvc.data.VisualRole[]|pvc.data.VisualRole 
     */
    visualRoles: function(roleName, keyArgs){
        if(roleName == null) {
            return def.own(this._visualRoles);
        }
        
        var role = def.getOwn(this._visualRoles, roleName) || null;
        if(!role && def.get(keyArgs, 'assertExists', true)) {
            throw def.error.argumentInvalid('roleName', "Undefined role name '{0}'.", [roleName]);
        }
        
        return role;
    },

    measureVisualRoles: function(){
        return this._measureVisualRoles;
    },

    measureDimensionsNames: function(){
        return def.query(this._measureVisualRoles)
                   .select(function(visualRole){ return visualRole.firstDimensionName(); })
                   .where(def.notNully)
                   .array();
    },
    
    /**
     * Indicates if a role is assigned, given its name. 
     * 
     * @param {string} roleName The role name.
     * @type boolean
     */
    _isRoleAssigned: function(roleName){
        return !!this._visualRoles[roleName].grouping;
    },

    _partData: function(dataPartValues){
        if(!this.__partData){
            if(!this._dataPartRole || !this._dataPartRole.grouping){
                /* Undefined or unbound */
                this.__partData = this.data;
            } else {
                // Visible and not
                this.__partData = this._dataPartRole.flatten(this.data);
            }
        }
        
        if(!dataPartValues){
            return this.__partData;
        }

        dataPartValues = def.query(dataPartValues).distinct().array();
        dataPartValues.sort();

        var dataPartDimName = this._dataPartRole.firstDimensionName();

        if(dataPartValues.length === 1){
            // Faster this way...
            // TODO: should, at least, call some static method of Atom to build a global key
            return this.__partData._childrenByKey[dataPartDimName + ':' + dataPartValues[0]];
        }

        return this.__partData.where([
                    def.set({}, dataPartDimName, dataPartValues)
                ]);
    },

    _partValues: function(){
        if(!this._dataPartRole || !this._dataPartRole.grouping){
            /* Undefined or unbound */
            return null;
        }
        
        return this._partData()
                   .children()
                   .select(function(child){ return child.value; })
                   .array();
    },

    _legendData: function(dataPartValues){
        var role = this.visualRoles(this.legendSource, {assertExists: false});
        return role ? role.flatten(this._partData(dataPartValues)) : null;
    },

    _legendColorScale: function(dataPartValues){
        if(this.parent){
            return this.root._legendColorScale(dataPartValues);
        }

        if(!dataPartValues || !this.secondAxisColor){
            dataPartValues = '';
        }

        var key = '' + (dataPartValues ? dataPartValues : ''), // relying on Array.toString;
            scale = def.getOwn(this._legendColorScales, key);

        if(!scale){
            var legendData = this._legendData(dataPartValues),
                colorsFactory = (!key || key === '0') ? this.colors : this.secondAxisColor
                ;
            if(legendData){
                var legendValues = legendData.children()
                                            .select(function(leaf){ return leaf.value; })
                                            .array();

                

                scale = colorsFactory(legendValues);
            } else {
                scale = colorsFactory();
            }
            
            (this._legendColorScales || (this._legendColorScales = {}))[key] = scale;
        }

        return scale;
    },

    /**
     * Creates and initializes the base panel.
     */
    _initBasePanel: function() {
        var options = this.options;
        var basePanelParent = this.parent && this.parent._multiChartPanel;
        
        this.basePanel = new pvc.BasePanel(this, basePanelParent, {
            margins:  options.margins,
            paddings: options.paddings,
            size:     {width: options.width, height: options.height}
        });
    },

    /**
     * Creates and initializes the title panel,
     * if the title is specified.
     */
    _initTitlePanel: function(){
        var options = this.options;
        if (!def.empty(options.title)) {
            this.titlePanel = new pvc.TitlePanel(this, this.basePanel, {
                title:      options.title,
                font:       options.titleFont,
                anchor:     options.titlePosition,
                align:      options.titleAlign,
                margins:    options.titleMargins,
                paddings:   options.titlePaddings,
                titleSize:  options.titleSize,
                titleSizeMax: options.titleSizeMax
            });
        }
    },

    /**
     * Initializes the legend,
     * if the legend is active.
     */
    _initLegend: function(){
        if (this.options.legend) {
            this.legendGroupsList = [];
            this.legendGroups     = {};

            this._initLegendGroups();
            this._initLegendPanel();
        }
    },

    /**
     * Initializes the legend groups of a chart.
     *
     * The default implementation registers
     * one legend group for each existing data part value
     * for the dimension in {@link #legendSource}.
     *
     * Legend groups are registered with the id prefix "part"
     * followed by the corresponding part value.
     */
    _initLegendGroups: function(){
        var partValues = this._partValues() || [null],
            me = this;
        
        var isOn, onClick;
        
        switch(this.options.legendClickMode){
            case 'toggleSelected':
                if(!this.options.selectable){
                    isOn = def.retTrue;
                } else {
                    isOn = function(){
                        return !this.group.owner.selectedCount() || 
                               this.group.datums(null, {selected: true}).any();
                    };
                    
                    onClick = function(){
                        var on = this.group.datums(null, {selected: true}).any();
                        if(pvc.data.Data.setSelected(this.group.datums(), !on)){
                            me.updateSelections();
                        }
                    };
                }
                break;
                
            default: 
           // 'toggleVisible'
                isOn = function(){
                    return this.group.datums(null, {visible: true}).any();
                };
                
                onClick = function(){
                    if(pvc.data.Data.toggleVisible(this.group.datums())){
                        // Re-render chart
                        me.render(true, true, false);
                    }
                };
                break;
        }
        
        partValues.forEach(function(partValue){
            var partData = this._legendData(partValue);
            if(partData){
                var partColorScale = this._legendColorScale(partValue),
                    partShape = (!partValue || partValue === '0' ? 'square' : 'bar'),
                    legendGroup = {
                        id:        "part" + partValue,
                        type:      "discreteColorAndShape",
                        partValue: partValue,
                        partLabel: partData.label,
                        group:     partData,
                        items:     []
                    },
                    legendItems = legendGroup.items;
            
                partData
                    .children()
                    .each(function(itemData){
                        legendItems.push({
                            value:    itemData.value,
                            label:    itemData.label,
                            group:    itemData,
                            color:    partColorScale(itemData.value),
                            useRule:  undefined,
                            shape:    partShape,
                            isOn:     isOn,
                            click:    onClick
                        });
                    }, this);

                this._addLegendGroup(legendGroup);
            }
        }, this);
    },

    _addLegendGroup: function(legendGroup){
        var id = legendGroup.id;
        /*jshint expr:true */
        !def.hasOwn(this.legendGroups, id) || 
            def.fail.argumentInvalid('legendGroup', "Duplicate legend group id.");
        
        legendGroup.index = this.legendGroupsList.length;
        this.legendGroups[id] = legendGroup;
        this.legendGroupsList.push(legendGroup);
    },

    /**
     * Creates and initializes the legend panel.
     */
    _initLegendPanel: function(){
        var options = this.options;
        this.legendPanel = new pvc.LegendPanel(this, this.basePanel, {
            anchor:     options.legendPosition,
            legendSize: options.legendSize,
            legendSizeMax: options.legendSizeMax,
            font:       options.legendFont,
            align:      options.legendAlign,
            minMarginX: options.legendMinMarginX,
            minMarginY: options.legendMinMarginY,
            textMargin: options.legendTextMargin,
            padding:    options.legendPadding,
            shape:      options.legendShape,
            markerSize: options.legendMarkerSize,
            drawLine:   options.legendDrawLine,
            drawMarker: options.legendDrawMarker,
            margins:    options.legendMargins,
            paddings:   options.legendPaddings
        });
    },

    /**
     * Creates and initializes the multi-chart panel.
     */
    _initMultiChartPanel: function(){
        this._multiChartPanel = new pvc.MultiChartPanel(this, this.basePanel);
    },
    
    /**
     * Render the visualization.
     * If not pre-rendered, do it now.
     */
    render: function(bypassAnimation, recreate, reloadData) {
        try{
            if (!this.isPreRendered || recreate) {
                this._preRender({reloadData: reloadData});
            } else if(!this.parent && this.isPreRendered) {
                pvc.removeTipsyLegends();
            }

            this.basePanel.render({
                bypassAnimation: bypassAnimation, 
                recreate: recreate
             });
            
        } catch (e) {
            var isNoData = (e instanceof NoDataException);
            if (isNoData) {
                if(pvc.debug > 1){
                    pvc.log("No data found.");
                }

                this._addErrorPanelMessage("No data found", true);
            } else {
                // We don't know how to handle this
                pvc.logError(e.message);
                
                if(pvc.debug > 0){
                    this._addErrorPanelMessage("Error: " + e.message, false);
                }
                //throw e;
            }
        }
    },

    _addErrorPanelMessage: function(text, isNoData){
        var options = this.options,
            pvPanel = new pv.Panel()
                        .canvas(options.canvas)
                        .width(options.width)
                        .height(options.height),
            pvMsg = pvPanel.anchor("center").add(pv.Label)
                        .text(text);

        if(isNoData){
            this.extend(pvMsg, "noDataMessage_");
        }
        
        pvPanel.render();
    },

    /**
     * Animation
     */
    animate: function(start, end) {
        return this.basePanel.animate(start, end);
    },
    
    /**
     * Indicates if the chart is currently 
     * rendering the animation start phase.
     * <p>
     * Prefer using this function instead of {@link #animate} 
     * whenever its <tt>start</tt> or <tt>end</tt> arguments
     * involve a non-trivial calculation. 
     * </p>
     * 
     * @type boolean
     */
    isAnimatingStart: function() {
        return this.basePanel.isAnimatingStart();
    },
    
    /**
     * Method to set the data to the chart.
     * Expected object is the same as what comes from the CDA: 
     * {metadata: [], resultset: []}
     */
    setData: function(data, options) {
        this.setResultset(data.resultset);
        this.setMetadata(data.metadata);

        // TODO: Danger!
        $.extend(this.options, options);
    },
    
    /**
     * Sets the resultset that will be used to build the chart.
     */
    setResultset: function(resultset) {
        /*jshint expr:true */
        !this.parent || def.fail.operationInvalid("Can only set resultset on root chart.");
        
        this.resultset = resultset;
        if (!resultset.length) {
            pvc.log("Warning: Resultset is empty");
        }
    },

    /**
     * Sets the metadata that, optionally, 
     * will give more information for building the chart.
     */
    setMetadata: function(metadata) {
        /*jshint expr:true */
        !this.parent || def.fail.operationInvalid("Can only set resultset on root chart.");
        
        this.metadata = metadata;
        if (!metadata.length) {
            pvc.log("Warning: Metadata is empty");
        }
    },
    
    /**
     * This is the method to be used for the extension points
     * for the specific contents of the chart. already ge a pie
     * chart! Goes through the list of options and, if it
     * matches the prefix, execute that method on the mark.
     * WARNING: It's the user's responsibility to make sure that
     * unexisting methods don't blow this.
     */
    extend: function(mark, prefix, keyArgs) {
        // if mark is null or undefined, skip
        if (mark) {
            var logOut = pvc.debug >= 3 ? [] : null;
            
            var points = this.options.extensionPoints;
            if(points){
                if(mark.borderPanel){
                    mark = mark.borderPanel;
                }
                
                for (var p in points) {
                    // Starts with
                    if(p.indexOf(prefix) === 0){
                        var m = p.substring(prefix.length);

                        // Not everything that is passed to 'mark' argument
                        //  is actually a mark...(ex: scales)
                        // Not locked and
                        // Not intercepted and
                        var v = points[p];
                        if(mark.isLocked && mark.isLocked(m)){
                            if(logOut) {logOut.push(m + ": locked extension point!");}
                        } else if(mark.isIntercepted && mark.isIntercepted(m)) {
                            if(logOut) {logOut.push(m + ":" + JSON.stringify(v) + " (controlled)");}
                        } else {
                            if(logOut) {logOut.push(m + ": " + JSON.stringify(v)); }

                            // Extend object css and svg properties
                            if(v && (m === 'svg' || m === 'css') && typeof v === 'object'){
                                var v2 = mark.getStaticPropertyValue(m);
                                if(v2){
                                    v = def.copy(v2, v);
                                }
                            }
                            
                            // Distinguish between mark methods and properties
                            if (typeof mark[m] === "function") {
                                mark[m](v);
                            } else {
                                mark[m] = v;
                            }
                        }
                    }
                }

                if(logOut){
                    if(logOut.length){
                        pvc.log("Applying Extension Points for: '" + prefix + "'\n\t* " + logOut.join("\n\t* "));
                    } else if(pvc.debug >= 4) {
                        pvc.log("Applying Extension Points for: '" + prefix + "' (none)");
                    }
                }
            }
        } else if(pvc.debug >= 4){
            pvc.log("Applying Extension Points for: '" + prefix + "' (target mark does not exist)");
        }
    },

    /**
     * Obtains the specified extension point.
     * Arguments are concatenated with '_'.
     */
    _getExtension: function(extPoint) {
        var points = this.options.extensionPoints;
        if(!points){
            return undefined; // ~warning
        }

        extPoint = pvc.arraySlice.call(arguments).join('_');
        return points[extPoint];
    },
    
    /** 
     * Clears any selections and, if necessary,
     * re-renders the parts of the chart that show selected marks.
     * 
     * @type undefined
     * @virtual 
     */
    clearSelections: function(){
        if(this.data.owner.clearSelected()) {
            this.updateSelections();
        }
    },
    
    _suspendSelectionUpdate: function(){
        if(this === this.root) {
            this._updateSelectionSuspendCount++;
        } else {
            this.root._suspendSelectionUpdate();
        }
    },
    
    _resumeSelectionUpdate: function(){
        if(this === this.root) {
            if(this._updateSelectionSuspendCount > 0) {
                if(!(--this._updateSelectionSuspendCount)) {
                    if(this._selectionNeedsUpdate) {
                        this.updateSelections();
                    }
                }
            }
        } else {
            this._resumeSelectionUpdate();
        }
    },
    
    /** 
     * Re-renders the parts of the chart that show selected marks.
     * 
     * @type undefined
     * @virtual 
     */
    updateSelections: function(){
        if(this === this.root) {
            if(this._inUpdateSelections) {
                return;
            }
            
            if(this._updateSelectionSuspendCount) {
                this._selectionNeedsUpdate = true;
                return;
            }
            
            pvc.removeTipsyLegends();
            
            // Reentry control
            this._inUpdateSelections = true;
            try {
                // Fire action
                var action = this.options.selectionChangedAction;
                if(action){
                    var selections = this.data.selectedDatums();
                    action.call(null, selections);
                }
                
                /** Rendering afterwards allows the action to change the selection in between */
                this.basePanel._renderInteractive();
            } finally {
                this._inUpdateSelections   = false;
                this._selectionNeedsUpdate = false;
            }
        } else {
            this.root.updateSelections();
        }
    },
    
    _onUserSelection: function(datums){
        if(!datums || !datums.length){
            return datums;
        }
        
        if(this === this.root) {
            // Fire action
            var action = this.options.userSelectionAction;
            if(action){
                return action.call(null, datums) || datums;
            }
            
            return datums;
        }
        
        return this.root._onUserSelection(datums);
    },
    
    isOrientationVertical: function(orientation) {
        return (orientation || this.options.orientation) === "vertical";
    },

    isOrientationHorizontal: function(orientation) {
        return (orientation || this.options.orientation) == "horizontal";
    },
    
    /**
     * Disposes the chart, any of its panels and child charts.
     */
    dispose: function(){
        if(!this._disposed){
            
            // TODO: 
            
            this._disposed = true;
        }
    }
}, {
    // NOTE: undefined values are not considered by $.extend
    // and thus BasePanel does not receive null properties...
    defaultOptions: {
        canvas: null,

        width:  400,
        height: 300,
        
        multiChartLimit: null,
        multiChartWrapColumn: 3,
        
        orientation: 'vertical',
        
        extensionPoints:   undefined,
        
        visualRoles:       undefined,
        dimensions:        undefined,
        dimensionGroups:   undefined,
        readers:           undefined,
        
        ignoreNulls:       true, // whether to ignore or keep "null"-measure datums upon loading
        crosstabMode:      true,
        multiChartColumnIndexes: undefined,
        multiChartRowIndexes: undefined,
        isMultiValued:     false,
        seriesInRows:      false,
        measuresIndexes:   undefined,
        dataOptions:       undefined,
        
        timeSeries:        undefined,
        timeSeriesFormat:  undefined,

        animate: true,

        title:         null,
        titlePosition: "top", // options: bottom || left || right
        titleAlign:    "center", // left / right / center
        titleSize:     undefined,
        titleSizeMax:  undefined,
        titleMargins:  undefined,
        titlePaddings: undefined,
        titleFont:     undefined,
        
        legend:           false,
        legendPosition:   "bottom",
        legendFont:       undefined,
        legendSize:       undefined,
        legendSizeMax:    undefined,
        legendAlign:      undefined,
        legendMinMarginX: undefined,
        legendMinMarginY: undefined,
        legendTextMargin: undefined,
        legendPadding:    undefined, // ATTENTION: this is different from legendPaddings
        legendShape:      undefined,
        legendDrawLine:   undefined,
        legendDrawMarker: undefined,
        legendMarkerSize: undefined,
        legendMargins:    undefined,
        legendPaddings:   undefined,
        
        legendClickMode:  'toggleVisible', // toggleVisible || toggleSelected
        
        colors: null,

        secondAxis: false,
        secondAxisIdx: -1,
        secondAxisSeriesIndexes: undefined,
        secondAxisColor: undefined,
        secondAxisOwnColors: undefined, // false

        showTooltips: true,
        
        tooltipFormat: undefined,
        
        v1StyleTooltipFormat: function(s, c, v, datum) {
            return s + ", " + c + ":  " + this.chart.options.valueFormat(v) +
                   (datum && datum.percent ? ( " (" + datum.percent.label + ")") : "");
        },
        
        tipsySettings: {
            exclusionGroup: 'chart',
            gravity: "s",
            delayIn:  200,
            delayOut: 50,
            offset:   2,
            opacity:  0.8,
            html:     true,
            fade:     true,
            corners:  false,
            followMouse: false
        },
        
        valueFormat: function(d) {
            return pv.Format.number().fractionDigits(0, 2).format(d);
            // pv.Format.number().fractionDigits(0, 10).parse(d));
        },
        
        /* For numeric values in percentage */
        percentValueFormat: function(d){
            return pv.Format.number().fractionDigits(0, 2).format(d) + "%";
        },
        
        // Content/Plot area clicking
        clickable:  false,
        clickAction: null,
        doubleClickAction: null,
        doubleClickMaxDelay: 300, //ms
//      clickAction: function(s, c, v) {
//          pvc.log("You clicked on series " + s + ", category " + c + ", value " + v);
//      },
        
        hoverable:  false,
        selectable: false,
        
        selectionChangedAction: null,
        userSelectionAction: null, 
            
        // Use CTRL key to make fine-grained selections
        ctrlSelectMode: true,
        clearSelectionMode: 'emptySpaceClick', // or null <=> 'manual' (i.e., by code)
        
        // Selection - Rubber band
        rubberBandFill: 'rgba(203, 239, 163, 0.6)', // 'rgba(255, 127, 0, 0.15)',
        rubberBandLine: '#86fe00', //'rgb(255,127,0)',
        
        renderCallback: undefined,

        margins:  undefined,
        paddings: undefined,
        
        compatVersion: Infinity // numeric, 1 currently recognized
    }
});

/**
 * Base panel. 
 * A lot of them will exist here, with some common properties. 
 * Each class that extends pvc.base will be 
 * responsible to know how to use it.
 */
pvc.BasePanel = pvc.Abstract.extend({

    chart: null,
    parent: null,
    _children: null,
    type: pv.Panel, // default one
    
    /**
     * Total height of the panel.
     * Includes vertical paddings and margins.
     * Resolved.
     * @type number  
     */
    height: null,
    
    /**
     * Total width of the panel.
     * Includes horizontal paddings and margins.
     * Resolved.
     * @type number
     */
    width: null,
    
    anchor: "top",
    
    pvPanel: null, // padding/client pv panel (within border box, separated by paddings)
    
    margins:   null,
    paddings:  null,
    
    isRoot:    false,
    isTopRoot: false,
    root:      null, 
    topRoot:   null,
    
    _layoutInfo: null,

    /**
     * The data that the panel uses to obtain "data".
     * @type pvc.data.Data
     */
    data: null,

    dataPartValue: null,

    /**
     * Indicates if the top root panel is rendering with animation
     * and, if so, the current phase of animation.
     * 
     * <p>This property can assume the following values:</p>
     * <ul>
     * <li>0 - Not rendering with animation (may even not be rendering at all).</li>
     * <li>1 - Rendering the animation's <i>start</i> point,</li>
     * <li>2 - Rendering the animation's <i>end</i> point.</li>
     * </ul>
     * 
     * @see #animate
     * @see #isAnimatingStart
     * 
     * @type number
     */
    _isAnimating: 0,
    
    _isRubberBandSelecting: false,
    
    /**
     * Shared state between {@link _handleClick} and {@link #_handleDoubleClick}.
     */
    _ignoreClicks: 0,
    
    /**
     * Indicates the name of the role that should be used whenever a V1 dimension value is required.
     * Only the first dimension of the specified role is considered.
     * <p>
     * In a derived class use {@link Object.create} to override this object for only certain
     * v1 dimensions.
     * </p>
     * @ type string
     */
    _v1DimRoleName: {
        'series':   'series',
        'category': 'category',
        'value':    'value'
    },
    
    constructor: function(chart, parent, options) {
        
        // TODO: Danger...
        $.extend(this, options);
        
        this.chart = chart;

        this.position = {
            /*
            top:    0,
            right:  0,
            bottom: 0,
            left:   0
            */
        };
        
        this.margins  = new pvc.Sides(options && options.margins );
        this.paddings = new pvc.Sides(options && options.paddings);
        this.size     = new pvc.Size (options && options.size    );
        this.sizeMax  = new pvc.Size (options && options.sizeMax );
        
        if(!parent) {
            this.parent    = null;
            this.root      = this;
            this.topRoot   = this;
            this.isRoot    = true;
            this.isTopRoot = true;
            this.data      = this.chart.data;
            
        } else {
            this.parent    = parent;
            this.root      = parent.root;
            this.topRoot   = parent.topRoot;
            this.isTopRoot = false;
            this.isRoot    = (parent.chart !== chart);
            this.data      = parent.data; // TODO

            if(this.isRoot) {
                this.position.left = chart.left; 
                this.position.top  = chart.top;
            }
            
            parent._addChild(this);
        }
        
        /* Root panels do not need layout */
        if(this.isRoot) {
            this.anchor = null;
        }
    },
    
    /**
     * Adds a panel as child.
     */
    _addChild: function(child){
        // <Debug>
        /*jshint expr:true */
        child.parent === this || def.assert("Child has a != parent.");
        // </Debug>
        
        (this._children || (this._children = [])).push(child);
    },
    
    /* LAYOUT PHASE */
    
    /** 
     * Calculates and sets its size,
     * taking into account a specified total size.
     * 
     * @param {pvc.Size} [availableSize] The total size available for the panel.
     * <p>
     * On root panels this argument is not specified,
     * and the panels' current {@link #width} and {@link #height} are used as default. 
     * </p>
     * @param {pvc.Size} [referenceSize] The size that should be used for 
     * percentage size calculation. 
     * This will typically be the <i>client</i> size of the parent.
     * 
     * @param {object}  [keyArgs] Keyword arguments.
     * @param {boolean} [keyArgs.force=false] Indicates that the layout should be 
     * performed even if it has already been done. 
     */
    layout: function(availableSize, referenceSize, keyArgs){
        if(!this._layoutInfo || def.get(keyArgs, 'force', false)) {
            
            if(!referenceSize && availableSize){
                referenceSize = def.copyOwn(availableSize);
            }
            
            // Does this panel have a **desired** fixed size specified?
            
            // * size may have no specified components 
            // * referenceSize may be null
            var desiredSize = this.size.resolve(referenceSize);
            var sizeMax     = this.sizeMax.resolve(referenceSize);
            
            if(!availableSize) {
                if(desiredSize.width == null || desiredSize.height == null){
                    throw def.error.operationInvalid("Panel layout without width or height set.");
                }
                
                availableSize = def.copyOwn(desiredSize);
            }
            
            if(!referenceSize && availableSize){
                referenceSize = def.copyOwn(availableSize);
            }
            
            // Apply max size to available size
            if(sizeMax.width != null && availableSize.width > sizeMax.width){
                availableSize.width = sizeMax.width;
            }
            
            if(sizeMax.height != null && availableSize.height > sizeMax.height){
                availableSize.height = sizeMax.height;
            }
            
            var margins  = this.margins .resolve(referenceSize);
            var paddings = this.paddings.resolve(referenceSize);
            var spaceWidth  = margins.width  + paddings.width;
            var spaceHeight = margins.height + paddings.height;
            
            var availableClientSize = new pvc.Size(
                        Math.max(availableSize.width  - spaceWidth,  0),
                        Math.max(availableSize.height - spaceHeight, 0)
                    );
            
            var desiredClientSize = def.copyOwn(desiredSize);
            if(desiredClientSize.width != null){
                desiredClientSize.width = Math.max(desiredClientSize.width - spaceWidth, 0);
            }
            
            if(desiredClientSize.height != null){
                desiredClientSize.height = Math.max(desiredClientSize.height - spaceHeight, 0);
            }
            
            var layoutInfo = 
                this._layoutInfo = {
                referenceSize:       referenceSize,
                margins:             margins,
                paddings:            paddings,
                desiredClientSize:   desiredClientSize,
                clientSize:          availableClientSize
            };
            
            var clientSize = this._calcLayout(layoutInfo);
            
            var size;
            if(!clientSize){
                size = availableSize; // use all available size
            } else {
                layoutInfo.clientSize = clientSize;
                size = {
                    width:  clientSize.width  + spaceWidth,
                    height: clientSize.height + spaceHeight
                };
            }
            
            delete layoutInfo.desiredClientSize;
            
            this.width = size.width;
            this.height = size.height;
        }
    },
    
    /**
     * Override to calculate panel client size.
     * <p>
     * The default implementation performs a dock layout {@link #layout} on child panels
     * and uses all of the available size. 
     * </p>
     * 
     * @param {object} layoutInfo An object that is supplied with layout information
     * and on which to export custom layout information.
     * <p>
     * This object is later supplied to the method {@link #_createCore},
     * and can thus be used to store any layout by-product
     * relevant for the creation of the protovis marks and
     * that should be cleared whenever a layout becomes invalid.
     * </p>
     * <p>
     * The object is supplied with the following properties:
     * </p>
     * <ul>
     *    <li>referenceSize - size that should be used for percentage size calculation. 
     *        This will typically be the <i>client</i> size of the parent.
     *    </li>
     *    <li>margins - the resolved margins object. All components are present, possibly with the value 0.</li>
     *    <li>paddings - the resolved paddings object. All components are present, possibly with the value 0.</li>
     *    <li>desiredClientSize - the desired fixed client size. Do ignore a null width or height property value.</li>
     *    <li>clientSize - the available client size, already limited by a maximum size if specified.</li>
     * </ul>
     * <p>
     * Do not modify the contents of the objects of 
     * any of the supplied properties.
     * </p>
     * @virtual
     */
    _calcLayout: function(layoutInfo){
        
        if(!this._children) {
            return;
        }
        
        var margins, remSize, fillChildren;
        
        // May be expanded, see checkChildLayout
        var clientSize = def.copyOwn(layoutInfo.clientSize);
        
        function initLayout(){
            
            fillChildren = [];
            
            // Objects we can mutate
            margins = new pvc.Sides(0);
            remSize = def.copyOwn(clientSize);
        }
        
        var aolMap = pvc.BasePanel.orthogonalLength,
            aoMap  = pvc.BasePanel.relativeAnchor;
        
        var childKeyArgs = {force: true};
        var childReferenceSize = clientSize;
        var needRelayout = false;
        var relayoutCount = 0;
        var allowGrow = true;
        
        initLayout.call(this);
        
        // Lays out non-fill child panels and collects fill children
        this._children.forEach(layoutChildI, this);
        
        // Lays out collected fill-child panels
        fillChildren.forEach(layoutChildII, this);
        
        while(needRelayout){
            needRelayout = false;
            relayoutCount++;
            allowGrow = relayoutCount <= 1;
            
            initLayout.call(this);
            
            this._children.forEach(layoutChildI, this);
            
            fillChildren.forEach(layoutChildII, this);
        }
        
        return clientSize;
        
        // --------------------
        
        function layoutChildI(child) {
            var a = child.anchor;
            if(a === 'fill') {
                // These are layed out on the second phase
                fillChildren.push(child);
            } else if(a) { // requires layout
                /*jshint expr:true */
                def.hasOwn(aoMap, a) || def.fail.operationInvalid("Unknown anchor value '{0}'", [a]);
                
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                
                checkChildLayout.call(this, child);
                
                var align = pvc.parseAlign(a, child.align);
                
                positionChild.call(this, a, child, align);
                
                updateSide.call(this, a, child, align);
            }
        }
        
        function layoutChildII(child) {
            child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
            
            checkChildLayout(child);
            
            positionChild.call(this, 'fill', child);
        }
        
        function checkChildLayout(child){
            
            var addWidth = child.width - remSize.width;
            if(addWidth > 0){
                if(!allowGrow){
                    if(pvc.debug >= 2){
                        pvc.log("[Warning] Layout iterations limit reached.");
                    }
                } else {
                    needRelayout = true;
                    remSize.width += addWidth;
                    clientSize.width += addWidth;
                }
            }
            
            var addHeight = child.height - remSize.height;
            if(addHeight > 0){
                if(!allowGrow){
                    if(pvc.debug >= 2){
                        pvc.log("[Warning] Layout iterations limit reached.");
                    }
                } else {
                    needRelayout = true;
                    remSize.height += addHeight;
                    clientSize.height += addHeight;
                }
            }
        }
        
        function positionChild(side, child, align) {
            var sidePos;
            if(side === 'fill'){
                side = 'left';
                sidePos = margins.left + remSize.width / 2 - (child.width / 2);
                align = 'middle';
            } else {
                sidePos = margins[side];
            }
            
            var sideo, sideOPos;
            switch(align){
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    sideo = align;
                    sideOPos = margins[sideo];
                    break;
                
                case 'center':
                case 'middle':
                    if(side === 'left' || side === 'right'){
                        sideo    = 'top';
                        sideOPos = margins.top + (remSize.height / 2) - (child.height / 2);
                    } else {
                        sideo    = 'left';
                        sideOPos = margins.left + remSize.width / 2 - (child.width / 2);
                    }
                    break;
            }
            
            child.setPosition(
                    def.set({}, 
                        side,  sidePos, 
                        sideo, sideOPos));
        }
        
        // Decreases available size and increases margins
        function updateSide(side, child) {
            var sideol = aolMap[side];
            var olen   = child[sideol];
            
            margins[side]   += olen;
            remSize[sideol] -= olen;
        }
    },
    
    /** 
     * CREATION PHASE
     * 
     * Where the protovis main panel, and any other marks, are created.
     * 
     * If the layout has not been performed it is so now.
     */
    _create: function(force) {
        if(!this.pvPanel || force) {
            
            this.pvPanel = null;
            
            /* Layout */
            this.layout();
            
            var margins  = this._layoutInfo.margins;
            var paddings = this._layoutInfo.paddings;
            
            /* Protovis Panel */
            if(this.isTopRoot) {
                this.pvRootPanel = 
                this.pvPanel = new pv.Panel().canvas(this.chart.options.canvas);
                
                if(margins.width > 0 || margins.height > 0){
                    this.pvPanel
                        .width (this.width )
                        .height(this.height);
                    
                    // As there is no parent panel,
                    // the margins cannot be accomplished by positioning
                    // on the parent panel and sizing.
                    // We thus create another panel to be a child of pvPanel
                   
                    this.pvPanel = this.pvPanel.add(pv.Panel);
                }
            } else {
                this.pvPanel = this.parent.pvPanel.add(this.type);
            }
            
            var pvBorderPanel = this.pvPanel;
            
            // Set panel size
            var width  = this.width  - margins.width;
            var height = this.height - margins.height;
            pvBorderPanel
                .width (width)
                .height(height);
            
            // Set panel positions
            var hasPositions = {};
            def.eachOwn(this.position, function(v, side){
                pvBorderPanel[side](v + margins[side]);
                hasPositions[this.anchorLength(side)] = true;
            }, this);
            
            if(!hasPositions.width && margins.left > 0){
                pvBorderPanel.left(margins.left);
            }
            
            if(!hasPositions.height && margins.top > 0){
                pvBorderPanel.top(margins.top);
            }
            
            // Check padding
            if(paddings.width > 0 || paddings.height > 0){
                // We create separate border (outer) and inner (padding) panels
                this.pvPanel = pvBorderPanel.add(pv.Panel)
                                   .width (width  - paddings.width )
                                   .height(height - paddings.height)
                                   .left(paddings.left)
                                   .top (paddings.top );
            }
            
            pvBorderPanel.paddingPanel = this.pvPanel;
            this.pvPanel.borderPanel = pvBorderPanel;
            
            /* Protovis marks that are pvcPanel specific,
             * and/or #_creates child panels.
             */
            this._createCore(this._layoutInfo);
            
            /* RubberBand */
            if (this.isTopRoot && this.chart.options.selectable && pv.renderer() !== 'batik'){
                this._initRubberBand();
            }

            /* Extensions */
            this.applyExtensions();
        }
    },
    
    /**
     * Override to create specific protovis components for a given panel.
     * 
     * The default implementation calls {@link #_create} on each child panel.
     * 
     * @param {object} layoutInfo The object with layout information 
     * "exported" by {@link #_calcLayout}.
     * 
     * @virtual
     */
    _createCore: function(layoutInfo){
        if(this._children) {
            this._children.forEach(function(child){
                child._create();
            });
        }
    },
    
    /** 
     * RENDER PHASE
     * 
     * Where protovis components are rendered.
     * 
     * If the creation phase has not been performed it is so now.
     */
    
    /**
     * Renders the top root panel.
     * <p>
     * The render is always performed from the top root panel,
     * independently of the panel on which the method is called.
     * </p>
     * 
     * @param {object} [keyArgs] Keyword arguments.
     * @param {boolean} [keyArgs.bypassAnimation=false] Indicates that animation should not be performed.
     * @param {boolean} [keyArgs.recreate=false] Indicates that the panel and its descendants should be recreated.
     */
    render: function(keyArgs){
        
        if(!this.isTopRoot) {
            return this.topRoot.render(keyArgs);
        }
        
        this._create(def.get(keyArgs, 'recreate', false));
        
        var chart = this.chart,
            options = chart.options;
        
        if (options.renderCallback) {
            options.renderCallback.call(chart);
        }
        
        var pvPanel = this.pvRootPanel;
        
        this._isAnimating = options.animate && !def.get(keyArgs, 'bypassAnimation', false) ? 1 : 0;
        try {
            // When animating, renders the animation's 'start' point
            pvPanel.render();
            
            // Transition to the animation's 'end' point
            if (this._isAnimating) {
                this._isAnimating = 2;
                
                var me = this;
                pvPanel
                    .transition()
                    .duration(2000)
                    .ease("cubic-in-out")
                    .start(function(){
                        me._isAnimating = 0;
                        me._onRenderEnd(true);
                    });
            } else {
                this._onRenderEnd(false);
            }
        } finally {
            this._isAnimating = 0;
        }
    },
    
    /**
     * Called when a render has ended.
     * When the render performed an animation
     * and the 'animated' argument will have the value 'true'.
     *
     * The default implementation calls each child panel's
     * #_onRenderEnd method.
     * @virtual
     */
    _onRenderEnd: function(animated){
        if(this._children){
            this._children.forEach(function(child){
                child._onRenderEnd(animated);
            });
        }
    },
    
    /**
     * The default implementation renders
     * the marks returned by #_getSignums, 
     * or this.pvPanel if none is returned (and it has no children)
     * which is generally in excess of what actually requires
     * to be re-rendered.
     * The call is then propagated to any child panels.
     * 
     * @virtual
     */
    _renderInteractive: function(){
        var marks = this._getSignums();
        if(marks && marks.length){
            marks.forEach(function(mark){ mark.render(); });
        } else if(!this._children) {
            this.pvPanel.render();
        }
        
        if(this._children){
            this._children.forEach(function(child){
                child._renderInteractive();
            });
        }
    },

    /**
     * Returns an array of marks whose instances are associated to a datum, or null.
     * @virtual
     */
    _getSignums: function(){
        return null;
    },
    
    
    /* ANIMATION */
    
    animate: function(start, end) {
        return (this.topRoot._isAnimating === 1) ? start : end;
    },
    
    /**
     * Indicates if the panel is currently 
     * rendering the animation start phase.
     * <p>
     * Prefer using this function instead of {@link #animate} 
     * whenever its <tt>start</tt> or <tt>end</tt> arguments
     * involve a non-trivial calculation. 
     * </p>
     * 
     * @type boolean
     */
    isAnimatingStart: function() {
        return (this.topRoot._isAnimating === 1);
    },
    
    /**
     * Indicates if the panel is currently 
     * rendering animation.
     * 
     * @type boolean
     */
    isAnimating: function() {
        return (this.topRoot._isAnimating > 0);
    },
    
    
    /* EXTENSION */
    
    /**
     * Override to apply specific extensions points.
     * @virtual
     */
    applyExtensions: function(){
        if (this.isRoot) {
            this.extend(this.pvPanel, "base_");
        }
    },

    /**
     * This is the method to be used for the extension points
     * for the specific contents of the chart. already ge a pie
     * chart! Goes through the list of options and, if it
     * matches the prefix, execute that method on the mark.
     * WARNING: It's the user's responsibility to make sure that
     * unexisting methods don't blow this.
     */
    extend: function(mark, prefix) {
        this.chart.extend(mark, prefix);
    },

    /**
     * Obtains the specified extension point.
     * Arguments are concatenated with '_'.
     */
    _getExtension: function(extPoint) {
        return this.chart._getExtension.apply(this.chart, arguments);
    },

    /* SIZE & POSITION */
    setPosition: function(position){
        for(var side in position){
            if(def.hasOwn(pvc.Sides.namesSet, side)){
                var s = position[side]; 
                if(s === null) {
                    delete this.position[side];
                } else {
                    s = +s; // -> to number
                    if(!isNaN(s) && isFinite(s)){
                        this.position[side] = s;
                    }
                }
            }
        }
    },
    
    createAnchoredSize: function(anchorLength, size){
        if (this.isAnchorTopOrBottom()) {
            return new pvc.Size(size.width, Math.min(size.height, anchorLength));
        } 
        return new pvc.Size(Math.min(size.width, anchorLength), size.height);
    },

    /**
     * Returns the underlying protovis Panel.
     * If 'layer' is specified returns
     * the protovis panel for the specified layer name.
     */
    getPvPanel: function(layer) {
        if(!layer){
            return this.pvPanel;
        }

        if(!this.parent){
            throw def.error.operationInvalid("Layers are not possible in a root panel.");
        }

        if(!this.pvPanel){
            throw def.error.operationInvalid(
               "Cannot access layer panels without having created the main panel.");
        }

        var pvPanel = null;
        if(!this._layers){
            this._layers = {};
        } else {
            pvPanel = this._layers[layer];
        }

        if(!pvPanel){
            var pvParentPanel = this.parent.pvPanel;
            var pvBorderPanel = 
                pvPanel = pvParentPanel.borderPanel.add(this.type)
                              .extend(this.pvPanel.borderPanel);
            
            if(pvParentPanel !== pvParentPanel.borderPanel){
                pvPanel = pvBorderPanel.add(pv.Panel)
                                       .extend(this.pvPanel);
            }
            
            pvBorderPanel.paddingPanel = pvPanel;
            pvPanel.borderPanel = pvBorderPanel;
            
            this.initLayerPanel(pvPanel, layer);

            this._layers[layer] = pvPanel;
        }

        return pvPanel;
    },
    
    /**
     * Initializes a new layer panel.
     * @virtual
     */
    initLayerPanel: function(pvPanel, layer){
    },
    
    /* EVENTS & VISUALIZATION CONTEXT */
    _getV1DimName: function(v1Dim){
        var dimNames = this._v1DimName || (this._v1DimNameCache = {});
        var dimName  = dimNames[v1Dim];
        if(dimName == null) {
            var role = this.chart.visualRoles(this._v1DimRoleName[v1Dim], {assertExists: false});
            dimName = role ? role.firstDimensionName() : '';
            dimNames[v1Dim] = dimName;
        }
        
        return dimName;
    },
    
    /**
     * Creates the visualization context of the panel.
     * <p>
     * Override to use a specific visualization context class. 
     * </p>
     * 
     * @param {pv.Mark} mark The protovis mark being rendered or targeted by an event.
     * @param {object} [event] An event object.
     * @type pvc.visual.Context
     * @virtual
     */
    _createContext: function(mark, ev){
        return new pvc.visual.Context(this, mark, ev);
    },
    
    /**
     * Updates the visualization context of the panel.
     * <p>
     * Override to perform specific updates. 
     * </p>
     * 
     * @param {pvc.visual.Context} context The panel's visualization context.
     * @param {pv.Mark} mark The protovis mark being rendered or targeted by an event.
     * @param {object} [event] An event object.
     * @type pvc.visual.Context
     * @virtual
     */
    _updateContext: function(context, mark, ev){
        /*global visualContext_update:true */
        visualContext_update.call(context, mark, ev);
    },
    
    _getContext: function(mark, ev){
        if(!this._context) {
            this._context = this._createContext(mark, ev);
        } else {
            this._updateContext(this._context, mark, ev);
        }
        
        return this._context;
    },
    
    _isTooltipEnabled: function(){
        return !this.isRubberBandSelecting() && !this.isAnimating();
    },
    
    /* TOOLTIP */ 
    _addPropTooltip: function(mark, keyArgs){
        var myself = this,
            tipsyEvent = def.get(keyArgs, 'tipsyEvent'), 
            options = this.chart.options,
            tipsySettings = Object.create(options.tipsySettings),  
            buildTooltip;
        
        tipsySettings.isEnabled = this._isTooltipEnabled.bind(this);
        
        if(!tipsyEvent) {
//          switch(mark.type) {
//                case 'dot':
//                case 'line':
//                case 'area':
//                    this._requirePointEvent();
//                    tipsyEvent = 'point';
//                    tipsySettings.usesPoint = true;
//                    break;
                
//                default:
                    tipsyEvent = 'mouseover';
//            }
        }
        
        var tooltipFormat = options.tooltipFormat;
        if(!tooltipFormat) {
            buildTooltip = this._buildTooltip;
        } else {
            buildTooltip = function(context){
                return tooltipFormat.call(context, 
                                context.getV1Series(),
                                context.getV1Category(),
                                context.getV1Value() || '',
                                context.scene.datum);
            };
        }
        
        mark.localProperty("tooltip")
            /* Lazy tooltip creation, when requested */
            .tooltip(function(){
                var tooltip,
                    // Capture current context
                    context = myself._createContext(mark, null);
                
                // No group or datum?
                if(!context.scene.atoms) {
                    return "";
                }
                
                return function() {
                    if(tooltip == null) {
                        tooltip = buildTooltip.call(myself, context);
                        context = null; // release context;
                    } 
                    return tooltip; 
                };
            })
            /* Prevent browser tooltip */
            .title(function(){
                return '';
            })
            .event(tipsyEvent, pv.Behavior.tipsy(tipsySettings || options.tipsySettings));
    },

    _requirePointEvent: function(radius){
        if(!this.isTopRoot) {
            return this.topRoot._requirePointEvent(radius);
        }

        if(!this._attachedPointEvent){

            // Fire point and unpoint events
            this.pvPanel
                .events('all')
                .event("mousemove", pv.Behavior.point(radius || 20));

            this._attachedPointEvent = true;
        }
    },

    _buildTooltip: function(context){

        var chart = this.chart,
            data = chart.data,
            visibleKeyArgs = {visible: true},
            scene = context.scene,
            group = scene.group,
            isMultiDatumGroup = group && group._datums.length > 1;
        
        // Single null datum?
        if(!isMultiDatumGroup && scene.datum.isNull) {
            return "";
        }
        
        var tooltip = [],
            /*
             * TODO: Big HACK to prevent percentages from
             * showing up in the Lines of BarLine
             */
            playingPercentMap = context.panel.stacked === false ? 
                                null :
                                data.type.getPlayingPercentVisualRoleDimensionMap(),
            commonAtoms = isMultiDatumGroup ? group.atoms : scene.datum.atoms;
        
        function addDim(escapedDimLabel, label){
            tooltip.push('<b>' + escapedDimLabel + "</b>: " + (def.html.escape(label) || " - ") + '<br/>');
        }
        
        function calcPercent(atom, dimName) {
            var pct;
            if(group) {
                pct = group.dimensions(dimName).percentOverParent(visibleKeyArgs);
            } else {
                pct = data.dimensions(dimName).percent(atom.value);
            }
            
            return chart.options.valueFormat.call(null, Math.round(pct * 1000) / 10) + "%";
        }
        
        def.each(commonAtoms, function(atom, dimName){
            var dimType = atom.dimension.type;
            if(!dimType.isHidden){
                if(!isMultiDatumGroup || atom.value != null) {
                    var valueLabel = atom.label;
                    if(playingPercentMap && playingPercentMap.has(dimName)) {
                        valueLabel += " (" + calcPercent(atom, dimName) + ")";
                    }
                    
                    addDim(def.html.escape(atom.dimension.type.label), valueLabel);
                }
            }
        });
        
        if(isMultiDatumGroup) {
            tooltip.push('<hr />');
            tooltip.push("<b>#</b>: " + group._datums.length + '<br/>');
            
            group.freeDimensionNames().forEach(function(dimName){
                var dim = group.dimensions(dimName);
                if(!dim.type.isHidden){
                    var dimLabel = def.html.escape(dim.type.label),
                        valueLabel;
                    
                    if(dim.type.valueType === Number) {
                        // Sum
                        valueLabel = dim.format(dim.sum(visibleKeyArgs));
                        if(playingPercentMap && playingPercentMap.has(dimName)) {
                            valueLabel += " (" + calcPercent(null, dimName) + ")";
                        }
                        
                        dimLabel = "&sum; " + dimLabel;
                    } else {
                        valueLabel = dim.atoms(visibleKeyArgs).map(function(atom){ return atom.label || "- "; }).join(", ");
                    }
                    
                    addDim(dimLabel, valueLabel);
                }
            });
        }
        
        return '<div style="text-align: left;">' + tooltip.join('\n') + '</div>';
    },
    
    /* CLICK & DOUBLE-CLICK */
    _addPropClick: function(mark){
        var myself = this;
        
        function onClick(){
            var ev = arguments[arguments.length - 1];
            return myself._handleClick(this, ev);
        }
        
        mark.cursor("pointer")
            .event("click", onClick);
    },

    _addPropDoubleClick: function(mark){
        var myself = this;
        
        function onDoubleClick(){
            var ev = arguments[arguments.length - 1];
            return myself._handleDoubleClick(this, ev);
        }
        
        mark.cursor("pointer")
            .event("dblclick", onDoubleClick);
    },
    
    _handleDoubleClick: function(mark, ev){
        var handler = this.chart.options.doubleClickAction;
        if(handler){
            this._ignoreClicks = 2;
            
            var context = this._getContext(mark, ev);
            this._onDoubleClick(context);
        }
    },
    
    _onDoubleClick: function(context){
        var handler = this.chart.options.doubleClickAction;
        handler.call(context, 
                /* V1 ARGS */
                context.getV1Series(),
                context.getV1Category(),
                context.getV1Value(),
                context.event);
    },
    
    _shouldHandleClick: function(keyArgs){
        var options = keyArgs || this.chart.options;
        return options.selectable || (options.clickable && options.clickAction);
    },
    
    _handleClick: function(mark, ev){
        if(!this._shouldHandleClick()){
            return;
        }

        var options = this.chart.options,
            context;
        
        if(!options.doubleClickAction){
            // Use shared context
            context = this._getContext(mark, ev);
            this._handleClickCore(context);
        } else {
            // Delay click evaluation so that
            // it may be canceled if double click meanwhile
            // fires.
            var myself = this;
            
            // Capture current context
            context = this._createContext(mark, ev);
            window.setTimeout(
                function(){
                    myself._handleClickCore.call(myself, context);
                },
                options.doubleClickMaxDelay || 300);

        }
    },

    _handleClickCore: function(context){
        if(this._ignoreClicks) {
            this._ignoreClicks--;
        } else {
            this._onClick(context);
            
            if(this.chart.options.selectable && context.scene.datum){
                this._onSelect(context);
            }
        }
    },
    
    _onClick: function(context){
        var handler = this.chart.options.clickAction;
        if(handler){
            handler.call(context, 
                    /* V1 ARGS */
                    context.getV1Series(),
                    context.getV1Category(),
                    context.getV1Value(),
                    context.event);
        }
    },
    
    /* SELECTION & RUBBER-BAND */
    _onSelect: function(context){
        var datums = context.scene.datums().array(),
            chart  = this.chart;
        
        datums = this._onUserSelection(datums);
        
        if(chart.options.ctrlSelectMode && !context.event.ctrlKey){
            chart.data.owner.clearSelected();
            
            pvc.data.Data.setSelected(datums, true);
        } else {
            pvc.data.Data.toggleSelected(datums);
        }
        
        this._onSelectionChanged();
    },
    
    _onUserSelection: function(datums){
        return this.chart._onUserSelection(datums);
    },
    
    _onSelectionChanged: function(){
        this.chart.updateSelections();
    },
    
    isRubberBandSelecting: function(){
        return this.topRoot._isRubberBandSelecting;
    },
    
    /**
     * Add rubber-band functionality to panel.
     * Override to prevent rubber band selection.
     * 
     * @virtual
     */
    _initRubberBand: function(){
        var myself = this,
            chart = this.chart,
            options  = chart.options,
            data = chart.data;

        var dMin = 10; // Minimum dx or dy for a rubber band selection to be relevant

        this._isRubberBandSelecting = false;

        // Rubber band
        var rubberPvParentPanel = this.pvPanel.borderPanel,
            toScreen;
        
        var selectBar = this.selectBar = rubberPvParentPanel.add(pv.Bar)
            .visible(function() { return myself._isRubberBandSelecting; } )
            .left(function() { return this.parent.selectionRect.x; })
            .top(function() { return this.parent.selectionRect.y; })
            .width(function() { return this.parent.selectionRect.dx; })
            .height(function() { return this.parent.selectionRect.dy; })
            .fillStyle(options.rubberBandFill)
            .strokeStyle(options.rubberBandLine);
        
        // Rubber band selection behavior definition
        if(!this._getExtension('base', 'fillStyle')){
            rubberPvParentPanel.fillStyle(pvc.invisibleFill);
        }
        
        // NOTE: Rubber band coordinates are always transformed to screen coordinates (see 'select' and 'selectend' events)
         
        var selectionEndedDate;
        rubberPvParentPanel
            .event('mousedown', pv.Behavior.selector(false))
            .event('select', function(){
                if(!myself._isRubberBandSelecting && !myself.isAnimating()){
                    var rb = this.selectionRect;
                    if(Math.sqrt(rb.dx * rb.dx + rb.dy * rb.dy) <= dMin){
                        return;
                    }

                    myself._isRubberBandSelecting = true;
                    
                    if(!toScreen){
                        toScreen = rubberPvParentPanel.toScreenTransform();
                    }
                    
                    myself.rubberBand = rb.clone().apply(toScreen);
                }

                selectBar.render();
            })
            .event('selectend', function(){
                if(myself._isRubberBandSelecting){
                    var ev = arguments[arguments.length - 1];
                    
                    if(!toScreen){
                        toScreen = rubberPvParentPanel.toScreenTransform();
                    }
                    
                    myself.rubberBand = this.selectionRect.clone().apply(toScreen);
                    
                    myself._isRubberBandSelecting = false;
                    selectBar.render(); // hide rubber band
                    
                    // Process selection
                    myself._dispatchRubberBandSelectionTop(ev);
                    
                    selectionEndedDate = new Date();
                    
                    myself.rubberBand = null;
                }
            });
        
        if(options.clearSelectionMode === 'emptySpaceClick'){
            rubberPvParentPanel
                .event("click", function() {
                    // It happens sometimes that the click is fired 
                    //  after mouse up, ending up clearing a just made selection.
                    if(selectionEndedDate){
                        var timeSpan = new Date() - selectionEndedDate;
                        if(timeSpan < 300){
                            selectionEndedDate = null;
                            return;
                        }
                    }
                    
                    if(data.owner.clearSelected()) {
                        myself._onSelectionChanged();
                    }
                });
        }
    },
    
    _dispatchRubberBandSelectionTop: function(ev){
        /* Only update selection, which is a global op, after all selection changes */
        
        if(pvc.debug >= 3) {
            pvc.log('rubberBand ' + JSON.stringify(this.rubberBand));
        }
        
        var chart = this.chart;
        chart._suspendSelectionUpdate();
        try {
            if(!ev.ctrlKey && chart.options.ctrlSelectMode){
                chart.data.owner.clearSelected();
            }
            
            this._dispatchRubberBandSelection();
            
        } finally {
            chart._resumeSelectionUpdate();
        }
    },
    
    // Callback to handle end of rubber band selection
    _dispatchRubberBandSelection: function(ev){
        // Ask the panel for signum selections
        var datumsByKey = {},
            keyArgs = {toggle: false};
        if(this._detectDatumsUnderRubberBand(datumsByKey, this.rubberBand, keyArgs)) {
            var selectedDatums = def.own(datumsByKey); 
            
            selectedDatums = this._onUserSelection(selectedDatums);
            
            var changed;
            if(keyArgs.toggle){
                pvc.data.Data.toggleSelected(selectedDatums);
                changed = true;
            } else {
                changed = pvc.data.Data.setSelected(selectedDatums, true);
            }
            
            if(changed) {
                this._onSelectionChanged();
            }
        }
        
        // --------------
        
        if(this._children) {
            this._children.forEach(function(child){
                child.rubberBand = this.rubberBand;
                child._dispatchRubberBandSelection(child);
            }, this);
        }
    },
    
    /**
     * The default implementation obtains
     * datums associated with the instances of 
     * marks returned by #_getSignums.
     * 
     * <p>
     * Override to provide a specific
     * selection detection implementation.
     * </p>
     * 
     * @param {object} datumsByKey The map that receives the found datums, indexed by their key. 
     * @param {pvc.Rect} rb The rubber band to use. The default value is the panel's current rubber band.
     * @param {object} keyArgs Keyword arguments.
     * @param {boolean} [keyArgs.toggle=false] Returns a value that indicates to the caller that the selection should be toggled.
     * 
     * @returns {boolean} <tt>true</tt> if any datum was found under the rubber band.
     * 
     * @virtual
     */
    _detectDatumsUnderRubberBand: function(datumsByKey, rb, keyArgs){
        var any = false,
            selectableMarks = this._getSignums();
        
        if(selectableMarks){
            selectableMarks.forEach(function(mark){
                this._forEachMarkDatumUnderRubberBand(mark, function(datum){
                    datumsByKey[datum.key] = datum;
                    any = true;
                }, this, rb);
            }, this);
        }
        
        return any;
    },
    
    _forEachMarkDatumUnderRubberBand: function(mark, fun, ctx, rb){
        if(!rb) {
            rb = this.rubberBand;
        }
        
        function processShape(shape, instance) {
            // pvc.log(datum.key + ": " + JSON.stringify(shape) + " intersects? " + shape.intersectsRect(this.rubberBand));
            if (shape.intersectsRect(rb)){
                var group = instance.group;
                var datums = group ? group._datums : def.array.as(instance.datum);
                if(datums) {
                    datums.forEach(function(datum){
                        if(!datum.isNull) {
                            if(pvc.debug >= 4) {
                                pvc.log(datum.key + ": " + JSON.stringify(shape) + " intersects? true " + mark.type.toUpperCase());
                            }
                    
                            fun.call(ctx, datum);
                        }
                    });
                }
            }
        }
        
        // center, partial and total (not implemented)
        var selectionMode = def.get(mark, 'rubberBandSelectionMode', 'partial');
        var shapeMethod = (selectionMode === 'center') ? 'getInstanceCenterPoint' : 'getInstanceShape';
        
        if(mark.type === 'area' || mark.type === 'line'){
            var instancePrev;
            
            mark.forEachSignumInstance(function(instance, toScreen){
                if(!instance.visible || instance.isBreak || (instance.datum && instance.datum.isNull)) {
                    // Break the line
                    instancePrev = null;
                } else {
                    if(instancePrev){
                        var shape = mark[shapeMethod](instancePrev, instance).apply(toScreen);
                        processShape(shape, instancePrev);
                    }
    
                    instancePrev = instance;
                }
            }, this);
        } else {
            mark.forEachSignumInstance(function(instance, toScreen){
                if(!instance.isBreak && instance.visible) {
                    var shape = mark[shapeMethod](instance).apply(toScreen);
                    processShape(shape, instance);
                }
            }, this);
        }
    },
    
    /* ANCHORS & ORIENTATION */
    
    /**
     * Returns true if the anchor is one of the values 'top' or
     * 'bottom'.
     */
    isAnchorTopOrBottom: function(anchor) {
        if (!anchor) {
            anchor = this.anchor;
        }
        return anchor === "top" || anchor === "bottom";
    },

    anchorOrtho: function(anchor) {
        if (!anchor) {
            anchor = this.anchor;
        }
        return pvc.BasePanel.relativeAnchor[anchor];
    },

    anchorOrthoMirror: function(anchor) {
        if (!anchor) {
            anchor = this.anchor;
        }
        return pvc.BasePanel.relativeAnchorMirror[anchor];
    },

    anchorOpposite: function(anchor) {
        if (!anchor) {
            anchor = this.anchor;
        }
        return pvc.BasePanel.oppositeAnchor[anchor];
    },

    anchorLength: function(anchor) {
        if (!anchor) {
            anchor = this.anchor;
        }
        return pvc.BasePanel.parallelLength[anchor];
    },

    anchorOrthoLength: function(anchor) {
        if (!anchor) {
            anchor = this.anchor;
        }
        return pvc.BasePanel.orthogonalLength[anchor];
    },

    isOrientationVertical: function(orientation) {
        return this.chart.isOrientationVertical(orientation);
    },

    isOrientationHorizontal: function(orientation) {
        return this.chart.isOrientationHorizontal(orientation);
    }
}, {
    // Determine what is the associated method to
    // call to position the labels correctly
    relativeAnchor: {
        top: "left",
        bottom: "left",
        left: "bottom",
        right: "bottom"
    },
    
    leftBottomAnchor: {
        top:    "bottom",
        bottom: "bottom",
        left:   "left",
        right:  "left"
    },
    
    leftTopAnchor: {
        top:    "top",
        bottom: "top",
        left:   "left",
        right:  "left"
    },
    
    horizontalAlign: {
        top:    "right",
        bottom: "left",
        middle: "center",
        right:  "right",
        left:   "left",
        center: "center"
    },
    
    verticalAlign: {
        top:    "top",
        bottom: "bottom",
        middle: "middle",
        right:  "top",
        left:   "bottom",
        center: "middle"
    },

    relativeAnchorMirror: {
        top: "right",
        bottom: "right",
        left: "top",
        right: "top"
    },

    oppositeAnchor: {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
    },

    parallelLength: {
        top: "width",
        bottom: "width",
        right: "height",
        left: "height"
    },

    orthogonalLength: {
        top: "height",
        bottom: "height",
        right: "width",
        left: "width"
    },

    oppositeLength: {
        width:  "height",
        height: "width"
    }
});

pvc.MultiChartPanel = pvc.BasePanel.extend({
    anchor: 'fill',
    
    /**
     * Implements multi-chart layout.
     * Currently, it's essentially a flow-layout
     * 
     * @override
     */
    _calcLayout: function(layoutInfo){
        var clientSize = def.copyOwn(layoutInfo.clientSize);
        var chart = this.chart;
        var data  = chart.visualRoles('multiChartColumn')
                         .flatten(chart.data, {visible: true});
        
        var options = chart.options;
        
        // multiChartLimit can be Infinity
        var multiChartLimit = Number(options.multiChartLimit);
        if(isNaN(multiChartLimit) || multiChartLimit < 1) {
            multiChartLimit = Infinity;
        }
        
        var leafCount = data._children.length;
        var count = Math.min(leafCount, multiChartLimit);
        if(count === 0) {
            // Shows no message to the user.
            // An empty chart, like when all series are hidden with the legend.
            return;
        }
        
        // multiChartWrapColumn can be Infinity
        var multiChartWrapColumn = Number(options.multiChartWrapColumn);
        if(isNaN(multiChartWrapColumn) || multiChartLimit < 1) {
            multiChartWrapColumn = 3;
        }
        
        var colCount = Math.min(count, multiChartWrapColumn);
        var rowCount = Math.ceil(count / colCount);
        
        // ----------------------
        // Small Chart Size determination
        
        // Evenly divide available width and height by all small charts 
        var width  = clientSize.width  / colCount;
        var height = clientSize.height / rowCount;
        
        // Determine min width and min height
        var minWidth = Number(options.multiChartMinWidth);
        if(isNaN(minWidth) || !isFinite(minWidth) || minWidth < 0) {
            // Assume the available width is dimensioned to fit the specified number of columns
            if(isFinite(multiChartWrapColumn)){
                minWidth = width;
            }
        }
        
        var minHeight = Number(options.multiChartMinHeight);
        if(isNaN(minHeight) || !isFinite(minHeight) || minHeight < 0) {
            if(minWidth > 0){
                minHeight = this._calulateHeight(minWidth);
            } else {
                minHeight = null;
            }
        }
        
        if(minWidth == null && minHeight > 0){
            minWidth = pvc.goldenRatio * minHeight;
        }
        
        // ----------------------
        
        if(minWidth > 0 && width < minWidth){
            width = minWidth;
            clientSize.width = width * colCount;
        }
        
        if(minHeight > 0 && height < minHeight){
            height = minHeight;
            clientSize.height = height * rowCount;
        }
        
        def.set(
           layoutInfo, 
            'data',  data,
            'count', count,
            'width',  width,
            'height', height,
            'colCount',  colCount);
        
        return clientSize;
    },
    
    _calulateHeight: function(totalWidth){
        var chart = this.chart;
        
        if(chart instanceof pvc.PieChart){
            // These are square bounded
            return totalWidth;
        }
        
        var options = chart.options;
        var chromeHeight = 0;
        var chromeWidth  = 0;
        
        // Try to estimate "chrome" of small chart
        if(chart instanceof pvc.CartesianAbstract){
            var isVertical = chart.isOrientationVertical();
            var size;
            if(options.showXScale){
                size = parseFloat(options.xAxisSize || 
                                  (isVertical ? options.baseAxisSize : options.orthoAxisSize) ||
                                  options.axisSize);
                if(isNaN(size)){
                    size = totalWidth * 0.4;
                }
                
                if(isVertical){
                    chromeHeight += size;
                } else {
                    chromeWidth += size;
                }
            }
            
            if(options.showYScale){
                size = parseFloat(options.yAxisSize || 
                                  (isVertical ? options.orthoAxisSize : options.baseAxisSize) ||
                                  options.axisSize);
                if(isNaN(size)){
                    size = totalWidth * 0.4;
                }
                
                if(isVertical){
                    chromeWidth += size;
                } else {
                    chromeHeight += size;
                }
            }
        }
        
        var contentWidth  = Math.max(totalWidth - chromeWidth, 10);
        var contentHeight = contentWidth;/// pvc.goldenRatio;
        
        return  chromeHeight + contentHeight;
    },
    
    _createCore: function(li){
        if(!li.data){
            // Empty
            return;
        }
        
        var chart = this.chart;
        var options = chart.options;
        
        // ----------------------
        // Create and layout small charts
        var ChildClass = chart.constructor;
        for(var index = 0 ; index < li.count ; index++) {
            var childData = li.data._children[index];
            
            var childOptions = def.create(options, {
                    parent:     chart,
                    title:      childData.absLabel,
                    legend:     false,
                    data:       childData,
                    width:      li.width,
                    height:     li.height,
                    left:       (index % li.colCount) * li.width,
                    top:        Math.floor(index / li.colCount) * li.height,
                    margins:    {all: new pvc.PercentValue(0.02)},
                    extensionPoints: {
                        // This lets the main bg color show through AND
                        // allows charts to overflow to other charts without that being covered
                        // Notably, axes values tend to overflow a little bit.
                        // Also setting to null, instead of transparent, for example
                        // allows the rubber band to set its "special transparent" color
                        base_fillStyle: null
                    }
                });
            
            var childChart = new ChildClass(childOptions);
            childChart._preRender();
        }
        
        this.base(li);
    }
});

pvc.TitlePanelAbstract = pvc.BasePanel.extend({

    pvLabel: null,
    anchor: 'top',
    align:  'center',
    title: null,
    titleSize: undefined,
    font: "12px sans-serif",
    
    defaultPaddings: 2,
    
    constructor: function(chart, parent, options){
        
        if(!options){
            options = {};
        }
        
        var anchor = options.anchor || this.anchor;
        var isVertical = anchor === 'top' || anchor === 'bottom';
        
        // Default value of align depends on anchor
        if(options.align === undefined){
            options.align = isVertical ? 'center' : 'middle';
        }
        
        // titleSize
        if(options.size == null){
            var size = options.titleSize;
            if(size != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.size = new pvc.Size()
                                      .setSize(size, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        // titleSizeMax
        if(options.sizeMax == null){
            var sizeMax = options.titleSizeMax;
            if(sizeMax != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.sizeMax = new pvc.Size()
                                    .setSize(sizeMax, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        if(options.paddings == null){
            options.paddings = this.defaultPaddings;
        }
        
        this.base(chart, parent, options);
        
        if(options.font === undefined){
            var extensionFont = this._getFontExtension();
            if(typeof extensionFont === 'string'){
                this.font = extensionFont;
            }
        }
    },
    
    _getFontExtension: function(){
        return this._getExtension('titleLabel', 'font');
    },
    
    /**
     * @override
     */
    _calcLayout: function(layoutInfo){
        var requestSize = new pvc.Size();
        
        // TODO: take textAngle, textMargin and textBaseline into account
        
        // Naming is for anchor = top
        var a = this.anchor;
        var a_width  = this.anchorLength(a);
        var a_height = this.anchorOrthoLength(a);
        
        var desiredWidth = layoutInfo.desiredClientSize[a_width];
        if(desiredWidth == null){
            desiredWidth = pvc.text.getTextLength(this.title, this.font) + 2; // Small factor to avoid cropping text on either side
        }
        
        var lines;
        var clientWidth = layoutInfo.clientSize[a_width];
        if(desiredWidth > clientWidth){
            desiredWidth = clientWidth;
            lines = pvc.text.justify(this.title, desiredWidth, this.font);
        } else {
            lines = this.title ? [this.title] : [];
        }
        
        // -------------
        
        var lineHeight = pvc.text.getTextHeight("m", this.font);
        
        var desiredHeight = layoutInfo.desiredClientSize[a_height];
        if(desiredHeight == null){
            desiredHeight = lines.length * lineHeight;
        }
        
        var availableHeight = layoutInfo.clientSize[a_height];
        if(desiredHeight > availableHeight){
            // Don't show partial lines unless it is the only one left
            var maxLineCount = Math.max(1, Math.floor(availableHeight / lineHeight));
            if(lines.length > maxLineCount){
                var firstCroppedLine = lines[maxLineCount];  
                
                lines.length = maxLineCount;
                
                desiredHeight = maxLineCount * lineHeight;
                
                var lastLine = lines[maxLineCount - 1] + " " + firstCroppedLine;
                
                lines[maxLineCount - 1] = pvc.text.trimToWidthB(desiredWidth, lastLine, this.font, "..");
            }
        }
        
        layoutInfo.lines = lines;
        
        layoutInfo.lineSize = {
           width:  desiredWidth,
           height: lineHeight
        };
        
        layoutInfo.a_width   = a_width;
        layoutInfo.a_height  = a_height;
        
        requestSize[a_width]  = desiredWidth;
        requestSize[a_height] = desiredHeight;
        
        return requestSize;
    },
    
    /**
     * @override
     */
    _createCore: function(layoutInfo) {
        // Label
        var rotationByAnchor = {
            top: 0,
            right: Math.PI / 2,
            bottom: 0,
            left: -Math.PI / 2
        };
        
        var linePanel = this.pvPanel.add(pv.Panel)
            .data(layoutInfo.lines)
            [pvc.BasePanel.leftTopAnchor[this.anchor]](function(){
                return this.index * layoutInfo.lineSize.height;
            })
            [this.anchorOrtho(this.anchor)](0)
            [layoutInfo.a_height](layoutInfo.lineSize.height)
            [layoutInfo.a_width ](layoutInfo.lineSize.width );
        
        var textAlign = pvc.BasePanel.horizontalAlign[this.align];
        
        this.pvLabel = linePanel.add(pv.Label)
            .text(function(line){ return line; })
            .font(this.font)
            .textAlign(textAlign)
            .textBaseline('middle')
            .left  (function(){ return this.parent.width()  / 2; })
            .bottom(function(){ return this.parent.height() / 2; })
            .textAngle(rotationByAnchor[this.anchor]);

        // Maintained for v1 compatibility
        if (textAlign !== 'center') {
            if (this.isAnchorTopOrBottom()) {
                this.pvLabel
                    .left(null) // reset
                    [textAlign](0);

            } else if (this.anchor == "right") {
                if (textAlign == "left") {
                    this.pvLabel
                        .bottom(null)
                        .top(0);
                } else {
                    this.pvLabel
                        .bottom(0);
                }
            } else if (this.anchor == "left") {
                if (textAlign == "right") {
                    this.pvLabel
                        .bottom(null)
                        .top(0);
                } else {
                    this.pvLabel
                        .bottom(0);
                }
            }
        }
    },
    
    /**
     * @override
     */
    applyExtensions: function(){
        this.extend(this.pvPanel, 'title_');
        this.extend(this.pvLabel, 'titleLabel_');
    }
});
pvc.TitlePanel = pvc.TitlePanelAbstract.extend({

    font: "14px sans-serif",
    
    defaultPaddings: 4,
    
    constructor: function(chart, parent, options){
        
        if(!options){
            options = {};
        }
        
        var isV1Compat = chart.options.compatVersion <= 1;
        if(isV1Compat){
            var size = options.titleSize;
            if(size == null){
                options.titleSize = 25;
            }
        }
        
        this.base(chart, parent, options);
    }
});
/*
 * Legend panel. Generates the legend. Specific options are:
 * <i>legend</i> - text. Default: false
 * <i>legendPosition</i> - top / bottom / left / right. Default: bottom
 * <i>legendSize</i> - The size of the legend in pixels. Default: 25
 *
 * Has the following protovis extension points:
 *
 * <i>legend_</i> - for the legend Panel
 * <i>legendRule_</i> - for the legend line (when applicable)
 * <i>legendDot_</i> - for the legend marker (when applicable)
 * <i>legendLabel_</i> - for the legend label
 * 
 */
pvc.LegendPanel = pvc.BasePanel.extend({
    pvRule:  null,
    pvDot:   null,
    pvLabel: null,
    
    anchor:     "bottom",
    align:      "left",
    pvLegendPanel: null,
    legend:     null,
    legendSize: null,
    legendSizeMax: null,
    
    textMargin: 6,   // The space between the marker and the text, in pixels.
    padding:    5,   // The space around a legend item in pixels (in all directions, half for each side).
    
    shape:      null, // "square",
    markerSize: 15,   // *diameter* of marker *zone* (the marker(s) itself is a little smaller)
    drawLine:   false,
    drawMarker: true,
    
    font:       '10px sans-serif',
    
    constructor: function(chart, parent, options){
        // Default value of align depends on anchor
        if(!options){
            options = {};
        }
        
        var anchor = options.anchor || this.anchor;
        
        var isV1Compat = chart.options.compatVersion <= 1;
        var isVertical = anchor !== 'top' && anchor !== 'bottom';
        
        if(isVertical && options.align === undefined){
            options.align = 'top';
        }
        
        // legendSize
        if(options.size == null){
            var size = options.legendSize;
            if(size != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.size = new pvc.Size()
                                 .setSize(size, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        // legendSizeMax
        if(options.sizeMax == null){
            var sizeMax = options.legendSizeMax;
            if(sizeMax != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.sizeMax = new pvc.Size()
                                    .setSize(sizeMax, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        if(isV1Compat){
            if(options.padding === undefined){
                // Default value changed (and the meaning of the property also)
                options.padding = 24;
            }
            
            if(options.shape === undefined){
                options.shape = 'square';
            }
            
            // V1 minMarginX/Y were included in the size of the legend,
            // so these correspond to padding
            var minMarginX = Math.max(def.get(options, 'minMarginX', 8), 0);
            
            // V1 only implemented minMarginY for vertical and align = 'top'
            var minMarginY;
            if(isVertical && (options.align !== 'middle' && options.align !== 'bottom')){
                minMarginY = Math.max(def.get(options, 'minMarginY', 20) - 20, 0);
            } else {
                minMarginY = 0;
            }
            
            options.paddings = { left: minMarginX, top: minMarginY };
        } else {
            // Set default margins
            if(options.margins === undefined){
                options.margins = def.set({}, this.anchorOpposite(anchor), 10);
            }
        }
        
        this.base(chart, parent, options);
    },

    /**
     * @override
     */
    _calcLayout: function(layoutInfo){
        var positionProps = {
            left: null, 
            top:  null
        };
        var clientSize     = layoutInfo.clientSize;
        var requiredSize   = new pvc.Size(1,1);
        var paddedCellSize = new pvc.Size(1,1);
        var rootScene = this._buildScene();
        var leafCount = rootScene.childNodes.length;
        var overflowed = true;
        var clipPartialContent = false;
        
        function finish(){
            /** Other exports */
            def.copy(layoutInfo, {
                rootScene:  rootScene,
                leftProp:   positionProps.left,
                topProp:    positionProps.top,
                cellSize:   paddedCellSize,
                overflowed: overflowed
            });
            
            return requiredSize;
        }
        
        if(!leafCount){
            overflowed = false;
            return finish();
        }
        
        if(!(clientSize.width > 0 && clientSize.height > 0)){
            return finish();
        }
        
        var isV1Compat = (this.chart.options.compatVersion <= 1);
        
        // The size of the biggest cell
        var maxLabelLen = rootScene.acts.legendItem.maxLabelTextLen;
        var cellWidth = this.markerSize + this.textMargin + maxLabelLen; // ignoring textAdjust
        var cellHeight;
        if(isV1Compat){
            // Previously, the cellHeight was the padding.
            // As we now add the padding below, we put 0 here.
            cellHeight = 0;
        } else {
            cellHeight = Math.max(pvc.text.getTextHeight("M", this.font), this.markerSize);
        }
        
        paddedCellSize.width  = cellWidth  + this.padding;
        paddedCellSize.height = cellHeight + this.padding;
        
        // Names are for horizontal layout (anchor = top or bottom)
        var isHorizontal = this.anchor === 'top' || this.anchor === 'bottom';
        var a_top    = isHorizontal ? 'top' : 'left';
        var a_bottom = this.anchorOpposite(a_top);    // top or bottom
        var a_width  = this.anchorLength(a_top);      // width or height
        var a_height = this.anchorOrthoLength(a_top); // height or width
        var a_center = isHorizontal ? 'center' : 'middle';
        var a_left   = isHorizontal ? 'left' : 'top';
        var a_right  = this.anchorOpposite(a_left);   // left or right
        
        var maxCellsPerRow = ~~(clientSize[a_width] / paddedCellSize[a_width]); // ~~ <=> Math.floor
        if(!maxCellsPerRow){
            if(clipPartialContent){
                return finish();
            }
            maxCellsPerRow = 1;
        }
        
        var cellsPerRow = Math.min(leafCount, maxCellsPerRow);
        var rowWidth    = cellsPerRow * paddedCellSize[a_width];
        var rowCount    = Math.ceil(leafCount / cellsPerRow);
        var tableHeight = rowCount * paddedCellSize[a_height];
        
        if(tableHeight > clientSize[a_height]){
            tableHeight = clientSize[a_height];
            if(clipPartialContent){
                // reduce row count
                rowCount = ~~(tableHeight / paddedCellSize[a_height]);
                
                if(!rowCount){
                    // Nothing fits entirely
                    return finish();
                }
                
                var maxLeafCount = cellsPerRow * rowCount;
                while(leafCount > maxLeafCount){
                    rootScene.removeAt(leafCount--);
                }
            }
        }
        
        // ----------------------
        
        overflowed = false;
        
        // Request used width / all available width (V1)
        requiredSize[a_width ] = !isV1Compat ? rowWidth : clientSize[a_width];
        requiredSize[a_height] = tableHeight;
        
        // NOTE: V1 behavior requires keeping alignment code here
        // even if it is also being performed in the layout...
        
        // -----------------
        
        var leftOffset = 0;
        switch(this.align){
            case a_right:
                leftOffset = requiredSize[a_width] - rowWidth;
                break;
                
            case a_center:
                leftOffset = (requiredSize[a_width] - rowWidth) / 2;
                break;
        }
        
        positionProps[a_left] = function(){
            var col = this.index % cellsPerRow;
            return leftOffset + col * paddedCellSize[a_width];
        };
        
        // -----------------
        
        var topOffset = 0;
        positionProps[a_top] = function(){
            var row = ~~(this.index / cellsPerRow);  // ~~ <=> Math.floor
            return topOffset + row * paddedCellSize[a_height];
        };
        
        return finish();
    },
    
    /**
     * @override
     */
    _createCore: function(layoutInfo) {
      var myself = this,
          rootScene = layoutInfo.rootScene,
          sceneColorProp = function(scene){
              return scene.acts.legendItem.color;
          };
      
      this.pvPanel.overflow("hidden");
          
      this.pvLegendPanel = this.pvPanel.add(pv.Panel)
          .data(rootScene.childNodes)
          .localProperty('isOn', Boolean)
          .isOn(function(scene){ return scene.acts.legendItem.isOn(); })
          .def("hidden", "false")
          .left(layoutInfo.leftProp)
          .top(layoutInfo.topProp)
          .height(layoutInfo.cellSize.height)
          .width(layoutInfo.cellSize.width)
          .cursor(function(scene){
              return scene.acts.legendItem.click ? "pointer" : null;
          })
          .fillStyle(function(){
              return this.hidden() == "true" ? 
                     "rgba(200,200,200,1)" : 
                     "rgba(200,200,200,0.0001)";
          })
          .event("click", function(scene){
              var legendItem = scene.acts.legendItem;
              if(legendItem.click){
                  return legendItem.click();
              }
          });
      
      var pvLegendProto;
      
      if(this.drawLine && this.drawMarker){
          
          this.pvRule = this.pvLegendPanel.add(pv.Rule)
              .left(0)
              .width(this.markerSize)
              .lineWidth(1)
              .strokeStyle(sceneColorProp);

          this.pvDot = this.pvRule.anchor("center").add(pv.Dot)
              .shapeSize(this.markerSize)
              .shape(function(scene){
                  return myself.shape || scene.acts.legendItem.shape;
              })
             .lineWidth(0)
             .fillStyle(sceneColorProp)
             ;

          pvLegendProto = this.pvRule; // Rule is wider, so text would be over the rule with text margin 0
          
      } else if(this.drawLine) {
      
          this.pvRule = this.pvLegendPanel.add(pv.Rule)
              .left(0)
              .width(this.markerSize)
              .lineWidth(1)
              .strokeStyle(sceneColorProp)
              ;

          pvLegendProto = this.pvRule;
          
      } else { // => if(this.drawMarker) {
          this.pvDot = this.pvLegendPanel.add(pv.Dot)
              .left(this.markerSize / 2)
              .shapeSize(this.markerSize)
              .shape(function(scene){
                  return myself.shape || scene.acts.legendItem.shape;
              })
              .angle(Math.PI/2)
              .lineWidth(2)
              .strokeStyle(sceneColorProp)
              .fillStyle  (sceneColorProp)
              ;

          pvLegendProto = this.pvDot;
      }
    
      this.pvLabel = pvLegendProto.anchor("right").add(pv.Label)
          .text(function(scene){
              // TODO: trim to width - the above algorithm does not update the cellWidth...
              return scene.acts.legendItem.label;
          })
          .font(this.font)
          .textMargin(this.textMargin)
          .textDecoration(function(){ return this.parent.isOn() ? "" : "line-through"; })
          .intercept(
                'textStyle',
                labelTextStyleInterceptor,
                this._getExtension('legendLabel', 'textStyle'));
          
      function labelTextStyleInterceptor(getTextStyle, args) {
          var baseTextStyle = getTextStyle ? getTextStyle.apply(this, args) : "black";
          return this.parent.isOn() ? 
                      baseTextStyle : 
                      pvc.toGrayScale(baseTextStyle, null, undefined, 150);
      }
    },

    applyExtensions: function(){
        this.extend(this.pvPanel,      "legendArea_");
        this.extend(this.pvLegendPanel,"legendPanel_");
        this.extend(this.pvRule,       "legendRule_");
        this.extend(this.pvDot,        "legendDot_");
        this.extend(this.pvLabel,      "legendLabel_");
    },
    
    _buildScene: function(){
        var chart = this.chart,
            maxLabelTextLen = 0,

            /* A root scene that contains all datums */
            rootScene  = new pvc.visual.Scene(null, {panel: this, group: chart.data});

        chart.legendGroupsList.forEach(function(legendGroup){
                createLegendGroupScenes.call(this, legendGroup);
            },
            this);

        rootScene.acts.legendItem = {
            maxLabelTextLen: maxLabelTextLen
        };
        
        return rootScene;

        function createLegendGroupScenes(legendGroup){
            var dataPartAct = ('partValue' in legendGroup) ? {
                                value: legendGroup.partValue,
                                label: legendGroup.partLabel
                              } :
                              null;

            legendGroup.items.forEach(function(legendItem){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(rootScene, {group: legendItem.group});

                if(dataPartAct){
                    scene.acts.dataPart = dataPartAct;
                }

                var labelTextLen = pvc.text.getTextLength(legendItem.label, this.font);
                if(labelTextLen > maxLabelTextLen) {
                    maxLabelTextLen = labelTextLen;
                }

                legendItem.labelTextLength = labelTextLen;

                /* legendItem special role? */
                scene.acts.legendItem = legendItem;
            }, this);
        }
    }
});
/**
 * TimeseriesAbstract is the base class for all categorical or timeseries
 */
pvc.TimeseriesAbstract = pvc.BaseChart.extend({

    allTimeseriesPanel : null,

    constructor: function(options){

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.TimeseriesAbstract.defaultOptions, options);
    },

    _preRenderCore: function(){

        // Do we have the timeseries panel? add it
        if (this.options.showAllTimeseries){
            this.allTimeseriesPanel = new pvc.AllTimeseriesPanel(this, this.basePanel, {
                anchor: this.options.allTimeseriesPosition,
                allTimeseriesSize: this.options.allTimeseriesSize
            });
        }
    }
}, {
    defaultOptions: {
        showAllTimeseries: true,
        allTimeseriesPosition: "bottom",
        allTimeseriesSize: 50
    }
});


/*
 * AllTimeseriesPanel panel. Generates a small timeseries panel that the user
 * can use to select the range:
 * <i>allTimeseriesPosition</i> - top / bottom / left / right. Default: top
 * <i>allTimeseriesSize</i> - The size of the timeseries in pixels. Default: 100
 *
 * Has the following protovis extension points:
 *
 * <i>allTimeseries_</i> - for the title Panel
 * 
 */
pvc.AllTimeseriesPanel = pvc.BasePanel.extend({

    pvAllTimeseriesPanel: null,
    anchor: "bottom",
    allTimeseriesSize: 50,

    /**
     * @override
     */
    _calcLayout: function(layoutInfo){
        return this.createAnchoredSize(this.allTimeseriesSize, layoutInfo.clientSize);
    },
    
    /**
     * @override
     */
    applyExtensions: function(){
        this.base();

        // Extend panel
        this.extend(this.pvPanel, "allTimeseries_");
    }
});
/**
 * CartesianAbstract is the base class for all 2D cartesian space charts.
 */
pvc.CartesianAbstract = pvc.TimeseriesAbstract.extend({
    _gridDockPanel: null,
    
    axes: null,
    axesPanels: null, 
    
    yAxisPanel : null,
    xAxisPanel : null,
    secondXAxisPanel: null,
    secondYAxisPanel: null,
    
    _mainContentPanel: null, // This will act as a holder for the specific panel

    yScale: null,
    xScale: null,
    
    _axisRoleNameMap: null, 
    // example
//    {
//        'base':   'category',
//        'ortho':  'value'
//    },
    
    _visibleDataCache: null,
    
    constructor: function(options){
        
        this._axisRoleNameMap = {};
        this.axes = {};
        this.axesPanels = {};
        
        this.base(options);

        pvc.mergeDefaults(this.options, pvc.CartesianAbstract.defaultOptions, options);
    },
    
    _getSeriesRoleSpec: function(){
        return { isRequired: true, defaultDimensionName: 'series*', autoCreateDimension: true };
    },

    _initData: function(){
        // Clear data related cache
        if(this._visibleDataCache) {
            delete this._visibleDataCache;
        }
        
        this.base.apply(this, arguments);
    },

    _preRenderCore: function(){
        var options = this.options;
        if(pvc.debug >= 3){
            pvc.log("Prerendering in CartesianAbstract");
        }
        
        /* Create the grid/docking panel */
        this._gridDockPanel = new pvc.CartesianGridDockingPanel(this, this.basePanel);
        
        /* Create axes */
        var baseAxis   = this._createAxis('base',  0),
            orthoAxis  = this._createAxis('ortho', 0),
            ortho2Axis = options.secondAxis ? this._createAxis('ortho', 1) : null;
        
        /* Create child axis panels
         * The order is relevant because of docking order. 
         */
        if(ortho2Axis) {
            this._createAxisPanel(ortho2Axis);
        }
        this._createAxisPanel(baseAxis );
        this._createAxisPanel(orthoAxis);
        
        /* Create scales without range yet */
        this._createAxisScale(baseAxis );
        this._createAxisScale(orthoAxis);
        if(ortho2Axis){
            this._createAxisScale(ortho2Axis);
        }
        
        /* Create main content panel */
        this._mainContentPanel = this._createMainContentPanel(this._gridDockPanel);
        
        /* Force layout */
        this.basePanel.layout();
        
        /* Set scale ranges, after layout */
        this._setAxisScaleRange(baseAxis );
        this._setAxisScaleRange(orthoAxis);
        if(ortho2Axis){
            this._setAxisScaleRange(ortho2Axis);
        }
    },
    
    /**
     * Creates a cartesian axis.
     * 
     * @param {string} type The type of the axis. One of the values: 'base' or 'ortho'.
     * @param {number} index The index of the axis within its type (0, 1, 2...).
     *
     * @type pvc.visual.CartesianAxis
     */
    _createAxis: function(axisType, axisIndex){
        var roles = def.array.as(this._axisRoleNameMap[axisType])
                        .map(function(roleName){
                            return this.visualRoles(roleName);
                        }, this);
        var axis = new pvc.visual.CartesianAxis(this, axisType, axisIndex, roles);
        
        this.axes[axis.id] = axis;
        this.axes[axis.orientedId] = axis;
        
        return axis;
    },
    
    /**
     * Creates an axis panel, if it is visible.
     * @param {pvc.visual.CartesianAxis} axis The cartesian axis.
     * @type pvc.AxisPanel
     */
    _createAxisPanel: function(axis){
        if(axis.isVisible) {
            var titlePanel;
            var title = axis.option('Title');
            if (!def.empty(title)) {
                titlePanel = new pvc.AxisTitlePanel(this, this._gridDockPanel, {
                    title:        title,
                    font:         axis.option('TitleFont'),
                    anchor:       axis.option('Position'),
                    align:        axis.option('TitleAlign'),
                    margins:      axis.option('TitleMargins'),
                    paddings:     axis.option('TitlePaddings'),
                    titleSize:    axis.option('TitleSize'),
                    titleSizeMax: axis.option('TitleSizeMax')
                });
            }
            
            var panel = pvc.AxisPanel.create(this, this._gridDockPanel, axis, {
                useCompositeAxis:  axis.option('Composite'),
                font:              axis.option('LabelFont'),
                anchor:            axis.option('Position'),
                axisSize:          axis.option('Size'),
                axisSizeMax:       axis.option('SizeMax'),
                labelSpacingMin:   axis.option('LabelSpacingMin'),
                tickExponentMin:   axis.option('TickExponentMin'),
                tickExponentMax:   axis.option('TickExponentMax'),
                fullGrid:          axis.option('FullGrid'),
                fullGridCrossesMargin: axis.option('FullGridCrossesMargin'),
                ruleCrossesMargin: axis.option('RuleCrossesMargin'),
                zeroLine:          axis.option('ZeroLine'),
                domainRoundMode:   axis.option('DomainRoundMode'),
                desiredTickCount:  axis.option('DesiredTickCount'),
                minorTicks:        axis.option('MinorTicks'),
                clickAction:       axis.option('ClickAction'),
                doubleClickAction: axis.option('DoubleClickAction')
            });
            
            if(titlePanel){
                titlePanel.panelName = panel.panelName;
                panel.titlePanel = titlePanel;
            }
            
            this.axesPanels[axis.id] = panel;
            this.axesPanels[axis.orientedId] = panel;
            
            // V1 fields
            if(axis.index <= 1) {
                this[axis.orientedId + 'AxisPanel'] = panel;
            }
            
            return panel;
        }
    },

    /* @abstract */
    _createMainContentPanel: function(parentPanel){
        throw def.error.notImplemented();
    },
    
    /**
     * Creates a scale for a given axis, assigns it to the axis
     * and assigns the scale to special v1 chart instance fields.
     * 
     * @param {pvc.visual.CartesianAxis} axis The axis.
     * @type pv.Scale
     */
    _createAxisScale: function(axis){
        var isSecondOrtho = axis.index === 1 && axis.type === 'ortho';
        
        var scale;

        if(isSecondOrtho && !this.options.secondAxisIndependentScale){
            scale = this.axes.ortho.scale || 
                    def.fail.operationInvalid("First ortho scale must be created first.");
        } else {
            scale = this._createScaleByAxis(axis);
        }
        axis.setScale(scale);
        
        /* V1 fields xScale, yScale, secondScale */
        if(isSecondOrtho) {
            this.secondScale = scale;
        } else if(!axis.index) {
            this[axis.orientation + 'Scale'] = scale;
        }
        
        return scale;
    },
    
    /**
     * Creates a scale for a given axis.
     * 
     * @param {pvc.visual.CartesianAxis} axis The axis.
     * @type pv.Scale
     */
    _createScaleByAxis: function(axis){
        var createScaleMethod = this['_create' + axis.scaleType + 'ScaleByAxis'];
        
        var dataPartValues = this._getAxisDataParts(axis);
        
        return createScaleMethod.call(this, axis, dataPartValues);
    },
    
    _getAxisDataParts: function(axis){
        return null;
    },

    /**
     * Creates a discrete scale for a given axis.
     * <p>
     * Uses the chart's <tt>panelSizeRatio</tt> to calculate the band.
     * </p>
     * 
     * @param {pvc.visual.CartesianAxis} axis The axis.
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * @virtual
     * @type pv.Scale
     */
    _createDiscreteScaleByAxis: function(axis, dataPartValues){
        /* DOMAIN */

        // With composite axis, only 'singleLevel' flattening works well
        var flatteningMode = null; //axis.option('Composite') ? 'singleLevel' : null,
        var baseData = this._getVisibleData(dataPartValues);
        var data = axis.role.flatten(baseData, {
                                visible: true,
                                flatteningMode: flatteningMode
                            });
        
        var scale  = new pv.Scale.ordinal();
        scale.type = 'Discrete';
        
        if(!data.count()){
            scale.isNull = true;
            
            if(pvc.debug >= 3){
                pvc.log("Discrete scale - no data");
            }
        } else {
            var values = data.children()
                             .select(function(child){ return child.value; })
                             .array();
            
            scale.domain(values);
        }
        
        return scale;
    },
    
    /**
     * Creates a continuous time-series scale for a given axis.
     * 
     * <p>
     * Uses the axis' option <tt>Offset</tt> to calculate excess domain margins at each end of the scale.
     * </p>
     * <p>
     * Also takes into account the specified axis' options 
     * <tt>DomainRoundMode</tt> and <tt>DesiredTickCount</tt>.
     * </p>
     * 
     * @param {pvc.visual.CartesianAxis} axis The axis.
     * @param {pvc.visual.Role} role The role.
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * @virtual
     * @type pv.Scale
     */
    _createTimeseriesScaleByAxis: function(axis, dataPartValues){
        /* DOMAIN */
        var extent = this._getVisibleValueExtent(axis, dataPartValues); // null when no data...
        
        var scale = new pv.Scale.linear();
        scale.type = 'Timeseries';
        
        if(!extent){
            scale.isNull = true;
            
            if(pvc.debug >= 3){
                pvc.log("Timeseries scale - no data");
            }
        } else {
            var dMin = extent.min;
            var dMax = extent.max;

            if((dMax - dMin) === 0) {
                dMax = new Date(dMax.getTime() + 3600000); // 1 h
            }
        
            scale.domain(dMin, dMax);
            
            // TODO: Domain rounding
        }
        
        return scale;
    },

    /**
     * Creates a continuous scale for a given axis.
     *
     * <p>
     * Uses the axis' option <tt>Offset</tt> to calculate excess domain margins at each end of the scale.
     * </p>
     * <p>
     * Also takes into account the specified axis' options
     * <tt>DomainRoundMode</tt> and <tt>DesiredTickCount</tt>.
     * </p>
     *
     * @param {pvc.visual.CartesianAxis} axis The axis.
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * @virtual
     * @type pv.Scale
     */
    _createContinuousScaleByAxis: function(axis, dataPartValues){
        /* DOMAIN */
        var extent = this._getVisibleValueExtentConstrained(axis, dataPartValues);
        
        var scale = new pv.Scale.linear();
        scale.type = 'Continuous';
        
        if(!extent){
            scale.isNull = true;
            
            if(pvc.debug >= 3){
                pvc.log("Continuous scale - no data");
            }
        } else {
            var dMin = extent.min;
            var dMax = extent.max;
    
            /*
             * If both negative or both positive
             * the scale does not contain the number 0.
             *
             * Currently this option ignores locks. Is this all right?
             */
            var originIsZero = axis.option('OriginIsZero');
            if(originIsZero && (dMin * dMax > 0)){
                if(dMin > 0){
                    dMin = 0;
                    extent.minLocked = true;
                } else {
                    dMax = 0;
                    extent.maxLocked = true;
                }
            }
    
            /*
             * If the bounds (still) are the same, things break,
             * so we add a wee bit of variation.
             *
             * This one must ignore locks.
             */
            if (dMin === dMax) {
                dMin = dMin !== 0 ? dMin * 0.99 : originIsZero ? 0 : -0.1;
                dMax = dMax !== 0 ? dMax * 1.01 : 0.1;
            } else if(dMin > dMax){
                // What the heck...
                // Is this ok or should throw?
                var bound = dMin;
                dMin = dMax;
                dMax = bound;
            }
            
            scale.domain(dMin, dMax);
            
            // Domain rounding
            // Must be done before applying offset
            // because otherwise the offset gets amplified by the rounding
            // Then, the scale range is updated but the ticks cache is not.
            // The result is we end up showing two zones, on each end, with no ticks.
            var roundMode = axis.option('DomainRoundMode');
            if(roundMode === 'nice'){
                scale.nice();
                // Ticks domain rounding is performed during AxisPanel layout
            }
            
            if(pvc.debug >= 3){
                pvc.log("Continuous scale extent: " + JSON.stringify(extent) + 
                        " create:" + JSON.stringify({min: dMin, max: dMax}) + 
                        " niced:"  + JSON.stringify(scale.domain()));
            }
        }
        
        return scale;
    },
    
    _setAxisScaleRange: function(axis){
        var size = (axis.orientation === 'x') ?
                        this._mainContentPanel.width :
                        this._mainContentPanel.height;
        
        var scale = axis.scale;
        scale.min  = 0;
        scale.max  = size; 
        scale.size = size; // original size
        
        var axisOffset = axis.option('Offset');
        if(axisOffset > 0){
            var rOffset = size * axisOffset;
            scale.min += rOffset;
            scale.max -= rOffset;
            scale.offset = rOffset;
            scale.offsetSize = scale.max - scale.min;
        } else {
            scale.offset = 0;
            scale.offsetSize = scale.size;
        }
        
        if(scale.type === 'Discrete'){
            if(scale.domain().length > 0){ // Has domain? At least one point is required to split.
                var bandRatio = this.options.panelSizeRatio || 0.8;
                scale.splitBandedCenter(scale.min, scale.max, bandRatio);
            }
        } else {
            if(scale.type === 'Continuous' && axis.option('DomainRoundMode') === 'tick'){
                var axisPanel = this.axesPanels[axis.id];
                if(axisPanel){
                    // Domain rounding
                    // Commit the scale's domain to the axis calculated ticks domain
                    var ticks = axisPanel.getTicks();
                    var tickCount = ticks && ticks.length;
                    if(tickCount){
                        scale.domain(ticks[0], ticks[tickCount - 1]);
                    }
                }
            }
            
            scale.range(scale.min, scale.max);
        }
        
        if(pvc.debug >= 4){
            pvc.log("Scale: " + JSON.stringify(def.copyOwn(scale)));
        }
        
        return scale;
    },

    /*
     * Obtains the chart's visible data
     * grouped according to the charts "main grouping".
     * 
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * 
     * @type pvc.data.Data
     */
    _getVisibleData: function(dataPartValues){
        var key = '' + (dataPartValues || ''), // relying on Array.toString
            data = def.getOwn(this._visibleDataCache, key);
        if(!data) {
            data = this._createVisibleData(dataPartValues);
            
            (this._visibleDataCache || (this._visibleDataCache = {}))
                [key] = data;
        }
        
        return data;
    },

    /*
     * Creates the chart's visible data
     * grouped according to the charts "main grouping".
     *
     * <p>
     * The default implementation groups data by series visual role.
     * </p>
     *
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     *
     * @type pvc.data.Data
     * @protected
     * @virtual
     */
    _createVisibleData: function(dataPartValues){
        var partData = this._partData(dataPartValues);
        return this._serRole && this._serRole.grouping ?
                   this._serRole.flatten(partData, {visible: true}) :
                   partData;
    },
    
    _assertSingleContinuousValueRole: function(valueRole){
        if(!valueRole.grouping.isSingleDimension) {
            pvc.log("[WARNING] A linear scale can only be obtained for a single dimension role.");
        }
        
        if(valueRole.grouping.isDiscrete()) {
            pvc.log("[WARNING] The single dimension of role '{0}' should be continuous.", [valueRole.name]);
        }
    },
    
    /**
     * Gets the extent of the values of the specified axis' roles
     * over all datums of the visible data.
     * 
     * @param {pvc.visual.CartesianAxis} valueAxis The value axis.
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * @type object
     *
     * @protected
     * @virtual
     */
    _getVisibleValueExtent: function(valueAxis, dataPartValues){
        var roles = valueAxis.roles;
        if(roles.length === 1){
            // Most common case is faster
            return this._getVisibleRoleValueExtent(valueAxis, roles[0], dataPartValues);
        }

        return def.query(roles)
                .select(function(role){
                    return this._getVisibleRoleValueExtent(valueAxis, role, dataPartValues);
                }, this)
                .reduce(this._unionReduceExtent, null);
    },

    /**
     * Could/Should be static
     */
    _unionReduceExtent: function(result, range){
        if(!result) {
            if(!range){
                return null;
            }

            result = {min: range.min, max: range.max};
        } else if(range){
            if(range.min < result.min){
                result.min = range.min;
            }

            if(range.max > result.max){
                result.max = range.max;
            }
        }

        return result;
    },

    /**
     * Gets the extent of the values of the specified role
     * over all datums of the visible data.
     *
     * @param {pvc.visual.CartesianAxis} valueAxis The value axis.
     * @param {pvc.visual.Role} valueRole The role.
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * @type object
     *
     * @protected
     * @virtual
     */
    _getVisibleRoleValueExtent: function(valueAxis, valueRole, dataPartValues){
        this._assertSingleContinuousValueRole(valueRole);

        if(valueRole.name === 'series') {
            /* not supported/implemented? */
            throw def.error.notImplemented();
        }

        var valueDimName = valueRole.firstDimensionName();
        var extent = this._getVisibleData(dataPartValues).dimensions(valueDimName).extent();
        return extent ? {min: extent.min.value, max: extent.max.value} : undefined;
    },
    
    /**
     * @virtual
     */
    _getVisibleValueExtentConstrained: function(axis, dataPartValues, min, max){
        var extent = {
                minLocked: false,
                maxLocked: false
            };
        
        if(min == null) {
            min = axis.option('FixedMin');
            if(min != null){
                extent.minLocked = true;
            }
        }
        
        if(max == null) {
            max = axis.option('FixedMax');
            if(max != null){
                extent.maxLocked = true;
            }
        }
        
        if(min == null || max == null) {
            var baseExtent = this._getVisibleValueExtent(axis, dataPartValues); // null when no data
            if(!baseExtent){
                return null;
            }
            
            if(min == null){
                min = baseExtent.min;
            }
            
            if(max == null){
                max = baseExtent.max;
            }
        }
        
        extent.min = min;
        extent.max = max;
        
        return extent;
    }
}, {
    defaultOptions: pvc.visual.CartesianAxis.createAllDefaultOptions({
        showAllTimeseries: false,

        /* Percentage of occupied space over total space in a discrete axis band */
        panelSizeRatio: 0.9,

        // Indicates that the *base* axis is a timeseries
        timeSeries: false,
        timeSeriesFormat: "%Y-%m-%d",
        
        originIsZero:  undefined,
        
        orthoFixedMin: undefined,
        orthoFixedMax: undefined,

        useCompositeAxis: false,

        /* Non-standard axes options and defaults */
        showXScale: true,
        showYScale: true,
        
        xAxisPosition: "bottom",
        yAxisPosition: "left",

        secondAxisIndependentScale: false,
        secondAxisColor: "blue"
    })
});

pvc.GridDockingPanel = pvc.BasePanel.extend({
    anchor: 'fill',
    
    /**
     * Implements a docking/grid layout variant.
     * <p>
     * The layout contains 5 target positions: top, bottom, left, right and center.
     * These are mapped to a 3x3 grid. The corner cells always remain empty.
     * In the center cell, panels are superimposed.
     * </p>
     * 
     * @override
     */
    _calcLayout: function(layoutInfo){
        
        if(!this._children) {
            return;
        }
        
        // Objects we can mutate
        var margins = new pvc.Sides(0);
        var remSize = def.copyOwn(layoutInfo.clientSize);
        
        var aolMap = pvc.BasePanel.orthogonalLength,
            aoMap  = pvc.BasePanel.relativeAnchor,
            alMap  = pvc.BasePanel.parallelLength;
        
        var childKeyArgs = {force: true};
        var childReferenceSize = layoutInfo.clientSize;
        
        // Decreases available size and increases margins
        function updateSide(side, child) {
            var sideol = aolMap[side],
                olen   = child[sideol];
            
            margins[side]   += olen;
            remSize[sideol] -= olen;
        }
        
        function positionChildI(side, child) {
            var sidePos;
            if(side === 'fill'){
                side = 'left';
                sidePos = margins.left + remSize.width / 2 - (child.width / 2);
            } else {
                sidePos = margins[side];
            }
            
            child.setPosition(def.set({}, side, sidePos));
        }
        
        function positionChildII(child, align) {
            var sideo;
            if(align === 'fill'){
                align = 'middle';
            }
            
            var sideOPos;
            switch(align){
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    sideo = align;
                    sideOPos = margins[sideo];
                    break;
                
                case 'middle':
                    sideo    = 'bottom';
                    sideOPos = margins.bottom + (remSize.height / 2) - (child.height / 2);
                    break;
                    
                case 'center':
                    sideo    = 'left';
                    sideOPos = margins.left + remSize.width / 2 - (child.width / 2);
                    break;
            }
            
            child.setPosition(def.set({}, sideo, sideOPos));
        }
        
        function layoutChildI(child) {
            var a = child.anchor;
            if(a && a !== 'fill') {
                /*jshint expr:true */
                def.hasOwn(aoMap, a) || def.fail.operationInvalid("Unknown anchor value '{0}'", [a]);
                
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                
                // Only set the *anchor* position
                // The other orthogonal position is dependent on the size of the other non-fill children
                positionChildI(a, child);
                
                updateSide(a, child);
            }
        }
        
        function layoutChildII(child) {
            var a = child.anchor;
            if(a === 'fill') {
                child.layout(new pvc.Size(remSize), childReferenceSize, childKeyArgs);
                
                positionChildI (a, child);
                positionChildII(child, a);
            } else if(a) {
                var al  = alMap[a];
                var aol = aolMap[a];
                var length      = remSize[al];
                var olength     = child[aol];
                var childSizeII = new pvc.Size(def.set({}, al, length, aol, olength));
                
                child.layout(childSizeII, childReferenceSize, childKeyArgs);
                
                var align = pvc.parseAlign(a, child.align);
                
                positionChildII(child, align);
            }
        }
        
        this._children.forEach(layoutChildI );
        
        // remSize now contains the center cell and is not changed in phase II
        // fill children are layed out in that cell
        // other non-fill children already layed out in phase I
        // "relayout" once now that the other (orthogonal) length is now determined.
        
        this._children.forEach(layoutChildII);
        
        // Consume all available client space, so no need to return anything
    }
});

pvc.CartesianGridDockingPanel = pvc.GridDockingPanel.extend({
    /**
     * @override
     */
    applyExtensions: function(){
        this.base();

        // Extend body
        this.extend(this.pvPanel,    "content_");
        this.extend(this.xFrameRule, "xAxisEndLine_");
        this.extend(this.yFrameRule, "yAxisEndLine_");
        this.extend(this.xZeroLine,  "xAxisZeroLine_");
        this.extend(this.yZeroLine,  "yAxisZeroLine_");
    },

    /**
     * @override
     */
    _createCore: function(layoutInfo){

        this.base(layoutInfo);

        var chart = this.chart,
            contentPanel = chart._mainContentPanel;
        if(contentPanel) {
            var axes = chart.axes;
            var xAxis = axes.x;
            var yAxis = axes.y;
            
            if(xAxis.option('EndLine')) {
                // Frame lines parallel to x axis
                this.xFrameRule = this._createFrameRule(xAxis);
            }

            if(yAxis.option('EndLine')) {
                // Frame lines parallel to y axis
                this.yFrameRule = this._createFrameRule(yAxis);
            }

            if(xAxis.scaleType === 'Continuous' && xAxis.option('ZeroLine')) {
                this.xZeroLine = this._createZeroLine(xAxis);
            }

            if(yAxis.scaleType === 'Continuous' && yAxis.option('ZeroLine')) {
                this.yZeroLine = this._createZeroLine(yAxis);
            }
        }
    },

    _createZeroLine: function(axis){
        var scale = axis.scale;
        if(!scale.isNull){
            var domain = scale.domain();
    
            // Domain crosses zero?
            if(domain[0] * domain[1] <= 0){
                var a   = axis.orientation === 'x' ? 'bottom' : 'left',
                    al  = this.anchorLength(a),
                    ao  = this.anchorOrtho(a),
                    aol = this.anchorOrthoLength(a),
                    orthoAxis = this._getOrthoAxis(axis.type),
                    orthoScale = orthoAxis.scale,
                    orthoFullGridCrossesMargin = orthoAxis.option('FullGridCrossesMargin'),
                    contentPanel = this.chart._mainContentPanel,
                    zeroPosition = contentPanel.position[ao] + scale(0),
                    position = contentPanel.position[a] + 
                                (orthoFullGridCrossesMargin ?
                                    0 :
                                    orthoScale.offset),
    
                    olength   = orthoFullGridCrossesMargin ?
                                        orthoScale.size :
                                        orthoScale.offsetSize;
                
                this.pvZeroLine = this.pvPanel.add(pv.Rule)
                    /* zOrder
                     *
                     * TOP
                     * -------------------
                     * Axis Rules:     0
                     * Frame/EndLine: -5
                     * Line/Dot/Area Content: -7
                     * ZeroLine:      -9   <<------
                     * Content:       -10 (default)
                     * FullGrid:      -12
                     * -------------------
                     * BOT
                     */
                    .zOrder(-9)
                    .strokeStyle("#808285")
                    [a](position)
                    [aol](olength)
                    [al](null)
                    [ao](zeroPosition)
                    //.svg(null)
                    ;
            }
        }
    },

    _createFrameRule: function(axis){
        var orthoAxis = this._getOrthoAxis(axis.type);
        var orthoScale = orthoAxis.scale;
        if(orthoScale.isNull){
            // Can only hide if the second axis is null as well 
            var orthoAxis2 = this.chart.axes[pvc.visual.CartesianAxis.getId(orthoAxis.type, 1)];
            if(!orthoAxis2 || orthoAxis2.scale.isNull){
                return;
            }
            
            orthoScale = orthoAxis2;
        }
        
        var a = axis.option('Position');
        var scale = axis.scale;
        if(scale.isNull){
            // Can only hide if the second axis is null as well 
            var axis2 = this.chart.axes[pvc.visual.CartesianAxis.getId(axis.type, 1)];
            if(!axis2 || axis2.scale.isNull){
                return;
            }
        }
        
        var fullGridCrossesMargin = axis.option('FullGridCrossesMargin');
        var orthoFullGridCrossesMargin = orthoAxis.option('FullGridCrossesMargin');
        var contentPanel = this.chart._mainContentPanel;
        
        switch(a) {
            case 'right':
                a = 'left';
                break;

            case 'top':
                a = 'bottom';
                break;
        }

        // Frame lines *parallel* to axis rule
        // Example: a = bottom
        var ao  = this.anchorOrtho(a), // left
            aol = this.anchorOrthoLength(a), // height
            al  = this.anchorLength(a), // width

            rulePos1 = contentPanel.position[a] +
                         (orthoFullGridCrossesMargin ? 0 : orthoScale.min),

            rulePos2 = contentPanel.position[a] +
                         (orthoFullGridCrossesMargin ?
                            contentPanel[aol] :
                            orthoScale.max),

            rulePosOrtho = contentPanel.position[ao] + 
                                (fullGridCrossesMargin ? 0 : scale.min),

            ruleLength   = (fullGridCrossesMargin ? contentPanel[al] : (scale.max - scale.min));

        var frameRule = this.pvPanel.add(pv.Rule)
            .data([rulePos1, rulePos2])
            .zOrder(-5)
            .strokeStyle("#808285")
            [a ](function(pos){ return pos; })
            [ao](rulePosOrtho)
            [al](ruleLength)
            [aol](null)
            .svg({ 'stroke-linecap': 'square' })
            ;
    
        return frameRule;
    },

    _getOrthoAxis: function(type){
        var orthoType = type === 'base' ? 'ortho' : 'base';
        return this.chart.axes[orthoType];
    }
});

pvc.CartesianAbstractPanel = pvc.BasePanel.extend({
    anchor: 'fill',
    orientation: "vertical",
    stacked: false,
    
    /**
     * @override
     */
    _createCore: function() {
        // Send the panel behind the axis, title and legend, panels
        this.pvPanel.zOrder(-10);

        // Overflow
        var orthoAxis = this.chart.axes.ortho,
            baseAxis  = this.chart.axes.base;
        if (orthoAxis.option('FixedMin') != null ||
            orthoAxis.option('FixedMax') != null ||
            baseAxis .option('FixedMin') != null ||
            baseAxis .option('FixedMax') != null){
            this.pvPanel.overflow("hidden");
        }
    },

    _getVisibleData: function(dataPartValues){
        return this.chart._getVisibleData(dataPartValues || this.dataPartValue);
    },

    /**
     * @override
     */
    applyExtensions: function(){
        this.base();

        // Extend body
        this.extend(this.pvPanel, "chart_");
    },

    /* @override */
    isOrientationVertical: function(){
        return this.orientation == "vertical";
    },

    /* @override */
    isOrientationHorizontal: function(){
        return this.orientation == "horizontal";
    },

    /*
     * @override
     */
   _detectDatumsUnderRubberBand: function(datumsByKey, rb, keyArgs){
       var any = false,
           chart = this.chart,
           xAxisPanel = chart.xAxisPanel,
           yAxisPanel = chart.yAxisPanel,
           xDatumsByKey,
           yDatumsByKey;

       //1) x axis
       if(xAxisPanel){
           xDatumsByKey = {};
           if(!xAxisPanel._detectDatumsUnderRubberBand(xDatumsByKey, rb, keyArgs)) {
               xDatumsByKey = null;
           }
       }

       //2) y axis
       if(yAxisPanel){
           yDatumsByKey = {};
           if(!yAxisPanel._detectDatumsUnderRubberBand(yDatumsByKey, rb, keyArgs)) {
               yDatumsByKey = null;
           }
       }

       // Rubber band selects on both axes?
       if(xDatumsByKey && yDatumsByKey) {
           // Intersect datums

           def.eachOwn(yDatumsByKey, function(datum, key){
               if(def.hasOwn(xDatumsByKey, key)) {
                   datumsByKey[datum.key] = datum;
                   any = true;
               }
           });

           keyArgs.toggle = true;

       // Rubber band selects over any of the axes?
       } else if(xDatumsByKey) {
           def.copy(datumsByKey, xDatumsByKey);
           any = true;
       } else if(yDatumsByKey) {
           def.copy(datumsByKey, yDatumsByKey);
           any = true;
       } else {
           // Ask the base implementation for signums
           any = this.base(datumsByKey, rb, keyArgs);
       }

       return any;
   }
});
/**
 * CategoricalAbstract is the base class for all categorical or timeseries
 */
pvc.CategoricalAbstract = pvc.CartesianAbstract.extend({

    constructor: function(options){
        
        this.base(options);

        pvc.mergeDefaults(this.options, pvc.CategoricalAbstract.defaultOptions, options);
        
        def.set(this._axisRoleNameMap,
            'base', 'category',
            'ortho', this.options.orthoAxisOrdinal ? 'series' : 'value'
        );

        var parent = this.parent;
        if(parent) {
            this._catRole = parent._catRole;
        }
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();
        
        this._addVisualRoles({
            category: { isRequired: true, defaultDimensionName: 'category*', autoCreateDimension: true }
        });

        // ---------
        // Cached
        this._catRole = this.visualRoles('category');
    },

    /**
     * @override
     */
    _createVisibleData: function(dataPartValues){
        var serGrouping = this._serRole && this._serRole.flattenedGrouping(),
            catGrouping = this._catRole.flattenedGrouping(),
            partData    = this._partData(dataPartValues);

        return serGrouping ?
                // <=> One multi-dimensional, two-levels data grouping
                partData.groupBy([catGrouping, serGrouping], { visible: true }) :
                partData.groupBy(catGrouping, { visible: true });
    },
    
    /**
     * Obtains the extent of the specified value axis' role
     * and data part values.
     *
     * <p>
     * Takes into account that values are shown grouped per category.
     * </p>
     *
     * <p>
     * The fact that values are stacked or not, per category,
     * is also taken into account.
     * Each data part can have its own stacking.
     * </p>
     *
     * <p>
     * When more than one datum exists per series <i>and</i> category,
     * the sum of its values is considered.
     * </p>
     *
     * @param {pvc.visual.CartesianAxis} valueAxis The value axis.
     * @param {pvc.visual.Role} valueRole The role.
     * @param {string|string[]} [dataPartValues=null] The desired data part value or values.
     * @type object
     *
     * @override
     */
    _getVisibleRoleValueExtent: function(valueAxis, valueRole, dataPartValues){
        if(!dataPartValues){
            // Most common case is faster
            return this._getVisibleCellValueExtent(valueAxis, valueRole, dataPartValues);
        }

        return def.query(dataPartValues)
                    .select(function(dataPartValue){
                        return this._getVisibleCellValueExtent(valueAxis, valueRole, dataPartValue);
                    }, this)
                    .reduce(this._unionReduceExtent, null)
                    ;
    },

    _isDataCellStacked: function(valueRole, dataPartValue){
        return this.options.stacked;
    },

    _getVisibleCellValueExtent: function(valueAxis, valueRole, dataPartValue){
        switch(valueRole.name){
            case 'series':// (series throws in base)
            case 'category':
                /* Special case.
                 * The category role's single dimension belongs to the grouping dimensions of data.
                 * As such, the default method is adequate
                 * (gets the extent of the value dim on visible data).
                 *
                 * Continuous baseScale's, like timeSeries go this way.
                 */
                return pvc.CartesianAbstract.prototype._getVisibleRoleValueExtent.call(
                                this, valueAxis, valueRole, dataPartValue);
        }
        
        this._assertSingleContinuousValueRole(valueRole);

        var valueDimName = valueRole.firstDimensionName(),
            data = this._getVisibleData(dataPartValue);

        if(valueAxis.type !== 'ortho' || !this._isDataCellStacked(valueRole, dataPartValue)){
            return data.leafs()
                       .select(function(serGroup){
                           return serGroup.dimensions(valueDimName).sum();
                        })
                       .range();
        }

        /*
         * data is grouped by category and then by series
         * So direct childs of data are category groups
         */
        return data.children()
            /* Obtain the value extent of each category */
            .select(function(catGroup){
                var range = this._getStackedCategoryValueExtent(catGroup, valueDimName);
                if(range){
                    return {range: range, group: catGroup};
                }
            }, this)
            .where(def.notNully)

            /* Combine the value extents of all categories */
            .reduce(function(result, rangeInfo){
                return this._reduceStackedCategoryValueExtent(
                            result,
                            rangeInfo.range,
                            rangeInfo.group);
            }.bind(this), null);

//        The following would not work:
//        var max = data.children()
//                    .select(function(catGroup){ return catGroup.dimensions(valueDimName).sum(); })
//                    .max();
//
//        return max != null ? {min: 0, max: max} : null;
    },
    
    /**
     * Obtains the extent of a value dimension in a given category group.
     * The default implementation determines the extent by separately
     * summing negative and positive values.
     * Supports {@link #_getVisibleValueExtent}.
     */
    _getStackedCategoryValueExtent: function(catGroup, valueDimName){
        var posSum = null,
            negSum = null;

        catGroup
            .children()
            /* Sum all datum's values on the same leaf */
            .select(function(serGroup){
                return serGroup.dimensions(valueDimName).sum();
            })
            /* Add to positive or negative totals */
            .each(function(value){
                // Note: +null === 0
                if(value != null){
                    if(value >= 0){
                        posSum += value;
                    } else {
                        negSum += value;
                    }
                }
            });

        if(posSum == null && negSum == null){
            return null;
        }

        return {max: posSum || 0, min: negSum || 0};
    },

    /**
     * Reduce operation of category ranges, into a global range.
     *
     * The default implementation performs a range "union" operation.
     *
     * Supports {@link #_getVisibleValueExtent}.
     */
    _reduceStackedCategoryValueExtent: function(result, catRange, catGroup){
        return this._unionReduceExtent(result, catRange);
    },

    markEventDefaults: {
        strokeStyle: "#5BCBF5",  /* Line Color */
        lineWidth: "0.5",  /* Line Width */
        textStyle: "#5BCBF5", /* Text Color */
        verticalOffset: 10, /* Distance between vertical anchor and label */
        verticalAnchor: "bottom", /* Vertical anchor: top or bottom */
        horizontalAnchor: "right", /* Horizontal anchor: left or right */
        forceHorizontalAnchor: false, /* Horizontal anchor position will be respected if true */
        horizontalAnchorSwapLimit: 80 /* Horizontal anchor will switch if less than this space available */
    },
    
    // TODO: chart orientation?
    markEvent: function(dateString, label, options){

        if(!this.options.timeSeries){
            pvc.log("Attempting to mark an event on a non timeSeries chart");
            return;
        }

        var o = $.extend({}, this.markEventDefaults, options);
        
        var baseScale = this.axes.base.scale;
            //{ bypassAxisOffset: true }); // TODO: why bypassAxisOffset ?

        // Are we outside the allowed scale?
        var d = pv.Format.date(this.options.timeSeriesFormat).parse(dateString);
        var dpos = baseScale(d),
            range = baseScale.range();
        
        if( dpos < range[0] || dpos > range[1]){
            pvc.log("Event outside the allowed range, returning");
            return;
        }

        // Add the line

        var panel = this._mainContentPanel.pvPanel;
        var h = this.yScale.range()[1];

        // Detect where to place the horizontalAnchor
        //var anchor = o.horizontalAnchor;
        if( !o.forceHorizontalAnchor ){
            var availableSize = o.horizontalAnchor == "right"? range[1]- dpos : dpos;
            
            // TODO: Replace this availableSize condition with a check for the text size
            if (availableSize < o.horizontalAnchorSwapLimit ){
                o.horizontalAnchor = o.horizontalAnchor == "right" ? "left" : "right";
            }
        }

        var line = panel.add(pv.Line)
            .data([0,h])
            .strokeStyle(o.strokeStyle)
            .lineWidth(o.lineWidth)
            .bottom(function(d){
                return d;
            })
            .left(dpos);

        //var pvLabel = 
        line.anchor(o.horizontalAnchor)
            .top(o.verticalAnchor == "top" ? o.verticalOffset : (h - o.verticalOffset))
            .add(pv.Label)
            .text(label)
            .textStyle(o.textStyle)
            .visible(function(){
                return !this.index;
            });
    }
}, {
    defaultOptions: {
        // Ortho <- value role
        orthoAxisOrdinal: false, // when true => _axisRoleNameMap['ortho'] = 'series' (instead of value)
        
        stacked: false
    }
});

/**
 * AxisPanel panel.
 */
pvc.AxisPanel = pvc.BasePanel.extend({
    showAllTimeseries: false, // TODO: ??
    
    pvRule:     null,
    pvTicks:    null,
    pvLabel:    null,
    pvRuleGrid: null,
    pvScale:    null,
    
    isDiscrete: false,
    roleName: null,
    axis: null,
    anchor: "bottom",
    axisSize: undefined,
    tickLength: 6,
    tickColor: "#aaa",
    panelName: "axis", // override
    scale: null,
    fullGrid: false,
    fullGridCrossesMargin: true,
    ruleCrossesMargin: true,
    zeroLine: false, // continuous axis
    font: '9px sans-serif', // label font
    labelSpacingMin: 1,
    // To be used in linear scales
    domainRoundMode: 'none',
    desiredTickCount: null,
    tickExponentMin:  null,
    tickExponentMax:  null,
    minorTicks:       true,
    
    _isScaleSetup: false,
    
    constructor: function(chart, parent, axis, options) {
        
        options = def.create(options, {
            anchor: axis.option('Position')
        });
        
        // sizeMax
        if(options.sizeMax == null){
            var sizeMax = options.axisSizeMax;
            if(sizeMax != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                var anchor = options.anchor || this.anchor;
                
                options.sizeMax = new pvc.Size()
                                    .setSize(sizeMax, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        this.base(chart, parent, options);
        
        this.axis = axis;
        this.roleName = axis.role.name;
        this.isDiscrete = axis.role.grouping.isDiscrete();
    },
    
    getTicks: function(){
        return this._layoutInfo && this._layoutInfo.ticks;
    },
    
    _calcLayout: function(layoutInfo){
        
        var scale = this.axis.scale;
        
        if(!this._isScaleSetup){
            this.pvScale = scale;
            this.scale   = scale; // TODO: At least HeatGrid depends on this. Maybe Remove?
            
            this.extend(scale, this.panelName + "Scale_");
            
            this._isScaleSetup = true;
        }
        
        if(scale.isNull){
            layoutInfo.axisSize = 0;
        } else {
            this._calcLayoutCore(layoutInfo);
        }
        
        return this.createAnchoredSize(layoutInfo.axisSize, layoutInfo.clientSize);
    },
    
    _calcLayoutCore: function(layoutInfo){
        //var layoutInfo = this._layoutInfo;
        
        // Fixed axis size?
        layoutInfo.axisSize = this.axisSize;
        
        if (this.isDiscrete && this.useCompositeAxis){
            if(layoutInfo.axisSize == null){
                layoutInfo.axisSize = 50;
            }
        } else {
            
            /* I  - Calculate ticks
             * --> layoutInfo.{ ticks, ticksText, maxTextWidth } 
             */
            this._calcTicks();
            
            /* II - Calculate REQUIRED axisSize so that all labels fit */
            if(layoutInfo.axisSize == null){
                this._calcAxisSizeFromLabel(); // -> layoutInfo.axisSize and layoutInfo.labelBBox
            }
            
            /* III - Calculate Trimming Length if FIXED/REQUIRED > AVAILABLE */
            this._calcMaxTextLengthThatFits();
            
            // Release memory.
            layoutInfo.labelBBox = null;
        }
    },
    
    _calcAxisSizeFromLabel: function(){
        this._calcLabelBBox();
        this._calcAxisSizeFromLabelBBox();
    },

    // --> layoutInfo.labelBBox
    _calcLabelBBox: function(){
        var layoutInfo = this._layoutInfo;
        
        var labelExtId = this.panelName + 'Label';
        
        var align = this._getExtension(labelExtId, 'textAlign');
        if(typeof align !== 'string'){
            align = this.isAnchorTopOrBottom() ? 
                    "center" : 
                    (this.anchor == "left") ? "right" : "left";
        }
        
        var baseline = this._getExtension(labelExtId, 'textBaseline');
        if(typeof baseline !== 'string'){
            switch (this.anchor) {
                case "right":
                case "left":
                case "center": 
                    baseline = "middle";
                    break;
                    
                case "bottom": 
                    baseline = "top";
                    break;
                  
                default:
                //case "top": 
                    baseline = "bottom";
                    //break;
            }
        } 
        
        var angle  = def.number.as(this._getExtension(labelExtId, 'textAngle'),  0);
        var margin = def.number.as(this._getExtension(labelExtId, 'textMargin'), 3);
        
        layoutInfo.labelBBox = pvc.text.getLabelBBox(
                        layoutInfo.maxTextWidth, 
                        layoutInfo.textHeight, 
                        align, 
                        baseline, 
                        angle, 
                        margin);
    },
    
    _calcAxisSizeFromLabelBBox: function(){
        var layoutInfo = this._layoutInfo;
        var labelBBox = layoutInfo.labelBBox;
        
        // The length not over the plot area
        var length;
        switch(this.anchor){
            case 'left':   length = -labelBBox.x; break;
            case 'right':  length = labelBBox.x2; break;
            case 'top':    length = -labelBBox.y; break;
            case 'bottom': length = labelBBox.y2; break;
        }
        
        length = Math.max(length, 0);
        
        // --------------
        
        layoutInfo.axisSize = this.tickLength + length; 
        
        // Add equal margin on both sides?
        var angle = labelBBox.sourceAngle;
        if(!(angle === 0 && this.isAnchorTopOrBottom())){
            // Text height already has some free space in that case
            // so no need to add more.
            layoutInfo.axisSize += this.tickLength;
        }
    },
    
    _calcMaxTextLengthThatFits: function(){
        var layoutInfo = this._layoutInfo;
        var maxClientLength = layoutInfo.clientSize[this.anchorOrthoLength()];
        if(layoutInfo.axisSize <= maxClientLength){
            // Labels fit
            // Clear to avoid unnecessary trimming
            layoutInfo.maxTextWidth = null;
        } else {
            // Text may not fit. 
            // Calculate maxTextWidth where text is to be trimmed.
            
            var labelBBox = layoutInfo.labelBBox;
            if(!labelBBox){
                // NOTE: requires previously calculated layoutInfo.maxTextWidth...
                this._calcAxisSizeFromLabel();
            }
            
            // Now move backwards, to the max text width...
            var maxOrthoLength = maxClientLength - 2 * this.tickLength;
            
            // A point at the maximum orthogonal distance from the anchor
            var mostOrthoDistantPoint;
            var parallelDirection;
            switch(this.anchor){
                case 'left':
                    parallelDirection = pv.vector(0, 1);
                    mostOrthoDistantPoint = pv.vector(-maxOrthoLength, 0);
                    break;
                
                case 'right':
                    parallelDirection = pv.vector(0, 1);
                    mostOrthoDistantPoint = pv.vector(maxOrthoLength, 0);
                    break;
                    
                case 'top':
                    parallelDirection = pv.vector(1, 0);
                    mostOrthoDistantPoint = pv.vector(0, -maxOrthoLength);
                    break;
                
                case 'bottom':
                    parallelDirection = pv.vector(1, 0);
                    mostOrthoDistantPoint = pv.vector(0, maxOrthoLength);
                    break;
            }
            
            // Intersect the line that passes through mostOrthoDistantPoint,
            // and has the direction parallelDirection with 
            // the top side and with the bottom side of the *original* label box.
            var corners = labelBBox.sourceCorners;
            var botL = corners[0];
            var botR = corners[1];
            var topL = corners[2];
            var topR = corners[3];
            
            var topRLSideDir = topR.minus(topL);
            var botRLSideDir = botR.minus(botL);
            var intersect = pv.SvgScene.lineIntersect;
            var botI = intersect(mostOrthoDistantPoint, parallelDirection, botL, botRLSideDir);
            var topI = intersect(mostOrthoDistantPoint, parallelDirection, topL, topRLSideDir);
            
            // Two cases
            // A) If the angle is between -90 and 90, the text does not get upside down
            // In that case, we're always interested in topI -> topR and botI -> botR
            // B) Otherwise the relevant new segments are topI -> topL and botI -> botL
            
            var maxTextWidth;
            if(Math.cos(labelBBox.sourceAngle) >= 0){
                // A) [-90, 90]
                maxTextWidth = Math.min(
                                    topR.minus(topI).length(), 
                                    botR.minus(botI).length());
            } else {
                maxTextWidth = Math.min(
                        topL.minus(topI).length(), 
                        botL.minus(botI).length());
            }
            
            // One other detail.
            // When align (anchor) is center,
            // just cutting on one side of the label original box
            // won't do, because when text is centered, the cut we make in length
            // ends up distributed by both sides...
            if(labelBBox.sourceAlign === 'center'){
                var cutWidth = labelBBox.sourceTextWidth - maxTextWidth;
                
                // Cut same width on the opposite side. 
                maxTextWidth -= cutWidth;
            }
            
            layoutInfo.maxTextWidth = maxTextWidth; 
        }
    },
    
    // ----------------
    
    _calcTicks: function(){
        var layoutInfo = this._layoutInfo;
        
        layoutInfo.textHeight = pvc.text.getTextHeight("m", this.font);
        layoutInfo.maxTextWidth = null;
        
        // update maxTextWidth, ticks and ticksText
        switch(this.scale.type){
            case 'Discrete'  : this._calcDiscreteTicks(); break;
            case 'Timeseries': this._calcTimeseriesTicks(); break;
            case 'Continuous': this._calcNumberTicks(); break;
            default: throw def.error.operationInvalid("Undefined axis scale type"); 
        }
        
        if(layoutInfo.maxTextWidth == null){
            layoutInfo.maxTextWidth = 
                def.query(layoutInfo.ticksText)
                    .select(function(text){ return pvc.text.getTextLength(text, this.font); }, this)
                    .max();
        }
    },
    
    _calcDiscreteTicks: function(){
        var layoutInfo = this._layoutInfo;
        var data = this.chart.visualRoles(this.roleName)
                        .flatten(this.chart.data, {visible: true});
         
        layoutInfo.data  = data;
        layoutInfo.ticks = data._children;
         
        layoutInfo.ticksText = def.query(data._children)
                            .select(function(child){ return child.absLabel; })
                            .array();
    },
    
    _calcTimeseriesTicks: function(){
        this._calcContinuousTicks(this._layoutInfo, this.desiredTickCount);
    },
    
    _calcNumberTicks: function(){
        var desiredTickCount = this.desiredTickCount;
        if(desiredTickCount == null){
            if(this.isAnchorTopOrBottom()){
                this._calcNumberHTicks();
                return;
            }
            
            desiredTickCount = this._calcNumberVDesiredTickCount();
        }
        
        this._calcContinuousTicks(this._layoutInfo, desiredTickCount);
    },
    
    // --------------
    
    _calcContinuousTicks: function(ticksInfo, desiredTickCount){
        this._calcContinuousTicksValue(ticksInfo, desiredTickCount);
        this._calcContinuousTicksText(ticksInfo);
    },
    
    _calcContinuousTicksValue: function(ticksInfo, desiredTickCount){
        ticksInfo.ticks = this.scale.ticks(
                                desiredTickCount, {
                                    roundInside:       this.domainRoundMode !== 'tick',
                                    numberExponentMin: this.tickExponentMin,
                                    numberExponentMax: this.tickExponentMax
                                });
    },
    
    _calcContinuousTicksText: function(ticksInfo){
        
        ticksInfo.ticksText = def.query(ticksInfo.ticks)
                               .select(function(tick){ return this.scale.tickFormat(tick); }, this)
                               .array();
    },
    
    // --------------
    
    _calcNumberVDesiredTickCount: function(){
        var layoutInfo = this._layoutInfo;
        
        var lineHeight   = layoutInfo.textHeight * (1 + Math.max(0, this.labelSpacingMin /*em*/)); 
        
        var clientLength = layoutInfo.clientSize[this.anchorLength()];
        
        return Math.max(1, ~~(clientLength / lineHeight));
    },
    
    _calcNumberHTicks: function(){
        var layoutInfo = this._layoutInfo;
        var clientLength = layoutInfo.clientSize[this.anchorLength()];
        var spacing = layoutInfo.textHeight * (1 + Math.max(0, this.labelSpacingMin/*em*/));
        var desiredTickCount = this._calcNumberHDesiredTickCount(this, spacing);
        
        var doLog = (pvc.debug >= 5);
        var dir, prevResultTickCount;
        var ticksInfo, lastBelow, lastAbove;
        do {
            if(doLog){ pvc.log("calculateNumberHTicks TickCount IN desired = " + desiredTickCount); }
            
            ticksInfo = {};
            
            this._calcContinuousTicksValue(ticksInfo, desiredTickCount);
            
            var ticks = ticksInfo.ticks;
            
            var resultTickCount = ticks.length;
            
            if(ticks.exponentOverflow){
                // TODO: Check if this part of the algorithm is working ok
                
                // Cannot go anymore in the current direction, if any
                if(dir == null){
                    if(ticks.exponent === this.exponentMin){
                        lastBelow = ticksInfo;
                        dir =  1;
                    } else {
                        lastAbove = ticksInfo;
                        dir = -1;
                    }
                } else if(dir === 1){
                    if(lastBelow){
                        ticksInfo = lastBelow;
                    }
                    break;
                } else { // dir === -1
                    if(lastAbove){
                        ticksInfo = lastAbove;
                    }
                    break;
                }
                
            } else if(prevResultTickCount == null || resultTickCount !== prevResultTickCount){
                
                if(doLog){ 
                    pvc.log("calculateNumberHTicks TickCount desired/resulting = " + desiredTickCount + " -> " + resultTickCount); 
                }
                
                prevResultTickCount = resultTickCount;
                
                this._calcContinuousTicksText(ticksInfo);
                
                var length = this._calcNumberHLength(ticksInfo, spacing);
                var excessLength  = length - clientLength;
                var pctError = ticksInfo.error = Math.abs(excessLength / clientLength);
                
                if(doLog){ 
                    pvc.log("calculateNumberHTicks Length client/resulting = " + clientLength + " / " + length + " spacing = " + spacing);
                }
                
                if(excessLength > 0){
                    // More ticks than can fit
                    if(desiredTickCount === 1){
                        break;
                    }
                    
                    if(lastBelow){
                        // We were below max length and then overshot...
                        // Choose the best conforming one
                        if(pctError > 0.05 || pctError > lastBelow.error){
                            ticksInfo = lastBelow;
                        }
                        break;
                    }
                    
                    // Backup last *above* calculation
                    lastAbove = ticksInfo;
                    
                    dir = -1;
                } else {
                    // Less ticks than could fit
                    
                    if(pctError <= 0.05 || dir === -1){
                        // Acceptable
                        // or
                        // Already had exceeded the length and had decided to go down
                        
                        if(lastAbove && pctError > lastAbove.error){
                            ticksInfo = lastAbove;
                        }
                        break;
                    }
                    
                    // Backup last *below* calculation
                    lastBelow = ticksInfo;
                                            
                    dir = +1;
                }
            }
            
            desiredTickCount += dir;
        } while(true);
        
        if(ticksInfo){
            layoutInfo.ticks = ticksInfo.ticks;
            layoutInfo.ticksText = ticksInfo.ticksText;
            layoutInfo.maxTextWidth = ticksInfo.maxTextWidth;
        }
        
        if(doLog){ pvc.log("calculateNumberHTicks END"); }
    },
    
    _calcNumberHDesiredTickCount: function(spacing){
        // The initial tick count is determined 
        // from the formatted min and max values of the domain.
        var layoutInfo = this._layoutInfo;
        var domainTextLength = this.scale.domain().map(function(tick){
                var text = this.scale.tickFormat(tick);
                return pvc.text.getTextLength(text, this.font); 
            }, this);
        
        var avgTextLength = Math.max((domainTextLength[1] + domainTextLength[0]) / 2, layoutInfo.textHeight);
        
        var clientLength = layoutInfo.clientSize[this.anchorLength()];
        
        return Math.max(1, ~~(clientLength / (avgTextLength + spacing)));
    },
    
    _calcNumberHLength: function(ticksInfo, spacing){
        // Measure full width, with spacing
        var ticksText = ticksInfo.ticksText;
        var tickCount = ticksText.length;
        var length = 0;
        var maxLength = -Infinity;
        for(var t = 0 ; t < tickCount ; t++){
            var textLength = pvc.text.getTextLength(ticksText[t], this.font);
            if(textLength > maxLength){
                maxLength = textLength;
            }
            
            if(t){
                length += spacing;
            }
            
            if(!t ||  t === tickCount - 1) {
                // Include half the text size only, as centered labels are the most common scenario
                length += textLength / 2;
            } else {
                // Middle tick
                length += textLength;
            }
        }
        
        ticksInfo.maxTextWidth = maxLength;
        
        return length;
    },
    
    _createCore: function() {
        this.renderAxis();
    },
    
    /**
     * @override
     */
    applyExtensions: function(){
        
        this.base();

        this.extend(this.pvPanel,      this.panelName + "_"     );
        this.extend(this.pvRule,       this.panelName + "Rule_" );
        this.extend(this.pvTicks,      this.panelName + "Ticks_");
        this.extend(this.pvLabel,      this.panelName + "Label_");
        this.extend(this.pvRuleGrid,   this.panelName + "Grid_" );
        this.extend(this.pvMinorTicks, this.panelName + "MinorTicks_");
        this.extend(this.pvZeroLine,   this.panelName + "ZeroLine_");
    },

    /**
     * Initializes a new layer panel.
     * @override
     */
    initLayerPanel: function(pvPanel, layer){
        if(layer === 'gridLines'){
            pvPanel.zOrder(-12);
        }
    },

    renderAxis: function(){
        if(this.scale.isNull){
            return;
        }
        
        // Z-Order
        // ==============
        // -10 - grid lines   (on 'gridLines' background panel)
        //   0 - content (specific chart types should render content on this zOrder)
        //  10 - end line     (on main foreground panel)
        //  20 - ticks        (on main foreground panel)
        //  30 - ruler (begin line) (on main foreground panel)
        //  40 - labels       (on main foreground panel)
        
        // Range
        var rMin  = this.ruleCrossesMargin ?  0 : this.scale.min,
            rMax  = this.ruleCrossesMargin ?  this.scale.size : this.scale.max,
            rSize = rMax - rMin,
            ruleParentPanel = this.pvPanel;

        this._rSize = rSize;

        this.pvRule = ruleParentPanel.add(pv.Rule)
            .zOrder(30) // see pvc.js
            .strokeStyle('black')
            // ex: anchor = bottom
            [this.anchorOpposite()](0)     // top    (of the axis panel)
            [this.anchorLength()  ](rSize) // width  
            [this.anchorOrtho()   ](rMin)  // left
            .svg({ 'stroke-linecap': 'square' })
            ;

        if (this.isDiscrete){
            if(this.useCompositeAxis){
                this.renderCompositeOrdinalAxis();
            } else {
                this.renderOrdinalAxis();
            }
        } else {
            this.renderLinearAxis();
        }
    },

    _getOrthoScale: function(){
        var orthoType = this.axis.type === 'base' ? 'ortho' : 'base';
        return this.chart.axes[orthoType].scale; // index 0
    },

    _getOrthoAxis: function(){
        var orthoType = this.axis.type === 'base' ? 'ortho' : 'base';
        return this.chart.axes[orthoType]; // index 0
    },

    renderOrdinalAxis: function(){
        var myself = this,
            scale = this.scale,
            anchorOpposite    = this.anchorOpposite(),
            anchorLength      = this.anchorLength(),
            anchorOrtho       = this.anchorOrtho(),
            anchorOrthoLength = this.anchorOrthoLength(),
            data              = this._layoutInfo.data,
            itemCount         = this._layoutInfo.ticks.length,
            includeModulo;
        
        if(this.axis.option('OverlappedLabelsHide') && itemCount > 0 && this._rSize > 0) {
            var overlapFactor = def.within(this.axis.option('OverlappedLabelsMaxPct'), 0, 0.9);
            var textHeight    = pvc.text.getTextHeight("m", this.font) * (1 - overlapFactor);
            includeModulo = Math.max(1, Math.ceil((itemCount * textHeight) / this._rSize));

            if(pvc.debug >= 4){
                pvc.log({overlapFactor: overlapFactor, itemCount: itemCount, textHeight: textHeight, Size: this._rSize, modulo: (itemCount * textHeight) / this._rSize, itemSpan: itemCount * textHeight, itemAvailSpace: this._rSize / itemCount});
            }
            
            if(pvc.debug >= 3 && includeModulo > 1) {
                pvc.log("Hiding every " + includeModulo + " labels in axis " + this.panelName);
            }
        } else {
            includeModulo = 1;
        }
        
        // Ticks correspond to each data in datas.
        // Ticks are drawn at the center of each band.
        this.pvTicks = this.pvRule.add(pv.Rule)
            .zOrder(20) // see pvc.js
            .data(this._layoutInfo.ticks)
            .localProperty('group')
            .group(function(child){ return child; })
            //[anchorOpposite   ](0)
            [anchorLength     ](null)
            [anchorOrtho      ](function(child){ return scale(child.value); })
            [anchorOrthoLength](this.tickLength)
            //.strokeStyle('black')
            .strokeStyle('rgba(0,0,0,0)') // Transparent by default, but extensible
            ;

        var align = this.isAnchorTopOrBottom() ? 
                    "center" : 
                    (this.anchor == "left") ? "right" : "left";
        
        var font = this.font;
        
        var maxTextWidth = this._layoutInfo.maxTextWidth;
        if(!isFinite(maxTextWidth)){
            maxTextWidth = 0;
        }
        
        // All ordinal labels are relevant and must be visible
        this.pvLabel = this.pvTicks.anchor(this.anchor).add(pv.Label)
            .intercept(
                'visible',
                labelVisibleInterceptor,
                this._getExtension(this.panelName + "Label", 'visible'))
            .zOrder(40) // see pvc.js
            .textAlign(align)
            .text(function(child){
                var text = child.absLabel;
                if(maxTextWidth){
                    text = pvc.text.trimToWidthB(maxTextWidth, text, font, '..', true);
                }
                return text; 
             })
            .font(font)
            .localProperty('group')
            .group(function(child){ return child; })
            ;
        
        function labelVisibleInterceptor(getVisible, args) {
            var visible = getVisible ? getVisible.apply(this, args) : true;
            return visible && ((this.index % includeModulo) === 0);
        }
        
        if(this._shouldHandleClick()){
            this.pvLabel
                .cursor("pointer")
                .events('all') //labels don't have events by default
                .event('click', function(child){
                    var ev = arguments[arguments.length - 1];
                    return myself._handleClick(child, ev);
                });
        }

        if(this.doubleClickAction){
            this.pvLabel
                .cursor("pointer")
                .events('all') //labels don't have events by default
                .event("dblclick", function(child){
                    var ev = arguments[arguments.length - 1];
                    myself._handleDoubleClick(child, ev);
                });
        }
        
        if(this.fullGrid){
            var fullGridRootScene = this._buildDiscreteFullGridScene(data),
                orthoAxis  = this._getOrthoAxis(),
                orthoScale = orthoAxis.scale,
                orthoFullGridCrossesMargin = orthoAxis.option('FullGridCrossesMargin'),
                ruleLength = orthoFullGridCrossesMargin ?
                                    orthoScale.size :
                                    (orthoScale.max - orthoScale.min),
                             // this.parent[anchorOrthoLength] - this[anchorOrthoLength],
                halfStep = scale.range().step / 2,
                count = fullGridRootScene.childNodes.length;
            
            this.pvRuleGrid = this.getPvPanel('gridLines').add(pv.Rule)
                .extend(this.pvRule)
                .data(fullGridRootScene.childNodes)
                .strokeStyle("#f0f0f0")
                [anchorOpposite   ](orthoFullGridCrossesMargin ? -ruleLength : -orthoScale.max)
                [anchorOrthoLength](ruleLength)
                [anchorLength     ](null)
                [anchorOrtho      ](function(scene){
                    var value = scale(scene.acts.value.value);
                    if(this.index +  1 < count){
                        return value - halfStep;
                    }

                    // end line
                    return value + halfStep;
                })
                ;
        }
    },

    _buildDiscreteFullGridScene: function(data){
        var rootScene = new pvc.visual.Scene(null, {panel: this, group: data});
        
        data.children()
            .each(function(childData){
                var childScene = new pvc.visual.Scene(rootScene, {group: childData});
                childScene.acts.value = {
                    value: childData.value,
                    label: childData.label,
                    absLabel: childData.absLabel
            };
        });

        /* Add a last scene, with the same data group */
        var lastScene  = rootScene.lastChild;
        if(lastScene){
            var endScene = new pvc.visual.Scene(rootScene, {group: lastScene.group});
            endScene.acts.value = lastScene.acts.value;
        }

        return rootScene;
    },

    renderLinearAxis: function(){
        // NOTE: Includes time series, 
        // so "d" may be a number or a Date object...
        
        var scale  = this.scale,
            orthoAxis  = this._getOrthoAxis(),
            orthoScale = orthoAxis.scale,
            ticks      = this._layoutInfo.ticks,
            anchorOpposite    = this.anchorOpposite(),
            anchorLength      = this.anchorLength(),
            anchorOrtho       = this.anchorOrtho(),
            anchorOrthoLength = this.anchorOrthoLength(),
            
            tickStep = Math.abs(ticks[1] - ticks[0]); // ticks.length >= 2
                
        // (MAJOR) ticks
        var pvTicks = this.pvTicks = this.pvRule.add(pv.Rule)
            .zOrder(20)
            .data(ticks)
            // [anchorOpposite ](0) // Inherited from pvRule
            [anchorLength     ](null)
            [anchorOrtho      ](scale)
            [anchorOrthoLength](this.tickLength);
            // Inherit axis color
            //.strokeStyle('black'); // control visibility through color or through .visible
        
        // MINOR ticks are between major scale ticks
        if(this.minorTicks){
            this.pvMinorTicks = this.pvTicks.add(pv.Rule)
                .zOrder(20) // not inherited
                //.data(ticks)  // ~ inherited
                //[anchorOpposite   ](0)   // Inherited from pvRule
                //[anchorLength     ](null)  // Inherited from pvTicks
                [anchorOrtho      ](function(d){ 
                    return scale((+d) + (tickStep / 2)); // NOTE: (+d) converts Dates to numbers, just like d.getTime()
                })
                [anchorOrthoLength](this.tickLength / 2)
                .intercept(
                    'visible',
                    minorTicksVisibleInterceptor,
                    this._getExtension(this.panelName + "MinorTicks", 'visible'))
                ;
        }

        function minorTicksVisibleInterceptor(getVisible, args){
            var visible = (!pvTicks.scene || pvTicks.scene[this.index].visible) &&
                          (this.index < ticks.length - 1);

            return visible && (getVisible ? getVisible.apply(this, args) : true);
        }

        this.renderLinearAxisLabel(ticks, this._layoutInfo.ticksText);

        // Now do the full grid lines
        if(this.fullGrid) {
            var orthoFullGridCrossesMargin = orthoAxis.option('FullGridCrossesMargin'),
                ruleLength = orthoFullGridCrossesMargin ? orthoScale.size : orthoScale.offsetSize;

            // Grid rules are visible (only) on MAJOR ticks.
            this.pvRuleGrid = this.getPvPanel('gridLines').add(pv.Rule)
                    .extend(this.pvRule)
                    .data(ticks)
                    .strokeStyle("#f0f0f0")
                    [anchorOpposite   ](orthoFullGridCrossesMargin ? -ruleLength : -orthoScale.max)
                    [anchorOrthoLength](ruleLength)
                    [anchorLength     ](null)
                    [anchorOrtho      ](scale)
                    ;
        }
    },
    
    renderLinearAxisLabel: function(ticks, ticksText){
        // Labels are visible (only) on MAJOR ticks,
        // On first and last tick care is taken
        //  with their H/V alignment so that
        //  the label is not drawn off the chart.

        // Use this margin instead of textMargin, 
        // which affects all margins (left, right, top and bottom).
        // Exception is the small 0.5 textMargin set below....
        var labelAnchor = this.pvTicks.anchor(this.anchor)
                                .addMargin(this.anchorOpposite(), 2);
        
        var scale = this.scale;
        var font = this.font;
        
        var maxTextWidth = this._layoutInfo.maxTextWidth;
        if(!isFinite(maxTextWidth)){
            maxTextWidth = 0;
        }
        
        var label = this.pvLabel = labelAnchor.add(pv.Label)
            .zOrder(40)
            .text(function(d){
                var text = ticksText[this.index]; // scale.tickFormat(d);
                if(maxTextWidth){
                    text = pvc.text.trimToWidthB(maxTextWidth, text, font, '..', true);
                }
                return text;
             })
            .font(this.font)
            .textMargin(0.5) // Just enough for some labels not to be cut (vertical)
            .visible(true);
        
        // Label alignment
        var rootPanel = this.pvPanel.root;
        if(this.isAnchorTopOrBottom()){
            label.textAlign(function(){
                var absLeft;
                if(this.index === 0){
                    absLeft = label.toScreenTransform().transformHPosition(label.left());
                    if(absLeft <= 0){
                        return 'left'; // the "left" of the text is anchored to the tick's anchor
                    }
                } else if(this.index === ticks.length - 1) { 
                    absLeft = label.toScreenTransform().transformHPosition(label.left());
                    if(absLeft >= rootPanel.width()){
                        return 'right'; // the "right" of the text is anchored to the tick's anchor
                    }
                }
                return 'center';
            });
        } else {
            label.textBaseline(function(){
                var absTop;
                if(this.index === 0){
                    absTop = label.toScreenTransform().transformVPosition(label.top());
                    if(absTop >= rootPanel.height()){
                        return 'bottom'; // the "bottom" of the text is anchored to the tick's anchor
                    }
                } else if(this.index === ticks.length - 1) { 
                    absTop = label.toScreenTransform().transformVPosition(label.top());
                    if(absTop <= 0){
                        return 'top'; // the "top" of the text is anchored to the tick's anchor
                    }
                }
                
                return 'middle';
            });
        }
    },

    // ----------------------------
    // Click / Double-click
    // TODO: unify this with base panel's code
    _handleDoubleClick: function(d, ev){
        if(!d){
            return;
        }
        
        var action = this.doubleClickAction;
        if(action){
            this._ignoreClicks = 2;

            action.call(null, d, ev);
        }
    },

    _shouldHandleClick: function(){
        var options = this.chart.options;
        return options.selectable || (options.clickable && this.clickAction);
    },

    _handleClick: function(data, ev){
        if(!data || !this._shouldHandleClick()){
            return;
        }

        // Selection
        
        if(!this.doubleClickAction){
            this._handleClickCore(data, ev);
        } else {
            // Delay click evaluation so that
            // it may be canceled if double click meanwhile
            // fires.
            var myself  = this,
                options = this.chart.options;
            window.setTimeout(
                function(){
                    myself._handleClickCore.call(myself, data, ev);
                },
                options.doubleClickMaxDelay || 300);
        }
    },

    _handleClickCore: function(data, ev){
        if(this._ignoreClicks) {
            this._ignoreClicks--;
            return;
        }

        // Classic clickAction
        var action = this.clickAction;
        if(action){
            action.call(null, data, ev);
        }

        // TODO: should this be cancellable by the click action?
        var options = this.chart.options;
        if(options.selectable && this.isDiscrete){
            var toggle = options.ctrlSelectMode && !ev.ctrlKey;
            this._selectOrdinalElement(data, toggle);
        }
    },

    _selectOrdinalElement: function(data, toggle){
        var selectedDatums = data.datums().array();
        
        selectedDatums = this._onUserSelection(selectedDatums);
        
        if(toggle){
            this.chart.data.owner.clearSelected();
        }

        pvc.data.Data.toggleSelected(selectedDatums);
        
        this._onSelectionChanged();
    },
    
    /**
     * Prevents the axis panel from reacting directly to rubber band selections.
     * 
     * The panel participates in rubber band selection through 
     * the mediator {@link pvc.CartesianAbstractPanel}.
     *   
     * @override
     */
    _dispatchRubberBandSelection: function(ev){
        /* NOOP */
    },
    
    /**
     * @override
     */
    _detectDatumsUnderRubberBand: function(datumsByKey, rb){
        if(!this.isDiscrete) {
            return false;
        }
        
        var any = false;
        
        function addData(data) {
            data.datums().each(function(datum){
                datumsByKey[datum.key] = datum;
                any = true;
            });
        }
        
        if(!this.useCompositeAxis){
            var mark = this.pvLabel;
            
            mark.forEachInstance(function(instance, t){
                if(!instance.isBreak) { 
                    var data = instance.group;
                    if(data) {
                        var shape = mark.getInstanceShape(instance).apply(t);
                        if (shape.intersectsRect(rb)){
                            addData(data);
                        }
                    }
                }
            }, this);
            
        } else {
            var t = this._pvLayout.toScreenTransform();
            this._rootElement.visitBefore(function(data, i){
                if(i > 0){
                    var centerX = t.transformHPosition(data.x + data.dx /2),
                        centerY = t.transformVPosition(data.y + data.dy /2);
                    if(rb.containsPoint(centerX, centerY)){
                       addData(data);
                    }
                }
            });
        }
        
        return any;
    },
    
    /////////////////////////////////////////////////
    //begin: composite axis
    renderCompositeOrdinalAxis: function(){
        var myself = this,
            isTopOrBottom = this.isAnchorTopOrBottom(),
            axisDirection = isTopOrBottom ? 'h' : 'v',
            tipsyGravity  = this._calcTipsyGravity(),
            diagDepthCutoff = 2, // depth in [-1/(n+1), 1]
            vertDepthCutoff = 2;
        
        var layout = this._pvLayout = this.getLayoutSingleCluster();

        // See what will fit so we get consistent rotation
        layout.node
            .def("fitInfo", null)
            .height(function(d, e, f){
                // Just iterate and get cutoff
                var fitInfo = pvc.text.getFitInfo(d.dx, d.dy, d.label, myself.font, diagMargin);
                if(!fitInfo.h){
                    if(axisDirection == 'v' && fitInfo.v){ // prefer vertical
                        vertDepthCutoff = Math.min(diagDepthCutoff, d.depth);
                    } else {
                        diagDepthCutoff = Math.min(diagDepthCutoff, d.depth);
                    }
                }

                this.fitInfo(fitInfo);

                return d.dy;
            });

        // label space (left transparent)
        // var lblBar =
        layout.node.add(pv.Bar)
            .fillStyle('rgba(127,127,127,.001)')
            .strokeStyle(function(d){
                if(d.maxDepth === 1 || !d.maxDepth) { // 0, 0.5, 1
                    return null;
                }

                return "rgba(127,127,127,0.3)"; //non-terminal items, so grouping is visible
            })
            .lineWidth( function(d){
                if(d.maxDepth === 1 || !d.maxDepth) {
                    return 0;
                }
                return 0.5; //non-terminal items, so grouping is visible
            })
            .text(function(d){
                return d.label;
            });

        //cutoffs -> snap to vertical/horizontal
        var H_CUTOFF_ANG = 0.30,
            V_CUTOFF_ANG = 1.27;
        
        var diagMargin = pvc.text.getFontSize(this.font) / 2;

        var align = isTopOrBottom ?
                    "center" :
                    (this.anchor == "left") ? "right" : "left";

        //draw labels and make them fit
        this.pvLabel = layout.label.add(pv.Label)
            .def('lblDirection','h')
            .textAngle(function(d){
                if(d.depth >= vertDepthCutoff && d.depth < diagDepthCutoff){
                    this.lblDirection('v');
                    return -Math.PI/2;
                }

                if(d.depth >= diagDepthCutoff){
                    var tan = d.dy/d.dx;
                    var angle = Math.atan(tan);
                    //var hip = Math.sqrt(d.dy*d.dy + d.dx*d.dx);

                    if(angle > V_CUTOFF_ANG){
                        this.lblDirection('v');
                        return -Math.PI/2;
                    }

                    if(angle > H_CUTOFF_ANG) {
                        this.lblDirection('d');
                        return -angle;
                    }
                }

                this.lblDirection('h');
                return 0;//horizontal
            })
            .textMargin(1)
            //override central alignment for horizontal text in vertical axis
            .textAlign(function(d){
                return (axisDirection != 'v' || d.depth >= vertDepthCutoff || d.depth >= diagDepthCutoff)? 'center' : align;
            })
            .left(function(d) {
                return (axisDirection != 'v' || d.depth >= vertDepthCutoff || d.depth >= diagDepthCutoff)?
                     d.x + d.dx/2 :
                     ((align == 'right')? d.x + d.dx : d.x);
            })
            .font(this.font)
            .text(function(d){
                var fitInfo = this.fitInfo();
                switch(this.lblDirection()){
                    case 'h':
                        if(!fitInfo.h){//TODO: fallback option for no svg
                            return pvc.text.trimToWidth(d.dx, d.label, myself.font, '..');
                        }
                        break;
                    case 'v':
                        if(!fitInfo.v){
                            return pvc.text.trimToWidth(d.dy, d.label, myself.font, '..');
                        }
                        break;
                    case 'd':
                       if(!fitInfo.d){
                          //var ang = Math.atan(d.dy/d.dx);
                          var diagonalLength = Math.sqrt(d.dy*d.dy + d.dx*d.dx) ;
                          return pvc.text.trimToWidth(diagonalLength - diagMargin, d.label, myself.font,'..');
                        }
                        break;
                }
                return d.label;
            })
            .cursor('default')
            .events('all'); //labels don't have events by default

        if(this._shouldHandleClick()){
            this.pvLabel
                .cursor("pointer")
                .event('click', function(data){
                    var ev = arguments[arguments.length - 1];
                    return myself._handleClick(data, ev);
                });
        }

        if(this.doubleClickAction){
            this.pvLabel
                .cursor("pointer")
                .event("dblclick", function(data){
                    var ev = arguments[arguments.length - 1];
                    myself._handleDoubleClick(data, ev);
                });
        }

        // tooltip
        this.pvLabel
            .title(function(d){
                this.instance().tooltip = d.label;
                return '';
            })
            .event("mouseover", pv.Behavior.tipsy({
                exclusionGroup: 'chart',
                gravity: tipsyGravity,
                fade: true,
                offset: diagMargin * 2,
                opacity:1
            }));
    },
    
    getLayoutSingleCluster: function(){
        // TODO: extend this to work with chart.orientation?
        var orientation = this.anchor,
            reverse   = orientation == 'bottom' || orientation == 'left',
            data      = this.chart.visualRoles(this.roleName)
                            .select(this.chart.data, {visible: true, reverse: reverse}),
            
            maxDepth  = data.treeHeight,
            elements  = data.nodes(),
            
            depthLength = this._layoutInfo.axisSize;
        
        this._rootElement = elements[0]; // lasso
            
        // displace to take out bogus-root
        maxDepth++;
        
        var baseDisplacement = depthLength / maxDepth,
            margin = maxDepth > 2 ? ((1/12) * depthLength) : 0;//heuristic compensation
        
        baseDisplacement -= margin;
        
        var scaleFactor = maxDepth / (maxDepth - 1),
            orthoLength = pvc.BasePanel.orthogonalLength[orientation];
        
        var displacement = (orthoLength == 'width') ?
                (orientation === 'left' ? [-baseDisplacement, 0] : [baseDisplacement, 0]) :
                (orientation === 'top'  ? [0, -baseDisplacement] : [0, baseDisplacement]);

        this.pvRule
            .strokeStyle(null)
            .lineWidth(0);

        var panel = this.pvRule
            .add(pv.Panel)
                [orthoLength](depthLength)
                .strokeStyle(null)
                .lineWidth(0) //cropping panel
            .add(pv.Panel)
                [orthoLength](depthLength * scaleFactor)
                .strokeStyle(null)
                .lineWidth(0);// panel resized and shifted to make bogus root disappear
        
        panel.transform(pv.Transform.identity.translate(displacement[0], displacement[1]));
        
        // Create with bogus-root
        // pv.Hierarchy must always have exactly one root and
        //  at least one element besides the root
        return panel.add(pv.Layout.Cluster.Fill)
                    .nodes(elements)
                    .orient(orientation);
    },
    
    _calcTipsyGravity: function(){
        switch(this.anchor){
            case 'bottom': return 's';
            case 'top':    return 'n';
            case 'left':   return 'w';
            case 'right':  return 'e';
        }
        return 's';
    }
    // end: composite axis
    /////////////////////////////////////////////////
});

pvc.AxisPanel.create = function(chart, parentPanel, cartAxis, options){
    var PanelClass = pvc[cartAxis.upperOrientedId + 'AxisPanel'] || 
        def.fail.argumentInvalid('cartAxis', "Unsupported cartesian axis");
    
    return new PanelClass(chart, parentPanel, cartAxis, options);
};

pvc.XAxisPanel = pvc.AxisPanel.extend({
    anchor: "bottom",
    panelName: "xAxis"
});

pvc.SecondXAxisPanel = pvc.XAxisPanel.extend({
    panelName: "secondXAxis"
});

pvc.YAxisPanel = pvc.AxisPanel.extend({
    anchor: "left",
    panelName: "yAxis"
});

pvc.SecondYAxisPanel = pvc.YAxisPanel.extend({
    panelName: "secondYAxis"
});

pvc.AxisTitlePanel = pvc.TitlePanelAbstract.extend({
    
    panelName: 'axis',
    
    _getFontExtension: function(){
        return this._getExtension(this.panelName + 'TitleLabel', 'font');
    },
    
    /**
     * @override
     */
    applyExtensions: function(){
        this.extend(this.pvPanel, this.panelName + 'Title_');
        this.extend(this.pvLabel, this.panelName + 'TitleLabel_');
    }
});

/**
 * PieChart is the main class for generating... pie charts (surprise!).
 */
pvc.PieChart = pvc.BaseChart.extend({

    pieChartPanel: null,
    legendSource: 'category',
    
    constructor: function(options) {

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.PieChart.defaultOptions, options);
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();
        
        this._addVisualRoles({
            category: { isRequired: true, defaultDimensionName: 'category*', autoCreateDimension: true },
            
            /* value: required, continuous, numeric */
            value:  { 
                isMeasure:  true,
                isRequired: true,
                isPercent:  true,
                requireSingleDimension: true, 
                requireIsDiscrete: false,
                valueType: Number, 
                defaultDimensionName: 'value' 
            }
        });
    },
    
    _preRenderCore: function() {

        this.base();

        if(pvc.debug >= 3){
            pvc.log("Prerendering in pieChart");
        }
        
        this.pieChartPanel = new pvc.PieChartPanel(this, this.basePanel, {
            innerGap: this.options.innerGap,
            explodedSliceRadius: this.options.explodedSliceRadius,
            explodedSliceIndex: this.options.explodedSliceIndex,
            showValues: this.options.showValues,
            showTooltips: this.options.showTooltips
        });
    }
},
{
    defaultOptions: {
        showValues: true,
        innerGap: 0.9,
        explodedSliceRadius: 0,
        explodedSliceIndex: null,
        valuesMask: "{0}" // 0 for value, 1 for percentage (% sign is up to you) 
    }
});

/*
 * Pie chart panel. Generates a pie chart. Specific options are: <i>showValues</i> -
 * Show or hide slice value. Default: false <i>explodedSliceIndex</i> - Index
 * of the slice to explode. Default: null <i>explodedSliceRadius</i> - If one
 * wants a pie with an exploded effect, specify a value in pixels here. If above
 * argument is specified, explodes only one slice. Else explodes all. Default: 0
 * <i>innerGap</i> - The percentage of the inner area used by the pie. Default:
 * 0.9 (90%) Has the following protovis extension points: <i>chart_</i> - for
 * the main chart Panel <i>pie_</i> - for the main pie wedge <i>pieLabel_</i> -
 * for the main pie label
 */

pvc.PieChartPanel = pvc.BasePanel.extend({
    anchor: 'fill',
    pvPie: null,
    pvPieLabel: null,
    innerGap: 0.9,
    explodedSliceRadius: 0,
    explodedSliceIndex: null,
    showTooltips: true,
    showValues: true,

    /**
     * @override
     */
    _createCore: function() {
        var myself = this,
            chart = this.chart,
            options = chart.options;

        // Add the chart. For a pie chart we have one series only
        var visibleKeyArgs = {visible: true},
            data = chart.visualRoles('category').flatten(chart.data, visibleKeyArgs),
            valueDimName = chart.visualRoles('value').firstDimensionName(),
            valueDim = data.dimensions(valueDimName);

        this.sum = data.dimensionsSumAbs(valueDimName, visibleKeyArgs);
        
        var colorProp = def.scope(function(){
         // Color "controller"
            var colorScale = chart._legendColorScale(this.dataPartValue);

            return function(catGroup) {
                var color = colorScale(catGroup.value);
                if(data.owner.selectedCount() > 0 && !this.hasSelected()) {
                    return pvc.toGrayScale(color, 0.6);
                }
                
                return color;
            };
        });
        
        var angleScale = pv.Scale
                           .linear(0, this.sum)
                           .range (0, 2 * Math.PI);
        
        var radius = Math.min(this.width, this.height) / 2,
            outerRadius  = radius * this.innerGap,
            centerBottom = this.height / 2,
            centerLeft   = this.width  / 2;
        
        if(pvc.debug >= 3) {
            pvc.log("Radius: " + outerRadius + "; Maximum sum: " + this.sum);
        }
        
        this.pvPie = this.pvPanel
            .add(pv.Wedge)
            .data(data._leafs)
            .localProperty('group')
            .group(function(catGroup){ return catGroup; })
            .localProperty('value', Number)
            .value(function(catGroup){
                return catGroup.dimensions(valueDimName).sum(visibleKeyArgs); // May be negative
            })
            .localProperty('hasSelected')
            .hasSelected(function(catGroup){
                return catGroup.selectedCount() > 0;                    
            })
            .angle(function(){ return angleScale(Math.abs(this.value())); })
            .localProperty('midAngle', Number)
            .midAngle(function(){
                var instance = this.instance();
                return instance.startAngle + (instance.angle / 2);
            })
            .bottom(function(){ return centerBottom - myself._explodeSlice('sin', this); })
            .left  (function(){ return centerLeft   + myself._explodeSlice('cos', this); })
            .outerRadius(function(){ return chart.animate(0, outerRadius); })
            .fillStyle(colorProp);

        if (options.showTooltips) {
            this._addPropTooltip(this.pvPie);
        }
        
        if(this._shouldHandleClick()){
            this._addPropClick(this.pvPie);
        }
        
        if(options.doubleClickAction) {
            this._addPropDoubleClick(this.pvPie);
        }
        
        if(this.showValues){
            var formatValue = function(value, catGroup){
                // Prefer to return the already formatted/provided label
                var datums = catGroup._datums;
                if(datums.length > 1){
                    return valueDim.format(value);
                }
                
                return datums[0].atoms[valueDimName].label;
            };
            
            var formatPercent = function(value, catGroup){
                var percent = catGroup.dimensions(valueDimName).percentOverParent(visibleKeyArgs);
                return options.valueFormat.call(null, Math.round(percent  * 1000) / 10);
            };
            
            var defaultValuesMask = options.valuesMask;
            var valuesMaskFormatter = {};
            var getFormatValuesMask = function(valuesMask){
                if(valuesMask == null){
                    if(valuesMask === null){
                        return null;
                    }
                    // is undefined
                    
                    valuesMask = defaultValuesMask;
                }
                
                var formatter = valuesMaskFormatter[valuesMask];
                if(!formatter){
                    switch(valuesMask){
                        case '{0}': formatter = formatValue;   break;
                        case '{1}': formatter = formatPercent; break;
                        default:
                            var showValue   = valuesMask.indexOf('{0}') >= 0;
                            var showPercent = valuesMask.indexOf('{1}') >= 0;
                            if(showValue || showPercent){
                                formatter = function(value, catGroup){
                                    return def.format(valuesMask, [
                                                showValue   ? formatValue  (value, catGroup) : null, 
                                                showPercent ? formatPercent(value, catGroup) : null
                                           ]);
                                };
                            } else {
                                formatter = def.fun.constant(valuesMask);
                            }
                            break;
                    }
                    
                    valuesMaskFormatter[valuesMask] = formatter;
                }
                
                return formatter;
            };
            
            var valuesMaskInterceptor = function(getValuesMask, args) {
                return getValuesMask ? getValuesMask.apply(this, args) : defaultValuesMask;
            };
            
            this.pvPieLabel = this.pvPie.anchor("outer").add(pv.Label)
                // .textAngle(0)
                .localProperty('valuesMask')
                .valuesMask(defaultValuesMask)
                // Intercepting ensures it is evaluated before "text"
                .intercept('valuesMask', valuesMaskInterceptor, this._getExtension('pieLabel', 'valuesMask'))
                .text(function(catGroup) {
                    // No text on 0-width slices... // TODO: ideally the whole slice would be visible=false; when scenes are added this is easily done
                    var value = myself.pvPie.value();
                    if(!value){
                        return null;
                    }
                    
                    var formatter = getFormatValuesMask(this.valuesMask());
                    if(!formatter){
                        return null;
                    }
                    
                    return " " + formatter(value, catGroup);
                 })
                .textMargin(10);
        }
    },
    
    applyExtensions: function(){
        this.extend(this.pvPie, "pie_");
        this.extend(this.pvPieLabel, "pieLabel_");
        this.extend(this.pvPanel, "chart_");
    },
    
    _explodeSlice: function(fun, mark) {
        var offset = 0;
        if (this.explodedSliceIndex == mark.index) {
            offset = this.explodedSliceRadius * Math[fun](mark.midAngle());
        }
        
        return offset;
    },
    
    /**
     * Renders this.pvBarPanel - the parent of the marks that are affected by selection changes.
     * @override
     */
    _renderInteractive: function(){
        this.pvPie.render();
    },

    /**
     * Returns an array of marks whose instances are associated to a datum, or null.
     * @override
     */
    _getSignums: function(){
        return [this.pvPie];
    }
});

/**
 * Bar Abstract Panel.
 * The base panel class for bar charts.
 * 
 * Specific options are:
 * <i>orientation</i> - horizontal or vertical. Default: vertical
 * <i>showValues</i> - Show or hide bar value. Default: false
 * <i>barSizeRatio</i> - In multiple series, percentage of inner
 * band occupied by bars. Default: 0.9 (90%)
 * <i>maxBarSize</i> - Maximum size (width) of a bar in pixels. Default: 2000
 *
 * Has the following protovis extension points:
 * <i>chart_</i> - for the main chart Panel
 * <i>bar_</i> - for the actual bar
 * <i>barPanel_</i> - for the panel where the bars sit
 * <i>barLabel_</i> - for the main bar label
 */
pvc.BarAbstractPanel = pvc.CartesianAbstractPanel.extend({
    
    pvBar: null,
    pvBarLabel: null,
    pvCategoryPanel: null,
    pvSecondLine: null,
    pvSecondDot: null,

    data: null,

    barSizeRatio: 0.9,
    maxBarSize: 200,
    showValues: true,
    barWidth: null,
    barStepWidth: null,
    _linePanel: null,

    constructor: function(chart, parent, options){
        this.base(chart, parent, options);

        // Cache
        options = this.chart.options;
        this.stacked = options.stacked;
    },

    /**
     * @override
     */
    _createCore: function(){
        this.base();
         
        var chart = this.chart,
            options = chart.options,
            isStacked = !!this.stacked,
            isVertical = this.isOrientationVertical();

        var data = this._getVisibleData(), // shared "categ then series" grouped data
            seriesData = chart._serRole.flatten(data),
            rootScene = this._buildScene(data, seriesData)
            ;

        var orthoScale = chart.axes.ortho.scale,
            orthoZero  = orthoScale(0),
            sceneOrthoScale = chart.axes.ortho.sceneScale({nullToZero: false}),
            
            bandWidth = chart.axes.base.scale.range().band,
            barStepWidth = chart.axes.base.scale.range().step,
            barWidth,

            reverseSeries = isVertical === isStacked // (V && S) || (!V && !S)
            ;

        if(isStacked){
            barWidth = bandWidth;
        } else {
            var S = seriesData.childCount();
            barWidth = S > 0 ? (bandWidth * this.barSizeRatio / S) : 0;
        }
        
        if (barWidth > this.maxBarSize) {
            barWidth = this.maxBarSize;
        }

        this.barWidth  = barWidth;
        this.barStepWidth = barStepWidth;
        
        this.pvBarPanel = this.pvPanel.add(pv.Layout.Band)
            .layers(rootScene.childNodes) // series -> categories
            .values(function(seriesScene){ return seriesScene.childNodes; })
            .orient(isVertical ? 'bottom-left' : 'left-bottom')
            .layout(isStacked  ? 'stacked' : 'grouped')
            .verticalMode(this._barVerticalMode())
            .yZero(orthoZero)
            .band // categories
                .x(chart.axes.base.sceneScale())
                .w(bandWidth)
                .differentialControl(this._barDifferentialControl())
            .item
                // Stacked Vertical bar charts show series from
                // top to bottom (according to the legend)
                .order(reverseSeries ? "reverse" : null)
                .h(function(scene){
                    /* May be negative */
                    var h = sceneOrthoScale(scene);
                    return h != null ? chart.animate(0, h - orthoZero) : null;
                })
                .w(barWidth)
                .horizontalRatio(this.barSizeRatio)
                .verticalMargin(options.barStackedMargin || 0)
            .end
            ;

        this.pvBar = new pvc.visual.Bar(this, this.pvBarPanel.item, {
                extensionId: 'bar',
                freePosition: true
            })
            .lockDimensions()
            .pvMark
            ;

        this._addOverflowMarkers();
        
        if(this.showValues){
            this.pvBarLabel = this.pvBar.anchor(this.valuesAnchor || 'center')
                .add(pv.Label)
                .localProperty('_valueAct')
                ._valueAct(function(scene){
                    return options.showValuePercentage ?
                            scene.acts.value.percent :
                            scene.acts.value;
                })
                .visible(function() { //no space for text otherwise
                    var length = this.scene.target[this.index][isVertical ? 'height' : 'width'];
                    // Too small a bar to show any value?
                    return length >= 4;
                })
                .text(function(){
                    return this._valueAct().label;
                });
        }
    },

    /**
     * Called to obtain the bar verticalMode property value.
     * If it returns a function,
     * that function will be called once.
     * @virtual
     */
    _barVerticalMode: function(){
        return null;
    },

    /**
     * Called to obtain the bar differentialControl property value.
     * If it returns a function,
     * that function will be called once per category,
     * on the first series.
     * @virtual
     */
    _barDifferentialControl: function(){
        return null;
    },
    
    /**
     * @override
     */
    applyExtensions: function(){

        this.base();

        // Extend bar and barPanel
        this.extend(this.pvBarPanel, "barPanel_");
        this.extend(this.pvBar, "bar_");

        this.extend(this.pvUnderflowMarker, "barUnderflowMarker_");
        this.extend(this.pvOverflowMarker,  "barOverflowMarker_");

        this.extend(this.pvBarLabel, "barLabel_");
        
        if(this._linePanel){
            this.extend(this._linePanel.pvLine, "barSecondLine_");
            this.extend(this._linePanel.pvDot,  "barSecondDot_" );
        }
    },

    _addOverflowMarkers: function(){
        var orthoAxis = this.chart.axes.ortho;
        if(orthoAxis.option('FixedMax') != null){
            this.pvOverflowMarker = this._addOverflowMarker(false, orthoAxis.scale);
        }

        if(orthoAxis.option('FixedMin') != null){
            this.pvUnderflowMarker = this._addOverflowMarker(true, orthoAxis.scale);
        }
    },

    _addOverflowMarker: function(isMin, orthoScale){
        /* NOTE: pv.Bar is not a panel,
         * and as such markers will be children of bar's parent,
         * yet have bar's anchor as a prototype.
         */

        var myself = this,
            isVertical = this.isOrientationVertical(),
            orthoProp = isVertical ? "bottom" : "left",
            lengthProp = myself.anchorOrthoLength(orthoProp),
            orthoLengthProp = myself.anchorLength(orthoProp),
            rOrthoBound = isMin ?
                        (orthoScale.min - orthoScale.offset) :
                        (orthoScale.max + orthoScale.offset),
        
            angle;

        if(!isMin){
            angle = isVertical ? Math.PI: -Math.PI/2;
        } else {
            angle = isVertical ? 0: Math.PI/2;
        }
        
        return this.pvBar.anchor('center').add(pv.Dot)
            .visible(function(scene){
                var value = scene.acts.value.value;
                if(value == null){
                    return false;
                }

                var targetInstance = this.scene.target[this.index];
                // Where is the position of the max of the bar??
                var orthoMaxPos = targetInstance[orthoProp] +
                                  (value > 0 ? targetInstance[lengthProp] : 0);
                return isMin ?
                        (orthoMaxPos < rOrthoBound) :
                        (orthoMaxPos > rOrthoBound);
            })
            .shape("triangle")
            .lock('shapeSize')
            .shapeRadius(function(){
                return Math.min(
                        Math.sqrt(10),
                        this.scene.target[this.index][orthoLengthProp] / 2);
            })
            .shapeAngle(angle)
            .lineWidth(1.5)
            .strokeStyle("red")
            .fillStyle("white")
            [orthoProp](function(){
                return rOrthoBound + (isMin ? 1 : -1) * (this.shapeRadius() + 2);
            })
            [this.anchorOpposite(orthoProp)](null)
            ;
    },

    /**
     * Renders this.pvPanel - the parent of the marks that are affected by selection changes.
     * @override
     */
    _renderInteractive: function(){
        this.pvPanel.render();
    },

    /**
     * Returns an array of marks whose instances are associated to a datum, or null.
     * @override
     */
    _getSignums: function(){
        return [this.pvBar];
    },

    _buildScene: function(data, seriesData){
        var rootScene  = new pvc.visual.Scene(null, {panel: this, group: data}),
            categDatas = data._children;

        /**
         * Create starting scene tree
         */
        seriesData
            .children()
            .each(createSeriesScene, this);

        return rootScene;

        function createSeriesScene(seriesData1){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesData1}),
                seriesKey   = seriesData1.key;

            this._onNewSeriesScene(seriesScene, seriesData1);

            categDatas.forEach(function(categData1){
                /* Create leaf scene */
                var categKey = categData1.key,
                    group = data._childrenByKey[categKey]._childrenByKey[seriesKey],

                    /* If there's no group, provide, at least, a null datum */
                    datum = group ? null : createNullDatum(seriesData1, categData1),
                    scene = new pvc.visual.Scene(seriesScene, {group: group, datum: datum});

                this._onNewSeriesCategoryScene(scene, categData1, seriesData1);
            }, this);
        }

        function createNullDatum(serData1, catData1) {
            // Create a null datum with col and row coordinate atoms
            var atoms = def.array.append(
                            def.own(serData1.atoms),
                            def.own(catData1.atoms));

            return new pvc.data.Datum(data, atoms, true);
        }
    },

    _onNewSeriesScene: function(seriesScene, seriesData1){
        seriesScene.acts.series = {
            value: seriesData1.value,
            label: seriesData1.label
        };
    },

    _onNewSeriesCategoryScene: function(categScene, categData1, seriesData1){
        categScene.acts.category = {
            value: categData1.value,
            label: categData1.label,
            group: categData1
        };

        var chart = this.chart,
            valueDim = categScene.group ?
                            categScene
                                .group
                                .dimensions(chart._valueDim.name) :
                            null;

        var value = valueDim ? valueDim.sum({visible: true, zeroIfNone: false}) : null;

        var valueAct = categScene.acts.value = {
            value:    value,
            label:    chart._valueDim.format(value)
        };

        // TODO: Percent formatting?
        if(chart.options.showValuePercentage) {
            if(value == null){
                valueAct.percent = {
                    value: null,
                    label: valueAct.label
                };
            } else {
                var valuePct = valueDim.percentOverParent({visible: true});
                valueAct.percent = {
                    value: valuePct,
                    label: chart.options.valueFormat.call(null, Math.round(valuePct * 100))
                };
            }
        }

        categScene.isNull = !categScene.group; // A virtual scene?
    }
});
/**
 * BarAbstract is the base class for generating charts of the bar family.
 */
pvc.BarAbstract = pvc.CategoricalAbstract.extend({

    constructor: function(options){

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.BarAbstract.defaultOptions, options);

        var parent = this.parent;
        if(parent) {
            this._valueRole = parent._valueRole;
        }
    },

    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();
        
        this._addVisualRoles({
            /* value: required, continuous, numeric */
            value:  {
                isMeasure: true,
                isRequired: true,
                isPercent: this.options.stacked,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: 'value'
            }
        });

        this._valueRole = this.visualRoles('value');
    },

    _initData: function(){
        this.base.apply(this, arguments);

        var data = this.data;

        // Cached
        this._valueDim = data.dimensions(this._valueRole.firstDimensionName());
    }
}, {
    defaultOptions: {
        showValues:   true,
        barSizeRatio: 0.9,   // for grouped bars
        maxBarSize:   2000,
        barStackedMargin: 0, // for stacked bars
        valuesAnchor: "center",
        showValuePercentage: false
    }
});/**
 * Bar Panel.
 */
pvc.BarPanel = pvc.BarAbstractPanel.extend({
});
/**
 * BarChart is the main class for generating... bar charts (another surprise!).
 */
pvc.BarChart = pvc.BarAbstract.extend({

    constructor: function(options){

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.BarChart.defaultOptions, options);
    },
    
    _processOptionsCore: function(options){
        
        this.base(options);
        
        if(options.secondAxis && !options.showLines && !options.showDots && !options.showAreas){
            options.showLines = true;
        }
    },
    
    _hasDataPartRole: function(){
        return true;
    },

    _getAxisDataParts: function(axis){
        if(this.options.secondAxis && axis.type === 'ortho'){
            if(this.options.secondAxisIndependentScale){
                // Separate scales =>
                // axis ortho 0 represents data 0
                // axis ortho 1 represents data 1
                return (''+axis.index);
            }

            // Common scale => axis ortho 0 represents both data parts
            return ['0', '1'];
        }

        // The base axis represents categories of all data parts
        return null;
    },
    
    _isDataCellStacked: function(role, dataPartValue){
        return !dataPartValue || (dataPartValue === '0') ? this.options.stacked : false;
    },

    /**
     * @override 
     */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in barChart");
        }
        
        var options = this.options;
        var barPanel = new pvc.BarPanel(this, parentPanel, {
            dataPartValue:  options.secondAxis ? '0' : null,
            barSizeRatio: options.barSizeRatio,
            maxBarSize:   options.maxBarSize,
            showValues:   options.showValues,
            valuesAnchor: options.valuesAnchor,
            orientation:  options.orientation
        });

        if(options.secondAxis){
            if(pvc.debug >= 3){
                pvc.log("Creating LineDotArea panel.");
            }
            
            var linePanel = new pvc.LineDotAreaPanel(this, parentPanel, {
                dataPartValue:  '1',
                stacked:        false,
                showValues:     !(options.compatVersion <= 1) && options.showValues,
                valuesAnchor:   options.valuesAnchor != 'center' ? options.valuesAnchor : 'right',
                showLines:      options.showLines,
                showDots:       options.showDots,
                showAreas:      options.showAreas,
                orientation:    options.orientation,
                nullInterpolationMode: options.nullInterpolationMode
            });

            this._linePanel = linePanel;
            
            barPanel._linePanel = linePanel;
        }
        
        return barPanel;
    }
}, {
    defaultOptions: {
        showDots: true,
        showLines: true,
        showAreas: false,
        nullInterpolationMode: 'none'
    }
});

/**
 * Normalized Bar Panel.
 */
pvc.NormalizedBarPanel = pvc.BarAbstractPanel.extend({
    _barVerticalMode: function(){
        return 'expand';
    }
});
/**
 * A NormalizedBarChart is a 100% stacked bar chart.
 */
pvc.NormalizedBarChart = pvc.BarAbstract.extend({

    constructor: function(options){

        options = def.set(options, 'stacked', true);

        this.base(options);
    },

    /**
     * Processes options after user options and default options have been merged.
     * @override
     */
    _processOptionsCore: function(options){

        options.stacked = true;

        this.base(options);
    },

    /**
     * @override
     */
    _getVisibleValueExtentConstrained: function(axis, dataPartValues, min, max){
        if(axis.type === 'ortho') {
            /* 
             * Forces showing 0-100 in the axis.
             * Note that the bars are stretched automatically by the band layout,
             * so this scale ends up being ignored by the bars.
             * Note also that each category would have a different scale,
             * so it isn't possible to provide a single correct scale,
             * that would satisfy all the bars...
             */
            min = 0;
            max = 100;
        }

        return this.base(axis, dataPartValues, min, max);
    },

    /* @override */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in NormalizedBarChart");
        }
        
        var options = this.options;
        return new pvc.NormalizedBarPanel(this, parentPanel, {
            barSizeRatio: options.barSizeRatio,
            maxBarSize:   options.maxBarSize,
            showValues:   options.showValues,
            valuesAnchor: options.valuesAnchor,
            orientation:  options.orientation
        });
    }
});
/**
 * Waterfall chart panel.
 * Specific options are:
 * <i>orientation</i> - horizontal or vertical. Default: vertical
 * <i>showValues</i> - Show or hide bar value. Default: false
 * <i>barSizeRatio</i> - In multiple series, percentage of inner
 * band occupied by bars. Default: 0.9 (90%)
 * <i>maxBarSize</i> - Maximum size (width) of a bar in pixels. Default: 2000
 *
 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 * <i>bar_</i> - for the actual bar
 * <i>barPanel_</i> - for the panel where the bars sit
 * <i>barLabel_</i> - for the main bar label
 */
pvc.WaterfallPanel = pvc.BarAbstractPanel.extend({
    pvWaterfallLine: null,
    ruleData: null,

    /**
     * Called to obtain the bar differentialControl property value.
     * If it returns a function,
     * that function will be called once per category,
     * on the first series.
     * @virtual
     */
    _barDifferentialControl: function(){
        var isFalling = this.chart._isFalling;

        /*
         * From protovis help:
         *
         * Band differential control pseudo-property.
         *  2 - Drawn starting at previous band offset. Multiply values by  1. Don't update offset.
         *  1 - Drawn starting at previous band offset. Multiply values by  1. Update offset.
         *  0 - Reset offset to 0. Drawn starting at 0. Default. Leave offset at 0.
         * -1 - Drawn starting at previous band offset. Multiply values by -1. Update offset.
         * -2 - Drawn starting at previous band offset. Multiply values by -1. Don't update offset.
         */
        return function(scene){
            if(isFalling && !this.index){
                // First falling bar is the main total
                // Must be accounted up and update the total
                return 1;
            }

            if(scene.acts.category.group._isFlattenGroup){
                // Groups don't update the total
                // Groups, always go down, except the first falling...
                return -2;
            }
            
            return isFalling ? -1 : 1;
        };
    },

    _createCore: function(){

        this.base();

        var chart = this.chart,
            options = chart.options,
            isVertical = this.isOrientationVertical(),
            anchor = isVertical ? "bottom" : "left",
            ao = this.anchorOrtho(anchor),
            ruleRootScene = this._buildRuleScene(),
            orthoScale = chart.axes.ortho.scale,
            orthoPanelMargin = 0.04 * (orthoScale.range()[1] - orthoScale.range()[0]),
            orthoZero = orthoScale(0),
            sceneOrthoScale = chart.axes.ortho.sceneScale(),
            sceneBaseScale  = chart.axes.base.sceneScale(),
            baseScale = chart.axes.base.scale,
            barWidth2 = this.barWidth/2,
            barWidth = this.barWidth,
            barStepWidth = this.barStepWidth,
            isFalling = chart._isFalling,
            waterColor = chart._waterColor
            ;

        if(chart.options.showWaterGroupAreas){
            var panelColors = pv.Colors.category10();
            var waterGroupRootScene = this._buildWaterGroupScene();
            
            this.pvWaterfallGroupPanel = this.pvPanel.add(pv.Panel)
                .data(waterGroupRootScene.childNodes)
                .zOrder(-1)
                .fillStyle(function(scene){
                    return panelColors(0)/* panelColors(scene.acts.category.level - 1)*/.alpha(0.15);
                })
                [ao](function(scene){
                    var categAct = scene.acts.category;
                    return baseScale(categAct.leftValue) - barStepWidth / 2;
                })
                [this.anchorLength(anchor)](function(scene){
                    var categAct = scene.acts.category,
                        length = Math.abs(baseScale(categAct.rightValue) -
                                baseScale(categAct.leftValue))
                        ;

                    return length + barStepWidth;
                })
                [anchor](function(scene){
                    return orthoScale(scene.acts.value.bottomValue) - orthoPanelMargin/2;
                })
                [this.anchorOrthoLength(anchor)](function(scene){
                    return orthoScale(scene.acts.value.heightValue) + orthoPanelMargin;
                    //return chart.animate(orthoZero, orthoScale(scene.categ) - orthoZero);
                })
                ;
        }
        
        this.pvBar
            .sign()
            .override('baseColor', function(type){
                var color = this.base(type);
                if(type === 'fill'){
                    if(this.scene.acts.category.group._isFlattenGroup){
                        return pv.color(color).alpha(0.75);
                    }
                }
                
                return color;
            })
            ;
        
        this.pvWaterfallLine = new pvc.visual.Rule(this, this.pvPanel, {
                extensionId: 'barWaterfallLine',
                noTooltips:  false,
                noHoverable: false
            })
            .lockValue('data', ruleRootScene.childNodes)
            .optional('visible', function(){
                return ( isFalling && !!this.scene.previousSibling) ||
                       (!isFalling && !!this.scene.nextSibling);
            })
            .optional(anchor, function(){ 
                return orthoZero + chart.animate(0, sceneOrthoScale(this.scene) - orthoZero);
            })
            .optionalValue(this.anchorLength(anchor), barStepWidth + barWidth)
            .optional(ao,
                isFalling ?
                    function(){ return sceneBaseScale(this.scene) - barStepWidth - barWidth2; } :
                    function(){ return sceneBaseScale(this.scene) - barWidth2; })
            .override('baseColor', function(){ return this.delegate(waterColor); })
            .pvMark
            .svg({ 'stroke-linecap': 'round' })
            ;

        if(chart.options.showWaterValues){
            this.pvWaterfallLabel = this.pvWaterfallLine
                .add(pv.Label)
                [anchor](function(scene){
                    return orthoZero + chart.animate(0, sceneOrthoScale(scene) - orthoZero);
                })
                .visible(function(scene){
                     if(scene.acts.category.group._isFlattenGroup){
                         return false;
                     }

                     return isFalling || !!scene.nextSibling;
                 })
                [this.anchorOrtho(anchor)](sceneBaseScale)
                .textAlign(isVertical ? 'center' : 'left')
                .textBaseline(isVertical ? 'bottom' : 'middle')
                .textStyle(pv.Color.names.darkgray.darker(2))
                .textMargin(5)
                .text(function(scene){ return scene.acts.value.label; });
        }
    },

    /**
     * @override
     */
    applyExtensions: function(){

        this.base();

        this.extend(this.pvWaterfallLine,       "barWaterfallLine_");
        this.extend(this.pvWaterfallLabel,      "barWaterfallLabel_");
        this.extend(this.pvWaterfallGroupPanel, "barWaterfallGroup_");
    },

    _buildRuleScene: function(){
        var rootScene  = new pvc.visual.Scene(null, {panel: this, group: this._getVisibleData()});
        
        /**
         * Create starting scene tree
         */
        if(this.chart._ruleInfos){
            this.chart._ruleInfos
                .forEach(createCategScene, this);
        }
        
        return rootScene;

        function createCategScene(ruleInfo){
            var categData1 = ruleInfo.group,
                categScene = new pvc.visual.Scene(rootScene, {group: categData1});

            categScene.acts.category = {
                value: categData1.value,
                label: categData1.label,
                group: categData1
            };

            var value = ruleInfo.offset;
            categScene.acts.value = {
                value: value,
                label: this.chart._valueDim.format(value)
            };
        }
    },

    _buildWaterGroupScene: function(){
        var chart = this.chart,
            ruleInfos = this.chart._ruleInfos,
            ruleInfoByCategKey = ruleInfos && def.query(ruleInfos)
                                  .object({
                                      name:  function(ruleInfo){ return ruleInfo.group.absKey; },
                                      value: function(ruleInfo){ return ruleInfo; }
                                  }),
            isFalling = chart._isFalling,
            rootCatData = chart._catRole.select(
                            chart._partData(this.dataPartValue),
                            {visible: true}),
            rootScene  = new pvc.visual.Scene(null, {panel: this, group: rootCatData});

        if(ruleInfoByCategKey){
            createCategSceneRecursive(rootCatData, 0);
        }
        
        return rootScene;

        function createCategSceneRecursive(catData, level){
            var children = catData.children()
                                  .where(function(child){ return child.key !== ""; })
                                  .array();
            if(children.length){
                // Group node
                if(level){
                    var categScene = new pvc.visual.Scene(rootScene, {group: catData});

                    var categAct = categScene.acts.category = {
                        value: catData.value,
                        label: catData.label,
                        group: catData,
                        level: level
                    };

                    var valueAct = categScene.acts.value = {};
                    var ruleInfo = ruleInfoByCategKey[catData.absKey];
                    var offset = ruleInfo.offset,
                        range = ruleInfo.range,
                        height = -range.min + range.max
                        ;

                    if(isFalling){
                        var lastChild = lastLeaf(catData);
                        var lastRuleInfo = ruleInfoByCategKey[lastChild.absKey];
                        categAct.leftValue  = ruleInfo.group.value;
                        categAct.rightValue = lastRuleInfo.group.value;
                        valueAct.bottomValue = offset - range.max;

                    } else {
                        var firstChild = firstLeaf(catData);
                        var firstRuleInfo = ruleInfoByCategKey[firstChild.absKey];
                        categAct.leftValue = firstRuleInfo.group.value;
                        categAct.rightValue = ruleInfo.group.value;
                        valueAct.bottomValue = offset - range.max;
                    }

                    valueAct.heightValue = height;
                }

                children.forEach(function(child){
                    createCategSceneRecursive(child, level + 1);
                });
            }
        }

        function firstLeaf(data){
            var firstChild = data._children && data._children[0];
            return firstChild ? firstLeaf(firstChild) : data;
        }

        function lastLeaf(data){
            var lastChild = data._children && data._children[data._children.length - 1];
            return lastChild ? lastLeaf(lastChild) : data;
        }
    }
});
/**
 * WaterfallChart is the class that generates waterfall charts.
 *
 * The waterfall chart is an alternative to the pie chart for
 * showing distributions. The advantage of the waterfall chart is that
 * it possibilities to visualize sub-totals and offers more convenient
 * possibilities to compare the size of categories (in a pie-chart you
 * have to compare wedges that are at a different angle, which
 * requires some additional processing/brainpower of the end-user).
 *
 * Waterfall charts are basically Bar-charts with some added
 * functionality. Given the complexity of the added features this
 * class has it's own code-base. However, it would be easy to
 * derive a BarChart class from this class by switching off a few
 * features.
 *
 * If you have an issue or suggestions regarding the Waterfall-charts
 * please contact CvK at cde@vinzi.nl
 */
pvc.WaterfallChart = pvc.BarAbstract.extend({

    _isFalling: true,
    _ruleInfos: null,
    _waterColor: pv.Color.names.darkblue,//darkblue,darkslateblue,royalblue,seagreen, //pv.color("#808285").darker(),

    constructor: function(options){

        this.base(options);
        
        // Apply options
        pvc.mergeDefaults(this.options, pvc.WaterfallChart.defaultOptions, options);

        var parent = this.parent;
        if(parent) {
            this._isFalling = parent._isFalling;
        }
    },

    /**
     * Processes options after user options and default options have been merged.
     * @override
     */
    _processOptionsCore: function(options){

        // Waterfall charts are always stacked
        options.stacked = true;
        if(options.showWaterValues === undefined){
            options.showWaterValues = options.showValues;
        }

        // Doesn't work (yet?)
        options.useCompositeAxis = false;

        this.base(options);
    },

    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();

        this._isFalling = (this.options.waterDirection === 'down');
        
        this._catRole.setFlatteningMode(this._isFalling ? 'tree-pre' : 'tree-post');
        this._catRole.setFlattenRootLabel(this.options.allCategoryLabel);
    },

    _initLegendGroups: function(){
        
        this.base();

        var strokeStyle = this._getExtension("barWaterfallLine", "strokeStyle");
        if(strokeStyle && !def.fun.is(strokeStyle)){
            this._waterColor = pv.color(strokeStyle);
        }

        this._addLegendGroup({
            id:        "waterfallTotalLine",
            type:      "discreteColorAndShape",
            items:     [{
                value: null,
                label: this.options.accumulatedLineLabel,
                color: this._waterColor,
                shape: 'bar',
                isOn:  def.retTrue,
                click: null
            }]
        });
    },
    
    /**
     * Reduce operation of category ranges, into a global range.
     *
     * Propagates the total value.
     *
     * Also creates the array of rule information {@link #_ruleInfos}
     * used by the waterfall panel to draw the rules.
     *
     * Supports {@link #_getVisibleValueExtent}.
     */
    _reduceStackedCategoryValueExtent: function(result, catRange, catGroup){
        /*
         * That min + max are the variation of this category
         * relies on the concrete base._getStackedCategoryValueExtent() implementation...
         * Max always contains the sum of positives, if any, or 0
         * Min always contains the sum of negatives, if any, or 0
         * max >= 0
         * min <= 0
         */
        /*
         * When falling, the first category is surely *the* global total.
         * When falling, the first category must set the initial offset
         * and, unlike every other category group such that _isFlattenGroup===true,
         * it does contribute to the offset, and positively.
         * The offset property accumulates the values.
         */
        var offset, negOffset;
        if(!result){
            if(catRange){
                offset    = catRange.max;
                negOffset = catRange.min;
                this._ruleInfos = [{
                    offset: offset,
                    negOffset: negOffset,
                    group:  catGroup,
                    range:  catRange
                }];

                // Copy the range object
                return {
                    min: catRange.min,
                    max: catRange.max,
                    offset: offset,
                    negOffset: negOffset
                };
            }

            return null;
        }

        offset = result.offset;
        negOffset = result.negOffset;
        if(this._isFalling){
            this._ruleInfos.push({
                offset: offset,
                negOffset: negOffset,
                group:  catGroup,
                range:  catRange
            });
        }

        if(!catGroup._isFlattenGroup){
            var dir = this._isFalling ? -1 : 1;

            offset    = result.offset    = offset    + dir * catRange.max;
            negOffset = result.negOffset = negOffset - dir * catRange.min;

            if(negOffset < result.min){
                result.min = negOffset;
            }

            if(offset > result.max){
                result.max = offset;
            }
        }

        if(!this._isFalling){
            this._ruleInfos.push({
                offset: offset,
                negOffset: negOffset,
                group:  catGroup,
                range:  catRange
            });
        }
        
        return result;
    },
    
    /* @override */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in WaterfallChart");
        }
        
        var options = this.options;
        
        return new pvc.WaterfallPanel(this, parentPanel, {
            waterfall:    options.waterfall,
            barSizeRatio: options.barSizeRatio,
            maxBarSize:   options.maxBarSize,
            showValues:   options.showValues,
            orientation:  options.orientation
        });
    }
}, {
    defaultOptions: {
        // down or up
        waterDirection: 'down',
        showWaterValues: undefined, // defaults to showValues
        showWaterGroupAreas: true,
        allCategoryLabel: "All",
        accumulatedLineLabel: "Accumulated"
    }
});
/*
 * LineDotArea panel.
 * Class that draws all line/dot/area combinations.
 * Specific options are:
 * <i>showDots</i> - Show or hide dots. Default: true
 * <i>showAreas</i> - Show or hide dots. Default: false
 * <i>showLines</i> - Show or hide dots. Default: true
 * <i>showValues</i> - Show or hide line value. Default: false
 *
 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 * <i>line_</i> - for the actual line
 * <i>linePanel_</i> - for the panel where the lines sit
 * <i>lineDot_</i> - the dots on the line
 * <i>lineLabel_</i> - for the main line label
 */
pvc.LineDotAreaPanel = pvc.CartesianAbstractPanel.extend({
    anchor: 'fill',
    stacked: false,
    pvLine: null,
    pvArea: null,
    pvDot: null,
    pvLabel: null,
    pvScatterPanel: null, // TODO: change this name!
    
    showLines: true,
    showDots: true,
    showValues: true,
    
    valuesAnchor: "right",
    valueRoleName: null,
    
    nullInterpolationMode: 'linear',
    
    /**
     * @override
     */
    _createCore: function(){
        this.base();
        
        this.valueRoleName = this.chart.axes.ortho.role.name;

        var myself = this,
            chart = this.chart,
            options = chart.options,
            isStacked = this.stacked,
            showDots  = this.showDots,
            showAreas = this.showAreas,
            showLines = this.showLines,
            anchor = this.isOrientationVertical() ? "bottom" : "left";

        // ------------------
        // DATA
        var isBaseDiscrete = chart._catRole.grouping.isDiscrete(),
            data = this._getVisibleData(), // shared "categ then series" grouped data
            isDense = !(this.width > 0) || (data._children.length / this.width > 0.5), //  > 100 categs / 200 pxs
            rootScene = this._buildScene(data, isBaseDiscrete);

        // Disable selection?
        if(isDense && (options.selectable || options.hoverable)) {
            options.selectable = false;
            options.hoverable  = false;
            if(pvc.debug >= 3) {
                pvc.log("Warning: Disabling selection and hovering because the chart is to \"dense\".");
            }
        }
       
        // ---------------
        // BUILD
        this.pvPanel.zOrder(-7);

        this.pvScatterPanel = this.pvPanel.add(pv.Panel)
            .lock('data', rootScene.childNodes)
            ;
        
        // -- AREA --
        var areaFillColorAlpha = showAreas && showLines && !isStacked ? 0.5 : null;
        
        this.pvArea = new pvc.visual.Area(this, this.pvScatterPanel, {
                extensionId: 'area',
                antialias:   showAreas && !showLines,
                segmented:   !isDense,
                noTooltips:  false,
                noHoverable: false // While the area itself does not change appearance, the pvLine does due to activeSeries... 
            })
            
            .lock('visible', def.retTrue)
            
            /* Data */
            .lock('data',   function(seriesScene){ return seriesScene.childNodes; }) // TODO
            
            /* Position & size */
            .override('x',  function(){ return this.scene.basePosition;  })
            .override('y',  function(){ return this.scene.orthoPosition; })
            .override('dy', function(){ return chart.animate(0, this.scene.orthoLength); })
            
            /* Color & Line */
            .override('color', function(type){
                return showAreas ? this.base(type) : null;
            })
            .override('baseColor', function(type){
                var color = this.base(type);
                if(color && !this.hasDelegate() && areaFillColorAlpha != null){
                    color = color.alpha(areaFillColorAlpha);
                }
                
                return color;
            })
            .override('fixAntialiasStrokeWidth', function(){
                // Hide a vertical line from 0 to the alone dot
                // Hide horizontal lines of nulls near zero
                if(this.scene.isNull || this.scene.isAlone) {
                     return 0;
                }

                return this.base();
            })
            .pvMark
            ;
        
        // -- LINE --
        var showDotsOnly = showDots && !showLines && !showAreas,
            
            /* When not showing lines, but showing areas,
             * we copy the area fillStyle so that
             * the line can cover the area and not be noticed.
             * We need this to hide the ladder 
             * on the border of the area, 
             * due to not using antialias.
             * 
             * When the scene has the active series,
             * the line is shown "highlighted" anyway.
             */
            lineCopiesAreaColor = !showLines && showAreas,
            
            /* When areas are shown with no alpha (stacked), 
             * make dots darker so they get 
             * distinguished from areas. 
             */
            darkerLineAndDotColor = isStacked && showAreas;
        
        function lineAndDotNormalColor(type){
            var color = this.base(type);
            if(color && darkerLineAndDotColor && !this.hasDelegate()){
                color = color.darker(0.6);
            }
            
            return color;
        }
        
        this.pvLine = new pvc.visual.Line(
            this, 
            this.pvArea.anchor(this.anchorOpposite(anchor)), 
            {
                extensionId: 'line',
                freePosition: true
            })
            /* 
             * Line.visible =
             *  a) showLines
             *     or
             *  b) (!showLines and) showAreas
             *      and
             *  b.1) discrete base and stacked
             *       and
             *       b.1.1) not null or is an intermediate null
             *  b.2) not null
             */
            .lock('visible',
                    showDotsOnly ? 
                    def.retFalse : 
                    (isBaseDiscrete && isStacked ? 
                    function(){ return !this.scene.isNull || this.scene.isIntermediate; } :
                    function(){ return !this.scene.isNull; })
            )
            
            /* Color & Line */
            .override('color', function(type){
                if(lineCopiesAreaColor && !this.scene.isActiveSeries()) {
                    // This obtains the color of the same index area
                    return myself.pvArea.fillStyle();
                }
                
                return this.base(type);
            })
            .override('baseColor', lineAndDotNormalColor)
            .override('baseStrokeWidth', function(){
                var strokeWidth;
                if(showLines){
                    strokeWidth = this.base();
                }
                
                return strokeWidth == null ? 1.5 : strokeWidth; 
            })
            .pvMark
            ;
        
           
        // -- DOT --
        var showAloneDots = !(showAreas && isBaseDiscrete && isStacked);
        
        this.pvDot = new pvc.visual.Dot(this, this.pvLine, {
                extensionId: 'dot',
                freePosition: true
            })
            .intercept('visible', function(){
                var scene = this.scene;
                return (!scene.isNull && !scene.isIntermediate && !scene.isInterpolated) && 
                       this.delegate(true);
            })
            .override('color', function(type){
                /* 
                 * Handle showDots
                 * -----------------
                 * Despite !showDots,
                 * show a dot anyway when:
                 * 1) it is active, or
                 * 2) it is single  (the only dot in its series and there's only one category) (and in areas+discreteCateg+stacked case)
                 * 3) it is alone   (surrounded by null dots) (and not in areas+discreteCateg+stacked case)
                 */
                if(!showDots){
                    var visible = this.scene.isActive ||
                                  (!showAloneDots && this.scene.isSingle) ||
                                  (showAloneDots && this.scene.isAlone);
                    if(!visible) {
                        return pvc.invisibleFill;
                    }
                }
                
                // Follow normal logic
                return this.base(type);
            })
            .override('baseColor', lineAndDotNormalColor)
            .override('baseSize', function(){
                /* When not showing dots, 
                 * but a datum is alone and 
                 * wouldn't be visible using lines or areas,  
                 * show the dot anyway, 
                 * with a size = to the line's width^2
                 * (ideally, a line would show as a dot when only one point?)
                 */
                if(!showDots) {
                    var visible = this.scene.isActive ||
                                  (!showAloneDots && this.scene.isSingle) ||
                                  (showAloneDots && this.scene.isAlone);
                    
                    if(visible && !this.scene.isActive) {
                        // Obtain the line Width of the "sibling" line
                        var lineWidth = Math.max(myself.pvLine.lineWidth(), 0.2) / 2;
                        return lineWidth * lineWidth;
                    }
                }
                
                return this.base();
            })
            .pvMark
            ;
        
        // -- LABEL --
        if(this.showValues){
            this.pvLabel = this.pvDot
                .anchor(this.valuesAnchor)
                .add(pv.Label)
                // ------
                .bottom(0)
                .text(function(scene){ return scene.acts[myself.valueRoleName].label; })
                ;
        }
    },

    /**
     * @override
     */
    applyExtensions: function(){

        this.base();

        this.extend(this.pvScatterPanel, "scatterPanel_");
        this.extend(this.pvArea,  "area_");
        this.extend(this.pvLine,  "line_");
        this.extend(this.pvDot,   "dot_");
        this.extend(this.pvLabel, "label_");
        this.extend(this.pvLabel, "lineLabel_");
    },

    /**
     * Renders this.pvScatterPanel - the parent of the marks that are affected by interaction changes.
     * @override
     */
    _renderInteractive: function(){
        this.pvScatterPanel.render();
    },

    /**
     * Returns an array of marks whose instances are associated to a datum or group, or null.
     * @override
     */
    _getSignums: function(){
        var marks = [];
        
        marks.push(this.pvDot);
        
        if(this.showLines || this.showAreas){
            marks.push(this.pvLine);
        }
        
        return marks;
    },
  
    _buildScene: function(data, isBaseDiscrete){
        var rootScene  = new pvc.visual.Scene(null, {panel: this, group: data}),
            categDatas = data._children,
            interpolate = this.nullInterpolationMode === 'linear';
        
        var chart = this.chart,
            valueDim = data.owner.dimensions(chart.axes.ortho.role.firstDimensionName()),
            firstCategDim = !isBaseDiscrete ? data.owner.dimensions(chart.axes.base.role.firstDimensionName()) : null,
            isStacked = this.stacked,
            visibleKeyArgs = {visible: true, zeroIfNone: false},
            /* TODO: BIG HACK */
            orthoScale = this.dataPartValue !== '1' ?
                            chart.axes.ortho.scale :
                            chart.axes.ortho2.scale,
                        
            orthoNullValue = def.scope(function(){
                var domain = orthoScale.domain(),
                    dmin = domain[0],
                    dmax = domain[1];
                if(dmin * dmax >= 0) {
                    // Both positive or negative or either is zero
                    return dmin >= 0 ? dmin : dmax;
                }
                
                return 0;
            }),
            orthoZero = orthoScale(0),
            sceneBaseScale = chart.axes.base.sceneScale();
        
        /* On each series, scenes for existing categories are interleaved with intermediate scenes.
         * 
         * Protovis Dots are only shown for main (non-intermediate) scenes.
         * 
         * The desired effect is that selecting a dot selects half of the
         * line on the left and half of the line on the right.
         *  
         *  * main scene
         *  + intermediate scene
         *  - line that starts from the previous scene
         *  
         *  
         *        * - + - * - + - *
         *            [-------[
         *                ^ line extent of a dot
         *             
         * Each segment of a Protovis segmented line starts from the initial point 
         * till just before the next point.
         * 
         * So, selecting a dot must select the the line that starts on the 
         * main dot, but also the line that starts on the previous intermediate dot.
         * 
         * If a main dot shares its datums (or group) with its preceding
         * intermediate dot, the selection will work like so.
         * 
         * -------
         * 
         * Another influencing concern is interpolation.
         * 
         * The desired effect is that any two dots separated by a number of missing/null
         * categories get connected by linearly interpolating the missing values.
         * Moreover, the left half of the new line should be selected
         * when the left dot is selected and the right half of the new line
         * should be selected when the right dot is selected .
         * 
         * In the discrete-base case, the "half of the line" point always coincides
         *  a) with the point of an existing category (when count of null categs is odd)
         *  or 
         *  b) with an intermediate point added afterwards (when count of null categs is even).
         * 
         *  a) Interpolate missing/null category in S1 (odd case)
         *  mid point ----v
         *  S1    * - + - 0 - + - * - + - * 
         *  S2    * - + - * - + - * - + - *
         *  Data  A   A   B   B   B   B   C
         *  
         *  a) Interpolate missing/null category in S1 (even case)
         *    mid point ------v
         *  S1    * - + - 0 - + - 0 - + - * - + - * 
         *  S2    * - + - * - + - * - + - * - + - *
         *  Data  A   A   A   B   B   B   B
         *  
         * In the continuous-base case, 
         * the middle point between two non-null categories 
         * separated by missing/null categories in between,
         * does not, in general, coincide with the position of an existing category...
         * 
         * As such, interpolation may add new "main" points (to all the series),
         * and interpolation of one series leads to the interpolation
         * on a series that did not initially need interpolation... 
         * 
         * Interpolated dots to the left of the mid point are bound to 
         * the left data and interpolated dots to the right and 
         * including the mid point are bound to the right data. 
         */
        
        var reversedSeriesScenes = createSeriesScenes.call(this),
            seriesCount = reversedSeriesScenes.length;
        
        // 1st pass
        // Create category infos array.
        var categInfos = categDatas.map(createCategInfo, this);
        
        function createCategInfo(categData1, categIndex){
            
            var categKey = categData1.key;
            var seriesInfos = []; // of this category
            var categInfo = {
                data: categData1,
                value: categData1.value,
                label: categData1.label,
                isInterpolated: false,
                seriesInfos: seriesInfos,
                index: categIndex
            };
            
            reversedSeriesScenes.forEach(function(seriesScene){
                var group = data._childrenByKey[categKey];
                var seriesData1 = seriesScene.acts.series.value == null ? null : seriesScene.group;
                if(seriesData1){
                    group = group._childrenByKey[seriesData1.key];
                }
                
                var value = group ? group.dimensions(valueDim.name).sum(visibleKeyArgs) : null;
                var seriesInfo = {
                    data:   seriesData1,
                    group:  group,
                    value:  value,
                    isNull: value == null,
                    categ:  categInfo
                };
                
                seriesInfos.push(seriesInfo);
            }, this);
            
            return categInfo;
        }
        
        // --------------
        // 2nd pass
        // --------------
        
        // ~ isBaseDiscrete, firstCategDim
        var Interpolation = def
        .type()
        .init(function(categInfos){
            this._categInfos = categInfos;
            this._outCategInfos = [];
            
            this._seriesCount = categInfos.length > 0 ? categInfos[0].seriesInfos.length : 0;
            
            this._seriesStates = def
                .range(0, this._seriesCount)
                .select(function(seriesIndex){ 
                    return new InterpolationSeriesState(this, seriesIndex); 
                }, this)
                .array();
            
            // Determine the sort order of the continuous base categories
            // Categories assumed sorted.
            if(!isBaseDiscrete && categInfos.length >= 2){
                if((+categInfos[1].value) >= (+categInfos[0].value)){
                    this._comparer = def.compare;
                } else {
                    this._comparer = function(b, a){ return def.compare(a, b); };
                }
            }
        })
        .add({
            interpolate: function(){
                var categInfo;
                while((categInfo = this._categInfos.shift())){
                    categInfo.seriesInfos.forEach(this._visitSeries, this);
                    
                    this._outCategInfos.push(categInfo);
                }
                
                return this._outCategInfos;
            },
            
            _visitSeries: function(seriesInfo, seriesIndex){
                this._seriesStates[seriesIndex].visit(seriesInfo);                
            },
            
            firstNonNullOfSeries: function(seriesIndex){
                var categIndex = 0,
                    categCount = this._categInfos.length;
                
                while(categIndex < categCount){
                    var categInfo = this._categInfos[categIndex++];
                    if(!categInfo.isInterpolated){
                        var seriesInfo = categInfo.seriesInfos[seriesIndex];
                        if(!seriesInfo.isNull){
                            return seriesInfo;
                        }
                    }
                }
            },
            
            _setCategory: function(categValue){
                /*jshint expr:true  */
                !isBaseDiscrete || def.assert("Only for continuous base.");
                
                // Insert sort into this._categInfos
                
                function getCategValue(categInfo){ 
                    return +categInfo.value; 
                }
                
                // Check if and where to insert
                var index = def.array.binarySearch(
                                this._categInfos, 
                                +categValue, 
                                this._comparer, 
                                getCategValue);
                if(index < 0){
                    // New category
                    // Insert at the two's complement of index
                    var categInfo = {
                        value: firstCategDim.type.cast(categValue), // possibly creates a Date object
                        isInterpolated: true
                    };
                    
                    categInfo.label = firstCategDim.format(categInfo.value);
                        
                    categInfo.seriesInfos = def
                        .range(0, this._seriesCount)
                        .select(function(seriesScene, seriesIndex){
                            return {
                                value:  null,
                                isNull: true,
                                categ:  categInfo
                            };
                        })
                        .array();
                    
                    this._categInfos.splice(~index, 0, categInfo);
                }
                
                return index;
            }
        });
        
        // ~ isBaseDiscrete, isStacked
        var InterpolationSeriesState = def
        .type()
        .init(function(interpolation, seriesIndex){
            this.interpolation = interpolation;
            this.index = seriesIndex;
            
            this._lastNonNull(null);
        })
        .add({
            visit: function(seriesInfo){
                if(seriesInfo.isNull){
                    this._interpolate(seriesInfo);
                } else {
                    this._lastNonNull(seriesInfo);
                }
            },
            
            _lastNonNull: function(seriesInfo){
                if(arguments.length){
                    this.__lastNonNull = seriesInfo; // Last non-null
                    this.__nextNonNull = undefined;
                }
                
                return this.__lastNonNull;
            },
            
            _nextNonNull: function(){
                return this.__nextNonNull;
            },
            
            _initInterpData: function(){
                if(this.__nextNonNull !== undefined){
                    return;
                }
                
                var next = this.__nextNonNull = this.interpolation.firstNonNullOfSeries(this.index) || null;
                var last = this.__lastNonNull;
                if(next && last){
                    var fromValue  = last.value;
                    var toValue    = next.value;
                    var deltaValue = toValue - fromValue;
                    
                    if(isBaseDiscrete){
                        var stepCount = next.categ.index - last.categ.index;
                        /*jshint expr:true */
                        (stepCount >= 2) || def.assert("Must have at least one interpolation point.");
                        
                        this._stepValue   = deltaValue / stepCount;
                        this._middleIndex = ~~(stepCount / 2); // Math.floor <=> ~~
                        
                        var dotCount = (stepCount - 1);
                        this._isOdd  = (dotCount % 2) > 0;
                    } else {
                        var fromCateg  = +last.categ.data.value;
                        var toCateg    = +next.categ.data.value;
                        var deltaCateg = toCateg - fromCateg;
                        
                        this._steep = deltaValue / deltaCateg; // should not be infinite, cause categories are different
                        
                        this._middleCateg = (toCateg + fromCateg) / 2;
                        
                        // (Maybe) add a category
                        this.interpolation._setCategory(this._middleCateg);
                    }
                }
            },
            
            _interpolate: function(seriesInfo){
                this._initInterpData();
                
                var next = this.__nextNonNull;
                var last = this.__lastNonNull;
                if(!next && !last){
                    return;
                }
                
                var value;
                var group;
                var isInterpolatedMiddle;
                if(next && last){
                    if(isBaseDiscrete){
                        var groupIndex = (seriesInfo.categ.index - last.categ.index);
                        value = last.value + groupIndex * this._stepValue;
                        
                        if(this._isOdd){
                            group = groupIndex < this._middleIndex ? last.group : next.group;
                            isInterpolatedMiddle = groupIndex === this._middleIndex;
                        } else {
                            group = groupIndex <= this._middleIndex ? last.group : next.group;
                            isInterpolatedMiddle = false;
                        }
                        
                    } else {
                        var categ = +seriesInfo.categ.value;
                        var lastCateg = +last.categ.data.value;
                        
                        value = last.value + this._steep * (categ - lastCateg);
                        group = categ < this._middleCateg ? last.group : next.group;
                        isInterpolatedMiddle = categ === this._middleCateg;
                    }
                } else {
                    // Only "stretch" ends on stacked visualization
                    if(!isStacked) {
                        return;
                    }
                    
                    var the = next || last;
                    value = the.value;
                    group = the.group;
                    isInterpolatedMiddle = false;
                }
                
                seriesInfo.group  = group;
                seriesInfo.value  = value;
                seriesInfo.isNull = false;
                seriesInfo.isInterpolated = true;
                seriesInfo.isInterpolatedMiddle = isInterpolatedMiddle;
            }
        });
        
        if(interpolate){
            categInfos = new Interpolation(categInfos).interpolate();
        }
        
        /**
         * Create child category scenes of each series scene.
         */
        reversedSeriesScenes.forEach(createSeriesSceneCategories, this);
        
        /** 
         * Update the scene tree to include intermediate leaf-scenes,
         * to help in the creation of lines and areas. 
         */
        var belowSeriesScenes2; // used below, by completeSeriesScenes
        reversedSeriesScenes.forEach(completeSeriesScenes, this);
        
        /** 
         * Trim leading and trailing null scenes.
         */
        reversedSeriesScenes.forEach(trimNullSeriesScenes, this);
        
        return rootScene;
        
        function createSeriesScenes(){
            if(chart._serRole && chart._serRole.grouping){
                chart._serRole
                    .flatten(data)
                    .children()
                    .each(createSeriesScene, this);
            } else {
                createSeriesScene.call(this, null);
            }
            
            // reversed so that "below == before" w.r.t. stacked offset calculation
            return rootScene.children().reverse().array();
        }
        
        function createSeriesScene(seriesData1){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesData1 || data});

            seriesScene.acts.series = {
                value: seriesData1 ? seriesData1.value : null,
                label: seriesData1 ? seriesData1.label : ""
            };
        }

        function createSeriesSceneCategories(seriesScene, seriesIndex){
            
            categInfos.forEach(createCategScene, this);
            
            function createCategScene(categInfo){
                var seriesInfo = categInfo.seriesInfos[seriesIndex];
                var group = seriesInfo.group;
                var value = seriesInfo.value;
                
                /* If there's no group, provide, at least, a null datum */
                var datum = group ? 
                            null : 
                            createNullDatum(
                                    seriesInfo.data || seriesScene.group, 
                                    categInfo.data  );
                
                // ------------
                
                var scene = new pvc.visual.Scene(seriesScene, {group: group, datum: datum});
                scene.acts.category = {
                    value: categInfo.value,
                    label: categInfo.label
                };
                scene.acts[this.valueRoleName] = {
                    /* accumulated value, for stacked */
                    accValue: value != null ? value : orthoNullValue,
                    value:    value,
                    label:    valueDim.format(value)
                };
                
                scene.isInterpolatedMiddle = seriesInfo.isInterpolatedMiddle;
                scene.isInterpolated = seriesInfo.isInterpolated;
                scene.isNull = seriesInfo.isNull;
                scene.isIntermediate = false;
            }
        }

        function completeSeriesScenes(seriesScene) {
            var seriesScenes2 = [],
                seriesScenes = seriesScene.childNodes, 
                fromScene,
                notNullCount = 0,
                firstAloneScene = null;
            
            /* As intermediate nodes are added, 
             * seriesScene.childNodes array is changed.
             * 
             * The var 'toChildIndex' takes inserts into account;
             * its value is always the index of 'toScene' in 
             * seriesScene.childNodes.
             */
            for(var c = 0, /* category index */
                    toChildIndex = 0, 
                    categCount = seriesScenes.length ; 
                c < categCount ;
                c++, 
                toChildIndex++) {
                
                var toScene = seriesScenes[toChildIndex],
                    c2 = c * 2; /* doubled category index, for seriesScenes2  */
                
                seriesScenes2[c2] = toScene;
                
                /* Complete toScene */
                completeMainScene.call(this,
                        fromScene, 
                        toScene,
                        /* belowScene */
                        belowSeriesScenes2 && belowSeriesScenes2[c2]);
                
                if(toScene.isAlone && !firstAloneScene){
                    firstAloneScene = toScene;
                }
                
                if(!toScene.isNull){
                    notNullCount++;
                }
                
                /* Possibly create intermediate scene 
                 * (between fromScene and toScene) 
                 */
                if(fromScene) {
                    var interScene = createIntermediateScene.call(this,
                            seriesScene,
                            fromScene, 
                            toScene,
                            toChildIndex,
                            /* belowScene */
                            belowSeriesScenes2 && belowSeriesScenes2[c2 - 1]);
                    
                    if(interScene){
                        seriesScenes2[c2 - 1] = interScene;
                        toChildIndex++;
                    }
                }
                
                // --------
                
                fromScene = toScene;
            }
            
            if(notNullCount === 1 && firstAloneScene && categCount === 1){
                firstAloneScene.isSingle = true;
            }
            
            if(isStacked){
                belowSeriesScenes2 = seriesScenes2;
            } 
        }
        
        function completeMainScene( 
                      fromScene, 
                      toScene, 
                      belowScene){
            
            var toAccValue = toScene.acts[this.valueRoleName].accValue;
            
            if(belowScene) {
                if(toScene.isNull && !isBaseDiscrete) {
                    toAccValue = orthoNullValue;
                } else {
                    toAccValue += belowScene.acts[this.valueRoleName].accValue;
                }
                
                toScene.acts[this.valueRoleName].accValue = toAccValue;
            }
            
            toScene.basePosition  = sceneBaseScale(toScene);
            toScene.orthoPosition = orthoZero;
            toScene.orthoLength   = orthoScale(toAccValue) - orthoZero;
            
            var isNullFrom = (!fromScene || fromScene.isNull),
                isAlone    = isNullFrom && !toScene.isNull;
            if(isAlone) {
                // Confirm, looking ahead
                var nextScene = toScene.nextSibling;
                isAlone  = !nextScene || nextScene.isNull;
            }
            
            toScene.isAlone  = isAlone;
            toScene.isSingle = false;
        }
        
        function createIntermediateScene(
                     seriesScene, 
                     fromScene, 
                     toScene, 
                     toChildIndex,
                     belowScene){
            
            var interIsNull = fromScene.isNull || toScene.isNull;
            if(interIsNull && !this.showAreas) {
                return null;
            }
            
            var interValue, interAccValue, interBasePosition;
                
            if(interIsNull) {
                /* Value is 0 or the below value */
                if(belowScene && isBaseDiscrete) {
                    var belowValueAct = belowScene.acts[this.valueRoleName];
                    interAccValue = belowValueAct.accValue;
                    interValue = belowValueAct[this.valueRoleName];
                } else {
                    interValue = interAccValue = orthoNullValue;
                }
                
                if(isStacked && isBaseDiscrete) {
                    // The intermediate point is at the start of the "to" band
                    interBasePosition = toScene.basePosition - (sceneBaseScale.range().band / 2);
                } else if(fromScene.isNull) { // Come from NULL
                    // Align directly below the (possibly) non-null dot
                    interBasePosition = toScene.basePosition;
                } else /*if(toScene.isNull) */{ // Go to NULL
                    // Align directly below the non-null from dot
                    interBasePosition = fromScene.basePosition;
                } 
//                    else {
//                        interBasePosition = (toScene.basePosition + fromScene.basePosition) / 2;
//                    }
            } else {
                var fromValueAct = fromScene.acts[this.valueRoleName],
                    toValueAct   = toScene.acts[this.valueRoleName];
                
                interValue = (toValueAct.value + fromValueAct.value) / 2;
                
                // Average of the already offset values
                interAccValue     = (toValueAct.accValue  + fromValueAct.accValue ) / 2;
                interBasePosition = (toScene.basePosition + fromScene.basePosition) / 2;
            }
            
            //----------------
            
            var interScene = new pvc.visual.Scene(seriesScene, {
                    /* insert immediately before toScene */
                    index: toChildIndex,
                    group: toScene.isInterpolatedMiddle ? fromScene.group: toScene.group, 
                    datum: toScene.group ? null : toScene.datum
                });
            
            interScene.acts.category = toScene.acts.category;
            interScene.acts[this.valueRoleName] = {
                accValue: interAccValue,
                value:    interValue,
                label:    valueDim.format(interValue)
            };
            
            interScene.isIntermediate = true;
            interScene.isSingle       = false;
            interScene.isNull         = interIsNull;
            interScene.isAlone        = interIsNull && toScene.isNull && fromScene.isNull;
            interScene.basePosition   = interBasePosition;
            interScene.orthoPosition  = orthoZero;
            interScene.orthoLength    = orthoScale(interAccValue) - orthoZero;
            
            return interScene;
        }
        
        function trimNullSeriesScenes(seriesScene) {
            
            var seriesScenes = seriesScene.childNodes,
                L = seriesScenes.length;
            
            // from beginning
            var scene, siblingScene;
            while(L && (scene = seriesScenes[0]).isNull) {
                
                // Don't remove the intermediate dot before the 1st non-null dot
                siblingScene = scene.nextSibling;
                if(siblingScene && !siblingScene.isNull){
                    break;
                }
                
                seriesScene.removeAt(0);
                L--;
            }
            
            // from end
            while(L && (scene = seriesScenes[L - 1]).isNull) {
                
                // Don't remove the intermediate dot after the last non-null dot
                siblingScene = scene.previousSibling;
                if(siblingScene && !siblingScene.isNull){
                    break;
                }
                
                seriesScene.removeAt(L - 1);
                L--;
            }
        } 
        
        function createNullDatum(serData1, catData1) {
            // Create a null datum with col and row coordinate atoms
            var atoms = serData1 && catData1 ?
                            def.array.append(
                                def.own(serData1.atoms),
                                def.own(catData1.atoms)) :
                            (serData1 ? def.own(serData1.atoms) :  def.own(catData1.atoms))
                            ;
            
            return new pvc.data.Datum(data, atoms, true);
        }
    }
});

/**
 * LineDotAreaAbstract is the class that will be extended by
 * dot, line, stackedline and area charts.
 */
pvc.LineDotAreaAbstract = pvc.CategoricalAbstract.extend({

    constructor: function(options){

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.LineDotAreaAbstract.defaultOptions, options);
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();
        
        this._addVisualRoles({
            /* value: required, continuous, numeric */
            value: { 
                isMeasure: true, 
                isRequired: true, 
                isPercent: this.options.stacked,  
                requireSingleDimension: true, 
                requireIsDiscrete: false, 
                valueType: Number, 
                defaultDimensionName: 'value' 
            }
        });
    },

    /* @override */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in LineDotAreaAbstract");
        }
        
        var options = this.options;
        return new pvc.LineDotAreaPanel(this, parentPanel, {
            stacked:        options.stacked,
            showValues:     options.showValues,
            valuesAnchor:   options.valuesAnchor,
            showLines:      options.showLines,
            showDots:       options.showDots,
            showAreas:      options.showAreas,
            orientation:    options.orientation,
            nullInterpolationMode: options.nullInterpolationMode
        });
    }
}, {
    defaultOptions: {
        showDots: false,
        showLines: false,
        showAreas: false,
        showValues: false,
        // TODO: Set this way, setting, "axisOffset: 0" has no effect...
        orthoAxisOffset: 0.04,
        baseAxisOffset:  0.01, // TODO: should depend on being discrete or continuous base
        valuesAnchor: "right",
        panelSizeRatio: 1,
        nullInterpolationMode: 'none', // 'none', 'linear' 
        tipsySettings: def.create(pvc.BaseChart.defaultOptions.tipsySettings, { offset: 15 })
    }
});

/**
 * Dot Chart
 */
pvc.DotChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showDots = true;
    }
});

/**
 * Line Chart
 */
pvc.LineChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showLines = true;
    }
});

/**
 * Stacked Line Chart
 */
pvc.StackedLineChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showLines = true;
        this.options.stacked = true;
    }
});

/**
 * Stacked Area Chart
 */
pvc.StackedAreaChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showAreas = true;
        this.options.stacked = true;
    }
});

/**
 * HeatGridChart is the main class for generating... heatGrid charts.
 *  A heatGrid visualizes a matrix of values by a grid (matrix) of *
 *  bars, where the color of the bar represents the actual value.
 *  By default the colors are a range of green values, where
 *  light green represents low values and dark green high values.
 *  A heatGrid contains:
 *     - two categorical axis (both on x and y-axis)
 *     - no legend as series become rows on the perpendicular axis 
 *  Please contact CvK if there are issues with HeatGrid at cde@vinzi.nl.
 */
pvc.HeatGridChart = pvc.CategoricalAbstract.extend({

    constructor: function(options){

        options = def.set(options, 
                'orthoAxisOrdinal', true,
                'legend', false);
  
        if(options.scalingType && !options.colorScaleType){
            options.colorScaleType = options.scalingType;
        }
        
        this.base(options);

        var defaultOptions = {
            colorValIdx: 0,
            sizeValIdx:  1,
            measuresIndexes: [2],

            //multi-dimensional clickable label
            showValues: true,
            axisOffset: 0,
            
            orientation: "vertical",
            
            colorScaleType: "linear",  // "discrete", "normal" (distribution) or "linear"
            
            normPerBaseCategory: true,
            numSD: 2,                 // width (only for normal distribution)
            nullShape: undefined,
            shape: undefined,
            useShapes: false,
            colorRange: ['red', 'yellow','green'],
            colorRangeInterval:  undefined,
            minColor: undefined, //"white",
            maxColor: undefined, //"darkgreen",
            nullColor:  "#efc5ad"  // white with a shade of orange
        };
        
        // Apply options
        pvc.mergeDefaults(this.options, defaultOptions, options);

        var parent = this.parent;
        if(parent) {
            this._colorRole   = parent._colorRole;
            this._dotSizeRole = parent._dotSizeRole;
        }
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();

        var colorDimName = 'value',
            sizeDimName  = 'value2';

        if(this.options.compatVersion <= 1){
            switch(this.options.colorValIdx){
                case 0:  colorDimName = 'value';  break;
                case 1:  colorDimName = 'value2'; break;
                default: colorDimName = undefined;
            }

            switch(this.options.sizeValIdx){
                case 0:  sizeDimName = 'value';  break;
                case 1:  sizeDimName = 'value2'; break;
                default: sizeDimName = undefined;
            }
        }

        this._addVisualRoles({
            color:  {
                isMeasure: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: colorDimName
            },
            
            dotSize: {
                isMeasure: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: sizeDimName
            }
        });

        this._colorRole   = this.visualRoles('color');
        this._dotSizeRole = this.visualRoles('dotSize');
    },

    _initData: function(keyArgs){
        
        this.base(keyArgs);

        // Cached
        var dotSizeGrouping = this._dotSizeRole.grouping;
        if(dotSizeGrouping){
            this._dotSizeDim = this.data.dimensions(dotSizeGrouping.firstDimension.name);
        }

        var colorGrouping = this._colorRole.grouping;
        if(colorGrouping) {
            this._colorDim = this.data.dimensions(colorGrouping.firstDimension.name);
        }
    },
    
    /* @override */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in heatGridChart");
        }
        
        var options = this.options;
        return new pvc.HeatGridChartPanel(this, parentPanel, {
            showValues:  options.showValues,
            orientation: options.orientation
        });
    }
});

/*
 * HeatGrid chart panel. Generates a heatGrid chart. Specific options are:
 * <i>orientation</i> - horizontal or vertical. Default: vertical
 * <i>showValues</i> - Show or hide heatGrid value. Default: false
 * <i>maxHeatGridSize</i> - Maximum size of a heatGrid in pixels. Default: 2000
 *
 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 * <i>heatGrid_</i> - for the actual heatGrid
 * <i>heatGridPanel_</i> - for the panel where the heatGrids sit
 * <i>heatGridLabel_</i> - for the main heatGrid label
 */
pvc.HeatGridChartPanel = pvc.CartesianAbstractPanel.extend({
    anchor: 'fill',
    pvHeatGrid: null,
    pvHeatGridLabel: null,
    data: null,

    showValues: true,
    orientation: "vertical",
    shape: "square",
    nullShape: "cross",

    defaultBorder: 1,
    nullBorder: 2,
    selectedBorder: 2,

    /**
     * @override
     */
    _createCore: function(){
        
        this.base();
        
        // TODO: this options treatment is highly "non-standard". Refactor to chart + panel-constructor
        
        var chart = this.chart,
            options = chart.options;

        var colorDimName = this.colorDimName = chart._colorDim   && chart._colorDim.name,
            sizeDimName  = this.sizeDimName  = chart._dotSizeDim && chart._dotSizeDim.name;
        
        // colors
        options.nullColor = pv.color(options.nullColor);
        
        if(options.minColor != null) { options.minColor = pv.color(options.minColor); }
        if(options.maxColor != null) { options.maxColor = pv.color(options.maxColor); }
        
        if(options.shape != null) {
            this.shape = options.shape;
        }
        
        if(options.nullShape !== undefined) { // can clear the null shape!
            this.nullShape = options.nullShape;
        }
        
        var anchor = this.isOrientationVertical() ? "bottom" : "left";

        /* Use existing scales */
        var xScale = chart.axes.x.scale,
            yScale = chart.axes.y.scale;

        /* Determine cell dimensions. */
        var w = (xScale.max - xScale.min) / xScale.domain().length;
        var h = (yScale.max - yScale.min) / yScale.domain().length;

        if (anchor !== "bottom") {
            var tmp = w;
            w = h;
            h = tmp;
        }
        
        this._cellWidth  = w;
        this._cellHeight = h;
        
        /* Column and Row datas  */
        var keyArgs = {visible: true},
            // Two multi-dimension single-level data groupings
            colRootData = chart._catRole.flatten(chart.data, keyArgs),
            rowRootData = chart._serRole.flatten(chart.data, keyArgs),

            // <=> One multi-dimensional, two-levels data grouping
            data = this._getVisibleData();
        
        /* Color scale */
        var fillColorScaleByColKey;
        
        if(colorDimName){
            fillColorScaleByColKey =  pvc.color.scales(def.create(false, this.chart.options, {
                /* Override/create these options, inherit the rest */
                type: options.colorScaleType, 
                data: colRootData,
                colorDimension: colorDimName
            }));
        }
        
        function getFillColor(detectSelection){
            var color;
            
            var colorValue = this.colorValue();
            if(colorValue != null) {
                color = fillColorScaleByColKey[this.group().parent.absKey](colorValue);
            } else {
                color = options.nullColor;
            }
            
            if(detectSelection && 
               data.owner.selectedCount() > 0 && 
               !this.datum().isSelected){
                 color = pvc.toGrayScale(color, 0.6);
            }
            
            return color;
        }
        
        /* DATUM */
        function getDatum(rowData1, colData1){
            var colData = this.parent.group();
            if(colData) {
                var rowData = colData._childrenByKey[rowData1.absKey];
                if(rowData) {
                    var datum = rowData._datums[0];
                    if(datum) {
                        return datum;
                    }
                }
            }
            
            // Create a null datum with col and row coordinate atoms
            var atoms = def.array.append(
                            def.own(rowData1.atoms),
                            def.own(colData1.atoms));
            
            return new pvc.data.Datum(data, atoms, true);
        }
        
        /* PV Panels */
        var pvColPanel = this.pvPanel.add(pv.Panel)
            .data(colRootData._children)
            .localProperty('group', Object)
            .group(function(colData1){
                return data._childrenByKey[colData1.absKey]; // must exist
            })
            [pvc.BasePanel.relativeAnchor[anchor]](function(){ //ex: datum.left(i=1 * w=15)
                return this.index * w;
             })
            [pvc.BasePanel.parallelLength[anchor]](w)
            ;
        
        var pvHeatGrid = this.pvHeatGrid = pvColPanel.add(pv.Panel)
            .data(rowRootData._children)
            .localProperty('group', Object)
            .datum(getDatum)
            .group(function(rowData1){
                return this.parent.group()._childrenByKey[rowData1.absKey];
            })
            .localProperty('colorValue')
            .colorValue(function(){
                return colorDimName && this.datum().atoms[colorDimName].value;
            })
            .localProperty('sizeValue')
            .sizeValue(function(){
                return sizeDimName && this.datum().atoms[sizeDimName].value;
            })
            ;
            
        pvHeatGrid
            [anchor](function(){ return this.index * h; })
            [pvc.BasePanel.orthogonalLength[anchor]](h)
            .antialias(false)
            .strokeStyle(null)
            .lineWidth(0)
            ;
            // THIS caused HUGE memory consumption and speed reduction (at least in use Shapes mode)
            //.overflow('hidden'); //overflow important if showValues=true
        
         
        if(options.useShapes){
            this.shapes = this.createHeatMap(w, h, getFillColor);
        } else {
            this.shapes = pvHeatGrid;
        }

        this.shapes
            //.text(getLabel) // Ended up showing when the tooltip should be empty
            .fillStyle(function(){
                return getFillColor.call(pvHeatGrid, true);
            })
            ;
        
        var valueDimName = colorDimName || sizeDimName;
        
        if(this.showValues && valueDimName){
            
            this.pvHeatGridLabel = pvHeatGrid.anchor("center").add(pv.Label)
                .bottom(0)
                .text(function(){
                    return this.datum().atoms[valueDimName].label;
                })
                ;
        }
        
        if(this._shouldHandleClick()){ // TODO: should have valueDimName -> value argument
            this._addPropClick(this.shapes);
        }

        if(options.doubleClickAction){ // TODO: should have valueDimName -> value argument
            this._addPropDoubleClick(this.shapes);
        }
        
        if(options.showTooltips){
            this._addPropTooltip(this.shapes, {tipsyEvent: 'mouseover'});
        }
    },

    /**
     * @override
     */
    applyExtensions: function(){

        this.base();

        if(this.pvHeatGridLabel){
            this.extend(this.pvHeatGridLabel, "heatGridLabel_");
        }

        // Extend heatGrid and heatGridPanel
        this.extend(this.pvHeatGrid,"heatGridPanel_");
        this.extend(this.pvHeatGrid,"heatGrid_");
    },

    createHeatMap: function(w, h, getFillColor){
        var myself = this,
            options = this.chart.options,
            data = this.chart.data,
            sizeDimName  = this.sizeDimName,
            colorDimName = this.colorDimName,
            nullShapeType = this.nullShape,
            shapeType = this.shape;
        
        /* SIZE RANGE */
        var maxRadius = Math.min(w, h) / 2;
        if(this.shape === 'diamond'){
            // Protovis draws diamonds inscribed on
            // a square with half-side radius*Math.SQRT2
            // (so that diamonds just look like a rotated square)
            // For the height of the dimanod not to exceed the cell size
            // we compensate that factor here.
            maxRadius /= Math.SQRT2;
        }

        // Small margin
        maxRadius -= 2;
        
        var maxArea  = maxRadius * maxRadius, // apparently treats as square area even if circle, triangle is different
            minArea  = 12,
            areaSpan = maxArea - minArea;

        if(areaSpan <= 1){
            // Very little space
            // Rescue Mode - show *something*
            maxArea = Math.max(maxArea, 2);
            minArea = 1;
            areaSpan = maxArea - minArea;
            
            if(pvc.debug >= 2){
                pvc.log("Using rescue mode dot area calculation due to insufficient space.");
            }
        }
        
        var sizeValueToArea;
        if(sizeDimName){
            /* SIZE DOMAIN */
            def.scope(function(){
                var sizeValExtent = data.dimensions(sizeDimName).extent({visible: true});
                if(sizeValExtent){
                    var sizeValMin  = sizeValExtent.min.value,
                        sizeValMax  = sizeValExtent.max.value,
                        sizeValSpan = Math.abs(sizeValMax - sizeValMin); // may be zero
                    
                    if(isFinite(sizeValSpan) && sizeValSpan > 0.00001) {
                        // Linear mapping
                        // TODO: a linear scale object??
                        var sizeSlope = areaSpan / sizeValSpan;
                        
                        sizeValueToArea = function(sizeVal){
                            return minArea + sizeSlope * (sizeVal == null ? 0 : (sizeVal - sizeValMin));
                        };
                    }
                }
            });
        }
        
        if(!sizeValueToArea) {
            sizeValueToArea = pv.functor(maxArea);
        }
        
        /* BORDER WIDTH & COLOR */
        var notNullSelectedBorder = (this.selectedBorder == null || (+this.selectedBorder) === 0) ? 
                                     this.defaultBorder : 
                                     this.selectedBorder;
        
        var nullSelectedBorder = (this.selectedBorder == null || (+this.selectedBorder) === 0) ? 
                                  this.nullBorder : 
                                  this.selectedBorder;
        
        var nullDeselectedBorder = this.defaultBorder > 0 ? this.defaultBorder : this.nullBorder;
        
        function getBorderWidth(){
            if(!sizeDimName || !myself._isNullShapeLineOnly() || this.parent.sizeValue() != null){
                return this.selected() ? notNullSelectedBorder : myself.defaultBorder;
            }

            // is null
            return this.selected() ? nullSelectedBorder : nullDeselectedBorder;
        }

        function getBorderColor(){
            var lineWidth = this.lineWidth();
            if(!(lineWidth > 0)){ //null|<0
                return null; // no style
            }
            
            var color = getFillColor.call(this.parent, false);
            return (data.owner.selectedCount() === 0 || this.selected()) ? 
                    color.darker() : 
                    color;
        }
        
        /* SHAPE TYPE & SIZE */
        var getShapeType;
        if(!sizeDimName) {
            getShapeType = def.fun.constant(shapeType);
        } else {
            getShapeType = function(){
                return this.parent.sizeValue() != null ? shapeType : nullShapeType;
            };
        }
        
        var getShapeSize;
        if(!sizeDimName){
            getShapeSize = function(){
                /* When neither color nor size dimensions */
                return (colorDimName && !nullShapeType && this.parent.colorValue() == null) ? 0 : maxArea;
            };
        } else {
            getShapeSize = function(){
                var sizeValue = this.parent.sizeValue();
                return (sizeValue == null && !nullShapeType) ? 0 : sizeValueToArea(sizeValue);
            };
        }
        
        // Panel
        return this.pvHeatGrid.add(pv.Dot)
            .localProperty("selected", Boolean)
            .selected(function(){ return this.datum().isSelected; })
            .shape(getShapeType)
            .shapeSize(getShapeSize)
            .lock('shapeAngle') // rotation of shapes may cause them to not fit the calculated cell. Would have to improve the radius calculation code.
            .fillStyle(function(){ return getFillColor.call(this.parent); })
            .lineWidth(getBorderWidth)
            .strokeStyle(getBorderColor)
            ;
    },

    _isNullShapeLineOnly: function(){
        return this.nullShape == 'cross';  
    },

    /**
     * Returns an array of marks whose instances are associated to a datum, or null.
     * @override
     */
    _getSignums: function(){
        return [this.shapes];
    },
    
    /**
     * Renders the heat grid panel.
     * @override
     */
    _renderInteractive: function(){
        this.pvPanel.render();
    }
});

/**
 * MetricXYAbstract is the base class of metric XY charts.
 * (Metric stands for:
 *   Measure, Continuous or Not-categorical base and ortho axis)
 */
pvc.MetricXYAbstract = pvc.CartesianAbstract.extend({

    constructor: function(options){

        var isV1Compat = (options && options.compatVersion <= 1);
        if(isV1Compat){
            /**
             * If the 'x' role isn't explicitly defined (in any way),
             * help with defaults and keep backward compatibility by
             * making the 'x' role's default dimension - the 'category' dimension -
             * a numeric one.
             */
            if(!options){ options = {}; }
            if(!options.visualRoles || !options.visualRoles.x){
                var dims   = options.dimensions || (options.dimensions = {}),
                    catDim = dims.category || (dims.category = {});

                if(catDim.valueType === undefined){
                    catDim.valueType = Number;
                }
            }
        }

        if(options && options.axisOffset != null){
            // See pvc.MetricLineDotPanel#_calcLayout
            this._explicitAxisOffset = true;
        }

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.MetricXYAbstract.defaultOptions, options);

        this._axisRoleNameMap = {
            'base':  'x',
            'ortho': 'y'
        };

        var parent = this.parent;
        if(parent) {
            this._xRole = parent._xRole;
            this._yRole = parent._yRole;
        }
    },

    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){

        this.base();

        var isV1Compat = (this.options.compatVersion <= 1);

        this._addVisualRoles({
            x: {
                isMeasure: true,
                isRequired: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: isV1Compat ? 'category' : 'value'
            },
            y: {
                isMeasure: true,
                isRequired: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: isV1Compat ? 'value' : 'value2'
            }
        });

        this._xRole = this.visualRoles('x');
        this._yRole = this.visualRoles('y');
    },

    _initData: function(){
        this.base.apply(this, arguments);

        // Cached
        this._xDim = this.data.dimensions(this._xRole.firstDimensionName());
        this._yDim = this.data.dimensions(this._yRole.firstDimensionName());
    }
}, {
    defaultOptions: {
        axisOffset: 0.04,
        valuesAnchor: "right",
        panelSizeRatio: 1
    }
});

/*
 * Metric Line/Dot panel.
 * Class that draws dot and line plots.
 * Specific options are:
 * <i>showDots</i> - Show or hide dots. Default: true
 * <i>showLines</i> - Show or hide dots. Default: true
 * <i>showValues</i> - Show or hide line value. Default: false
 *
 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 * <i>line_</i> - for the actual line
 * <i>linePanel_</i> - for the panel where the lines sit
 * <i>lineDot_</i> - the dots on the line
 * <i>lineLabel_</i> - for the main line label
 */
pvc.MetricLineDotPanel = pvc.CartesianAbstractPanel.extend({
    anchor: 'fill',
    
    pvLine: null,
    pvDot: null,
    pvLabel: null,
    pvScatterPanel: null, 
    
    showLines:  true,
    showDots:   true,
    showValues: true,
    
    valuesAnchor: "right",
    
    dotShape: "circle",
    
    _v1DimRoleName: {
        'series':   'series',
        'category': 'x',
        'value':    'y'
    },
    
    /*
    * @override
    */
   _calcLayout: function(layoutInfo){
       /* Adjust axis offset to avoid dots getting off the content area */
       
       var clientSize = layoutInfo.clientSize;
       var chart = this.chart;
       
       if(chart._dotSizeDim){
           /* Determine Max/Min Dot Size */
           var length = Math.max((clientSize.width + clientSize.height) / 2, 2);
           var maxRadius = length / 8;
           if(this.dotShape === 'diamond'){
               // Protovis draws diamonds inscribed on
               // a square with half-side radius*Math.SQRT2
               // (so that diamonds just look like a rotated square)
               // For the height of the dimanod not to exceed the cell size
               // we compensate that factor here.
               maxRadius /= Math.SQRT2;
           }
           
           // Small margin
           maxRadius -= 2;
           
           var maxArea  = maxRadius * maxRadius,
               minArea  = 12,
               areaSpan = maxArea - minArea;
           
           if(areaSpan <= 1){
               // Very little space
               // Rescue Mode - show *something*
               maxArea = Math.max(maxArea, 2);
               minArea = 1;
               areaSpan = maxArea - minArea;
               maxRadius = Math.sqrt(maxArea);
               
               if(pvc.debug >= 3){
                   pvc.log("Using rescue mode dot area calculation due to insufficient space.");
               }
           }
           
           this.maxDotRadius = maxRadius;
           this.maxDotArea   = maxArea;
           this.minDotArea   = minArea;
           this.dotAreaSpan  = areaSpan;
           
           if(!chart.root._explicitAxisOffset){
               /* Half a circle must fit at any edge of the main content area */
               // TODO: Something should be wrong with the calculations?
               // Dots still come out a little bit, and this compensates for it.
               var offsetRadius  = maxRadius + 6,
                   minAxisOffset = pvc.MetricXYAbstract.defaultOptions.axisOffset,
                   axisOffset = offsetRadius / Math.max(clientSize.width, 2);

               if(axisOffset > minAxisOffset){
                   if(pvc.debug >= 3){
                       pvc.log(def.format("Using X axis offset of '{0}' to compensate for dot size.", [axisOffset]));
                   }
                   
                   chart.options.xAxisOffset = axisOffset;
               }

               axisOffset = offsetRadius / Math.max(clientSize.height, 2);
               if(axisOffset > minAxisOffset){
                   if(pvc.debug >= 3){
                       pvc.log(def.format("Using Y axis offset of '{0}' to compensate for dot size.", [axisOffset]));
                   }

                   chart.options.yAxisOffset = axisOffset;
               }
           }
        } else {
            /* Make X and Y axis offsets take the same abs width */
            /* TODO: should be able to test if any offset, X, or Y is the default value... */
            var defaultAxisOffset = pvc.MetricXYAbstract.defaultOptions.axisOffset,
                xAxisOffset = chart.axes.x.option('Offset'),
                yAxisOffset = chart.axes.y.option('Offset'),
                adjustX = (xAxisOffset === defaultAxisOffset),
                adjustY = (yAxisOffset === defaultAxisOffset);

            if(adjustX || adjustY){
                var offsetLength;

                if(adjustX && adjustY){
                    offsetLength = Math.max(clientSize.width, clientSize.height) * xAxisOffset;
                } else if(adjustX){
                    offsetLength = clientSize.height * yAxisOffset;
                } else /*if(adjustY) */{
                    offsetLength = clientSize.width * xAxisOffset;
                }

                if(adjustX){
                    this.chart.options.xAxisOffset = xAxisOffset = offsetLength / Math.max(clientSize.width, 2);
                    if(pvc.debug >= 3){
                       pvc.log(def.format("Using X axis offset of '{0}' to balance with that of Y axis.", [xAxisOffset]));
                   }
                }

                if(adjustY){
                    this.chart.options.yAxisOffset = yAxisOffset = offsetLength / Math.max(clientSize.height, 2);
                    if(pvc.debug >= 3){
                       pvc.log(def.format("Using Y axis offset of '{0}' to balance with that of X axis.", [yAxisOffset]));
                   }
                }
            }
        }
   },
    
    /**
     * @override
     */
    _createCore: function(){
        this.base();
         
        var myself = this,
            chart = this.chart,
            options = chart.options;

        // ------------------
        // DATA
        var data            = this._getVisibleData(), // shared "series" grouped data
            isDense         = !(this.width > 0) || (data._leafs.length / this.width > 0.5), //  > 100 pts / 200 pxs
            hasColorRole    = !!chart._colorRole.grouping,
            hasDotSizeRole  = this.showDots && !!chart._dotSizeDim,
            sizeValueToArea; 
        
        if(hasDotSizeRole){
            sizeValueToArea = this._getDotSizeRoleScale();
            if(!sizeValueToArea){
                hasDotSizeRole = false;
            }
        }
                    
        var rootScene = this._buildScene(data, hasColorRole, hasDotSizeRole);

        // Disable selection?
        if(isDense && (options.selectable || options.hoverable)) {
            options.selectable = false;
            options.hoverable  = false;
            if(pvc.debug >= 3) {
                pvc.log("Warning: Disabling selection and hovering because the chart is to \"dense\".");
            }
        }
       
        // ---------------
        // BUILD
        this.pvScatterPanel = this.pvPanel.add(pv.Panel)
            .lock('data', rootScene.childNodes)
            ;
        
        // -- LINE --
        var line = new pvc.visual.Line(this, this.pvScatterPanel, {
                extensionId: 'line'
            })
            /* Data */
            .lock('data', function(seriesScene){ return seriesScene.childNodes; }) // TODO    
            
            .lockValue('visible', this.showLines)
            
            /* Position & size */
            .override('x', function(){ return this.scene.basePosition;  })
            .override('y', function(){ return this.scene.orthoPosition; })
            ;
        
        this.pvLine = line.pvMark;
            
        // -- DOT --
        var dot = new pvc.visual.Dot(this, this.pvLine, {
                extensionId: 'dot',
                activeSeriesAware: this.showLines
            })
            .intercept('visible', function(){
                return !this.scene.isIntermediate && this.delegate(true);
            })
            .lockValue('shape', this.dotShape)
            .override('x',  function(){ return this.scene.basePosition;  })
            .override('y',  function(){ return this.scene.orthoPosition; })
            .override('color', function(type){
                /* 
                 * Handle showDots
                 * -----------------
                 * Despite !showDots,
                 * show a dot anyway when:
                 * 1) it is active, or
                 * 2) it is single  (the only dot in the dataset)
                 */
                if(!myself.showDots){
                    var visible = this.scene.isActive ||
                                  this.scene.isSingle;
                    if(!visible) {
                        return pvc.invisibleFill;
                    }
                }
                
                // Follow normal logic
                return this.base(type);
            })
            ;
            
        this.pvDot = dot.pvMark;
        
        this.pvDot.rubberBandSelectionMode = 'center';
        
        // -- COLOR --
        // When no lines are shown, dots are shown with transparency,
        // which helps in distinguishing overlapped dots.
        // With lines shown, it would look strange.
        if(!hasColorRole){
            if(!myself.showLines){
                dot.override('baseColor', function(type){
                    var color = this.base(type);
                    color.opacity = 0.8;
                    return color;
                });
            }
        } else {
            var colorScale = this._getColorRoleScale(data);
            
            line.override('baseColor', function(type){
                var color = this.delegate();
                if(color === undefined){
                    var colorValue = this.scene.acts.color.value;
                    color = colorValue == null ?
                                options.nullColor :
                                colorScale(colorValue);
                }
                
                return color;
            });
            
            dot.override('baseColor', function(type){
                var color = this.delegate();
                if(color === undefined){
                    var colorValue = this.scene.acts.color.value;
                    
                    color = colorValue == null ?
                                options.nullColor :
                                colorScale(colorValue);
                    
                    if(type === 'stroke'){
                        color = color.darker();
                    }
                    
                    if(!myself.showLines){
                        color.opacity = 0.8;
                    }
                }
                
                return color;
            });
            
            dot.override('interactiveColor', function(type, color){
                if(this.scene.isActive) {
                    // Don't make border lighter on active
                    return color;
                }
                
                return this.base(type, color);
            });
        }
        
        // -- DOT SIZE --
        if(!hasDotSizeRole){
            dot.override('baseSize', function(){
                /* When not showing dots, 
                 * but a datum is alone and 
                 * wouldn't be visible using lines,  
                 * show the dot anyway, 
                 * with a size = to the line's width^2
                 */
                if(!myself.showDots) {
                    if(this.scene.isSingle) {
                        // Obtain the line Width of the "sibling" line
                        var lineWidth = Math.max(myself.pvLine.scene[this.pvMark.index].lineWidth, 0.2) / 2;
                        return lineWidth * lineWidth;
                    }
                }
                
                return this.base();
            });
        } else {
            /* Ignore any extension */
            dot.override('baseSize', function(){
                return sizeValueToArea(this.scene.acts.dotSize.value);
            });
        }
        
        // -- LABEL --
        if(this.showValues){
            this.pvLabel = this.pvDot
                .anchor(this.valuesAnchor)
                .add(pv.Label)
                // ------
                .bottom(0)
                .text(function(scene){ 
                    return def.string.join(",", scene.acts.x.label, scene.acts.y.label);
                })
                ;
        }
    },
    
    /* Ignore 'by series' color.
     * Series, then, only control the dots that are connected with lines.
     * 
     * Color is calculated per datum.
     * Datums of the same series may each have a different color.
     * This is true whether the color dimension is discrete or continuous.
     * When the color dimension is discrete, the effect will look
     * similar to a series color, the difference being that datums
     * may be from the same series (same connected line) and
     * have different colors.
     * If lines are not shown there's however no way to tell if the
     * color comes from the series or from the color role.
     * A "normal" color legend may be shown for the color role.
     * 
     * The color role may be discrete of one or more dimensions, 
     * or continuous.
     * 
     * If the role has 1 continuous dimension,
     * the color scale may be (see pvc.color): 
     * - discrete (continuous->discrete), 
     * - linear or 
     * - normally distributed.
     * 
     * Is the color scale shared between small multiple charts?
     * It should be specifiable. Accordingly, the domain of 
     * the color scale is chosen to be the root or the local data
     * (this does not imply sharing the same color scale function instance).
     * 
     * If the role has 1 discrete dimension, or more than one dimension,
     * the color scale will be discrete (->discrete),
     * behaving just like the series color scale.
     * The colors are taken from the chart's series colors.
     * The domain for the scale is the root data, 
     * thus allowing to show a common color legend, 
     * in case multiple charts are used.
     * 
     */
    _getColorRoleScale: function(data){
        var chart = this.chart,
            options = chart.options;
        
        if(chart._colorRole.grouping.isDiscrete()){
            /* Legend-like color scale */
            var colorValues = chart._colorRole
                                .flatten(data.owner) // visible or invisible
                                .children()
                                .select(function(child){ return child.value; })
                                .array();
            
            return chart.colors(colorValues);
        }
        
        return pvc.color.scale(
            def.create(false, options, {
                /* Override/create these options, inherit the rest */
                type: options.colorScaleType || 'linear', 
                data: data.owner, // shared scale
                colorDimension: chart._colorRole.firstDimensionName()
            }));
    },
    
    _getDotSizeRoleScale: function(){
        /* Per small chart scale */
        // TODO ~ copy paste from HeatGrid        

        var sizeValExtent = this.chart._dotSizeDim.extent({visible: true});
        if(sizeValExtent){
            var sizeValMin    = sizeValExtent.min.value,
                sizeValMax    = sizeValExtent.max.value,
                sizeValSpan   = Math.abs(sizeValMax - sizeValMin); // may be zero
            
            if(isFinite(sizeValSpan) && sizeValSpan > 0.001) {
                // Linear mapping
                // TODO: a linear scale object ??
                var sizeSlope = this.dotAreaSpan / sizeValSpan,
                    minArea   = this.minDotArea;
                
                if(pvc.debug >= 3){
                    pvc.log("Dot Size Scale info: " + JSON.stringify({
                        sizeValMin:  sizeValMin,
                        sizeValMax:  sizeValMax,
                        sizeValSpan: sizeValSpan,
                        sizeSlope:   sizeSlope,
                        minArea:     minArea,
                        dotAreaSpan: this.dotAreaSpan
                    }));
                }
                
                return function(sizeVal){
                    return minArea + sizeSlope * (sizeVal == null ? 0 : (sizeVal - sizeValMin));
                };
            }
        }
    },
    
    /**
     * @override
     */
    applyExtensions: function(){

        this.base();

        this.extend(this.pvLabel, "lineLabel_");
        this.extend(this.pvScatterPanel, "scatterPanel_");
        this.extend(this.pvLine,  "line_");
        this.extend(this.pvDot,   "dot_");
        this.extend(this.pvLabel, "label_");
    },

    /**
     * Renders this.pvScatterPanel - the parent of the marks that are affected by interaction changes.
     * @override
     */
    _renderInteractive: function(){
        this.pvScatterPanel.render();
    },

    /**
     * Returns an array of marks whose instances are associated to a datum or group, or null.
     * @override
     */
    _getSignums: function(){
        var marks = [];
        
        marks.push(this.pvDot);
        
        if(this.showLines){
            marks.push(this.pvLine);
        }
        
        return marks;
    },
    
    _buildScene: function(data, hasColorRole){
        var rootScene = new pvc.visual.Scene(null, {panel: this, group: data});
        
        var chart = this.chart,
            sceneBaseScale  = chart.axes.base.sceneScale(),
            sceneOrthoScale = chart.axes.ortho.sceneScale(),
            getColorRoleValue,
            getDotSizeRoleValue;
            
        if(hasColorRole){
             var colorGrouping = chart._colorRole.grouping;//.singleLevelGrouping();
             if(colorGrouping.isSingleDimension){ // TODO
                 var colorDimName = chart._colorRole.firstDimensionName();
                 
                 getColorRoleValue = function(scene){
                     return scene.atoms[colorDimName].value;
                 };
             } else {
                 getColorRoleValue = function(scene) {
                     return colorGrouping.view(scene.datum).value;
                 };
             }
        }
        
        if(chart._dotSizeDim){
            var dotSizeDimName = chart._dotSizeDim.name;
            
            getDotSizeRoleValue = function(scene){
                return scene.atoms[dotSizeDimName].value;
            };
        }
         
        // --------------
        
        /** 
         * Create starting scene tree 
         */
        data.children()
            .each(createSeriesScene, this);
        
        /** 
         * Update the scene tree to include intermediate leaf-scenes,
         * to add in the creation of lines and areas. 
         */
        rootScene
            .children()
            .each(completeSeriesScenes, this);
        
        return rootScene;
        
        function applyScales(scene){
            scene.basePosition  = sceneBaseScale(scene);
            scene.orthoPosition = sceneOrthoScale(scene);
        }
        
        function createSeriesScene(seriesGroup){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesGroup});
            
            seriesScene.acts.series = {
                value: seriesGroup.value,
                label: seriesGroup.label
            };
            
            seriesGroup.datums().each(function(datum){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(seriesScene, {datum: datum});
                
                var atom = datum.atoms[chart._xDim.name];
                scene.acts.x = {
                    value: atom.value,
                    label: atom.label
                };
                
                atom = datum.atoms[chart._yDim.name];
                scene.acts.y = {
                    value: atom.value,
                    label: atom.label
                };
                
                if(getColorRoleValue){
                    scene.acts.color = {
                        value: getColorRoleValue(scene),
                        label: null
                    };
                }
                
                if(getDotSizeRoleValue){
                    var dotSizeValue = getDotSizeRoleValue(scene);
                    scene.acts.dotSize = {
                        value: dotSizeValue,
                        label: chart._dotSizeDim.format(dotSizeValue)
                    };
                }
                
                scene.isIntermediate = false;
                
                applyScales(scene);
            });
        }
        
        function completeSeriesScenes(seriesScene) {
            var seriesScenes = seriesScene.childNodes, 
                fromScene;
            
            /* As intermediate nodes are added, 
             * seriesScene.childNodes array is changed.
             * 
             * The var 'toChildIndex' takes inserts into account;
             * its value is always the index of 'toScene' in 
             * seriesScene.childNodes.
             */
            for(var c = 0, /* category index */
                    toChildIndex = 0,
                    pointCount = seriesScenes.length ; c < pointCount ; c++, toChildIndex++) {
                
                /* Complete toScene */
                var toScene = seriesScenes[toChildIndex];
                toScene.isSingle = !fromScene && !toScene.nextSibling;  // Look ahead
                
                /* Possibly create intermediate scene 
                 * (between fromScene and toScene)
                 */
                if(fromScene) {
                    var interScene = createIntermediateScene(
                            seriesScene,
                            fromScene, 
                            toScene,
                            toChildIndex);
                    
                    if(interScene){
                        toChildIndex++;
                    }
                }
                
                // --------
                
                fromScene = toScene;
            }
        }
        
        function createIntermediateScene(
                     seriesScene, 
                     fromScene, 
                     toScene, 
                     toChildIndex){
            
            /* Code for single, continuous and numeric dimensions */
            var interYValue = (toScene.acts.y.value + fromScene.acts.y.value) / 2;
            var interXValue = (toScene.acts.x.value + fromScene.acts.x.value) / 2;
            
            //----------------
            
            var interScene = new pvc.visual.Scene(seriesScene, {
                    /* insert immediately before toScene */
                    index: toChildIndex,
                    datum: toScene.datum
                });
            
            interScene.acts.x = {
                value: interXValue,
                label: chart._xDim.format(interXValue)
            };
            
            interScene.acts.y = {
                value: interYValue,
                label: chart._yDim.format(interYValue)
            };
            
            if(getColorRoleValue){
                interScene.acts.color = toScene.acts.color;
            }
            
            if(getDotSizeRoleValue){
                interScene.acts.dotSize = toScene.acts.dotSize;
            }
            
            interScene.isIntermediate = true;
            interScene.isSingle = false;
            
            applyScales(interScene);
            
            return interScene;
        }
    }
});

/**
 * MetricLineDotAbstract is the base class of metric dot and line.
 */
pvc.MetricLineDotAbstract = pvc.MetricXYAbstract.extend({

    constructor: function(options){

        this.base(options);

        pvc.mergeDefaults(this.options, pvc.MetricLineDotAbstract.defaultOptions, options);

        var parent = this.parent;
        if(parent) {
            this._colorRole = parent._colorRole;
            this._dotSizeRole = parent._dotSizeRole;
        }
    },

    /**
     * @override 
     */
    _processOptionsCore: function(options){
        this.base(options);
        
        if(options.nullColor){
            options.nullColor = pv.color(options.nullColor);
        }
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();
        
        var isV1Compat = (this.options.compatVersion <= 1);
        
        this._addVisualRoles({
            color:  { 
                isMeasure: true, 
                //requireSingleDimension: true,  // TODO: generalize this...
                //requireIsDiscrete: false, 
                //valueType: Number,
                defaultDimensionName: isV1Compat ? 'value2' : 'value3'
            },
            dotSize: { 
                isMeasure: true, 
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: isV1Compat ? 'value3' : 'value4' 
            }
        });

        this._colorRole   = this.visualRoles('color');
        this._dotSizeRole = this.visualRoles('dotSize');
    },

    _initData: function(keyArgs){
        this.base(keyArgs);

        // Cached
        var dotSizeGrouping = this._dotSizeRole.grouping;
        if(dotSizeGrouping){
            this._dotSizeDim = this.data.dimensions(dotSizeGrouping.firstDimension.name);
        }

        /* Change the legend source role */
        if(!this.parent){
            var colorGrouping = this._colorRole.grouping;
            if(colorGrouping && colorGrouping.isDiscrete()) {
                // role is bound and discrete => change legend source
                this.legendSource = 'color';
            } else {
                /* When bound, the "color legend" has no use
                 * but to, possibly, show/hide "series",
                 * if any
                 */
                this.options.legend = false;
            }
        }
    },
    
     /**
      * @override 
      */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in MetricLineDot");
        }
        
        var options = this.options;
        
        return new pvc.MetricLineDotPanel(this, parentPanel, {
            showValues:   options.showValues,
            valuesAnchor: options.valuesAnchor,
            showLines:    options.showLines,
            showDots:     options.showDots,
            orientation:  options.orientation
        });
    }
}, {
    defaultOptions: {
        showDots:   false,
        showLines:  false,
        showValues: false,
        originIsZero: false,
        tipsySettings: def.create(pvc.BaseChart.defaultOptions.tipsySettings, { offset: 15 }),
        
        /* Dot Color Role */
        colorScaleType: "linear", // "discrete", "normal" (distribution) or "linear"
        colorRange: ['red', 'yellow','green'],
        colorRangeInterval:  undefined,
        minColor:  undefined, //"white",
        maxColor:  undefined, //"darkgreen",
        nullColor: "#efc5ad"  // white with a shade of orange
    }
});

/**
 * Metric Dot Chart
 */
pvc.MetricDotChart = pvc.MetricLineDotAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showDots = true;
    }
});


/**
 * Metric Line Chart
 */
pvc.MetricLineChart = pvc.MetricLineDotAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showLines = true;
    }
});
/**
 * Bullet chart generation
 */
pvc.BulletChart = pvc.BaseChart.extend({

    bulletChartPanel : null,
    allowNoData: true,

    constructor: function(options){
        options = options || {};

        // Add range and marker dimension group defaults
        // This only helps in default bindings...
        var dimGroups = options.dimensionGroups || (options.dimensionGroups = {});
        var rangeDimGroup = dimGroups.range  || (dimGroups.range  = {});
        if(rangeDimGroup.valueType === undefined){
            rangeDimGroup.valueType = Number;
        }

        var markerDimGroup = dimGroups.marker || (dimGroups.marker = {});
        if(markerDimGroup.valueType === undefined){
            markerDimGroup.valueType = Number;
        }

        options.legend = false;
        options.selectable = false; // not supported yet

        // TODO
        //if(options.compatVersion <= 1 && options.tooltipFormat === undefined){
            // Backwards compatible tooltip format
            options.tooltipFormat = function(s, c, v) {
                return this.chart.options.valueFormat(v);
            };
        //}

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.BulletChart.defaultOptions, options);
    },

    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){

        this.base();

        this._addVisualRoles({
            title:    { defaultDimensionName: 'title*'    },
            subTitle: { defaultDimensionName: 'subTitle*' },
            value: {
                isMeasure:  true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: 'value*'
            },
            marker: {
                isMeasure:  true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: 'marker*'
            },
            range: {
                isMeasure:  true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimensionName: 'range*'
            }
        });
    },

    _createTranslation: function(complexType, translOptions){
        var translation = this.base(complexType, translOptions),
            /*
             * By now the translation has already been initialized
             * and its virtualItemSize is determined.
             */
            size = translation.virtualItemSize()
            ;

        /* Configure the translation with default dimensions.
         *  1       Value
         *  2       Title | Value
         *  3       Title | Value | Marker
         *  >= 4    Title | Subtitle | Value | Marker | Ranges
         */
        // TODO: respect user reader definitions (names and indexes)
        if(size){
            switch(size){
                case 1:
                    translation.defReader({names: 'value'});
                    break;

                case 2:
                    translation.defReader({names: ['title', 'value']});
                    break;

                case 3:
                    translation.defReader({names: ['title', 'value', 'marker']});
                    break;

                default:
                    translation.defReader({names: ['title', 'subTitle', 'value', 'marker']});
                    if(size > 4){
                        // 4, 5, 6, ...
                        translation.defReader({names: 'range', indexes: pv.range(4, size)});
                    }
                    break;
            }
        }

        return translation;
    },
    
  _preRenderCore: function(){
    if(pvc.debug >= 3){
      pvc.log("Prerendering in bulletChart");
    }
    
    this.bulletChartPanel = new pvc.BulletChartPanel(this, this.basePanel, {
        showValues:   this.options.showValues,
        showTooltips: this.options.showTooltips,
        orientation:  this.options.orientation
    });
  }
}, {
  defaultOptions: {
      showValues: true,
      orientation: "horizontal",
      legend: false,

      bulletSize:     30,  // Bullet size
      bulletSpacing:  50,  // Spacing between bullets
      bulletMargin:  100,  // Left margin

      // Defaults
      bulletMarkers:  null,     // Array of markers to appear
      bulletMeasures: null,     // Array of measures
      bulletRanges:   null,     // Ranges
      bulletTitle:    "Bullet", // Title
      bulletSubtitle: "",       // Subtitle
      bulletTitlePosition: "left", // Position of bullet title relative to bullet

      axisDoubleClickAction: null,

      crosstabMode: false,
      seriesInRows: false
    }
});



/*
 * Bullet chart panel. Generates a bar chart. Specific options are:
 * <i>orientation</i> - horizontal or vertical. Default: vertical
 * <i>showValues</i> - Show or hide bar value. Default: false
 *
 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 * <i>bulletsPanel_</i> - for the bullets panel
 * <i>bulletPanel_</i> - for the bullets pv.Layout.Bullet
 * <i>bulletRange_</i> - for the bullet range
 * <i>bulletMeasure_</i> - for the bullet measure
 * <i>bulletMarker_</i> - for the marker
 * <i>bulletRule_</i> - for the axis rule
 * <i>bulletRuleLabel_</i> - for the axis rule label
 * <i>bulletTitle_</i> - for the bullet title
 * <i>bulletSubtitle_</i> - for the main bar label
 */


pvc.BulletChartPanel = pvc.BasePanel.extend({
  anchor: 'fill',
  pvBullets: null,
  pvBullet: null,
  data: null,
  onSelectionChange: null,
  showValues: true,

  /**
   * @override
   */
  _createCore: function() {
    var chart  = this.chart,
        options = chart.options,
        data = this.buildData();
    
    var anchor = options.orientation=="horizontal"?"left":"bottom";
    var size, angle, align, titleLeftOffset, titleTopOffset, ruleAnchor, leftPos, topPos, titleSpace;
    
    if(options.orientation=="horizontal"){
      size = this.width - this.chart.options.bulletMargin - 20;
      angle=0;
      switch (options.bulletTitlePosition) {
        case 'top':
          leftPos = this.chart.options.bulletMargin;
          titleLeftOffset = 0;
          align = 'left';
          titleTopOffset = -12;
          titleSpace = parseInt(options.titleSize/2, 10);
          break;
        case 'bottom':
          leftPos = this.chart.options.bulletMargin;
          titleLeftOffset = 0;
          align = 'left';
          titleTopOffset = options.bulletSize + 32;
          titleSpace = 0;
          break;
        case 'right':
          leftPos = 5;
          titleLeftOffset = size + 5;
          align = 'left';
          titleTopOffset = parseInt(options.bulletSize/2, 10);
          titleSpace = 0;
          break;
        case 'left':
        default:
          leftPos = this.chart.options.bulletMargin;
          titleLeftOffset = 0;
          titleTopOffset = parseInt(options.bulletSize/2, 10);
          align = 'right';
          titleSpace = 0;
      }
      ruleAnchor = "bottom";
      topPos = function(){
        //TODO: 10
        return (this.index * (options.bulletSize + options.bulletSpacing)) + titleSpace;
      };
    }
    else
    {
      size = this.height - this.chart.options.bulletMargin - 20;
      switch (options.bulletTitlePosition) {
        case 'top':
          leftPos = this.chart.options.bulletMargin;
          titleLeftOffset = 0;
          align = 'left';
          titleTopOffset = -20;
          angle = 0;
          topPos = undefined;
          break;
        case 'bottom':
          leftPos = this.chart.options.bulletMargin;
          titleLeftOffset = 0;
          align = 'left';
          titleTopOffset = size + 20;
          angle = 0;
          topPos = 20;
          break;
        case 'right':
          leftPos = 5;
          titleLeftOffset = this.chart.options.bulletSize + 40;
          align = 'left';
          titleTopOffset = size;
          angle = -Math.PI/2;
          topPos = undefined;
          break;
        case 'left':
        default:
          leftPos = this.chart.options.bulletMargin;
          titleLeftOffset = -12;
          titleTopOffset = this.height - this.chart.options.bulletMargin - 20;
          align = 'left';
          angle = -Math.PI/2;
          topPos = undefined;
      }
      ruleAnchor = "right";
      leftPos = function(){
        return options.bulletMargin + this.index * (options.bulletSize + options.bulletSpacing);
      };

    }

    this.pvBullets = this.pvPanel.add(pv.Panel)
    .data(data)
    [pvc.BasePanel.orthogonalLength[anchor]](size)
    [pvc.BasePanel.parallelLength[anchor]](this.chart.options.bulletSize)
    .margin(20)
    .left(leftPos)
    .top(topPos);
    

    this.pvBullet = this.pvBullets.add(pv.Layout.Bullet)
    .orient(anchor)
    .ranges(function(d){
      return d.ranges;
    })
    .measures(function(d){
      return d.measures;
    })
    .markers(function(d){
      return d.markers;
    });
    
    
    if (options.clickable){
      this.pvBullet
      .cursor("pointer")
      .event("click",function(d){
        var s = d.title;
        var c = d.subtitle;
        var ev = pv.event;
        return options.clickAction(s,c, d.measures, ev);
      });
    }
    
    this.pvBulletRange = this.pvBullet.range.add(pv.Bar);
    this.pvBulletMeasure = this.pvBullet.measure.add(pv.Bar)
    .text(function(d){
      return options.valueFormat(d);
    });

    this.pvBulletMarker = this.pvBullet.marker.add(pv.Dot)
    .shape("square")
    .fillStyle("white")
    .text(function(d){
      return options.valueFormat(d);
    });


    if(this.showTooltips){
      // Extend default
      // TODO: how to deal with different measures in tooltips depending on mark
      
//      this._addPropTooltip(this.pvBulletMeasure);
//      this._addPropTooltip(this.pvBulletMarker);
        var myself = this;
        this.pvBulletMeasure
            .localProperty('tooltip')
            .tooltip(function(v, d){
                var s = d.title;
                var c = d.subtitle;
                return chart.options.tooltipFormat.call(myself,s,c,v);
            })
            ;

        this.pvBulletMarker
            .localProperty('tooltip')
            .tooltip(function(v, d){
                var s = d.title;
                var c = d.subtitle;
                return chart.options.tooltipFormat.call(myself,s,c,v);
            })
            ;
      
        this.pvBulletMeasure.event("mouseover", pv.Behavior.tipsy(this.chart.options.tipsySettings));
        this.pvBulletMarker.event("mouseover", pv.Behavior.tipsy(this.chart.options.tipsySettings));
    }

    this.pvBulletRule = this.pvBullet.tick.add(pv.Rule);

    this.pvBulletRuleLabel = this.pvBulletRule.anchor(ruleAnchor).add(pv.Label)
    .text(this.pvBullet.x.tickFormat);

    this.pvBulletTitle = this.pvBullet.anchor(anchor).add(pv.Label)
    .font("bold 12px sans-serif")
    .textAngle(angle)
    .left(-10)
    .textAlign(align)
    .textBaseline("bottom")
    .left(titleLeftOffset)
    .top(titleTopOffset)
    .text(function(d){
      return d.formattedTitle;
    });

    this.pvBulletSubtitle = this.pvBullet.anchor(anchor).add(pv.Label)
    .textStyle("#666")
    .textAngle(angle)
    .textAlign(align)
    .textBaseline("top")
    .left(titleLeftOffset)
    .top(titleTopOffset)
    .text(function(d){
      return d.formattedSubtitle;
    });

    var doubleClickAction = (typeof(options.axisDoubleClickAction) == 'function') ?
    function(d, e) {
            //ignoreClicks = 2;
            options.axisDoubleClickAction(d, e);

    }: null;
    
    if (doubleClickAction) {
        this.pvBulletTitle
            .cursor("pointer")
            .events('all')  //labels don't have events by default
            .event("dblclick", function(d){
                    doubleClickAction(d, arguments[arguments.length-1]);
                });

        this.pvBulletSubtitle
            .cursor("pointer")
            .events('all')  //labels don't have events by default
            .event("dblclick", function(d){
                    doubleClickAction(d, arguments[arguments.length-1]);
                });

    }

    // Extension points
    this.extend(this.pvBullets,"bulletsPanel_");
    this.extend(this.pvBullet,"bulletPanel_");
    this.extend(this.pvBulletRange,"bulletRange_");
    this.extend(this.pvBulletMeasure,"bulletMeasure_");
    this.extend(this.pvBulletMarker,"bulletMarker_");
    this.extend(this.pvBulletRule,"bulletRule_");
    this.extend(this.pvBulletRuleLabel,"bulletRuleLabel_");
    this.extend(this.pvBulletTitle,"bulletTitle_");
    this.extend(this.pvBulletSubtitle,"bulletSubtitle_");

    // Extend body
    this.extend(this.pvPanel,"chart_");
  },

    /*
     * Data array to back up bullet charts.
     */
    buildData: function(){
        if(pvc.debug >= 3){
            pvc.log("In buildData: " + this.chart.data.getInfo() );
        }

        var data,
            chart = this.chart,
            options = chart.options,
            titleRole = chart.visualRoles('title'),
            titleGrouping = titleRole.grouping,
            subTitleRole = chart.visualRoles('subTitle'),
            subTitleGrouping = subTitleRole.grouping,
            valueRole = chart.visualRoles('value'),
            valueDimName = valueRole.grouping && valueRole.firstDimensionName(),
            markerRole = chart.visualRoles('marker'),
            markerDimName = markerRole.grouping && markerRole.firstDimensionName(),
            rangeRole = chart.visualRoles('range'),
            rangeGrouping = rangeRole.grouping;
        
        var defaultData = {
            title: options.bulletTitle,
            formattedTitle: def.scope(function(){
                var formatter = titleGrouping && titleRole.firstDimension().formatter();
                if(formatter){
                    return formatter(options.bulletTitle);
                }
                return options.bulletTitle;
            }),
            subtitle: options.bulletSubtitle,
            formattedSubtitle: def.scope(function(){
                var formatter = subTitleGrouping && subTitleRole.firstDimension().formatter();
                if(formatter){
                    return formatter(options.bulletSubtitle);
                }
                return options.bulletSubtitle;
            }),
            ranges:   options.bulletRanges   || [],
            measures: options.bulletMeasures || [],
            markers:  options.bulletMarkers  || []
        };

        if(!valueRole.grouping &&
           !titleGrouping &&
           !markerRole.grouping &&
           !subTitleGrouping &&
           !rangeGrouping){

            data = [defaultData];
       } else {
            data = chart.data.datums().select(function(datum){
                var d = Object.create(defaultData),
                    atoms = datum.atoms,
                    view;

                if(valueDimName){
                    d.measures = [atoms[valueDimName].value];
                }

                if(titleGrouping){
                    view = titleGrouping.view(datum);
                    d.title = view.value;
                    d.formattedTitle = view.label;
                }

                if(subTitleGrouping){
                    view = subTitleGrouping.view(datum);
                    d.subtitle = view.value;
                    d.formattedSubtitle = view.label;
                }

                if(markerDimName){
                    d.markers = [atoms[markerDimName].value];
                }

                if(rangeGrouping){
                    d.ranges = rangeGrouping.view(datum).values();
                }

                return d;
            }, this)
            .array();
        }
        
        return data;
    }
});

/**
 * Parallel coordinates offer a way to visualize data and make (sub-)selections
 * on this dataset.
 * This code has been based on a protovis example:
 *    http://vis.stanford.edu/protovis/ex/cars.html
 */
pvc.ParallelCoordinates = pvc.BaseChart.extend({

  parCoordPanel : null,
  legendSource: 'category',

  constructor: function(options){

   // Force the value dimension not to be a number
      options = options || {};
      options.dimensions = options.dimensions || {};
      if(!options.dimensions.value) {
          options.dimensions.value = {valueType: null};
      }
      
      this.base(options);
    
      // Apply options
      pvc.mergeDefaults(this.options, pvc.ParallelCoordinates.defaultOptions, options);
  },

  _preRenderCore: function(){

    if(pvc.debug >= 3){
      pvc.log("Prerendering in parallelCoordinates");
    }

    this.parCoordPanel = new pvc.ParCoordPanel(this, this.basePanel, {
      topRuleOffset : this.options.topRuleOffset,
      botRuleOffset : this.options.botRuleOffset,
      leftRuleOffset : this.options.leftRuleOffset,
      rightRuleOffset : this.options.rightRuleOffset,
      sortCategorical : this.options.sortCategorical,
      mapAllDimensions : this.options.mapAllDimensions,
      numDigits : this.options.numDigits
    });
  }
}, {
    defaultOptions: {
      topRuleOffset: 30,
      botRuleOffset: 30,
      leftRuleOffset: 60,
      rightRuleOffset: 60,
	// sort the categorical (non-numerical dimensions)
      sortCategorical: true,
	// map numerical dimension too (uniform (possible non-linear)
	// distribution of the observed values)
      mapAllDimensions: true,
	// number of digits after decimal point.
      numDigits: 0
    }
});


/*
 * ParCoord chart panel. Generates a serie of Parallel Coordinate axis 
 * and allows you too make selections on these parallel coordinates.
 * The selection will be stored in java-script variables and can be
 * used as part of a where-clause in a parameterized SQL statement.
 * Specific options are:
 *   << to be filled in >>

 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 * <i>parCoord_</i> - for the parallel coordinates
 *    << to be completed >>
 */


pvc.ParCoordPanel = pvc.BasePanel.extend({
  anchor: 'fill',
  pvParCoord: null,

  dimensions: null, 
  dimensionDescr: null,

  data: null,

    /*****
     * retrieve the data from database and transform it to maps.
     *    - this.dimensions: all dimensions
     *    - this.dimensionDescr: description of dimensions
     *    - this.data: array with hashmap per data-point
     *****/
  retrieveData: function () {
    var data = this.chart.data;
    var numDigit = this.chart.options.numDigits;

    this.dimensions = data.getVisibleCategories();
    var values = data.getValues();

    var dataRowIndex = data.getVisibleSeriesIndexes();
    var pCoordIndex = data.getVisibleCategoriesIndexes();

    var pCoordKeys = data.getCategories();

    /******
     *  Generate a Coordinate mapping. 
     *  This mapping is required for categorical dimensions and
     *  optional for the numerical dimensions (in 4 steps)
     ********/
    // 1: generate an array of coorMapping-functions
    // BEWARE: Only the first row (index 0) is used to test whether 
    // a dimension is categorical or numerical!
    var pCoordMapping = (this.chart.options.mapAllDimensions) ?
      pCoordIndex.map( function(d) {return (isNaN(values[d][0])) ? 
              {categorical: true, len: 0, map: [] } : 
                             {categorical: false, len: 0,
                                 map: [], displayValue: [] }; })
    : pCoordIndex.map( function(d) {return (isNaN(values[d][0])) ? 
              {categorical: true, len: 0, map: [] } : 
              null; }) ;
  
      // 2: and generate a helper-function to update the mapping
      //  For non-categorical value the original-value is store in displayValue
    var coordMapUpdate = function(i, val) {
      var cMap = pCoordMapping[i];
      var k = null; // define in outer scope.
      if (!cMap.categorical) {
        var keyVal = val.toFixed(numDigit);   // force the number to be a string
        k = cMap.map[keyVal];
        if (k == null) {
          k = cMap.len;
          cMap.len++;
          cMap.map[keyVal] = k;
          cMap.displayValue[keyVal] = val;
        }
      } else {
        k = cMap.map[val];
        if (k == null) {
          k = cMap.len;
          cMap.len++;
          cMap.map[val] = k;
        }
      }
      return k;
    };

    // 3. determine the value to be displayed
    //   for the categorical dimensions map == displayValue
    for(var d in pCoordMapping){
        if (pCoordMapping.hasOwnProperty(d) && 
            pCoordMapping[d] && 
            pCoordMapping[d].categorical) {
            pCoordMapping[d].displayValue = pCoordMapping[d].map;
        }
    }
    
    var i, item, k;
    
    // 4. apply the sorting of the dimension
    if (this.chart.options.sortCategorical || 
        this.chart.options.mapAllDimensions) {
      // prefill the coordMapping in order to get it in sorted order.
      // sorting is required if all dimensions are mapped!!
      for (i=0; i<pCoordMapping.length; i++) {
         if (pCoordMapping[i]) {
           // add all data
           for (var col=0; col<values[i].length; col++) {
               coordMapUpdate(i, values[i][col]);
           }
           
           // create a sorted array
           var cMap = pCoordMapping[i].map;
           var sorted = [];
           for(item in cMap){
                if(cMap.hasOwnProperty(item)){
                    sorted.push(item);
                }
           }
           sorted.sort();
           // and assign a new index to all items
           if (pCoordMapping[i].categorical){
             for(k=0; k<sorted.length; k++){
               cMap[sorted[k]] = k;
             }
           } else {
             for(k=0; k<sorted.length; k++) {
               cMap[sorted[k]].index = k;
             }
           }
         }      
      }
    }

    /*************
    *  Generate the full dataset (using the coordinate mapping).
    *  (in 2 steps)
    ******/
    //   1. generate helper-function to transform a data-row to a hashMap
    //   (key-value pairs). 
    //   closure uses pCoordKeys and values
    var generateHashMap = function(col) {
      var record = {};
      for(var j in pCoordIndex) {
          if(pCoordIndex.hasOwnProperty(j)){
                record[pCoordKeys[j]] = (pCoordMapping[j]) ?
                    coordMapUpdate(j, values[j][col]) :
                    values[j][col];
          }
      }
      return record;
    };
    
    // 2. generate array with a hashmap per data-point
    this.data = dataRowIndex.map(function(col) { return generateHashMap (col);});

    
    /*************
    *  Generate an array of descriptors for the dimensions (in 3 steps).
    ******/
    // 1. find the dimensions
    var descrVals = this.dimensions.map(function(cat){
         var item2 = {};
         // the part after "__" is assumed to be the units
         var elements = cat.split("__");
         item2.id = cat;
         item2.name = elements[0];
         item2.unit = (elements.length >1)? elements[1] : "";
         return item2;
       });

    // 2. compute the min, max and step(-size) per dimension)
    for(i=0; i<descrVals.length; i++) {
      item = descrVals[i];
      var index = pCoordIndex[i];
	// orgRowIndex is the index in the original dataset
	// some indices might be (non-existent/invisible)
      item.orgRowIndex = index;

      // determine min, max and estimate step-size
      var len = values[index].length;
      var theMin, theMax, theMin2, theMax2;
      var v;
      
      // two version of the same code (one with mapping and one without)
      if (pCoordMapping[index]) {
        theMin = theMax = theMin2 = theMax2 =
               pCoordMapping[index].displayValue[ values[index][0] ] ;

        for(k=1; k<len; k++) {
          v = pCoordMapping[index].displayValue[ values[index][k] ] ;
          if (v < theMin)
          {
            theMin2 = theMin;
            theMin = v;
          }
          if (v > theMax) {
            theMax2 = theMax;
            theMax = v;
          }
        }
      } else {  // no coordinate mapping applied
        theMin = theMax = theMin2 = theMax2 = values[index][0];

        for(k=1; k<len; k++) {
          v = values[index][k];
          if (v < theMin) {
            theMin2 = theMin;
            theMin = v;
          }
          if (v > theMax) {
            theMax2 = theMax;
            theMax = v;
          }
        }
      }   // end else:  coordinate mapping applied

      var theStep = ((theMax - theMax2) + (theMin2-theMin))/2;
      item.min = theMin;
      item.max = theMax;
      item.step = theStep;

      // 3. and include the mapping (and reverse mapping) 
      item.categorical = false; 
      if (pCoordMapping[index]) {
        item.map = pCoordMapping[index].map;
        item.mapLength = pCoordMapping[index].len;
        item.categorical = pCoordMapping[index].categorical; 

        // create the reverse-mapping from key to original value
        if (!item.categorical) {
          item.orgValue = [];
          var theMap =  pCoordMapping[index].map;
          for (var key in theMap){
              if(theMap.hasOwnProperty(key)){
                item.orgValue[ theMap[key] ] = 0.0+key;
              }
          }
        }
      }
    }

    // generate a object using the given set of keys and values
    //  (map from keys[i] to vals[i])
    var genKeyVal = function (keys, vals) {
       var record = {};
      for (var i = 0; i<keys.length; i++){
         record[keys[i]] = vals[i];
      }
      return record;
    };
    this.dimensionDescr = genKeyVal(this.dimensions, descrVals);
  },

  /**
   * @override
   */
  _createCore: function(){

    var myself = this;

    this.retrieveData();

    // used in the different closures
    var height = this.height,
        numDigits = this.chart.options.numDigits,
        topRuleOffs = this.chart.options.topRuleOffset,
        botRuleOffs = this.chart.options.botRuleOffset,
        leftRuleOffs = this.chart.options.leftRuleOffset,
        rightRulePos = this.width - this.chart.options.rightRuleOffset,
        topRulePos = this.height- topRuleOffs,
        ruleHeight = topRulePos - botRuleOffs,
        labelTopOffs = topRuleOffs - 12,
          // use dims to get the elements of dimDescr in the appropriate order!!
        dims = this.dimensions,
        dimDescr = this.dimensionDescr;

    /*****
     *   Generate the scales x, y and color
     *******/
    // getDimSc is the basis for getDimensionScale and getDimColorScale
    var getDimSc = function(t, addMargin) {
      var theMin = dimDescr[t].min;
      var theMax = dimDescr[t].max;
      var theStep = dimDescr[t].step;
      // add some margin at top and bottom (based on step)
      if (addMargin) {
        theMin -= theStep;
        theMax += theStep;
      }
      return pv.Scale.linear(theMin, theMax)
              .range(botRuleOffs, topRulePos);
    }; 
    var getDimensionScale = function(t) {
	var scale = getDimSc(t, true)
              .range(botRuleOffs, topRulePos);
      var dd = dimDescr[t];
      if (dd.orgValue && !dd.categorical) {
        // map the value to the original value
        var func = function(x) { 
            var res = scale( dd.orgValue[x]);
            return res; 
        };
        
        // wire domain() and invert() to the original scale
        func.domain = function() { return scale.domain(); };
        func.invert = function(d) { return scale.invert(d); };
        return func;
      }
      
      return scale;
    }; 
    var getDimColorScale = function(t) {
	var scale = getDimSc(t, false)
              .range("steelblue", "brown");
        return scale;
    }; 

    var x = pv.Scale.ordinal(dims).splitFlush(leftRuleOffs, rightRulePos);
    var y = pv.dict(dims, getDimensionScale);
    var colors = pv.dict(dims, getDimColorScale);



    /*****
     *   Generate tools for computing selections.
     *******/
    // Interaction state. 
    var filter = pv.dict(dims, function(t) {
      return {min: y[t].domain()[0], max: y[t].domain()[1]};  });
    var active = dims[0];   // choose the active dimension 

    var selectVisible = (this.chart.options.mapAllDimensions) ?
      function(d) { 
        return dims.every(  
        // all dimension are handled via a mapping.
            function(t) {
              var dd = dimDescr[t];
              var val = (dd.orgValue && !dd.categorical) ?
                    dd.orgValue[d[t]] : d[t];
              return (val >= filter[t].min) && (val <= filter[t].max); }
        ); }
    : function(d) { 
        return dims.every(function(t) {
                    // TO DO: check whether this operates correctly for
                    // categorical dimensions  (when mapAllDimensions == false
                    return (d[t] >= filter[t].min) && (d[t] <= filter[t].max); 
                });
    };
 

    /*****
     *   generateLinePattern produces a line pattern based on
     *          1. the current dataset.
     *          2. the current filter settings.
     *          3. the provided colorMethod.
     *  The result is an array where each element contains at least
     *            {x1, y1, x2, y2, color}
     *  Two auxiliary fields are 
     *  Furthermore auxiliary functions are provided
     *     - colorFuncFreq
     *     - colorFuncActive
     *******/
      var auxData = null;
      
    /*****
     *   Draw the chart and its annotations (except dynamic content)
     *******/
    // Draw the data to the parallel dimensions 
    // (the light grey dataset is a fixed background)
    this.pvParCoord = this.pvPanel.add(pv.Panel)
      .data(myself.data)
      .visible(selectVisible)
      .add(pv.Line)
      .data(dims)
      .left(function(t, d) { return x(t); } )
      .bottom(function(t, d) { 
          var res = y[t] (d[t]);
          return res; 
       })
      .strokeStyle("#ddd")
      .lineWidth(1)
      .antialias(false);

    // Rule per dimension.
    var rule = this.pvPanel.add(pv.Rule)
      .data(dims)
      .left(x)
      .top(topRuleOffs)
      .bottom(botRuleOffs);

    // Dimension label
    rule.anchor("top").add(pv.Label)
      .top(labelTopOffs)
      .font("bold 10px sans-serif")
      .text(function(d) { return dimDescr[d].name; });


    // add labels on the categorical dimension
    //  compute the array of labels
    var labels = [];
    var labelXoffs = 6,
    labelYoffs = 3;
    for(var d in dimDescr) {
     if(dimDescr.hasOwnProperty(d)){
          var dim = dimDescr[d];
          if (dim.categorical) {
            var  xVal = x(dim.id) + labelXoffs;
            for (var l in dim.map){
                 if(dim.map.hasOwnProperty(l)){
                      labels[labels.length] = {
                        x:  xVal,
                        y:  y[dim.id](dim.map[l]) + labelYoffs,
                        label: l
                      };
                 }
            }
          }
      }
    }
    var dimLabels = this.pvPanel.add(pv.Panel)
      .data(labels)
      .add(pv.Label)
      .left(function(d) {return d.x;})
      .bottom(function(d) { return d.y;})
      .text(function(d) { return d.label;})
      .textAlign("left");
    
      
    /*****
     *   Add an additional panel over the top for the dynamic content
     *    (and draw the (full) dataset)
     *******/
    // Draw the selected (changeable) data on a new panel on top
    var change = this.pvPanel.add(pv.Panel);
    var line = change.add(pv.Panel)
      .data(myself.data)
      .visible(selectVisible)
      .add(pv.Line)
      .data(dims)
      .left(function(t, d) { return x(t);})
      .bottom(function(t, d) { return y[t](d[t]); })
      .strokeStyle(function(t, d) { 
        var dd = dimDescr[active];
        var val =  (dd.orgValue && !dd.categorical) ?
          dd.orgValue[ d[active] ] :
          d[active];
        return colors[active](val);})
      .lineWidth(1);

 

    /*****
     *   Add the user-interaction (mouse-interface)
     *   and the (dynamic) labels of the selection.
     *******/

    // Updater for slider and resizer.
    function update(d) {
      var t = d.dim;
      filter[t].min = Math.max(y[t].domain()[0], y[t].invert(height - d.y - d.dy));
      filter[t].max = Math.min(y[t].domain()[1], y[t].invert(height - d.y));
      active = t;
      change.render();
      return false;
    }

    // Updater for slider and resizer.
    function selectAll(d) {
      if (d.dy < 3) {  // 
        var t = d.dim;
        filter[t].min = Math.max(y[t].domain()[0], y[t].invert(0));
        filter[t].max = Math.min(y[t].domain()[1], y[t].invert(height));
        d.y = botRuleOffs; d.dy = ruleHeight;
        active = t;
        change.render();
      }
      return false;
    }

    // Handle select and drag 
    var handle = change.add(pv.Panel)
      .data(dims.map(function(dim) { return {y:botRuleOffs, dy:ruleHeight, dim:dim}; }))
      .left(function(t) { return x(t.dim) - 30; })
      .width(60)
      .fillStyle("rgba(0,0,0,.001)")
      .cursor("crosshair")
      .event("mousedown", pv.Behavior.select())
      .event("select", update)
      .event("selectend", selectAll)
      .add(pv.Bar)
      .left(25)
      .top(function(d) {return d.y;})
      .width(10)
      .height(function(d) { return d.dy;})
      .fillStyle(function(t) { return  (t.dim == active) ? 
         colors[t.dim]((filter[t.dim].max + filter[t.dim].min) / 2) : 
         "hsla(0,0,50%,.5)";})
      .strokeStyle("white")
      .cursor("move")
      .event("mousedown", pv.Behavior.drag())
      .event("dragstart", update)
      .event("drag", update);

    handle.anchor("bottom").add(pv.Label)
      .textBaseline("top")
      .text(function(d) { return (dimDescr[d.dim].categorical) ?
                   "" :
                   filter[d.dim].min.toFixed(numDigits) + dimDescr[d.dim].unit;
                 });

    handle.anchor("top").add(pv.Label)
      .textBaseline("bottom")
      .text(function(d) {return (dimDescr[d.dim].categorical) ?
                  "" :
                  filter[d.dim].max.toFixed(numDigits) + dimDescr[d.dim].unit;});


    /*****
     *  add the extension points
     *******/

    // Extend ParallelCoordinates
    this.extend(this.pvParCoord,"parCoord_");
    // the parCoord panel is the base-panel (not the colored dynamic overlay)

    // Extend body
    this.extend(this.pvPanel,"chart_");
  }
});
/**
 * DataTree visualises a data-tree (also called driver tree).
 * It uses a data-sources to obtain the definition of data tree.
 * Each node of the tree can have it's own datasource to visualize the
 * node. 
 */
pvc.DataTree = pvc.BaseChart.extend({

    // the structure of the dataTree is provided by a separate datasource
    structEngine:   null,
    structMetadata: null,
    structDataset:  null,

    DataTreePanel : null,
    legendSource: 'category',

    constructor: function(options){
        // Force the value dimension not to be a number
        options = options || {};
        options.dimensionGroups = options.dimensionGroups || {};
        if(!options.dimensionGroups.value) {
            options.dimensionGroups.value = {valueType: null};
        }
        
        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.DataTree.defaultOptions, options);
    },

    setStructData: function(data){
        this.structDataset = data.resultset;
        if (!this.structDataset.length){
            pvc.log("Warning: Structure-dataset is empty");
        }

        this.structMetadata = data.metadata;
        if (!this.structMetadata.length){
            pvc.log("Warning: Structure-Metadata is empty");
        }
    },
  
    _preRenderCore: function(){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in data-tree");
        }
        
        // Create DataEngine
        var structEngine  = this.structEngine;
        var structType    = structEngine ? structEngine.type : new pvc.data.ComplexType();
        // Force the value dimension not to be a number
        structType.addDimension('value', {});
        
        var translOptions = {
            seriesInRows: true,
            crosstabMode: true
        };
        
        var translation = new pvc.data.CrosstabTranslationOper(structType, this.structDataset, this.structMetadata, translOptions);
        translation.configureType();
        if(!structEngine) {
            structEngine = this.structEngine = new pvc.data.Data({type: structType});
        }
        
        structEngine.load(translation.execute(structEngine));

        if(pvc.debug >= 3){
            pvc.log(this.structEngine.getInfo());
        }

        // ------------------
        
        this.dataTreePanel = new pvc.DataTreePanel(this, this.basePanel, {
            topRuleOffset : this.options.topRuleOffset,
            botRuleOffset : this.options.botRuleOffset,
            leftRuleOffset : this.options.leftRuleOffset,
            rightRuleOffset : this.options.rightRuleOffset,
            boxplotColor:  this.options.boxplotColor,
            valueFontsize: this.options.valueFontsize,
            headerFontsize: this.options.headerFontsize,
            border: this.options.border,
            perpConnector: this.options.perpConnector,
            numDigits: this.options.numDigits,
            minVerticalSpace: this.options.minVerticalSpace,
            connectorSpace: this.options.connectorSpace,
            minAspectRatio: this.options.minAspectRatio
        });
    }
}, {
    defaultOptions: {
        // margins around the full tree
        topRuleOffset: 30,
        botRuleOffset: 30,
        leftRuleOffset: 60,
        rightRuleOffset: 60,
        // box related parameters
        boxplotColor: "grey",
        headerFontsize: 16,
        valueFontsize: 20,
        border:  2,     // bordersize in pixels
        // use perpendicular connector lines  between boxes.
        perpConnector: false,
        // number of digits (after dot for labels)
        numDigits: 0,
        // the space for the connectors is 15% of the width of a grid cell
        connectorSpace: 0.15,
        // the vertical space between gridcells is at least 5%
        minVerticalSpace: 0.05,
        // aspect ratio = width/height  (used to limit AR of the boxes)
        minAspectRatio: 2.0,

        selectParam: undefined
    }
});


/*
 * DataTree chart panel. 
 *   << to be filled out >>
 *
 * Has the following protovis extension points:
 *
 * <i>chart_</i> - for the main chart Panel
 *    << to be filled out >>
 */
pvc.DataTreePanel = pvc.BasePanel.extend({
  anchor: 'fill',
  pvDataTree: null,

  treeElements: null, 

  structMap: null,
  structArr: null,

  hRules: null,
  vRules: null,
  rules: null,

  // generating Perpendicular connectors 
  // (only using horizontal and vertical rules)
  // leftLength gives the distance from the left box to the
  // splitting point of the connector
  generatePerpConnectors: function(leftLength) {

    this.hRules = [];
    this.vRules = [];
    this.rules  = [];  // also initialize this rule-set

    for(var e in this.structMap) {
      var elem = this.structMap[e];
      if (elem.children != null) {
        var min = +10000, max = -10000;
        var theLeft = elem.left + elem.width;
        this.hRules.push({"left": theLeft,
                    "width": leftLength,
                    "bottom": elem.bottom + elem.height/2});
        theLeft += leftLength;
        for(var i in elem.children) {
          var child = this.structMap[ elem.children[i] ];
          var theBottom = child.bottom + child.height/2;
          if (theBottom > max) { max = theBottom; }
          if (theBottom < min) { min = theBottom; }
          this.hRules.push({"left": theLeft,
                      "width": child.left - theLeft,
                      "bottom": theBottom});
        }

        // a vertical rule is only added when needed
        if (max > min) {
          this.vRules.push({"left": theLeft,
                      "bottom": min,
                      "height": max - min});
        }
      }
    }
  },

  // generate a line segment and add it to rules
  generateLineSegment: function(x1, y1, x2, y2) {
    var line = [];
    line.push({"x":  x1,
               "y":  y1});
    line.push({"x":  x2,
               "y":  y2});
    this.rules.push(line);
  },

  // leftLength gives the distance from the left box to the
  // splitting point of the connector
  generateConnectors: function(leftLength) {

    this.hRules = [];
    this.vRules = [];

    if (this.chart.options.perpConnector) {
      this.generatePerpConnectors(leftLength);
      return;
    }

    // this time were using diagonal rules
    this.rules = [];

    for(var e in this.structMap) {
      var elem = this.structMap[e];
      if (elem.children != null) {
        var theCenter, child, i;
        
        // compute the mid-point
        var min = +10000, max = -10000;
        for(i in elem.children) {
          child = this.structMap[ elem.children[i] ];
          theCenter = child.bottom + child.height/2;
          if (theCenter > max) { max = theCenter; }
          if (theCenter < min) { min = theCenter; }
        }
        var mid = (max + min)/2;

        var theLeft1 = elem.left + elem.width;
        var theLeft2 = theLeft1 + leftLength;

        // outbound line of the left-hand box
        this.generateLineSegment(theLeft1, elem.bottom + elem.height/2,
                                theLeft2, mid);

        // incoming lines of the right-hand boxes
        for(i in elem.children) {
          child = this.structMap[ elem.children[i] ];
          theCenter = child.bottom + child.height/2;

          this.generateLineSegment(theLeft2, mid,
                                   child.left, theCenter);
        }
      }
    }
  },

  retrieveStructure: function () {
    var data = this.chart.structEngine;
    var options = this.chart.options;

    var colLabels = data.getVisibleCategories();
    this.treeElements = data.getVisibleSeries();
    var values = data.getValues();

    // if a fifth column is added, then
    //  bottom and height are provided in the dataset.
    var bottomHeightSpecified = (colLabels.length > 4);
    
    var e;
    
    // trim al element labels (to allow for matching without spaces)
    for(e in this.treeElements) { 
      this.treeElements[e] = $.trim(this.treeElements[e]);
    }

    // get the bounds (minimal and maximum column and row indices)
    // first a bounds object with two helper-functions is introduced
    var bounds = [];
    bounds.getElement = function(label) {
      // create the element if it does not exist
      if (bounds[label] == null){
        bounds[label] = {"min": +10000, "max": -10000};
      }
      return bounds[label];
    };
    
    bounds.addValue = function(label, value) {
      var bnd = bounds.getElement(label);
      if (value < bnd.min){
        bnd.min = value;
      }
      if (value > bnd.max){
        bnd.max = value;
      }
      return bnd;
    };
    
    var col, colnr, elem, row;
    for(e in this.treeElements) {
      elem = this.treeElements[e];
      col = elem[0];
      colnr = col.charCodeAt(0);
      row = parseInt(elem.slice(1), 10);
      bounds.addValue("__cols", colnr);
      bounds.addValue(col,row);
    }

    // determine parameters to find column-bounds    
    var bnds = bounds.getElement("__cols");
    var gridWidth  = this.innerWidth/(bnds.max - bnds.min + 1); // integer
    var connectorWidth = options.connectorSpace * gridWidth;
    var cellWidth = gridWidth - connectorWidth;
    var maxCellHeight = cellWidth/options.minAspectRatio;
    var colBase = bnds.min;
    delete bounds.__cols;

    // compute additional values for each column
    for (e in bounds) {
      bnds = bounds[e];
      
      if (typeof bnds == "function"){
        continue;
      }
      var numRows = bnds.max - bnds.min + 1;

      bnds.gridHeight = this.innerHeight/numRows;
      bnds.cellHeight = bnds.gridHeight*(1.0 - options.minVerticalSpace);
      if (bnds.cellHeight > maxCellHeight){
        bnds.cellHeight = maxCellHeight;
      }
      bnds.relBottom = (bnds.gridHeight - bnds.cellHeight)/2;
      bnds.numRows = numRows;
    }

    // generate the elements
    var whitespaceQuote = new RegExp ('[\\s\"\']+',"g"); 
    this.structMap = {};
    for(e in this.treeElements) {
      var box = {};
      elem = this.treeElements[e];
      box.box_id = elem;
      this.structMap[elem] = box;

      col = elem[0];
      colnr = col.charCodeAt(0);
      row = parseInt(elem.slice(1), 10);
      bnds = bounds.getElement(col);

      box.colIndex = colnr - colBase;
      box.rowIndex = bnds.numRows - (row - bnds.min) - 1;

      box.left = this.leftOffs + box.colIndex * gridWidth;
      box.width = cellWidth;
      if (bottomHeightSpecified) {
          box.bottom = values[4][e];
          box.height = values[5][e];
      } else {
          box.bottom = this.botOffs + box.rowIndex * bnds.gridHeight + bnds.relBottom;
          box.height = bnds.cellHeight;
      }
      
      box.label = values[0][e];
      box.selector = values[1][e];
      box.aggregation = values[2][e];
      
      var children = (values[3][e] || '').replace(whitespaceQuote, " ");
      
      box.children = (children === " " || children ===  "") ?
         null : children.split(" ");
    }

    this.generateConnectors((gridWidth - cellWidth)/2);

    // translate the map to an array (needed by protovis)
    this.structArr = [];
    for(e in this.structMap) {
      elem = this.structMap[e];
      this.structArr.push(elem);
    }
  },

  findDataValue: function(key, data) {
    for(var i=0; i < data[0].length; i++) {
      if (data[0][ i ] == key) {
        return data[1][ i ];
      }
    }
    
    pvc.log("Error: value with key : "+key+" not found.");
  },

  generateBoxPlots: function() {
    var options = this.chart.options;

    for(var e in this.structArr) {
      var elem = this.structArr[e];
      if (!elem.values.length) {
        continue;
      }
      
      elem.subplot = {};
      var sp = elem.subplot;

      // order the data elements from 5% bound to 95% bound
      // and determine the horizontal scale
      var dat = [];
      var margin = 15;
      var rlMargin = elem.width/6;

      // generate empty rule sets (existing sets are overwritten !)
      sp.hRules = [];
      sp.vRules = [];
      sp.marks = [];
      sp.labels = [];

      dat.push(this.findDataValue("_p5", elem.values));
      dat.push(this.findDataValue("_p25", elem.values));
      dat.push(this.findDataValue("_p50", elem.values));
      dat.push(this.findDataValue("_p75", elem.values));
      dat.push(this.findDataValue("_p95", elem.values));

      var noBox = false;

	if (typeof(dat[2]) != "undefined") {
        // switch order (assume computational artifact)
        if (dat[4] < dat[0]) {
          dat = dat.reverse();
          pvc.log(" dataset "+ elem.box_id +
                  " repaired (_p95 was smaller than _p5)");
          }
        if (dat[4] > dat[0]) {
          sp.hScale = pv.Scale.linear( dat[0], dat[4]);
        } else {
          noBox = true;
          // generate a fake scale centered around dat[0] (== dat[4])
          sp.hScale = pv.Scale.linear( dat[0] - 1e-10, dat[0] + 1e-10);
        }
        sp.hScale.range(elem.left + rlMargin, elem.left + elem.width - rlMargin);
        var avLabel = "" + dat[2];   // prepare the label
        
        var i;
        
        for(i=0; i< dat.length; i++) {
            dat[i] = sp.hScale( dat[i]);
        }

        sp.bot = elem.bottom + elem.height / 3;
        sp.top = elem.bottom + 2 * elem.height / 3;
        sp.mid = (sp.top + sp.bot) / 2;   // 2/3 of height
        sp.textBottom = elem.bottom + margin;
        sp.textBottom = sp.bot - options.valueFontsize - 1;

        // and add the new set of rules for a box-plot.
        var lwa = 3;   // constant for "lineWidth Average"
        if (noBox) {
            sp.vRules.push({"left": dat[0],
                          "bottom": sp.bot,
                          "lWidth": lwa,
                          "height": sp.top - sp.bot});
        } else {
          sp.hRules.push({"left": dat[0],
                        "width":  dat[1] - dat[0],
                        "lWidth": 1,
                        "bottom": sp.mid});
          sp.hRules.push({"left": dat[1],
                        "width":  dat[3] - dat[1],
                        "lWidth": 1,
                        "bottom": sp.bot});
          sp.hRules.push({"left": dat[1],
                        "width":  dat[3] - dat[1],
                        "lWidth": 1,
                        "bottom": sp.top});
          sp.hRules.push({"left": dat[3],
                        "width":  dat[4] - dat[3],
                        "lWidth": 1,
                        "bottom": sp.mid});
          for(i=0; i<dat.length; i++) {
            sp.vRules.push({"left": dat[i],
                          "bottom": sp.bot,
                          "lWidth": (i == 2) ? lwa : 1,
                          "height": sp.top - sp.bot});
          }
        }

        sp.labels.push({left: dat[2],
                      bottom: sp.textBottom,
                      text: this.labelFixedDigits(avLabel),
                      size: options.smValueFont,
                      color: options.boxplotColor});
    }
    }
  } ,

  labelFixedDigits: function(value) {
    if (typeof value == "string") {
        value = parseFloat(value);
    }

    if (typeof value == "number") {
      var nd = this.chart.options.numDigits;

      value = value.toFixed(nd);
    }

    // translate to a string again
    return "" + value;
  } ,

  addDataPoint: function(key) {
    var options = this.chart.options;

    for(var e in this.structArr) {
      var elem = this.structArr[e];

      if (!elem.values.length) {
        continue;
      }
      
      var value = this.findDataValue(key, elem.values);
      if (typeof value == "undefined") {
        continue;
      }
      
      var sp = elem.subplot;
      var theLeft = sp.hScale(value); 

      var theColor = "green";
      sp.marks.push( {
        left: theLeft,
        bottom: sp.mid,
        color: theColor });
      
      sp.labels.push({left: theLeft,
                      bottom: sp.textBottom,
                      text: this.labelFixedDigits(value),
                      size: options.valueFont,
                      color: theColor});
    }
  }, 

  retrieveData: function () {
    var data = this.chart.data;
    var options = this.chart.options;

    var colLabels = data.getVisibleCategories();
    var selectors = data.getVisibleSeries();
    var values = data.getValues();
    var selMap = {};
    var i;
    
    // create empty datasets and selMap
    var numCols = values.length;
    for(var e in this.structArr) {
      var elem = this.structArr[e];
      elem.values = [];
      for(i=0; i<numCols; i++) {
          elem.values.push([]);
      }
      selMap[ elem.selector ] = elem; 
    }

    // distribute the dataset over the elements based on the selector
    var boxNotFound = {};
    for(i in selectors) {
      var box = selMap[ selectors[ i ] ];
      if (typeof(box) != "undefined") {
        for(var j in values) {
            box.values[j].push(values[ j ][ i ]);
        }
      } else {
        boxNotFound[ selectors[i] ] = true;
      }
    }

    for (var sel in boxNotFound) {
        pvc.log("Could'nt find box for selector: "+ sel);
    }
    
    this.generateBoxPlots();

    var whitespaceQuote = new RegExp ('[\\s\"\']+',"g");
    if(options.selectParam){
        var selPar = options.selectParam.replace(whitespaceQuote, '');
        if ((selPar != "undefined") && 
            (selPar.length > 0) && 
            (typeof window[selPar] != "undefined")) {
            selPar = window[selPar];
            this.addDataPoint(selPar);
        }
    }
  } ,

  /**
   * @override
   */
  _createCore: function() {
      
    var myself  = this;

    var options = this.chart.options;
    options.smValueFontsize = Math.round(0.6 * options.valueFontsize);
    options.smValueFont = "" + options.smValueFontsize + "px sans-serif";
    options.valueFont = "" + options.valueFontsize + "px sans-serif";

    // used in the different closures
    var topRuleOffs = options.topRuleOffset,
        botRuleOffs = options.botRuleOffset,
        leftRuleOffs = options.leftRuleOffset;

    // set a few parameters which will be used during data-retrieval
    this.innerWidth = this.width - leftRuleOffs - options.rightRuleOffset;
    this.innerHeight = this.height - topRuleOffs - botRuleOffs;
    this.botOffs = botRuleOffs;
    this.leftOffs = leftRuleOffs;

    // retrieve the data and transform it to the internal representation.
    this.retrieveStructure();

    this.retrieveData();

    /*****
     *   Generate the scales x, y and color
     *******/

/*
pv.Mark.prototype.property("testAdd");
    pv.Mark.prototype.testAdd = function(x) { 
return pv.Label(x);
                      }
*/
    var topMargin = options.headerFontsize + 3;

    // draw the connectors first (rest has to drawn over the top)
    var rules = this.rules;
    var i;
    
    for (i = 0; i < rules.length; i++) {
      /*jshint loopfunc:true */
      this.pvPanel.add(pv.Line)
        .data(rules[ i ])
        .left(function(d) { return d.x;})
        .bottom(function(d) { return d.y;})
        .lineWidth(1)
        .strokeStyle("black");
    }
    
    // draw the data containers with decorations
    this.pvDataTree = this.pvPanel.add(pv.Bar)
      .data(myself.structArr)
      .left(function(d) { return d.left;})
      .bottom(function(d) { return d.bottom;})
      .height(function(d) { return d.height;})
      .width(function(d) { return d.width;})
      .fillStyle("green")
//;  this.pvDataTree
    .add(pv.Bar)
//      .data(function(d) {return d; })
      .left(function(d) { return d.left + options.border;})
      .bottom(function(d) { return d.bottom + options.border;})
      .height(function(d) { return d.height - options.border - topMargin;})
      .width(function(d) { return d.width - 2 * options.border;})
      .fillStyle("white")
    .add(pv.Label)
      .text(function(d) { return d.label;})
      .textAlign("center")
      .left(function (d) {return  d.left + d.width/2;})
      .bottom(function(d) {
          return d.bottom + d.height - options.headerFontsize - 5 + options.headerFontsize/5;
})
      .font("" + options.headerFontsize + "px sans-serif")
      .textStyle("white")
      .fillStyle("blue");

    // add the box-plots
    for(i=0; i<this.structArr.length; i++) {
      var box = this.structArr[i];
      this.pvPanel.add(pv.Rule)
        .data(box.subplot.hRules)
        .left(function(d) { return d.left;})
        .width( function(d) { return d.width;})
        .bottom( function(d) { return d.bottom;})
        .lineWidth( function(d) { return d.lWidth; })
        .strokeStyle(myself.chart.options.boxplotColor);

      this.pvPanel.add(pv.Rule)
        .data(box.subplot.vRules)
        .left(function(d) { return d.left;})
        .height( function(d) { return d.height;})
        .bottom( function(d) { return d.bottom;})
        .lineWidth( function(d) { return d.lWidth; })
        .strokeStyle(myself.chart.options.boxplotColor);

      this.pvPanel.add(pv.Dot)
        .data(box.subplot.marks)
        .left(function(d) { return d.left; })
        .bottom(function(d){ return d.bottom;})
        .fillStyle(function(d) {return d.color;});


      this.pvPanel.add(pv.Label)
        .data(box.subplot.labels)
        .left(function(d) { return d.left; })
        .bottom(function(d){ return d.bottom;})
        .font(function(d) { return d.size;})
        .text(function(d) { return d.text;})
        .textAlign("center")
        .textStyle(function(d) {return d.color;});

    }

    // add the connecting rules (perpendicular rules)
    if (options.perpConnector) {
      this.pvPanel.add(pv.Rule)
        .data(myself.vRules)
        .left(function(d) { return d.left;})
        .bottom(function(d) { return d.bottom;})
        .height(function(d) { return d.height;})
        .strokeStyle("black");
      this.pvPanel.add(pv.Rule)
        .data(myself.hRules)
        .left(function(d) { return d.left;})
        .bottom(function(d) { return d.bottom;})
        .width(function(d) { return d.width;})
        .strokeStyle("black");
    }

    /*****
     *   draw the data-tree
     *******/

    /*****
     *  add the extension points
     *******/

    // Extend the dataTree
    this.extend(this.pvDataTree,"dataTree_");

    // Extend body
    this.extend(this.pvPanel,"chart_");
  }
});
/**
 * @name pvc.data.BoxplotChartTranslationOper
 * 
 * @class The translation operation of the box plot chart.
 * 
 * <p>
 * The default box plot format is:
 * </p>
 * <pre>
 * +----------+----------+-------------+-------------+------------+-------------+
 * | 0        | 1        | 2           | 3           | 4          | 5           |
 * +----------+----------+-------------+-------------+------------+-------------+
 * | category | median   | percentil25 | percentil75 | percentil5 | percentil95 |
 * +----------+----------+-------------+-------------+------------+-------------+
 * | any      | number   | number      | number      | number     | number      |
 * +----------+----------+-------------+-------------+------------+-------------+
 * </pre>
 * 
 * @extends pvc.data.MatrixTranslationOper
 *  
 * @constructor
 * @param {pvc.BoxplotChart} chart The associated box plot chart.
 * @param {pvc.data.ComplexType} complexType The complex type that will represent the translated data.
 * @param {object} source The matrix-format array to be translated.
 * The source is not modified.
 * @param {object} [metadata] A metadata object describing the source.
 * 
 * @param {object} [options] An object with translation options.
 * See additional available options in {@link pvc.data.MatrixTranslationOper}.
 */
def.type('pvc.data.BoxplotChartTranslationOper', pvc.data.MatrixTranslationOper)
.init(function(chart, complexType, source, metadata, options){
    this._chart = chart;

    this.base(complexType, source, metadata, options);
})
.add(/** @lends pvc.data.BoxplotChartTranslationOper# */{
    
    /**
     * @override
     */
    configureType: function(){
        var autoDimsReaders = [];

        function addRole(name, count){
            var visualRole = this._chart.visualRoles(name);
            if(!visualRole.isPreBound()){
                if(count == null) {
                    count = 1;
                }

                var dimGroupName = visualRole.defaultDimensionName.match(/^(.*?)(\*)?$/)[1],
                    level = 0;

                while(level < count){
                    var dimName = pvc.data.DimensionType.dimensionGroupLevelName(dimGroupName, level++);
                    if(!this.complexType.dimensions(dimName, {assertExists: false})){
                        autoDimsReaders.push(dimName);
                    }
                }
            }
        }
        
        var catCount = def.get(this.options, 'categoriesCount', 1);
        if(!(catCount >= 1)){
            catCount = 1;
        }

        addRole.call(this, 'category', catCount);
        pvc.BoxplotChart.measureRolesNames.forEach(function(dimName){
            addRole.call(this, dimName);
        }, this);

        autoDimsReaders.slice(0, this.freeVirtualItemSize());
        if(autoDimsReaders.length){
            this.defReader({names: autoDimsReaders});
        }
    },

    defDimensionType: function(dimName, dimSpec){
        var dimGroup = pvc.data.DimensionType.dimensionGroupName(dimName);
        switch(dimGroup){
            case 'median':
                dimSpec = def.setUDefaults(dimSpec, 'valueType', Number);
                break;
                
            case 'percentil':
                dimSpec = def.setUDefaults(dimSpec, 
                                'valueType', Number,
                                'label',    "{0}% Percentil"); // replaced by dim group level + 1);
                break;
        }
        
        return this.base(dimName, dimSpec);
    }
});
/**
 * BoxplotChart is the main class for generating... categorical boxplotcharts.
 * 
 * The boxplot is used to represent the distribution of data using:
 *  - a box to represent the region that contains 50% of the datapoints,
 *  - the whiskers to represent the regions that contains 95% of the datapoints, and
 *  - a center line (in the box) that represents the median of the dataset.
 * For more information on boxplots you can visit  http://en.wikipedia.org/wiki/Box_plot
 *
 * If you have an issue or suggestions regarding the ccc BoxPlot-charts
 * please contact CvK at cde@vinzi.nl
 */
pvc.BoxplotChart = pvc.CategoricalAbstract.extend({
    constructor: function(options){

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.BoxplotChart.defaultOptions, options);

        this._axisRoleNameMap.ortho = pvc.BoxplotChart.measureRolesNames;
    },

     _processOptionsCore: function(options){
         this.base.apply(this, arguments);

         options.secondAxis = options.showLines || options.showDots || options.showAreas;
         // Not supported
         options.secondAxisIndependentScale = false;
         options.stacked = false;
         options.legend  = false;
     },

    /**
     * Prevents creation of the series role by the cartesian charts base class.
     */
    _getSeriesRoleSpec: function(){
        return null;
    },

    _hasDataPartRole: function(){
        return true;
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){

        this.base();

        var roleSpecBase = {
                isMeasure: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number
            };

        var rolesSpec = def.query([
                {name: 'median',      label: 'Median',        defaultDimensionName: 'median', isRequired: true},
                {name: 'percentil25', label: '25% Percentil', defaultDimensionName: 'percentil25'},
                {name: 'percentil75', label: '75% Percentil', defaultDimensionName: 'percentil75'},
                {name: 'percentil5',  label: '5% Percentil',  defaultDimensionName: 'percentil5' },
                {name: 'percentil95', label: '95% Percentil', defaultDimensionName: 'percentil95'}
            ])
            .object({
                name:  function(info){ return info.name; },
                value: function(info){ return def.create(roleSpecBase, info); }
            });
        
        this._addVisualRoles(rolesSpec);
    },
    
    _createTranslation: function(complexType, translOptions){
        return new pvc.data.BoxplotChartTranslationOper(
                        this,
                        complexType,
                        this.resultset,
                        this.metadata,
                        translOptions);
    },

    _getAxisDataParts: function(/*axis*/){
        return null;
    },

    _isDataCellStacked: function(/*role, dataPartValue*/){
        return false;
    },

    /* @override */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in boxplotChart");
        }
        
        var options = this.options;
        
        var boxPanel = new pvc.BoxplotChartPanel(this, parentPanel, {
            orientation:   options.orientation,
            // boxplot specific options
            boxSizeRatio:  options.boxSizeRatio,
            maxBoxSize:    options.maxBoxSize,
            boxplotColor:  options.boxplotColor
        });

        if(options.secondAxis){
            if(pvc.debug >= 3){
                pvc.log("Creating LineDotArea panel.");
            }

            var linePanel = new pvc.LineDotAreaPanel(this, parentPanel, {
                orientation:    options.orientation,
                stacked:        false,
                showValues:     !(options.compatVersion <= 1) && options.showValues,
                valuesAnchor:   options.valuesAnchor,
                showLines:      options.showLines,
                showDots:       options.showDots,
                showAreas:      options.showAreas,
                nullInterpolationMode: options.nullInterpolationMode
            });

            this._linePanel = linePanel;
        }

        return boxPanel;
    }
}, {
    measureRolesNames: ['median', 'percentil25', 'percentil75', 'percentil5', 'percentil95'],
    defaultOptions: {
        boxplotColor: 'darkgreen',
        boxSizeRatio: 1/3,
        maxBoxSize:   Infinity,
        showDots:     false,
        showLines:    false,
        showAreas:    false,
        nullInterpolationMode: 'none',
        showValues:   false,
        valuesAnchor: 'right'
    }
});

/*
 * Boxplot chart panel generates the actual box-plot with a categorical base-axis.
 * for more information on the options see the documentation file.
 */
pvc.BoxplotChartPanel = pvc.CartesianAbstractPanel.extend({
    anchor: 'fill',
    
    /**
     * @override
     */
    _createCore: function(){

        this.base();
        
        var rootScene = this._buildScene();

        var a_bottom = this.isOrientationVertical() ? "bottom" : "left",
            a_left   = this.anchorOrtho(a_bottom),
            a_width  = this.anchorLength(a_bottom),
            a_height = this.anchorOrthoLength(a_bottom),
            strokeColor  = pv.color(this.boxplotColor),
            boxFillColor = pv.color('limegreen')
            ;

        /* Category Panel */
        this.pvBoxPanel = this.pvPanel.add(pv.Panel)
            .data(rootScene.childNodes)
            [a_left ](function(scene){
                var catAct = scene.acts.category;
                return catAct.x - catAct.width / 2;
            })
            [a_width](function(scene){ return scene.acts.category.width; })
            ;

        /* V Rules */
        function setupVRule(rule){
            rule.lock(a_left, function(){ 
                    return this.pvMark.parent[a_width]() / 2;
                })
                .override('defaultColor', function(type){
                    if(type === 'stroke') { 
                        return strokeColor;
                    }
                })
                ;

            return rule;
        }

        this.pvVRuleTop = setupVRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxVRule',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(scene){
                return scene.acts.category.showVRuleAbove && this.delegate(true);
            })
            .lock(a_bottom, function(scene){ return scene.acts.category.vRuleAboveBottom; })
            .lock(a_height, function(scene){ return scene.acts.category.vRuleAboveHeight; })
            .pvMark
            ;

        this.pvVRuleBot = setupVRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxVRule',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(scene){
                return scene.acts.category.showVRuleBelow && this.delegate(true);
            })
            .lock(a_bottom, function(scene){ return scene.acts.category.vRuleBelowBottom; })
            .lock(a_height, function(scene){ return scene.acts.category.vRuleBelowHeight; })
            .pvMark
            ;

        /* Box Bar */
        function setupHCateg(sign){
            sign.lock(a_left,  function(scene){ return scene.acts.category.boxLeft;  })
                .lock(a_width, function(scene){ return scene.acts.category.boxWidth; })
                ;
            
            return sign;
        }

        this.pvBar = setupHCateg(new pvc.visual.Bar(this, this.pvBoxPanel, {
                extensionId: 'boxBar',
                freePosition: true,
                normalStroke: true
            }))
            .intercept('visible', function(scene){
                return scene.acts.category.showBox && this.delegate(true);
            })
            .lock(a_bottom, function(scene){ return scene.acts.category.boxBottom; })
            .lock(a_height, function(scene){ return scene.acts.category.boxHeight; })
            .override('defaultColor', function(type){
                switch(type){
                    case 'fill':   return boxFillColor;
                    case 'stroke': return strokeColor;
                }
            })
            .override('defaultStrokeWidth', def.fun.constant(1))
            .pvMark
            ;

        /* H Rules */
        function setupHRule(rule){
            setupHCateg(rule);
            
            rule.override('defaultColor', function(type){
                    if(type === 'stroke') { return strokeColor; }
                })
                ;
            return rule;
        }
        
        this.pvHRule5 = setupHRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxHRule5',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(){
                return this.scene.acts.percentil5.value != null && this.delegate(true);
            })
            .lock(a_bottom,  function(){ return this.scene.acts.percentil5.position; }) // bottom
            .pvMark
            ;

        this.pvHRule95 = setupHRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxHRule95',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(){
                return this.scene.acts.percentil95.value != null && this.delegate(true);
            })
            .lock(a_bottom,  function(){ return this.scene.acts.percentil95.position; }) // bottom
            .pvMark
            ;

        this.pvHRule50 = setupHRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxHRule50',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(){
                return this.scene.acts.median.value != null && this.delegate(true);
            })
            .lock(a_bottom,  function(){ return this.scene.acts.median.position; }) // bottom
            .override('defaultStrokeWidth', def.fun.constant(2))
            .pvMark
            ;
    },

    /**
     * @override
     */
    applyExtensions: function(){

        this.base();

        // Extend bar and barPanel
        this.extend(this.pvBoxPanel, "boxPanel_");
        this.extend(this.pvBoxPanel, "box_");
        this.extend(this.pvBar,      "boxBar_");
        this.extend(this.hRule50,    "boxHRule50_");
        this.extend(this.hRule5,     "boxHRule5_");
        this.extend(this.hRule95,    "boxHRule95_");
        this.extend(this.pvVRuleTop, "boxVRule_");
        this.extend(this.pvVRuleBot, "boxVRule_");
    },

    /**
     * Renders this.pvScatterPanel - the parent of the marks that are affected by interaction changes.
     * @override
     */
    _renderInteractive: function(){
        this.pvBoxPanel.render();
    },

    /**
     * Returns an array of marks whose instances are associated to a datum or group, or null.
     * @override
     */
    _getSignums: function(){
        return [this.pvBar];
    },

    _buildScene: function(){
        var chart = this.chart,
            measureRolesDimNames = def.query(chart.measureVisualRoles()).object({
                name:  function(role){ return role.name; },
                value: function(role){ return role.firstDimensionName(); }
            }),
            visibleKeyArgs = {visible: true, zeroIfNone: false},
            data = this._getVisibleData(),
            rootScene  = new pvc.visual.Scene(null, {panel: this, group: data}),
            baseScale  = chart.axes.base.scale,
            bandWidth  = baseScale.range().band,
            boxWidth   = Math.min(bandWidth * this.boxSizeRatio, this.maxBoxSize),
            orthoScale = chart.axes.ortho.scale
            ;

        /**
         * Create starting scene tree
         */
        data.children() // categories
            .each(createCategScene, this);

        return rootScene;
        
        function createCategScene(categData){
            var categScene = new pvc.visual.Scene(rootScene, {group: categData}),
                acts = categScene.acts;
            
            var catAct = acts.category = {
                value:     categData.value,
                label:     categData.label,
                group:     categData,
                x:         baseScale(categData.value),
                width:     bandWidth,
                boxWidth:  boxWidth
            };

            catAct.boxLeft = bandWidth / 2 - boxWidth / 2;
            
            chart.measureVisualRoles().forEach(function(role){
                var dimName = measureRolesDimNames[role.name],
                    act;

                if(dimName){
                    var dim = categData.dimensions(dimName),
                        value = dim.sum(visibleKeyArgs);
                    act = {
                        value: value,
                        label: dim.format(value),
                        position: orthoScale(value)
                    };
                } else {
                    act = {
                        value: null,
                        label: "",
                        position: null
                    };
                }

                acts[role.name] = act;
            });

            var has05 = acts.percentil5.value  != null,
                has25 = acts.percentil25.value != null,
                has50 = acts.median.value != null,
                has75 = acts.percentil75.value != null,
                bottom,
                top;

            var show = has25 || has75;
            if(show){
                bottom = has25 ? acts.percentil25.position :
                         has50 ? acts.median.position :
                         acts.percentil75.position
                         ;

                top    = has75 ? acts.percentil75.position :
                         has50 ? acts.median.position :
                         acts.percentil25.position
                         ;

                show = (top !== bottom);
                if(show){
                    catAct.boxBottom = bottom;
                    catAct.boxHeight = top - bottom;
                }
            }
            
            catAct.showBox  = show;
            
            // vRules
            show = acts.percentil95.value != null;
            if(show){
                bottom = has75 ? acts.percentil75.position :
                         has50 ? acts.median.position :
                         has25 ? acts.percentil25.position :
                         has05 ? acts.percentil5.position  :
                         null
                         ;
                
                show = bottom != null;
                if(show){
                    catAct.vRuleAboveBottom = bottom;
                    catAct.vRuleAboveHeight = acts.percentil95.position - bottom;
                }
            }

            catAct.showVRuleAbove = show;

            // ----

            show = has05;
            if(show){
                top = has25 ? acts.percentil25.position :
                      has50 ? acts.median.position :
                      has75 ? acts.percentil75.position :
                      null
                      ;

                show = top != null;
                if(show){
                    bottom = acts.percentil5.position;
                    catAct.vRuleBelowHeight = top - bottom;
                    catAct.vRuleBelowBottom = bottom;
                }
            }
            
            catAct.showVRuleBelow = show;
            
            // has05 = acts.percentil5.value  != null,
        }
    }
}    
    return pvc;
});
