import loadText from "./loadText";
class UI {
    constructor() {
        // Nav and Tools Elements
        this.navItemWrapEls = document.getElementsByClassName('navitem-wrap');
        this.designItemWrapEls = document.getElementsByClassName('designitem-wrap');

        // Text Elements
        this.fontFamilyEl = document.querySelector('.font-family');
        this.fontSizeEl = document.querySelector('.font-size');
        this.fontColorEl = document.querySelector('.color');
        this.toolDetailsEl = document.querySelectorAll('.themes, .more-settings, .text-change, .addedThemes');
        this.defaultFontStyles = {
            'font-family': 'Georgia',
            'font-size': '16px',
            'color': '#ffffff'
        };

        // Themes Elements
        this.themeThumbnails = document.querySelectorAll('.theme-thumbnail');

        // Add Image Elements
        this.addImageFile = document.querySelector('#addImageFile');
        this.imageTheme = null;
        this.addedThemesEl = document.querySelector('.addedThemes');

        // More Settings Elements
        this.currentZoomEl = document.querySelector('.currentZoom');
        this.overlaySlider = document.querySelector('.overlay-slider');
        this.overlayOutput = document.querySelector('.overlay-slider-value');

        // Post Elements
        this.postCardEl = document.querySelector('.postcard');
        this.postCardBgEl = document.querySelector('.postcard .background');
        this.interactableEls = document.querySelectorAll('.interactable');
        this.activeInteractable = null;
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

    switchTheme = (linkToImg) => {
        // const linkToImg = e.target.src;
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
        this.switchProperty('font-size', this.fontSizeEl.value);
    }

    switchProperty = (property, value, units = null) => {
        // this.interactableEls.forEach((item) => {
        //     item.style[property] = units ? value + units : value;
        // });
        if (this.activeInteractable) {
            this.activeInteractable.style[property] = units ? value + units : value;
        }
    }

    rgbToHex = (rgb) => {
        const re = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        const match = re.exec(rgb);
        if (match) {
            for (let i = 1; i < 4; i++) {
                const hex = Number(match[i]).toString(16);
                match[i] = hex.length < 2 ? '0' + hex : hex;
            }
            // console.log("RGB", rgb, "MATCH", match);
            return '#' + match[1] + match[2] + match[3];
        } else {
            return rgb;
        }
    }

    focusInteractable = (e) => {
        this.unfocusInteractable();
        this.activeInteractable = e.target;
        this.activeInteractable.classList.add('active'); // new interactable activated
        this.setTextProperties();
    }

    unfocusInteractable = () => {
        this.activeInteractable?.classList.remove('active'); // old interactable deactivated
    }

    setTextProperties = () => {
        const propString = this.activeInteractable.style.cssText;
        const inlineProps = {};
        if (propString !== "") {
            const propNameAndVals = propString.split(';').filter(i => i);
            for (let propNameAndVal of propNameAndVals) {
                const temp = propNameAndVal.split(':');
                inlineProps[temp[0].trim()] = temp[1].trim();
            }
        }
        this.fontFamilyEl.value = inlineProps['font-family'] || this.defaultFontStyles['font-family'];
        this.fontSizeEl.value = inlineProps['font-size'] || this.defaultFontStyles['font-size'];
        this.fontColorEl.value = this.rgbToHex(inlineProps['color']) || this.defaultFontStyles['color'];
        // console.log(this.fontColorEl.value, inlineProps['color'], this.defaultFontStyles['color']);
    };

    addImage = (e) => {
        // URL.revokeObjectURL(this.imageTheme);
        e.target.files.forEach((file) => {
            const linkToImg = URL.createObjectURL(file);
            const divEl = document.createElement('div');
            divEl.classList.add('theme-wrap');
            const imageEl = document.createElement('img');
            imageEl.classList.add('theme-thumbnail');
            imageEl.setAttribute('src', linkToImg);
            imageEl.addEventListener('click', (e) => ui.switchTheme(e.target.src));
            divEl.appendChild(imageEl);
            this.addedThemesEl.appendChild(divEl);
            this.switchTheme(linkToImg);
            this.postCardBgEl.src = linkToImg;
        });
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
        loadText({ 'default': this.defaultFontStyles, 'font-family': this.fontFamilyEl, 'font-size': this.fontSizeEl, 'color': this.fontColorEl }); // Dynamically load Fonts
        this.fireEvent('change', this.fontFamilyEl); // initialising font family
        this.fireEvent('change', this.fontSizeEl); // initialising font size
        this.fireEvent('input', this.fontColorEl); // initialising font color
    }
}

// Exports are singleton so will return the same instance wherever it's imported.
export let ui = new UI();