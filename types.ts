
export enum SenderType {
  CUSTOMER = 'CUSTOMER',
  BOT = 'BOT',
  AGENT = 'AGENT'
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export enum OrderStatus {
  PENDING = 'ORDER_PENDING',
  CONFIRMED = 'CONFIRMED',
  PACKING = 'PACKING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  COD = 'COD',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export enum CallRequestStatus {
  REQUESTED = 'REQUESTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface FBPage {
  page_id: string;
  page_name: string;
  connected_at: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Customer {
  customer_id: number;
  name: string;
  phone: string;
  messenger_psid: string;
  last_interaction_at: string;
}

export interface Conversation {
  conversation_id: number;
  page_id: string;
  customer_id: number;
  status: 'OPEN' | 'CLOSED';
  last_message_at: string;
  customer?: Customer;
}

export interface ChatMessage {
  message_id: number;
  conversation_id: number;
  sender: SenderType;
  type: MessageType;
  text?: string;
  media_url?: string;
  created_at: string;
}

export interface Order {
  order_id: number;
  page_id: string;
  conversation_id: number;
  customer_name: string;
  phone: string;
  address: string;
  items: Array<{ product: string; quantity: number; price: number }>;
  delivery_charge: number;
  total_amount: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  created_at: string;
}

export interface PaymentSubmission {
  payment_id: number;
  order_id: number;
  sender_number: string;
  trx_id: string;
  amount: number;
  screenshot_url?: string;
  status: PaymentStatus;
  submitted_at: string;
}

export interface CallRequest {
  call_request_id: number;
  page_id: string;
  conversation_id: number;
  customer_psid: string;
  requested_at: string;
  status: CallRequestStatus;
  notes?: string;
  customer_name?: string;
}

export interface HiddenComment {
  comment_id: string;
  page_id: string;
  text: string;
  hidden_at: string;
  reason: 'BAD_LANGUAGE' | 'OFFENSIVE' | 'SPAM';
  customer_name: string;
}
