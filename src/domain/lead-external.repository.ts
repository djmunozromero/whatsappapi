export default interface LeadExternal {
  sendMsg({
    message,
    phone,
    imageUrl,
  }: {
    message: string;
    phone: string;
    imageUrl?: string;
  }): Promise<any>;
}
