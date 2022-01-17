function(){

			if(this.element.data("canClose")){

				$("#"+this.options.listId).remove();

				$("body").unbind("keydown.timepicker");

				this.theList.unbind(".timepicker");

			}

		}