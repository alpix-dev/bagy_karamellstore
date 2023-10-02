 let apx_clientZip = null;

if (document.querySelector('.wrapper-checkout')) {
  const inputPostalCode = document.querySelector('[autocomplete="postal-code"]');
  const elementoAlvo = document.querySelector('.checkout-shipping > .step');

  if (inputPostalCode.value.length === 9) {
    apx_clientZip = parseInt(inputPostalCode.value.replace('-', ''));
  }

  inputPostalCode.addEventListener('keyup', function () {
    if (inputPostalCode.value.length === 9) {
      apx_clientZip = parseInt(inputPostalCode.value.replace('-', ''));
    }
  });

  // Criar uma função de callback a ser executada quando a classe mudar
  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (elementoAlvo.classList.contains('-active')) {
          const apxTitleZip = document.querySelector('.apx-titlezip');
          if (apxTitleZip) {
            apxTitleZip.remove();
          }
          
          promocoes_zip.forEach(item => {
            if (apx_clientZip >= item.cep_ini && apx_clientZip <= item.cep_fim) {
              const label = document.createElement('label');
              label.classList.add('apx-titlezip');
              label.innerHTML = `<b>Aproveite!!</b> Descontos no frete para sua região!`;

              const p = document.createElement('p');
              p.id = 'apx-linhazip';
              p.style.lineHeight = '24px';
              p.style.display = 'block';
              p.style.fontSize = '12px';
              p.style.margin = '15px 0 0 0';
              p.innerHTML = item.msg;

              const stepTitle = document.querySelector('.checkout-shipping .step-title');
              stepTitle.insertAdjacentElement('afterend', label);
              stepTitle.insertAdjacentElement('afterend', p);
            }
            console.log(item);
          });
        }
      }
    }
  };

  // Configurar o observador de mutação
  const observer = new MutationObserver(callback);

  // Configurar as opções de observação (observe mudanças em atributos)
  const config = { attributes: true };

  // Iniciar a observação no elemento alvo
  observer.observe(elementoAlvo, config);
}
