function caa_response_mediator(response, textStatus, jqXHR) {
					            return INNERCONTEXT.UTILITY.processCAAResponse(response, textStatus, jqXHR, { $row: $row });
					        }