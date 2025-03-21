import { Navbar } from "reactstrap";
import styled from "styled-components";

export const MenuBar = styled(Navbar)`
  .btn-menu-drpdn {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      margin-right: 16px;
    }

    i.icon-brand {
      width: 20px;
      height: 20px;
      display: block;
      margin-right: 12px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
`;
