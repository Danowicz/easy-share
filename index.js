let openBtn;
const settings = {

    parameters: {
        bgColor: '#f9f9f9',
        shadowOpacity: '.8', // from 0 to 1
        fontColor: '#444',
        animations: true,
        links: [ 'copy', 'email', 'whatsapp', 'facebook', 'linkedin', 'telegram', 'twitter' ],
        message: 'Da só uma olhada nesse link!'
    },

    linkParameters(links) {
    
        links.forEach(link, () => {
            return 
            [
                {
                    name: copy,
                    icon: 'fas fa-copy',
                    copyURL() {
                        
                    }

                }
            ]
        })
    
    },

    config({bgColor, shadowOpacity, fontColor, animations}) {

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
}


}

const buttonRender = ({links, message}) => {

    const buttonGrid = document.querySelector('.buttons__grid');
    const url = window.location.href;
    const text = encodeURIComponent(message);

    links.forEach(link => {
        let icon = `fab fa-${link}`
        let shareLink;

        switch (link) {
            case 'copy':
                icon = "fas fa-copy"
                link = "Copiar URL"
                break;
            case 'email':
                icon = "fas fa-envelope"
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
                <a target="_blank" ${shareLink ? `href=${shareLink}` : "id=copy"} class="buttons__btn">
                    <i class="${icon}"></i>
                </a>
                <p class="buttons__label">${link}</p>
            </div>`
    });

    // Create an input -> set input value to URL -> copy input value -> remove input;
    const copyBtn = document.getElementById('copy');
    copyBtn.addEventListener('click', () => {
        
    })
}

const panelRender = () => {
    const panelDiv = '<div id="panel" class="panel"></div>'
    const shadowDiv = '<div id="shadow"></div>'

    document.body.innerHTML += panelDiv + shadowDiv;

    const panel = document.getElementById('panel');
    const shadow = document.getElementById('shadow');

    settings.config(settings.parameters);

    panel.innerHTML =
    `
        <button id="btn-close" class="panel__close">✕</button>
        <p class="panel__title">Compartilhar</p>
        <div class="buttons__grid"></div>
    `

    buttonRender(settings.parameters); 

    const closeBtn = document.getElementById('btn-close');

    closeBtn.addEventListener('click', () => {
        panel.remove();
        shadow.remove();
    });

};

openBtn = document.getElementById('btn-open');
openBtn.addEventListener('click', () => {
    panelRender();
});