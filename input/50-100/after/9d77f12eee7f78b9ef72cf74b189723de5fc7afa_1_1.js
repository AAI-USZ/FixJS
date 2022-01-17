function(entry)
{
  this.responsecode = null;
  this.response_headers = null;
  this.response_headers_raw = null;
  this.responsebody = null;
  this.header_tokens = null; // This is set from template code, when it's first needed
  this.is_response = true; // Simpler for recognizing than dealing with comparing the constructor
  this.saw_responsefinished = false;

  // The following are duplicated from the entry to have them available directly on the response
  this.logger_entry_type = entry.type;
  this.logger_entry_id = entry.id;
  this.logger_entry_mime = entry.mime;
  this.logger_entry_is_finished = entry.is_finished;
  this.logger_entry_touched_network = entry.touched_network;
}