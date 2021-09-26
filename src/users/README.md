# Módulos

Cada módulo dessa aplicação é dividido em:

- Controladores (controllers)
- Entidades (entities)
- Interfaces (interfaces)
- Repositórios (repositories)
- Testes (tests)
- Serviços (services)
- Rotas (routes)

## Descrição do fluxo

O fluxo em cada módulo acontece da seguinte maneira:

- Cliente envia requisição HTTP;
- As rotas chamam o método adequado do controller para atendimento da requisição (nesse caso, as rotas estão no arquivo `user.routes.ts`);
- O *controller* é instanciado no arquivo `index.ts` e é exportado para uso no arquivo de rotas;
- O *controller* é injetado com um *service*, que fica então responsável por receber os dados, executar as tarefas necessárias, e após isso, retornar para o *controller*, que, por fim, deverá retornar o resultado para o cliente;
- O *service*, localizado no arquivo `user.service.ts`, é injetado com um *repository*, que será responsável por interagir com a camada de persistência (banco de dados);
- Como o *repository* pode ser injetado no *service*, a camada de persistência pode ser alterada facilmente (assim espero), desde que seja criado um novo repositório que atenda a interface;
- A *entity* se trata da representação, em objeto, de uma entidade do banco de dados, e é usado pelo *repository* para gerar novos objetos que serão persistidos no banco.
- As *interfaces* servem para facilitar a comunicação entre os componentes, e os *dtos* servem para descrever o corpo das requisições para o *controller*.

## Comentários adicionais

A estrutura desses módulos tenta, ao máximo, atender os príncipios SOLID, como *Substituição de Liskov*, *Inversão de Dependências*, apesar disso, se trata de um primeiro contato prático com esses princípios, o que significa que provavelmente, ela falha em alguns desses princípios, e que pode ser melhorado ainda.
