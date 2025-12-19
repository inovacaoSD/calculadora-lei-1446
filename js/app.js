// Dados do formulário de leads
let leadData = {
    name: '',
    email: '',
    phone: '',
    consent: false
};

// Estrutura das perguntas
const questions = [
    {
        id: 1,
        text: "Qual é a área total da edificação (existente + acréscimo, se houver)?",
        type: "numeric",
        unit: "m²",
        key: "areaTotal"
    },
    {
        id: 2,
        text: "Qual é o tamanho do lote ou gleba?",
        type: "numeric",
        unit: "m²",
        key: "tamanhoLote"
    },
    {
        id: 3,
        text: "Qual será o uso final da edificação?",
        type: "radio",
        key: "usoFinal",
        options: [
            { value: "R1", label: "Residencial Unifamiliar (R1)" },
            { value: "R2h", label: "Residencial Horizontal (R2h)" },
            { value: "R2v", label: "Residencial Vertical (R2v)" },
            { value: "nR1", label: "Não Residencial tipo 1 (nR1)" },
            { value: "nR2", label: "Não Residencial tipo 2 (nR2)" },
            { value: "nRa1", label: "Não Residencial Atividade tipo 1 (nRa1)" },
            { value: "nRa2", label: "Não Residencial Atividade tipo 2 (nRa2)" },
            { value: "nRa3", label: "Não Residencial Atividade tipo 3 (nRa3)" },
            { value: "nRa4", label: "Não Residencial Atividade tipo 4 (nRa4)" },
            { value: "Ind1a", label: "Industrial tipo 1a (Ind1a)" },
            { value: "Ind1b", label: "Industrial tipo 1b (Ind1b)" },
            { value: "outro", label: "Outro uso não listado acima" }
        ]
    },
    {
        id: 4,
        text: "Qual o tipo de intervenção pretendida?",
        type: "radio",
        key: "tipoIntervencao",
        options: [
            { value: "nova", label: "Edificação nova" },
            { value: "reforma_sem", label: "Reforma sem acréscimo de área" },
            { value: "reforma_com", label: "Reforma com acréscimo de área" },
            { value: "regularizacao", label: "Regularização de edificação existente" },
            { value: "muro", label: "Muro de Arrimo (desvinculado de edificação)" },
            { value: "demolicao", label: "Demolição (desvinculada de edificação)" },
            { value: "movimento", label: "Movimento de Terra (desvinculado de edificação)" },
            { value: "autorizacao", label: "Alvará de Autorização (tapume, estande, grua, canteiro)" }
        ]
    },
    {
        id: 5,
        text: "Se for reforma COM acréscimo: qual a área construída EXISTENTE?",
        type: "numeric",
        unit: "m²",
        key: "areaExistente",
        condition: (answers) => answers.tipoIntervencao === "reforma_com"
    },
    {
        id: 6,
        text: "Se for reforma COM acréscimo: qual será a área do ACRÉSCIMO?",
        type: "numeric",
        unit: "m²",
        key: "areaAcrescimo",
        condition: (answers) => answers.tipoIntervencao === "reforma_com"
    },
    {
        id: 7,
        text: "O imóvel possui alguma das características abaixo? (Marque todas que se aplicam)",
        type: "checkbox",
        key: "restricoes",
        options: [
            { value: "tombado", label: "Tombado, preservado ou em área tombada/envoltório" },
            { value: "manancial", label: "Em área de proteção de mananciais, ambiental ou APP" },
            { value: "srpv", label: "Necessita consulta ao Serviço Regional de Proteção ao Voo (SRPV)" },
            { value: "polo", label: "Atividade considerada Polo Gerador de Tráfego" },
            { value: "ambiental", label: "Sujeito a licenciamento ambiental" },
            { value: "viario", label: "Atingido por melhoramento viário previsto em lei" },
            { value: "contaminado", label: "Terreno potencialmente contaminado, suspeito ou contaminado" },
            { value: "desapropriacao", label: "Atingido por DUP, DIS ou processo de desapropriação" },
            { value: "sem_frente", label: "Sem frente para logradouro público oficial" },
            { value: "passeio", label: "Exigida reserva ou alargamento de passeio público" },
            { value: "metro", label: "Em perímetro de influência de linhas de metrô/trem" },
            { value: "operacao", label: "Em perímetro de Operação Urbana Consorciada ou PIU" },
            { value: "contratual", label: "Com restrições contratuais (art. 59 LPUOS)" },
            { value: "nenhuma", label: "Nenhuma das alternativas acima" }
        ]
    },
    {
        id: 8,
        text: "O imóvel é de propriedade da Administração Pública (União, Estado, Município) ou de suas autarquias?",
        type: "radio",
        key: "imovelPublico",
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
            { value: "nao_sei", label: "Não sei" }
        ]
    }
];

