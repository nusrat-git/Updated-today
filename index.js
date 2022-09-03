const loadCategory = async () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();

    showCategory(data.data.news_category);
};

const showCategory = (categories) => {

    const allCategory = document.getElementById('all-category');

    for (const category of categories) {



        const aCategory = document.createElement('a');
        aCategory.href = '#';
        aCategory.id = `${category.category_id}`;

        aCategory.classList.add('text-decoration-none', 'fs-5', 'text-secondary', 'p-3');

        aCategory.innerText = ` ${category.category_name} `;

        allCategory.appendChild(aCategory);

        document.getElementById(`${category.category_id}`).onclick = function () {

            const catUrl = ` https://openapi.programming-hero.com/api/news/category/${category.category_id} `;



            const loadAllCategory = async () => {
                const resCategory = await fetch(catUrl);
                const dataCategory = await resCategory.json();
                categoryInfo(dataCategory.data);
            }

            loadAllCategory();
        }

    }
}


const categoryInfo = (infos) => {

    const categoryInfo = document.getElementById('category-info');
    categoryInfo.innerText = '';


    for (const info of infos) {

        const catDiv = document.createElement('div')
        catDiv.classList.add('d-flex','flex-column','flex-md-row', 'align-items-center', 'gap-3', 'mb-4')
        catDiv.innerHTML = `
            <div>
                <img src="${info.thumbnail_url}">
            </div>
            <div class="p-3">
                <h4>${info.title}</h4>
                <p id ="${info._id}">${info.details}</p>
                <div class="d-flex align-items-center gap-3 p-4">
                    <div>
                        <img src="${info.image_url}" style="height:60px; width : 60px;" class="rounded-circle">
                    </div>
                    <div>
                        <p>${info.author.name}<p>
                        <p>${info.author.published_date}</p>
                    </div>
                    <div>
                        <p class="p-4">Total View: ${info.total_view}</p>
                    </div>
                </div>
            </div>
        
        `
        categoryInfo.appendChild(catDiv);
    


    }


}

loadCategory();


