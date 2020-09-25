//variables
quoteList = document.querySelector('#quote-list')
quoteForm = document.querySelector('#new-quote-form')

//listeners
quoteForm.addEventListener('submit', submitQuote)

//invoked.functions
function main() {
   loadQuotes()
   clickListener()
}
main()

function clickListener() {
    quoteList.addEventListener('click', function(event){
        if (event.target.className === 'delete-btn') {
            deleteQuote(event)
        }
        else {
            likeQuote(event)
        }
    })
}

//main.functions
function loadQuotes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(quotes => {
        quotes.forEach(function(quote){
        quoteList.innerHTML += `
        <li class='quote-card'>
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button data-id='${quote.id}' class='like-btn'>Likes: <span>0</span></button>
        <button data-id='${quote.id}' class='delete-btn'>Delete</button>
        </blockquote>
        </li>
        `
        })
    })
}

function submitQuote(event) {
    event.preventDefault()
    const content = event.target[0].value
    const authorName = event.target[1].value
    const newQuote = {quote: content, author: authorName}

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newQuote)
    }
    fetch('http://localhost:3000/quotes', reqObj)
    .then(resp => resp.json())
    .then(quote => {
        quoteList.innerHTML += `
        <li class='quote-card'>
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button data-id='${quote.id}' class='like-btn'>Likes: <span>0</span></button>
        <button data-id='${quote.id}' class='delete-btn'>Delete</button>
        </blockquote>
        </li>
        `
    })
}

function deleteQuote(event) {
    const quoteCard = event.target.parentElement.parentElement
    const quoteId = event.target.dataset.id

    const reqObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(`http://localhost:3000/quotes/${quoteId}`, reqObj)
    .then(resp => resp.json())
    .then(quote => {
        quoteCard.remove()
    })
}

function likeQuote(event) {
    event.preventDefault()
    const id = event.target.dataset.id
    // const quoteId = id

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'applicaton/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({quoteId: (id)})
    }
    debugger
    fetch('http://localhost:3000/likes', reqObj)
    .then(resp => resp.json())
    .then(like => {
        console.log('hello')
    })
}