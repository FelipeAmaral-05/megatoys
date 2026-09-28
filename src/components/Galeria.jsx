import React from 'react';
export default function Galeria() {
return (
<div className="p-4 max-w-[1400px] mx-auto">
<h1 className="text-3xl font-bold text-center my-8">120 Brinquedos</h1>
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
{Array.from({ length: 120 }, (_, i) => {
const id = i + 1;
return (
<div key={id} className="bg-white border rounded-xl overflow-hidden shadow">
<img
src={`${import.meta.env.BASE_URL}fotos/${id}.jpg`}
alt={`Brinquedo ${id}`}
className="w-full h-48 object-cover"
loading="lazy"
/>
<div className="p-2 text-center">
<p className="font-bold">Brinquedo {id}</p>
</div>
</div>
);
})}
</div>
</div>
);
}