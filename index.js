const openBtn = document.getElementById('btn-open');
let panel;
let closeBtn;
let shadow;


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

    panel.innerHTML = 
    `
        <button id="btn-close" class="panel__close">✕</button>
        <p class="panel__title">Compartilhar</p>
        <div class="buttons__grid">
            <div class="buttons__wrapper">
                <a id="btn-share" class="buttons__btn"><i class="far fa-copy"></i></i></i></a>
                <p class="buttons__label">Copiar link</p>
            </div>
            <div class="buttons__wrapper">
                <a id="btn-share" class="buttons__btn"><i class="far fa-envelope"></i></a>
                <p class="buttons__label">Email</p>
            </div>
            <div class="buttons__wrapper">
                <a id="btn-share" class="buttons__btn"><i class="fab fa-whatsapp"></i></a>
                <p class="buttons__label">Whatsapp</p>
            </div>
            <div class="buttons__wrapper">
                <a id="btn-share" class="buttons__btn"><i class="fab fa-facebook"></i></a>
                <p class="buttons__label">Facebook</p>
            </div>
            <div class="buttons__wrapper">
                <a id="btn-share" class="buttons__btn"><i class="fab fa-twitter"></i></a>
                <p class="buttons__label">Twitter</p>
            </div>
        </div>
    `

    closeBtn = document.getElementById('btn-close');

    closeBtn.addEventListener('click', () => {
        panel.remove();
        shadow.remove();
    });
};

openBtn.addEventListener('click', render);