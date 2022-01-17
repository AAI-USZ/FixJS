function(e){
        //console.log(e);
        var fname        = e.target.name; //alert(fid); //form name
        var faction      = e.target.action; //action value
        var factionmatch = faction.search("civicrm/report/"); //-1 if not found
        var fbaseuri     = e.target.baseURI;
        if ( fbaseuri ) {
          var fbaseurimatch = fbaseuri.search("civicrm/report/");
        }

        //prevent undefined error
        if(typeof global_formNavigate === 'undefined'){
          var global_formNavigate;
        }

        if ( submitted &&
             factionmatch == -1 &&
             fbaseurimatch == -1 &&
             fname != 'Select' &&
             fname != 'Map' &&
             fname != 'Label' &&
             global_formNavigate != false //5231
           ) {
            return false;
        } else {
            //5231 leave submit button unlocked if formNavigate has been triggered and canceled
            if ( global_formNavigate != false ) {
              submitted = true;
            }
            return true;
        }
    }