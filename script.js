// Função para atualizar o conteúdo da etapa atual
      const serviceData = {
        marketing: {
          steps: [
            "Briefing",
            "Análise de Perfil",
            "Planejamento de Conteúdo",
            "Execução e Monitoramento",
          ],
          content: [
            "Reunimos informações sobre a marca, público e objetivos para montar o plano ideal.",
            "Analisamos o perfil do cliente ideal e a presença digital atual.",
            "Criamos uma estratégia de conteúdo com base nos objetivos traçados.",
            "Executamos as ações e monitoramos os resultados em tempo real.",
          ],
        },
        design: {
          steps: ["Pesquisa", "Wireframe", "Prototipação", "Entrega Final"],
          content: [
            "Entendimento do negócio, benchmark e referências visuais.",
            "Esboçamos a estrutura básica das telas para aprovação de layout.",
            "Desenvolvemos protótipos navegáveis com interações reais.",
            "Entrega dos arquivos finais otimizados e prontos para desenvolvimento.",
          ],
        },
        trafego: {
          steps: [
            "Diagnóstico",
            "Criação de Campanhas",
            "Teste A/B",
            "Otimização de ROI",
          ],
          content: [
            "Avaliamos o histórico e dados da conta para definir metas de tráfego.",
            "Desenvolvemos campanhas com segmentações específicas.",
            "Realizamos testes A/B com diferentes criativos e públicos.",
            "Ajustamos campanhas com foco em performance e retorno.",
          ],
        },
      };

      let currentService = "marketing";
      let currentStep = 0;

      function changeService(serviceName) {
        currentService = serviceName;
        currentStep = 0;

        // Atualizar a aba ativa
        document
          .querySelectorAll(".tab")
          .forEach((tab) => tab.classList.remove("active"));
        document
          .querySelector(`.tab[onclick*="${serviceName}"]`)
          .classList.add("active");

        // Renderizar os passos e o conteúdo do serviço selecionado
        renderSteps(currentService); // Passar o serviço atual
        renderContent();
      }

      function changeStep(index) {
        currentStep = index;
        renderSteps(currentService); // Passar o serviço atual
        renderContent();
      }

      function renderSteps(serviceKey) {
        const service = serviceData[serviceKey];
        if (!service || !service.steps) return;

        const steps = service.steps;
        const stepsLine = document.getElementById("steps-line");
        stepsLine.innerHTML = ""; // Limpar passos anteriores

        steps.forEach((step, index) => {
          // Criar container do passo
          const stepDiv = document.createElement("div");
          stepDiv.classList.add("step");
          if (index === currentStep) {
            stepDiv.classList.add("active");
          }

          // Ao clicar, atualizar o passo atual
          stepDiv.addEventListener("click", () => {
            changeStep(index); // Atualiza o conteúdo
          });

          // Criar círculo numerado
          const circle = document.createElement("div");
          circle.classList.add("step-circle");
          circle.textContent = index + 1;
          if (index === currentStep) {
            circle.classList.add("active");
          }

          // Criar título do passo
          const title = document.createElement("div");
          title.classList.add("step-title");
          title.textContent = step;

          // Montar a estrutura
          stepDiv.appendChild(circle);
          stepDiv.appendChild(title);
          stepsLine.appendChild(stepDiv);

          // Linha conectora entre passos
          if (index < steps.length - 1) {
            const line = document.createElement("div");
            line.classList.add("line");
            stepsLine.appendChild(line);
          }
        });

        updateStepVisuals();
      }

      function updateStepVisuals() {
        const stepCircles = document.querySelectorAll(".step-circle");
        const lines = document.querySelectorAll(".line");

        stepCircles.forEach((circle, index) => {
          if (index <= currentStep) {
            circle.classList.add("active"); // Ativa os itens até o índice atual
          } else {
            circle.classList.remove("active"); // Desativa os itens após o índice atual
          }
        });

        lines.forEach((line, index) => {
          if (index < currentStep) {
            line.classList.add("active"); // Ativa as linhas até o índice atual
          } else {
            line.classList.remove("active"); // Desativa as linhas após o índice atual
          }
        });

        const contentBox = document.getElementById("step-content");
        contentBox.innerHTML = `<p>${serviceData[currentService].content[currentStep]}</p>`;
      }

      function renderContent() {
        const contentBox = document.getElementById("step-content");
        contentBox.textContent =
          serviceData[currentService].content[currentStep];
      }

      // Inicialização
      document.addEventListener("DOMContentLoaded", () => {
        renderSteps(currentService); // Passar o serviço atual
        renderContent();
      });

      document.addEventListener("DOMContentLoaded", () => {
        const contatoSection = document.querySelector("#contato");

        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                contatoSection.classList.add("animate");
                observer.unobserve(contatoSection); // só anima uma vez
              }
            });
          },
          {
            threshold: 0.5, // 50% da seção visível
          }
        );

        if (contatoSection) {
          observer.observe(contatoSection);
        }
      });

      function enviarMensagem(e) {
    e.preventDefault();
    const form = e.target;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      alert("🚀 Mensagem enviada com sucesso!");
      form.reset();
    })
    .catch(error => {
      alert("❌ Erro ao enviar. Tente novamente.");
    });
  }

  const form = document.getElementById("form-contato");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        showToast("Mensagem enviada com sucesso! 🚀");
      } else {
        showToast("Algo deu errado 😢");
      }
    } catch (err) {
      showToast("Erro de conexão ⚠️");
    }
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  let currentCardIndex = 0;
  const cards = document.querySelectorAll(".cartao");
  const indicators = document.querySelectorAll(".indicador");

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentCardIndex);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentCardIndex);
    });
  }

  function navigateService(direction) {
    currentCardIndex += direction;

    if (currentCardIndex < 0) {
      currentCardIndex = cards.length - 1;
    } else if (currentCardIndex >= cards.length) {
      currentCardIndex = 0;
    }

    updateCards();
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    updateCards();
  });
