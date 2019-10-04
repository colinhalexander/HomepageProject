function createThemesMenu() {
    const themes = [
        ["Blue Sky", "alt-css/bluesky.css"], 
        ["Dark Mode", "alt-css/darkmode.css"], 
        ["Mountain Lake", "alt-css/mountainlake.css"], 
        ["Zen Garden", "alt-css/zengarden.css"],
        ["Waterfall", "alt-css/waterfall.css"],
        ["Big Bang", "alt-css/bigbang.css"]
    ];

    const menu = document.querySelector('#theme-menu');
    const options = themes.map(theme => themeToOption(theme));
    menu.append(...options)
    addThemeMenuEventListener();
}

function themeToOption(theme) {
    const option = document.createElement('option');
    option.innerText = theme[0];
    option.value = theme[1];
    return option;
}

function addThemeMenuEventListener() {
    const menu = document.querySelector('#theme-menu');
    const link = document.querySelector('link');
    const body = document.querySelector('body');

    menu.addEventListener('change', (event) => {
        const file = event.target.value;
        link.href = file;
    })
}