function rawText(element) {
        var text = element.html()
        return text.replace(/\n/g, '').replace(/<div><br><\/div>/g, '<br>').replace(/<div>/, '<br>').replace(/<\/div>/g, "")
      }