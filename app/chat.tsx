'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 border p-4 rounded bg-gray-50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded ${
              m.role === 'user'
                ? 'bg-blue-100 text-blue-900 ml-auto max-w-[80%]'
                : 'bg-white text-gray-900 border mr-auto max-w-[80%]'
            }`}
          >
            <strong>{m.role === 'user' ? 'Tú: ' : 'Bot: '}</strong>
            <p className="whitespace-pre-wrap">
              {m.parts
                ?.filter((p) => p.type === 'text')
                .map((p) => p.text)
                .join('')}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded text-black border-gray-300"
          value={input}
          placeholder="Escribe un mensaje..."
          onChange={(e) => setInput(e.target.value)}
          disabled={status === 'submitted' || status === 'streaming'}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={status === 'submitted' || status === 'streaming'}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}