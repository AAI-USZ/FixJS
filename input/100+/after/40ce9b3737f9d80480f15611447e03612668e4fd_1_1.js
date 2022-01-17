function (idx, ele)
			{
				if(value)
				{
					//set
					if(ele.type == "radio")
					{
						if(value == ele.value || value == ele.getAttribute('labeltext'))
							ele.checked = "checked";
						else
							ele.checked = "";
					}
					else if(ele.type == "checkbox")
					{
					
						if(value.match(new RegExp("(,|^)" + ele.value + "(,|$)")))
							ele.checked = "checked";
						else
							ele.checked = "";
					}
				}
				else
				{
					//get
					if(ele.type == "radio")
					{
						if(ele.checked)
						{
							retval = ele.value;
						}
					}
					else if(ele.type == "checkbox")
					{
						if(ele.checked)
							retval += (retval == "" ? "," : "") + ele.value;
					}				
				}
			}