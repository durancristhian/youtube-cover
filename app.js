/* global domtoimage */

const generateButtonElement = document.getElementById('generate')
const inputs = document.getElementsByClassName('js-input')

generateButtonElement.addEventListener('click', event => {
    event.preventDefault()

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('disabled', 'disabled')
        inputs[i].classList.add('o-30')
    }

    const title = document.getElementById('title').value || ''
    const subtitle = document.getElementById('subtitle').value || ''
    const footer = document.getElementById('footer').value || ''
    const bgColor = document.getElementById('bgColor').value || '#fff'
    const bgImage = document.getElementById('bgImage').value || ''

    const coverElement = document.getElementById('cover')
    coverElement.innerHTML = `<div id="preview" class="align-center cover flex flex-column justify-center tc" style="background-color: ${bgColor}; background-image: ${bgImage}; height: 100%;">
        <h2 class="dark-gray f1 mb4 mt0 normal sans-serif ttu">${title}</h2>
        <h3 class="dark-gray f3 fw3 ma0 sans-serif">${subtitle}</h3>
        <p class="fw2 mb0 mt6 sans-serif silver">${footer}</p>
    </div>`

    domtoimage.toJpeg(document.getElementById('cover'))
        .then(dataUrl => {
            const link = document.createElement('a')
            link.download = 'cover.jpeg'
            link.href = dataUrl
            link.click()

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].removeAttribute('disabled')
                inputs[i].classList.remove('o-30')
            }
        })
        .catch(error => {
            alert('It was an error. Please, try again.')

            // eslint-disable-next-line no-console
            console.error(error)
        })
})
