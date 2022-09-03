const loadCategory = async () => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        showCategory(data.data.news_category);
    }
    catch (err) {
        console.log(err)
    }


};

const showCategory = (categories) => {

    const allCategory = document.getElementById('all-category');

    categories.forEach(category => {

        const aCategory = document.createElement('a');
        aCategory.href = '#';
        aCategory.id = `${category.category_id}`;

        aCategory.classList.add('text-decoration-none', 'fs-5', 'text-secondary', 'p-3');

        aCategory.innerText = ` ${category.category_name} `;

        allCategory.appendChild(aCategory);

        document.getElementById(`${category.category_id}`).onclick = function () {
            loadSpinner(true);
            try {
                const catUrl = ` https://openapi.programming-hero.com/api/news/category/${category.category_id} `;

                const loadAllCategory = async () => {
                    const resCategory = await fetch(catUrl);
                    const dataCategory = await resCategory.json();
                    categoryInfo(dataCategory.data);
                }

                loadAllCategory();
            }
            catch (err) {
                console.log(err)
            }


        }


    });


};


const spinner = document.getElementById('spinner');
const loadSpinner = isLoading => {
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}



const categoryInfo = (infos) => {

    const categoryInfo = document.getElementById('category-info');
    categoryInfo.innerText = '';

    const newsInfo = infos;
    const sortNews = newsInfo.sort((a, b) => parseFloat(b.total_view) - parseFloat(a.total_view));

    for (const info of infos) {

        const catDiv = document.createElement('div')
        catDiv.classList.add('d-flex', 'flex-column', 'flex-md-row', 'align-items-center', 'gap-3', 'mb-4', 'justify-content-center', 'shadow-sm')
        catDiv.innerHTML = `
            <div>
                <img src="${info.thumbnail_url}">
            </div>
            <div class="p-2">
                <h4>${info.title}</h4>
                <p id ="">${info.details}</p>
                <div class="d-flex flex-column flex-md-row align-items-center justify-content-between  p-4">
                    <div class ="d-flex gap-3">
                        <div>
                            <img src="${info.author.img}" style="height:60px; width : 60px;" class="rounded-circle">
                        </div>
                        <div>
                            <p>${info.author.name ? info.author.name : 'No Data Found'}<p>
                            <p>${info.author.published_date ? info.author.published_date : 'No Data Found'}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <p class="p-4">Total View: ${info.total_view ? info.total_view : 'No Data Found'}</p>
                        </div>
                         <div>
                            <p class="p-4">Rating: ${info.rating.number ? info.rating.number : 'No Data Found'}</p>
                        </div>
                        <div>
                            <button class="border-0 bg-white" id="${info._id}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right fs-4 "></i></button>
                        </div>
                    </div>
                </div>
            </div>
        
        `
        categoryInfo.appendChild(catDiv);
        loadSpinner(false);

        document.getElementById(`${info._id}`).onclick = function () {
            const modalTitle = document.getElementById('exampleModalLabel');
            modalTitle.innerText = `${info.title}`;
            const modalBody = document.getElementById('modalBody');
            modalBody.innerText = `${info.details}`;

            console.log(modalTitle, modalBody);
        }


        // const newsDetails = document.getElementById(`${info._id}`);
        // let newsDetailsText = newsDetails.innerText;
        // let news = newsDetailsText.substring(0,5)+'...'
        // // he = he.slice(0,500);
        // console.log(news)

    }

    // const sort = infos.sort((a, b) => parseFloat(b.total_view) - parseFloat(a.total_view));
    // console.log(sort)

    const categoryInfoCount = document.getElementById('category-info').childElementCount;
    const foundMsg = document.getElementById('found-msg');
    foundMsg.innerText = `${categoryInfoCount} items found`;

}

loadCategory();


