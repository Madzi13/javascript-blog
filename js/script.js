'use strict';

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

function generateTags(){
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
    const articleTagsArray = articleTags.split(' ');

    // START LOOP: for each tag
    for(let tag of articleTagsArray){

      // generate HTML of the link
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      // add generated code to html variable
      html = html + linkHTML;
    }
    // END LOOP: for each tag

    // insert HTML of all the links into the tags wrapper
    tagsWrapper.innerHTML = html;

  // END LOOP: for every article:
  }
}

generateTags();