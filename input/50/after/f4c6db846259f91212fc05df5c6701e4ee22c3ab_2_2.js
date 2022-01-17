function(entry, renderer) {
          if (cls.ResourceUtil.http_status_codes[entry.current_responsecode])
            return String(cls.ResourceUtil.http_status_codes[entry.current_responsecode]);
          return renderer(entry);
        }