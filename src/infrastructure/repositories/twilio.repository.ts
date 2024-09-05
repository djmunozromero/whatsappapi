import "dotenv/config";
import { Twilio } from "twilio";
import LeadExternal from "../../domain/lead-external.repository";

const accountSid = process.env.TWILIO_SID || "";
const authToken = process.env.TWILIO_TOKEN || "";
const fromNumber = process.env.TWILIO_FROM || "";

export default class TwilioService extends Twilio implements LeadExternal {
  constructor() {
    super(accountSid, authToken);
  }

  async sendMsg({
    message,
    phone,
    imageUrl,
  }: {
    message: string;
    phone: string;
    imageUrl?: string;
  }): Promise<any> {
    try {
      const parsePhone = `+${phone}`;
      const mapMsg: any = { body: message, to: parsePhone, from: fromNumber };
      if (imageUrl) {
        mapMsg.mediaUrl = [imageUrl];
      }
      const response = await this.messages.create(mapMsg);
      return response;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
}


