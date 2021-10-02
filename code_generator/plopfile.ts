// eslint-disable-next-line import/no-extraneous-dependencies
import { NodePlopAPI } from 'plop';

// eslint-disable-next-line func-names
export default function (plop: NodePlopAPI) {
  // module generator
  plop.setGenerator('crud', {
    description: 'an application module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'crud name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/index.ts',
        templateFile: 'templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/{{camelCase name}}.routes.ts',
        templateFile: 'templates/routes.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/{{camelCase name}}.service.ts',
        templateFile: 'templates/service.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/controllers/{{camelCase name}}.controller.ts',
        templateFile: 'templates/controllers/controller.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/entities/{{camelCase name}}.entity.ts',
        templateFile: 'templates/entities/entity.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/interfaces/{{camelCase name}}.interface.ts',
        templateFile: 'templates/interfaces/mainInterface.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/interfaces/{{camelCase name}}Repository.interface.ts',
        templateFile: 'templates/interfaces/repositoryInterface.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/interfaces/{{camelCase name}}Service.interface.ts',
        templateFile: 'templates/interfaces/serviceInterface.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/interfaces/dtos/create{{pascalCase name}}.dto.ts',
        templateFile: 'templates/interfaces/dtos/createDto.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/interfaces/dtos/update{{pascalCase name}}.dto.ts',
        templateFile: 'templates/interfaces/dtos/updateDto.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/repositories/{{camelCase name}}.repository.ts',
        templateFile: 'templates/repositories/mainRepository.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/{{camelCase name}}s/tests/{{camelCase name}}.service.spec.ts',
        templateFile: 'templates/tests/service.spec.ts.hbs',
      },
    ],
  });
}
