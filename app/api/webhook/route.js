import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, plan } = session.metadata;
        const customerId = session.customer;

        const isLifetime = plan === "lifetime";
        const endsAt = isLifetime ? null : new Date(Date.now() + (plan === "annual" ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString();

        await supabase
          .from("users")
          .upsert({
            id: userId,
            stripe_customer_id: customerId,
            plan: plan,
            is_active: true,
            subscription_ends_at: endsAt,
          })
          .eq("id", userId);

        console.log(`Webhook: activated ${plan} for user ${userId}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        await supabase
          .from("users")
          .update({ is_active: false, plan: "trial" })
          .eq("stripe_customer_id", customerId);

        console.log(`Webhook: deactivated subscription for customer ${customerId}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        await supabase
          .from("users")
          .update({ is_active: false })
          .eq("stripe_customer_id", customerId);

        console.log(`Webhook: payment failed for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Webhook: unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return Response.json({ error: "Handler error" }, { status: 500 });
  }

  return Response.json({ received: true });
}