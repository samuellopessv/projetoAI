const generateForm = document.querySelector(".generate-form")
const imageGallery = document.querySelector(".image-gallery")

const handleFormSubmission = (e) => {
    e.preventDefault()
    
    //Obtenha a entrada do usuário e os valores de quantidade de imagem do formulário
    const userPrompt = e.srcElement[0].value
    const userImgQuantity = e.srcElement[1].value

    //Criação de marcação HTML para cartões de imagem com estado de carregamento
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
    `  <div class="img-card loading">
    <img src="imagens/loader.svg" alt="">
    <a href="#" class="download-btn">
        <img src="imagens/baixar.svg" alt="">
    </a>
    </div>`
    ).join("")

    imageGallery.innerHTML = imgCardMarkup    
}

generateForm.addEventListener("submit",handleFormSubmission)