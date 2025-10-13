import { PeriodSection } from "@/components/period-section/period-section";
import { prisma } from "@/lib/prisma";
import { groupAppointmentByPeriod, APPOINTMENTS } from "@/utils";

export default async function Home() {
  //const appoint = await prisma.appointment.findMany()


  const periods = groupAppointmentByPeriod(APPOINTMENTS);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-8">
            Your schedule
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Here you can see all your clients and the appointments scheduled for
            today
          </p>
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>
    </div>
  );
}
