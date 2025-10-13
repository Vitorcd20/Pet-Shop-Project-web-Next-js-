"use client";
import { z } from "zod";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, "Tutor name is required"),
  petName: z.string().min(3, "Pet name is required"),
  phone: z.string().min(11, "Phone number is required"),
  description: z.string().min(3, "Description is required"),
});

type AppointmentFormValue = z.infer<typeof appointmentFormSchema>;

export const AppointmentForm = () => {
  const form = useForm<AppointmentFormValue>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: "",
      petName: "",
      phone: "",
      description: "",
    },
  });

  const onSubmit = (data: AppointmentFormValue) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">New appointment</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Schedule an appointment</DialogTitle>
          <DialogDescription size="modal">
            Fill in the client&apos;s information to proceed with the
            appointment
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input {...form.register("tutorName")} type="text" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
