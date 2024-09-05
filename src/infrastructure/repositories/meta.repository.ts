import "dotenv/config";
import axios from "axios";
import LeadExternal from "../../domain/lead-external.repository";

const META_TOKEN = process.env.META_TOKEN || "";
const META_ID_NUMBER = process.env.META_ID_NUMBER || "";
const URL = `https://graph.facebook.com/v13.0/${META_ID_NUMBER}/messages`;

export default class MetaRepository implements LeadExternal {
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
      const body = imageUrl
        ? this.parseImageBody({ imageUrl, phone })
        : this.parseBody({ message, phone });

      const response = await axios.post(URL, body, {
        headers: {
          Authorization: `Bearer ${META_TOKEN}`,
        },
      }) as any;

      return response.data;
    } catch (e) {
      return Promise.resolve(e);
    }
  }

  private parseBody({ message, phone }: { message: string; phone: string }) {
    return {
      "messaging_product": "whatsapp",
      "to": phone,
      "type": "template",
      "template": {
        "name": "hello_world",
        "language": {
          "code": "en_US",
        },
      },
    };
  }

  private parseImageBody({ imageUrl, phone }: { imageUrl: string; phone: string }) {
    return {
      "messaging_product": "whatsapp",
      "to": phone,
      "type": "image",
      "image": {
        "link": imageUrl,
      },
    };
  }
}
