import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, CheckCheck, Loader2 } from 'lucide-react';
import { sendMessageApi, getConversationApi } from '../services/messageService';

export default function MessagesPage() {
  const currentUserId = 1;

  // চ্যাট লিস্টে থাকা ডোনার/ইউজারদের তালিকা
  const [conversations, setConversations] = useState([
    {
      id: 2,
      name: 'তানভীর আহমেদ',
      bloodGroup: 'O+',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      lastMessage: 'আমি বিকেল ৪টায় হাসপাতালে পৌঁছাতে পারব।',
      time: '১০:৩০ AM',
      unread: 0,
      isOnline: true,
      phone: '01711111111'
    },
    {
      id: 3,
      name: 'মেহেদী হাসান',
      bloodGroup: 'A+',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      lastMessage: 'রোগীর বর্তমান অবস্থা কেমন?',
      time: 'গতকাল',
      unread: 2,
      isOnline: false,
      phone: '01822222222'
    }
  ]);

  const [activeUser, setActiveUser] = useState(conversations[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // ব্যাকএন্ড থেকে মেসেজ লোড করা
  const fetchMessages = async (recipientId) => {
    try {
      const data = await getConversationApi(currentUserId, recipientId);
      setMessages(data);
    } catch (err) {
      console.error('মেসেজ পেতে সমস্যা:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeUser) {
      setLoading(true);
      fetchMessages(activeUser.id);
      const interval = setInterval(() => fetchMessages(activeUser.id), 3000);
      return () => clearInterval(interval);
    }
  }, [activeUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeUser) return;

    setSending(true);
    const messageContent = newMessage;
    setNewMessage('');

    try {
      await sendMessageApi(currentUserId, activeUser.id, messageContent);
      await fetchMessages(activeUser.id);
      
      // চ্যাট লিস্টের লাস্ট মেসেজ আপডেট
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeUser.id ? { ...c, lastMessage: messageContent, time: 'এখন' } : c
        )
      );
    } catch (err) {
      console.error('মেসেজ পাঠাতে সমস্যা:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-90px)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full">
        
        {/* বাঁপাশের ইনবক্স / মেসেজসমূহ লিস্ট */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900">মেসেজসমূহ</h2>
            <span className="bg-rose-50 text-brand-600 text-xs font-extrabold px-2.5 py-1 rounded-full">
              {conversations.length} টি চ্যাট
            </span>
          </div>

          {/* চ্যাট লিস্ট */}
          <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
            {conversations.map((chat) => {
              const isActive = activeUser?.id === chat.id;
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveUser(chat)}
                  className={`p-3 rounded-2xl cursor-pointer transition flex items-center justify-between ${
                    isActive
                      ? 'bg-rose-50/70 border border-rose-100 shadow-sm'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={chat.avatarUrl}
                        alt={chat.name}
                        className="w-12 h-12 rounded-2xl object-cover"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-brand-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md border-2 border-white">
                        {chat.bloodGroup}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{chat.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-2">
                    <span className="text-[10px] text-slate-400 font-medium block">{chat.time}</span>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-brand-600 text-white text-[9px] font-black rounded-full mt-1">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ডানপাশের চ্যাট উইন্ডো */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col h-full">
          
          {/* Header */}
          {activeUser && (
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeUser.avatarUrl}
                    alt={activeUser.name}
                    className="w-11 h-11 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-brand-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md border-2 border-white">
                    {activeUser.bloodGroup}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{activeUser.name}</h3>
                  <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {activeUser.isOnline ? 'অনলাইন আছেন' : 'অফলাইন'}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${activeUser.phone}`}
                className="w-9 h-9 rounded-full bg-rose-50 text-brand-600 flex items-center justify-center hover:bg-rose-100 transition shadow-sm"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-3 py-4 px-2">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-20 text-slate-400 text-xs font-medium">
                কোনো মেসেজ নেই। নতুন কথোপকথন শুরু করুন!
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                        isMe
                          ? 'bg-brand-600 text-white rounded-br-none shadow-md shadow-brand-600/10'
                          : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Time & Double Check status */}
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-[9px] font-semibold text-slate-400">
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'এখন'}
                      </span>
                      {isMe && <CheckCheck className="w-3 h-3 text-brand-600" />}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="pt-2 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full p-1.5 pl-5 shadow-inner">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="একটি বার্তা লিখুন..."
                className="flex-1 bg-transparent text-xs font-medium focus:outline-none text-slate-800"
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="w-9 h-9 bg-brand-600 hover:bg-brand-700 text-white rounded-full flex items-center justify-center transition shadow-md shadow-brand-600/30 disabled:opacity-50 shrink-0"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}