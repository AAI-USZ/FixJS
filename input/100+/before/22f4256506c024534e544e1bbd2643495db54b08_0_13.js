function(value, data)
	{
		if(this.type == "photo"){
			if(value && !value.match(/^null$/i) && value != "-1")
			{
				return  "<a href=\"./" +formName+"/__getImage?img="+value+"\"><img src=\"./" +formName+"/__getImage?img="+value+"&thumbnail=true\" alt=\""+value+"\" height=\"125\"/></a>";
			}
			else
			{
				return "<i>No Image</i>";
			}
		}else if(this.type == "video" || this.type == "audio"){
			if(value)
			{
				return "<a href=\"../ec/uploads/"+value+"\"> View Media </a>";
			}
			else
			{
				return "<i>No Media</i>";
			}
		}else if(this.type == "location" || this.type == "gps"){
			return value.latitude + ", " + value.longitude;
		}
		else if(this.id == 'created')
		{
			return new Date(value).toLocaleString();
		}
		else if(this.type == 'branch')
		{
			if(!value)
			{
				return '0';
			}
			else
			{
				return value + (data ?  ' <a href="' + this.connectedForm + '?' + this.form.key +  '=' + data[this.form.key] + '">View entries</a>' : '');
			}
		}
		else
		{ 
			if(!value || (typeof value == "string" && (value == "undefined" || value.match(/null/i))))
			{
				return '';
			}
			else
			{
				return value;
			}
		}
	}