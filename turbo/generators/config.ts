import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("create-library", {
    description: "Create a new library",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "What type of library are you creating?",
        choices: ["repo"],
      },

      {
        type: "input",
        name: "name",
        message: "What is the package name?",
        validate: (input: string) => {
          if (!input) {
            return "package name is required";
          }
          if (input.includes(".")) {
            return "file name cannot include an extension";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "path",
        message: "Where should the package be created?",
        default: ({ type, name }: { type: string; name: string }) => {
          return `packages/${type}-${name
            .toLowerCase()
            .trim()
            .replace(/\s/gm, "-")}`;
        },
        validate: (input: string) => {
          if (!input) {
            return "package path is required";
          }
          if (input.includes(" ")) {
            return "package path cannot include spaces";
          }
          if (input.includes(".")) {
            return "package path cannot include an extension";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "import",
        message: "What should the package import be?",
        default: ({ type, name }: { type: string; name: string }) => {
          return `@${type}/${name.toLowerCase().trim().replace(/\s/gm, "-")}`;
        },
        validate: (input: string) => {
          if (!input) {
            return "package path is required";
          }
          if (input.includes(" ")) {
            return "package path cannot include spaces";
          }
          if (input.includes(".")) {
            return "package path cannot include an extension";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "config",
        message: "What type of package are you creating?",
        choices: ["base", "react", "next", "astro", "remix", "server"],
      },
      {
        type: "input",
        name: "eslintConfig",
        message: "What is the eslint config?",
        default: ({ config }: { config: string }) => {
          return config;
        },
      },
      {
        type: "input",
        name: "tsConfig",
        message: "What is the ts config?",
        default: ({ config }: { config: string }) => {
          if (config === "react") {
            return "react-library";
          }
          if (config === "next") {
            return "nextjs";
          }
          return "base";
        },
      },
      {
        type: "confirm",
        name: "jest",
        message: "Include Jest configuration?",
        default: true,
      },
    ],
    actions: (data) => {
      console.log(data);
      const actions: PlopTypes.ActionType[] = [];

      const new_data = {
        ...data,
        reactish: data?.config === "react" || data?.config === "next",
      };

      actions.push({
        type: "add",
        path: "{{ turbo.paths.root }}/{{path}}/package.json",
        templateFile: "templates/create-library/package.json.hbs",
        data: new_data,
      });
      actions.push({
        type: "add",
        path: "{{ turbo.paths.root }}/{{path}}/.eslintrc.js",
        templateFile: "templates/create-library/eslint.hbs",
      });
      actions.push({
        type: "add",
        path: "{{ turbo.paths.root }}/{{path}}/tsup.config.ts",
        templateFile: "templates/create-library/tsup-config.hbs",
      });
      actions.push({
        type: "add",
        path: "{{ turbo.paths.root }}/{{path}}/tsconfig.json",
        templateFile: "templates/create-library/tsconfig.hbs",
        data: {
          ...data,
          include: "src",
        },
      });

      actions.push({
        type: "add",
        path: "{{ turbo.paths.root }}/{{path}}/src/index.ts",
        template:
          'export default function {{ camelCase name }}() { return "{{ name }}"; }',
      });

      actions.push({
        type: "add",
        path: "{{ turbo.paths.root }}/{{path}}/tsconfig.lint.json",
        templateFile: "templates/create-library/tsconfig.hbs",
        data: {
          ...data,
          include: ".",
        },
      });
      return actions;
    },
  });
}
