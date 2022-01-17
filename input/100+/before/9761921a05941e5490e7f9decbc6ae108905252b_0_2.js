function(doc, wind) {
        var word = this.get_selected_word(wind);
        if (word != "") {
            var MAIN_DIV = "main-div-mdict-mitnk";
            var WORD_DIV = 'word-div-mdict-mitnk';
            var main_div = this.create_main_div(doc, MAIN_DIV);
            var word_div = this.create_word_div(doc, WORD_DIV);
            word_div.innerHTML = 'Loading';
            main_div.appendChild(word_div);

            var url = 'http://mitnk.com/dict/' + word + '/?api=1';
            this.request_define(url, word_div);

            var code = "if (document.getElementById('" + MAIN_DIV + "') != null){" + "document.body.removeChild(document.getElementById('" + MAIN_DIV + "'))}"
            if (doc.body.getAttribute("onclick") == undefined) {
                doc.body.setAttribute(
                    "onclick",
                    code
                );
            }
        }
    }