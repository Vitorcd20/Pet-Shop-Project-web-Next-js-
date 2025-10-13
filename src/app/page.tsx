import { PeriodSection } from "@/components/period-section/period-section";
import { groupAppointmentByPeriod } from "@/utils/appointment-utils";

const appointments = [
  {
    id: "1",
    petName: "Rex",
    description: "Consulta",
    tutorName: "João",
    phone: "1234567890",
    scheduleAt: new Date("2025-08-17T10:00:00"),
  },
  {
    id: "2",
    petName: "Mimi",
    tutorName: "Maria",
    description: "Banho",
    phone: "1234567890",
    scheduleAt: new Date("2025-08-17T11:00:00"),
  },
  {
    id: "3",
    petName: "Nina",
    tutorName: "Natalia",
    description: "Consulta",
    phone: "1234567890",
    scheduleAt: new Date("2025-08-17T14:00:00"),
  },
  {
    id: "4",
    petName: "Nina",
    tutorName: "Natalia",
    description: "Consulta",
    phone: "1234567890",
    scheduleAt: new Date("2025-08-17T19:00:00"),
  },
];


export default function Home() {
  const periods = groupAppointmentByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:mb-8">
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
