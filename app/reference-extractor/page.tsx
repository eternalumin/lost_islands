'use client';

import { useState } from 'react';

export default function ReferenceExtractor() {
  const [wikipediaLink, setWikipediaLink] = useState('');
  const [islandId, setIslandId] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleExtract = async () => {
    setLoading(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/extractReferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wikipediaLink,
          islandId: parseInt(islandId),
        }),
      });

      const data = await res.json();
      setResponseMessage(data.message || 'Done!');
    } catch (err) {
      console.error(err);
      setResponseMessage('Error occurred during extraction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-sky-900 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold">Reference Extractor</h1>

      <input
        type="text"
        placeholder="Wikipedia link"
        value={wikipediaLink}
        onChange={(e) => setWikipediaLink(e.target.value)}
        className="w-full max-w-md p-3 rounded bg-white text-black shadow"
      />

      <input
        type="number"
        placeholder="Island ID"
        value={islandId}
        onChange={(e) => setIslandId(e.target.value)}
        className="w-full max-w-md p-3 rounded bg-white text-black shadow"
      />

      <button
        onClick={handleExtract}
        disabled={loading}
        className="px-6 py-2 bg-yellow-700 rounded hover:bg-yellow-800 transition"
      >
        {loading ? 'Extracting...' : 'Extract References'}
      </button>

      {responseMessage && (
        <div className="mt-4 text-center text-green-400">{responseMessage}</div>
      )}
    </div>
  );
}
