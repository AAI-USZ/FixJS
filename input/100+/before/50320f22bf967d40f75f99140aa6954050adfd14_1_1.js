function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.combobox(s);
    equals(s.value, 'beijing', 'test origin select\'s value should be "beijing".');
    combobox1.setByValue('shanghai');
    equals(s.value, 'shanghai', 'test origin select\'s value should change to "shanghai".');
    combobox1.reset();
    equals(s.value, 'beijing', 'test origin select\'s value should reset to "beijing".');
    combobox1.dispose();
    document.body.removeChild(div1);
}