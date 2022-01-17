function () {
      // template data, if any, is available in 'this'
       d3.select('h1').style("color", "red");
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }