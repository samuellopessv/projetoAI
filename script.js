const generateForm = document.querySelector(".generate-form")
const imageGallery = document.querySelector(".image-gallery")

const OPENAI_API_KEY = "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"

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try{
        // Envie uma solicitação à API OpenAI para gerar imagens com base nas entradas do usuário
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers : {
                "Content-Type: application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt:userPrompt,
                n:userImgQuantity,
                size:"512x512",
                response_format:"b64_json"
            })
        })
            
        
    }catch (error){
        console.log(error)
    }
}

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
    generateAiImages(userPrompt, userImgQuantity)
}

generateForm.addEventListener("submit",handleFormSubmission)