function(context){

		context = this.fixupContext(context);

		if(context){

		    if (context.declaredClass=="davinci.ve.PageEditor" && context._displayMode=="source")

		    {

		    	context.htmlEditor.cutAction.run();

		    	return;

		    }

			var selection = this._normalizeSelection(context);

			if(selection.length > 0){

				var command = new CompoundCommand();

				var data = [];

				dojo.forEach(selection, function(w){

					// FIXME: GENERALIZE

					var d = w.getData( {identify: false});

					if(d){

						data.push(d);

					}

					command.add(new RemoveCommand(w));

				});

				davinci.Runtime.clipboard=data;

				context.select(null);

				context.getCommandStack().execute(command);

			}

		}

	}