function decodeRefererV1 (referer) {
      return referer.replace(HOST_PATTERN, function(full, scheme, domain, _, suffix) {
          return scheme + decodeHost(domain) + (suffix && decodePathAndQuery(suffix) || '');
      });
    }