function(e) {
              Utils.debug("It thinks there was an error fetching the session. But chances are there wasnt...."+JSON.stringify(e));
              var se= new Session(e);
              se.restructure;
              s.set(se.toJSON());
            }