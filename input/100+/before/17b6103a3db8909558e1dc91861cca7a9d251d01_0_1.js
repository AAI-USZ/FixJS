function handleChangesetRequest(client, message)
{
  //check if all ok
  if(message.data == null)
  {
    messageLogger.warn("Dropped message, changeset request has no data!");
    return;
  }
  if(message.padId == null)
  {
    messageLogger.warn("Dropped message, changeset request has no padId!");
    return;
  }
  if(message.data.granularity == null)
  {
    messageLogger.warn("Dropped message, changeset request has no granularity!");
    return;
  }
  if(message.data.start == null)
  {
    messageLogger.warn("Dropped message, changeset request has no start!");
    return;
  }
  if(message.data.requestID == null)
  {
    messageLogger.warn("Dropped message, changeset request has no requestID!");
    return;
  }
  
  var granularity = message.data.granularity;
  var start = message.data.start;
  var end = start + (100 * granularity);
  var padId = message.padId;
  
  //build the requested rough changesets and send them back
  getChangesetInfo(padId, start, end, granularity, function(err, changesetInfo)
  {
    ERR(err);
    
    var data = changesetInfo;
    data.requestID = message.data.requestID;
    
    client.json.send({type: "CHANGESET_REQ", data: data});
  });
}