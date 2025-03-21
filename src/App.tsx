import { Collapse } from "reactstrap";
import { createContext, useContextSelector } from "use-context-selector";

import "./assets/bootstrap.css";
import useApp from "./hooks/useApp";
import * as styled from "./App.styles";
import { Confirm, Header, TopicEditor, MenuBar, Empty } from "./components";

export type AppContextType = ReturnType<typeof useApp>;

const AppContext = createContext<AppContextType>({} as AppContextType);

export default function App() {
  const state = useApp();
  const { filteredTopics } = state;

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

          {!filteredTopics.length && <Empty />}

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
