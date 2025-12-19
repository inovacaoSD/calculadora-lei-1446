# 🏗️ Calculadora de Elegibilidade - Lei 1.446/2025

## 📋 Descrição do Projeto

Ferramenta web interativa desenvolvida para a **Sanrlei Polini Engenharia Consultiva** que avalia a elegibilidade de projetos imobiliários para o **Licenciamento Autodeclaratório** conforme a **Lei Municipal nº 1.446/2025** de São Paulo.

Esta calculadora foi projetada com a identidade visual corporativa da Sanrlei Polini e inclui um sistema completo de captura de leads e avaliação técnica baseada nos critérios legais estabelecidos pela nova legislação municipal.

---

## ✨ Funcionalidades Implementadas

### 🎯 Captura de Leads (Obrigatória)
- **Formulário completo** antes do início da avaliação
- **Campos obrigatórios:**
  - Nome completo
  - E-mail
  - Telefone/WhatsApp
  - Autorização LGPD para uso de dados em campanhas
- **Armazenamento local** dos dados do usuário
- **Validação** de todos os campos antes de prosseguir

### 📊 Questionário Inteligente
- **8 perguntas estratégicas** baseadas na Lei 1.446/2025
- **Tipos de pergunta:**
  - Campos numéricos (áreas em m²)
  - Múltipla escolha (categorias de uso)
  - Checkboxes (restrições múltiplas)
- **Lógica condicional:** Perguntas aparecem conforme contexto
- **Barra de progresso** visual
- **Navegação:** Avançar e voltar entre perguntas
- **Validação** de respostas em tempo real

### 🔍 Avaliação de Critérios

A ferramenta avalia automaticamente:

#### ✅ Critérios de Aprovação
- Área total até 1.500 m²
- Lote/gleba até 20.000 m²
- Usos permitidos: R1, R2h, R2v, nR1, nR2, nRa1-4, Ind1a/1b
- Acréscimo em reformas: máximo 50% da área existente
- Ausência de restrições impeditivas (13 tipos)

#### ❌ Impedimentos Automáticos
- Imóveis tombados ou preservados
- Áreas de proteção ambiental/mananciais
- Necessidade de consulta SRPV
- Polos geradores de tráfego
- Licenciamento ambiental obrigatório
- Melhoramentos viários
- Terrenos contaminados
- Processos de desapropriação
- Ausência de frente para logradouro
- Exigência de alargamento de passeio
- Perímetros de metrô/trem
- Operações urbanas consorciadas
- Restrições contratuais

### 📄 Resultados Detalhados

#### Se ELEGÍVEL ✅
- Mensagem de confirmação
- **5 próximos passos** práticos
- **Alertas sobre responsabilidades:** Multas (até R$ 1.000/m²), penalidades
- **Prazos:** Emissão em até 30 dias
- **Informações sobre auditoria** municipal

#### Se NÃO ELEGÍVEL ❌
- Lista detalhada de **todos os impedimentos** encontrados
- Orientações sobre **análise técnica ordinária**
- Procedimentos para fluxo tradicional
- **Contatos da SMUL** (Secretaria Municipal de Urbanismo)
- Recomendação de consultoria especializada

### 🎨 Identidade Visual Corporativa

