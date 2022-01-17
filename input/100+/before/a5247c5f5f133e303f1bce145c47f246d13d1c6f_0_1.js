function LEMval(alias)
{
    // first find out whether it is using a suffix
    var str = new String(alias);
    var varName = alias;
    var suffix = 'code';    // the default

    /* If passed a number, return that number */
    if (str == '') return '';
    newval = str;
    if (LEMradix === ',') {
        newval = str.split(',').join('.');
    }
    if (newval == parseFloat(newval)) {
        return +newval;
    }

    if (str.match(/^INSERTANS:/)) {
        suffix = 'shown';
        varName = varName.substr(10);
    }
    else if (str.match(/\.(code|gid|grelevance|gseq|jsName|mandatory|NAOK|qid|qseq|question|readWrite|relevanceStatus|relevance|rowdivid|sgqa|shown|type|valueNAOK|value)$/)) {
        varName = str.replace(/\.(code|gid|grelevance|gseq|jsName|mandatory|NAOK|qid|qseq|question|readWrite|relevanceStatus|relevance|rowdivid|sgqa|shown|type|valueNAOK|value)$/,'')
        suffix = str.replace(/^(.+)\./,'');
    }

    jsName = LEMalias2varName[varName];
    attr = LEMvarNameAttr[jsName];
    if ((suffix.match(/^code|NAOK|shown|valueNAOK|value$/)) && attr.qid!='') {
        if (!LEMval(varName + '.relevanceStatus')) {
            return '';
        }
    }
    var whichJsName;    // correct name whether on- or off-page
    if (LEMmode=='survey' || (LEMmode=='group' && attr.gseq == LEMgseq) || (LEMmode=='question' && attr.qid == LEMqid)) {
        whichJsName = (typeof attr.jsName_on === 'undefined') ? attr.jsName : attr.jsName_on;
    }
    else {
        whichJsName = attr.jsName;
    }
    if (whichJsName === null || typeof document.getElementById(whichJsName) === 'undefined' || document.getElementById(whichJsName) === null) {
        an_error = true;    // this line is here to make debugging easier
        return '';
    }

    // values should always be stored encoded with htmlspecialchars()
    switch (suffix) {
        case 'relevanceStatus': {
            grel = qrel = sgqarel = 1;
            if (!(typeof attr.gseq === 'undefined') && !(document.getElementById('relevanceG' + attr.gseq) === null)) {
                grel = parseInt(document.getElementById('relevanceG' + attr.gseq).value);
            }
            if (!(typeof attr.qid === 'undefined') && !(document.getElementById('relevance' + attr.qid) === null)) {
                qrel = parseInt(document.getElementById('relevance' + attr.qid).value);
            }
            if (!(typeof attr.rowdivid === 'undefined') && !(document.getElementById('relevance' + attr.rowdivid) === null)) {
                sgqarel = parseInt(document.getElementById('relevance' + attr.rowdivid).value);
            }
            return (grel && qrel && sgqarel);
        }
        case 'shown': {
            value = htmlspecialchars_decode(document.getElementById(whichJsName).value);
            switch(attr.type)
            {
                case 'G': //GENDER drop-down list
                case 'Y': //YES/NO radio-buttons
                case 'C': //ARRAY (YES/UNCERTAIN/NO) radio-buttons
                case 'E': //ARRAY (Increase/Same/Decrease) radio-buttons
                    shown = (typeof attr.answers[value] === 'undefined') ? '' : attr.answers[value];
                    break;
                case '!': //List - dropdown
                case 'L': //LIST drop-down/radio-button list
                case 'O': //LIST WITH COMMENT drop-down/radio-button list + textarea
                case 'H': //ARRAY (Flexible) - Column Format
                case 'F': //ARRAY (Flexible) - Row Format
                case 'R': //RANKING STYLE
                    if (attr.type == 'O' && varName.match(/comment$/)) {
                        answer = value;
                    }
                    else if ((attr.type == 'L' || attr.type == '!') && varName.match(/_other$/)) {
                        answer = value;
                    }
                    else {
                        which_ans = '0~' + value;
                        if (typeof attr.answers[which_ans] === 'undefined') {
                            answer = value;
                        }
                        else {
                            answerParts = attr.answers[which_ans].split('|');
                            answerParts.shift();    // remove the first element
                            answer = answerParts.join('|');
                        }
                    }
                    shown = answer;
                    break;
                case '1': //Array (Flexible Labels) dual scale  // need scale
                    prefix = (attr.jsName.match(/#1$/)) ? '1' : '0';
                    which_ans = prefix + '~' + value;
                    if (typeof attr.answers[which_ans] === 'undefined') {
                        answer = '';
                    }
                    else {
                        answerParts = attr.answers[which_ans].split('|');
                        answerParts.shift();    // remove the first element
                        answer = answerParts.join('|');
                    }
                    shown = answer;
                    break;
                case 'A': //ARRAY (5 POINT CHOICE) radio-buttons
                case 'B': //ARRAY (10 POINT CHOICE) radio-buttons
                case ':': //ARRAY (Multi Flexi) 1 to 10
                case '5': //5 POINT CHOICE radio-buttons
                case 'N': //NUMERICAL QUESTION TYPE
                case 'K': //MULTIPLE NUMERICAL QUESTION
                case 'Q': //MULTIPLE SHORT TEXT
                case ';': //ARRAY (Multi Flexi) Text
                case 'S': //SHORT FREE TEXT
                case 'T': //LONG FREE TEXT
                case 'U': //HUGE FREE TEXT
                case 'D': //DATE
                case '*': //Equation
                case 'I': //Language Question
                case '|': //File Upload
                case 'X': //BOILERPLATE QUESTION
                    shown = value; // what about "no answer"?
                    break;
                case 'M': //Multiple choice checkbox
                case 'P': //Multiple choice with comments checkbox + text
                    if (typeof attr.question === 'undefined' || value == '') {
                        shown = '';
                    }
                    else {
                        if (attr.type == 'P' && varName.match(/comment$/)) {
                            shown = value;
                        }
                        else {
                            shown = htmlspecialchars_decode(attr.question);
                        }
                    }
                    break;
            }
        }
            return htmlspecialchars_decode(shown);
        case 'gid':
            return attr.gid;
        case 'grelevance':
            return attr.grelevance;
        case 'mandatory':
            return attr.mandatory;
        case 'qid':
            return attr.qid;
        case 'question':
            return htmlspecialchars_decode(attr.question);
        case 'readWrite':
            return attr.readWrite;
        case 'relevance':
            return htmlspecialchars_decode(attr.relevance);
        case 'sgqa':
            return attr.sgqa;
        case 'type':
            return attr.type;
        case 'gseq':
            return attr.gseq;
        case 'qseq':
            return attr.qseq;
        case 'jsName':
            return whichJsName;
        case 'code':
        case 'NAOK':
        case 'value':
        case 'valueNAOK':
        {
            value = htmlspecialchars_decode(document.getElementById(whichJsName).value);
            if (value === '') {
                return '';
            }

            if (suffix == 'value' || suffix == 'valueNAOK') {
                // if in assessment mode, this returns the assessment value
                // in non-assessment mode, this is identical to .code
                switch (attr.type) {
                    case '!': //List - dropdown
                    case 'L': //LIST drop-down/radio-button list
                    case 'O': //LIST WITH COMMENT drop-down/radio-button list + textarea
                    case 'H': //ARRAY (Flexible) - Column Format
                    case 'F': //ARRAY (Flexible) - Row Format
                    case 'R': //RANKING STYLE
                        if (attr.type == 'O' && varName.match(/comment$/)) {
//                            value = value;
                        }
                        else if ((attr.type == 'L' || attr.type == '!') && varName.match(/_other$/)) {
//                            value = value;
                        }
                        else {
                            which_ans = '0~' + value;
                            if (typeof attr.answers[which_ans] === 'undefined') {
                                value = '';
                            }
                            else {
                                answerParts = attr.answers[which_ans].split('|');
                                value = answerParts[0];
                            }
                        }
                        break;
                    case '1': //Array (Flexible Labels) dual scale  // need scale
                        prefix = (attr.jsName.match(/#1$/)) ? '1' : '0';
                        which_ans = prefix + '~' + value;
                        if (typeof attr.answers[which_ans] === 'undefined') {
                            value = '';
                        }
                        else {
                            answerParts = attr.answers[which_ans].split('|');
                            value = answerParts[0];
                        }
                        break;
                }
            }

            if (typeof attr.onlynum !== 'undefined' && attr.onlynum==1) {
                newval = value;
                if (LEMradix === ',') {
                    newval = value.split(',').join('.');
                }
                if (newval != parseFloat(newval)) {
                    newval = '';
                }
                return +newval;
            }
            else if (isNaN(value)) {
                if (value==='false') {
                    return '';  // so Boolean operations will treat it as false. In JavaScript, Boolean("false") is true since "false" is not a zero-length string
                }
                return value;
            }
            else {
                return +value;  // convert it to numeric return type
            }
        }
        case 'rowdivid':
            if (typeof attr.rowdivid === 'undefined' || attr.rowdivid == '') {
                return '';
            }
            return attr.rowdivid;
        default:
            return 'Unknown Attribute: ' . suffix;
    }
}