// Respostas do usuário
let answers = {};
let currentQuestion = 0;

// Elementos DOM
const leadFormSection = document.getElementById('leadFormSection');
const quizSection = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');
const leadForm = document.getElementById('leadForm');
const questionContainer = document.getElementById('questionContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    leadForm.addEventListener('submit', handleLeadFormSubmit);
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
});

// Manipular envio do formulário de leads
function handleLeadFormSubmit(e) {
    e.preventDefault();
    
    leadData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        consent: document.getElementById('consent').checked
    };

    // Salvar no localStorage
    localStorage.setItem('leadData', JSON.stringify(leadData));
    
    // Mostrar seção do quiz
    leadFormSection.style.display = 'none';
    quizSection.classList.add('active');
    
    // Carregar primeira pergunta
    showQuestion(0);
}

// Obter perguntas aplicáveis
function getApplicableQuestions() {
    return questions.filter(q => {
        if (q.condition) {
            return q.condition(answers);
        }
        return true;
    });
}

// Mostrar pergunta
function showQuestion(index) {
    const applicableQuestions = getApplicableQuestions();
    const question = applicableQuestions[index];
    
    if (!question) return;
    
    currentQuestion = index;
    
    // Atualizar barra de progresso
    const progress = ((index + 1) / applicableQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Renderizar pergunta
    let html = `
        <div class="question-card">
            <div class="question-number">Pergunta ${index + 1} de ${applicableQuestions.length}</div>
            <div class="question-text">${question.text}</div>
    `;
    
    if (question.type === 'numeric') {
        html += `
            <div class="numeric-input">
                <input type="number" 
                       id="answer_${question.key}" 
                       value="${answers[question.key] || ''}"
                       min="0"
                       step="0.01"
                       placeholder="Digite o valor">
                <span class="unit">${question.unit}</span>
            </div>
        `;
    } else if (question.type === 'radio') {
        html += '<div class="answer-options">';
        question.options.forEach(option => {
            const checked = answers[question.key] === option.value ? 'selected' : '';
            html += `
                <div class="answer-option ${checked}" onclick="selectRadio('${question.key}', '${option.value}', this)">
                    <input type="radio" 
                           name="${question.key}" 
                           value="${option.value}"
                           id="${question.key}_${option.value}"
                           ${answers[question.key] === option.value ? 'checked' : ''}>
                    <label for="${question.key}_${option.value}">${option.label}</label>
                </div>
            `;
        });
        html += '</div>';
    } else if (question.type === 'checkbox') {
        html += '<div class="checkbox-options">';
        const selectedValues = answers[question.key] || [];
        question.options.forEach(option => {
            const checked = selectedValues.includes(option.value) ? 'checked' : '';
            html += `
                <div class="checkbox-option ${checked}" onclick="toggleCheckbox('${question.key}', '${option.value}', this)">
                    <input type="checkbox" 
                           name="${question.key}" 
                           value="${option.value}"
                           id="${question.key}_${option.value}"
                           ${checked ? 'checked' : ''}>
                    <label for="${question.key}_${option.value}">${option.label}</label>
                </div>
            `;
        });
        html += '</div>';
    }
    
    html += '</div>';
    questionContainer.innerHTML = html;
    
    // Configurar botões
    prevBtn.style.display = index > 0 ? 'block' : 'none';
    
    if (index === applicableQuestions.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-check"></i> Ver Resultado';
    } else {
        nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right"></i>';
    }
}

// Selecionar opção de rádio
function selectRadio(key, value, element) {
    // Prevenir propagação se clicou no input diretamente
    event.stopPropagation();
    
    // Remover seleção anterior
    const parent = element.parentElement;
    parent.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
    });
    
    // Adicionar seleção atual
    element.classList.add('selected');
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    
    // Salvar resposta
    answers[key] = value;
}

