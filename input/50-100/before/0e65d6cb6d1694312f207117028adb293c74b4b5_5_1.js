function()
{
  // get config parameters and apply them to our local config container
  this._configApply(ssd.Config.getInstance().get(ssd.user.auth.CONFIG_PATH));

  this._extSupportedSources.forEach(function(key, value){
    value.init();
  });
}