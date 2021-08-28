export default function loadText(dropdowns) {
    const optionFontFamilyEls = FONT_FAMILY.map((font)=>{
        const optionEl = document.createElement('option');
        const newContent = document.createTextNode(`${font}`);
        optionEl.appendChild(newContent);
        optionEl.classList.add('dropdown-option');
        optionEl.setAttribute('style', `font-family:${font}`);
        optionEl.setAttribute('value', `${font}`);
        return optionEl;
    });
    dropdowns['font-family'].append(...optionFontFamilyEls);
    dropdowns['font-family'].value = dropdowns['default']['font-family']; // initial value

    const optionFontSizeEls = FONT_SIZE().map((size)=>{
        const optionEl = document.createElement('option');
        const newContent = document.createTextNode(`${size}`);
        optionEl.appendChild(newContent);
        optionEl.classList.add('dropdown-option');
        optionEl.setAttribute('value', `${size}`);
        return optionEl;
    });
    dropdowns['font-size'].append(...optionFontSizeEls);
    dropdowns['font-size'].value = dropdowns['default']['font-size']; // initial value



    dropdowns['color'].value = dropdowns['default']['color']; // initial value
}

const FONT_FAMILY = [
    'Style Script',
    'Verdana',
    'Segoe UI',
    'Lucida Sans',
    'Marmelad',
    'sans-serif',
    'Georgia',
    'Impact',
    'Helvetica',
    'Luminari',
    'Monaco',
    'Garamond',
    'Annie Use Your Telescope',
    'Aldrich',
    'Cinzel Decorative',
    'Trade Winds',
    'Exo',
    'Courier New',
    'Ballet',
    'Brush Script MT',
    'Comic Sans MS',
];

const FONT_SIZE = ()=>{
    const sizeArr = [];
    for(let i=12; i<=80; i=i+4){
        sizeArr.push(i+'px');
    }
    return sizeArr;
};