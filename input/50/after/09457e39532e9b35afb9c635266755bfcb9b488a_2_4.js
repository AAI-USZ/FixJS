function getValue() {
      var text = [];
      doc.iter(0, doc.size, function(line) { text.push(line.text); });
      return text.join("\n");
    }