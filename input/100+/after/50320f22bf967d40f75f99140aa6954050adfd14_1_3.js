function(){
    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.id = "div1";
    div1.innerHTML = '<select id="s"><option value="beijing">北京</option><option value="shanghai">上海</option><option value="guangzhou">广州</option><option value="tianjin">天津</option><option value="chongqing">重庆</option></select>';
    var s = baidu.dom.g('s');
    var combobox1 = magic.setup.combobox(s);
    equals(s.value, 'beijing', 'test origin select\'s value should be "beijing".');
    equals(getSelectedText(s), '北京', 'test origin select\'s text should be "北京".');
    combobox1.reload([{
        'value' : 'f', 'content' : '女'
    }, {
        'value' : 'm', 'content' : '男'
    }]);
    equals(s.value, 'f', 'test origin select\'s value should be "f".');
    equals(getSelectedText(s), '女', 'test origin select\'s text should be "女".');
    combobox1.setByValue('m');
    equals(s.value, 'm', 'test origin select\'s value should change to "m".');
    equals(getSelectedText(s), '男', 'test origin select\'s text should be "男".');
    combobox1.dispose();
    document.body.removeChild(div1);
}