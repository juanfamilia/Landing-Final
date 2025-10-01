export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="text-center p-8">
        <img 
          src="https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png"
          alt="Siete CX Logo"
          className="h-20 w-auto mx-auto mb-8"
        />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Siete CX – Customer Experience Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Measure, analyze, and improve customer experience with video mystery shopping and call analysis.
        </p>
        <div className="space-y-4">
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all">
            Request a Demo
          </button>
          <div className="text-lg text-green-600 font-semibold">✅ Next.js Migration Successful</div>
        </div>
      </div>
    </main>
  );
}