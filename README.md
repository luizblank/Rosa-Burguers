# RosaProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## CheckList

Obs: 'Tem tela/Tem Interface' = Possui parte visual, mesmo sem funcionar.

- [x] Repositório GIT criado.
- [X] Projeto do Frontend Angular Criado.
- [X] Possui tela de Login.
- [X] Possui tela de cadastro.
- [X] Possui tela de usuário normal das promoções.
- [ ] Possui tela para visualizar código da promoção.
- [X] Possui tela de Administrador.
- [X] Possui tela de Pedidos.
- [X] Possui tela de Cadastro de Produtos.
- [ ] Possui tela de Cadastro de Promoções.
- [X] Possui tela do totem.
- [ ] Possui tela dos gráficos.
- [ ] Tela do totem tem interface para inserção de código da promoção.
- [X] Tela do totem tem interface para colocar itens na sacola.
- [X] Banco de dados criado com tabelas de Usuário, Pedido, ItemPedido, Produto, Promoção ou similar.
- [X] Rotas no Frontend Configuradas.
- [X] Projeto Backend C# criado.
- [X] CORS Configurado.
- [X] HttpClient configurado e podendo ser usado para fazer quests entre Back e Front.
- [X] Entity Framework Configurado no Backend e Model gerada.
- [X] Bilbioteca de JWT instalada.
- [X] Operação de cadastro realmente salva um usuário no banco de dados.
- [X] Cadastro tem algumas validações sendo mais robusto.
- [X] Login realmente busca usuário no banco de dados.
- [X] Aplica salt na senha do usuário.
- [X] Aplica slow Hash na senha do usuário.
- [X] Login retorna JWT para o frontend que o guarda no Session Storage.
- [X] Após o Login a página de usuário normal ou adm é mostrada corretamente.
- [ ] Adm é capaz de ver produtos existentes.
- [X] Adm é capaz de cadastrar novos produtos.
- [ ] Adm é capaz de ver promoções existentes.
- [ ] Adm é capaz de criar novas promoções.
- [ ] Adm é capaz de ver Dashboard com dois gráficos de informações.
- [ ] Gráficos do Dashboard realmente refletem os dados no banco.
- [X] É possível ver produtos existentes no Totem.
- [X] É possível adicionar itens em uma sacola.
- [X] Ao finalizar a compra o pedido é realmente registrado no banco de dados.
- [X] É possível ver o custo total do pedido.
- [ ] É possível adicionar uma promoção com um código promocional.
- [ ] Promoção afeta o custo total do pedido.
- [ ] Pedidos podem ser vistos na tela de pedidos.
- [X] É possível editar um pedido como 'Entregue' de alguma forma.
- [X] Apenas os pedidos corretos aparecem na tela de pedidos (finalizados, porém não entregues).
- [ ] Usuário é capaz de ver as promoções no sistema.
- [ ] Usuário é capaz de gerar um código de promoção válido.
- [ ] Sistema realmente válida código de promoção.