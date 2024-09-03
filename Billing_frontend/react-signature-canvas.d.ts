declare module 'react-signature-canvas' {
  import * as React from 'react';

  interface SignatureCanvasProps {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
    velocityFilterWeight?: number;
    minWidth?: number;
    maxWidth?: number;
    dotSize?: number | (() => number);
    penColor?: string;
    backgroundColor?: string;
    onEnd?: (event: MouseEvent | TouchEvent) => void;
    onBegin?: (event: MouseEvent | TouchEvent) => void;
  }

  class SignatureCanvas extends React.Component<SignatureCanvasProps> {
    clear(): void;
    getTrimmedCanvas(): HTMLCanvasElement;
    getCanvas(): HTMLCanvasElement;
    fromDataURL(dataURL: string): void;
    toDataURL(type?: string, encoderOptions?: number): string;
  }

  export default SignatureCanvas;
}
