function(element, options){

		var self = this, visible = false, modal = null;;

		var options = $.extend({}, defaults, options || {});

		var box = $(wrapper).addClass(options.style).data('ThinkBox', this); //创建弹出框容器

		options.dataEle && $(options.dataEle).data('ThinkBox', this); //缓存弹出框，防止弹出多个

		

		this.box = function(){return box};//获取弹出框容器

		this.options = function(){return options};//获取弹出框配置列表

		this.visible = function(){return visible};//获取弹出框visible

		

		_setContent.call(this, element || '<div></div>'); //设置内容

		options.title !== null && _setupTitleBar.call(this); // 安装标题栏

		options.button && _setupToolsBar.call(this)

		options.close && _setupCloseBtn.call(self); // 安装关闭按钮

		box.css('display', 'none').appendTo('body'); //放入body

		

		//设置弹出框fixed属性

		options.fixed && ($.browser.msie && $.browser.version < 7 ? options.fixed = false : box.addClass('fixed'));

		_setLocate.call(this); //设置弹出框显示位置

		options.resize && $(window).resize(function(){_setLocate.call(self)});

		

		//显示弹出框

		options.display && _show();

		

		//隐藏弹出框

		this.hide = _hide;

		

		//显示弹出框

		this.show = _show;

		

		//如果当前显示则隐藏，如果当前隐藏则显示

		this.toggle = function(){visible ? self.hide() : self.show()};

		

		// 获取弹出框内容对象

		this.getContent = function(){return $('.ThinkBox-content', box)};

		

		//动态添加内容

		this.setContent = function(content){

			_setContent.call(self, content);

			visible && _setSize.call(box);

			_setLocate.call(self); //设置弹出框显示位置

			return self;

		};

		

		//获取内容区域的尺寸

		this.getSize = function(){

			return _getSize.call(self);	

		};

		

		//动态改变弹出层内容区域的大小

		this.setSize = function(width, height){

			$('.ThinkBox-inner', box).css({'width' : width, 'height' : height})	

		};

		

		//重置弹出框的尺寸

		this.resize = function(){

			_setSize.call(box);

			$(window).resize();

		};

		

		/* 显示弹出框 */

		function _show() {

			if(visible) return this;

			// 安装模态背景

			options.modal && (modal = _setupModal.call(self));

	

			// 按ESC键关闭弹出框

			self.escHide = options.escHide;

			

			_fire.call(self, options.beforeShow); //调用显示之前回调函数

			

			switch(options.show[0]){

				case 'slideDown':

					box.stop().slideDown(options.show[1], _);

					break;

				case 'fadeIn':

					box.stop().fadeIn(options.show[1], _);

					break;

				default:

					box.stop().show(options.show[1], _);

			}

			

			visible = true;

			_setCurrent.call(self);

			_setSize.call(box);

			return this;

			

			function _(){

				options.delayClose && $.isNumeric(options.delayClose) && setTimeout(_hide, options.delayClose);

				_fire.call(self, options.afterShow);

			}

		};



		/* 隐藏弹出框 */

		function _hide() {

			if(!visible) return;

			modal && modal.fadeOut('normal',function(){$(this).remove();modal = null});

			

			switch(options.hide[0]){

				case 'slideUp':

					box.stop().slideUp(options.show[1], _);

					break;

				case 'fadeOut':

					box.stop().fadeOut(options.show[1], _);

					break;

				default:

					box.stop().hide(options.show[1], _);

			}

			

			function _() {

				visible = false;

				_fire.call(self, options.afterHide); //隐藏后的回调方法

				options.unload && _unload.call(self);

			}

		}

	}