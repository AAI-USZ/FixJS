function setModeSelectionAll(event) {

        selectionMode = 'Exclusive';

        selected = [];

        $('.dataTable').dataTable().fnDraw(false);

    }