const fetch = require('node-fetch')
const FormData = require('form-data');

const callMeaningCloud = async (url, lang) => {

    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("url", url);
    formdata.append("lang", lang);  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
    try {
        const status = await response.status;
        const body = await response.json();
        return { status, body };

    } catch (error) {
        console.log("error", error)
        return error;
    }

}

module.exports = { callMeaningCloud }