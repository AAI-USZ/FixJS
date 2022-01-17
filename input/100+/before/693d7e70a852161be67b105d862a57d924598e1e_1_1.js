function (file, lint, colorize, terse, quiet, tracker) {
    'use strict';

    var options = [], key, value, line,
        i, len, pad, e, errors,
        fileMessage, okMessage, errorMessage;

    for (key in lint.options) {
        value = lint.options[key];
        options.push(key + ": " + value);
    }

    fileMessage = ((colorize) ? color.bold(file) : file);
    okMessage =  ((colorize) ? color.green('ok') : 'ok');
    errorMessage = terse ? ((colorize) ? color.red('err') : 'err') : ((colorize) ? color.red('error(s)') : 'error(s)');
    pad = ' ';

    while (file.length + pad.length < 25) {
        pad += ' ';
    }

    if (quiet) {
        errors = false;
    } else {
        errors = tracker.results[tracker.results.length - 1];
    }

    if (!lint.ok) {
        if (terse) {
            len = lint.errors.length;
            for (i = 0; i < len; i += 1) {
                e = lint.errors[i];
                if (e) {
                    log(fileMessage + (quiet ? '' : pad + errorMessage) + ((colorize) ? color.grey(':' + e.line + ' ') : ':' + e.line + ' ') + e.reason);
                }
            }
        } else {
            log(fileMessage + pad + errorMessage);
            log('================================');
            len = lint.errors.length;
            for (i = 0; i < len; i += 1) {
                e = lint.errors[i];
                if (e) {
                    log(' ' + e.line + '\t' + ((colorize) ? color.red(e.reason) : e.reason));
                    log(' ' + e.character + '\t' + (e.evidence || '').replace(/^\s+|\s+$/, ""));
                    log(' ---');
                }
            }
            log('Total ' + len + ' errors');
            log('================================');
                /*pad = ((colorize) ? color.grey(' #') : ' #') + String(i + 1);
                while (pad.length < 3) {
                    pad = ' ' + pad;
                }
                e = lint.errors[i];
                if (e) {
                    line = ' // Line ' + e.line + ', Pos ' + e.character;

                    log(pad + '\t' + ((colorize) ? color.yellow(e.reason) : e.reason));
                    log('\t' + (e.evidence || '').replace(/^\s+|\s+$/, "") +
                            ((colorize) ? color.grey(line) : line));
                }*/
            //}
            if (tracker.total > 1) {
                log('');
            }
        }
    } else {
        if (!quiet) {
            log(fileMessage + pad + okMessage);
        }
    }
    return lint.ok;
};
