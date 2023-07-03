// Function that handles the click event on the article titles
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  // Remove 'active' class from all article links and articles
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  // Add 'active' class to the clicked article link and corresponding article
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

// Constants used in the generateTitleLinks function
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

// Function that generates a list of links to each article
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  // Loop through each article and create a link to it
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }

  // Insert the link HTML into the titleList
  titleList.innerHTML = html;

  // Add click event listener to each article link
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
function generateTags(customSelector = '') {
  console.log(customSelector);
 
  function generateTags() {
    /* create a new variable allTags with an empty object */
    let allTags = {};

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // START LOOP: for every article:
  for(let article of articles){

    // find tags wrapper
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    // get tags from data-tags attribute
    const articleTags = article.getAttribute('data-tags');

    // split tags into array
    const articleTagsArray = articleTags.split(', ');
    console.log(articleTagsArray);

    // START LOOP: for each tag
    for(let tag of articleTagsArray){

      // generate HTML of the link
      const linkHTML = `<a href="#${tag}">${tag}</a>`;

      // add generated code to html variable
      html = html + linkHTML;
    
  /* [NEW] check if this link is NOT already in allTags */
  if(!allTags[tag]) {

    /* [NEW] add tag to allTags object */
    allTags[tag] = 1;
  } else {
    allTags[tag]++;  }

    // END LOOP: for each tag
  }
    // insert HTML of all the links into the tags wrapper
    tagsWrapper.innerHTML = html;

    // END LOOP: for every article:
}
  } 

generateTags();


function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');  

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.substring(1);
  console.log(tag);
  
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  activeTagLinks.forEach(function(link) {

    /* remove class active */
    link.classList.remove('active');
  });
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href^="'+ href + '"]');
  /* START LOOP: for each found tag link */
  tagLinks.forEach(function(link) {
    
    /* add class "active" */
    link.classList.add('active');
    
    /* END LOOP: for each found tag link */
  });  
    
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(optArticleSelector);
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  tagLinks.forEach(function(link) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler); }); 

  /* END LOOP: for each link */

  const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams)
if(tags[tag] > params.max){
  params.max = tags[tag];

/* [NEW] create variable for all links HTML code */
let allTagsHTML = '';

}

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){

  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += tag + ' (' + allTags[tag] + ') ';
}
/* [NEW] END LOOP: for each tag in allTags: */


/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}

addClickListenersToTags();

function generateAuthors() {
  // Wybierz element artykułu
  const article = document.querySelector(optArticleSelector);
  
  // Wybierz wrapper autora
  const authorWrapper = article.querySelector('.post-author');
  
  // Pobierz tekst autora
  const author = authorWrapper.innerText;
    
  // Stwórz link autora
  const authorLink = document.createElement('a');
  authorLink.innerText = author;
  authorLink.href = '#author-' + author;
    
  // Wyczyść wrapper autora i dodaj link autora
  authorWrapper.innerHTML = '';
  authorWrapper.appendChild(authorLink);
  
  // Ustaw atrybut data-author na artykule
  article.setAttribute('data-author', author);
  
function addClickListenersToAuthors() {
  // Wybierz linki do autorów
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  
  // Dodaj nasłuchiwacz kliknięcia do każdego linka autora
  authorLinks.forEach(function(authorLink) {
    authorLink.addEventListener('click', authorClickHandler);
  });
}
  
function authorClickHandler(event) {
  // Zapobiegnij domyślnej akcji przeglądarki
  event.preventDefault();
  
  // Pobierz kliknięty element
  const clickedElement = this;
  
  // Pobierz nazwę autora z atrybutu href klikniętego linka
  const author = clickedElement.getAttribute('href').substring(8);
  
  // Wybierz wszystkie artykuły
  const articles = document.querySelectorAll(optArticleSelector);
    
  // Sprawdź każdy artykuł, czy ma takiego samego autora
  articles.forEach(function (article) {
    if (article.getAttribute('data-author') === author) {
      // Jeśli taki sam autor, pokaż artykuł
      article.style.display = '';
    } else {
      // Jeśli inny autor, ukryj artykuł
      article.style.display = 'none';
    }
  });
}
// Wywołaj funkcje
generateTags();
addClickListenersToTags();
generateTitleLinks();
generateAuthors();
addClickListenersToAuthors();
  }}