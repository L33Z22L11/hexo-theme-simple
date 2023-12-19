const simple = {
    // 切换作者卡片上面的标签文字
    changeAboutCardText: () => {
        const aboutCardText = useStore.get('SITE_CONFIG').authorTags;

        const aboutCatdTextArray = aboutCardText.split(',');

        for (let i = 0; i < aboutCatdTextArray.length; i++) {
            if (aboutCatdTextArray[i].indexOf('||') != -1) {
                const str = aboutCatdTextArray[i].split('||');
                const ic = str[0].trim();
                const t = str[1].trim();
                aboutCatdTextArray[i] = `<i class="${ic}"></i> ${t}`;
            }
        }

        if (aboutCatdTextArray.length === 1) return;

        const aboutCardTextElement = document.querySelector('.about-box-card-top-tag span');

        let lastAboutCardText = aboutCardTextElement.textContent;

        let randomAboutCatdTextArray = lastAboutCardText;
        while (randomAboutCatdTextArray === lastAboutCardText) {
            randomAboutCatdTextArray = aboutCatdTextArray[Math.floor(Math.random() * aboutCatdTextArray.length)];
        }
        aboutCardTextElement.innerHTML = randomAboutCatdTextArray;
    },
};