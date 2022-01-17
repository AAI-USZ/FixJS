function(err, csg) {
          that.processing = false;
          that.worker = null;
          if(err)
          {
            that.setError(err);
            that.statusspan.innerHTML = "Error.";
          }
          else
          {
            that.solid = csg;      
            if(that.viewer) that.viewer.setCsg(csg);
            that.validcsg = true;
            that.statusspan.innerHTML = "Ready.";
          }
          that.enableItems();
          if(that.onchange) that.onchange();
        }