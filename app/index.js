var request = require("request")

var access_token;

exports.init = function(app) {
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
        access_token = body.access_token

    })    
}

exports.search = function(req, res) {
    var options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?limit=3&term=' + req.query.term + 
             '&latitude=' + req.query.latitude + 
             '&longitude=' + req.query.longitude,
        headers:  {
             authorization: 'Bearer ' + access_token
         }
     }

    request(options, function (err, response, body) {
        if (err) throw new Error(err);

        res.send(body)
    })

}