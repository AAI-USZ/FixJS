function(result)
		{
			
			if (viewShowError(result, context, meta))
				return;
			
			if (!('data' in result))
				return;

			meta=result['data'];
			$(context).autoMeta(meta);
			
			//create an add-handler to add items to lists
			$(".controlOnClickAdd", context).click(function(){
				//find the clicked list element, and the source element of the list
				var clickedElement=$(this, context).closest(".autoListItem, .autoListSource",context);
				
				if (clickedElement.length==0)
					return;
				
				var sourceElement=clickedElement.parent().children(".autoListSource");
				
				var addElement=autoListClone(sourceElement);

		        if (clickedElement.hasClass("autoListSource"))
					addElement.insertBefore(clickedElement);
				else
					addElement.insertAfter(clickedElement);
				
			});
			
			//create an auto-add handler if the source-element is focussed
			$(".controlOnFocusAdd :input", context).focus(function(){
				var changedElement=$(this, context).closest(".autoListSource, .autoListItem", context);
		        if (changedElement.hasClass("autoListSource"))
		        {
					var addElement=autoListClone(changedElement);
					addElement.insertBefore(changedElement);
					$('.autoGet[_key="'+$(this).attr("_key")+'"]', addElement).focus();
		        }
			});
			

			//delete handlers for lists
			$(".controlOnClickDel", context).click(function()
			{
				var clickedElement=$(this, context).closest(".autoListItem",context);
		        if (clickedElement.hasClass("autoListItem"))
				{
					$(this).confirm(function()
					{
						clickedElement.hide('fast',function()
						{
							clickedElement.remove();
						});
					});
				}
			});
			
			//make stuff sortable
			$(".controlSortable", context).sortable({
				placeholder: ".tempateSortPlaceholder",
				handle: ".controlOnDragSort",
				cancel: ".autoListSource",
				items:"> .autoListItem",
				forceHelperSize: true,
				forcePlaceholderSize: true
			});

			
			function controlFormFocus()
			{
				//focus the correct input field
				if (params.view && params.view.focus)
					$(context).autoFindElement(meta, params.view.focus).focus();
				else if (params.defaultFocus)
					$(context).autoFindElement(meta, params.defaultFocus).focus();
		
				//elements that have controlSetFocus always overrule the focus:
				$(".controlSetFocus", context).focus();
				
			}

			if (params['getData'])
			{
				//get data
				rpc(
					params.getData, 
					params.getDataParams,
					function(result)
					{
						$(".controlOnClickSave", context).prop("disabled", false);

						if (('data' in result) && (result.data != null) )
						{
							$(context).autoPut(meta, result.data);
						}
						
						controlFormFocus();

						if (viewShowError(result, context, meta))
						{
							if (params['errorCallback'])
								params['errorCallback'](result);
						}
						else
						{
							if (params['loadCallback'])
								params['loadCallback'](result);
						}
						

					}
				);
			}
			//when not loading data, dont forget to call the loadCallback:
			else
			{
				$(".controlOnClickSave", context).prop("disabled", false);

				controlFormFocus();

				if (params['loadCallback'])
					params['loadCallback'](result);
				

			}
		}