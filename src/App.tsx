import { Button, Collapse } from "reactstrap";
import { createContext, useContextSelector } from "use-context-selector";

import "./assets/bootstrap.css";
import useApp from "./hooks/useApp";
import * as styled from "./App.styles";
import { Confirm, Header, MenuApp, TopicEditor } from "./components";
import { ArrowUpFromLine, Plus } from "lucide-react";

export type AppContextType = ReturnType<typeof useApp>;

const AppContext = createContext<AppContextType>({} as AppContextType);

export default function App() {
  const state = useApp();
  const { topics, filteredTopics, importFile, handleAddTopic } = state;

  return (
    <AppContext.Provider value={state}>
      <styled.App>
        {filteredTopics.map(function mapper(topic, i, all) {
          return (
            <styled.TopicContainer key={topic.id}>
              <Header topic={topic} all={all} index={i} />
              <Collapse isOpen={topic.expanded || topic.opened}>
                <styled.Body>
                  {topic.description && (
                    <styled.Desc data-hasbottom={!!topic.children.length}>
                      {topic.description}
                    </styled.Desc>
                  )}
                  {topic.children.map(mapper)}
                </styled.Body>
              </Collapse>
            </styled.TopicContainer>
          );
        })}

        {!filteredTopics.length && (
          <styled.Empty>
            <h1>Nada de tópicos por aqui</h1>
            <div>
              <Button outline size="sm" color="info" onClick={importFile}>
                <ArrowUpFromLine size={14} />
                Importar
              </Button>
              <Button
                outline
                size="sm"
                color="primary"
                onClick={() => handleAddTopic(topics)}
              >
                <Plus size={16} />
                Criar um novo
              </Button>
            </div>
          </styled.Empty>
        )}

        <TopicEditor />
        <Confirm />
        {!!topics.length && <MenuApp />}
      </styled.App>
    </AppContext.Provider>
  );
}

export function useAppCtx<T>(selector: (ctx: AppContextType) => T) {
  return useContextSelector(AppContext, selector);
}
