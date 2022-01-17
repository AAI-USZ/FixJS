function(args){
    var paragraph = {};
    var splitP = /<(?=p|\/p)[^>]*?>/g;
    var englishFilterRe = /<(?!h\d|\/h\d)[^>]*?>/g;
    var jaFilterRe = /<(?!ruby|rb|rt|\/rb|\/rt|\/ruby|h\d|\/h\d)[^>]*?>/g;
    var andFilter = /&[^;]+?;/g;
    var supFilter = /<(?=sup).*?(?=\/sup)[^>]*?>/g;
    var newLineSplit = /[\s]*?\n[\s]*/g;
    var text, soup;
    text = args.en;
    soup = text.replace("\u201d", '"').replace("\u201c", '"').replace('\u2019', '\'')
    .replace(andFilter, '').replace(supFilter, '').replace(splitP, '\n')
    .replace(englishFilterRe, '').replace(newLineSplit, '\n').trim();
    paragraph.en = soup.split(newLineSplit);
    text = args.jp;
    soup = text.replace(andFilter, '').replace(supFilter, '').replace(splitP, '\n').replace(jaFilterRe, '').replace(newLineSplit, '\n').trim();
    paragraph.jp = soup.split(newLineSplit);
    return paragraph;
}