declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare global {
  interface Array<T> {
    sortBySize: (key: keyof T) => this;
    sortByBoolean: (key: keyof T) => this;
  }
}

export {};
