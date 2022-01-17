function _show() {

			if(visible) return this;

			// 安装模态背景

			options.modal && (modal = _setupModal.call(self));

			

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

		}