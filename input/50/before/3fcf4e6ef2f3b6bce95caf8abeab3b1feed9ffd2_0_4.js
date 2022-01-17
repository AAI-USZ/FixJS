function() {
      console.log("updating preview in Mode " + this.name);
      this.htmlDiv.html(this.toHTML() || "<p>&nbsp;</p>");
    }