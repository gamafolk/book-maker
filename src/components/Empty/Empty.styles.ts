import styled from "styled-components";

export const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > h1 {
    font-size: 21px;
    margin-bottom: 16px;
  }

  > span {
    text-align: center;
    max-width: 500px;
    margin-bottom: 24px;
  }

  > svg {
    margin-bottom: 8px;
  }

  > div {
    gap: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-direction: column;
    justify-content: center;

    > button {
      display: flex;
      padding-left: 16px;
      padding-right: 16px;
      align-items: center;
      justify-content: center;

      > svg {
        margin-right: 8px;
      }
    }
  }
`;
