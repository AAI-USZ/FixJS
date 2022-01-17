function TestFun() {
    usersDb.deleteDb();
    db.deleteDb();
    db.createDb();



    var benoitcUserDoc = CouchDB.prepareUserDoc({
      name: "benoitc@apache.org"
    }, "test");
    T(usersDb.save(benoitcUserDoc).ok);

    T(CouchDB.session().userCtx.name == null);

    // test that you can use basic auth aginst the users db
    var s = CouchDB.session({
      headers : {
        "Authorization" : "Basic YmVub2l0Y0BhcGFjaGUub3JnOnRlc3Q="
      }
    });
    T(s.userCtx.name == "benoitc@apache.org");
    T(s.info.authenticated == "default");

    CouchDB.logout();

    var headers = {
      "X-Auth-CouchDB-UserName": "benoitc@apache.org",
      "X-Auth-CouchDB-Roles": "test",
      "X-Auth-CouchDB-Token": hex_hmac_sha1(secret, "benoitc@apache.org")
    };

    var designDoc = {
      _id:"_design/test",
      language: "javascript",

      shows: {
        "welcome": stringFun(function(doc,req) {
          return "Welcome " + req.userCtx["name"];
        }),
        "role": stringFun(function(doc, req) {
          return req.userCtx['roles'][0];
        })
      }
    };

    db.save(designDoc);

    var req = CouchDB.request("GET", "/test_suite_db/_design/test/_show/welcome",
                        {headers: headers});
    T(req.responseText == "Welcome benoitc@apache.org");

    req = CouchDB.request("GET", "/test_suite_db/_design/test/_show/role",
                        {headers: headers});
    T(req.responseText == "test");

    var xhr = CouchDB.request("PUT", "/_config/couch_httpd_auth/proxy_use_secret",{
      body : JSON.stringify("true"),
      headers: {"X-Couch-Persist": "false"}
    });
    T(xhr.status == 200);

    req = CouchDB.request("GET", "/test_suite_db/_design/test/_show/welcome",
                        {headers: headers});
    T(req.responseText == "Welcome benoitc@apache.org");

    req = CouchDB.request("GET", "/test_suite_db/_design/test/_show/role",
                        {headers: headers});
    T(req.responseText == "test");

  }