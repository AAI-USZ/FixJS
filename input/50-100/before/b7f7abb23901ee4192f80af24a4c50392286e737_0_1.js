function getTransactions(callback)
{
  var params = createParams("chrome","listtransactions",[])
  var success = function(res)
  {
    callback(res);
  }
  var failure = function(res)
  {
    callback(res);
  }
  send(params,success,failure)
}