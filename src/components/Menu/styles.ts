import styled from 'styled-components';
import { Header, Segment, SegmentProps, HeaderProps } from 'semantic-ui-react';

export const SegmentUi = styled(Segment)<SegmentProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: red;
`;
export const HeaderUi = styled(Header)<HeaderProps>`
  display: inline-block;

  svg {
    cursor: pointer;
  }
`;
