function(
        DeveloperError,
        combine,
        destroyObject,
        Cartesian3,
        Cartesian4,
        Matrix4,
        ComponentDatatype,
        IndexDatatype,
        PrimitiveType,
        PolylinePipeline,
        Color,
        BufferUsage,
        BlendingState,
        StencilFunction,
        StencilOperation,
        SceneMode,
        PolylineVS,
        PolylineFS,
        shallowEquals) {
    "use strict";

    /**
     * DOC_TBA
     *
     * @alias Polyline
     * @internalConstructor
     *
     * @example
     */
    var Polyline = function(polylineTemplate, polylineCollection) {
        var p = polylineTemplate || {};

        this._positions = [];
        if(typeof p.positions !== 'undefined'){
            var newPositions = p.positions;
            var length = newPositions.length;
            var positions = this._positions;
            for(var i = 0; i < length; ++i){
                var position = newPositions[i];
                positions.push(new Cartesian3(position.x, position.y, position.z));
    }
        }
        this._show = (typeof p.show === 'undefined') ? true : p.show;
        this._width = (typeof p.width === 'undefined') ? 1.0 : p.width;
        this._outlineWidth = (typeof p.outlineWidth === 'undefined') ? 1.0 : p.outlineWidth;
        var color = p.color || {
            red : 1.0,
            green : 1.0,
            blue : 1.0,
            alpha : 1.0
    };
        this._color = new Color(color.red, color.green, color.blue, color.alpha);

        var outlineColor = p.outlineColor ||{
            red : 1.0,
            green : 1.0,
            blue : 1.0,
            alpha : 1.0
    };
        this._outlineColor = new Color(outlineColor.red, outlineColor.green, outlineColor.blue, outlineColor.alpha);

        this._propertiesChanged = new Uint32Array(NUMBER_OF_PROPERTIES);
        this._collection = polylineCollection;
        this._dirty = false;
        this._pickId = undefined;
        this._pickIdThis = p._pickIdThis;
        }

    var SHOW_INDEX = Polyline.SHOW_INDEX = 0;
    var POSITION_INDEX = Polyline.POSITION_INDEX = 1;
    var COLOR_INDEX = Polyline.COLOR_INDEX = 2;
    var OUTLINE_COLOR_INDEX = Polyline.OUTLINE_COLOR_INDEX = 3;
    var POSITION_SIZE_INDEX = Polyline.POSITION_SIZE_INDEX = 4;
    Polyline.NUMBER_OF_PROPERTIES = 5;
    var NUMBER_OF_PROPERTIES = Polyline.NUMBER_OF_PROPERTIES;

    /**
     * Returns true if this polyline will be shown.  Call {@link Polyline#setShow}
     * to hide or show a polyline, instead of removing it and re-adding it to the collection.
     *
     * @memberof Polyline
     *
     * @return {Boolean} <code>true</code> if this polyline will be shown; otherwise, <code>false</code>.
     *
     * @see Polyline#setShow
     */
    Polyline.prototype.getShow = function() {
        return this._show;
    };

    /**
     * Determines if this polyline will be shown.  Call this to hide or show a polyline, instead
     * of removing it and re-adding it to the collection.
     *
     * @memberof Polyline
     *
     * @param {Boolean} value Indicates if this polyline will be shown.
     *
     * @see Polyline#getShow
     */
    Polyline.prototype.setShow = function(value) {
        if ((typeof value !== 'undefined') && (this._show !== value)) {
            this._show = value;
            this._makeDirty(SHOW_INDEX);
            }
    };

    /**
     * DOC_TBA
     *
     * @memberof Polyline
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     * @see Polyline#setPositions
     */
    Polyline.prototype.getPositions = function() {
        return this._positions;
    };

        /**
     * DOC_TBA
     *
     * @memberof Polyline
     *
     * @exception {DeveloperError} value must not be undefined.
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
         *
     * @see Polyline#getPositions
     *
     * @example
     * polyline.setPositions(
     *   ellipsoid.toCartesians(new Cartographic3(...),
     *                          new Cartographic3(...),
     *                          new Cartographic3(...))
     * );
         */
    Polyline.prototype.setPositions = function(value) {
        if (typeof value === 'undefined') {
            throw new DeveloperError('value must not be undefined.', 'value');
            }
        if(this._positions.length !== value.length){
            this._makeDirty(POSITION_SIZE_INDEX);
            }
        this._positions = value;
        this._makeDirty(POSITION_INDEX);
        };


    Polyline.prototype.getColor = function() {
        return this._color;
        };

    Polyline.prototype.setColor = function(value){
        var c = this._color;

        if ((typeof value !== 'undefined') &&
            ((c.red !== value.red) || (c.green !== value.green) || (c.blue !== value.blue) || (c.alpha !== value.alpha))) {
            this._color = new Color(value.red, value.green, value.blue, value.alpha);
            this._makeDirty(COLOR_INDEX);
            }
    };

        /**
         * DOC_TBA
         * <br /><br />
         * The actual width used is clamped to the minimum and maximum width supported by the WebGL implementation.
         * These can be queried with {@link Context#getMinimumAliasedLineWidth} and
         * {@link Context#getMaximumAliasedLineWidth}.
         *
         * @type Number
         *
     * @see Polyline#width
         * @see Context#getMinimumAliasedLineWidth
         * @see Context#getMaximumAliasedLineWidth
         *
         * @example
         * // 3 pixel total width, 1 pixel interior width
         * polyline.width = 1.0;
         * polyline.outlineWidth = 3.0;
         */
    Polyline.prototype.getWidth = function() {
        return this._width;
    };

        /**
         * DOC_TBA
         * <br /><br />
         * The actual width used is clamped to the minimum and maximum width supported by the WebGL implementation.
         * These can be queried with {@link Context#getMinimumAliasedLineWidth} and
         * {@link Context#getMaximumAliasedLineWidth}.
         *
         * @type Number
         *
         * @see Polyline#width
         * @see Context#getMinimumAliasedLineWidth
         * @see Context#getMaximumAliasedLineWidth
         *
         * @example
         * // 3 pixel total width, 1 pixel interior width
         * polyline.width = 1.0;
         * polyline.outlineWidth = 3.0;
         */
    Polyline.prototype.setWidth = function(value){
        var width = this._width;

        if ((typeof value !== 'undefined') && (value !== width)) {
            this._collection._removeFromMap(this);
            this._width = value;
            this._collection._addToMap(this);
        }
        };

        /**
         * DOC_TBA
     * <br /><br />
     * The actual width used is clamped to the minimum and maximum width supported by the WebGL implementation.
     * These can be queried with {@link Context#getMinimumAliasedLineWidth} and
     * {@link Context#getMaximumAliasedLineWidth}.
     *
     * @type Number
     *
     * @see Polyline#outlineWidth
     * @see Context#getMinimumAliasedLineWidth
     * @see Context#getMaximumAliasedLineWidth
         *
     * @example
     * // 3 pixel total width, 1 pixel interior width
     * polyline.width = 1.0;
     * polyline.outlineWidth = 3.0;
         */
    Polyline.prototype.getOutlineWidth = function() {
        return this._outlineWidth;
        };

        /**
     * DOC_TBA
     * <br /><br />
     * The actual width used is clamped to the minimum and maximum width supported by the WebGL implementation.
     * These can be queried with {@link Context#getMinimumAliasedLineWidth} and
     * {@link Context#getMaximumAliasedLineWidth}.
         *
     * @type Number
         *
     * @see Polyline#outlineWidth
     * @see Context#getMinimumAliasedLineWidth
     * @see Context#getMaximumAliasedLineWidth
         *
         * @example
     * // 3 pixel total width, 1 pixel interior width
     * polyline.width = 1.0;
     * polyline.outlineWidth = 3.0;
                 */
    Polyline.prototype.setOutlineWidth = function(value){
        var width = this._outlineWidth;

        if ((typeof value !== 'undefined') && (value !== width)) {
            this._collection._removeFromMap(this);
            this._outlineWidth = value;
            this._collection._addToMap(this);
            }
        };

    Polyline.prototype.getOutlineColor = function() {
        return this._outlineColor;
        };

    Polyline.prototype.setOutlineColor = function(value){
        var c = this._outlineColor;

        if ((typeof value !== 'undefined') &&
            ((c.red !== value.red) || (c.green !== value.green) || (c.blue !== value.blue) || (c.alpha !== value.alpha))) {
            this._outlineColor = new Color(value.red, value.green, value.blue, value.alpha);
            this._makeDirty(OUTLINE_COLOR_INDEX);
        }
    };

    Polyline.prototype.getPickId = function(context){
        this._pickId = this._pickId || context.createPickId(this._pickIdThis || this);
        return this._pickId;
    };

    Polyline.prototype.equals = function(other) {
        return other &&
               (this._show === other._show) &&
               (shallowEquals(this._positions, other._positions)) &&
               (this._width === other._width) &&
               (this._outlineWidth === other._outlineWidth) &&
               (shallowEquals(this._color, other._color)) &&
               (shallowEquals(this._outlineColor, other._outlineColor));
    };

    Polyline.prototype._clean = function() {
        this._dirty = false;
        var properties = this._propertiesChanged;
        for ( var k = 0; k < NUMBER_OF_PROPERTIES - 1; ++k) {
            properties[k] = 0;
        }
    };

    Polyline.prototype._getCollection = function(){
        return this._collection;
    };

    Polyline.prototype._getChangedProperties = function(){
      return this._propertiesChanged;
    };

    Polyline.prototype._makeDirty = function(propertyChanged) {
        ++this._propertiesChanged[propertyChanged];
        if (!this._dirty) {
            var c = this._collection;
            if (c) {
                c._updatePolyline(propertyChanged, this);
                this._dirty = true;
        }
        }
    };

    Polyline.prototype._destroy = function() {
        this._pickId = this._pickId && this._pickId.destroy();
        this._collection = undefined;
    };

    return Polyline;
}