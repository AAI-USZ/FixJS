function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.combobox(s);
    equals(s.value, 'beijing', 'test origin select\'s value should be "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.$setByIndex(1);
    equals(s.value, 'shanghai', 'test origin select\'s value should change to "shanghai".');
    equals(getSelectedText(s), '上海', 'test origin select\'s text should change to "上海".');
    combobox1.reset();
    equals(s.value, 'beijing', 'test origin select\'s value should reset to "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.dispose();
    document.body.removeChild(div1);
}