const openBtn = document.getElementById('btn-open');
let panel;
let closeBtn;
let shadow;

const parameters = {
    bgColor: 'white',
    shadowOpacity: '.8', // from 0 to 1
    fontColor: '#444',
    animations: true,

    links: [ 'copy', 'email', 'whatsapp', 'facebook', 'linkedin', 'telegram', 'twitter' ],
    message: 'Da só uma olhada nesse link!'
}

const config = ({bgColor, shadowOpacity, fontColor, animations}) => {
    panel.style.cssText = `
        ${animations ? '' : 'animation: none;'}
        background-color: ${bgColor};
        color: ${fontColor};
        `

        shadow.style.cssText = `
        ${animations ? '' : 'animation: none;'}
        opacity: ${shadowOpacity};
        `
    }

const buttonRender = ({links, message}) => {
    const buttonGrid = document.querySelector('.buttons__grid')
    const url = window.location.href;
    const text = encodeURIComponent(message);
    links.forEach(link => {
        let icon = `<i class="fab fa-${link}"></i>`;
        let shareLink;
        switch (link) {
            case 'copy':
                icon = '<i class="fas fa-copy"></i>'
                break;
            case 'email':
                icon = '<i class="fas fa-envelope"></i>'
                shareLink = `mailto:?subject=${text}&amp;body=${url}`
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${text}+${url}`
                break;
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${text}+${url}`
                break;
            case 'linkedin':
                shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
                break;
            case 'telegram':
                shareLink = `https://t.me/share/url?url=${url}&text=${text}`
                break;
        }
        
        buttonGrid.innerHTML +=
            `<div class="buttons__wrapper">
                <a target="_blank" href=${shareLink} id="btn-share" class="buttons__btn">${icon}</a>
                <p class="buttons__label">${link}</p>
            </div>`    
    })
}

const render = () => {
    if (document.getElementById('panel')) return;

    const panelDiv = document.createElement('div');
    panelDiv.id = 'panel';
    panelDiv.className = 'panel';

    const shadowDiv = document.createElement('div');
    shadowDiv.id = 'shadow';

    document.body.appendChild(panelDiv);
    document.body.appendChild(shadowDiv);

    panel = document.getElementById('panel');
    shadow = document.getElementById('shadow');

    config(parameters);

    panel.innerHTML =
    `
        <button id="btn-close" class="panel__close">✕</button>
        <p class="panel__title">Compartilhar</p>
        <div class="buttons__grid"></div>
    `
    buttonRender(parameters); 

    closeBtn = document.getElementById('btn-close');

    closeBtn.addEventListener('click', () => {
        panel.remove();
        shadow.remove();
    });
};

openBtn.addEventListener('click', () => {
    render();
});