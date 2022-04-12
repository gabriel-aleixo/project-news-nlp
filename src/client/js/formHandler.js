import { getSentiment, interpretResponse, updateUi, validUrl } from "./helpers";

const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)

    const resultArea = document.getElementById('results')
    while (resultArea.hasChildNodes()) {
        resultArea.firstChild.remove()
    }

    let url = document.getElementById('url').value
    console.log(url)

    const isValid = validUrl(url)

    if (!isValid) {
        console.log('entrou')
        return;

    } else {

        const loader = document.querySelector('.loader')
        loader.style.display = ""

        const response = await getSentiment(url)

        const data = interpretResponse(response)

        updateUi(data, url)

        return loader.style.display = "none"
    }


}

export { handleSubmit }
