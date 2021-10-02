# Módulos

Cada módulo dessa aplicação é dividido em:

- Controladores (controllers)
- Entidades (entities)
- Interfaces (interfaces)
- Repositórios (repositories)
- Testes (tests)
- Serviços (services)
- Rotas (routes)

Cada módulo é identificado pelo nome da entidade a que ele se relaciona e fica localizado dentro do diretório `src` em um diretório com o nome da entidade, ex: `users`.

Para criar o boilerplate de um módulo automaticamente, use o comando `yarn generate nome_do_módulo`. Coloque o nome no singular, ex: `school`.

## Descrição do fluxo

O fluxo em cada módulo acontece da seguinte maneira:

- Cliente envia requisição HTTP, que é recebida pelo *router* do Express, localizado no arquivo *routes.ts* na raiz do projeto, e é direcionada para o *router* do módulo, que é definido pela url da requisição;
- As *rotas* chamam o método adequado do *controller* para atendimento da requisição (ex, no módulo de `users`, as rotas estão no arquivo `user.routes.ts`);
- O *controller*, usado nas *rotas*, é instanciado no arquivo `index.ts` de cada módulo;
- O *controller* é injetado com um *service*, que é responsável por receber os dados, executar as tarefas necessárias, e após isso, retornar para o *controller*, que, por fim, deverá retornar o resultado para o cliente;
- O *service*, usado pelo *controller*, é injetado com um *repository*, que será responsável por interagir com a camada de persistência (banco de dados);
- Como o *repository* pode ser injetado no *service*, a camada de persistência pode ser alterada facilmente (assim espero), desde que seja criado um novo repositório que atenda a interface;
- A *entity* se trata da representação, em objeto, de uma entidade do banco de dados, e é usado pelo *repository* para gerar novos objetos que serão persistidos no banco.
- As *interfaces* servem para facilitar a comunicação entre os componentes, e os *dtos* servem para descrever o corpo das requisições para o *controller*.

## Comentários adicionais

A estrutura desses módulos tenta, ao máximo, atender os príncipios SOLID, como *Substituição de Liskov*, *Inversão de Dependências*, apesar disso, se trata de um primeiro contato prático com esses princípios, o que significa que provavelmente, ela falha em alguns desses princípios, e que pode ser melhorada ainda.
