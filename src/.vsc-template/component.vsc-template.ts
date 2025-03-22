import * as vsc from "vsc-base";

const getMainFile = (inputs: vsc.vscUserInputs) => {
  const name = vsc.toPascalCase(inputs.name);

  return `import { ReactNode } from "react";
import use${name} from "./${name}.hook";
import * as styled from "./${name}.styles";

export interface ${name}Props {
  children?: ReactNode;
}

export default function ${name}({ children }: ${name}Props) {
  const { name } = use${name}();

  return (
    <styled.${name}>
      <div>{name}</div>
      {children}
    </styled.${name}>
  );
}
`;
};

const getStyleFile = (inputs: vsc.vscUserInputs) => {
  const name = vsc.toPascalCase(inputs.name);
  return `import styled from "styled-components";

export const ${name} = styled.div\`\`;
`;
};

const getHookFile = (inputs: vsc.vscUserInputs) => {
  const name = vsc.toPascalCase(inputs.name);

  return `import { useEffect, useState } from "react";

export default function use${name}() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    setName("${name}");
  }, []);

  return { name };
}
`;
};

const getIdexFile = (inputs: vsc.vscUserInputs) => {
  const name = vsc.toPascalCase(inputs.name);

  return `export { default as ${name} } from "./${name}";
export type { ${name}Props } from "./${name}";
`;
};

export function Template(): vsc.vscTemplate {
  return {
    userInputs: [
      {
        title: "What is the Component Name",
        argumentName: "name",
        defaultValue: "test",
      },
    ],
    template: [
      {
        type: "folder",
        name: (inputs) => vsc.toPascalCase(inputs.name),
        children: [
          {
            type: "file",
            content: getMainFile,
            name: (inputs) => `${vsc.toPascalCase(inputs.name)}.tsx`,
          },
          {
            type: "file",
            content: getStyleFile,
            name: (inputs) => `${vsc.toPascalCase(inputs.name)}.styles.ts`,
          },
          {
            type: "file",
            content: getHookFile,
            name: (inputs) => `${vsc.toPascalCase(inputs.name)}.hook.ts`,
          },
          {
            type: "file",
            content: getIdexFile,
            name: () => `index.ts`,
          },
        ],
      },
    ],
  };
}
