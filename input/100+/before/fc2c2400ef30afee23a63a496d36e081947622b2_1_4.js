function(sagecellInfo) {
    var inputLocation = $(sagecellInfo.inputLocation);
    var outputLocation = $(sagecellInfo.outputLocation);
    var editor = sagecellInfo.editor;
    var replaceOutput = sagecellInfo.replaceOutput;
    var sageMode = inputLocation.find(".sagecell_sageModeCheck");
    var textArea = inputLocation.find(".sagecell_commands");
    var files = [];
    var editorData, temp;
    if (! sagecellInfo.sageMode) {
        sageMode.attr("checked", false);
    }

    temp = this.renderEditor(editor, inputLocation);
    editor = temp[0];
    editorData = temp[1];
    inputLocation.find(".sagecell_editorToggle").click(function () {
        temp = sagecell.toggleEditor(editor, editorData, inputLocation);
        editor = temp[0];
        editorData = temp[1];
        return false;
    });
    inputLocation.find(".sagecell_advancedTitle").click(function () {
        inputLocation.find(".sagecell_advancedFields").slideToggle();
        return false;
    });
    function fileRemover(i, li) {
        return function () {
            delete files[i];
            li.parentNode.removeChild(li);
        }
    }
    var fileButton = inputLocation.find(".sagecell_addFile");
    var input = sagecell.util.createElement("input",
            {"type": "file", "multiple": "true", "name": "file"});
    if (navigator.userAgent.indexOf("MSIE") === -1) {
        // Create an off-screen file input box if not in Internet Explorer
        input.style.position = "absolute";
        input.style.top = "0px";
        input.style.left = "-9999px";
        fileButton.click(function () {
            input.click();
        });
        document.body.appendChild(input);
    } else {
        // Put the input box in the file upload box in Internet Explorer
        fileButton.remove();
        inputLocation.find(".sagecell_clearFiles").before(input,
                document.createElement("br"));
    }
    function change() {
        var delButton = sagecell.util.createElement("span",
                {"title": "Remove file"});
        $(delButton).addClass("sagecell_deleteButton");
        var fileList = inputLocation.find(".sagecell_fileList");
        var li = document.createElement("li");
        li.appendChild(delButton.cloneNode(false));
        li.appendChild(document.createElement("span"));
        $(li.childNodes[1]).addClass("sagecell_fileName");
        if (input.files) {
            for (var i = 0; i < input.files.length; i++) {
                if (window.FormData) {
                    var f = li.cloneNode(true);
                    files.push(input.files[i]);
                    f.childNodes[1].appendChild(
                            document.createTextNode(input.files[i].name));
                    $(f.childNodes[0]).click(fileRemover(files.length - 1, f));
                    fileList.append(f);
                } else {
                    li.childNodes[1].appendChild(
                            document.createTextNode(input.files[i].name));
                    if (i < input.files.length - 1) {
                        li.childNodes[1].appendChild(document.createElement("br"));
                    }
                }
            }
            if (!window.FormData) {
                files.push(input);
                $(li.childNodes[0]).click(fileRemover(files.length - 1, li));
                if (input.files.length > 1) {
                    li.childNodes[0].setAttribute("title", "Remove files")
                }
                fileList.append(li);
            }
        } else {
            files.push(input);
            li.childNodes[1].appendChild(document.createTextNode(
                    input.value.substr(input.value.lastIndexOf("\\") + 1)));
            $(li.childNodes[0]).click(fileRemover(files.length - 1, li));
            fileList.append(li);
        }
        var newInput = sagecell.util.createElement("input",
            {"type": "file", "multiple": "true", "name": "file"});
        if (navigator.userAgent.indexOf("MSIE") === -1) {
            newInput.style.position = "absolute";
            newInput.style.top = "0px";
            newInput.style.left = "-9999px";
        }
        $(newInput).change(change);
        input.parentNode.replaceChild(newInput, input);
        input = newInput;
    }
    $(input).change(change);
    inputLocation.find(".sagecell_clearFiles").click(function () {
        files = [];
        inputLocation.find(".sagecell_fileList").empty();
        return false;
    });
    sagecellInfo.submit = function(evt) {
        var id = $(evt.target).data("id");
        if (!id) {
            $(evt.target).data("id", id = IPython.utils.uuid());
        }
        if (replaceOutput && sagecell.last_session[id]) {
            $(sagecell.last_session[id].session_container).remove();
        }
        var session = new sagecell.Session(outputLocation, false);
        session.execute(textArea.val());
        sagecell.last_session[id] = session;
        // TODO: kill the kernel when a computation with no interacts finishes,
        //       and also when a new computation begins from the same cell
        outputLocation.find(".sagecell_output_elements").show();
    };

    inputLocation.find(".sagecell_evalButton").click(sagecellInfo.submit);
    if (sagecellInfo.code && sagecellInfo.autoeval) {
        sagecellInfo.submit();
    }
    if (sagecellInfo.callback) {
        sagecellInfo.callback();
    }
    return sagecellInfo;
}