function(value, data)
	{
		if( !value || (typeof value == "string" && (value == "undefined" || value.match(/null/i))) )
		{
			return '';
		}
		if( this.type == "select1" || this.type == "radio" )
		{
			
			var opts = this.options;
			var l = opts.length;
			for( var i =0; i < l; i++ )
			{
				if( opts[i].value == value || opts[i].label == value )
				{
					return opts[i].label;
				}
			}
			return '<i color="FF0000">' + value + '</i>';
		}
		else if( this.type == "select" )
		{
			var sels = value.split(',');
			var opts = this.options;
			var l = opts.length;
			
			var ret = '';
			for( var i =0; i < l; i++ )
			{
				var l_s = sels.length;
				for( var j = 0; j < l_s; j++ )
				{
					if( opts[i].value == sels[j] || opts[i].label == sels[j] )
					{
						ret = ret + (ret != '' ? ', ' : '') + opts[i].label;
						sels.splice(j, 1);
						break;
					}
				}
			}
			if(sels.length > 0)
			{
				if(ret != '') ret = ret + ', ';
				ret = ret + sels.join(',');
			}
			return ret;
		}
		else if(this.type == "photo"){
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
			if(!value || (typeof value == "string" && (value == "undefined" || value.match(/\s?null\s?/i))))
			{
				return '';
			}
			else
			{
				return value;
			}
		}
	}