// Alternar checkbox
function toggleCheckbox(key, value, element) {
    // Prevenir propagação se clicou no input diretamente
    event.stopPropagation();
    
    const checkbox = element.querySelector('input[type="checkbox"]');
    
    // Alternar o estado
    checkbox.checked = !checkbox.checked;
    
    // Atualizar classe visual
    if (checkbox.checked) {
        element.classList.add('checked');
    } else {
        element.classList.remove('checked');
    }
    
    // Inicializar array se não existir
    if (!answers[key]) {
        answers[key] = [];
    }
    
    if (checkbox.checked) {
        // Adicionar valor
        if (!answers[key].includes(value)) {
            answers[key].push(value);
        }
        
        // Se marcou "nenhuma", desmarcar outras
        if (value === 'nenhuma') {
            answers[key] = ['nenhuma'];
            const parent = element.parentElement;
            parent.querySelectorAll('.checkbox-option').forEach(opt => {
                if (opt !== element) {
                    opt.classList.remove('checked');
                    const cb = opt.querySelector('input[type="checkbox"]');
                    if (cb) cb.checked = false;
                }
            });
        } else {
            // Se marcou outra opção, remover "nenhuma"
            answers[key] = answers[key].filter(v => v !== 'nenhuma');
            const parent = element.parentElement;
            parent.querySelectorAll('.checkbox-option').forEach(opt => {
                const input = opt.querySelector('input[type="checkbox"]');
                if (input && input.value === 'nenhuma') {
                    opt.classList.remove('checked');
                    input.checked = false;
                }
            });
        }
    } else {
        // Remover valor
        answers[key] = answers[key].filter(v => v !== value);
    }
}

// Próxima pergunta
function nextQuestion() {
    const applicableQuestions = getApplicableQuestions();
    const question = applicableQuestions[currentQuestion];
    
    // Validar resposta
    if (question.type === 'numeric') {
        const input = document.getElementById('answer_' + question.key);
        const value = parseFloat(input.value);
        
        if (!input.value || isNaN(value) || value <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }
        
        answers[question.key] = value;
    } else if (question.type === 'radio') {
        if (!answers[question.key]) {
            alert('Por favor, selecione uma opção.');
            return;
        }
    } else if (question.type === 'checkbox') {
        if (!answers[question.key] || answers[question.key].length === 0) {
            alert('Por favor, selecione pelo menos uma opção.');
            return;
        }
    }
    
    // Ir para próxima ou mostrar resultado
    if (currentQuestion < applicableQuestions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showResult();
    }
}

