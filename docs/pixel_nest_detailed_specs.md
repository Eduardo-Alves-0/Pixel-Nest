# Pixel Nest Backend - Guia de Implementação por Etapas
## Como implementar o backend passo a passo

---

## PARTE 1: CONFIGURAÇÃO INICIAL DO PROJETO

### 1.1 Preparar o Ambiente
* Criar pasta do projeto
* Inicializar projeto Node.js
* Instalar TypeScript e configurar tsconfig.json
* Instalar dependências: express, typeorm, mysql2, bcrypt, jsonwebtoken
* Instalar dependências de desenvolvimento: @types, nodemon, ts-node
* Configurar scripts no package.json (dev, build, start)
* Criar estrutura de pastas: src/entities, src/controllers, src/routes, src/middlewares, src/services

### 1.2 Conectar com Banco de Dados
* Instalar driver MySQL (mysql2)
* Criar arquivo de configuração do banco (.env)
* Configurar variáveis de ambiente (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME)
* Configurar conexão TypeORM no arquivo principal
* Criar arquivo data-source.ts com configurações do TypeORM
* Testar conexão com o banco
* Configurar sincronização automática para desenvolvimento

---

## PARTE 2: CRIAR AS ENTIDADES DO BANCO

### 2.1 Entidade User (Usuário)
* Criar classe User com decorators TypeORM
* Definir colunas: id, email, password, fullName, birthDate, role, isActive, createdAt, updatedAt
* Configurar email como único
* Configurar enum para role (CUSTOMER, MODERATOR, ADMIN)
* Configurar timestamps automáticos
* Definir validações básicas nos campos

### 2.2 Entidade Game (Jogo)
* Criar classe Game com todas as propriedades
* Definir colunas: id, title, description, price, developer, publisher, releaseDate, ageRating, coverImage, trailerUrl, isActive, stock, createdAt, updatedAt
* Configurar tipos apropriados (decimal para preço, text para descrição)
* Configurar campos opcionais onde necessário

### 2.3 Entidades de Apoio
* Criar entidade Genre (id, name, description)
* Criar entidade Platform (id, name)
* Criar tabelas de relacionamento GameGenre e GamePlatform
* Configurar relacionamentos many-to-many entre Game-Genre e Game-Platform

### 2.4 Entidades do Sistema de Compras
* Criar entidade Cart (id, userId, createdAt, updatedAt)
* Criar entidade CartItem (id, cartId, gameId, quantity, unitPrice)
* Criar entidade Order (id, userId, subtotal, discount, total, status, orderDate)
* Criar entidade OrderItem (id, orderId, gameId, quantity, unitPrice, totalPrice)
* Configurar relacionamentos entre as entidades

### 2.5 Entidades Complementares
* Criar entidade Payment (id, orderId, method, amount, status, gatewayData, paymentDate)
* Criar entidade UserLibrary (id, userId, gameId, activationKey, acquisitionDate, status)
* Criar entidade Review (id, userId, gameId, rating, comment, reviewDate, status)
* Criar entidade Wishlist (id, userId, gameId, dateAdded)
* Criar entidade Promotion (id, name, type, discountValue, startDate, endDate, isActive)
* Criar entidade Coupon (id, code, discountType, discountValue, expirationDate, usageLimit, currentUsage, isActive)

---

## PARTE 3: CRIAR REPOSITORIES

### 3.1 Configurar Repositories Base
* Criar repository para cada entidade usando TypeORM
* Configurar injeção de dependência dos repositories
* Criar métodos customizados quando necessário
* Configurar Repository pattern para abstrair acesso aos dados

### 3.2 Repositories Específicos
* UserRepository: métodos findByEmail, findActive, etc.
* GameRepository: métodos findActive, searchByTitle, filterByGenre, etc.
* CartRepository: métodos findByUserId, findActiveCart, etc.
* OrderRepository: métodos findByUserId, findByStatus, etc.

---

## PARTE 4: CRIAR SERVICES (LÓGICA DE NEGÓCIO)

### 4.1 UserService
* Método registerUser: validar dados, hash senha, salvar usuário
* Método authenticateUser: validar login, verificar senha, gerar JWT
* Método updateProfile: validar dados, atualizar informações
* Método deactivateUser: exclusão lógica
* Método resetPassword: gerar token, validar token, atualizar senha

### 4.2 GameService
* Método createGame: validar dados, salvar jogo, associar gêneros/plataformas
* Método searchGames: buscar com filtros, paginação
* Método updateStock: controlar estoque
* Método toggleGameStatus: ativar/desativar jogos

