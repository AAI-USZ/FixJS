function (content) {
        var cdata = this.createPCDataElement(content);
        if (cdata === null) {
          return null;
        }

        cdata.type = "CDATA";
        var htmlentities = {"<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;"},
            entity;
        for (entity in htmlentities) {
          if (!Object.hasOwnProperty(htmlentities,entity)) {
            content = content.replace(new RegExp(entity, "g"), htmlentities[entity]);
          }
        }
        cdata.cdata = content;
        return cdata;
      }