function (container) {
    // check availability of JSON parser (not available in IE7 and older)
    if (!JSON) {
        throw new Error('Your browser does not support JSON. \n\n' +
            'Please install the newest version of your browser.\n' +
            '(all modern browsers support JSON).');
    }

    this.container = container;

    this.width = container.clientWidth;
    this.height = container.clientHeight;

    this.frame = document.createElement('div');
    this.frame.className = "jsoneditor-frame";
    this.frame.onclick = function (event) {
        // prevent default submit action when JSONFormatter is located inside a form
        JSONEditor.Events.preventDefault(event);
    };

    // create menu table
    this.head = document.createElement('table');
    this.head.className = 'jsoneditor-menu';
    var tbody = document.createElement('tbody');
    this.head.appendChild(tbody);
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var td = document.createElement('td');
    td.className = 'jsoneditor-menu';
    tr.appendChild(td);

    // create format button
    var buttonFormat = document.createElement('button');
    buttonFormat.innerHTML = 'Format';
    buttonFormat.title = 'Format JSON data, with proper indentation and line feeds';
    buttonFormat.className = 'jsoneditor-button';
    td.appendChild(buttonFormat);

    // create compact button
    var buttonCompact = document.createElement('button');
    buttonCompact.innerHTML = 'Compact';
    buttonCompact.title = 'Compact JSON data, remove all whitespaces';
    buttonCompact.className = 'jsoneditor-button';
    td.appendChild(buttonCompact);
    this.frame.appendChild(this.head);

    this.content = document.createElement('div');
    this.content.className = 'jsonformatter-content';
    this.frame.appendChild(this.content);

    this.textarea = document.createElement('textarea');
    this.textarea.className = "jsonformatter-textarea";
    this.textarea.spellcheck = false;
    this.content.appendChild(this.textarea);

    var formatter = this;
    var textarea = this.textarea;
    /* TODO: register onchange
    var onChange = function () {
        formatter._checkChange();
    };
    this.textarea.onchange = onChange;
    this.textarea.onkeyup = onChange;
    this.textarea.oncut = onChange;
    this.textarea.oncopy = onChange;
    this.textarea.onpaste = onChange;
    this.textarea.onchange = function () {
        console.log('onchange');
    }
    this.textarea.ondomcharacterdatamodified = function () {
        console.log('DOMCharacterDataModified');
    }
    this.textarea.ondomattrmodified = function () {
        console.log('DOMAttrModified');
    }
    addEventListener(this.textarea, 'DOMAttrModified', function (event) {
        console.log('DOMAttrModified', event);
    });
    addEventListener(this.textarea, 'DOMCharacterDataModified', function (event) {
        console.log('DOMCharacterDataModified', event);
    });
    */

    var me = this;
    buttonFormat.onclick = function (event) {
        try {
            textarea.value = JSON.stringify(JSON.parse(textarea.value), null, '  ');
        }
        catch (err) {
            me.onError(err);
        }
    };
    buttonCompact.onclick = function (event) {
        try {
            textarea.value = JSON.stringify(JSON.parse(textarea.value));
        }
        catch (err) {
            me.onError(err);
        }
    };

    this.container.appendChild(this.frame);
}