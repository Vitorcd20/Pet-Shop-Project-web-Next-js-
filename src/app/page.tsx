export default function Home() {
  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:mb-8">
        <div>
          <h1 className="text-title text-content-primary mb-8">
            Your schedule
          </h1>
          <p className="text-paragraph-small text-content-secondary">
            Here you can see all your clients and the appointments scheduled for
            today
          </p>
        </div>
      </div>
    </div>
  );
}
