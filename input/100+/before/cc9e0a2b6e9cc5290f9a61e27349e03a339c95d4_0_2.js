function (config, parserConfig) {

            var linksOverlay = {

                token:function (stream, state) {

                    if (stream.eatSpace()) {

                        return null;

                    }



                    //@todo Needs to be improved

                    var matches;

                    if (matches = stream.match(/https?:\/\/[^\\'"\n\t\s]*(?=[<"'\n\t\s])/, false)) {

                        //Eat all characters before http link

                        var m = stream.match(/.*(?=https?)/, true);

                        if (m) {

                            if (m[0].length > 0) {

                                return null;

                            }

                        }



                        var match = matches[0];

                        try {

                            var currentPos = stream.current().search(match);

                            while (currentPos < 0) {

                                var ch = stream.next();

                                if (ch === "\"" || ch === "'") {

                                    stream.backUp(1);

                                    break;

                                }



                                if (ch == null) {

                                    break;

                                }

                                currentPos = stream.current().search(match);

                            }



                            return "link";

                        }

                        catch (e) {

                            stream.skipToEnd();

                            return null;

                        }

                    }



                    stream.skipToEnd();

                }

            };



            return CodeMirror.overlayParser(CodeMirror.getMode(config, parserConfig.backdrop || postman.editor.mode), linksOverlay);

        }