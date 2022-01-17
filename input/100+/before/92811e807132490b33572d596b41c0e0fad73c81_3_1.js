function(exports, $)
{
    var ichie = exports.IchieJs.create({
        main_container: '.ichiejs-main-stage',
        preview_container: '.ichiejs-preview-stage',
        width: 550,
        height: 350
    });

    ichie.launch('images/Kitten_Desktop.jpg', function()
    {
        $('.trigger-copy').click(function()
        {
            ichie.copySelection();
        });

        $('.trigger-paste').click(function()
        {
            ichie.pasteClipboard();
        });

        $('.trigger-undo').click(function()
        {
            ichie.undo();
        });

        $('.trigger-redo').click(function()
        {
            ichie.redo();
        });

        $('.trigger-crop').click(function()
        {
            ichie.crop();
        });

        $('.trigger-download').click(function()
        {
            ichie.downloadAsImage();
        });

        $('.trigger-resize').click(function()
        {
            $('#resize-modal').modal('show');
        });

        $('.trigger-filter').click(function()
        {
            ichie.filter(
                $(this).data('filter-name')
            );
        });

        $('.trigger-keep-ratio').click(function()
        {
            ichie.setSelectMode(
                $(this).hasClass('active') ? 'default' : 'keep-ratio'
            );
        });

        $('.trigger-toggle-selection').click(function()
        {
            if ($(this).hasClass('active'))
            {
                ichie.hideSelection();
            }
            else
            {
                ichie.showSelection();
            }
        });
    });
}