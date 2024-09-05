import { create, Whatsapp } from "venom-bot";
import LeadExternal from "../../domain/lead-external.repository";

export class VenomTransporter implements LeadExternal {
  intance: Whatsapp | undefined;

  constructor() {
    create({ session: "session" }).then((client) => {
      this.intance = client;
      console.log("Venom client initialized");
    });
  }

  async sendMsg(lead: { message: string; phone: string; imageUrl?: string }): Promise<any> {
    try {
      const { message, phone, imageUrl } = lead;
      console.log("Sending message", { message, phone, imageUrl });
      if (imageUrl) {
        console.log("Sending image");
        const response = await this.intance?.sendImage(`${phone}@c.us`, imageUrl, 'image', message);
        console.log("Image sent", response);
        return Promise.resolve(response);
      } else {
        console.log("Sending text");
        const response = await this.intance?.sendText(`${phone}@c.us`, message);
        console.log("Text sent", response);
        return Promise.resolve(response);
      }
    } catch (error: any) {
      console.error("Error sending message", error);
      return Promise.reject(error);
    }
  }
}

