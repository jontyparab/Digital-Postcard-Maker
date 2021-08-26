import loadText from "./loadText";
class UI {
    constructor() {
        // Nav and Tools Elements
        this.navItemWrapEls = document.getElementsByClassName('navitem-wrap');
        this.designItemWrapEls = document.getElementsByClassName('designitem-wrap');

        // Text Elements
        this.fontFamilyEl = document.querySelector('.font-family');
        this.fontSizeEl = document.querySelector('.font-size');
        this.fontColorEl = document.querySelector('.font-color');
        this.toolDetailsEl = document.querySelectorAll('.themes, .more-settings, .text-change');

        // Themes Elements
        this.themeThumbnails = document.querySelectorAll('.theme-thumbnail');

        // Add Image Elements
        this.addImageFile = document.querySelector('#addImageFile');
        this.imageTheme = null;

        // More Settings Elements
        this.currentZoomEl = document.querySelector('.currentZoom');
        this.overlaySlider = document.querySelector('.overlay-slider');
        this.overlayOutput = document.querySelector('.overlay-slider-value');

        // Post Elements
        this.postCardEl = document.querySelector('.postcard');
        this.postCardBgEl = document.querySelector('.postcard .background');
        this.interactableEls = document.querySelectorAll('.interactable');
    }

    switchDesignItem = (e) => {
        this.designItemWrapEls.forEach(item => {
            item.classList.remove('active');
        });
        const selectedItem = e.target.closest('.designitem-wrap');
        selectedItem.classList.add('active');
        // Getting the data-type attribute
        const type = selectedItem.getAttribute('data-type');
        this.switchDesignDetails(type);
    }

    switchDesignDetails = (type) => {
        this.toolDetailsEl.forEach(item => {
            item.hidden = true;
        });
        this.toolDetailsEl.forEach((item) => {
            if (item.getAttribute('data-type') === type) {
                item.hidden = false;
            }
        });
    }

    switchTheme = (e) => {
        const linkToImg = e.target.src;
        this.postCardBgEl.src = linkToImg;
    }

    switchFontFamily = () => {
        this.fontFamilyEl.style.fontFamily = this.fontFamilyEl.value;
        this.switchProperty('font-family', this.fontFamilyEl.value);
    }

    switchFontColor = () => {
        this.switchProperty('color', this.fontColorEl.value);
    }

    switchFontSize = () => {
        this.switchProperty('font-size', this.fontSizeEl.value, 'rem');
    }

    switchProperty = (property, value, units = null) => {
        this.interactableEls.forEach((item) => {
            item.style[property] = units ? value + units : value;
        });
    }

    addImage = (e) => {
        URL.revokeObjectURL(this.imageTheme);
        this.imageTheme = URL.createObjectURL(e.target.files[0]);
        this.postCardBgEl.src = this.imageTheme;
        
    }

    zoom = (val) => {
        const currentWidth = parseInt(this.postCardEl.style.maxWidth);
        const newWidth = currentWidth + val || '100%';
        // console.log(currentWidth, this.postCardEl.style.maxWidth);
        if (!currentWidth) {
            this.postCardEl.style.maxWidth = "100%";
            this.currentZoomEl.textContent = newWidth;
        } else if (newWidth >= 10 && newWidth <= 100) {
            this.postCardEl.style.maxWidth = `${newWidth}%`;
            this.currentZoomEl.textContent = `${newWidth}%`;
        }
    }

    overlay = (e) => {
        this.overlayOutput.textContent = e.target.value;
        this.overlayOutput.style.left = `${e.target.value}%`;
        this.overlaySlider.style.background = `linear-gradient(90deg, var(--color-2) ${this.overlaySlider.value}%, var(--color-13) ${this.overlaySlider.value}%)`;
        this.postCardBgEl.style.filter = `brightness(${e.target.value}%)`;
    }

    fireEvent = (name, element) => {
        const event = new Event(name);
        element.dispatchEvent(event);
    }

    init = () => {
        this.zoom(0); // setting up zoom level
        this.fireEvent('input', this.overlaySlider); // initialising overlay slider
        loadText({ 'font-family': this.fontFamilyEl, 'font-size': this.fontSizeEl, 'font-color': this.fontColorEl }); // Dynamically load Fonts
        this.fireEvent('change', this.fontFamilyEl); // initialising font family
        this.fireEvent('change', this.fontSizeEl); // initialising font size
        this.fireEvent('input', this.fontColorEl); // initialising font color
    }
}

// Exports are singleton so will return the same instance wherever it's imported.
export let ui = new UI();