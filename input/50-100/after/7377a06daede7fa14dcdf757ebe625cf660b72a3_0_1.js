function (val, filter) {
			if(typeof val === "string")
			{
				if(base.inSourceMode())
					base.setTextareaValue(val);
				else
				{
					if(filter !== false && base.options.getTextHandler)
						val = base.options.getTextHandler(val);

					base.setWysiwygEditorValue(val);
				}

				return this;
			}

			return base.inSourceMode() ?
				base.getTextareaValue(false) :
				base.getWysiwygEditorValue();
		}