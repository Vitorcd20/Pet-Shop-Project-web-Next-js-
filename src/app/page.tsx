import { AppointmentForm } from "@/components/appointment-form/appointment-form";
import { PeriodSection } from "@/components/period-section/period-section";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { groupAppointmentByPeriod } from "@/utils";
import { endOfDay, parseISO, startOfDay } from "date-fns";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const {date} = await searchParams
  const selectedDate = date ? parseISO(date) : new Date()

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      }
    }
  });

  const periods = groupAppointmentByPeriod(appointments);

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

      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#32242C] py-[18Ppx] px-6 md:bottom-6 md:right-6 md:left-auto md: top-auto md:bg-transparent md:p-0">
        <AppointmentForm>
           <Button variant="brand">New appointment</Button> 
        </AppointmentForm>
      </div>
    </div>
  );
}
