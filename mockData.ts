
import { 
  FBPage, Conversation, ChatMessage, Order, PaymentSubmission, 
  CallRequest, HiddenComment, SenderType, MessageType, 
  OrderStatus, PaymentMethod, PaymentStatus, CallRequestStatus 
} from './types';

export const mockPages: FBPage[] = [
  { page_id: '101', page_name: 'Fashion Hub BD', connected_at: '2024-01-10', status: 'ACTIVE' },
  { page_id: '102', page_name: 'Gadget Store', connected_at: '2024-02-15', status: 'ACTIVE' },
];

export const mockConversations: Conversation[] = [
  { 
    conversation_id: 1, 
    page_id: '101', 
    customer_id: 1, 
    status: 'OPEN', 
    last_message_at: new Date().toISOString(),
    customer: { 
      customer_id: 1, 
      name: 'Rahim Ahmed', 
      phone: '01711223344', 
      messenger_psid: 'psid_rahim', 
      last_interaction_at: new Date().toISOString() 
    }
  },
  { 
    conversation_id: 2, 
    page_id: '101', 
    customer_id: 2, 
    status: 'OPEN', 
    last_message_at: new Date().toISOString(),
    customer: { 
      customer_id: 2, 
      name: 'Sumaiya Akter', 
      phone: '01855667788', 
      messenger_psid: 'psid_sumaiya', 
      last_interaction_at: new Date().toISOString() 
    }
  }
];

export const mockMessages: ChatMessage[] = [
  { 
    message_id: 1, 
    conversation_id: 1, 
    sender: SenderType.CUSTOMER, 
    type: MessageType.TEXT, 
    text: 'এই শার্টের সাইজ হবে?', 
    created_at: '2024-05-20T10:00:00Z' 
  },
  { 
    message_id: 2, 
    conversation_id: 1, 
    sender: SenderType.BOT, 
    type: MessageType.TEXT, 
    text: 'জি, Available আছে।', 
    created_at: '2024-05-20T10:01:00Z' 
  },
];

export const mockOrders: Order[] = [
  {
    order_id: 5001,
    page_id: '101',
    conversation_id: 1,
    customer_name: 'Rahim Ahmed',
    phone: '01711223344',
    address: 'House 12, Road 5, Dhanmondi, Dhaka',
    items: [{ product: 'Polo Shirt Blue', quantity: 1, price: 850 }],
    delivery_charge: 60,
    total_amount: 910,
    payment_method: PaymentMethod.BKASH,
    status: OrderStatus.PENDING,
    created_at: new Date().toISOString()
  }
];

export const mockPayments: PaymentSubmission[] = [
  {
    payment_id: 901,
    order_id: 5001,
    sender_number: '01711223344',
    trx_id: 'AKJ92H283',
    amount: 910,
    status: PaymentStatus.PENDING,
    submitted_at: new Date().toISOString()
  }
];

export const mockCalls: CallRequest[] = [
  {
    call_request_id: 1,
    page_id: '101',
    conversation_id: 1,
    customer_psid: 'psid_rahim',
    customer_name: 'Rahim Ahmed',
    requested_at: new Date().toISOString(),
    status: CallRequestStatus.REQUESTED,
    notes: 'Customer wants to confirm fabric quality over call.'
  }
];

export const mockHiddenComments: HiddenComment[] = [
  {
    comment_id: 'c1',
    page_id: '101',
    text: 'F*** you, bad service!',
    hidden_at: new Date().toISOString(),
    reason: 'BAD_LANGUAGE',
    customer_name: 'Unknown User'
  }
];
