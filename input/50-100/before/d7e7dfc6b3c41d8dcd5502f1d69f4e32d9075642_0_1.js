function(val)
		{
			clearTimeout(this.nextDraw);
			var d = this;
			this.numBases = Math.pow(10,Math.round(val / 20) + 1);
			this.nextDraw = setTimeout(function(){d.draw();}, this.numBases > 50000 ? 100 : 10);
		}