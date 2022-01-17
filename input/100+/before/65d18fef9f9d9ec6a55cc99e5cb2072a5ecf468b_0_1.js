function (options) {
    // 类型声明，用于生成控件子dom的id和class
    this._type = 'cal';

    
    // 标识鼠标事件触发自动状态转换
    this._autoState = 1;

    esui.InputControl.call( this, options );

    // 初始化显示日期的年月
    this.now = this.now || esui.config.NOW || new Date();
    var now = this.now;
    now = this.now = new Date(
        now.getFullYear(), 
        now.getMonth(), 
        now.getDate()
    );

    // 日期格式化方式初始化
    this.__initOption( 'dateFormat', null, 'DATE_FORMAT' );
    this.__initOption( 'valueFormat', null, 'VALUE_FORMAT' );
    this.__initOption( 'range', null, 'RANGE' );

    // 初始化value与valueAsDate
    var valueAsDate;
    if ( this.value ) {
        valueAsDate = baidu.date.parse( this.value );
    }

    if ( valueAsDate ) {
        this.valueAsDate = valueAsDate;
    } else {
        this.valueAsDate = this.valueAsDate || new Date( now.getTime() );
    }
   
    
    this.month = parseInt( this.month, 10 ) || now.getMonth();
    this.year  = parseInt( this.year, 10 )  || now.getFullYear();
}