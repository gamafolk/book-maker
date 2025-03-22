import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  padding: 0 16px;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  div.topics-body:has(> div > &:hover) {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }

  > svg[data-disabled="true"].open-indicator {
    opacity: 0.3;
    pointer-events: none;
  }

  > svg[data-opened="true"].open-indicator {
    transform: rotate(90deg);
    transition: transform 200ms ease-in-out;
  }

  > svg.open-indicator {
    --open-indicator-size: 16px;

    width: var(--open-indicator-size);
    height: var(--open-indicator-size);
    min-width: var(--open-indicator-size);
    max-width: var(--open-indicator-size);
    min-height: var(--open-indicator-size);
    max-height: var(--open-indicator-size);
    transition: transform 200ms ease-in-out;
  }

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

    > svg[data-checked="true"] {
      color: rgba(var(--bs-success-rgb)) !important;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
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

  &[data-disabled="true"] {
    pointer-events: none;
  }
`;

export const Controls = styled.div`
  gap: 4px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .topics-header:not(:hover) &:not([data-meuopened="true"]) {
    display: none;
  }
`;
