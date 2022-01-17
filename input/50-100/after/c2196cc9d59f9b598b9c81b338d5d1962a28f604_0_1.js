function(value)
		{
			if(this.type != 'input')
			{
				if(value != undefined)
					this.element.innerHTML = value;
				else
					return this.element.innerHTML;
			}
			else 
			{
				if(value != undefined)
					this.element.value = value;
				else
					return this.element.value;
			}
			return this;
		}