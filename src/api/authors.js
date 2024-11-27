const apiUrl=process.env.AUTHORS_API_URL
const apiKey=process.env.AUTHORS_API_KEY


export const fetchAuthors=async(params)=>{
    const response=await fetch(apiUrl+params, {
        headers:{
            apikey:apiKey,
            Aurhorization:`Bearer ${apiKey}`
        }
    }).then(res=>res.json())

    return response
}