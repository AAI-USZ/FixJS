function getTransactions(callback,error_callback)
{
  var params = createParams("chrome","listtransactions",[])
  var success = function(res)
  {
    callback(res);
  }
  var failure = function(res)
  {
    error_callback(res);
  }
  send(params,success,failure)
}