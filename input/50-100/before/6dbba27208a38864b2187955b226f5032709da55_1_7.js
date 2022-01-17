function(entry)
{
  this.method = null;
  this.request_headers = null;
  this.request_headers_raw = null;
  this.request_type = null;
  this.requestbody = null;
  this.boundary = "";
  this.was_responded = false;
  // Set from template code, when first needed:
  this.header_tokens = null;
  // Belongs here, unused though:
  this.requestID = entry.requestID;
}