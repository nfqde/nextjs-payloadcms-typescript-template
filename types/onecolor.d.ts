declare module 'onecolor' {
    interface ColorObject {
        equals(colorObj: ColorObject): boolean;
        hex(): string;
    }

    export default function color(colorString: string): ColorObject;
}