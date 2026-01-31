import React, { useState } from 'react';

export default function ContractChecker() {
  const [dealId, setDealId] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_TOKEN = 'TU_API_TOKEN_AQUI'; // <- Reemplaza esto con tu token real

  const checkDeal = async () => {
    if (!dealId) return;
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(`https://api.pipedrive.com/v1/deals/${dealId}?api_token=${API_TOKEN}`);
      const data = await res.json();

      if (!data.success) throw new Error('No se pudo obtener el deal');

      const deal = data.data;
      const stageName = deal.stage_name || '';

      const allowedStages = [
        'Decision: Contract Appointment (New contracts)',
        'Signed in the Office',
        'Closed in the office',
        'Contract Appointment (Deals)'
      ];

      const errors = [];

      // Regla 1: Etapa válida
      if (!allowedStages.includes(stageName)) {
        errors.push('❌ El deal no está en una etapa válida para contrato.');
      } else {
        errors.push('✅ Etapa válida.');
      }

      // Regla 2: Campo obligatorio (ejemplo)
      if (!deal['some_required_field']) {
        errors.push('❌ Falta el campo obligatorio: some_required_field');
      } else {
        errors.push('✅ Campo obligatorio lleno.');
      }

      setResults(errors);
    } catch (e) {
      setResults(['❌ Error al verificar el deal: ' + e.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Check for Contracts</h1>
      <input
        type="text"
        placeholder="Pega el Deal ID aquí"
        className="border p-2 w-full"
        value={dealId}
        onChange={(e) => setDealId(e.target.value)}
      />
      <button
        onClick={checkDeal}
        disabled={loading || !dealId}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Verificando...' : 'Validar'}
      </button>
      {results && (
        <div className="bg-gray-100 p-3 rounded space-y-2">
          {results.map((r, i) => (
            <div key={i}>{r}</div>
          ))}
        </div>
      )}
    </div>
  );
}