function(){
			var f = this.pf.f, t = this.nf, p = this.p;
			this.r(this);
			if(t !== this){
				for(; t !== p; f = t.f, t = t.nf){
					if(t.o){
						t.f = advise._f(t.o, f, this);
					}
				}
			}
			this.i = 0;
		}