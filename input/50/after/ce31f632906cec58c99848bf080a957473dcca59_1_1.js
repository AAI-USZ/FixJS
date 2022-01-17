function(sid) {
        if (translations[locale][sid] && translations[locale][sid][1].length) {
          sid = translations[locale][sid][1];
        }
        return sid;
      }