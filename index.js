var request = require("request")

function get_stores() {
    var get_token_opts = {
        method: 'POST',
        url: 'https://api.yelp.com/oauth2/token',
        qs: {
            client_id: 'Ox5Pu2eeTPCQTz1VFZgQaw',
            client_secret: '2MfrirouhjUK2wJuZywjcpiETrwzZBNntimEFXJH1UnLNhC5TUZxz2wkSaAKI0cv'
        },
        headers: { 
            'content-type': 'application/x-www-form-urlencoded'
         }
     }

    request(get_token_opts, function (error, response, body) {
        if (error) throw new Error(error)
        body = JSON.parse(body)
        const access_token = body.access_token
      
        var options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco',
            headers:  {
                 authorization: 'Bearer 7YNVxtD05VyLgpbYcquMpBbG3xMXmPMkrYZE2ZufuARUOAfQrnKmK0CLIKTUwQjYul08XorNz4QxrAuGYIkbARi1r-z75Jei42z8FL-hb66JNEoV87jZra2qq3DMWHYx'
             }
         }

        request(options, function (err, res, bod) {
            if (err) throw new Error(err);

            console.log(bod);
        })
    })    
}

get_stores()