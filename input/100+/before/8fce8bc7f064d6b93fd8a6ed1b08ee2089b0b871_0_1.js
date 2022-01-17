function(dbConnection, user, successcallback, errorcallback){
  console.log("Creating a new database/corpus: "+dbConnection.corpusname);
  var c = new cradle.Connection(
      dbConnection.protocol + dbConnection.domain,
      dbConnection.port, {
        auth : {
          username : couchkeys.username,
          password : couchkeys.password
        }
      //TODO make the username and password come from the user's default config for their couch connection
      });
  var db = c.database(dbConnection.corpusname);
  db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
      if(typeof errorcallback == "function"){
        errorcallback(err);
      }
    } else if (exists) {
      console.log("The corpus exists, calling the errorcallback.");
      var errmessage = 'The database/corpus already exists, this is problematic. You should choose another corpus name.';
      if(typeof errorcallback == "function"){
        errorcallback(errmessage);
      }
    } else {
      //Create database/corpus
      console.log('Database/corpus '+dbConnection.corpusname+' does not exist, creating it.');
      db.create(function(err,res){
        console.log("In the callback of db create for "+dbConnection.corpusname);
        console.log("Here is the err: "+err);
      
        /*
         * Upon success of db creation, set up the collaborator, contributor and admin roles for this corpus
         * 
         * Admins: The admins can perform any operation on the corpus. 
         * Members: By adding items to the members the corpus becomes non-public in the sense of 
         *  couch not allowing access. We can still use iField to perform a fine grained control by creating a 
         *  special ifieldpublicuser which is essentially the checkbox that the user can check to make the corpus private,
         *  and adding all ifieldusers to a role ifieldusers which can let the user make the corpus private to the world, 
         *  but viewable by ifieldusers (to let only signed in users comment on their data etc)
         * 
         * By default:
         * -signed in ifieldusers can read other user's corpora until the user takes that role off
         * -public user (ie the general public) can see the user's corpora through ifield, but not directly the couch database.
         *  This is how the public checkbox is implemented in ifield.
         *  
         *  References: http://127.0.0.1:5984/john7corpus/_security
         */
        var collaborator = "collaborator"; 
        var contributor = "contributor";
        var admin = "admin";
        var securityParamsforNewDB = {
            "admins" : {
              "names" : [ '"'+user.username+'"' ],
              "roles" : [ '"'+dbConnection.corpusname + "_" + admin+'"' ]
            },
            "members" : {
              "names" : ["ifieldpublicuser"],
              "roles" : [ '"'+dbConnection.corpusname + "_" + collaborator+'"',
                          '"'+dbConnection.corpusname + "_" + contributor+'"',
                          "ifielduser"]
            }
        };
        db.save("_security", securityParamsforNewDB, function (err, doc) {
          console.log("Here are the errors "+err+" \n Here is the doc we get back "+doc);
        });
        
        
        /*
         * Create the user, give them the admin role on their corpus, 
         * add them to the ifielduser role so that others can let them see their corpora 
         * if they decide to let logged in ifieldusers see their corpus.
         *
         * references: http://blog.mattwoodward.com/2012/03/definitive-guide-to-couchdb.html
         */
        var usersdb = c.database("_users", function(){
          console.log("In the callback of opening the users database.");
        });
        var userid = 'org.couchdb.user:'+user.username;
        var userParamsForNewUser  = {
            name: user.username, password: user.password, roles: ['"'+dbConnection.corpusname + "_" + admin+'"', "ifielduser"], type: 'user'
        };
        usersdb.save(userid, userParamsForNewUser, function (err, doc) {
          console.log("Here are the errors "+err+" \n Here is the doc we get back "+doc);
        });
        
        /*
         * Make the corpus writable by only contributors/admins that the user has authorized.
         */
        var blockNonContribAdminWrites = "function(new_doc, old_doc, userCtx) {   if( (userCtx.roles.indexOf('"
          +dbConnection.corpusname + "_" + contributor
          +"') == -1 ) && (userCtx.roles.indexOf('"
          +dbConnection.corpusname + "_" + admin
          +"') == -1 ) ) {     throw({forbidden: 'Not Authorized, you are not a "+contributor+" on "
          +dbConnection.corpusname
          +", you will have to ask "
          +user.username+" to add you as a "+contributor+". You currently have these roles: '+userCtx.roles});   } }  ";
        db.save("_design/blockNonContribAdminWrites", {
          "language": "javascript",
          "validate_doc_update": blockNonContribAdminWrites
        }, function (err, doc) {
          console.log("Here are the errors "+err+" \n Here is the doc we get back "+doc);
          
        });
        
        /* 
         * TODO Populate design documents 
         */
        
        if(typeof successcallback == "function"){
          successcallback();
        }
        
      
      });//end createdb      
    }
  });
}