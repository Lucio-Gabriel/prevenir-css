// MODAL MOBILE MENU
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.add("open");
});

closeBtn.addEventListener("click", function () {
  mobileMenu.classList.remove("open");
});

const mobileMenuLinks = mobileMenu.querySelectorAll("nav a");
mobileMenuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
  });
});

// SCRIPT HOVER HEADER BRANCO
const headerBg = document.getElementById("header-bg");
const navLinks = document.getElementById("nav-links");
const ctaBtn = document.getElementById("cta-btn");

// window.addEventListener("scroll", () => {
//     if (window.scrollY > 50) {
//         Header branco
//         headerBg.classList.remove("bg-[#2490E3]");
//         headerBg.classList.add("bg-white");

//         navLinks.classList.remove("text-white");
//         navLinks.classList.add("text-[#092A49]");

//         ctaBtn.classList.remove("bg-[#092A49]", "text-white");
//         ctaBtn.classList.add("bg-[#2490E3]", "text-white");
//     } else {
//         Header azul original
//         headerBg.classList.add("bg-[#2490E3]");
//         headerBg.classList.remove("bg-white");

//         navLinks.classList.add("text-white");
//         navLinks.classList.remove("text-[#092A49]");

//         ctaBtn.classList.add("bg-[#092A49]", "text-white");
//         ctaBtn.classList.remove("bg-[#2490E3]");
//     }
// });

// ANIMAÇÃO DE CONTAGEM PARA A SEÇÃO DE ESTATÍSTICAS

/**
 * Anima um número de 0 até um valor final dentro de um elemento HTML.
 * @param {HTMLElement} el O elemento (ex: <h3>) que contém o texto a ser animado.
 * @param {number} duration A duração da animação em milissegundos.
 */
function animateCountUp(el, duration = 2000) {
    const originalText = el.textContent;
    
    // Extrai o número do texto, removendo caracteres não numéricos.
    let targetNumber = parseInt(originalText.replace(/[^\d]/g, ''), 10);

    // Lida com casos especiais como "mil".
    if (originalText.toLowerCase().includes('mil')) {
        targetNumber *= 1000;
    }

    if (isNaN(targetNumber)) {
        console.error("Não foi possível extrair um número válido de:", originalText);
        return;
    }

    // Separa o prefixo (ex: "+ de ") e o sufixo (ex: " Estados").
    const prefix = originalText.match(/^[^\d]*/)?.[0] || '';
    const suffix = originalText.match(/\d([^\d].*)/)?.[1] || '';

    let startTime = null;

    const step = (currentTime) => {
        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentNumber = Math.floor(progress * targetNumber);

        // Formata o número com separador de milhar (ex: 5.000)
        const formattedNumber = currentNumber.toLocaleString('pt-BR');

        // Remonta o texto com o número atualizado
        el.textContent = `${prefix}${formattedNumber}${suffix}`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Garante que o texto final seja exatamente o original para manter a formatação.
            el.textContent = originalText;
        }
    };

    window.requestAnimationFrame(step);
}

// Usa IntersectionObserver para iniciar a animação quando a seção estiver visível.
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('stats-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3Elements = statsSection.querySelectorAll('h3');
                h3Elements.forEach(h3 => animateCountUp(h3));
                observer.unobserve(statsSection); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 }); // Inicia quando 50% da seção estiver visível

    observer.observe(statsSection);
});

// Modal de serviço
// const modal = document.getElementById('modal');
// const modalContent = modal.querySelector('div');
// const modalTitle = document.getElementById('modal-title');
// const modalText = document.getElementById('modal-content');
// const closeBtns = [document.getElementById('closeModalBtn'), document.getElementById('closeModalBtn2')];

// Seleciona todos os botões dos cards
// document.querySelectorAll('.open-modal').forEach(button => {
//     button.addEventListener('click', (e) => {
//         const card = e.target.closest('div[data-title]');
//         const title = card.getAttribute('data-title');
//         const content = card.getAttribute('data-content');

//         // Preenche o modal com os dados do card clicado
//         modalTitle.textContent = title;
//         modalText.textContent = content;

//         // Mostra o modal
//         modal.classList.remove('hidden');
//         setTimeout(() => {
//             modalContent.classList.remove('opacity-0', 'scale-90');
//             modalContent.classList.add('opacity-100', 'scale-100');
//         }, 10);
//     });
// });

// Fecha o modal
// function closeModal() {
//     modalContent.classList.remove('opacity-100', 'scale-100');
//     modalContent.classList.add('opacity-0', 'scale-90');
//     setTimeout(() => {
//         modal.classList.add('hidden');
//     }, 200);
// }

// closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

// modal.addEventListener('click', (e) => {
//     if (e.target === modal) closeModal();
// });

// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
// });

// modal services
(function () {
  const modal = document.getElementById("modal");
  const modalBox = modal.querySelector(".services-modal-box"); // classe nova
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeBtns = [document.getElementById("closeModalBtn"), document.getElementById("closeModalBtn2")];

  function openModal(card) {
    modalTitle.textContent = card.getAttribute("data-title") || "Serviço";
    modalContent.textContent = card.getAttribute("data-content") || "";

    modal.classList.add("active");        // mostra o backdrop (display:flex)
    setTimeout(() => modalBox.classList.add("visible"), 10); // animação de entrada
  }

  function closeModal() {
    modalBox.classList.remove("visible"); // inicia animação de saída
    setTimeout(() => modal.classList.remove("active"), 200);
  }

  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest("[data-title]");
      if (card) openModal(card);
    });
  });

  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();