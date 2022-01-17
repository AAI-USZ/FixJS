function(con)
	{
        //replace with a test construct
        con = libDesigner.getTestConstruct();

		this.setName(con.name);
	
		this.setLength(con.length);

        var dfs = new Array();
        for(i in con.cfs)
            {
                dfs.push(new DisplayFragment(con.cfs[i].f, con.cfs[i]));
            }
		
		this._fc.addMulti(dfs);
		
		stage.update();
        this._fc.debug();
	}