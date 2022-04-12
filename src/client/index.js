import { getSentiment, updateUi, interpretResponse, validUrl } from './js/helpers'
import { handleSubmit } from './js/formHandler'
import logo from './images/logo.png'
import './styles/mvp.scss'
import './styles/loader.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/results.scss'

document.getElementById('logo').src = logo

export {
    getSentiment,
    handleSubmit,
    updateUi,
    interpretResponse,
    validUrl
}