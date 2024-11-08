import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Bienvenido a la Pasarela de Pagos</h1>
      <div className="mt-6 space-x-4">
        <Link href="/payment" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Ir a Pago
        </Link>
        <Link href="/fill" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Ir a Facturación
        </Link>
        <Link href="/form" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Ir a Formulario de facturación
        </Link>
      </div>
    </div>
  );
}
