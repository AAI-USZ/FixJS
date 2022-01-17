function submitbutton3(pressbutton) {

    var form = $('adminForm');

    // do field validation

    if (form.install_directory.value === "") {

        alert("<?php echo JText::_( 'NO_DIRECTORY'); ?>");

    } else {

        form.installtype.value = 'folder';

        form.submit();

    }

}