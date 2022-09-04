let idOfEachNews = [];
function newsPageGet() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => display(data))
}

function display(data) {
    // console.log(data.data.news_category)
    const xyz = data.data.news_category;
    const newsCatagoriesContainer = document.getElementById('news-catagories');

    for (const datas of xyz) {
        idOfEachNews.push(datas.category_id);
        const li = document.createElement('li');

        li.innerHTML = `
        <p id="${datas.category_id}" onclick="catagoriesClicked(${datas.category_id})">${datas.category_name}</p>
        `
        newsCatagoriesContainer.appendChild(li);

    }



    // for (const datas of xyz) {
    //     idOfEachNews.push(datas.category_id);
    //     const li = document.createElement('li');
    //     li.innerText = datas.category_name;
    //     newsCatagoriesContainer.appendChild(li);

    // }

}

newsPageGet();

// document.getElementById('news-catagories').addEventListener('clicked', catagoriesClicked());

function catagoriesClicked(id) {
    let countryId = "(`0${id}`)";
    fetch(`https://openapi.programming-hero.com/api/news/category/${countryId}`)
        .then(res => res.json())
        .then(data => console.log(data))
}



// // Getting news
// function allNews() {
//     fetch('https://openapi.programming-hero.com/api/news/category/01')
//         .then(res => res.json())
//         .then(news => console.log(news))
// }

// allNews();