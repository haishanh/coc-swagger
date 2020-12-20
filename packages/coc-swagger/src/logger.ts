import { WriteStream, createWriteStream } from "fs";

export class Logger {
  private readonly ws: WriteStream | null = null;

  constructor(private readonly filename: string | undefined) {
    if (filename) {
      this.ws = createWriteStream(filename);
    }
  }

  log(msg: string) {
    if (!this.ws) return;

    const data = JSON.stringify({ time: new Date(), msg });
    this.ws.write(data + "\n");
  }
}

const filepath = process.env.COC_SWAGGER_LOG
  ? "/tmp/coc-swagger.log"
  : undefined;
export const logger = new Logger(filepath);
