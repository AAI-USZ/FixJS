function(element, meta, keyStr)
		{
			//if it is a autoListSource, add autoGet and autoPut for convienience
			//FIXME: move to autometa
			if ($(element).hasClass("autoListSource"))
			{
				if (!meta.readonly)
				{
					$(element).addClass("autoGet");
				}
				$(element).addClass("autoPut");
			}
			//recurse into sub:
			$(element).autoMeta(meta.meta, keyStr);
			return (null);
		}