// ✅ MOCK API - simula il comportamento del backend
// In futuro puoi sostituire queste funzioni con vere chiamate Axios

let oggetti = [
  { id: 1, nome: "Latte", categoria: "Alimentari" },
  { id: 2, nome: "Pane", categoria: "Alimentari" },
  { id: 3, nome: "Sapone", categoria: "Igiene" },
  { id: 4, nome: "Detersivo", categoria: "Pulizia" },
];

// Simuliamo un leggero ritardo per sembrare più realistico
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getOggetti = async () => {
  await delay(200); // simula tempo di rete
  return { data: oggetti };
};

export const createOggetto = async (nuovoOggetto) => {
  await delay(200);
  const nuovo = { ...nuovoOggetto, id: Date.now() }; // id simulato
  oggetti.push(nuovo);
  return { data: nuovo };
};

export const updateOggetto = async (id, oggettoAggiornato) => {
  await delay(200);
  oggetti = oggetti.map((o) =>
    o.id === id ? { ...o, ...oggettoAggiornato } : o
  );
  return { data: oggettoAggiornato };
};

export const deleteOggetto = async (id) => {
  await delay(200);
  oggetti = oggetti.filter((o) => o.id !== id);
  return { data: { success: true } };
};
