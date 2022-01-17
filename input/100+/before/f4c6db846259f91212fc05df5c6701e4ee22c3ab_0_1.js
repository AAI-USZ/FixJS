function(entry, do_raw)
{  
  var responsecode = entry.last_responsecode;
  if (responsecode && responsecode in cls.ResourceUtil.http_status_codes)
     responsecode = responsecode + " " + cls.ResourceUtil.http_status_codes[responsecode];

  // todo: not really pretty
  if (!this["_requests_responses_" + do_raw])
    this["_requests_responses_" + do_raw] = templates.requests_responses.bind(this, do_raw);

  var requests_responses = entry.requests_responses.map(this["_requests_responses_" + do_raw])

  if (do_raw)
  {
    return requests_responses;
  }

  return (
    ["table",
      ["tbody",
        ["tr",
          ["th", ui_strings.S_HTTP_LABEL_URL + ":"], ["td", entry.url]
        ],
        ["tr",
          ["th", ui_strings.S_HTTP_LABEL_METHOD + ":"],
          ["td", entry.touched_network ? entry.last_method : ui_strings.S_RESOURCE_ALL_NOT_APPLICABLE],
          "data-spec", "http#" + entry.last_method
        ],
        ["tr",
          ["th", ui_strings.M_NETWORK_REQUEST_DETAIL_STATUS + ":"],
          ["td",
            entry.touched_network && responsecode ? String(responsecode) : ui_strings.S_RESOURCE_ALL_NOT_APPLICABLE
          ],
         "data-spec", "http#" + entry.last_responsecode
        ]
      ],
      entry.touched_network ? [] : templates.did_not_touch_network(entry),
      requests_responses
    ]
  );
}