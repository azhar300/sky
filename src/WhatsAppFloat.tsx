import './whatsapp-float.css';

const WHATSAPP_URL = 'https://wa.me/923427189884?text=Hello%20Skyline%20Global%20Industries%2C%20I%27d%20like%20to%20make%20an%20enquiry.';

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsappFloat"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Skyline Global Industries on WhatsApp"
      title="Chat with Skyline Global Industries on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="whatsappIcon">
        <path fill="currentColor" d="M19.11 17.38c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.59-.65 1.81-1.28.23-.63.23-1.16.16-1.28-.07-.11-.25-.18-.52-.32Z"/>
        <path fill="currentColor" d="M16.03 3.2c-7.05 0-12.78 5.73-12.78 12.78 0 2.25.59 4.45 1.72 6.38L3.14 28.8l6.59-1.73a12.72 12.72 0 0 0 6.3 1.66h.01c7.05 0 12.78-5.73 12.78-12.78S23.08 3.2 16.03 3.2Zm0 23.38h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.91 1.03 1.04-3.81-.25-.4a10.64 10.64 0 1 1 8.92 4.89Z"/>
      </svg>
      <span className="whatsappPulse" />
    </a>
  );
}
