import { ui } from './ui';

const App = (function (ui) {
    // Nav and Tools Listeners
    ui.designItemWrapEls.forEach((item) => {
        item.addEventListener('click', ui.switchDesignItem);
    });

    // Text Listeners
    ui.fontFamilyEl.addEventListener('change', (e) => ui.switchFontFamily(e.target.value));
    ui.fontSizeEl.addEventListener('change', (e) => ui.switchFontSize(e.target.value));
    ui.fontColorEl.addEventListener('input', (e) => ui.switchFontColor(e.target.value));
    ui.addInteractableEl.addEventListener('click', ui.addInteractable);
    ui.removeInteractableEl.addEventListener('click', ui.removeInteractable);

    // Theme Listeners
    ui.themeThumbnails.forEach((item) => {
        item.addEventListener('click', (e) => {
            ui.switchTheme(e.target.src);
        });
    });

    // Add Image Listener
    document.querySelector('#addimage').addEventListener('click', () => ui.addImageFile.click());
    ui.addImageFile.addEventListener('change', ui.addImage);


    // More Settings Listeners
    document.querySelector('.zoomIn').addEventListener('click', () => ui.zoom(10));
    document.querySelector('.zoomOut').addEventListener('click', () => ui.zoom(-10));
    ui.overlaySlider.addEventListener('input', ui.overlay);
    ui.exportImgEl.addEventListener('click', ui.exportImg);

    // Post Listeners
    ui.interactableEls.forEach((interactable) => {
        interactable.addEventListener('click', ui.focusInteractable);
        interactable.addEventListener('paste', (e)=>ui.richTextToPlain(e));
    });
    ui.postCardBgEl.addEventListener('click', ui.unfocusInteractable);

    return {
        init: () => {
            // Method Runs on start
            ui.init();
        },
    };
})(ui);

App.init();