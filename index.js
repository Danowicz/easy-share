const openBtn = document.getElementById('btn-open');

openBtn.addEventListener('click', () => {
    renders.panelRender();
});

const settings = {

    parameters: {
        bgColor: '#f9f9f9',
        shadowOpacity: '.8', // from 0 to 1
        fontColor: '#444',
        animations: true,
        links: [ 'copy', 'email', 'whatsapp', 'linkedin', 'telegram', 'twitter' ],
        message: 'Da só uma olhada nesse link!'
    },

    linkParameters(message, url) {
        let shareData = [];
        message = encodeURIComponent(message);
        this.parameters.links.forEach(link => {
            let icon = `fab fa-${link}`;
            let shareLink;
            switch (link) {
                case 'copy':
                    icon = 'fas fa-copy'
                    break;
                case 'email':
                    icon = 'fas fa-envelope'
                    shareLink =`mailto:?subject=${message}&amp;body=${url}`
                    break;
                case 'whatsapp':
                    shareLink = `https://wa.me/?text=${message}+${url}`
                    break;
                case 'facebook':
                    shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
                    break;
                case 'twitter':
                    shareLink = `https://twitter.com/intent/tweet?text=${message}+${url}`    
                    break;
                case 'linkedin':
                    shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
                    break;
                case 'telegram':
                    shareLink = `https://t.me/share/url?url=${url}&text=${message}`
                    break;
            }

            if (shareLink) shareData.push({name: link, icon, shareLink});
            else shareData.push({name: link, icon});
        })
        return [shareData, url];
    },

    config({bgColor, shadowOpacity, fontColor, animations}, panel, shadow) {

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

const renders = {
    
    buttonRender([shareData, url]) {
        const buttonsGrid = document.querySelector('.buttons__grid');
        shareData.forEach((link => {
            buttonsGrid.insertAdjacentHTML("beforeend", `
                <div class="buttons__wrapper">
                    <a target="_blank" ${link.shareLink ? `href=${link.shareLink}` : "id=copy"} class="buttons__btn">
                        <i class="${link.icon}"></i>
                    </a>
                    <p class="buttons__label">${link.name}</p>
                </div>`
            )
        }))

        // Create a temporary input -> set value to URL -> copy input -> delete;
        if (shareData.find(data => data.name === 'copy')) {
            const copy = document.getElementById('copy');
            copy.addEventListener('click', () => {
                const input = document.createElement('input');
                input.value = url;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                input.remove();
                window.alert('URL Copiada para a área de transferência.')
            })
        } 
    },

    panelRender() {
        const panelDiv = `

            <div id="panel" class="panel">
                <button id="btn-close" class="panel__close">✕</button>
                <p class="panel__title">Compartilhar</p>
                <div class="buttons__grid"></div>
            </div>`

        const shadowDiv = '<div id="shadow"></div>'
    
        document.body.insertAdjacentHTML("afterend", panelDiv + shadowDiv) ;

        const panel = document.getElementById('panel');
        const shadow = document.getElementById('shadow');
        
        settings.config(settings.parameters, panel, shadow);
        
        this.buttonRender(settings.linkParameters(settings.parameters.message, window.location.href));
        
        const closeBtn = document.getElementById('btn-close');
        closeBtn.addEventListener('click', () => {
            panel.remove();
            shadow.remove();
        });

    }
}

