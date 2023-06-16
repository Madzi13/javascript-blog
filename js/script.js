const titleClickHandler = function(event){

  event.preventDefault();
  
  const clickedElement = this;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

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
  console.log('articleSelector:', articleSelector);

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  console.log('targetArticle:', targetArticle);

  targetArticle.classList.add('active');
}