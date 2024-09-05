import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadCreate {
  private leadRepository: LeadRepository;
  private leadExternal: LeadExternal;

  constructor(respositories: [LeadRepository, LeadExternal]) {
    const [leadRepository, leadExternal] = respositories;
    this.leadRepository = leadRepository;
    this.leadExternal = leadExternal;
  }

  public async sendMessageAndSave({
    message,
    phone,
    imageUrl,
  }: {
    message: string;
    phone: string;
    imageUrl?: string;
  }) {
    console.log("Saving message and sending to external service", { message, phone, imageUrl });
    const responseDbSave = await this.leadRepository.save({ message, phone });
    const responseExSave = await this.leadExternal.sendMsg({ message, phone, imageUrl });
    return { responseDbSave, responseExSave };
  }
}
