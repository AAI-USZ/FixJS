function(xml)
    {
        var tblData = xml.getElementsByTagName('table_data')[0];
		if(tblData){
			this.name = tblData.getAttribute('table_name');
			this.num = tblData.getAttribute('table_num');
			this.key = tblData.getAttribute('table_key');
		}
		else
		{
			this.name = xml.getAttribute('name');
			this.num = xml.getAttribute('num');
			this.key = xml.getAttribute('key');
			if(xml.getAttribute('main')) this.main = xml.getAttribute('main') === "true";
		}
        
		this.fld = new EpiCollect.Field();
		this.fld.id = "created";
		this.fld.form = this;
		this.fld.text = "Time Created";
		this.fields[this.fld.id] = this.fld;
		this.cols.push("created");
		
		this.fld = new EpiCollect.Field();
		this.fld.id = "uploaded";
		this.fld.form = this;
		this.fld.text = "Time Uploaded";
		this.fields[this.fld.id] = this.fld;
		this.cols.push("uploaded");
		
		this.fld = new EpiCollect.Field();
		this.fld.id = "lastEdited";
		this.fld.form = this;
		this.fld.text = "Last Updated";
		this.fields[this.fld.id] = this.fld;
		this.cols.push("lastEdited");
		
		this.fld = new EpiCollect.Field();
		this.fld.id = "DeviceID";
		this.fld.text = "Device ID";
		this.fld.form = this;
		this.fields[this.fld.id] = this.fld;
		this.cols.push("DeviceID");
		
		
		for(var nd = 0; nd < xml.childNodes.length; nd++)
		{
			if(xml.childNodes[nd].nodeType == 1 && xml.childNodes[nd].nodeName != "table_data")
			{
				var field = new EpiCollect.Field();
				field.parse(xml.childNodes[nd]);
				field.form = this;
		
				this.fields[field.id] = field;
				this.cols.push(field.id);
				
				if(keys[field.id])
				{
					field.fkField = field.id;
					field.fkTable = keys[field.id];
				}
				if(field.title)this.titleField = field.id;
				if(field.type == "video" || field.type == "audio" || field.type == "photo")
				{
					this.hasMedia = true;
				}
				else if (field.type == "gps" || field.type == "location")
				{
					this.gpsFlds.push(field.id);
				}
				else if (field.type == "branch")
				{
					this.branchForms.push(field.connectedForm);
				}
				else if(field.type == "group")
				{
					this.groupForms.push(field.connectedForm);
				}

			}
		}
		
		this.fields[this.key].isKey = true;
		this.fields[this.key].required = true;
    }