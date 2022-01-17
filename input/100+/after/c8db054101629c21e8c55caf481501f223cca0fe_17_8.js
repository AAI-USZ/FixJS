function createConfigStructure (name, type) {
  var config = {};
  if (type === "Pzh") {
    config.own         = { key_id: name+"_conn_key",   cert:""};
    config.master      = { key_id: name+"_master_key", cert:"", crl:"" };
    config.signedCert  = {};
    config.revokedCert = {};
    config.otherCert   = {};
    config.email       = "";
    config.country     = "";
    config.image       = "";
  } else if (type === "PzhFarm") {
    config.own         = { key_id: name+"_conn_key",   cert:""};
    config.master      = { key_id: name+"_master_key", cert:""} ;
    config.webServer   = { key_id: name+"_ws_key",     cert:""} ;
    config.pzhs        = {}; //contents: "", modules:""
  } else if (type === "Pzp" ) {
    config.own         = { key_id: name+"_conn_key", cert:""};
    config.master      = { cert:"", crl:"" };
    config.pzhId       = '';
  };
  config.type        = type;
  config.name        = '';
  config.serverName  = '';
  return config;
}