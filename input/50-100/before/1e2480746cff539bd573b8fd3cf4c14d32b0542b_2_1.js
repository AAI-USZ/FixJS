function(item) {

        return {

            x: parseInt(item.Turn.x),

            y: parseInt(item.Turn.y),

            game_id: parseInt(item.Turn.game_id),

            creator: parseInt(item.Turn.creator),

            created: item.Turn.created,

            createdDate: new Date(item.Turn.created)

        };

    }