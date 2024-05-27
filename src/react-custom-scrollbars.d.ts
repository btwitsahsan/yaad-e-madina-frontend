declare module 'react-custom-scrollbars' {
    import * as React from 'react';
  
    export interface ScrollbarProps {
      onScroll?: React.UIEventHandler<any>;
      onScrollFrame?: (values: any) => void;
      onScrollStart?: () => void;
      onScrollStop?: () => void;
      renderView?: React.ReactElement;
      renderTrackHorizontal?: React.ReactElement;
      renderTrackVertical?: React.ReactElement;
      renderThumbHorizontal?: React.ReactElement;
      renderThumbVertical?: React.ReactElement;
      autoHide?: boolean;
      autoHideTimeout?: number;
      autoHideDuration?: number;
      thumbSize?: number;
      thumbMinSize?: number;
      universal?: boolean;
      autoHeight?: boolean;
      autoHeightMin?: number | string;
      autoHeightMax?: number | string;
      hideTracksWhenNotNeeded?: boolean;
      children?: React.ReactNode;
    }
  
    export class Scrollbars extends React.Component<ScrollbarProps, any> {
      scrollToTop: () => void;
      scrollToBottom: () => void;
      scrollToLeft: () => void;
      scrollToRight: () => void;
      scrollTop: (top: number) => void;
      scrollLeft: (left: number) => void;
      scrollTo: (x: number, y: number) => void;
    }
  }
  