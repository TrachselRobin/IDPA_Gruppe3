const { url } = require("inspector")

function send_request(base_url, options) {
    /*
    const OPTIONS = [
        "station=" + STATION,
        "limit=" + LIMIT
    ]
    
    how it should look: "station=station=Horgen&limit=1"
    */
    const options_string = options.join("&")
    const url = base_url + "?" + options_string
    console.log(url)

    return url
}