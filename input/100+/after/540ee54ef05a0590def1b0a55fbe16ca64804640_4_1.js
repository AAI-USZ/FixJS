function(spec, list, cache) {

  goog.asserts.assert(spec);

  goog.asserts.assert(list);

  goog.asserts.assert(cache);



  goog.ui.Component.call(this);



  /**

   * @private

   * @type {!pn.ui.UiSpec}

   */

  this.spec_ = spec;

  this.registerDisposable(this.spec_);



  /**

   * @private

   * @type {pn.ui.grid.Config}

   */

  this.cfg_ = this.spec_.getGridConfig(cache);

  this.registerDisposable(this.cfg_);



  /**

   * @private

   * @type {pn.ui.grid.Interceptor}

   */

  this.interceptor_ = this.cfg_.interceptor ?

      new this.cfg_.interceptor(cache) : null;

  this.registerDisposable(this.interceptor_);



  /**

   * @private

   * @const

   * @type {string}

   */

  this.hash_ = goog.array.reduce(this.cfg_.cCtxs,

      function(acc, f) { return acc + f.id; }, '');



  /**

   * @private

   * @type {goog.debug.Logger}

   */

  this.log_ = pn.log.getLogger('pn.ui.grid.Grid');



  /**

   * @private

   * @type {!Array}

   */

  this.list_ = this.interceptor_ ? this.interceptor_.filterList(list) : list;





  /**

   * @private

   * @type {!Array.<!pn.ui.grid.ColumnCtx>}

   */

  this.cctxs_ = this.getColumnsWithInitialState_(this.cfg_.cCtxs);



  /**

   * @private

   * @type {!Array.<!pn.ui.grid.ColumnCtx>}

   */

  this.totalColumns_ = goog.array.filter(this.cctxs_, 

      function(cctx) { return !!cctx.spec.total; });



  /**

   * @private

   * @type {!Object.<Array>}

   */

  this.cache_ = cache;



  /**

   * @private

   * @type {!Array.<pn.ui.grid.Command>}

   */

  this.commands_ = this.cfg_.commands;



  /**

   * @private

   * @type {Slick.Grid}

   */

  this.slick_ = null;



  /**

   * @private

   * @type {Element}

   */

  this.noData_ = null;



  /**

   * @private

   * @type {pn.ui.grid.DataView}

   */

  this.dataView_ = null;



  /**

   * @private

   * @type {Function}

   */

  this.selectionHandler_ = null;



  /**

   * @private

   * @type {null|function(Object):boolean}

   */

  this.currentFilter_ = null;



  /**

   * @private

   * @type {pn.ui.grid.QuickFind}

   */

  this.quickFind_ = null;



  /**

   * @private

   * @type {pn.ui.grid.RowOrdering}

   */

  this.rowOrdering_ = null;



  /**

   * @private

   * @type {Object}

   */

  this.sortState_ = null;



  /**

   * @private

   * @type {Element}

   */

  this.totalsLegend_ = null;

}