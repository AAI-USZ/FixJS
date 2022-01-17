function ( options ) {

    // 类型声明，用于生成控件子dom的id和class

    this._type = 'table';

    

    // 标识鼠标事件触发自动状态转换

    this._autoState = 0;



    esui.Control.call( this, options );

    

    this.__initOption( 'noDataHtml', null, 'NODATA_HTML' );

    this.__initOption( 'followHead', null, 'FOLLOW_HEAD' );

    this.__initOption( 'sortable', null, 'SORTABLE' );

    this.__initOption( 'columnResizable', null, 'COLUMN_RESIZABLE' );

    this.__initOption( 'rowWidthOffset', null, 'ROW_WIDTH_OFFSET' );

    this.__initOption( 'subrowMutex', null, 'SUBROW_MUTEX' );

    this.__initOption( 'subEntryOpenTip', null, 'SUBENTRY_OPEN_TIP' );

    this.__initOption( 'subEntryCloseTip', null, 'SUBENTRY_CLOSE_TIP' );

    this.__initOption( 'subEntryWidth', null, 'SUBENTRY_WIDTH' );

    this.__initOption( 'breakLine', null, 'BREAK_LINE' );

    

    // 诡异的webkit

    // 表格的单元格不需要考虑边框宽度，直接加齐就行

    // 而且即使table-layout:fixed，单元格宽度也不会从前向后分配

    // 而会以未知策略将剩余宽度分配给单元格

    //

    // 但是在chrome19以上修复了此问题

    // 并且在safari5.1.4上测试未发现问题

    // if ( baidu.browser.isWebkit ) {

    //     this.rowWidthOffset = 0;

    // }



    this._followHeightArr = [0, 0];

    this._followWidthArr = [];

}