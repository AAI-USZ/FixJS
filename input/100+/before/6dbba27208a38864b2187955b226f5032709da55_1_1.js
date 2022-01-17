function(id, resource_id, document_id, context_starttime)
{
  this.id = id;
  this.resource_id = resource_id;
  this.document_id = document_id;
  this.context_starttime = context_starttime;
  this.url = null;
  this.human_url = "No URL";
  this.result = null;
  this.mime = null;
  this.encoding = null;
  this.size = null;
  this.type = null;
  this.urltype = null;
  this.starttime = null;
  this.starttime_relative = null;
  this.endtime = null;
  this.requests_responses = [];
  this.last_responsecode = null;
  this.last_method = null;
  this.is_unloaded = false;
  this.is_finished = false;
  this.events = [];
  this.event_sequence = [];
  this.called_get_body = false;
}