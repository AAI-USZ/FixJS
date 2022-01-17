function getDescription(mdown, fromIndex) {
    var desc = mdown.substr(fromIndex);
    desc = desc.replace(/^\n+/g, '').split(/\n\n/)[0]; //first paragraph

    //check if line starts with a header, hr or code block. fixes #10
    if ((/^(?:(?:[#=]+)|(?:[\-`\=]{3,})|(?: {4,}))/).test(desc)) {
        return null;
    }

    desc = showdownParse(desc.replace(/\n+/, ' '))
                    .replace(/<\/?p>/g, '') //remove paragraphs
                    .replace(/<\/?a[^>]*>/g, ''); //remove links since it breaks layout
    return desc;
}