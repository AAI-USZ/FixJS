function() {
                         Utils.debug("Successfully authenticated user with their corpus server.");
                         //Bring down the views so the user can search locally without pushing to a server.
                         c.replicateCorpus(couchConnection);
                       }