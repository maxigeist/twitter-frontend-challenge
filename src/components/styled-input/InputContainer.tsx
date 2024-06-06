import styled from "styled-components";

export enum InputContainerSize {
    SMALL= 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE'
}
export interface InputContainerProps{
    sizing: InputContainerSize
}

export const StyledInputContainer = styled.div<InputContainerProps>`
  border-radius: 8px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.outline};
  transition: 0.3s;
  width: ${(props) => {
      switch (props.sizing){
          case 'SMALL':
              return '200px'
          case 'MEDIUM':
              return '280px'
          case 'LARGE':
              return '337px'
      }
  }};
    
  &.active-div {
    border: 1px solid ${(props) => props.theme.colors.main};
  }

  &.error {
    border: 1px solid ${(props) => props.theme.colors.error};
  }
`;
