import { data } from '../data/data.js'

let filteredData = []
const input = document.getElementById('inputTextField')
let tagList = document.querySelector('.main__tag-list')
let cardList = document.querySelector('.main__cards-list')
let currentTags = []
let startItem = 0

// Фильтр данных
function fetchData(data, startItem, tags = []) {
    if (tags.length == 0) {
        drawCard(startItem, data)
    }
    else {
        let tempData = []
        let tempTag = ''
        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if ((data[j].title.includes(tags[i]) || data[j].keywords.includes(tags[i])) &&
                    (data[j].title.includes(tempTag) || data[j].keywords.includes(tempTag))) {
                    if (!tempData.includes(data[j])) {
                        tempData.push(data[j])
                    }
                } else {
                    if (tempData.includes(data[j])) {
                        tempData.splice(tempData.indexOf(data[j]), 1)
                    }
                }
            }
            tempTag = tags[i]
        }
        console.log(tempData)
        filteredData = tempData
        drawCard(startItem, tempData)


    }

}
// Определитель позиции экрана
function checkPosition() {
    const screenHeight = window.innerHeight
    const scrolled = window.scrollY

    const cutLine = document.body.offsetHeight

    const position = scrolled + screenHeight

    if (position >= cutLine) {
        startItem += 20
        if (currentTags.length != 0 && startItem < filteredData.length) drawCard(startItem, filteredData)
        else if (currentTags.length == 0 && startItem < data.length) drawCard(startItem, data)
        else return
    }
}

// Загрузка данных при запуске приложения
window.addEventListener('load', fetchData(data, 0))

// Подгрузка данных при скролле
window.addEventListener('scroll', checkPosition)

// Добавление удаление тэга и обновления списка данных
input.addEventListener('change', (ev) => {
    currentTags.push(input.value)
    tagList.innerHTML +=
        `
    <div class="main__tag">
        <div class="tag__text">${input.value}</div>
        <div class="tag__crosslines" id="${input.value}"></div>
    </div>
    `
    input.value = ''
    document.querySelectorAll('.main__card').forEach(element => {
        element.remove()
    });
    startItem = 0
    fetchData(data, 0, currentTags)
})
document.querySelector('.main__input-field').addEventListener('change', () => {
    for (let i = 0; i < currentTags.length; i++) {
        document.getElementById(currentTags[i]).addEventListener('click', (e) => {
            e.target.parentElement.remove()
            currentTags.splice(i, 1)
            document.querySelectorAll('.main__card').forEach(element => {
                element.remove()
            });
            startItem = 0
            fetchData(data, 0, currentTags)
        })
    }
})

// Отрисовка карточек

function drawCard(startItem, data) {
    let addNum = ((data.length - startItem) < 20) ? data.length : 20
    if (data != []) {
        for (let i = startItem; i < startItem + addNum; i++) {
            cardList.innerHTML +=
                `
        <div class="main__card">
            <div class="card__symbol">${data[i].symbol}</div>
            <div class="card__title">${data[i].title}</div>
            <div class="card__tags">${data[i].keywords}</div>
        </div>
        `
        }
    }

}



