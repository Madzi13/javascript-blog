'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
 
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){
  // remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    // get the article id
    const articleId = article.getAttribute('id');

    // find the title element
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // create HTML of the link
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    // insert link into html variable
    html = html + linkHTML;
  }

  // insert HTML into titleList
  titleList.innerHTML = html;

  // get all links from the list
  const links = document.querySelectorAll('.titles a');

  // add event listener to each link
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();