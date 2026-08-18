type Lead = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  product?: string;
  sku?: string;
  quantity?: string;
  customization?: string;
  destination?: string;
  message?: string;
};

type Env = { GROQ_API_KEY: string; RESEND_API_KEY: string };

const SYSTEM = `You are Skyline Global Industries' B2B sales qualification assistant.
Your only job is to help a visitor submit a genuine glove sourcing/manufacturing inquiry.
Be concise, professional, friendly and never invent facts.
Do not invent prices, MOQ, stock, certifications, lead times, materials, production capacity or shipping terms.
If asked for unsupported facts, say the sales team must confirm them.
Collect these fields one at a time, skipping a field only when the visitor already supplied it: name, company, email, phone/WhatsApp, product/category, SKU if known, quantity, customization/OEM requirement, destination country, and additional requirements.
Do not ask for passwords, payment details, CNIC/passport numbers or other sensitive information.
When all useful fields are collected, present a short summary and ask the visitor to confirm it.
Only after explicit confirmation, return action=submit with the collected lead.
Return JSON only with keys: reply, action, lead. action must be one of ask, confirm, submit. lead must contain only the fields you actually know.`;

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type' } });
}

function emailHtml(lead: Lead) {
  const rows = Object.entries(lead).filter(([, value]) => value).map(([key, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #e8edf2;font-weight:700;text-transform:capitalize">${key}</td><td style="padding:8px;border-bottom:1px solid #e8edf2">${String(value).replace(/[&<>\"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'} as Record<string,string>)[c] || c)}</td></tr>`).join('');
  return `<div style="font-family:Arial,sans-serif;color:#001337"><h2>New Skyline Website Inquiry</h2><p>A visitor completed the website lead qualification chatbot.</p><table style="border-collapse:collapse;width:100%;max-width:700px">${rows}</table><p style="margin-top:24px;color:#657488">Submitted from Skyline Global Industries website.</p></div>`;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const body = await context.request.json() as { messages?: Array<{ role: 'user' | 'assistant'; content: string }>; confirmed?: boolean; lead?: Lead };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-16) : [];

    if (body.confirmed && body.lead && Object.keys(body.lead).length) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Skyline Website <onboarding@resend.dev>',
          to: ['skylineglobalindustries@gmail.com'],
          subject: `New Website Inquiry${body.lead.company ? ` — ${body.lead.company}` : ''}`,
          html: emailHtml(body.lead),
        }),
      });
      if (!emailRes.ok) return jsonResponse({ error: 'We could not send the inquiry right now. Please try again or contact Skyline directly.' }, 502);
      return jsonResponse({ reply: 'Thank you. Your inquiry has been sent to Skyline Global Industries. Their sales team can follow up with you directly.', action: 'sent' });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${context.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.2,
        messages: [{ role: 'system', content: SYSTEM }, ...messages],
        response_format: { type: 'json_object' },
      }),
    });
    if (!groqRes.ok) return jsonResponse({ error: 'The assistant is temporarily unavailable. Please try again.' }, 502);
    const groq = await groqRes.json() as { choices?: Array<{ message?: { content?: string } }> };
    const raw = groq.choices?.[0]?.message?.content || '{}';
    let result: { reply?: string; action?: string; lead?: Lead };
    try { result = JSON.parse(raw); } catch { return jsonResponse({ error: 'The assistant returned an invalid response. Please try again.' }, 502); }
    return jsonResponse({ reply: result.reply || 'Could you tell me a little more about your glove requirement?', action: result.action || 'ask', lead: result.lead || {} });
  } catch {
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500);
  }
}
