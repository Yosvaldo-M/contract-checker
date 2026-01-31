// src/ContractChecker.jsx
import React, { useState } from 'react';

const API_TOKEN = 'TU_API_TOKEN_AQUI';
const API_URL = 'https://api.pipedrive.com/v1';

export default function ContractChecker() {
  const [dealId, setDealId] = useState('');
  const [result, setResult] = useState(null);

  const checkFields = async () => {
    const res = await fetch(`${API_URL}/deals/${dealId}?api_token=${API_TOKEN}`);
    const data = await res.json();

    const deal = data.data;
    const errors = [];

    if (!deal.value || deal.value < 4000) errors.push('Valor mínimo debe ser 4000 o más');
    if (!deal.title || !deal.title.toLowerCase().includes('ward')) errors.push('El título debe contener "Ward"');
    if (!deal.stage_id || deal.stage_id !== 25) errors.push('Debe estar en etapa de contratación (ID 25)');
    // Agrega tus reglas aquí...

    setResult(errors.length === 0 ? '✅ Todo listo para contrato' : `⚠️ Problemas:\n- ${errors.join('\n- ')}`);
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Check for Contracts</h2>
      <input
        type="text"
        placeholder="Deal ID"
        value={dealId}
        onChange={(e) => setDealId(e.target.value)}
        style={{ padding: '8px', width: '80%', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={checkFields} style={{ padding: '10px 20px' }}>Validar</button>
      {result && <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </div>
  );
}
