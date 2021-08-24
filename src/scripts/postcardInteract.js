import interact from 'interactjs';

/*eslint-disable no-unused-vars*/
const position = { x: 0, y: 0 };
interact('.interactable').draggable({
    listeners: {
        start(event) {
            console.log(event.type, event.target);
        },
        move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`;
        },
    },
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: '.postcard'
        })
    ]
});