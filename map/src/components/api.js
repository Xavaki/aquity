const callApi = async ( url, data, method ) =>{

    let requestParams = {
        method: method,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Content-Length': 299,
        },
    }
    if (method === "POST") {
        requestParams["body"] = JSON.stringify(data)
    }

    const response = await fetch(url, requestParams)
    const responseData = await response.json()
  return responseData
}

export default callApi;