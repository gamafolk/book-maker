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
    overflow: auto;
    cursor: default;
    flex-direction: column;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;

    * {
      box-sizing: border-box;
    }
  }

  .btn-menu-drpdn {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      margin-right: 16px;
    }
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    height: 100%;
    padding: 16px;
    overflow: auto;
    max-height: 100%;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.4);
      border-radius: 0px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.6);
    }
  }
`;

export const TopicContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Body = styled.div`
  display: flex;
  margin-left: 24px;
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
