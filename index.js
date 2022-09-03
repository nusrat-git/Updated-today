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

        document.getElementById(`${category.category_id}`).onclick = function(){
            const catUrl = ` https://openapi.programming-hero.com/api/news/category/${category.category_id} `;

            const loadAllCategory = async () => {
                const resCategory = await fetch(catUrl);
                const dataCategory = await resCategory.json();
                categoryInfo(dataCategory.data);
            }

             loadAllCategory()
        }





    }
}


const categoryInfo = (infos) => {

    const categoryInfo = document.getElementById('category-info');

    for (const info of infos) {

        const catDiv = document.createElement('div')
        catDiv.classList.add('d-flex','align-items-center','gap-3','mb-4')
        catDiv.innerHTML = `
            <div class="w-50">
                <img src="${info.image_url}" class="w-100">
            </div>
            <div class="w-50">
                <h4>${info.title}</h4>
                <p>${info.details}</>
            </div>
        
        `
        categoryInfo.appendChild(catDiv);

    }
}


loadCategory();


