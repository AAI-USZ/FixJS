function(status, url)
      {
        if (status != 200)
        {
          opera.postError("Usertracker could not send heartbeat to tracker server at " + url + ". Got status " + status);
        }
      }