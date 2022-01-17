function(err, stdout, stderr) {
      var filesArray
        , elementParsed
        , oneResult;
      
      filesArray = stdout.split("\n");
      filesArray.forEach(function(element, index) {
        console.log(2);
        if (element !== "") {
          elementParsed = element.split("||"),
          oneResult = new Result(elementParsed[0], elementParsed[1], elementParsed[2]);
          results.push(oneResult);
        }
      });
      callback(null, results);
    }