function()

		{

			var form = jQuery("#form");

			if( jQuery("input[type='checkbox']:checked",form).length > 0 )

			{ 

				if(confirm("Are you sure?"))

				{

					form.submit();

				}

			}

			else

			{

				alert("Please choose objects for deleting");

				return false;

			}

		}