export interface LeadData {
  name: string
  phone: string
  email: string
  region: string
  projectType: string
  timeline: string
  size?: string
  message?: string
}

export async function submitLead(data: LeadData): Promise<{ ok: boolean }> {
  // TODO: wire to real endpoint — route submissions to awds.adiw@gmail.com via Resend API, with Google Sheets fallback
  await new Promise((resolve) => setTimeout(resolve, 1500))
  if (Math.random() < 0.1) {
    throw new Error('Simulated submission failure')
  }
  console.log('[lead submitted]', data)
  return { ok: true }
}
