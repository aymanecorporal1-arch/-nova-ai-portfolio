/**
 * Submits lead data to the n8n webhook for processing.
 * @param data Lead information with exact keys required by n8n
 */
export async function submitLead(data: {
  email: string;
  savings: number;
  teamSize: number;
  message: string;
}) {
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://n8n.your-instance.com/webhook/nova-leads';

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit lead: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error };
  }
}
