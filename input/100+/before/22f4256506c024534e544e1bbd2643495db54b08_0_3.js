function(xml)
    {
		keys = {};
		
        mdl = xml.getElementsByTagName('model')[0];
        sub = mdl.getElementsByTagName('submission')[0];
        this.id = sub.getAttribute('id');
        this.name = sub.getAttribute('projectName');
		
        this.allowEdits = sub.getAttribute('allowDownloadEdits') == 'true';
        this.version = sub.getAttribute('versionNumber');
		
		var localServers = mdl.getElementsByTagName('uploadToLocalServer');
		if(localServers.length > 0){
			this.localUrl = localServers[0].firstChild.data;
		}
		if(mdl.getElementsByTagName('uploadToServer').length> 0) this.remoteUrl = mdl.getElementsByTagName('uploadToServer')[0].firstChild.data;
        
		var desc = xml.getElementsByTagName('description');
		if(desc && desc.length > 0)
		{
			this.description = desc[0].firstChild.data;
		}
		
        tbls = xml.getElementsByTagName('table');
		if (tbls.length == 0)
		{
			tbls = xml.getElementsByTagName('form');
		}
        for(var i = 0 ; i < tbls.length; i++){
            frm = new EpiCollect.Form();
            frm.parse(tbls[i]);

            this.forms[frm.name] = frm;
			keys[frm.key] = frm.name;
			if(this.getPrevForm(frm.name)){
				t = this.getPrevForm(frm.name);
				t.cols.push(frm.name + "Entries");
			}
        }
		for( tbl in this.forms )
		{
			var branches = this.forms[tbl].branchForms;
			for( var i = 0; i < branches.length; i ++ )
			{
				this.forms[branches[i]].branchOf = tbl;
			}
		}
	}