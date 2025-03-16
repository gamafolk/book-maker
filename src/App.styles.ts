import styled from "styled-components";

export const App = styled.div`
  html:has(> body > div#root > &),
  body:has(> div#root > &),
  div#root:has(> &) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: auto;
    cursor: default;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;

    * {
      box-sizing: border-box;
    }
  }

  width: 100%;
  display: flex;
  padding: 24px 16px;
  flex-direction: column;
`;

export const TopicContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
`;

export const Desc = styled.span`
  display: block;
  margin-top: 8px;
  margin-left: 20px;
  width: calc(100% - 20px);

  &[data-hasbottom="true"] {
    margin-bottom: 8px;
  }
`;
