const generateForm = document.querySelector(".generate-form")
const imageGallery = document.querySelector(".image-gallery")


const OPENAI_API_KEY = "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"
let isImageGenerating = false

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) =>{
        const imgCard = imageGallery.querySelectorAll(".img-card")[index]
        const imgElement = imgCard.querySelector("img")
        const downloadBtn = imgCard.querySelector(".download-btn")

        // Defina a fonte da imagem para os dados de imagem gerados por IA
        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`
        imgElement.src = aiGeneratedImg

        //Quando a imagem for carregada, remova a classe de carregamento realista e defina os atributos
        imgElement.onload = () =>{
            imgCard.classList.remove("loading")
            downloadBtn.setAttribute("href",aiGeneratedImg)
            downloadBtn.setAttribute("download",`${new Date().getTime()}.jpg`)
        }
    })
}

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try{
        // Envie uma solicitação à API OpenAI para gerar imagens com base nas entradas do usuário
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt:userPrompt,
                n:parseInt(userImgQuantity),
                size:"512x512",
                response_format:"b64_json"
            })
        })

        //lançar uma mensagem de erro se a resposta da API não for bem-sucedida
        if(!response.ok) throw new Error ("Failed to generate images! Please try again.")
            
        const { data } = await response.json() // Obtenha dados da resposta
        updateImageCard([...data])
    }catch (error){
        alert(error.message)
    } finally{
        isImageGenerating = false
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault()
    if(isImageGenerating) return
    isImageGenerating = true
    
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