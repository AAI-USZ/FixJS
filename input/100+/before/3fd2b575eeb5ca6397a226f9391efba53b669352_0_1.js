function(){
				$('div.headers span.header[name=setting]').text( 'setting' );
				if (!self.isCurrentPivotByName("setting")) {
					self.goToPivotByName("setting");
				}
				// conf.ymlから読み込んだ内容の表示
				$('#setting_view_my_name_title').html( "<a href='http://mobile.twitter.com/"+self.jsConf['my_name']+"' target='_blank'><img src='"+self.jsConf['icon_server_uri']+self.jsConf['my_name']+"' title='"+self.jsConf['my_name']+"' /></a>" );
				$('#setting_view_my_name').text( self.jsConf['my_name'] );
				$('#setting_view_pickup_word').text( self.jsConf['pickup_word'] );
				$('#setting_view_on_icon').text( self.jsConf['on_icon']?'ON':'OFF' );
				$('#setting_view_on_image').text( (self.jsConf['on_image']==2?'Lightbox':(self.jsConf['on_image']==0?'インライン':'展開しない')) );
				$('#setting_view_on_twitter_link').text( self.jsConf['on_twitter_link']?'ON':'OFF' );
				$('#setting_view_keymapping_input_histry').text( self.jsConf['keymapping']['input_histry']?'ON':'OFF' );
				$('#setting_view_quickpost_auto_close').text( self.jsConf['quickpost_auto_close']?'ON':'OFF' );
				$('#setting_view_disable_swipe').text( self.jsConf['disable_swipe']?'OFF':'ON' );
				$('#setting_view_template').text( self.jsConf['template'] );
				// Cookie|Session
				$('#setting_view_cookie').text( document.cookie.indexOf('UniqueId=')>=0 ? 'Cookie':'セッション' );

				// クライアント設定の読み込み
				$('form#client_setting_form input:checkbox[name=enable_swipe]').attr( { checked: ( self.jsConf['disable_swipe']?false:true ) } );	// スワイプ
			}