// Pergunta anterior
function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// Mostrar resultado
function showResult() {
    quizSection.classList.remove('active');
    resultSection.classList.add('active');
    
    const result = evaluateEligibility();
    
    let html = '';
    
    if (result.eligible) {
        html = `
            <div class="result-card result-eligible">
                <div class="result-icon">✅</div>
                <h2 class="result-title">Parabéns! Seu projeto É ELEGÍVEL</h2>
                <p class="result-description">
                    Com base nas informações fornecidas, seu projeto se enquadra nos requisitos para o 
                    <strong>Licenciamento Autodeclaratório</strong> conforme a Lei Municipal nº 1.446/2025.
                </p>
            </div>
            
            <div class="info-box">
                <h3><i class="fas fa-list-check"></i> Próximos Passos</h3>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><strong>Validação de Titularidade:</strong> Comprove a propriedade ou posse do imóvel</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><strong>Documentação Técnica:</strong> Prepare projetos assinados por responsáveis técnicos habilitados</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><strong>Declarações:</strong> Obtenha as Anotações de Responsabilidade Técnica (ART/RRT)</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><strong>Taxas:</strong> Efetue o pagamento das taxas municipais aplicáveis</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><strong>Protocolo:</strong> Submeta o pedido através do sistema eletrônico da Prefeitura</span>
                    </li>
                </ul>
            </div>
            
            <div class="alert-box">
                <h4><i class="fas fa-exclamation-triangle"></i> Atenção - Responsabilidades</h4>
                <p>
                    <strong>Você e os responsáveis técnicos são solidariamente responsáveis pela veracidade das informações.</strong>
                    Falsidade ideológica é crime (art. 299 do Código Penal). Multas podem chegar a <strong>R$ 1.000,00 por m²</strong> 
                    em caso de irregularidades, além de impedimento de protocolar novos pedidos por 12 meses.
                </p>
            </div>
            
            <div class="info-box">
                <h3><i class="fas fa-clock"></i> Prazos</h3>
                <ul>
                    <li>
                        <i class="fas fa-info-circle"></i>
                        <span>O documento deve ser emitido em até <strong>30 dias</strong> após o protocolo</span>
                    </li>
                    <li>
                        <i class="fas fa-info-circle"></i>
                        <span>Após emissão, a obra pode ser iniciada imediatamente</span>
                    </li>
                    <li>
                        <i class="fas fa-info-circle"></i>
                        <span>A Prefeitura pode auditar por amostragem a qualquer momento</span>
                    </li>
                </ul>
            </div>
        `;
    } else {
        html = `
            <div class="result-card result-not-eligible">
                <div class="result-icon">❌</div>
                <h2 class="result-title">Projeto NÃO É ELEGÍVEL para Autodeclaração</h2>
                <p class="result-description">
                    Com base nas informações fornecidas, seu projeto não se enquadra nos requisitos para o 
                    licenciamento autodeclaratório. Será necessária análise técnica ordinária.
                </p>
            </div>
            
            <div class="info-box">
                <h3><i class="fas fa-times-circle"></i> Impedimentos Identificados</h3>
                <ul>
                    ${result.reasons.map(reason => `
                        <li>
                            <i class="fas fa-exclamation-circle"></i>
                            <span>${reason}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="info-box">
                <h3><i class="fas fa-route"></i> Como Proceder</h3>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Seu processo deverá seguir pelo <strong>fluxo ordinário de análise técnica</strong></span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Será necessária análise prévia pela SMUL (Secretaria Municipal de Urbanismo e Licenciamento)</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Consulte a legislação específica aplicável ao seu caso</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Dependendo do tipo de restrição, outros órgãos poderão ser consultados (CONPRESP, CONDEPHAAT, CETESB, etc.)</span>
                    </li>
                </ul>
            </div>
            
            <div class="alert-box">
                <h4><i class="fas fa-info-circle"></i> Importante</h4>
                <p>
                    A análise técnica ordinária possui prazos e procedimentos específicos. Recomendamos fortemente 
                    a contratação de consultoria especializada para agilizar o processo e garantir conformidade com todas as exigências.
                </p>
            </div>
            
            <div class="info-box">
                <h3><i class="fas fa-phone"></i> Contatos SMUL</h3>
                <ul>
                    <li>
                        <i class="fas fa-globe"></i>
                        <span><strong>Site:</strong> prefeitura.sp.gov.br/smul</span>
                    </li>
                    <li>
                        <i class="fas fa-phone-alt"></i>
                        <span><strong>Telefone SP156:</strong> 156</span>
                    </li>
                </ul>
            </div>
        `;
    }
    
    // Adicionar box de contato
    html += `
        <div class="contact-box">
            <h4>Precisa de ajuda profissional?</h4>
            <p>A Sanrlei Polini Engenharia Consultiva possui mais de 20 anos de experiência em licenciamentos, 
            aprovações e regularizações em todo o Brasil.</p>
            <button class="btn" onclick="window.location.href='https://www.sanrleipolini.com.br'">
                <i class="fas fa-external-link-alt"></i>
                Fale com Nossos Especialistas
            </button>
        </div>
        
        <div class="button-group" style="margin-top: 30px;">
            <button class="btn btn-secondary" onclick="printResult()">
                <i class="fas fa-print"></i>
                Imprimir Resultado
            </button>
            <button class="btn btn-primary" onclick="restartQuiz()">
                <i class="fas fa-redo"></i>
                Nova Verificação
            </button>
        </div>
    `;
    
    resultSection.innerHTML = html;
}

// Avaliar elegibilidade
function evaluateEligibility() {
    const reasons = [];
    let eligible = true;
    
    // Verificar área total
    if (answers.areaTotal > 1500) {
        eligible = false;
        reasons.push(`Área total (${answers.areaTotal}m²) excede o limite de 1.500m²`);
    }
    
    // Verificar tamanho do lote
    if (answers.tamanhoLote > 20000) {
        eligible = false;
        reasons.push(`Tamanho do lote (${answers.tamanhoLote}m²) excede o limite de 20.000m²`);
    }
    
    // Verificar uso
    const usosPermitidos = ['R1', 'R2h', 'R2v', 'nR1', 'nR2', 'nRa1', 'nRa2', 'nRa3', 'nRa4', 'Ind1a', 'Ind1b'];
    if (!usosPermitidos.includes(answers.usoFinal)) {
        eligible = false;
        reasons.push('O uso final declarado não está entre as categorias permitidas pela lei');
    }
    
    // Verificar acréscimo em reformas
    if (answers.tipoIntervencao === 'reforma_com') {
        if (answers.areaAcrescimo && answers.areaExistente) {
            const percentualAcrescimo = (answers.areaAcrescimo / answers.areaExistente) * 100;
            if (percentualAcrescimo > 50) {
                eligible = false;
                reasons.push(`Acréscimo de ${percentualAcrescimo.toFixed(1)}% excede o limite de 50% da área existente`);
            }
            
            const areaFinal = parseFloat(answers.areaExistente) + parseFloat(answers.areaAcrescimo);
            if (areaFinal > 1500) {
                eligible = false;
                reasons.push(`Área final após acréscimo (${areaFinal.toFixed(2)}m²) excede 1.500m²`);
            }
        }
    }
    
    // Verificar restrições
    const restricoes = answers.restricoes || [];
    const restricoesImpeditivas = restricoes.filter(r => r !== 'nenhuma');
    
    if (restricoesImpeditivas.length > 0) {
        eligible = false;
        const restricoesLabels = {
            'tombado': 'Imóvel tombado, preservado ou em área tombada/envoltório',
            'manancial': 'Localizado em área de proteção de mananciais, ambiental ou APP',
            'srpv': 'Necessita consulta ao SRPV (Serviço Regional de Proteção ao Voo)',
            'polo': 'Atividade considerada Polo Gerador de Tráfego',
            'ambiental': 'Sujeito a licenciamento ambiental',
            'viario': 'Atingido por melhoramento viário previsto em lei',
            'contaminado': 'Terreno potencialmente contaminado, suspeito ou contaminado',
            'desapropriacao': 'Atingido por DUP, DIS ou processo de desapropriação',
            'sem_frente': 'Sem frente para logradouro público oficial',
            'passeio': 'Exigida reserva ou alargamento de passeio público',
            'metro': 'Em perímetro de influência de linhas de metrô/trem',
            'operacao': 'Em perímetro de Operação Urbana Consorciada ou PIU',
            'contratual': 'Com restrições contratuais (art. 59 LPUOS)'
        };
        
        restricoesImpeditivas.forEach(r => {
            if (restricoesLabels[r]) {
                reasons.push(restricoesLabels[r]);
            }
        });
    }
    
    return { eligible, reasons };
}

// Imprimir resultado
function printResult() {
    window.print();
}

// Reiniciar quiz
function restartQuiz() {
    answers = {};
    currentQuestion = 0;
    
    resultSection.classList.remove('active');
    resultSection.innerHTML = '';
    
    leadFormSection.style.display = 'block';
    quizSection.classList.remove('active');
    
    // Limpar formulário
    leadForm.reset();
}
