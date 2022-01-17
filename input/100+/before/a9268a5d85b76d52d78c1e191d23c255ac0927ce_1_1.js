function editCell(date, category, data){
    if(isNaN(data[category]))return
    var elm = $('table.'+date+' td.'+category)
    if(elm.length == 0)return;
    
    var clr = elm.css('background-color')

    if(clr == 'rgb(128, 128, 128)'){
        elm.css('background-color',ohmage.colors[data[category]])
    }else{
        $('.hiddenElm').css('background-color',ohmage.colors[data[category]])
        var clr2 = $('.hiddenElm').css('background-color')
        if(clr2 == 'transparent')return
        elm.css('background-color',aveClr(clr, clr2))
    }
}