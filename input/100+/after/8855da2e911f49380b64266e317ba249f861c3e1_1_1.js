function() {
    var $radio0 = createInputElement("radio0", "@Checked", "radio");
    $radio0.attr("name", "AwesomeRadios");

    var $radio1 = createInputElement("radio1", "@Checked", "radio");
    $radio1.attr("name", "AwesomeRadios");

    var $radio2 = createInputElement("radio2", "@Checked", "radio");
    $radio2.attr("name", "AwesomeRadios");

    var $radio3 = createInputElement("radio3", "@Checked", "radio");
    $radio3.attr("name", "AwesomeRadios");

    regula.bind();
    var constraintViolations = regula.validate();
    equals(constraintViolations.length, 1, "The @Checked constraint must return one violation per radio-button group");
    equals(constraintViolations[0].failingElements.length, 4, "There must be four failing-elements");

    deleteElements();
}