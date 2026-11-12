import { business } from "./business";

// Costa Rica numbers are +506 plus 8 digits. The one stored value builds every link.
export function whatsappDigits(raw: string = business.whatsapp): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 8 ? `506${digits}` : digits;
}

export const hasWhatsapp = whatsappDigits() !== "";

export function whatsappLink(text?: string): string {
  const n = whatsappDigits();
  if (!n) return business.links.airbnb;
  return text ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : `https://wa.me/${n}`;
}

export function smsLink(text?: string): string {
  const n = whatsappDigits();
  if (!n) return business.links.airbnb;
  return text ? `sms:+${n}?&body=${encodeURIComponent(text)}` : `sms:+${n}`;
}

export function telLink(): string {
  const n = whatsappDigits();
  return n ? `tel:+${n}` : business.links.airbnb;
}

/** Where a plain "Message" action goes: WhatsApp when the number exists, otherwise the Airbnb listing. */
export const messageHref = hasWhatsapp ? whatsappLink() : business.links.airbnb;
