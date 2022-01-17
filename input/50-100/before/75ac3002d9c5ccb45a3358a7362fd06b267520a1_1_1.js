function updateEvent(the_event) {
    $.update(
      "/reservations/" + the_event.id,
      { reservation: { exchange_event_id: the_event.title,
                 cache_start_time: "" + the_event.start,
                 cache_end_time: "" + the_event.start,  //TODO -- the_event.end is null for some reason
                 person_id: the_event.description,
                 resource_id: 1
               }
      }
    );
}