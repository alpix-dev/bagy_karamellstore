let apx_clientZip = null;

if(history.state.current.includes('/carrinho')){
  (function(history){
      var pushState = history.pushState;
      history.pushState = function(state) {
          if (typeof history.onpushstate == "function") {
              history.onpushstate({state: state});
          }
          callStateChange();
          return pushState.apply(history, arguments);
      };
  })(window.history);

  (function() {
    var originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        this.addEventListener('load', function() {
            // Verifica se a URL da requisição contém "/shippings/"
            if (url.indexOf('/shippings/') !== -1) {              
                apxZip_cart();              
            }
        });
        originalOpen.apply(this, arguments);
    };
  })();
}


  
if(history.state.current.includes('/checkout')){
  setTimeout(() => {
  apxZip();
}, "4000");
}
  


function callStateChange(){
  console.log('chamou no state', history.state.current)
  setTimeout(() => {
    console.log(history.state);
    if(history.state.current.includes('/checkout')){
      apxZip();
    }    
  }, "2000");
  
}

function apxZip(){
  console.log('APXZIP');
    if ($('[autocomplete="postal-code"]').val().length === 9) {
      apx_clientZip = parseInt($('[autocomplete="postal-code"]').val().replace('-', ''));
    }

    $('body').on('keyup','[autocomplete="postal-code"]',function () {
      console.log('test')
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
                if(item.img){
                  $('<label class="apx-titlezip"><img style="width:100%;height:auto;" src="'+ item.img +'"/></label>').insertAfter('.checkout-shipping .step-title');
                }else{
                  $(`<label class="apx-titlezip"><b>Aproveite!!</b> Descontos no frete para sua região!</label><p class="apx-linhazip">${item.msg}</p>`).insertAfter('.checkout-shipping .step-title');
                }
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

function apxZip_cart(){
  console.log('APXZIP_cart');
    if ($('[autocomplete="postal-code"]').val().length === 9) {
      apx_clientZip = parseInt($('[autocomplete="postal-code"]').val().replace('-', ''));
    }

    $('body').on('keyup','[autocomplete="postal-code"]',function () {
      if ($('[autocomplete="postal-code"]').val().length === 9) {
        apx_clientZip = parseInt($('[autocomplete="postal-code"]').val().replace('-', ''));
      }
    });
   $('.apx-titlezip, .apx-linhazip').remove();
    promocoes_zip.forEach(item => {
      if (apx_clientZip >= item.cep_ini && apx_clientZip <= item.cep_fim) {
        if(item.img){
          $('<label class="apx-titlezip"><img style="width:100%;height:auto;" src="'+ item.img +'"/></label>').insertAfter('.cart-shipping > .ui-form-wrapper');
        }else{
          $(`<label class="apx-titlezip" style="margin-top:15px;"><b>Aproveite!!</b> Descontos no frete para sua região!</label><p class="apx-linhazip">${item.msg}</p>`).insertAfter('.cart-shipping > .ui-form-wrapper');
        }
      }
      console.log(item);
    });
    
}
