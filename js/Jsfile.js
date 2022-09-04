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

}

function catagoriesClicked(id) {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

function displayNews(abc) {
    const newsShowContainer = document.getElementById('News-Div');
    newsShowContainer.innerHTML = "";
    for (const abcd of abc) {
        console.log(abcd.title)
        const newsPush = document.createElement('div');
        newsPush.innerHTML = `
        <div class=" border rounded-3 bg-light d-sm-flex  container my-3 h-25 ">
        <div><img src="${abcd.image_url}" class="img-fluid" alt="">
        </div>
        <div class="pt-3 ps-4">
            <h4>${abcd.title}</h4>
            <p>${abcd.details}
            </p>
            <div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class="w-25  h-25 m-3"> <img src="${abcd.author.img}" class="w-100 rounded-circle  h-100" alt=""></div>
                        <div class=" m-3">
                            <h6>${abcd.author.name}
                            </h6>
                            <p>${abcd.author.published_date}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex m-3 ">
                    <i class="fa-solid fa-eye p-2"></i>
                        <h3 class="">${abcd.total_abcd}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
        newsShowContainer.appendChild(newsPush);
    }

}




// allNews();

newsPageGet();