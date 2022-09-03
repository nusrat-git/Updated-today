const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    showCategory(data.data.news_category);
};

const showCategory = (categories) => {
    const allCategory = document.getElementById('all-category');
    for (const category of categories) {

        const aCategory = document.createElement('a');
        aCategory.href= '#'
        aCategory.classList.add('text-decoration-none', 'fs-5','text-secondary','p-3');
        aCategory.innerText = ` ${category.category_name} `;
        allCategory.appendChild(aCategory);
    }
}

loadCategory();