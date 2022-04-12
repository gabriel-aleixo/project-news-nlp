const getSentiment = async (url) => {

    console.log(url)

    const body = {}
    body.url = url

    const requestOptions = {
        method: 'POST', //POST, GET, PUT, DEL...
        credentials: 'same-origin',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    try {
        const data = await fetch('http://localhost:8081/request', requestOptions)

        const results = await data.json();
        console.log(results)

        const response = {}
        response.score_tag = results.score_tag
        response.agreement = results.agreement
        response.subjectivity = results.subjectivity
        response.confidence = results.confidence
        response.irony = results.irony

        console.log(response)
        return response;

    } catch (err) {
        console.error(err)
    }

}

const interpretResponse = response => {

    const dictionary = {
        score_tag:
        {
            descr: 'Text Polarity',
            values:
            {
                'P+': 'strong positive',
                'P': 'positive',
                'NEU': 'neutral',
                'N': 'negative',
                'N+': 'strong negative',
                'NONE': 'without polarity'
            },
        },
        agreement:
        {
            descr: 'Agreement between the sentiments detected in the text',
            values:
            {
                AGREEMENT: 'the different elements have the same polarity.',
                DISAGREEMENT: 'there is disagreement between the different elements\' polarity.'
            },
        },
        subjectivity:
        {
            descr: 'Subjectivity of the text',
            values:
            {
                OBJECTIVE: 'the text does not have any subjectivity marks.',
                SUBJECTIVE: 'the text has subjective marks.'
            }
        },
        confidence:
        {
            descr: 'Confidence associated with the sentiment analysis. Ranges from 0-100.'
        },
        irony:
        {
            descr: 'Irony of the text',
            values:
            {
                NONIRONIC: 'the text does not have any irony marks.',
                IRONIC: 'the text has irony marks.'
            }
        }

    }

    const data = {};
    try {

        for (const [key, value] of Object.entries(response)) {
            console.log(`${key}: ${value}`);
            if (!isNaN(value)) {
                let descr = dictionary[key].descr
                let _value = value
                data[descr] = _value
                continue
            }
            let descr = dictionary[key].descr
            let _value = dictionary[key].values[value]
            data[descr] = _value
        }

    } catch (err) {
        console.error(err)
        return
    }

    return data;

}

const updateUi = async (data, url) => {

    const resultArea = document.getElementById('results')

    try {

        const titleNode = document.createElement('small');
        titleNode.textContent = url;

        const container = document.createElement('aside');
        resultArea.appendChild(titleNode)

        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value}`);

            let title = document.createElement('h3');
            title.textContent = key;
            let descriptor = document.createElement('p');
            descriptor.textContent = value;
            container.appendChild(title);
            container.appendChild(descriptor);
        }
        resultArea.appendChild(container);

        return true;

    } catch (err) {
        console.log(err)
    }

}

const validUrl = (link) => {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(link)) {
        window.alert("Enter a valid url");
        return false;
    } else {
        return true;
    }
}

export { getSentiment, updateUi, interpretResponse, validUrl }
