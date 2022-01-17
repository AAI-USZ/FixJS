function(result)
			{
				viewShowError(result, context, meta);
			
				if ('data' in result)
				{
					dataConv.List.put(
							autoListSourceElement, //element
							{ meta: meta },  		//meta
							'',						//keyStr
							result.data,			//value	
							{						//settings
								update: update,
								showChanges: update
							}		
					);
				}
				
	  			$(".controlOnClickDel", context).unbind('click');
				$(".controlOnClickDel", context).click( del);
				$(".controlOnClickEdit", context).unbind( 'click');
				$(".controlOnClickEdit", context).click( edit);

				if (!update)
				{
					params.loadCallback(result);
				}
			}