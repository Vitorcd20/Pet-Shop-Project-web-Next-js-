'use server'

import { prisma } from "@/lib/prisma";
import z from "zod";

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>

export async function createAppointment(data: AppointmentData) {
    try {
    const parsedData = appointmentSchema.parse(data)    

    const {scheduleAt} = parsedData
    const hour = scheduleAt.getHours()


    const isMorning = hour > 9 && hour < 12
    const isAfternoon = hour > 13 && hour < 18
    const isEvening = hour > 19 && hour < 21

    if(!isMorning && !isAfternoon && !isEvening) {
        return {
            error: 'Appointments are available only from 9 a.m. to 12 p.m., 1 p.m. to 6 p.m., or 7 p.m. to 9 p.m.'
        }
    }

    const existingAppointment = await prisma.appointment.findFirst({
        where: {
            scheduleAt
        }
    })

    if(existingAppointment) {
        return {
            error: 'This time has already been reserved'
        }
    }

    await prisma.appointment.create({
        data: {
            ...parsedData
        }
    })


    } catch (error) {
        console.log(error)
    }

    
 return {}
}