### 4.3 CartService
* Método addToCart: verificar estoque, verificar se usuário já possui jogo
* Método updateCartItem: alterar quantidades, recalcular preços
* Método removeFromCart: remover itens
* Método calculateTotal: calcular subtotal, aplicar descontos
* Método applyCoupon: validar cupom, aplicar desconto

### 4.4 OrderService
* Método createOrder: transferir carrinho para pedido, verificar estoque
* Método processOrder: reduzir estoque, gerar chaves
* Método generateActivationKeys: criar códigos únicos
* Método sendOrderConfirmation: integrar com serviço de email

### 4.5 PaymentService
* Método processPayment: integrar com gateway
* Método validatePayment: validar dados
* Método processRefund: estornos
* Método updatePaymentStatus: atualizar status

---

## PARTE 5: CRIAR MIDDLEWARES

### 5.1 Middleware de Autenticação
* Criar middleware para verificar JWT token
* Extrair usuário do token
* Adicionar usuário ao request
* Tratar tokens inválidos ou expirados

### 5.2 Middleware de Autorização
* Criar middleware para verificar roles
* Verificar se usuário tem permissão para acessar endpoint
* Diferentes níveis: requireAuth, requireAdmin, requireModerator

### 5.3 Middlewares de Validação
* Criar middlewares para validar dados de entrada
* Validar formato de email, força de senha
* Validar dados obrigatórios
* Sanitizar dados de entrada

### 5.4 Middlewares Utilitários
* Middleware de tratamento de erros
* Middleware de logging
* Middleware de rate limiting
* Middleware de CORS

---

## PARTE 6: CRIAR CONTROLLERS

### 6.1 UserController
* Método register: receber dados, chamar UserService.registerUser
* Método login: receber credenciais, chamar UserService.authenticateUser
* Método updateProfile: receber dados, chamar UserService.updateProfile
* Método deleteAccount: chamar UserService.deactivateUser
* Método forgotPassword: chamar UserService.resetPassword
* Método resetPassword: validar token, chamar UserService.resetPassword
* Tratar erros e retornar respostas HTTP apropriadas

### 6.2 GameController
* Método createGame: receber dados, chamar GameService.createGame (só ADMIN)
* Método getGames: listar jogos com paginação
* Método searchGames: buscar jogos com filtros
* Método getGameById: buscar jogo específico
* Método updateGame: atualizar dados do jogo (só ADMIN)
* Método updateStock: atualizar estoque (só ADMIN)
* Método toggleStatus: ativar/desativar jogo (só ADMIN)

### 6.3 CartController
* Método addItem: adicionar jogo ao carrinho
* Método getCart: buscar carrinho do usuário
* Método updateItem: alterar quantidade no carrinho
* Método removeItem: remover item do carrinho
* Método applyCoupon: aplicar cupom de desconto
* Método getCartTotal: calcular total do carrinho

### 6.4 OrderController
* Método createOrder: finalizar compra
* Método getOrders: listar pedidos do usuário
* Método getOrderById: buscar pedido específico
* Método getOrderReceipt: gerar recibo em PDF
* Método cancelOrder: cancelar pedido se possível

### 6.5 PaymentController
* Método processPayment: processar pagamento
* Método paymentCallback: receber callback do gateway
* Método getPaymentStatus: verificar status do pagamento
* Método processRefund: processar reembolso (só ADMIN)

### 6.6 LibraryController
* Método getLibrary: listar jogos do usuário
* Método getActivationKey: buscar chave de ativação
* Método downloadReceipt: baixar recibo de compra

### 6.7 ReviewController
* Método createReview: criar avaliação
* Método getGameReviews: listar avaliações de um jogo
* Método updateReview: atualizar avaliação própria
* Método deleteReview: deletar avaliação própria
* Método moderateReview: moderar avaliação (MODERATOR+)

### 6.8 WishlistController
* Método addToWishlist: adicionar jogo à lista
* Método getWishlist: listar jogos da wishlist
* Método removeFromWishlist: remover jogo da lista

### 6.9 AdminController
* Método getSalesReports: relatórios de vendas
* Método getStatistics: estatísticas do sistema
* Método createPromotion: criar promoções
* Método createCoupon: criar cupons
* Método moderateContent: moderar conteúdo

---

## PARTE 7: CRIAR ROTAS

