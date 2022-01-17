function rawText(element) {
        var text = element.html()
        return text.replace(/\n/g, '<br>').replace(/<div>/g, '\n').replace(/<\/div>/g, "")
      }