import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;

  button.btn-menu-control {
    --custom-btn-size: 24px;

    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--custom-btn-size);
    max-width: var(--custom-btn-size);
    min-height: var(--custom-btn-size);
    max-height: var(--custom-btn-size);
  }

  &:hover,
  &[data-menuopen="true"] {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const TopicTitle = styled.span`
  max-width: 100%;
  overflow: hidden;
  margin-right: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  padding: 8px 0;
  cursor: pointer;
`;

export const Controls = styled.div`
  gap: 4px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .btn-menu-drpdn {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      margin-right: 16px;
    }
  }

  .topics-header:not(:hover) &:not([data-meuopened="true"]) {
    display: none;
  }
`;
