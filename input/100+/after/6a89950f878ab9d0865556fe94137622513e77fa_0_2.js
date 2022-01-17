function (info) {
			return [ { ele: 'tr', 'class': info.$row.prop('class') }
			        ,    [ { ele: 'td', 'class': 'imageRow', colspan: info.cols }
				         ,    [ INNERCONTEXT.UI.$makeAddDropboxButton().hide()
					          , { ele: 'div', 'class': 'loadingDiv', hide: true }
						      ,    [ { ele: 'img', 'class': 'throbberImage', src: INNERCONTEXT.CONSTANTS.THROBBER }
						           , { ele: 'span', text: $.l('loading') } 					          
						           ]					          
					          , $.make('div', { 'class' : 'caaDiv' })
					          ,    [ INNERCONTEXT.UI.$makeLoadDataButton().data('entity', info.MBID)
						           ]
					          ]
				         ]
			        ];
	}