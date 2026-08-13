'use client';

import { useChat } from '@ai-sdk/react';
import React, { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4 justify-between">
      <h1 className="text-2xl font-bold text-center mb-4">Mi Bot con Groq ⚡</h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 border p-4 rounded-lg bg-gray-50">
        {messages.map((m) => (
          <div key={m.id} className={`whitespace-pre-wrap ${m.role === 'user' ? 'text-blue-600' : 'text-gray-800'}`}>
            <strong>{m.role === 'user' ? 'Tú: ' : 'Bot: '}</strong>
            {m.parts ? m.parts.map((p) => ('text' in p ? p.text : '')).join('') : ''}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 p-2 rounded-lg"
          value={input}
          placeholder="Escribe tu mensaje..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
}