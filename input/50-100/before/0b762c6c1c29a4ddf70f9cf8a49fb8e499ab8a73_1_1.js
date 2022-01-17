function(d) 

			{ 

				switch(d.data['@'].label)

				{					

					case 'block':						

						return d.data.attvalues.attvalue[0]['@'].value;

						break;

					case 'transaction':

						return d.data.attvalues.attvalue[4]['@'].value;

						break;

					default:

						return 'Unknown';

				}



			}