const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    showCategory(data.data.news_category);
};

const showCategory = (categories) => {
    const allCategory = document.getElementById('all-category');
    for (const category of categories) {

        const aCategory = document.createElement('div');
        aCategory.classList.add('container', 'pt-4', 'text-center','d-inline','mx-auto');
        aCategory.innerHTML = ` 
        <a class="text-decoration-none text-secondary fs-5" href="#">${category.category_name}</a>
         `;
        allCategory.appendChild(aCategory);
    }
}

loadCategory();