### 7.1 Organizar Estrutura de Rotas
* Criar arquivo routes/index.ts principal
* Criar arquivos específicos: userRoutes.ts, gameRoutes.ts, etc.
* Configurar roteador principal do Express
* Agrupar rotas por funcionalidade

### 7.2 Rotas de Usuário (/api/users)
* POST /register - registrar usuário
* PUT /profile - atualizar perfil
* DELETE /account - deletar conta
* GET /library - biblioteca do usuário
* GET /orders - histórico de compras

### 7.3 Rotas de Autenticação (/api/auth)
* POST /login - fazer login
* POST /logout - fazer logout
* POST /forgot-password - solicitar reset de senha
* POST /reset-password - redefinir senha

### 7.4 Rotas de Jogos (/api/games)
* GET / - listar jogos
* GET /search - buscar jogos
* GET /:id - buscar jogo específico
* POST / - criar jogo (ADMIN)
* PUT /:id - atualizar jogo (ADMIN)
* PUT /:id/stock - atualizar estoque (ADMIN)
* PUT /:id/status - ativar/desativar (ADMIN)
* POST /:id/reviews - criar avaliação
* GET /:id/reviews - listar avaliações

### 7.5 Rotas de Carrinho (/api/cart)
* GET / - buscar carrinho
* POST /items - adicionar item
* PUT /items/:id - atualizar item
* DELETE /items/:id - remover item
* POST /apply-coupon - aplicar cupom

### 7.6 Rotas de Pedidos (/api/orders)
* POST / - criar pedido
* GET / - listar pedidos do usuário
* GET /:id - buscar pedido específico
* GET /:id/receipt - baixar recibo

### 7.7 Rotas de Pagamento (/api/payments)
* POST /process - processar pagamento
* POST /callback - callback do gateway
* GET /:id/status - status do pagamento
* POST /:id/refund - processar reembolso (ADMIN)

### 7.8 Rotas de Wishlist (/api/wishlist)
* GET / - listar wishlist
* POST / - adicionar à wishlist
* DELETE /:id - remover da wishlist

### 7.9 Rotas Administrativas (/api/admin)
* GET /reports/sales - relatórios de vendas
* GET /stats - estatísticas
* POST /promotions - criar promoção
* POST /coupons - criar cupom
* GET /reviews - reviews para moderar
* PUT /reviews/:id/moderate - moderar review

---

## PARTE 8: CONFIGURAR APLICAÇÃO PRINCIPAL

### 8.1 Configurar Express
* Criar app Express
* Configurar middlewares globais (cors, json, etc.)
* Configurar rotas principais
* Configurar middleware de tratamento de erros
* Configurar porta e inicialização do servidor

### 8.2 Configurar Variáveis de Ambiente
* Criar arquivo .env
* Definir variáveis de banco de dados
* Definir chave secreta JWT
* Definir configurações de email
* Definir configurações do gateway de pagamento

### 8.3 Configurar Tratamento de Erros
* Criar middleware global de erros
* Definir classes de erro customizadas
* Configurar logs de erro
* Padronizar respostas de erro

---

## PARTE 9: TESTES E VALIDAÇÃO

### 9.1 Configurar Insomnia/Postman
* Criar workspace do projeto
* Criar variáveis de ambiente (base_url, token)
* Organizar requests por funcionalidade
* Criar testes de fluxo completo

### 9.2 Testar Funcionalidades Básicas
* Testar cadastro e login de usuários
* Testar CRUD de jogos
* Testar fluxo de compra completo
* Testar autenticação e autorização
* Testar validações e tratamento de erros

### 9.3 Validar Regras de Negócio
* Testar que usuário não pode comprar mesmo jogo digital duas vezes
* Testar que só pode avaliar jogos que possui
* Testar controle de estoque
* Testar aplicação de cupons e promoções
* Testar permissões por role

---

## PARTE 10: MELHORIAS E INTEGRAÇÕES

### 10.1 Integrar Serviços Externos
* Integrar gateway de pagamento (Stripe, MercadoPago)
* Integrar serviço de email (SendGrid, nodemailer)
* Configurar upload de imagens (multer, AWS S3)
* Configurar geração de PDFs para recibos

### 10.2 Otimizações
* Implementar cache para consultas frequentes
* Otimizar queries do banco de dados
* Implementar rate limiting
* Configurar logs estruturados
* Implementar health check endpoints

### 10.3 Documentação
* Configurar Swagger/OpenAPI
* Documentar todos os endpoints
* Criar exemplos de request/response
* Documentar códigos de erro
* Criar README com instruções de setup