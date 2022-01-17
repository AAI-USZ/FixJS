function () {

            this.settings = {
                orientation: $.Storage.get('console.orientation') || 'vertical',
                eastSize: $.Storage.get('console.eastSize') || '50%',
                southSize: $.Storage.get('console.southSize') || '50%',
                wrap: $.Storage.get('console.wrap') !== 'false'
            };

            this.initLayout();
            this.initEditor();
            this.initWrap();

            $('#editor button.submit').click($.proxy(this.executeCode, this));
            $('#editor button.clear').click($.proxy(this.clearEditor, this));
            $('.results button.clear').click($.proxy(this.clearResults, this));

            $('button.vertical').click($.proxy(function (event) { this.showOrientation('vertical'); }, this));
            $('button.horizontal').click($.proxy(function (event) { this.showOrientation('horizontal'); }, this));

            $(document).bind('keydown', 'Ctrl+return', $.proxy(this.executeCode, this));
            $(document).bind('keydown', 'esc', $.proxy(this.clearResults, this));

            this.showOrientation(this.settings.orientation);
        }