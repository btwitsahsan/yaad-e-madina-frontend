declare module 'react-scroll' {
    import { Component, ReactNode } from 'react';
  
    export interface LinkProps {
      to: string;
      spy?: boolean;
      hashSpy?: boolean;
      smooth?: boolean | string;
      offset?: number;
      duration?: number | string;
      delay?: number;
      isDynamic?: boolean;
      onClick?(): void;
      containerId?: string;
      activeClass?: string;
      className?: string;
      style?: React.CSSProperties;
      role?: string;
      tabIndex?: string;
      onSetActive?(to: string): void;
      onSetInactive?(to: string): void;
      ignoreCancelEvents?: boolean;
      saveHashHistory?: boolean;
      children?: ReactNode;
    }
  
    export class Link extends Component<LinkProps> {}
  
    export interface ElementProps {
      name: string;
      id?: string;
      className?: string;
      style?: React.CSSProperties;
      children?: ReactNode;
    }
  
    export class Element extends Component<ElementProps> {}
  
    export function scroller(): any;
    export function animateScroll(): any;
  }
  