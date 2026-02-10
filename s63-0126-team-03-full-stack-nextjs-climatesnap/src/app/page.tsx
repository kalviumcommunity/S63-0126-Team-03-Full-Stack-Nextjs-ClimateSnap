export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
      <main className="flex w-full max-w-3xl flex-col gap-10 rounded-3xl bg-slate-900/60 p-8 shadow-xl ring-1 ring-slate-800">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            ClimateSnap
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Climate insights for modern cities.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Securely explore temperature, air quality, and rainfall trends for cities
            around the world. ClimateSnap gives users and admins a clean dashboard
            to understand climate data at a glance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Get started
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 sm:w-auto"
            >
              Create an account
            </a>
            <a
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-50 transition hover:border-emerald-500 hover:text-emerald-300 sm:w-auto"
            >
              I already have an account
            </a>
            <a
              href="/dashboard"
              className="inline-flex w-full items-center justify-center rounded-full border border-dashed border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-emerald-500 hover:text-emerald-300 sm:w-auto"
            >
              Preview dashboard
            </a>
          </div>
        </section>

        <section className="grid gap-4 border-t border-slate-800 pt-6 text-sm text-slate-300 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="font-medium text-slate-100">Role‑aware access</p>
            <p className="text-xs text-slate-400">
              Users see their city climate snapshots, while admins can manage cities
              and climate records.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-slate-100">Trusted data</p>
            <p className="text-xs text-slate-400">
              Backed by PostgreSQL and Prisma, ready for real‑time feeds and
              advanced analytics.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-slate-100">Secure by design</p>
            <p className="text-xs text-slate-400">
              JWT authentication, RBAC, and strict validation keep your climate
              insights protected.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
