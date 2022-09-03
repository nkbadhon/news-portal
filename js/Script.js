fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => display(data))

function display(data) {
    const xyz = data.data.news_category;
    const newsCatagoriesContainer = document.getElementById('news-catagories')

    for (datas of xyz) {
        const li = document.createElement('li');
        li.innerText = datas.category_name;
        newsCatagoriesContainer.appendChild(li);
        // console.log(datas.category_name)
    }
    // console.log(data.data.news_category[0])
}

display();