
function createCard(
  imgData,
  nameData,
  populationData,
  regionData,
  capitalData
) {
  const cardElements = [
    {
      textName: 'population: ',
      textData: populationData,
    },
    {
      textName: 'Region: ',
      textData: regionData,
    },
    {
      textName: 'Capital: ',
      textData: capitalData,
    },
  ]

  const col = document.createElement('div')
  col.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'text-white', 'mb-4')
  col.addEventListener('click', clickCard)
  col.setAttribute('data-countryname', nameData)
  col.style.cursor = 'pointer'

  const card = document.createElement('div')
  card.classList.add('card', 'bg-darkBlue2', 'h-100')

  const img = document.createElement('img')
  img.classList.add('card-img-top')
  img.src = imgData

  const cardBody = document.createElement('div')
  cardBody.classList.add(
    'card-body',
    'd-flex',
    'justify-content-center',
    'flex-column'
  )

  const cardTitle = document.createElement('h5')
  cardTitle.classList.add('card-title', 'mb-4')
  cardTitle.textContent = nameData

  cardBody.appendChild(cardTitle)

  cardElements.forEach((e) => {
    const paragraph = document.createElement('p')
    paragraph.classList.add('card-text', 'fw-bold')
    const span = document.createElement('span')
    span.classList.add('fw-normal')

    paragraph.textContent = e.textName
    span.textContent = e.textData

    paragraph.appendChild(span)

    cardBody.appendChild(paragraph)
  })

  card.append(img, cardBody)
  col.appendChild(card)
  document.querySelector('.cardsWrap').appendChild(col)
}

function renderElements() {
  if ((document.querySelector('.search-input') != undefined)){
    document.querySelector('.search-input').value = ''
  }
    if(document.querySelector('.cardsWrap') != undefined){
      document.querySelector('.cardsWrap').innerHTML = ''
    }
  const url = 'https://restcountries.eu/rest/v2/all'
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ele) => {
        createCard(ele.flag, ele.name, ele.population, ele.region, ele.capital)
      })
    })
}

renderElements()
filterBtn()
function filterBtn(){
   const filterItems = document.querySelectorAll('.filter-item')

   filterItems.forEach((f) => f.addEventListener('click', filter))
}

function filter(t) {
  let current = t.currentTarget.dataset.region
  const url = 'https://restcountries.eu/rest/v2/all'
  document.querySelector('.cardsWrap').innerHTML = ''
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ele) => {
        if (ele.region.toLowerCase() === current) {
          createCard(
            ele.flag,
            ele.name,
            ele.population,
            ele.region,
            ele.capital
          )
        }
      })
    })
}
let currentName = 0

function searchCountry(searchCountryValue, searchType) {
  if(document.querySelector('.search-input') != undefined){
    document.querySelector('.search-input').value = ''
  }
  let countryUrl = `https://restcountries.eu/rest/v2/${searchType}/${searchCountryValue}`

  fetch(countryUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data != undefined) {
         let dataCountry
         if (Array.isArray(data) == true) {
           dataCountry = data[0]
         } else if (Array.isArray(data) == false) {
           dataCountry = data
         }
         

         let curArr = []
      
             dataCountry.currencies.forEach((cu) => {
               curArr.push(cu.name)
             })


            let lengArr = []

            dataCountry.languages.forEach((le) => {
              lengArr.push(le.name)
            })
        
        

        document.querySelector(
          '.wrapMain'
        ).innerHTML = `<main class="bg-darkBlue d-flex flex-column justify-content-center h-100 pb-5" >
   <div class="container">
      <div class="btn text-white bg-darkBlue2 back-btn px-4 py-2" onclick='updateMain()'><i class="bi bi-arrow-left me-2"></i> Back</div>
   
   <div class="row text-white d-lg-flex d-block">
      <div class="col-lg-6 col-12">
         <img src=${dataCountry.flag} class="img-fluid" alt="">
      </div>
      <div class="col-lg-6 col-12 mt-5 mt-lg-0">
         <h3 class="mb-4">${dataCountry.name}</h3>
         <div class="row">
            <div class="col">
               <p class="fw-bolder">Native Name: <span class="fw-normal">${dataCountry.nativeName}</span>
               </p>
               <p class="fw-bolder">Population: <span class="fw-normal">${dataCountry.population}</span>
               </p>
               <p class="fw-bolder">Region: <span class="fw-normal">${dataCountry.region}</span>
               </p>
               <p class="fw-bolder">Sub Region: <span class="fw-normal">${dataCountry.subregion}</span>
               </p>
               <p class="fw-bolder">Capital: <span class="fw-normal">${dataCountry.capital}</span>
               </p>
            </div>
            <div class="col">
               <p class="fw-bolder">Top Level Domain: <span class="fw-normal">${dataCountry.topLevelDomain}</span>
               </p>
               <p class="fw-bolder">Currencies: <span class="fw-normal">${curArr}</span>
               </p>
               <p class="fw-bolder">Lenguages: <span class="fw-normal">${lengArr}</span>
               </p>
               
            </div>
         </div>
         <div class="d-flex flex-wrap align-items-center mt-5">
            <p class="lead mb-3">Border Countries: </p>
            <div class='border-countries'></div>
         </div>
      </div>
   </div>
   </div>
</main>`
dataCountry.borders.forEach((bo) => {
  borderCountry(bo)
})
      }
    })
}

