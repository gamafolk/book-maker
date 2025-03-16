import styled from "styled-components";

export const Title = styled.span`
  width: 100%;
  display: block;
  font-size: 16px;
  overflow: hidden;
  margin-left: 8px;
  margin-right: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;

  .modal-title:has(&) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .custom-btn-close {
      cursor: pointer;
    }
  }
`;
