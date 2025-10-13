import { AppointmentPeriod } from '@/types/appointments';
import {Cloudy, Moon, Sun} from 'lucide-react'

type PeriodSectionProps = {
    period: AppointmentPeriod
}

const periodIcons = {
    morning: <Sun className='text-accent-blue' />,
    afternoon: <Cloudy className='text-accent-orange' />,
    evening: <Moon className='text-accent-yellow' />
}

export const PeriodSection = ({period}: PeriodSectionProps) => {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between border-b border-[#2E2C30]">
        <div className='flex items-center gap-2'>
            {periodIcons[period?.type]}
            <h2 className='text-label-large-size text-content-primary'>
                {period?.title}
            </h2>
        </div>
        <span className='text-label-large-size text-content-secondary'>
            {period.timeRange}
        </span>
      </div>

    {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            <div className="grid grid-cols-2 md:hidden text-label-small-size text-content-secondary mb-2">
              <div className="text-left">Time</div>
              <div className="text-right">Client</div>
            </div>

            {period.appointments.map((appointment, index) => (
              <div key={index}>{appointment.petName}</div>
            ))}
          </div>
        </div>
      ) : (
        <p>No scheduled appointments for this period</p>
      )}

    </section>
  );
};