function borderCountry(btnBorder){
   const btn = document.createElement('button')
   btn.classList.add('btn', 'bg-darkBlue2', 'text-white', 'mx-3', 'mb-3')
   btn.textContent = btnBorder
   btn.addEventListener('click', borderClick)
   document.querySelector('.border-countries').appendChild(btn)
}

function inputSearchAction(){
   const searchBtn = document.querySelector('.search-btn')
   searchBtn.addEventListener('click', searchCountryClick)

   function searchCountryClick() {
     searchCountry2()
   }
}

inputSearchAction()

function borderClick(ta){
    searchCountry(ta.currentTarget.innerText, 'alpha')
}

function searchCountry2(){
  document.querySelector('.cardsWrap').innerHTML = ''
  if (document.querySelector('.search-input').value  == '') {
    renderElements()
  } else {
    const url = `https://restcountries.eu/rest/v2/name/${
      document.querySelector('.search-input').value
    }`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(e => {
          createCard(
            e.flag,
            e.name,
            e.population,
            e.region,
            e.capital
          )
        })
      })
  }
  if (document.querySelector('.search-input') != undefined) {
    document.querySelector('.search-input').value = ''
  }
}
function renderLogo() {
if(document.querySelector('.search-input') == undefined){
updateMain()
}
  renderElements()
}


function updateMain(){
   document.querySelector('.wrapMain').innerHTML = `
   <main class="bg-darkBlue py-5">
   <div class="container">
      <div class="search d-block d-md-flex justify-content-between align-items-center">
         <div class="input-group mb-5">
            <button class="input-group-text bg-darkBlue2 text-white border-0 py-3 px-4 search-btn" id="inputGroup-sizing-default"><i
                  class="bi bi-search"></i></button>
            <input type="text" class="search-input bg-darkBlue2 text-white border-0 px-1 input-lg"
               aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
               placeholder="Search for a country...">
         </div>
         <div class="dropdown mb-5">
            <a class="btn bg-darkBlue2 text-white dropdown-toggle p-3" href="#" role="button" id="dropdownMenuLink"
               data-bs-toggle="dropdown" aria-expanded="false">
               Filter by Region
            </a>

            <ul class="dropdown-menu bg-darkBlue2 text-white filter-dropdown mt-1"
               aria-labelledby="dropdownMenuLink">
               <li class="my-2 filter-item px-3" data-region='africa'>Africa</li>
               <li class="my-2 filter-item px-3" data-region='americas'>America</li>
               <li class="my-2 filter-item px-3" data-region='asia'>Asia</li>
               <li class="my-2 filter-item px-3" data-region='europe'>Europe</li>
               <li class="my-2 filter-item px-3" data-region='oceania'>Oceania</li>
            </ul>
         </div>
      </div>
      <div class="row cardsWrap">
     
      </div>
   </div>
</main>
   `
   renderElements()
   filterBtn()
   inputSearchAction()
}

function clickCard(t){
  searchCountry(t.currentTarget.dataset.countryname, 'name')
}

document.querySelector('.logo').addEventListener('click', renderLogo)


window.addEventListener('keyup', (e) => {
if (e.key === 'Enter') {
  searchCountry2()
}
})