#### Cores
- **Primária:** Verde vibrante (#44D2A8) - cor institucional do site
- **Secundárias:** Amarelo (#F7ED47), Laranja (#F78E47), Rosa (#F75379), Aqua (#47F7E7)
- **Gradiente de fundo:** Verde → Aqua → Amarelo (efeito vibrante e moderno)
- **Destaques:** Verde (sucesso), Rosa (erro), Laranja (aviso)

#### Tipografia
- **Fonte:** Poppins (Google Fonts)
- **Pesos:** Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)

#### Design
- **Estilo:** Moderno, vibrante, clean e corporativo
- **Cards:** Bordas arredondadas, sombras suaves
- **Responsivo:** Mobile-first, adaptável a todos os dispositivos
- **Ícones:** Font Awesome 6.4.0
- **Animações:** Transições suaves e profissionais
- **Feedback visual:** Cores vibrantes destacam seleções

### 🎯 Call-to-Action
- **Box de contato** ao final do resultado
- Link direto para **www.sanrleipolini.com.br**
- Destaque da expertise (20+ anos de experiência)

### 🖨️ Funcionalidades Extras
- **Imprimir resultado** (window.print)
- **Reiniciar verificação** (novo teste)
- **Armazenamento local** de dados do lead

---

## 🗂️ Estrutura de Arquivos

```
/
├── index.html          # Interface completa e responsiva
├── js/
│   └── app.js         # Lógica completa do questionário e avaliação
└── README.md          # Documentação do projeto
```

---

## 🚀 Como Usar

### Para o Usuário Final

1. **Acesse** a página index.html
2. **Preencha** o formulário inicial:
   - Nome completo
   - E-mail
   - Telefone
   - Autorização LGPD
3. **Clique** em "Iniciar Verificação de Elegibilidade"
4. **Responda** as 8 perguntas sobre seu projeto
5. **Veja o resultado** completo e detalhado

### Para Publicação

#### Opção 1: Hospedagem Externa (Recomendada)

**GitHub Pages (Gratuito)**
```bash
# No seu repositório GitHub
1. Faça upload dos arquivos
2. Vá em Settings > Pages
3. Selecione branch main
4. Copie a URL gerada
```

**Netlify (Gratuito)**
```bash
1. Acesse netlify.com
2. Arraste a pasta do projeto
3. Copie a URL gerada
```

#### Opção 2: Integração com Wix

No site **sanrleipolini.com.br**:

1. **Adicione um botão/seção:**
   - Texto: "🔍 Verifique se seu projeto é elegível ao Licenciamento Autodeclaratório"
   - Subtítulo: "Nova Lei 1.446/2025 - Análise Gratuita em 2 minutos"

2. **Configure o link:**
   - Aponte para a URL da calculadora hospedada
   - Configure para abrir em nova aba

3. **Posicionamento sugerido:**
   - Banner no topo da home
   - Seção de serviços
   - Footer com destaque

---

## 📊 Dados Capturados

### Informações do Lead
```javascript
{
  name: "Nome Completo",
  email: "email@exemplo.com",
  phone: "(11) 99999-9999",
  consent: true,
  timestamp: "2025-12-19T..."
}
```

### Respostas do Questionário
```javascript
{
  areaTotal: 1200,              // m²
  tamanhoLote: 5000,            // m²
  usoFinal: "R1",               // Categoria de uso
  tipoIntervencao: "nova",      // Tipo de obra
  restricoes: ["nenhuma"],      // Array de restrições
  imovelPublico: "nao"          // Sim/Não/Não sei
}
```

**Armazenamento:** LocalStorage do navegador

---

## 🎯 Base Legal - Lei 1.446/2025

### Documentos Abrangidos (Art. 3º)
- ✅ Alvará de Aprovação e Execução (até 1.500m²)
- ✅ Certificado de Conclusão
- ✅ Certificado de Regularização
- ✅ Alvará de Execução de Muro de Arrimo
- ✅ Alvará de Execução de Demolição
- ✅ Alvará de Movimento de Terra
- ✅ Alvarás de Autorização (tapume, estande, grua, canteiro)
- ✅ Certificado de Acessibilidade (imóveis públicos)
- ✅ Certidão de Uso e Ocupação (R1)
- ✅ Revalidação de Alvará de Funcionamento (templos)

### Usos Permitidos
- **Residenciais:** R1, R2h, R2v
- **Não Residenciais:** nR1, nR2, nRa1, nRa2, nRa3, nRa4
- **Industriais:** Ind1a, Ind1b

### Limites
- **Área total:** Até 1.500 m²
- **Tamanho do lote:** Até 20.000 m²
- **Acréscimo em reformas:** Até 50% da área existente

### Restrições (Art. 10º)
13 tipos de impedimentos claramente identificados e verificados pela calculadora.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica
- **CSS3:** Estilização moderna com variáveis CSS
- **JavaScript (Vanilla):** Lógica pura sem frameworks
- **Google Fonts:** Tipografia Poppins
- **Font Awesome 6:** Ícones profissionais
- **LocalStorage API:** Armazenamento de dados

---

## 📱 Responsividade

A calculadora é 100% responsiva e se adapta a:

- 📱 **Mobile:** 320px - 768px
- 📱 **Tablet:** 768px - 1024px
- 💻 **Desktop:** 1024px+
- 🖥️ **Large Desktop:** 1440px+

---

## 🎨 Customizações Disponíveis

### Cores (CSS Variables)
```css
--primary-color: #44D2A8;      /* Verde principal */
--accent-color: #F7ED47;       /* Amarelo destaque */
--accent-orange: #F78E47;      /* Laranja */
--accent-pink: #F75379;        /* Rosa */
--accent-aqua: #47F7E7;        /* Aqua */
--success: #44D2A8;            /* Verde sucesso */
--error: #F75379;              /* Rosa erro */
--warning: #F78E47;            /* Laranja aviso */
```

### Textos
Todos os textos estão centralizados no JavaScript para fácil edição.

---

## 📈 Próximos Passos Recomendados

### Fase 2 - Integração CRM
- [ ] Conectar com sistema de CRM/e-mail marketing
- [ ] Envio automático de leads para base de contatos
- [ ] Segmentação por elegibilidade

### Fase 3 - Funcionalidades Avançadas
- [ ] Calculadora de taxas municipais
- [ ] Exportação de resultado em PDF
- [ ] Sistema de agendamento de consulta
- [ ] Chat/WhatsApp direto

### Fase 4 - Analytics
- [ ] Google Analytics 4
- [ ] Facebook Pixel
- [ ] Hotjar (mapa de calor)
- [ ] Relatórios de conversão

---

## 🔒 Conformidade LGPD

✅ **Autorização explícita** para uso de dados  
✅ **Finalidade clara** (campanhas e newsletters)  
✅ **Opção de cancelamento** mencionada  
✅ **Armazenamento local** (sem servidor)  
✅ **Transparência** total sobre uso dos dados  

---

## 📞 Suporte e Contato

**Sanrlei Polini Engenharia Consultiva**  
🌐 Website: [www.sanrleipolini.com.br](https://www.sanrleipolini.com.br)  
📧 E-mail: contato@sanrleipolini.com.br  
📱 Telefone: [Inserir telefone]

---

## 📜 Licença e Copyright

© 2025 Sanrlei Polini Engenharia Consultiva  
Todos os direitos reservados.

Esta ferramenta foi desenvolvida exclusivamente para uso da Sanrlei Polini Engenharia Consultiva e seus clientes.

---

## 🏆 Diferenciais Competitivos

✅ **Única calculadora** específica para Lei 1.446/2025  
✅ **100% alinhada** com legislação municipal de SP  
✅ **Interface profissional** e intuitiva  
✅ **Captura de leads** integrada  
✅ **Identidade visual** corporativa  
✅ **Responsivo** para todos os dispositivos  
✅ **Gratuito** para usuários finais  
✅ **Geração de valor** e autoridade no mercado  

---

**Desenvolvido com expertise e inovação pela equipe de tecnologia da Sanrlei Polini** 🚀