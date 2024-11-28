.json files 
    -are read only on npm run
    -are saved on script termination

GET
    /api/cars/:id        -get car with specific id (params) 
    /api/cars/?short     -get all cars with preview photos and without desc (querry)
    /api/cars            -get all cars with all data

    /api/statistical     -get count of all cars available

    /api/videos          -get video links and descriptions

    /api/leaderboard:id  -get leaderboard with specific id (params)

POST

    /api/submit-score    -post score to leaderboard
        body:
             user string (max len. 21)
             score int (correct value mode:1 {score<5 && score>=0} mode:2 {score>=0})
             mode int (1 or 2)
             cheated boolean (leave undefined if unused)

    /api/login           -post username and password, recieve a authorization token
        body:
             username
             password
        response:
             {"token": $freshToken}

    /api/upload          -post car and a valid token, recieve a {message: 'Access granted'} and a 200 on when fully uploaded
        headers: 'authorization'
             value: $freshToken
        body:
             desc string
             title string
             price int
        files:
             keys/names not important
             
