function(fileName) {
    var html, htmlFilePath, jsFilePath, testJsFilePath, title;
    generateFolder(TEST_FOLDER_NAME);
    title = "" + fileName + ".js test";
    jsFilePath = "../" + fileName + ".js";
    testJsFilePath = "./" + TEST_FOLDER_NAME + "/" + fileName + "-test.js";
    htmlFilePath = "./" + TEST_FOLDER_NAME + "/" + fileName + "-test.html";
    if (!fs.existsSync(testJsFilePath)) {
      fs.writeFileSync(testJsFilePath, templates["qunit"]["js"]);
      console.log(" " + testJsFilePath + " is generated.");
    }
    if (!fs.existsSync(htmlFilePath)) {
      html = templates["qunit"]["html"].replace("#jsFilePath#", jsFilePath).replace("#testJsFilePath#", testJsFilePath.replace("/test", "")).replace("#title#", title);
      fs.writeFileSync(htmlFilePath, html);
      return console.log(" " + htmlFilePath + " is genrated.");
    }
  }