declare module "detect-port-alt" {
  export default function detect(want: number, host: string): Promise<number>;
}
