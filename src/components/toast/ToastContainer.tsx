import styled from "styled-components";
import { ToastType } from "./Toast";
import { Theme } from "../../util/LightTheme";

interface ToastContainerProps {
  type: ToastType;
  theme: Theme;
}

export const StyledToastContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;
  position: absolute;
  right: 0;
  z-index: 2;
  border-radius: 8px;
  border: 1px solid
    ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return props.theme.colors.errorContainer;
        case ToastType.SUCCESS:
          return props.theme.colors.success;
        default:
          return props.theme.colors.errorContainer;
      }
    }};
  background: ${(props: ToastContainerProps) => props.theme.background};

  p {
    color: ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return props.theme.colors.errorContainer;
        case ToastType.SUCCESS:
          return props.theme.colors.success;
        default:
          return props.theme.colors.errorContainer;
      }
    }};
    margin: 0;
    font-variant-numeric: lining-nums tabular-nums;
    /* Body-2 */
    font-family: ${({ theme }) => theme.font.default};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 13.2px */
    letter-spacing: -0.12px;
  }
  transition: 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
`;
