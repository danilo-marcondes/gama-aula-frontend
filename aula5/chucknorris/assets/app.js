const URL_FETCH_CATEGORIES = 'https://api.chucknorris.io/jokes/categories'

const BASE_URL = 'https://api.chucknorris.io/jokes/'
const METHOD = 'GET'
const CONTENT_TYPE = 'application/json'
const MODE = 'cors'

async function getJoke(category) {
    const joke = await getRandomJokeFromCategory(category)

    let imgNode = document.getElementById('avatar')
    let jokeParagraph = document.getElementById('joke')

    imgNode.src = joke.icon_url
    jokeParagraph.innerHTML = joke.value
}

async function getJokeByStr() {
    let search = document.getElementById('search').value
    const joke = await getRandomJokeFromQuery(search)
    
    let imgNode = document.getElementById('avatar')
    let jokeParagraph = document.getElementById('joke')

    imgNode.src = joke.result[0].icon_url
    jokeParagraph.innerHTML = joke.result[0].value
    
}

async function getMultipleJokesByStr() {
    let search = document.getElementById('search').value
    const joke = await getRandomJokeFromQuery(search)
    
    limpaDiv()

    let divList = document.getElementById('root')

    for(let i=0; i<joke.total; i++){
        let imgNode = document.createElement('img')
        imgNode.src = joke.result[i].icon_url
        let jokeParagraph = document.createElement('p')
        jokeParagraph.innerHTML = joke.result[i].value
        divList.appendChild(imgNode)
        divList.appendChild(jokeParagraph)
    }
    
}

async function getRandomJoke() {

    try {
        const response = await fetch(`${BASE_URL}random`, {
            method: METHOD,
            mode: MODE,
            headers: {
                'Content-Type': CONTENT_TYPE
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


async function getRandomJokeFromCategory(category) {
    try {
        const response = await fetch(`${BASE_URL}random?category=${category}`, {
            method: METHOD,
            mode: MODE,
            headers: {
                'Content-Type': CONTENT_TYPE
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function getRandomJokeFromQuery(query) {
    try {
        const response = await fetch(`${BASE_URL}search?query=${query}`, {
            method: METHOD,
            mode: MODE,
            headers: {
                'Content-Type': CONTENT_TYPE
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

function limpaDiv(){
    let divList = document.getElementById('root')
    let childCount = document.getElementById('root').childElementCount
    for(i=0; i<childCount; i++)
        divList.removeChild(divList.childNodes[0])
    divList.appendChild(document.createElement('div'))
}