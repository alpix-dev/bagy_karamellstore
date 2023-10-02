 
  let apx_clientZip = null;

if ($('.wrapper-checkout').length > 0) {
  if ($('[autocomplete="postal-code"]').val().length === 9) {
    apx_clientZip = parseInt($('[autocomplete="postal-code"]').val().replace('-', ''));
  }

  $('[autocomplete="postal-code"]').keyup(function () {
    if ($('[autocomplete="postal-code"]').val().length === 9) {
      apx_clientZip = parseInt($('[autocomplete="postal-code"]').val().replace('-', ''));
    }
  });

  // Selecionar o elemento que você deseja monitorar
  const elementoAlvo = document.querySelector('.checkout-shipping > .step');

  // Criar uma função de callback a ser executada quando a classe mudar
  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (elementoAlvo.classList.contains('-active')) {
          $('.apx-titlezip').remove();
          promocoes_zip.forEach(item => {
            if (apx_clientZip >= item.cep_ini && apx_clientZip <= item.cep_fim) {
              $(`<label class="apx-titlezip"><b>Aproveite!!</b> Descontos no frete para sua região!</label><p id="apx-linhazip" style="line-height: 24px;display: block;font-size: 12px;margin:15px 0 0 0">${item.msg}</p>`).insertAfter('.checkout-shipping .step-title');
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