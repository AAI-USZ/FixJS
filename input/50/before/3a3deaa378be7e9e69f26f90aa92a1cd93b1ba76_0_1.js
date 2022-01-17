function addActiveClass(element){
    $(element).parent().siblings().removeClass('active')
    $(element).parent().addClass('active')
}