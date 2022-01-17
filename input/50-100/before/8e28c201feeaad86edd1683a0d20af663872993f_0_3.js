function spoiler(textID) {
    var spoilertext = prompt("Please enter the spoiler text", " ");
    if (spoilertext && spoilertext != " ") {
        var linkTitle = prompt("Please enter the title", " ");
        if (spoilertext && linkTitle) wrap('spoiler', spoilertext, linkTitle, textID);
    }
}