function() {
    var $radio0 = createInputElement("radio0", "@Checked", "radio");
    $radio0.attr("name", "AwesomeRadios");

    var $radio1 = createInputElement("radio1", null, "radio");
    $radio1.attr("name", "AwesomeRadios");

    var $radio2 = createInputElement("radio2", null, "radio");
    $radio2.attr("name", "AwesomeRadios");

    var $radio3 = createInputElement("radio3", null, "radio");
    $radio3.attr("name", "AwesomeRadios");

    regula.bind();
    equals(regula.validate().length, 1, "The @Checked constraint must fail against an unchecked radio-button group");

    deleteElements();
}