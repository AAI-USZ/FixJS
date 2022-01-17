function(q,e,n) {
            var f = new CustomFunction(this);
            if(n!=undefined)
                this.functions.splice(n,0,f);
            else
                this.functions.push(f);
			return f;
        }