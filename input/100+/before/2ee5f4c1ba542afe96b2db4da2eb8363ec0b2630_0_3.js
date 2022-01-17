f            //name, icon, state, plot) {
            //console.log("nInteractor init", this, options);
            this.name = null;
            this.icon = null;
            this.state = null;
            this.plot = null;
            this.translatable = true;
            

            this.grobs = [];
            this.mousedown = false;
            this.curgrob = null;
            
            this.color1 = '#6699ff';
            this.color2 = '#ff6699';
            this.color = this.color1;
            
            this.rc = 1;//Math.random();
            $.extend(true, this, options);
            this.interactors = []; // number of interactors
            this.generate_ticks = generate_ticks;
        },
