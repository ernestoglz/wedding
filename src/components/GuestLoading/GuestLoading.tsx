export const GuestLoading = () => {
  return (
    <section className="bg-navy-light px-4 py-20 text-center">
      <div className="mx-auto flex max-w-xs flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold/30 border-t-gold" />
        <p className="text-text-muted">Cargando tu invitación…</p>
      </div>
    </section>
  );
};
