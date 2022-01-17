function parse_instruments (xmlDoc)
{
    var list_instruments_obj = new Array ();

    var nodes_partlist = xmlDoc.getElementsByTagName ("part-list");
    var nodes_score_part = nodes_partlist[0].getElementsByTagName ("score-part");

    for (var i = 0; i < nodes_score_part.length; i++)
    {
        var instrument_obj = new Instrument ();
        //Part-name
        var nodes_part_name = nodes_score_part[i].getElementsByTagName ("part-name");
        instrument_obj._name_instrument= nodes_part_name[0].childNodes[0].nodeValue;

        instrument_obj._id_instrument = nodes_score_part[i].getAttribute("id");

        //midi-instruments
        var nodes_midi_instrument = nodes_score_part[i].getElementsByTagName ("midi-instrument");
        instrument_obj._id_midi = nodes_midi_instrument[0].getAttribute("id");

        var nodes_midi_channel = nodes_midi_instrument[0].getElementsByTagName ("midi-channel");
        instrument_obj._midi_channel = nodes_midi_channel[0].childNodes[0].nodeValue;

        var nodes_midi_program = nodes_midi_instrument[0].getElementsByTagName ("midi-program");
        instrument_obj._gm_instrument = nodes_midi_program[0].childNodes[0].nodeValue;
        if (instrument_obj._gm_instrument < 0)
        {
           instrument_obj._gm_instrument = 0;
        }



        list_instruments_obj.push(instrument_obj);
    }


    var nodes_part = xmlDoc.getElementsByTagName ("part");
    for (var i = 0; i < nodes_part.length; i++)
    {
       list_instruments_obj[i]._track_part = parse_track (nodes_part[i]);
       next_begin = 0;
    }
    return list_instruments_obj;
}