let idOfEachNews = [];
function newsPageGet() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => display(data))
}

function display(data) {
    console.log(data)
    const xyz = data.data.news_category;
    const newsCatagoriesContainer = document.getElementById('news-catagories');


    for (const datas of xyz) {
        idOfEachNews.push(datas.category_id);
        const li = document.createElement('li');
        li.innerText = datas.category_name;
        newsCatagoriesContainer.appendChild(li);

    }

}

newsPageGet();

document.getElementById('news-catagories').addEventListener('clicked', catagoriesClicked());

function catagoriesClicked() {

}



// // Getting news
// function allNews() {
//     fetch('https://openapi.programming-hero.com/api/news/category/01')
//         .then(res => res.json())
//         .then(news => console.log(news))
// }

// allNews();