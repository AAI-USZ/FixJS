function() {
        var testElement = this.testElement,
            iframe, iframeDocument, iframeStyle;

        if (!testElement) {
            iframe = document.createElement('iframe');
            iframeStyle = iframe.style;
            iframeStyle.setProperty('visibility', 'hidden', 'important');
            iframeStyle.setProperty('width', '0px', 'important');
            iframeStyle.setProperty('height', '0px', 'important');
            iframeStyle.setProperty('position', 'absolute', 'important');
            iframeStyle.setProperty('border', '0px', 'important');
            iframeStyle.setProperty('zIndex', '-1000', 'important');

            document.body.appendChild(iframe);
            iframeDocument = iframe.contentDocument;

            iframeDocument.open();
            iframeDocument.writeln('</body>');
            iframeDocument.close();

            this.testElement = testElement = iframeDocument.createElement('div');
            testElement.style.setProperty('position', 'absolute', '!important');
            iframeDocument.body.appendChild(testElement);
            this.testElementComputedStyle = window.getComputedStyle(testElement);
        }

        return testElement;
    }