function (info) {
			return [ { ele: 'tr', 'class': info.$row }
			        ,    [ { ele: 'td', 'class': 'imageRow', colspan: info.cols }
				         ,    [ INNERCONTEXT.UI.$makeAddDropboxButton().hide()
					          , { ele: 'img', 'class': 'throbberImage', src: INNERCONTEXT.CONSTANTS.THROBBER, hide: true }
					          , { ele: 'div', 'class': 'loadingDiv', text: $.l('loading') }
					          , $.make('div', { 'class' : 'caaDiv' })
					          ,    [ INNERCONTEXT.UI.$makeLoadDataButton().data('entity', info.MBID)
						           ]
					          ]
				         ]
			        ];
	}