function(D, P){

        var TMPL_INFO = String.template(
                "<table>",
                "<tr><td style='text-align: right; font-weight: bold'>Char:</td><td><tt> $ch </tt></td></tr>",
                "<tr><td style='text-align: right; font-weight: bold'>Char code:</td><td> $code / 0x$codeHex </td></tr>",
                "<tr><td style='text-align: right; font-weight: bold'>Position:</td><td> $point </td></tr>",
                "<tr><td style='text-align: right; font-weight: bold'>Mark:</td><td> $mark </td></tr>",
                "<tr><td style='text-align: right; font-weight: bold'>Buffer size:</td><td> $sizeKB </td></tr>",
                "</table>"
        );

        D.KEYS = {
                // movement
                "ARROW_UP     && C-p"                     : "backward_line",
                "ARROW_DOWN   && C-n"                     : "forward_line",
                "ARROW_LEFT   && C-b"                     : "backward_char",
                "ARROW_RIGHT  && C-f"                     : "forward_char",
                "HOME"                                    : "beginning_of_indentation_or_line",
                "END && C-e"                              : "end_of_line",
                "C-a"                                     : "beginning_of_line",
                "C-HOME && M-<"                           : "beginning_of_buffer",
                "C-END && M->"                            : "end_of_buffer",
                "C-ARROW_RIGHT && M-f"                    : "forward_word",
                "C-ARROW_LEFT && M-b"                     : "backward_word",
                "C-ARROW_DOWN"                            : "forward_paragraph",
                "C-ARROW_UP"                              : "backward_paragraph",
                "C-l"                                     : "recenter_top_bottom",
                "PAGE_UP && M-v"                          : "scroll_up_half",
                "PAGE_DOWN && C-v"                        : "scroll_down_half",
                "WHEEL_UP"                                : "scroll_up",
                "WHEEL_DOWN"                              : "scroll_down",

                // transient mark
                "S-ARROW_UP       && S-C-p"               : "backward_line_mark",
                "S-ARROW_DOWN     && S-C-n"               : "forward_line_mark",
                "S-ARROW_LEFT     && S-C-b"               : "backward_char_mark",
                "S-ARROW_RIGHT    && S-C-f"               : "forward_char_mark",
                "S-C-ARROW_RIGHT  && S-M-f"               : "forward_word_mark",
                "S-C-ARROW_LEFT   && S-M-b"               : "backward_word_mark",
                "S-C-ARROW_DOWN"                          : "forward_paragraph_mark",
                "S-C-ARROW_UP"                            : "backward_paragraph_mark",
                "S-HOME"                                  : "beginning_of_indentation_or_line_mark",
                "S-C-a"                                   : "beginning_of_line_mark",
                "S-END"                                   : "end_of_line_mark",
                "S-C-HOME"                                : "beginning_of_buffer_mark",
                "S-C-END"                                 : "end_of_buffer_mark",

                // basic editing
                "BACKSPACE"                               : "backward_delete_char",
                "DELETE && C-d"                           : "delete_char",
                "ENTER && C-m"                            : "newline",
                "M-d && C-DELETE"                         : "kill_word",
                "C-BACKSPACE && M-BACKSPACE && M-DELETE"  : "backward_kill_word",
                "C-k"                                     : "kill_line",
                "C-y && S-INSERT"                         : "yank",
                "M-y"                                     : "yank_pop",
                "C-SPACE"                                 : "set_mark_command",
                "C-x C-x"                                 : "exchange_point_and_mark",
                "C-w"                                     : "kill_region",
                "M-t"                                     : "transpose_words",
                "C-t"                                     : "transpose_chars",
                "C-x C-t"                                 : "transpose_lines",
                "M-w"                                     : "copy_region_as_kill",
                "M-c"                                     : "capitalize_word",
                "M-u"                                     : "upcase_word",
                "M-l"                                     : "downcase_word",
                "F11"                                     : "nuke_trailing_whitespace",
                "TAB"                                     : "indent_line",
                "C-M-\\"                                  : "indent_region",
                "M-q"                                     : "fill_paragraph",
                "C-/ && C-x u && C-_ && C-z"              : "undo",
                "INSERT"                                  : "overwrite_mode",
                "M-s"                                     : "center_line",
                "M-/"                                     : "dabbrev_expand",
                "C-s"                                     : "isearch_forward",
                "C-r"                                     : "isearch_backward",
                "M-C-s"                                   : "isearch_forward_regexp",
                "M-C-r"                                   : "isearch_backward_regexp",
                "C-u"                                     : "universal_argument",
                "M-g"                                     : "goto_line",
                "C-x h"                                   : "mark_whole_buffer",
                "C-g"                                     : "keyboard_quit",
                "M-^"                                     : "delete_indentation",
                "M-;"                                     : "comment_dwim",

                // vertical editing
                "C-x r t"                                 : "string_rectangle",
                "C-x r c"                                 : "clear_rectangle",
                "C-x r k"                                 : "kill_rectangle",
                "C-x r y"                                 : "yank_rectangle",

                // buffers
                "C-x C-ARROW_RIGHT && C-x ARROW_RIGHT && C-TAB" : "next_buffer",
                "C-x C-ARROW_LEFT && C-x ARROW_LEFT && C-S-TAB" : "previous_buffer",
                "C-x b"                                         : "switch_to_buffer",
                "C-x k"                                         : "kill_buffer",

                // frames
                "C-x 0"                                   : "delete_frame",
                "C-x 1"                                   : "delete_other_frames",
                "C-x 2"                                   : "split_frame_vertically",
                "C-x 3"                                   : "split_frame_horizontally",
                "C-x o"                                   : "other_frame",
                "C-x l"                                   : "toggle_line_numbers",

                // eval
                "M-x"                                     : "execute_extended_command",

                // necessary evil
                "C-S-y"                                   : "yank_from_operating_system",
                "M-S-w"                                   : "copy_for_operating_system",

                // my stuff, sorry if these have different meanings in the standard Emacs keys
                "M-S-y"                                   : "yank_shift", // that's the reverse of yank_shift
                "C-c /"                                   : "close_last_xml_tag",
                "S-BACKSPACE"                             : "backward_delete_whitespace",
                "S-DELETE"                                : "delete_whitespace",
                "C-M-d"                                   : "delete_region_or_line",
                "M-ENTER"                                 : "start_next_paragraph",
                "M-S-q"                                   : "fill_paragraph_no_prefix",
                "C-M-|"                                   : "cperl_lineup",
                "C-F4"                                    : "kill_buffer",
                "M-ARROW_LEFT"                            : [ "windmove", "left" ],
                "M-ARROW_RIGHT"                           : [ "windmove", "right" ],
                "M-ARROW_UP"                              : [ "windmove", "up" ],
                "M-ARROW_DOWN"                            : [ "windmove", "down" ],

                // others
                "C-x =": function() {
                        var ch = this.charAt(), chname = ch;
                        if (ch == " ")
                                chname = "<SPACE>";
                        else if (ch == "\n")
                                chname = "<NEWLINE>";
                        else if (ch == "-")
                                chname = "<DASH>";
                        this.signalInfo(TMPL_INFO({
                                ch      : chname.htmlEscape(),
                                code    : ch.charCodeAt(0),
                                codeHex : ch.charCodeAt().hex(),
                                point   : this.point(),
                                mark    : this.markMarker.getPosition(),
                                size    : this.getCodeSize(),
                                sizeKB  : this.getCodeSize().formatBytes(2)
                        }), true);
                },

                // save file
                "C-x C-f"                                   : "open_file",
                "C-x C-s"                                   : "save_file"

        };

        P.defaultHandler = [ "self_insert_command" ];

}