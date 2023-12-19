hexo.extend.helper.register('catlist', function (types, limit) {
    if (!types) types = 'category';
    const categoryBar = (categories) => {
        if (!categories || !categories.length) return '';
        let categoryArr = [];
        hexo.locals.get('categories').map((category) => {
            categoryArr.push({ name: category.name, value: category.length });
        });
        categoryArr.sort((a, b) => {
            return b.value - a.value;
        });
        let strCategoriesBar = '';
        for (let i = 0; i < categoryArr.length; i++) {
            for (let j = i + 1; j < categoryArr.length; j++) {
                if (categoryArr[i].name == categoryArr[j].name) {
                    categoryArr.splice(j, 1);
                    j--;
                }
            }
        }
        for (let i = 0; i < (limit || categoryArr.length); i++) {
            strTemp = `<a class="categories-base" href="/categories/${categoryArr[i].name}/">${categoryArr[i].name}</a>`;
            strCategoriesBar += strTemp;
        }
        return strCategoriesBar;
    };

    const tagsBar = (tags) => {
        if (!tags || !tags.length) return '';
        let tagArr = [];
        hexo.locals.get('tags').map((tag) => {
            tagArr.push({ name: tag.name, value: tag.length });
        });
        tagArr.sort((a, b) => {
            return b.value - a.value;
        });
        let strTagsBar = '';
        tagArr = tagArr.splice(0, limit);
        for (let i = 0; i < limit; i++) {
            strTemp = `
            <li class="ml1 pl1">
            <a class="h5 flex items-center leading-5 ml5px text-xs" href="/tags/${tagArr[i].name}/">#${tagArr[i].name}</a>
            </li>`;
            strTagsBar += strTemp;
        }
        return strTagsBar;
    };
    if (types == 'category') {
        return categoryBar(this.site.categories);
    }
    if (types == 'tag') {
        return tagsBar(this.site.tags);
    }
});
