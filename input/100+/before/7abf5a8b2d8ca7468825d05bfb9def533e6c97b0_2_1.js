function(container)

	{

		if (this.resource )

		{

			if (this.resource.data)

			{

				container.innerHTML = 'Data available for the resource '+this.resource.id+' '+Date.now();	// to get a visual that something is happening in case the resource is heavy to render

				var toto=Date.now();

				container.clearAndRender( templates.resource_detail.update(this.resource, this.resource.data) );

				container.title = (Date.now()-toto)+'ms';

			}

			else

			{

				container.innerHTML = 'No data available for the resource '+this.resource.id+' '+Date.now()+'<p>'+JSON.stringify(this.resource)+'</p>';

			}

		}

		else

		{

			container.innerHTML = 'No resource selected'+Date.now();

		}

	}