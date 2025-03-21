import { Button, Collapse } from "reactstrap";
import { ArrowUpFromLine, ListTree, Plus } from "lucide-react";
import { createContext, useContextSelector } from "use-context-selector";

import "./assets/bootstrap.css";
import useApp from "./hooks/useApp";
import * as styled from "./App.styles";
import { Confirm, Header, TopicEditor, MenuBar } from "./components";
import { useTranslation } from "./i18n/I18nProvider";

export type AppContextType = ReturnType<typeof useApp>;

const AppContext = createContext<AppContextType>({} as AppContextType);

export default function App() {
  const t = useTranslation();
  const state = useApp();
  const { topics, filteredTopics, importFile, handleAddTopic } = state;

  return (
    <AppContext.Provider value={state}>
      <styled.App>
        <MenuBar />
        <div>
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
              <ListTree size={45} />
              <h1>{t("noTopics")}</h1>
              <span>
                {t("noTopicsMessage1")}
                <br />
                {t("noTopicsMessage2")}
                <br />
                {t("happyEditing")}
              </span>
              <div>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => handleAddTopic(topics)}
                >
                  <Plus size={16} />
                  {t("createANewOne")}
                </Button>
                <Button size="sm" color="secondary" onClick={importFile}>
                  <ArrowUpFromLine size={14} />
                  {t("import")}
                </Button>
              </div>
            </styled.Empty>
          )}

          <TopicEditor />
          <Confirm />
        </div>
      </styled.App>
    </AppContext.Provider>
  );
}

export function useAppCtx<T>(selector: (ctx: AppContextType) => T) {
  return useContextSelector(AppContext, selector);
}
