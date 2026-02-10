
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Phone, 
  CheckCircle, 
  User, 
  MoreVertical,
  Bot,
  Zap,
  Loader2,
  MessageSquare,
  Mic,
  Volume2,
  ScanSearch,
  X
} from 'lucide-react';
import { 
  Conversation, ChatMessage, SenderType, MessageType 
} from '../types';
import { mockConversations, mockMessages } from '../mockData';
import { getBotReply, speakText, analyzeImage, transcribeAudio } from '../geminiService';

const Inbox: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<number | null>(mockConversations[0].conversation_id);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedConv = conversations.find(c => c.conversation_id === selectedId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (sender: SenderType = SenderType.AGENT) => {
    if ((!inputText.trim() && !attachedImage) || !selectedId) return;

    const newMessage: ChatMessage = {
      message_id: Date.now(),
      conversation_id: selectedId,
      sender,
      type: attachedImage ? MessageType.IMAGE : MessageType.TEXT,
      text: inputText,
      media_url: attachedImage || undefined,
      created_at: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setAttachedImage(null);
  };

  const generateAISuggestion = async () => {
    if (!selectedId) return;
    const lastUserMsg = [...messages].reverse().find(m => m.sender === SenderType.CUSTOMER);
    if (!lastUserMsg?.text) return;

    setIsBotThinking(true);
    const suggestion = await getBotReply(lastUserMsg.text);
    setInputText(suggestion);
    setIsBotThinking(false);
  };

  const handleTranscribe = async () => {
    setIsRecording(true);
    // Simulation: In a real app, we'd capture stream from navigator.mediaDevices.getUserMedia
    setTimeout(async () => {
      const dummyBase64 = "UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="; 
      const result = await transcribeAudio(dummyBase64);
      setInputText(prev => prev + (prev ? " " : "") + (result || "How much is the price?"));
      setIsRecording(false);
    }, 1500);
  };

  const handleAnalyzeImage = async () => {
    if (!attachedImage) return;
    setIsBotThinking(true);
    const analysis = await analyzeImage(attachedImage.split(',')[1], "Describe this product and suggest a price range in BDT.");
    setInputText(analysis);
    setIsBotThinking(false);
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-white">
      {/* Sidebar - Conv List */}
      <div className="w-80 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <select className="w-full p-2 bg-slate-100 border-none rounded-lg text-sm font-medium">
            <option>All Pages</option>
            <option>Fashion Hub BD</option>
            <option>Gadget Store</option>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button
              key={conv.conversation_id}
              onClick={() => setSelectedId(conv.conversation_id)}
              className={`w-full p-4 flex gap-3 border-b border-slate-50 transition-colors ${
                selectedId === conv.conversation_id ? 'bg-blue-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="relative">
                <img src={`https://picsum.photos/seed/${conv.customer?.messenger_psid}/48`} className="w-12 h-12 rounded-full" alt="avatar" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm truncate">{conv.customer?.name}</h4>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">2m ago</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-1">
                  {messages.filter(m => m.conversation_id === conv.conversation_id).slice(-1)[0]?.text || 'Started a conversation'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {selectedConv ? (
          <>
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/${selectedConv.customer?.messenger_psid}/32`} className="w-8 h-8 rounded-full" alt="avatar" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{selectedConv.customer?.name}</h3>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-full"><Phone size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-full"><CheckCircle size={18} /></button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.filter(m => m.conversation_id === selectedId).map(msg => (
                <div key={msg.message_id} className={`flex ${msg.sender === SenderType.CUSTOMER ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.sender === SenderType.CUSTOMER 
                      ? 'bg-white border border-slate-200 text-slate-800' 
                      : msg.sender === SenderType.BOT 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-blue-600 text-white'
                  }`}>
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1">
                        {msg.sender === SenderType.BOT && <Bot size={12} />}
                        <span className="text-[10px] opacity-70 font-semibold uppercase tracking-wider">
                          {msg.sender}
                        </span>
                      </div>
                      <button onClick={() => speakText(msg.text || "")} className="p-1 hover:bg-black/5 rounded">
                        <Volume2 size={12} className={msg.sender === SenderType.AGENT ? 'text-white' : 'text-slate-400'} />
                      </button>
                    </div>
                    {msg.type === MessageType.IMAGE && (
                      <img src={msg.media_url} className="rounded-lg mb-2 max-w-full h-auto border" alt="attached" />
                    )}
                    {msg.text}
                    <div className="text-[10px] opacity-60 mt-1 text-right">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={generateAISuggestion}
                  disabled={isBotThinking}
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 disabled:opacity-50"
                >
                  {isBotThinking ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                  Suggest Reply (AI)
                </button>
                {attachedImage && (
                   <button 
                   onClick={handleAnalyzeImage}
                   disabled={isBotThinking}
                   className="flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full hover:bg-purple-100"
                 >
                   <ScanSearch size={14} /> Analyze Photo (AI)
                 </button>
                )}
              </div>
              
              {attachedImage && (
                <div className="relative w-20 h-20 mb-3 group">
                  <img src={attachedImage} className="w-full h-full object-cover rounded-lg border" />
                  <button 
                    onClick={() => setAttachedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-3">
                <div className="flex gap-1 mb-2">
                  <button 
                    onClick={() => setAttachedImage("https://picsum.photos/400/300")}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <button 
                    onClick={handleTranscribe}
                    className={`p-2 rounded-lg transition-colors ${isRecording ? 'text-red-600 bg-red-50 animate-pulse' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'}`}
                  >
                    <Mic size={20} />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <textarea 
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={isRecording ? "Listening..." : "Type your reply..."}
                    className="w-full bg-slate-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                </div>
                <button 
                  onClick={() => handleSend()}
                  disabled={!inputText.trim() && !attachedImage}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <MessageSquare size={64} className="mb-4 opacity-20" />
            <p className="font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
