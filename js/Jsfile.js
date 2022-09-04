let idOfEachNews = [];
function newsPageGet() {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => display(data))
        .catch(error => console.log(error))
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
    // SpinLoader 
    SpinLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

function displayNews(abc) {
    const noFoundContainer = document.getElementById('noFound');
    const totalNewsCount = document.getElementById('totalnews');
    totalNewsCount.innerText = "";
    if (abc.length == 0) {
        noFoundContainer.classList.remove('d-none');
    }
    else {
        noFoundContainer.classList.add('d-none');

        const newH3 = document.createElement('h3');
        newH3.innerHTML = `
    <h3 class="text-center">Total ${abc.length} news in this section</h3>
    `
        totalNewsCount.appendChild(newH3);
    }

    const newsShowContainer = document.getElementById('News-Div');
    newsShowContainer.innerHTML = "";
    for (const abcd of abc) {
        const newsPush = document.createElement('div');
        newsPush.innerHTML = `
        <div class=" border rounded-3 bg-light d-sm-flex  container my-3" >
        <div><img src="${abcd.image_url}" class=" my-3" alt=""  style="height: 220px; width: 340px;">
        </div>
        <div class="pt-3 ps-4">
            <h4>${abcd.title}</h4>
            <p>${abcd.details.slice(0, 450)}...
            </p>
            <div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class=" m-3" style="height: 40px; width:40px; "> <img src="${abcd.author.img}" class="w-100 rounded-circle  h-100" alt=""></div>
                        <div class=" m-3">
                            <h6>Author: ${abcd.author.name ? abcd.author.name : "Author name is not available"}
                            </h6>
                            <p> Date of Publication: ${abcd.author.published_date ? abcd.author.published_date : "Publish date is not available"}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex m-3 ">
                    <i class="fa-solid fa-eye p-2"></i>
                        <h3 class="">${abcd.total_view ? abcd.total_view : "Total View Is Not Available"}</h3>
                    </div>
                    
                    <div class=" m-3">
                    <button onclick="loadFullNews('${abcd._id}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" >
                    Full News
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
        newsShowContainer.appendChild(newsPush);
    }
    SpinLoader(false);
}

// allNews();

newsPageGet();

// full news loader function
function loadFullNews(id) {
    const newsMoreUrl = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(newsMoreUrl)
        .then(res => res.json())
        .then(news => newsToModal(news.data))
        .catch(error => console.log(error))


    console.log(id)
}

function newsToModal(modals) {
    const modalTitleContainer = document.getElementById('modalTitel');
    modalTitleContainer.innerText = "";
    for (const modal of modals) {
        const modTitle = document.createElement('div');
        modTitle.innerHTML = `
        <div class=" border rounded-3 bg-light   container my-3" >
        <div><img src="${modal.image_url}" class=" my-3" alt=""  style="height: 220px; width: 340px;">
        </div>
        <div class="pt-3 ps-4">
            <h4>${modal.title}</h4>
            <p>${modal.details}
            </p>
            <div>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class=" m-3" style="height: 40px; width:40px; "> <img src="${modal.author.img}" class="w-100 rounded-circle  h-100" alt=""></div>
                        <div class=" m-3">
                            <h6>${modal.author.name ? modal.author.name : "Author info not available"}
                            </h6>
                            <p>${modal.author.published_date ? modal.author.published_date : 'Publish Date not available'}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex m-3 ">
                    <i class="fa-solid fa-eye p-2"></i>
                        <h3 class="">${modal.total_view ? modal.total_view : 'view data is not available'}</h3>
                    </div>
                </div>
                <div>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
        `
        modalTitleContainer.appendChild(modTitle);
    }
}

const SpinLoader = isloading => {
    const loaderSection = document.getElementById('loader');
    if (isloading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// By default it will show all news

catagoriesClicked(08);