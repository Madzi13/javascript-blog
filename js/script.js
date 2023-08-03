const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

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
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optAuthorSelector = '.post-author',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';


// Function that generates a list of links to each article
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  // Loop through each article and create a link to it
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log(articleId);

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);

    html = html + linkHTML;
    console.log(html);
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

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
 
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  // START LOOP: for every article:
  for(let article of articles){

    // find tags wrapper
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log(tagList);

    /* make html variable with empty string */
    let html = '';

    // get tags from data-tags attribute
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    // split tags into array
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    // START LOOP: for each tag
    for(let tag of articleTagsArray){

      // generate HTML of the link
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      // add generated code to html variable
      html = html + linkHTML;
      console.log(html);
    
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      // END LOOP: for each tag
    }
    // insert HTML of all the links into the tags wrapper
    tagList.innerHTML = html;
    
    // END LOOP: for every article:
  }
   
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a> (' + allTags[tag] + ')</li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!', event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
   
    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');
    console.log(tagLinks);

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */

    const authorList = article.querySelector(optAuthorSelector);
    console.log(authorList);

    /* make html variable with empty string */

    let html = '';

    /* get author from author-tags attribute */

    const author = article.getAttribute('data-author');
    console.log(author);

    /* generate HTML of the link */
    const linkHTMLData = {id: author, title: author};
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[author]) {

      /* [NEW] add author to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    const authorLinkHTML = '<li><a href="#author-' + author +  '">' + author + '</a> (' + allAuthors[author] + ')</li>';
    console.log('tagLinkHTML:', authorLinkHTML);
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });

    /* [NEW] END LOOP: for each author in allAuthors: */

  }
  /*[NEW] add HTML from allTagsHTML to tagList */

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);
}

generateAuthors();
function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!', event);
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);
  
  /* START LOOP: for each active tag link */
  for(let activeAuthorLink of activeAuthorLinks){
  
    /* remove class active */
    activeAuthorLinks.classList.remove('active');
     
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
  for(let authorLink of authorLinks){
  
    /* add class active */
    authorLink.classList.add('active');
    console.log(authorLinks);
  
    /* END LOOP: for each found tag link */
  
  }
  
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
  
function addClickListenersToAuthors(){
  
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  
  /* START LOOP: for each link */
  for(let authorLink of authorLinks){
  
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();