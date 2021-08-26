import { ui } from './ui';

const App = (function (ui) {
    // Nav and Tools Listeners
    ui.designItemWrapEls.forEach((item) => {
        item.addEventListener('click', ui.switchDesignItem);
    });

    // Text Listeners
    ui.fontFamilyEl.addEventListener('change', ui.switchFontFamily);
    ui.fontSizeEl.addEventListener('change', ui.switchFontSize);
    ui.fontColorEl.addEventListener('input', ui.switchFontColor);

    // Theme Listeners
    ui.themeThumbnails.forEach((item) => {
        item.addEventListener('click', ui.switchTheme);
    });

    // Add Image Listener
    document.querySelector('#addimage').addEventListener('click', ()=>ui.addImageFile.click());
    ui.addImageFile.addEventListener('change', ui.addImage);


    // More Settings Listeners
    document.querySelector('.zoomIn').addEventListener('click', () => ui.zoom(10));
    document.querySelector('.zoomOut').addEventListener('click', () => ui.zoom(-10));
    ui.overlaySlider.addEventListener('input', ui.overlay);

    // Post Listeners

    return {
        init: () => {
            // Method Runs on start
            ui.init();
        },
    };
})(ui);

App.init();