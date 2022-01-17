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