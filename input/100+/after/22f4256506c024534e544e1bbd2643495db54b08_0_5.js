function(grpField)
	{
		try{
			this.currentMkr = -1;
			this.grps = {};
			this.groupField = grpField;
		
			for(var i in this.markers)
			{
				var mkr = "redCircle";
				var gVal = this.markerData[i][this.groupField];
				if(this.grps[gVal])
				{
						mkr = this.grps[gVal];
				}
				else
				{
						mkr = this.nextMkr();
						this.grps[gVal] = mkr;
				}
				this.markers[i].setIcon("../images/mapMarkers/" + (mkr ? mkr : "redCircle") + ".png");
			}
			this.drawMapLegend();
		}catch(err){/*alert(err);*/}
	}