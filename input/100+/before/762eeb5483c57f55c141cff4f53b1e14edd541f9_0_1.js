function(data, textStatus, jqXHR) { 
          $("#projects .header img").hide();
          
          if(textStatus == "success") {
            $("#projects").effect("highlight", {color:"#E8F5FB"}, 3000);
            $('ul#project_list', this.el).text("");     

            var repos = data.user.repositories
            
            // filter out private and empty repos
            repos = _.filter(repos, function(r){ 
              return (r.size != 0) && (!r.private); 
            });
            
            // convert to date objects for easier sorting 
            _.each(repos, function(r){
              r.pushed_at = new Date(r.pushed_at);
            });

            repos.sort(function(a,b) {
              return b.pushed_at - a.pushed_at;
            });  
            
            // set the most recent 5 to the collection
            that.collection.reset(repos.slice(0,5));
          }
        }