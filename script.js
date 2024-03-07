// Global Variable 
const errorMessage = document.getElementById('error-message');
const totalFound = document.getElementById('total-found');
const searchResult = document.getElementById('search-result');


//loading spinner 
const loadingDisplay = display => {
  document.getElementById('loading').style.display = display;
}
const searchResultDisplay = display => {
  document.getElementById('search-result').style.display = display;
}


const loadData = () => {
  
  const inputValue = document.getElementById('search-field');

  const loading = document.getElementById('loading');
 
  if (inputValue.value == '') {

    totalFound.innerHTML = '';
    errorMessage.innerHTML = `
       <span class='d-block text-gray'>Please, Input a Valid Book Name..!</span>
       `;
    searchResult.innerHTML = '';

  } else {

     
    loadingDisplay('block');
    searchResultDisplay('none')


    
    const url = `https://openlibrary.org/search.json?q=${inputValue.value}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displayData(data))
      .catch(error => {
        errorMessage.innerHTML = `
                     <span class='d-block text-gray'>Cound't Get Data API Error</span>
                 `;

        loadingDisplay('none');
      });

    
    errorMessage.innerHTML = '';

  }
  
  inputValue.value = '';
  totalFound.innerHTML = '';


}
const displayData = (books) => {



  
  totalFound.innerHTML = `

    <span class='d-block text-black'>About ${books.numFound} Results Found Searching '${books.q}' keyword</span>
    
    `;
   
  if (books.numFound === 0) {
    errorMessage.innerText = `No Result's Found !`;
    loadingDisplay('none');
    totalFound.innerHTML = '';
  }

  
  const minBooks = books.docs;
  console.log(minBooks);
  searchResult.innerHTML = '';

  minBooks.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('col');

    
    let cover = book.cover_i;
    let title = book.title.slice(0, 10);
    let author = book.author_name;
    let publisher = book.publisher;
    let publishYear = book.first_publish_year;

    div.innerHTML = `
        <div class="card mb-3 shadow rounded">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              class="card-img-top w-100 h-100"
              src="https://covers.openlibrary.org/b/id/${cover === undefined ? '10675600' : book.cover_i}-M.jpg" class="card-img-top"
              class="img-fluid rounded-start"
              alt="${title ? title : "Unknown"}"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title text-success">${title === undefined ? 'Unknown' : title}</h1>
              <hr />
              <h3 class="lead"><span class="fw-bold">Author : </span> ${author === undefined ? 'Unknown' : author[0]}</h3>
              <p class="lead"><span class="fw-bold">Publisher : </span> ${publisher === undefined ? 'Unknown' : publisher[0]}</p>

              <p class="card-text">
                <small class="text-muted">First Published : ${publishYear === undefined ? 'Unknown' : publishYear}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
            `;
    searchResult.appendChild(div);
     
    loadingDisplay('none');
    searchResultDisplay('flex')
  });




}