function(result)
				{
					dataConv.List.put(
							autoListSourceElement, //element
							{ meta: meta },  		//meta
							'',						//keyStr
							result.data,			//value	
							{						//settings
								noRemove: true
							}		
					);
					endlessUpdating=false;
				}