function(){
               this.range = this._getRange();
               this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
               
               var createCategoryScale;
               
               /* Compute a scale-function per data category? */
               if(this.keyArgs.normPerBaseCategory){
                   /* Ignore args' domain and calculate from data of each category */
                   createCategoryScale = function(leafData){
                       // Create a domain from leafData
                       var domain = this._ensureDomain(null, false, leafData);
                       return this._createScale(domain);
                   };
                   
               } else {
                   var domain = this._getDomain(),
                       scale  = this._createScale(domain);
                   
                   createCategoryScale = def.constant(scale);
               }
               
               return this._createCategoryScalesMap(createCategoryScale); 
           }