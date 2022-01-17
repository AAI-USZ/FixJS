function(sid) {
        return (translations[locale][sid] ? translations[locale][sid][1] : sid);
      }